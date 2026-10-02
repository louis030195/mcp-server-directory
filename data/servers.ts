export type Category =
  | 'file-system'
  | 'database'
  | 'web'
  | 'browser'
  | 'ai-llm'
  | 'communication'
  | 'devtools'
  | 'cloud'
  | 'other';

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  category: Category;
  githubUrl: string;
  installCommand: string;
  clients: ('claude' | 'cursor' | 'generic')[];
}

export const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'file-system', label: 'Filesystem' },
  { value: 'database', label: 'Database' },
  { value: 'web', label: 'Web' },
  { value: 'browser', label: 'Browser' },
  { value: 'ai-llm', label: 'AI/LLM' },
  { value: 'communication', label: 'Communication' },
  { value: 'devtools', label: 'DevTools' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'other', label: 'Other' },
];

export const servers: MCPServer[] = [
  {
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Secure file operations with configurable access controls.',
    category: 'file-system',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Repository management, file operations, and search.',
    category: 'devtools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-github',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Read-only database access with schema inspection.',
    category: 'database',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    description: 'SQLite database interaction and querying.',
    category: 'database',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-sqlite /path/to/database.db',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'hyperconsciousness',
    name: 'Hyperconsciousness',
    description: 'Developer-alpha Rust knowledge store with encrypted, append-only records and scoped MCP reads. Install hc and create a read grant first; see repository setup.',
    category: 'database',
    githubUrl: 'https://github.com/louis030195/hyperconsciousness',
    installCommand: 'hc mcp --as YOUR_GRANT_ID --dir /absolute/path/to/hc-store',
    clients: ['generic'],
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    description: 'Browser automation and web scraping capabilities.',
    category: 'browser',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-puppeteer',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'brave-search',
    name: 'Brave Search',
    description: 'Web and local search using Brave Search API.',
    category: 'web',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-brave-search',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'fetch',
    name: 'Fetch',
    description: 'Fetch any URL and extract content as markdown.',
    category: 'web',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-fetch',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send and read Slack messages across channels.',
    category: 'communication',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-slack',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Access and search Google Drive files and documents.',
    category: 'cloud',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-google-drive',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    description: 'Dynamic problem-solving with structured thought chains.',
    category: 'ai-llm',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-sequential-thinking',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'aws-kb-retrieval',
    name: 'AWS KB Retrieval',
    description: 'Retrieve information from AWS Knowledge Base.',
    category: 'cloud',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-aws-kb-retrieval',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error tracking and performance monitoring integration.',
    category: 'devtools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-sentry',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'Redis operations including read, write, and search.',
    category: 'database',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-redis',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'everything',
    name: 'Everything',
    description: 'Reference server demonstrating all MCP features.',
    category: 'devtools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers',
    installCommand: 'npx -y @modelcontextprotocol/server-everything',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    description: 'Scrape and convert any website to LLM-ready markdown.',
    category: 'web',
    githubUrl: 'https://github.com/firecrawl/firecrawl-mcp-server',
    installCommand: 'npx -y mcp-server-firecrawl',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'browserbase',
    name: 'Browserbase',
    description: 'Cloud browser automation and session management.',
    category: 'browser',
    githubUrl: 'https://github.com/browserbase/mcp-server-browserbase',
    installCommand: 'npx -y @browserbasehq/mcp-server-browserbase',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Read and write Notion pages and databases.',
    category: 'communication',
    githubUrl: 'https://github.com/makenotion/notion-mcp-server',
    installCommand: 'npx -y @notionhq/notion-mcp-server',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Project management and issue tracking integration.',
    category: 'communication',
    githubUrl: 'https://github.com/linear/linear',
    installCommand: 'npx -y @linear/mcp-server',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Manage Vercel deployments and projects.',
    category: 'cloud',
    githubUrl: 'https://github.com/vercel/mcp-handler',
    installCommand: 'npx -y @vercel/mcp-server',
    clients: ['claude', 'cursor', 'generic'],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'End-to-end testing and browser automation.',
    category: 'browser',
    githubUrl: 'https://github.com/microsoft/playwright-mcp',
    installCommand: 'npx -y @playwright/mcp-server',
    clients: ['claude', 'cursor', 'generic'],
  },
];
