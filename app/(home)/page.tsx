"use client";

import { useState } from "react";
import Link from "next/link";
import BillingCheckout from "@/components/BillingCheckout";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import ServerGrid from "@/components/ServerGrid";
import { type Category } from "@/data/servers";
import { workflowPacks } from "@/data/workflowPacks";

const featuredPackSlugs = [
  "claude-code-repo-onboarding-pack",
  "cursor-full-stack-feature-pack",
  "openai-codex-pr-review-pack",
  "claude-desktop-production-mcp-pack",
  "hermes-solo-saas-command-center-pack",
  "mcp-security-audit-pack",
];

const featuredPacks = featuredPackSlugs
  .map((slug) => workflowPacks.find((pack) => pack.slug === slug))
  .filter((pack): pack is NonNullable<typeof pack> => Boolean(pack));

const subnav = [
  { href: "#workflow-packs", label: "Workflow Packs" },
  { href: "#ai-coding-tools", label: "AI Coding Tools" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#security-permissions", label: "Security" },
  { href: "#pricing", label: "Pricing" },
  { href: "#free-builder-tools", label: "Free tools" },
  { href: "#servers", label: "MCP Directory" },
  { href: "#faq", label: "FAQ" },
];

const freeBuilderGroups = [
  {
    title: "Design agent workflows",
    description: "Compare workflow patterns before choosing the CLI, planning loop, website agent, or MCP stack.",
    links: [
      { href: "/ai-coding-tools/", label: "Agentic AI Coding Tools Directory" },
      { href: "/ai-coding-tools/finder/", label: "AI Coding Tools Finder" },
      { href: "/guides/best-ai-agent-workflow-tools/", label: "Best AI Agent Workflow Tools" },
      { href: "/workflows/", label: "Workflow Pack Library" },
      { href: "/guides/agent-evaluation-framework/", label: "Agent Evaluation Framework" },
    ],
  },
  {
    title: "Plan AI cost & pricing",
    description: "Validate the numbers before you buy or build the workflow.",
    links: [
      { href: "/tools/ai-cost-calculator/", label: "AI Cost Calculator" },
      { href: "/tools/model-routing-savings-calculator/", label: "Model Routing Savings Calculator" },
      { href: "/tools/ai-saas-pricing-calculator/", label: "AI SaaS Pricing Calculator" },
    ],
  },
  {
    title: "Build an MCP stack",
    description: "Generate configs, env templates, and safety checklists before turning them into a repeatable pack.",
    links: [
      { href: "/tools/mcp-stack-builder/", label: "MCP Stack Builder" },
      { href: "/tools/mcp-server-config-generator/", label: "MCP Server Config Generator" },
      { href: "/tools/claude-desktop-mcp-config-generator/", label: "Claude Desktop Config Generator" },
      { href: "/tools/cursor-mcp-config-generator/", label: "Cursor MCP Config Generator" },
      { href: "/tools/mcp-env-template-generator/", label: "MCP Env Template Generator" },
      { href: "/tools/mcp-security-checklist-generator/", label: "MCP Security Checklist Generator" },
    ],
  },
  {
    title: "Plan products and agents",
    description: "Scope the product, agent, prompt, or guide before upgrading the implementation workflow.",
    links: [
      { href: "/ai-prd-generator/", label: "AI PRD Generator" },
      { href: "/ai-product-manager/", label: "AI Product Manager" },
      { href: "/agents/", label: "AI Agent Library" },
      { href: "/rsp/", label: "Prompt Library" },
      { href: "/guides/", label: "Guides" },
    ],
  },
  {
    title: "Secure and audit agents",
    description: "Check permissions, AI search visibility, and rapid index pickup before turning an agent workflow loose.",
    links: [
      { href: "/tools/agent-permission-builder/", label: "Agent Permission Builder" },
      { href: "/tools/mcp-security-audit-pack/", label: "MCP Security Audit Pack" },
      { href: "/tools/ai-search-visibility-checker/", label: "AI Search Visibility Checker" },
      { href: "/tools/rapid-index-checker/", label: "SEO Rapid Index Checker" },
      { href: "/guides/mcp-server-security-checklist/", label: "MCP Server Security Checklist" },
      { href: "/guides/agent-permission-builder/", label: "Agent Permission Builder Guide" },
      { href: "/guides/ai-search-visibility-checker/", label: "AI Search Visibility Checker Guide" },
      { href: "/guides/agent-security-guide/", label: "Agent Security Guide" },
    ],
  },
];

const steps = [
  {
    title: "Start with the job",
    text: "Pick the actual work: onboard a repo, ship a Cursor feature, review a Codex PR, secure Claude Desktop, or run a solo SaaS command center.",
  },
  {
    title: "Choose the MCP stack",
    text: "Use the directory as a building block library for filesystem, GitHub, browser, docs, database, security, and analytics tools.",
  },
  {
    title: "Run the workflow",
    text: "Follow copy-ready prompts, least-privilege config notes, test/build checks, browser QA, and a final evidence report.",
  },
];

const faqs = [
  {
    q: "Is BestMCPServers still a directory?",
    a: "Yes. The MCP Directory remains free and indexable. The homepage now explains how the directory feeds paid workflow packs for real AI coding tasks.",
  },
  {
    q: "What changed in the positioning?",
    a: "BestMCPServers is now positioned as an MCP workflow platform for Claude Code, Cursor, OpenAI Codex, Claude Desktop, and Hermes — not only a list of servers.",
  },
  {
    q: "Are these workflow packs real products?",
    a: "The public pages describe the actual pack structure already in the site: use case, MCP stack, workflow steps, saved time, prompts, config guidance, and safety checks.",
  },
  {
    q: "Do you claim team seats or unlimited usage?",
    a: "No. The homepage intentionally avoids unimplemented Team, Enterprise, Unlimited, and save-server claims.",
  },
  {
    q: "Which plans are available now?",
    a: "Builder Pack is $9.99 lifetime for the first workflow packs. Pro is $19/mo for the broader workflow library and Pro implementation checklists.",
  },
  {
    q: "Can I still browse MCP servers for free?",
    a: "Yes. Directory, guides, and free developer tools stay available as public resources.",
  },
  {
    q: "Which tools are covered first?",
    a: "The MVP highlights Claude Code Repo Onboarding, Cursor Full-Stack Feature, OpenAI Codex PR Review, Claude Desktop Production MCP, Hermes Solo SaaS Command Center, and MCP Security Audit.",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
              MCP + Claude Code + Cursor + Codex workflow platform
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Stop browsing MCP servers. Start shipping AI coding workflows.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              BestMCPServers turns MCP discovery into repeatable workflows for repo onboarding, full-stack feature shipping, PR review, production Claude setup, solo SaaS operations, and MCP security audits.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing/"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
              >
                View Builder & Pro pricing
              </Link>
              <Link
                href="/tools/mcp-security-audit-pack/"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-300/40 bg-emerald-400/10 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-400/20"
              >
                Open MCP Security Audit Pack
              </Link>
              <Link
                href="/workflows/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Browse workflow packs
              </Link>
              <Link
                href="/ai-coding-tools/"
                className="inline-flex items-center justify-center rounded-xl border border-blue-300/30 px-6 py-3 text-sm font-bold text-blue-100 transition hover:bg-blue-400/10"
              >
                Compare agentic AI coding tools
              </Link>
              <Link
                href="/tools/rapid-index-checker/"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-300/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-400/10"
              >
                Check a page for rapid indexing risk
              </Link>
              <Link
                href="/my-purchases/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                My purchases
              </Link>
              <a
                href="#servers"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Use the free MCP directory
              </a>
            </div>
            <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-white">Directory stays free</strong>
                MCP servers remain the building blocks.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-white">Pricing is visible</strong>
                Builder $9.99 lifetime · Pro $19/mo.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-white">Real workflow scope</strong>
                No Team, Enterprise, Unlimited, or save-server claims.
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {subnav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="ai-coding-tools" className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Agentic AI coding tools</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Compare Cursor, Claude Code, Codex, Devin, Replit Agent, Factory, Cline, and more</h2>
            <p className="mt-4 text-slate-600">Use the new AI coding tools directory to choose between IDE agents, terminal agents, cloud software engineers, prompt-to-app builders, and open-source coding assistants before designing your MCP workflow.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/ai-coding-tools/" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500">Open directory</Link>
            <Link href="/ai-coding-tools/finder/" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700">Use finder</Link>
          </div>
        </div>
      </section>

      <section id="workflow-packs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Featured workflow packs</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Six launch-ready workflows for AI builders
          </h2>
          <p className="mt-4 text-slate-600">
            Each pack connects a buyer job to a practical MCP stack, copy-ready agent prompts, config guardrails, and verification steps.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((pack) => (
            <Link
              key={pack.slug}
              href={`/workflows/${pack.slug}/`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{pack.tool}</span>
                <span className="text-xs font-medium text-slate-500">{pack.difficulty} setup</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-700">{pack.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pack.subtitle}</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <strong className="text-slate-950">Outcome:</strong> {pack.useCase}
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">Saves {pack.savedTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Directory as library. Workflows as product.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security-permissions" className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Security & permissions</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Turn agent risk into a workflow checklist</h2>
            <p className="mt-4 text-slate-600">
              Use free security tools to define least-privilege scopes, review AI search visibility, and then upgrade to Pro when you need audit-ready implementation steps.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools/mcp-security-audit-pack/" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500">
              Download MCP Security Audit Pack
            </Link>
            <Link href="/pro/" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-blue-300 hover:text-blue-700">
              See Pro workflow assets
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                href: "/tools/mcp-security-audit-pack/",
                label: "MCP Security Audit Pack",
                text: "Download a concrete audit worksheet, permission scorecard, and rollout checklist before enabling production MCP access.",
              },
              {
                href: "/guides/best-ai-agent-workflow-tools/",
                label: "Best AI Agent Workflow Tools",
                text: "Compare coding CLIs, planning loops, website agents, and MCP workflow review tools.",
              },
              {
                href: "/guides/ai-agent-workflow-best-practices/",
                label: "AI Agent Workflow Best Practices",
                text: "Define workflow contracts, acceptance evidence, approval gates, and Pro-ready implementation packs.",
              },
              {
                href: "/tools/agent-permission-builder/",
                label: "Agent Permission Builder",
                text: "Generate a read/write/action permission plan with approval gates and risk levels.",
              },
              {
                href: "/guides/ai-sovereignty-and-private-implementation/",
                label: "AI Sovereignty Implementation",
                text: "Map private data, model, tool, credential, and evidence boundaries before agent rollout.",
              },
              {
                href: "/tools/ai-search-visibility-checker/",
                label: "AI Search Visibility Checker",
                text: "Check whether crawler, sitemap, schema, and page signals make your agent content discoverable.",
              },
              {
                href: "/tools/rapid-index-checker/",
                label: "SEO Rapid Index Checker",
                text: "Triage whether a just-published page has the crawl, canonical, sitemap, and internal-link signals needed for faster index pickup.",
              },
              {
                href: "/guides/ai-cad-tools-and-agent-integration/",
                label: "AI CAD Agent Integration Watchlist",
                text: "Track AI CAD as a free trend topic before promoting it into paid workflow packs.",
              },
              {
                href: "/guides/mcp-server-security-checklist/",
                label: "MCP Server Security Checklist",
                text: "Review tools, credentials, prompt-injection risk, approvals, monitoring, and launch evidence.",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Security workflow</span>
                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-700">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-blue-700">Open resource →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pick the workflow depth you need now</h2>
            <p className="mt-4 text-slate-300">Transparent MVP pricing for individual AI builders. No unimplemented team or enterprise promises.</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold">Builder Pack</h3>
                <p><span className="text-4xl font-bold">$9.99</span><span className="text-slate-400"> lifetime</span></p>
              </div>
              <p className="mt-4 text-slate-300">Best for validating one concrete AI coding workflow.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li>✓ Claude Code Repo Onboarding</li>
                <li>✓ Cursor Full-Stack Feature</li>
                <li>✓ OpenAI Codex PR Review</li>
                <li>✓ Copy-ready MCP stack recommendations</li>
              </ul>
              <div className="mt-8"><BillingCheckout plan="builder" label="Start Builder Pack" /></div>
            </div>
            <div className="rounded-3xl border border-blue-400/40 bg-blue-500/10 p-8 ring-1 ring-blue-400/30">
              <div className="flex items-baseline justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-widest text-blue-200">Recommended</p><h3 className="mt-1 text-2xl font-bold">Pro</h3></div>
                <p><span className="text-4xl font-bold">$19</span><span className="text-slate-400">/mo</span></p>
              </div>
              <p className="mt-4 text-slate-300">Best for builders running repo work, QA, security, and launch execution repeatedly.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li>✓ Full workflow library across Claude Code, Cursor, Codex, Gemini CLI, and Hermes</li>
                <li>✓ Pro implementation checklists and acceptance steps</li>
                <li>✓ MCP security audit and production setup workflows</li>
                <li>✓ Lifetime Builder access and Pro unlocks use the same account path</li>
              </ul>
              <div className="mt-8"><BillingCheckout plan="pro" label="Start Pro" className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-500" /></div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/pricing/" className="text-sm font-semibold text-blue-200 hover:text-white">Compare plans on the pricing page →</Link>
          </div>
        </div>
      </section>

      <section id="free-builder-tools" className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Free builder tools</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Use the free tools, then upgrade the workflow</h2>
              <p className="mt-4 text-slate-600">
                Calculators, stack builders, config generators, PRD templates, agents, prompts, and guides stay free. Use them to scope the job; Builder and Pro packs turn the output into repeatable implementation workflows.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link href="/tools/" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white">
                Browse all free tools
              </Link>
              <Link href="/pricing/" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500">
                Turn this into Pro
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {freeBuilderGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                <div className="mt-6 grid gap-3">
                  {group.links.map((item) => (
                    <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700 hover:shadow-sm">
                      <span>{item.label}</span>
                      <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servers" className="border-b border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">MCP Directory</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Browse servers as workflow building blocks</h2>
            <p className="mt-4 text-slate-600">The directory remains the free library for choosing tools before you assemble them into a Builder or Pro workflow pack.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/mcp-server-directory/", label: "MCP Server Directory" },
                { href: "/mcp-servers-for-claude-code/", label: "MCP Servers for Claude Code" },
                { href: "/mcp-servers-for-cursor/", label: "MCP Servers for Cursor" },
                { href: "/mcp-servers-for-codex/", label: "MCP Servers for Codex" },
                { href: "/github-mcp-server/", label: "GitHub MCP Server" },
                { href: "/filesystem-mcp-server/", label: "Filesystem MCP Server" },
                { href: "/guides/browser-mcp-servers/", label: "Browser MCP Servers" },
                { href: "/mcp-server-security/", label: "MCP Server Security" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-white hover:text-blue-700 hover:shadow-sm">
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ServerGrid activeCategory={activeCategory} />

      <section id="faq" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Straight answers for the MVP homepage</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-950">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
