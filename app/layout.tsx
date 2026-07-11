import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestmcpservers.com"),
  title: "BestMCPServers — AI Tools, Prompt Libraries & Developer Resources",
  description:
    "BestMCPServers is your hub for AI tools, prompt libraries, and developer resources. Browse MCP servers, copy AI prompts, and use free online developer utilities.",
  keywords: [
    "best mcp servers",
    "mcp server list",
    "ai prompt library",
    "ai photo editing prompts",
    "json formatter",
    "developer tools",
    "model context protocol",
  ],
  verification: {
    google: "Zscg3HMWOVmKLvzwcgZGMd9ZoVZ0VKZnlG5azDqSUF8",
  },
  openGraph: {
    title: "BestMCPServers — AI Tools, Prompt Libraries & Developer Resources",
    description:
      "BestMCPServers is your hub for AI tools, prompt libraries, and developer resources. Browse MCP servers, copy AI prompts, and use free online developer utilities.",
    type: "website",
    url: "https://bestmcpservers.com/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BestMCPServers — MCP workflow packs for Claude Code, Cursor, and Codex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BestMCPServers — AI Tools, Prompt Libraries & Developer Resources",
    description:
      "BestMCPServers is your hub for AI tools, prompt libraries, and developer resources. Browse MCP servers, copy AI prompts, and use free online developer utilities.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://bestmcpservers.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://bestmcpservers.com/og.png" />
        <Script
          defer
          data-domain="bestmcpservers.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "BestMCPServers",
                    item: "https://bestmcpservers.com/",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is BestMCPServers?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BestMCPServers is a directory of MCP servers, AI agents, prompt resources, developer tools, and practical MCP guides.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are the tools free to use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. The browser developer tools on BestMCPServers are free utilities for formatting, validating, encoding, decoding, and generating useful developer assets.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="antialiased bg-white text-slate-900">
        {children}
        <Footer />
      </body>
    </html>
  );
}
