import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for BestMCPServers.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-950">Privacy Policy</h1>
      <div className="mt-8 space-y-5 leading-7 text-slate-700">
        <p>Last updated: July 11, 2026.</p>
        <p>BestMCPServers processes information needed to operate accounts, purchases, and site functionality. Google sign-in supplies basic account information such as your email address and profile details.</p>
        <p>Stripe processes payment information. BestMCPServers receives transaction and customer references rather than full payment card details.</p>
        <p>A session token is stored in your browser&apos;s local storage to keep you signed in. Plausible Analytics provides aggregate site usage measurement.</p>
        <p>Information may be retained as needed for account access, purchase records, security, and legal obligations. Service providers process data for the functions they supply.</p>
        <p>Use the contact channel associated with the site or your payment confirmation for privacy requests. Do not submit secrets through public forms or URLs.</p>
      </div>
    </main>
  );
}
