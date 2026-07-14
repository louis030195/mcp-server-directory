"use client";

import { AI_PM_BILLING_STAGES, type AiPmBillingStage, type AiPmCtaAction, type AiPmEvent, type AiPmTool } from "./ai-pm-events";

const ATTRIBUTION_KEY = "ai_pm_attribution";
const ONCE_PREFIX = "ai_pm_once:";

function hasAttribution() {
  return typeof window !== "undefined" && window.sessionStorage.getItem(ATTRIBUTION_KEY) === "1";
}

function emit(event: AiPmEvent, onceKey: string) {
  if (typeof window === "undefined" || window.sessionStorage.getItem(`${ONCE_PREFIX}${onceKey}`)) return false;
  window.sessionStorage.setItem(`${ONCE_PREFIX}${onceKey}`, "1");

  const plausible = (window as Window & { plausible?: (name: string, options: { props: Record<string, string> }) => void }).plausible;
  const { event: name, ...props } = event;
  if (typeof plausible === "function") plausible(name, { props });

  const body = JSON.stringify({ ...event, event_id: crypto.randomUUID() });
  void fetch("/api/analytics/ai-pm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
  return true;
}

export function trackAiPmCta(action: AiPmCtaAction) {
  window.sessionStorage.setItem(ATTRIBUTION_KEY, "1");
  return emit({ event: "ai_pm_cta_click", action, page: "/ai-product-manager/" }, `cta:${action}`);
}

export function trackAiPmToolComplete(tool: AiPmTool) {
  if (!hasAttribution()) return false;
  return emit({ event: "ai_pm_tool_complete", tool, result: "success" }, `tool:${tool}`);
}

export function trackAiPmBillingStage(stage: AiPmBillingStage) {
  if (!hasAttribution()) return false;
  const index = AI_PM_BILLING_STAGES.indexOf(stage);
  if (index > 0 && !window.sessionStorage.getItem(`${ONCE_PREFIX}billing:${AI_PM_BILLING_STAGES[index - 1]}`)) return false;
  return emit({ event: "ai_pm_billing_stage", stage }, `billing:${stage}`);
}