import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of BestMCPServers.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">Terms of Use</h1>
      <div className="mt-8 space-y-5 leading-7 text-slate-700">
        <p>Last updated: July 11, 2026.</p>
        <p>BestMCPServers provides directories, guides, tools, and downloadable resources for informational and implementation purposes. You are responsible for validating configurations, permissions, dependencies, licensing, and security before production use.</p>
        <p>You may not misuse the service, interfere with its operation, attempt unauthorized access, or redistribute paid resources as a competing product.</p>
        <p>One-time purchases provide access to the identified product. Subscriptions provide access according to the plan shown at checkout.</p>
        <p>Third-party products and links are governed by their own terms. Availability, features, and pricing may change. Payment terms are presented at checkout.</p>
        <p>Use the contact channel associated with the site or your payment confirmation for transaction questions.</p>
      </div>
    </main>
  );
}
