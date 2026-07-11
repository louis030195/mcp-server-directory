import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import BillingCheckout from "@/components/BillingCheckout";
import BuilderPackAccess from "@/components/BuilderPackAccess";
import { workflowPacks } from "@/data/workflowPacks";

const title = "BestMCPServers Pro | MCP Security Audit Pack for Production AI Workflows";
const description = "BestMCPServers Pro unlocks the MCP Security Audit Pack: permission scoring, prompt injection testing, rollout gates, remediation checklists, and approval-ready reports for production AI workflows.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://bestmcpservers.com/pro/" },
  openGraph: { title, description, url: "https://bestmcpservers.com/pro/", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const faq = [
  { q: "What is included in Pro?", a: "All workflow packs, Pro-only implementation steps, MCP stack recommendations, MCP Security Audit Pack samples, permission scoring, prompt injection review, rollout gates, remediation checklists, and future premium generators." },
  { q: "Does Pro replace the free directory?", a: "No. The free directory stays open for SEO and discovery. Pro focuses on implementation outcomes and the structured MCP security audit package needed before production access." },
  { q: "How does purchase work?", a: "Click a Pro checkout button, sign in with Google if needed, and complete payment through Stripe Billing." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BestMCPServers Pro",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description,
  offers: { "@type": "Offer", price: "19", priceCurrency: "USD" },
};

export default function ProPage() {
  const builderPacks = workflowPacks.filter((pack) => pack.launchPriority <= 3);

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Pro Access</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">The paid MCP security audit pack for production agent workflows.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">BestMCPServers Pro turns discovery into an approval-ready security review: choose a safe MCP stack, score permissions, test prompt injection exposure, set rollout gates, document remediation, and use AI coding tools to ship, review, verify, and operate with evidence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/tools/mcp-security-audit-pack/" className="rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-100">Preview Security Audit Pack</Link><Link href="/workflows/" className="rounded-xl border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">Browse workflows</Link><Link href="/pricing/" className="rounded-xl border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">Compare pricing</Link><Link href="/my-purchases/" className="rounded-xl border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">My purchases</Link></div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-2xl">
            <p className="text-sm font-semibold text-blue-700">Best value</p>
            <h2 className="mt-2 text-3xl font-bold">Pro · $19/mo</h2>
            <p className="mt-3 text-slate-600">Unlock the MCP Security Audit Pack, all workflow packs, report-ready review steps, and Pro-only implementation details.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li>✓ 10 workflow packs for Claude Code, Cursor, Codex, Gemini CLI, and Hermes</li>
              <li>✓ Top 3 72-hour launch packs included immediately</li>
              <li>✓ MCP security approval workflow for production agent access</li>
              <li>✓ Flagship MCP Security Audit Pack with permission scoring, prompt injection testing, remediation notes, and rollout gates</li>
              <li>✓ Production QA and launch verification workflow</li>
              <li>✓ Builder-style workflow packs included in Pro</li>
            </ul>
            <div className="mt-8 space-y-3">
              <BillingCheckout plan="pro" label="Start Pro" />
              <Link href="/tools/mcp-security-audit-pack/" className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Preview MCP Security Audit Pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <BuilderPackAccess builderPacks={builderPacks} />
        </Suspense>

        <h2 id="workflow-library" className="text-3xl font-bold tracking-tight text-slate-950">What Pro unlocks</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflowPacks.map((pack) => (
            <Link key={pack.slug} href={`/workflows/${pack.slug}/`} className="rounded-3xl border border-slate-200 p-6 shadow-sm transition hover:border-blue-300 hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">{pack.tool}</p>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{pack.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{pack.subtitle}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{pack.savedTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">FAQ</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{faq.map((item) => <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-semibold text-slate-950">{item.q}</h3><p className="mt-2 text-sm text-slate-600">{item.a}</p></div>)}</div>
        </div>
      </section>
    </main>
  );
}
