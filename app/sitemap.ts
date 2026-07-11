import type { MetadataRoute } from "next";
import { developerTools } from "@/data/developerTools";
import { agents } from "@/data/agents";
import { rspPrompts } from "@/data/rspPrompts";
import { mcpGuides } from "@/data/mcpGuides";
import { agentSecurityGuides } from "@/data/agentSecurityGuides";
import { seoGuides } from "@/data/seoGuides";
import { workflowPacks } from "@/data/workflowPacks";
import { aiCodingComparisons, aiCodingTools } from "@/data/aiCodingTools";

const baseUrl = "https://bestmcpservers.com";
const lastModified = new Date("2026-06-08");

function route(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") {
  return {
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    route("/about/", 0.5, "yearly"),
    route("/contact/", 0.5, "yearly"),
    route("/privacy/", 0.4, "yearly"),
    route("/terms/", 0.4, "yearly"),
    route("/", 1.0, "weekly"),
    route("/ai-prd-generator/", 0.9, "weekly"),
    route("/ai-product-manager/", 0.9, "weekly"),
    route("/ai-agent-prd-template/", 0.85, "monthly"),
    route("/mcp-server-prd-template/", 0.85, "monthly"),
    route("/saas-prd-template/", 0.8, "monthly"),
    route("/marketplace-prd-template/", 0.75, "monthly"),
    route("/crm-prd-template/", 0.75, "monthly"),
    route("/chrome-extension-prd-template/", 0.75, "monthly"),
    route("/mobile-app-prd-template/", 0.8, "monthly"),
    route("/guides/", 0.9, "weekly"),
    route("/workflows/", 0.95, "weekly"),
    route("/ai-coding-tools/", 0.94, "weekly"),
    route("/ai-coding-tools/tools/", 0.9, "weekly"),
    route("/ai-coding-tools/finder/", 0.88, "monthly"),
    route("/ai-coding-tools/cost-calculator/", 0.86, "monthly"),
    route("/ai-coding-tools/alternatives/cursor/", 0.84, "monthly"),
    route("/ai-coding-tools/alternatives/claude-code/", 0.84, "monthly"),
    route("/ai-coding-tools/alternatives/devin/", 0.84, "monthly"),
    route("/ai-coding-tools/open-source-ai-coding-agents/", 0.84, "monthly"),
    route("/ai-coding-tools/local-ai-coding-agents/", 0.84, "monthly"),
    route("/ai-coding-tools/ai-coding-agents-with-mcp-support/", 0.86, "monthly"),
    route("/ai-coding-tools/best-ai-coding-agent-for-nextjs/", 0.84, "monthly"),
    route("/ai-coding-tools/long-horizon-coding-agents/", 0.84, "monthly"),
    route("/ai-coding-tools/large-codebase-ai-coding-agent/", 0.84, "monthly"),
    route("/ai-coding-tools/ai-code-security-tools/", 0.84, "monthly"),
    route("/ai-coding-tools/ai-code-review-tools/", 0.84, "monthly"),
    route("/ai-coding-tools/ai-agent-permissions-checklist/", 0.84, "monthly"),
    route("/pricing/", 0.95, "weekly"),
    route("/pro/", 0.9, "weekly"),
    route("/tools/mcp-security-audit-pack/", 0.92, "weekly"),
    route("/guides/best-mcp-servers-for-claude/", 0.8, "monthly"),
    route("/guides/how-to-install-mcp-servers-in-cursor/", 0.8, "monthly"),
    route("/guides/use-bestmcpservers-api-with-chatgpt/", 0.8, "monthly"),
    route("/guides/use-bestmcpservers-tools-with-cursor/", 0.8, "monthly"),
    route("/guides/browser-mcp-servers/", 0.8, "monthly"),
    route("/mcp-server-directory/", 0.9, "weekly"),
    route("/mcp-servers-for-claude-code/", 0.86, "monthly"),
    route("/mcp-servers-for-cursor/", 0.86, "monthly"),
    route("/mcp-servers-for-codex/", 0.86, "monthly"),
    route("/github-mcp-server/", 0.84, "monthly"),
    route("/filesystem-mcp-server/", 0.84, "monthly"),
    route("/mcp-server-security/", 0.86, "monthly"),
    route("/category/database/", 0.82, "monthly"),
    route("/category/github/", 0.82, "monthly"),
    route("/category/browser/", 0.82, "monthly"),
    route("/category/filesystem/", 0.82, "monthly"),
    route("/category/slack/", 0.82, "monthly"),
    route("/for-claude/", 0.84, "monthly"),
    route("/for-cursor/", 0.84, "monthly"),
    route("/for-vscode/", 0.84, "monthly"),
    route("/for-developers/", 0.84, "monthly"),
    route("/for-ai-agents/", 0.84, "monthly"),
    route("/for-support-agents/", 0.84, "monthly"),
    route("/for-qa-agents/", 0.84, "monthly"),
    route("/for-internal-tools/", 0.84, "monthly"),
    route("/for-customer-success/", 0.84, "monthly"),
    route("/for-revenue-ops/", 0.84, "monthly"),
    route("/for-security-teams/", 0.84, "monthly"),
    route("/for-saas-teams/", 0.84, "monthly"),
    route("/for-agencies/", 0.84, "monthly"),
    route("/for-startups/", 0.84, "monthly"),
    route("/for-operations-teams/", 0.84, "monthly"),
    route("/for-data-teams/", 0.84, "monthly"),
    route("/for-marketing-teams/", 0.84, "monthly"),
    route("/for-finance-teams/", 0.84, "monthly"),
    route("/for-sales-teams/", 0.84, "monthly"),
    route("/for-hr-teams/", 0.84, "monthly"),
    route("/github-mcp-server-for-claude/", 0.84, "monthly"),
    route("/claude-mcp-server/", 0.84, "monthly"),
    route("/cursor-mcp-server/", 0.84, "monthly"),
    route("/vscode-mcp-server/", 0.84, "monthly"),
    route("/database-mcp-server/", 0.84, "monthly"),
    route("/browser-mcp-server/", 0.84, "monthly"),
    route("/slack-mcp-server/", 0.84, "monthly"),
    route("/guides/what-is-mcp-server/", 0.84, "monthly"),
    route("/compare/github-mcp-server-vs-filesystem-mcp-server/", 0.8, "monthly"),
    route("/compare/github-mcp-server-vs-browser-mcp-server/", 0.8, "monthly"),
    route("/compare/database-mcp-server-vs-filesystem-mcp-server/", 0.8, "monthly"),
    route("/compare/slack-mcp-server-vs-github-mcp-server/", 0.8, "monthly"),
    route("/guides/veo-prompt-examples/", 0.8, "monthly"),
    route("/guides/veo-cinematic-prompts/", 0.8, "monthly"),
    route("/guides/veo-ad-prompts/", 0.8, "monthly"),
    route("/guides/veo-youtube-shorts-prompts/", 0.8, "monthly"),
    route("/guides/how-to-write-veo-prompts/", 0.8, "monthly"),
    route("/tools/", 0.9, "weekly"),
    route("/tools/api/", 0.8, "monthly"),
    route("/agents/", 0.9, "weekly"),
    route("/rsp/", 0.9, "weekly"),
    route("/ai-cost/", 0.9, "weekly"),
  ];

  const toolRoutes = developerTools.map((tool) => route(`/tools/${tool.slug}/`, 0.8, "monthly"));
  const mcpGuideRoutes = mcpGuides.map((guide) => route(`/${guide.slug}/`, 0.85, "monthly"));
  const agentSecurityGuideRoutes = agentSecurityGuides.map((guide) => route(`/guides/${guide.slug}/`, 0.85, "monthly"));
  const seoGuideRoutes = seoGuides.map((guide) => route(`/guides/${guide.slug}/`, 0.82, "monthly"));
  const agentRoutes = agents.map((agent) => route(`/agents/${agent.slug}/`, 0.7, "monthly"));
  const rspRoutes = rspPrompts.map((prompt) => route(`/rsp/${prompt.slug}/`, 0.7, "monthly"));
  const workflowRoutes = workflowPacks.map((pack) => route(`/workflows/${pack.slug}/`, 0.86, "monthly"));
  const aiCodingToolRoutes = aiCodingTools.map((tool) => route(`/ai-coding-tools/tools/${tool.slug}/`, 0.82, "monthly"));
  const aiCodingComparisonRoutes = aiCodingComparisons.map((comparison) => route(`/ai-coding-tools/compare/${comparison.slug}/`, 0.8, "monthly"));

  return [
    ...staticRoutes,
    ...mcpGuideRoutes,
    ...agentSecurityGuideRoutes,
    ...seoGuideRoutes,
    ...toolRoutes,
    ...agentRoutes,
    ...rspRoutes,
    ...workflowRoutes,
    ...aiCodingToolRoutes,
    ...aiCodingComparisonRoutes,
  ];
}
