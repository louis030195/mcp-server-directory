import type { Metadata } from "next";
import Link from "next/link";
import AiPmCtaLink from "@/components/AiPmCtaLink";

const baseUrl = "https://bestmcpservers.com";

const operatingSystem = [
  {
    title: "Product brief",
    description: "Define the user, problem, use case, business goal, non-goals, and launch constraint before asking AI agents to design or code.",
  },
  {
    title: "PRD and workflow plan",
    description: "Turn the brief into requirements, acceptance criteria, edge cases, MCP stack choices, and an implementation sequence developers can execute.",
  },
  {
    title: "Shipping evidence",
    description: "Track build checks, QA proof, security notes, release risks, and iteration decisions so the product manager role stays grounded in real output.",
  },
];

const responsibilities = [
  "Translate founder goals into scoped AI builder tasks",
  "Write PRDs that include MCP tools, agent permissions, cost assumptions, and launch metrics",
  "Decide what stays free, what belongs in Pro, and what should wait",
  "Review generated code or content against acceptance criteria before release",
  "Connect analytics, SEO, billing, and QA evidence back to the roadmap",
  "Keep agents focused on one product outcome instead of scattered task completion",
];

const templates = [
  {
    title: "AI PRD Generator",
    href: "/ai-prd-generator/",
    description: "Create the structured product requirements document that anchors the AI product manager workflow.",
  },
  {
    title: "AI Agent PRD Template",
    href: "/ai-agent-prd-template/",
    description: "Define agent goals, tools, permissions, memory, evaluation, and failure behavior before implementation.",
  },
  {
    title: "MCP Server PRD Template",
    href: "/mcp-server-prd-template/",
    description: "Plan MCP tools, schemas, client integrations, auth boundaries, and production readiness.",
  },
  {
    title: "AI Cost Calculator",
    href: "/tools/ai-cost-calculator/",
    description: "Estimate model, API, and usage costs before committing to a feature or pricing tier.",
  },
  {
    title: "MCP Stack Builder",
    href: "/tools/mcp-stack-builder/",
    description: "Choose the MCP server categories and setup order needed for the product workflow.",
  },
  {
    title: "Security Audit Pack",
    href: "/pro/",
    description: "Turn planning artifacts into a repeatable security audit workflow with coding checks, QA proof, risk notes, and launch-ready evidence.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "AI Product Manager — Plan AI Products, PRDs, Agents, and MCP Workflows",
  description:
    "Use BestMCPServers as an AI product manager workspace for PRDs, agent requirements, MCP stack planning, AI cost estimation, and launch-ready workflow packs.",
  alternates: { canonical: `${baseUrl}/ai-product-manager/` },
  openGraph: {
    title: "AI Product Manager — Plan AI Products, PRDs, Agents, and MCP Workflows",
    description:
      "Plan AI products with PRDs, agent requirements, MCP stack choices, AI cost assumptions, QA evidence, and Pro implementation workflows.",
    type: "website",
    url: `${baseUrl}/ai-product-manager/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Manager",
    description: "Plan AI products, PRDs, agents, MCP workflows, costs, and launch evidence.",
  },
};

export default function AiProductManagerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "AI Product Manager", item: `${baseUrl}/ai-product-manager/` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an AI Product Manager?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI Product Manager is a product planning workflow that uses AI to turn ideas into PRDs, agent requirements, MCP stack choices, cost assumptions, acceptance criteria, and launch evidence.",
        },
      },
      {
        "@type": "Question",
        name: "How does BestMCPServers help AI product managers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BestMCPServers combines MCP server discovery, AI PRD templates, agent planning tools, cost calculators, and Pro workflow packs so product managers can move from scope to implementation evidence.",
        },
      },
      {
        "@type": "Question",
        name: "Should I start with the AI PRD Generator or AI Product Manager page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the AI Product Manager page to understand the operating system, then use the AI PRD Generator to create the concrete requirements document for a product, agent, or MCP workflow.",
        },
      },
      {
        "@type": "Question",
        name: "Do AI product manager workflows need MCP planning?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, for agentic AI products. MCP planning helps define which tools the agent can use, what permissions it needs, how data flows, and where security or QA checks belong.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      {[breadcrumbSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold text-slate-950">BestMCPServers</Link>
          <nav className="flex gap-5 text-sm text-slate-600">
            <Link href="/ai-prd-generator/" className="hover:text-slate-950">AI PRD Generator</Link>
            <Link href="/tools/" className="hover:text-slate-950">Tools</Link>
            <Link href="/pro/" className="hover:text-slate-950">Pro</Link>
          </nav>
        </div>
      </header>

      <section className="bg-slate-950 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">AI product management</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">AI Product Manager</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Plan AI products with PRDs, agent requirements, MCP stack choices, cost assumptions, acceptance criteria, and launch evidence before you ask coding agents to build.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <AiPmCtaLink action="create_prd" href="/ai-prd-generator/" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Create a PRD</AiPmCtaLink>
            <AiPmCtaLink action="plan_stack" href="/tools/mcp-stack-builder/" className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">Plan MCP stack</AiPmCtaLink>
            <AiPmCtaLink action="upgrade" href="/pro/" className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">Upgrade workflow</AiPmCtaLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">An operating system for AI product decisions</h2>
            <p className="mt-4 leading-8 text-slate-700">
              AI product work breaks when strategy, prompts, MCP tools, engineering tasks, costs, and QA evidence live in separate places. Use this page as the product manager layer that connects free planning tools to Pro shipping workflows.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {operatingSystem.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Responsibilities</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">What the AI PM should own</h2>
            <p className="mt-4 leading-8 text-slate-700">
              The best use of AI in product management is not vague brainstorming. It is a disciplined loop: scope the job, generate requirements, choose tool access, verify output, and decide whether to iterate, ship, or stop.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ul className="grid gap-4 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              {responsibilities.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 p-4 font-semibold text-slate-800">✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">AI product manager toolkit</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">
            Start with free planning tools, then move high-confidence product work into Pro workflows when you need repeatable implementation, QA, and launch execution.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg">
                <h3 className="font-bold text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
