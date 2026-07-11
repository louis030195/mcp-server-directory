const CANONICAL_HOST = "bestmcpservers.com";
const RETIRED_SECURITY_AUDIT_ASSETS = new Set([
  "/assets/mcp-security-audit-pack/mcp-security-audit-pack.md",
  "/assets/mcp-security-audit-pack/permission-scorecard.csv",
  "/assets/mcp-security-audit-pack/production-rollout-checklist.md",
]);

type PagesContext = {
  request: Request;
  next: () => Promise<Response>;
};

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const url = new URL(context.request.url);

  if (url.hostname !== CANONICAL_HOST) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  // Paid pack files are served only by the billing Worker after entitlement checks.
  if (RETIRED_SECURITY_AUDIT_ASSETS.has(url.pathname)) {
    return new Response("Not found", { status: 404 });
  }

  return context.next();
};
