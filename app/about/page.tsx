import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BestMCPServers",
  description: "How BestMCPServers helps developers evaluate MCP servers and AI development tools.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">About BestMCPServers</h1>
      <div className="mt-8 space-y-5 leading-7 text-slate-700">
        <p>BestMCPServers is an independent directory and resource library for developers evaluating Model Context Protocol servers, AI coding tools, and implementation workflows.</p>
        <p>We publish searchable listings, comparisons, guides, calculators, and security resources designed to make technical evaluation more concrete. Product access and purchases are tied to a BestMCPServers Account.</p>
        <p>Listings and editorial coverage are informational. Verify details against each provider&apos;s current documentation before production use.</p>
      </div>
    </main>
  );
}
