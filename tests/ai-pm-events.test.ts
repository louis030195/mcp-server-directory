import assert from "node:assert/strict";
import test from "node:test";
import { AI_PM_BILLING_STAGES, parseAiPmEvent } from "../lib/analytics/ai-pm-events";
import { onRequestGet, onRequestPost } from "../functions/api/analytics/ai-pm";

const id = "11111111-1111-4111-8111-111111111111";

test("accepts only the fixed CTA contract", () => {
  assert.ok(parseAiPmEvent({ event: "ai_pm_cta_click", action: "create_prd", page: "/ai-product-manager/", event_id: id }));
  assert.equal(parseAiPmEvent({ event: "ai_pm_cta_click", action: "other", page: "/ai-product-manager/", event_id: id }), null);
});

test("rejects privacy-sensitive and free-text fields", () => {
  for (const field of ["email", "token", "session", "cookie", "stripe_id", "product_name", "prd_text", "error"]) {
    assert.equal(parseAiPmEvent({ event: "ai_pm_tool_complete", tool: "prd", result: "success", event_id: id, [field]: "private" }), null);
  }
});

test("counts only successful non-empty tool outcomes", () => {
  assert.ok(parseAiPmEvent({ event: "ai_pm_tool_complete", tool: "stack", result: "success", event_id: id }));
  assert.equal(parseAiPmEvent({ event: "ai_pm_tool_complete", tool: "prd", result: "failed", event_id: id }), null);
  assert.equal(parseAiPmEvent({ event: "ai_pm_tool_complete", tool: "", result: "success", event_id: id }), null);
});

test("billing stages have one canonical order", () => {
  assert.deepEqual(AI_PM_BILLING_STAGES, ["login_start", "checkout_start", "checkout_success", "entitlement_active"]);
  for (const stage of AI_PM_BILLING_STAGES) assert.ok(parseAiPmEvent({ event: "ai_pm_billing_stage", stage, event_id: id }));
});

test("durable sink deduplicates and remains queryable", async () => {
  const values = new Map<string, string>();
  const kv = {
    get: async (key: string) => values.get(key) ?? null,
    put: async (key: string, value: string) => { values.set(key, value); },
    list: async ({ prefix }: { prefix: string }) => ({ keys: Array.from(values.keys()).filter((name) => name.startsWith(prefix)).map((name) => ({ name })) }),
  };
  const payload = { event: "ai_pm_cta_click", action: "upgrade", page: "/ai-product-manager/", event_id: id };
  const request = () => new Request("https://bestmcpservers.com/api/analytics/ai-pm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  assert.equal((await onRequestPost({ request: request(), env: { AI_PM_ANALYTICS: kv } })).status, 202);
  assert.equal((await onRequestPost({ request: request(), env: { AI_PM_ANALYTICS: kv } })).status, 200);
  const report = await onRequestGet({ request: new Request("https://bestmcpservers.com/api/analytics/ai-pm"), env: { AI_PM_ANALYTICS: kv } });
  const data = await report.json() as { counts: Array<{ count: number }> };
  assert.deepEqual(data.counts.map((item) => item.count), [1]);
});

test("durable report supports a bounded date range and KV pagination", async () => {
  const values = new Map([
    ["event:2026-07-13:one", JSON.stringify({ event: "ai_pm_cta_click", action: "upgrade", page: "/ai-product-manager/" })],
    ["event:2026-07-14:two", JSON.stringify({ event: "ai_pm_tool_complete", tool: "prd", result: "success" })],
  ]);
  const kv = {
    get: async (key: string) => values.get(key) ?? null,
    put: async (key: string, value: string) => { values.set(key, value); },
    list: async ({ prefix, cursor }: { prefix: string; cursor?: string }) => {
      const keys = Array.from(values.keys()).filter((name) => name.startsWith(prefix));
      const offset = cursor ? Number(cursor) : 0;
      return {
        keys: keys.slice(offset, offset + 1).map((name) => ({ name })),
        list_complete: offset + 1 >= keys.length,
        cursor: String(offset + 1),
      };
    },
  };
  const report = await onRequestGet({
    request: new Request("https://bestmcpservers.com/api/analytics/ai-pm?from=2026-07-13&to=2026-07-14"),
    env: { AI_PM_ANALYTICS: kv },
  });
  const data = await report.json() as { from: string; to: string; eventCount: number };
  assert.deepEqual(data, { success: true, from: "2026-07-13", to: "2026-07-14", eventCount: 2, counts: [
    { key: "ai_pm_cta_click:action=upgrade:page=/ai-product-manager/", count: 1 },
    { key: "ai_pm_tool_complete:tool=prd:result=success", count: 1 },
  ] });
});

test("durable report rejects invalid or oversized date ranges", async () => {
  const kv = { get: async () => null, put: async () => undefined, list: async () => ({ keys: [] }) };
  for (const query of ["from=2026-07-14&to=2026-07-13", "from=2026-06-01&to=2026-07-14", "from=private&to=2026-07-14"]) {
    const response = await onRequestGet({ request: new Request(`https://bestmcpservers.com/api/analytics/ai-pm?${query}`), env: { AI_PM_ANALYTICS: kv } });
    assert.equal(response.status, 400);
  }
});