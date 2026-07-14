export const AI_PM_PAGE = "/ai-product-manager/" as const;

export const AI_PM_CTA_ACTIONS = ["create_prd", "plan_stack", "upgrade"] as const;
export const AI_PM_TOOLS = ["prd", "stack"] as const;
export const AI_PM_BILLING_STAGES = ["login_start", "checkout_start", "checkout_success", "entitlement_active"] as const;

export type AiPmCtaAction = (typeof AI_PM_CTA_ACTIONS)[number];
export type AiPmTool = (typeof AI_PM_TOOLS)[number];
export type AiPmBillingStage = (typeof AI_PM_BILLING_STAGES)[number];

export type AiPmEvent =
  | { event: "ai_pm_cta_click"; action: AiPmCtaAction; page: typeof AI_PM_PAGE }
  | { event: "ai_pm_tool_complete"; tool: AiPmTool; result: "success" }
  | { event: "ai_pm_billing_stage"; stage: AiPmBillingStage };

const ALLOWED_KEYS = new Set(["event", "action", "page", "tool", "result", "stage", "event_id"]);

export function parseAiPmEvent(value: unknown): (AiPmEvent & { event_id: string }) | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.has(key))) return null;
  if (typeof record.event_id !== "string" || !/^[a-f0-9-]{36}$/.test(record.event_id)) return null;

  if (record.event === "ai_pm_cta_click") {
    if (Object.keys(record).length !== 4 || record.page !== AI_PM_PAGE || !AI_PM_CTA_ACTIONS.includes(record.action as AiPmCtaAction)) return null;
    return record as AiPmEvent & { event_id: string };
  }
  if (record.event === "ai_pm_tool_complete") {
    if (Object.keys(record).length !== 4 || record.result !== "success" || !AI_PM_TOOLS.includes(record.tool as AiPmTool)) return null;
    return record as AiPmEvent & { event_id: string };
  }
  if (record.event === "ai_pm_billing_stage") {
    if (Object.keys(record).length !== 3 || !AI_PM_BILLING_STAGES.includes(record.stage as AiPmBillingStage)) return null;
    return record as AiPmEvent & { event_id: string };
  }
  return null;
}

export function eventDimensions(event: AiPmEvent) {
  if (event.event === "ai_pm_cta_click") return { action: event.action, page: event.page };
  if (event.event === "ai_pm_tool_complete") return { tool: event.tool, result: event.result };
  return { stage: event.stage };
}