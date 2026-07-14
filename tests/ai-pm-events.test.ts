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