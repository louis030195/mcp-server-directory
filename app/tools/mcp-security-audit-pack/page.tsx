import Link from "next/link";
import type { Metadata } from "next";
import BillingCheckout from "@/components/BillingCheckout";

const title = "MCP Security Audit Pack | Permission Review, Prompt Injection, and Rollout Gates";
const description = "A flagship MCP security asset pack for permission scoring, prompt injection defense, rollout gates, and production approval decisions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://bestmcpservers.com/tools/mcp-security-audit-pack/" },
  openGraph: { title, description, url: "https://bestmcpservers.com/tools/mcp-security-audit-pack/", type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const checklist = [
  "Inventory the MCP server source, maintainer, install method, and update cadence.",
  "Score permissions for filesystem, network, shell, browser, and data access.",
  "Test prompt injection resistance and secrets exposure boundaries.",
  "Decide approve, approve-with-limits, or reject with rollout gates.",
  "Capture smoke tests, rollback steps, and owner sign-off."
];

const assets = [
  "Permission scoring template",
  "Prompt injection review worksheet",
  "Rollout decision gate checklist",
  "Secrets and data boundary checklist",
  "Production smoke test runbook"
];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: title,
  description,
  url: "https://bestmcpservers.com/tools/mcp-security-audit-pack/",
  brand: { "@type": "Organization", name: "BestMCPServers" },
};

export default function McpSecurityAuditPackPage() {
  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/pricing/" className="text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to pricing</Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Flagship asset pack</p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">MCP Security Audit Pack</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A decision package for teams that need to evaluate MCP servers before giving agents filesystem, browser, database, or GitHub access in production.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#assets" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">See included assets</a>
                <a href="#checklist" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">View checklist</a>
              </div>
            </div>
            <aside className="rounded-3xl border border-blue-300/30 bg-white p-6 text-slate-950 shadow-2xl">
              <p className="text-sm font-semibold text-blue-700">Unlock the pack</p>
              <h2 className="mt-2 text-2xl font-bold">$29 one-time purchase</h2>
              <p className="mt-3 text-sm text-slate-600">Permanent access to the complete worksheet, scorecard, checklist, and rollout decision path. No credits required.</p>
              <div className="mt-6 space-y-3">
                <BillingCheckout plan="security-audit" label="Buy the audit pack" />
                <Link href="/my-purchases/" className="block rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold hover:bg-slate-50">My purchases</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="checklist" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-950">What this pack helps you decide</h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {checklist.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <div id="assets" className="rounded-3xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-950">Included assets</h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {assets.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <p className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-900">Built for security review, production rollout, and team approval.</p>
          </div>
        </div>
      </section>


    </main>
  );
}
