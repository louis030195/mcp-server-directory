import { eventDimensions, parseAiPmEvent } from "../../../lib/analytics/ai-pm-events";

type KvNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options: { prefix: string; cursor?: string }): Promise<{ keys: Array<{ name: string }>; list_complete?: boolean; cursor?: string }>;
};

type Context = { request: Request; env: { AI_PM_ANALYTICS?: KvNamespace } };
const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_REPORT_DAYS = 31;

function parseDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value ? null : timestamp;
}

async function listAll(namespace: KvNamespace, prefix: string) {
  const names: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await namespace.list({ prefix, cursor });
    names.push(...page.keys.map(({ name }) => name));
    if (page.list_complete !== false) break;
    cursor = page.cursor;
  } while (cursor);
  return names;
}

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
  const params = new URL(request.url).searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const from = params.get("from") || params.get("date") || today;
  const to = params.get("to") || params.get("date") || from;
  const fromTime = parseDate(from);
  const toTime = parseDate(to);
  if (fromTime === null || toTime === null || toTime < fromTime || (toTime - fromTime) / DAY_MS >= MAX_REPORT_DAYS) {
    return json({ success: false, code: "INVALID_DATE_RANGE" }, 400);
  }

  const names: string[] = [];
  for (let time = fromTime; time <= toTime; time += DAY_MS) {
    const date = new Date(time).toISOString().slice(0, 10);
    names.push(...await listAll(env.AI_PM_ANALYTICS, `event:${date}:`));
  }
  const records = await Promise.all(names.map((name) => env.AI_PM_ANALYTICS!.get(name)));
  const totals = new Map<string, number>();
  for (const record of records) {
    if (!record) continue;
    const value = JSON.parse(record) as Record<string, string>;
    const key = [value.event, ...Object.entries(value).filter(([name]) => name !== "event").map(([name, item]) => `${name}=${item}`)].join(":");
    totals.set(key, (totals.get(key) || 0) + 1);
  }
  const counts = Array.from(totals, ([key, count]) => ({ key, count })).sort((a, b) => a.key.localeCompare(b.key));
  return json({ success: true, from, to, eventCount: records.filter(Boolean).length, counts });
}

export async function onRequest() {
  return json({ success: false, code: "METHOD_NOT_ALLOWED" }, 405);
}