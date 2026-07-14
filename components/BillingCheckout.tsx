"use client";

import { useEffect, useMemo, useState } from "react";
import { trackAiPmBillingStage } from "@/lib/analytics/ai-pm-client";

const BILLING_API = "https://auth.bestmcpservers.com";
const SESSION_KEY = "bestmcpservers_session_token";
const USER_KEY = "bestmcpservers_user";

type Plan = {
  id: string;
  name?: string;
  product_name?: string;
  product_slug?: string;
  price_cents?: number;
  interval?: string;
};

type SessionData = {
  authenticated?: boolean;
  credits?: {
    balance?: number;
    lifetime_purchased?: number;
  } | null;
  subscription?: {
    status?: string;
    plan_id?: string;
    current_period_end?: number;
  } | null;
  purchases?: Array<{ plan_id?: string; status?: string }>;
};

type Props = {
  plan: "builder" | "pro" | "security-audit";
  label?: string;
  className?: string;
};

const PLAN_IDS: Record<Props["plan"], string> = {
  builder: "plan_bestmcp_builder",
  pro: "plan_bestmcp_pro",
  "security-audit": "plan_bestmcp_security_audit",
};

function loginUrl(returnUrl?: string) {
  const destination = returnUrl || (typeof window !== "undefined" ? window.location.href : "https://bestmcpservers.com/pricing/");
  return `${BILLING_API}/api/auth/google?returnUrl=${encodeURIComponent(destination)}`;
}

function normalize(value?: string) {
  return (value || "").toLowerCase();
}

function trackCtaClick(plan: Props["plan"], stage: string) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }).plausible;
  if (typeof plausible === "function") {
    plausible("CTA Click", {
      props: {
        plan,
        stage,
        page: window.location.pathname,
        cta: "billing_checkout",
      },
    });
  }
}

export default function BillingCheckout({ plan, label, className }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<"idle" | "exchanging" | "checking" | "loading" | "redirecting" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(SESSION_KEY);
    if (stored) setToken(stored);

    const url = new URL(window.location.href);
    const handoffToken = url.searchParams.get("auth_token");
    if (!handoffToken) return;

    setStatus("exchanging");
    fetch(`${BILLING_API}/api/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: handoffToken }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        window.localStorage.setItem(SESSION_KEY, data.token);
        window.localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        url.searchParams.delete("auth_token");
        window.history.replaceState({}, "", url.toString());
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(`Login handoff failed: ${err.message || "unknown error"}`);
      });
  }, []);

  useEffect(() => {
    if (!token) {
      setSession(null);
      return;
    }

    let cancelled = false;
    const url = new URL(window.location.href);
    const justReturnedFromCheckout = url.searchParams.get("checkout") === "success";
    const delays = justReturnedFromCheckout ? [0, 1200, 3000, 6000] : [0];

    async function fetchSession() {
      setStatus((current) => (current === "idle" ? "checking" : current));
      try {
        const res = await fetch(`${BILLING_API}/api/auth/session`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          window.localStorage.removeItem(SESSION_KEY);
          setToken(null);
          setSession(null);
          setStatus("idle");
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as SessionData;
        if (!cancelled) {
          setSession(data);
          setStatus("idle");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(err instanceof Error ? err.message : "Could not verify account status");
        }
      }
    }

    const timers = delays.map((delay) => window.setTimeout(fetchSession, delay));
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [token]);

  const subscriptionStatus = normalize(session?.subscription?.status);
  const subscriptionPlanId = normalize(session?.subscription?.plan_id);
  const hasActivePro = ["active", "trialing"].includes(subscriptionStatus) && subscriptionPlanId.includes("bestmcp") && subscriptionPlanId.includes("pro");
  const hasBuilderAccess = hasActivePro || Number(session?.credits?.lifetime_purchased || 0) > 0;
  const hasSecurityAudit = session?.purchases?.some(
    (purchase) => purchase.plan_id === PLAN_IDS["security-audit"] && purchase.status === "active",
  ) || false;
  const hasAccess = plan === "pro" ? hasActivePro : plan === "security-audit" ? hasSecurityAudit : hasBuilderAccess;

  const buttonLabel = useMemo(() => {
    if (hasAccess) return plan === "pro" ? "Pro active — open workflows" : "Access active — open workflows";
    if (status === "exchanging") return "Finishing login...";
    if (status === "checking") return "Checking access...";
    if (status === "loading") return "Preparing checkout...";
    if (status === "redirecting") return "Redirecting to Stripe...";
    return label || (plan === "security-audit" ? "Buy for $29" : "Start Pro");
  }, [hasAccess, label, plan, status]);

  async function startCheckout() {
    const stage = hasAccess ? "already_unlocked" : token ? "checkout_start" : "login_start";
    trackCtaClick(plan, stage);
    if (stage === "login_start" || stage === "checkout_start") trackAiPmBillingStage(stage);

    if (hasAccess) {
      window.location.href = "/my-purchases/";
      return;
    }

    if (!token) {
      window.location.href = loginUrl();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const plansRes = await fetch(`${BILLING_API}/api/billing/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (plansRes.status === 401) {
        window.localStorage.removeItem(SESSION_KEY);
        setToken(null);
        window.location.href = loginUrl();
        return;
      }
      if (!plansRes.ok) throw new Error(await plansRes.text());
      const data = await plansRes.json();
      const plans = (data.plans || []) as Plan[];
      const selected = plans.find((item) => item.id === PLAN_IDS[plan]);

      if (!selected?.id) {
        throw new Error(`No ${plan} plan is configured in billing yet.`);
      }

      const checkoutRes = await fetch(`${BILLING_API}/api/billing/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_id: selected.id,
          success_url: `${window.location.origin}/my-purchases/?checkout=success&plan=${plan}`,
          cancel_url: `${window.location.origin}/pricing/?checkout=cancelled&plan=${plan}`,
        }),
      });
      const checkout = await checkoutRes.json().catch(() => ({})) as { url?: string; error?: string; code?: string };
      if (!checkoutRes.ok || !checkout.url) {
        if (checkoutRes.status === 409 || checkout.code === "SUBSCRIPTION_ALREADY_ACTIVE") {
          setSession((current) => ({
            ...current,
            subscription: current?.subscription || { status: "active", plan_id: selected.id },
          }));
          setMessage("Pro is already active on this account. Opening your workflow library instead.");
          window.location.href = "/my-purchases/";
          return;
        }
        throw new Error(checkout.error || "Checkout is unavailable right now.");
      }
      if (!checkout.url) throw new Error("Stripe checkout URL missing");
      setStatus("redirecting");
      window.location.href = checkout.url;
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Checkout failed");
    }
  }

  return (
    <div>
      <a
        href={loginUrl()}
        onClick={(event) => {
          event.preventDefault();
          void startCheckout();
        }}
        aria-disabled={status === "exchanging" || status === "checking" || status === "loading" || status === "redirecting"}
        className={className || "inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 aria-disabled:cursor-not-allowed aria-disabled:bg-slate-400"}
      >
        {buttonLabel}
      </a>
      {status === "error" && message ? (
        <p className="mt-2 text-xs text-red-600">{message}</p>
      ) : null}
    </div>
  );
}
