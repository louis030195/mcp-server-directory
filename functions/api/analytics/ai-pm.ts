import { eventDimensions, parseAiPmEvent } from "../../../lib/analytics/ai-pm-events";

type KvNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options: { prefix: string }): Promise<{ keys: Array<{ name: string }> }>;
};

type Context = { request: Request; env: { AI_PM_ANALYTICS?: KvNamespace } };
const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });

export async function onRequestPost({ request, env }: Context) {
  if (!env.AI_PM_ANALYTICS) return json({ accepted: false, code: "SINK_UNAVAILABLE" }, 503);
  if (request.headers.get("Content-Type")?.split(";")[0] !== "application/json") return json({ accepted: false, code: "INVALID_CONTENT_TYPE" }, 415);
  const event = parseAiPmEvent(await request.json().catch(() => null));
  if (!event) return json({ accepted: false, code: "INVALID_EVENT" }, 400);

  const date = new Date().toISOString().slice(0, 10);
  const key = `event:${date}:${event.event_id}`;
  if (await env.AI_PM_ANALYTICS.get(key)) return json({ accepted: true, duplicate: true });
  await env.AI_PM_ANALYTICS.put(key, JSON.stringify({ event: event.event, ...eventDimensions(event) }), { expirationTtl: 60 * 60 * 24 * 90 });
  return json({ accepted: true, duplicate: false }, 202);
}

export async function onRequestGet({ request, env }: Context) {
  if (!env.AI_PM_ANALYTICS) return json({ success: false, code: "SINK_UNAVAILABLE" }, 503);
  const date = new URL(request.url).searchParams.get("date") || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ success: false, code: "INVALID_DATE" }, 400);
  const listed = await env.AI_PM_ANALYTICS.list({ prefix: `event:${date}:` });
  const records = await Promise.all(listed.keys.map(({ name }) => env.AI_PM_ANALYTICS!.get(name)));
  const totals = new Map<string, number>();
  for (const record of records) {
    if (!record) continue;
    const value = JSON.parse(record) as Record<string, string>;
    const key = [value.event, ...Object.entries(value).filter(([name]) => name !== "event").map(([name, item]) => `${name}=${item}`)].join(":");
    totals.set(key, (totals.get(key) || 0) + 1);
  }
  const counts = Array.from(totals, ([key, count]) => ({ key, count })).sort((a, b) => a.key.localeCompare(b.key));
  return json({ success: true, date, eventCount: records.filter(Boolean).length, counts });
}

export async function onRequest() {
  return json({ success: false, code: "METHOD_NOT_ALLOWED" }, 405);
}