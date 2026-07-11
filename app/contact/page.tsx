import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BestMCPServers",
  description: "Contact and support information for BestMCPServers.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">Contact</h1>
      <div className="mt-8 space-y-5 leading-7 text-slate-700">
        <p>For account, purchase, listing, correction, or privacy questions, use the contact channel shown in the product or payment confirmation associated with your request.</p>
        <p>Include the page URL and enough detail to identify the issue. Do not send passwords, payment card details, API keys, or other secrets.</p>
      </div>
    </main>
  );
}
