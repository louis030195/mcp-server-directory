import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-slate-900">BestMCPServers</p>
            <p className="mt-2 text-sm text-slate-500">
              AI Tools &amp; Developer Resources
            </p>
          </div>

          {/* Resources */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Resources</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/rsp/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Prompt Library
                </Link>
              </li>
              <li>
                <Link href="/agents/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Agent Library
                </Link>
              </li>
              <li>
                <Link href="/tools/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  AI Coding Tools
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/cost-calculator/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  AI Coding Tool Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/best-ai-coding-agent-for-nextjs/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  AI Coding Agent for Next.js
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/long-horizon-coding-agents/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Long-Horizon Coding Agents
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/large-codebase-ai-coding-agent/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Large Codebase AI Agents
                </Link>
              </li>
              <li>
                <Link href="/ai-coding-tools/compare/claude-code-vs-cursor/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Claude Code vs Cursor
                </Link>
              </li>
              <li>
                <Link href="/mcp-server-directory/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  MCP Server Directory
                </Link>
              </li>
              <li>
                <Link href="/mcp-servers-for-claude-code/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  MCP for Claude Code
                </Link>
              </li>
              <li>
                <Link href="/mcp-servers-for-cursor/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  MCP for Cursor
                </Link>
              </li>
              <li>
                <Link href="/mcp-server-security/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  MCP Server Security
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Guides</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/guides/best-mcp-servers-for-claude/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Best MCP Servers for Claude
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-install-mcp-servers-in-cursor/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Install MCP in Cursor
                </Link>
              </li>
              <li>
                <Link href="/guides/agent-security-guide/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Agent Security Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/agent-identity-permissions-temporary-accounts/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Agent Identity & Permissions
                </Link>
              </li>
              <li>
                <Link href="/guides/agent-monitoring/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Agent Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* MCP */}
          <div>
            <p className="text-sm font-semibold text-slate-900">MCP Protocol</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://github.com/modelcontextprotocol" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  MCP GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Official Servers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; 2026 BestMCPServers. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/about/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</Link>
            <Link href="/contact/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</Link>
            <Link href="/privacy/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
