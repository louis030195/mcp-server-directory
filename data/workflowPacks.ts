export type PaidScenario = {
  rank: number;
  scenario: string;
  result: string;
  willingness: "Very High" | "High" | "Medium";
  marketSize: "Very High" | "High" | "Medium";
  difficulty: "Low" | "Medium" | "High";
};

export type CopyReadyWorkflow = {
  missingContent: string[];
  prompt: string[];
  claudeCodeConfig: string[];
  cursorConfig: string[];
  mcpConfig: string[];
  agentWorkflow: string[];
};

export type WorkflowPack = {
  slug: string;
  title: string;
  tool: "Claude Code" | "Cursor" | "OpenAI Codex" | "Gemini CLI" | "Hermes";
  subtitle: string;
  audience: string;
  useCase: string;
  mcpStack: string[];
  workflow: string[];
  savedTime: string;
  whyPay: string;
  priceAnchor: string;
  seoTitle: string;
  seoDescription: string;
  difficulty: "Low" | "Medium" | "High";
  willingness: "Very High" | "High" | "Medium";
  marketSize: "Very High" | "High" | "Medium";
  launchPriority: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  copyReady: CopyReadyWorkflow;
};

export const paidScenarios: PaidScenario[] = [
  {
    rank: 1,
    scenario: "Clone an unfamiliar repo and make the first safe production change",
    result: "A working repo map, risk checklist, suggested MCP stack, and first-change execution workflow.",
    willingness: "Very High",
    marketSize: "Very High",
    difficulty: "Low",
  },
  {
    rank: 2,
    scenario: "Ship a full-stack feature in Cursor without losing project context",
    result: "A repeatable Cursor workflow that connects code search, docs, database, browser QA, and PR notes.",
    willingness: "Very High",
    marketSize: "Very High",
    difficulty: "Low",
  },
  {
    rank: 3,
    scenario: "Turn a messy PR into a mergeable PR review and fix plan",
    result: "Automated review prompts, security checks, test focus areas, and a patch workflow for Codex or Claude Code.",
    willingness: "Very High",
    marketSize: "High",
    difficulty: "Low",
  },
  {
    rank: 4,
    scenario: "Set up a production-safe Claude Desktop or Claude Code MCP stack",
    result: "Copy-ready config with permission boundaries, secret handling, and rollback notes.",
    willingness: "High",
    marketSize: "Very High",
    difficulty: "Low",
  },
  {
    rank: 5,
    scenario: "Build a solo SaaS execution cockpit",
    result: "A workflow for product docs, repo changes, analytics checks, billing checks, and launch tasks.",
    willingness: "High",
    marketSize: "High",
    difficulty: "Medium",
  },
  {
    rank: 6,
    scenario: "Create an AI agent QA and browser verification loop",
    result: "A browser + repo + test workflow that verifies the live product instead of only reading code.",
    willingness: "High",
    marketSize: "High",
    difficulty: "Medium",
  },
  {
    rank: 7,
    scenario: "Audit MCP security before adding filesystem, browser, database, or GitHub access",
    result: "A risk score, least-privilege config, and approval checklist for each MCP server.",
    willingness: "High",
    marketSize: "Medium",
    difficulty: "Low",
  },
  {
    rank: 8,
    scenario: "Use Gemini CLI for large-doc and large-repo analysis",
    result: "A workflow for summarizing docs, extracting requirements, and creating implementation tickets.",
    willingness: "Medium",
    marketSize: "High",
    difficulty: "Low",
  },
  {
    rank: 9,
    scenario: "Run a multi-agent Hermes team for coding, content, QA, and deployment",
    result: "A task routing workflow with dev/content roles, shared reports, deployment checks, and final evidence.",
    willingness: "High",
    marketSize: "Medium",
    difficulty: "Medium",
  },
  {
    rank: 10,
    scenario: "Prepare a team-ready MCP standard operating procedure",
    result: "A team policy for approved servers, secrets, access levels, incident response, and review cadence.",
    willingness: "Medium",
    marketSize: "Medium",
    difficulty: "Medium",
  },
];

export const workflowPacks: WorkflowPack[] = [
  {
    slug: "claude-code-repo-onboarding-pack",
    title: "Claude Code Repo Onboarding Pack",
    tool: "Claude Code",
    subtitle: "Understand an unfamiliar repo, choose the right MCP stack, and make the first safe change.",
    audience: "Solo developers, contractors, and tech leads inheriting an unfamiliar codebase.",
    useCase: "You need to add a feature or fix a bug in a repo you did not write, without breaking auth, billing, deployment, or data flows.",
    mcpStack: ["Filesystem MCP", "GitHub MCP", "Git MCP", "Context7 or docs MCP", "Browser MCP", "Sequential Thinking MCP"],
    workflow: [
      "Map repo structure, frameworks, environment files, and deployment path.",
      "Identify auth, billing, database, analytics, and routing boundaries before editing.",
      "Use docs MCP for framework-specific APIs and Browser MCP for live behavior checks.",
      "Generate a first-change checklist: files, tests, risk, rollback, and verification URLs.",
      "Apply the smallest patch, run tests/build, then verify the live page or endpoint.",
    ],
    savedTime: "4–8 hours per unfamiliar repo onboarding.",
    whyPay: "The buyer is not paying for a list of servers; they are paying to avoid breaking a production repo on day one.",
    priceAnchor: "$9 is cheaper than one hour of senior developer time.",
    seoTitle: "Claude Code MCP Workflow Pack for Repo Onboarding | BestMCPServers Pro",
    seoDescription: "A production-safe Claude Code MCP workflow for repo onboarding, codebase mapping, first changes, tests, and live verification.",
    difficulty: "Low",
    willingness: "Very High",
    marketSize: "Very High",
    launchPriority: 1,
    copyReady: {
      missingContent: [
        "Paste the repo URL or local path.",
        "State the first change you need to make.",
        "List production risk areas: auth, billing, database, deployment, analytics.",
        "Provide one verification command and one live URL if available."
      ],
      prompt: [
        "You are my repo onboarding agent. In 30 minutes, turn this unfamiliar repo into a safe first-change plan.",
        "Goal: {describe the bug or feature}.",
        "Repo: {repo URL or local path}.",
        "Do not edit code yet. First map framework, routes, data model, auth, billing, env vars, deployment, tests, and risky files.",
        "Output: repo map, top 5 risks, exact files to inspect, smallest safe patch plan, test/build commands, rollback plan, and live verification checklist.",
        "After I approve, implement only the smallest patch and report changed files plus real command output."
      ],
      claudeCodeConfig: [
        "Create .claude/commands/repo-onboarding.md with this command:",
        "/repo-onboarding {goal}",
        "Rules:",
        "- Read before editing.",
        "- Never print secrets; show variable names only.",
        "- Ask before database mutations or production deploys.",
        "- Prefer small patches and real tests over broad refactors.",
        "- Final answer must include changed files, commands run, and verification URL."
      ],
      cursorConfig: [
        "Add to .cursorrules:",
        "You are working in an unfamiliar production repo.",
        "Before editing, summarize architecture, routes, data flow, risky boundaries, and test strategy.",
        "Only modify files needed for the requested change.",
        "Do not rewrite auth, billing, deployment, env loading, or database logic unless explicitly requested.",
        "After edits, run the narrowest validation command and provide rollback notes."
      ],
      mcpConfig: [
        "filesystem: allow only this repo path, read/write after approval.",
        "git: allow status, diff, branch, log; commit only after tests pass.",
        "github: read issues/PRs/actions; write comments only after user approval.",
        "docs/context7: read framework docs for exact API usage.",
        "browser: verify the affected local or production route.",
        "sequential-thinking: use for risk decomposition before patching."
      ],
      agentWorkflow: [
        "Triage: confirm goal and stop conditions.",
        "Map: identify framework, routes, modules, tests, deployment.",
        "Risk: flag auth/billing/data/env/security boundaries.",
        "Plan: propose smallest patch and validation commands.",
        "Execute: edit only approved files.",
        "Verify: run build/tests and browser/live checks.",
        "Report: changed files, evidence, rollback path, next step."
      ],
    },
  },
  {
    slug: "cursor-full-stack-feature-pack",
    title: "Cursor Full-Stack Feature Pack",
    tool: "Cursor",
    subtitle: "Ship a full-stack feature with repo context, docs, browser QA, and deployment checks.",
    audience: "Indie hackers and frontend/full-stack engineers using Cursor daily.",
    useCase: "You need to add a customer-visible feature and verify it across UI, API, billing, analytics, and SEO.",
    mcpStack: ["Filesystem MCP", "GitHub MCP", "Browser MCP", "Postgres or D1 MCP", "Context7 MCP", "Plausible or analytics MCP"],
    workflow: [
      "Start from a user story and identify UI/API/data/analytics touchpoints.",
      "Let Cursor edit only the narrow file set required for the feature.",
      "Use database MCP in read-only mode to validate schema assumptions.",
      "Use Browser MCP to run the real user task after build.",
      "Create a release note with exact changed files, tests, and rollback path.",
    ],
    savedTime: "3–6 hours per feature sprint.",
    whyPay: "It gives developers a safer way to use Cursor beyond autocomplete: a repeatable shipping workflow.",
    priceAnchor: "$19/month is cheaper than one failed deploy or one wasted afternoon.",
    seoTitle: "Cursor MCP Workflow Pack for Full-Stack Feature Shipping",
    seoDescription: "A Cursor MCP workflow pack for shipping full-stack features with repo context, database checks, browser QA, analytics, and deployment verification.",
    difficulty: "Low",
    willingness: "Very High",
    marketSize: "Very High",
    launchPriority: 2,
    copyReady: {
      missingContent: [
        "User story and acceptance criteria.",
        "Target route/component/API endpoint.",
        "Data source or schema location.",
        "Analytics event name and success URL.",
        "Definition of done for desktop and mobile."
      ],
      prompt: [
        "You are my Cursor full-stack feature shipping agent.",
        "Feature: {one-sentence user story}.",
        "Acceptance criteria: {bullets}.",
        "Inspect UI, API, data model, auth/permission checks, analytics, SEO metadata, and tests before editing.",
        "Implement the narrowest version that satisfies the acceptance criteria.",
        "Output changed files, validation commands, browser QA steps, analytics events touched, and rollback plan."
      ],
      claudeCodeConfig: [
        "Use Claude Code as reviewer after Cursor edits:",
        "/review-feature {feature-name}",
        "Check UI/API/data boundaries, missing states, mobile layout, SEO metadata, and unsafe side effects.",
        "Require real build/test output before marking done.",
        "Return P0/P1/P2 issues and exact patch suggestions only."
      ],
      cursorConfig: [
        "Add to .cursorrules:",
        "Ship narrow full-stack features, not rewrites.",
        "Always identify route, component, server/API action, data schema, auth state, analytics, and SEO impact.",
        "Preserve existing design tokens and navigation.",
        "Add loading, empty, error, unauthenticated, and success states when touched.",
        "Never create a new billing/login system; reuse existing auth/session utilities."
      ],
      mcpConfig: [
        "filesystem: repo-scoped read/write.",
        "browser: run the exact user task after build.",
        "database: read-only schema and sample rows unless explicit approval.",
        "github: read related issues/PRs and prepare PR summary.",
        "docs/context7: framework/library API references.",
        "analytics: verify event naming and pageview presence where available."
      ],
      agentWorkflow: [
        "Frame user story and done criteria.",
        "Trace route/component/API/data path.",
        "Plan file-level patch.",
        "Implement UI and data changes.",
        "Run lint/build or focused tests.",
        "Browser-test the happy path and failure states.",
        "Prepare launch note with files, risks, and rollback."
      ],
    },
  },
  {
    slug: "openai-codex-pr-review-pack",
    title: "OpenAI Codex PR Review Pack",
    tool: "OpenAI Codex",
    subtitle: "Review, fix, and merge PRs with targeted MCP context instead of broad code reading.",
    audience: "Founders, maintainers, and engineering leads reviewing AI-generated or contractor PRs.",
    useCase: "You have a PR that might work, but you need risk review, tests, security checks, and a merge decision quickly.",
    mcpStack: ["GitHub MCP", "Filesystem MCP", "Git MCP", "CI MCP", "Browser MCP", "Security scanner MCP"],
    workflow: [
      "Summarize PR intent, touched files, and hidden dependencies.",
      "Classify risk: auth, billing, data mutation, SEO, performance, and security.",
      "Ask Codex for targeted patch suggestions only after evidence is gathered.",
      "Run tests/build and inspect CI failures with exact reproduction steps.",
      "Produce a merge/no-merge decision with required fixes.",
    ],
    savedTime: "2–5 hours per complex PR review.",
    whyPay: "Teams pay to reduce merge risk, not to browse more MCP servers.",
    priceAnchor: "$9/month pays for itself if it prevents one bad merge.",
    seoTitle: "OpenAI Codex MCP Workflow Pack for PR Review and Fixes",
    seoDescription: "A practical Codex MCP workflow for PR review, risk classification, test focus, security checks, and merge decisions.",
    difficulty: "Low",
    willingness: "Very High",
    marketSize: "High",
    launchPriority: 3,
    copyReady: {
      missingContent: [
        "PR URL or branch diff.",
        "Intended user outcome.",
        "Known risky areas.",
        "CI status/log link.",
        "Merge policy: block on P0 only or P0/P1."
      ],
      prompt: [
        "You are my Codex PR review agent.",
        "PR/branch: {URL or branch}.",
        "Intent: {what should change for users}.",
        "Review the diff for correctness, security, data mutation risk, auth/billing breakage, test gaps, SEO regressions, and rollback risk.",
        "Do not rewrite the PR. First output P0/P1/P2 findings with file/line references and evidence.",
        "Then propose the minimum patch set and focused commands to prove the fix."
      ],
      claudeCodeConfig: [
        "Use Claude Code for second-pass risk review:",
        "/review-pr-risk {pr-url}",
        "Focus on hidden coupling, production data risk, webhook/raw body handling, env vars, and irreversible migrations.",
        "Output merge/no-merge with required fixes."
      ],
      cursorConfig: [
        "Add to .cursorrules for PR fixes:",
        "When fixing review findings, change only files related to accepted findings.",
        "Do not restyle unrelated UI or rename APIs.",
        "Preserve public route URLs and SEO metadata unless the finding requires a change.",
        "Every fix must map to a P0/P1/P2 review item."
      ],
      mcpConfig: [
        "github: read PR, diff, comments, checks; comment only after approval.",
        "git: compare base/head and inspect local diff.",
        "ci: read logs and failing job artifacts.",
        "filesystem: inspect touched files and nearby tests.",
        "browser: verify user-visible changes for UI PRs.",
        "security scanner: check dependency and secret exposure risks."
      ],
      agentWorkflow: [
        "Summarize PR intent and touched surface.",
        "Classify risks by P0/P1/P2.",
        "Inspect CI and test coverage.",
        "Produce merge/no-merge decision.",
        "Patch only accepted blockers.",
        "Rerun focused validation.",
        "Return final reviewer note with evidence."
      ],
    },
  },
  {
    slug: "claude-desktop-production-mcp-pack",
    title: "Claude Desktop Production MCP Pack",
    tool: "Claude Code",
    subtitle: "Configure Claude MCP access with least privilege, secrets discipline, and rollback notes.",
    audience: "Developers and operators adding filesystem, browser, GitHub, or database tools to Claude.",
    useCase: "You want Claude to work with real project files and tools, but you need safe boundaries.",
    mcpStack: ["Filesystem MCP", "GitHub MCP", "Browser MCP", "SQLite or Postgres MCP", "Secrets manager MCP"],
    workflow: ["Choose only the tools needed", "Restrict folders and credentials", "Copy config", "Run a smoke test", "Document rollback"],
    savedTime: "2–4 hours per secure setup.",
    whyPay: "The outcome is confidence that Claude can act without overbroad access.",
    priceAnchor: "$9 is cheaper than recovering from exposed secrets.",
    seoTitle: "Claude Desktop Production MCP Setup Workflow Pack",
    seoDescription: "A production-safe Claude Desktop MCP setup workflow with config, access boundaries, secrets handling, and rollback checks.",
    difficulty: "Low",
    willingness: "High",
    marketSize: "Very High",
    launchPriority: 4,
    copyReady: {
      missingContent: [
        "Operating system and Claude config path.",
        "Allowed project folders.",
        "Tools that need write access.",
        "Secrets that must never be exposed.",
        "Rollback method for disabling each server."
      ],
      prompt: [
        "You are my production MCP setup agent.",
        "Goal: configure Claude with only the MCP servers needed for {workflow}.",
        "Constraints: least privilege, no secret leakage, no broad home-directory access, reversible setup.",
        "Ask for OS/config path if unknown. Then produce a safe config, permission rationale, smoke test, and rollback steps.",
        "Do not include real secrets. Use environment variable names and [REDACTED]."
      ],
      claudeCodeConfig: [
        "Create .claude/commands/mcp-safe-setup.md:",
        "/mcp-safe-setup {workflow}",
        "Rules:",
        "- Default to read-only where possible.",
        "- Scope filesystem to explicit project folders.",
        "- Use env var names, never secret values.",
        "- Include one smoke test per MCP server.",
        "- Include disable/rollback instructions."
      ],
      cursorConfig: [
        "Add to .cursorrules when editing MCP configs:",
        "Treat MCP config changes as security-sensitive.",
        "Never expand filesystem access beyond the stated project path.",
        "Never paste API keys into tracked files.",
        "Prefer environment variables and local ignored config.",
        "Explain why each server is needed before adding it."
      ],
      mcpConfig: [
        "filesystem: explicit project allowlist only.",
        "github: repo-scoped token with least permissions.",
        "browser: no credential capture; use test accounts only.",
        "database: read-only unless a migration task is explicitly approved.",
        "secrets manager: reference env names only.",
        "logging: avoid printing tokens, cookies, or OAuth codes."
      ],
      agentWorkflow: [
        "Inventory required tasks.",
        "Map each task to the minimum MCP server.",
        "Write least-privilege config.",
        "Run smoke tests without secrets exposure.",
        "Document allowed actions and denied actions.",
        "Save rollback steps.",
        "Review monthly or after tool changes."
      ],
    },
  },
  {
    slug: "hermes-solo-saas-command-center-pack",
    title: "Hermes Solo SaaS Command Center Pack",
    tool: "Hermes",
    subtitle: "Run a small AI team across product, code, content, QA, deployment, and evidence reporting.",
    audience: "Solo founders and small teams operating multiple AI tool sites.",
    useCase: "You need a front-office agent to route code, content, QA, growth, and deployment tasks without losing accountability.",
    mcpStack: ["GitHub MCP", "Browser MCP", "Cloudflare MCP", "Search Console MCP", "Plausible MCP", "Linear or Kanban MCP"],
    workflow: ["Define roles", "Route work", "Collect reports", "Verify production", "Summarize exact next action"],
    savedTime: "5–10 hours per launch cycle.",
    whyPay: "The buyer wants operating leverage: fewer dropped tasks and more verified outcomes.",
    priceAnchor: "$19/month is cheap compared with one missed launch day.",
    seoTitle: "Hermes MCP Workflow Pack for Solo SaaS Operations",
    seoDescription: "A Hermes workflow pack for routing product, development, content, QA, Cloudflare deployment, and growth tasks across an AI team.",
    difficulty: "Medium",
    willingness: "High",
    marketSize: "Medium",
    launchPriority: 5,
    copyReady: {
      missingContent: [
        "Active project goal and success metric.",
        "Available specialist agents or toolsets.",
        "Shared report file paths.",
        "Deploy target and verification URLs.",
        "Escalation rules for payments, DNS, DB mutations, and public posts."
      ],
      prompt: [
        "You are the front-office Hermes orchestrator for my solo SaaS.",
        "Goal: {ship outcome} by {deadline}.",
        "Route code/deploy/debug tasks to dev, copy/SEO/growth tasks to content, and keep final reporting centralized.",
        "Every subtask must return evidence: file paths, commit, deploy URL, screenshots or command output.",
        "Do not let subagents speak to the user directly unless requested. Summarize decisions, blockers, and next action."
      ],
      claudeCodeConfig: [
        "Use Claude Code only for bounded implementation tasks:",
        "/implement-task {ticket}",
        "Return diff summary, test output, and rollback notes.",
        "Do not deploy or mutate production unless the Hermes orchestrator explicitly asks."
      ],
      cursorConfig: [
        "Add to .cursorrules for delegated code work:",
        "Tasks arrive from Hermes with a fixed scope.",
        "Do not expand scope, create new products, or alter billing/auth unless requested.",
        "Write concise implementation notes that Hermes can include in final evidence."
      ],
      mcpConfig: [
        "github: branch, PR, diff, and CI access.",
        "browser: production smoke tests and screenshots.",
        "cloudflare: deploy/status/logs with approval for production changes.",
        "search-console: inspect indexing only; no public changes without approval.",
        "analytics: read funnel/pageview data.",
        "kanban: task state and owner tracking."
      ],
      agentWorkflow: [
        "Receive user goal.",
        "Split into dev/content/QA/deploy tasks.",
        "Send one task to one specialist at a time.",
        "Collect reports in shared files or session summaries.",
        "Verify production with browser/curl.",
        "Return final status: done, blocked, or needs review.",
        "Create next 24-hour action list."
      ],
    },
  },
  {
    slug: "gemini-cli-large-context-research-pack",
    title: "Gemini CLI Large-Context Research Pack",
    tool: "Gemini CLI",
    subtitle: "Turn large docs, repositories, and transcripts into implementation-ready decisions.",
    audience: "Developers and PMs handling long docs, SDK references, or large repos.",
    useCase: "You need to compress a huge source into requirements, risk, and tasks before coding.",
    mcpStack: ["Filesystem MCP", "Docs MCP", "GitHub MCP", "Search MCP", "Obsidian or notes MCP"],
    workflow: ["Collect sources", "Extract constraints", "Compare options", "Create tickets", "Verify citations"],
    savedTime: "3–7 hours per research-to-plan cycle.",
    whyPay: "The output is not a summary; it is a decision-ready implementation brief.",
    priceAnchor: "$9 is cheaper than reading a 100-page SDK migration guide manually.",
    seoTitle: "Gemini CLI MCP Workflow Pack for Large-Context Research",
    seoDescription: "A Gemini CLI workflow pack for large-context docs, repos, SDK research, requirement extraction, and implementation planning.",
    difficulty: "Low",
    willingness: "Medium",
    marketSize: "High",
    launchPriority: 6,
    copyReady: {
      missingContent: [
        "Source folder, docs URL, transcript, or repo link.",
        "Decision to make after reading.",
        "Output format: brief, tickets, migration plan, or comparison.",
        "Citation requirements.",
        "Max scope and deadline."
      ],
      prompt: [
        "You are my Gemini CLI large-context research agent.",
        "Sources: {files/URLs/repos}.",
        "Decision: {what I need to decide or build}.",
        "Read broadly, but output only decision-useful material: constraints, options, tradeoffs, unknowns, recommended path, and implementation tickets.",
        "Cite source file/URL for each important claim. Mark assumptions clearly."
      ],
      claudeCodeConfig: [
        "Use Claude Code after Gemini produces the brief:",
        "/turn-brief-into-plan {brief-file}",
        "Validate technical feasibility against the repo.",
        "Convert recommendations into small implementation tasks with file paths and tests."
      ],
      cursorConfig: [
        "Add to .cursorrules for research-to-build work:",
        "Do not implement from a vague summary.",
        "Require cited constraints and explicit acceptance criteria before editing.",
        "Convert large-context findings into small route/component/API tasks."
      ],
      mcpConfig: [
        "filesystem: read source docs and repo files.",
        "docs/search: collect official references and migration notes.",
        "github: inspect examples/issues for real-world constraints.",
        "notes/obsidian: store brief and decisions.",
        "kanban: create build tickets after decision.",
        "browser: verify cited web docs are accessible."
      ],
      agentWorkflow: [
        "Collect source corpus.",
        "Extract constraints and decisions.",
        "Compare viable options.",
        "Recommend one path and explain tradeoffs.",
        "Create implementation tickets.",
        "Verify citations.",
        "Hand off to coding agent."
      ],
    },
  },
  {
    slug: "cursor-browser-qa-pack",
    title: "Cursor Browser QA Pack",
    tool: "Cursor",
    subtitle: "Stop trusting code review only. Verify real user flows in the browser before shipping.",
    audience: "Frontend developers and SaaS founders shipping landing pages, checkout, auth, and tools.",
    useCase: "You need to prove that pricing, login, checkout, forms, and SEO pages work on production.",
    mcpStack: ["Browser MCP", "Filesystem MCP", "GitHub MCP", "Analytics MCP", "Screenshot MCP"],
    workflow: ["Define acceptance tasks", "Run browser smoke tests", "Capture evidence", "Fix P0/P1 issues", "Prepare launch report"],
    savedTime: "2–4 hours per release.",
    whyPay: "It converts AI coding into verified production outcomes.",
    priceAnchor: "$19/month is cheaper than a broken checkout page.",
    seoTitle: "Cursor Browser QA MCP Workflow Pack",
    seoDescription: "A Cursor and Browser MCP workflow for production smoke testing, checkout QA, login verification, screenshots, and launch evidence.",
    difficulty: "Medium",
    willingness: "High",
    marketSize: "High",
    launchPriority: 7,
    copyReady: {
      missingContent: [
        "Production or preview URL.",
        "Critical user flows.",
        "Test account constraints.",
        "Expected analytics events.",
        "Definition of P0/P1/P2."
      ],
      prompt: [
        "You are my Cursor browser QA agent.",
        "URL: {production or preview URL}.",
        "Critical flows: {pricing/login/checkout/form/search/etc.}.",
        "Do not rely on code reading alone. Use the browser to perform each user task.",
        "Report P0/P1/P2 issues with steps to reproduce, expected result, actual result, screenshot note, affected URL, and recommended fix."
      ],
      claudeCodeConfig: [
        "Use Claude Code for bug fixing after QA:",
        "/fix-qa-issue {issue-id}",
        "Reproduce first, patch second, verify last.",
        "Final report must include before/after behavior and command/browser evidence."
      ],
      cursorConfig: [
        "Add to .cursorrules for QA fixes:",
        "Fix the observed production behavior, not hypothetical code style.",
        "Do not refactor unrelated components.",
        "Every fix must reference a QA issue and include a browser re-test step.",
        "Preserve SEO metadata and public routes."
      ],
      mcpConfig: [
        "browser: navigate, click, fill forms, capture snapshots.",
        "screenshot: save evidence for visual regressions.",
        "filesystem: patch affected UI/API files.",
        "analytics: confirm pageview or funnel event where available.",
        "github: prepare PR or commit summary.",
        "lighthouse/seo: check title, description, canonical, JSON-LD when relevant."
      ],
      agentWorkflow: [
        "List critical flows.",
        "Run browser smoke test per flow.",
        "Classify issues P0/P1/P2.",
        "Fix only P0/P1 blocking issues.",
        "Rebuild and redeploy if needed.",
        "Retest exact flow.",
        "Deliver evidence report."
      ],
    },
  },
  {
    slug: "mcp-security-audit-pack",
    title: "MCP Security Audit Pack",
    tool: "Claude Code",
    subtitle: "A high-trust asset pack for permission scoring, prompt-injection review, rollout gates, and safe MCP adoption.",
    audience: "CTOs, team leads, security reviewers, and builders adopting filesystem, browser, database, or GitHub MCP access.",
    useCase: "You need a repeatable decision package before giving an AI agent powerful tools in production.",
    mcpStack: ["GitHub MCP", "Filesystem MCP", "Security scanner MCP", "Secrets scanner MCP", "Browser MCP", "Policy MCP"],
    workflow: ["Inventory tools", "Score permissions", "Test prompt injection resistance", "Check maintenance", "Verify secrets boundaries", "Approve rollout or reject"],
    savedTime: "2–6 hours per toolchain approval.",
    whyPay: "The buyer pays for a decision package, not another generic server list.",
    priceAnchor: "$19 is cheaper than one leaked credential or one unsafe rollout.",
    seoTitle: "MCP Security Audit Pack | Permission Review, Prompt Injection, and Rollout Checklist",
    seoDescription: "A production-focused MCP security pack with permission scoring, prompt injection review, secrets checks, rollout gates, and approval decisions.",
    difficulty: "Low",
    willingness: "Very High",
    marketSize: "High",
    launchPriority: 1,
    copyReady: {
      missingContent: [
        "MCP server names and source links.",
        "Requested permissions and data scope.",
        "Where it will run: local, CI, server, or team machines.",
        "Threat model: prompt injection, secret exposure, or write access.",
        "Approval owner and rollout threshold."
      ],
      prompt: [
        "You are my MCP security audit agent.",
        "Servers to evaluate: {list}.",
        "Environment: {local/CI/server/team}.",
        "For each server, inspect permissions, maintainer trust, install method, network access, filesystem scope, prompt injection exposure, secret exposure risk, update cadence, and rollback method.",
        "Output approve/reject/approve-with-limits plus least-privilege config, rollout checklist, and smoke test."
      ],
      claudeCodeConfig: [
        "Create .claude/commands/audit-mcp.md:",
        "/audit-mcp {server-name}",
        "Check source, package, permissions, env vars, file access, network access, prompt injection risk, and maintenance signals.",
        "Never install or run unknown code without explicit approval."
      ],
      cursorConfig: [
        "Add to .cursorrules for MCP security tasks:",
        "Treat MCP install snippets as untrusted until reviewed.",
        "Do not add write permissions or broad filesystem roots by default.",
        "Keep secrets in env vars and ignored files only.",
        "Document approval reason and rollout gate beside each server."
      ],
      mcpConfig: [
        "github: inspect source repository and releases.",
        "filesystem: review local config files only.",
        "security scanner: scan package and lockfiles.",
        "secrets scanner: ensure no credentials are committed.",
        "browser: inspect docs/install instructions and test prompt injection surfaces.",
        "policy notes: store approved servers, permission limits, and rollout gates."
      ],
      agentWorkflow: [
        "Inventory candidate servers.",
        "Classify permissions and data exposure.",
        "Review maintainer, source, and install risk.",
        "Test prompt injection and secret boundaries.",
        "Write least-privilege config.",
        "Run safe smoke test.",
        "Approve, reject, or limit.",
        "Schedule periodic re-review before production rollout."
      ],
    },
  },
  {
    slug: "codex-test-failure-triage-pack",
    title: "Codex Test Failure Triage Pack",
    tool: "OpenAI Codex",
    subtitle: "Turn failing tests and CI logs into a minimal fix path.",
    audience: "Developers maintaining active repos with flaky or failing tests.",
    useCase: "CI is red and you need to know whether the bug is code, test, environment, or dependency drift.",
    mcpStack: ["GitHub MCP", "CI MCP", "Filesystem MCP", "Package registry MCP", "Git MCP"],
    workflow: ["Collect logs", "Classify failure", "Reproduce locally", "Patch minimal cause", "Rerun focused tests"],
    savedTime: "1–4 hours per CI failure.",
    whyPay: "A green pipeline is a concrete outcome with immediate value.",
    priceAnchor: "$9/month is less than one CI-debugging hour.",
    seoTitle: "OpenAI Codex MCP Workflow Pack for Test Failure Triage",
    seoDescription: "A Codex MCP workflow for CI logs, failing tests, reproduction, dependency drift, and minimal fixes.",
    difficulty: "Medium",
    willingness: "High",
    marketSize: "High",
    launchPriority: 9,
    copyReady: {
      missingContent: [
        "Failing command or CI job URL.",
        "Recent diff or branch name.",
        "Expected passing baseline.",
        "Environment versions.",
        "Whether flaky tests are acceptable or must be fixed now."
      ],
      prompt: [
        "You are my Codex test failure triage agent.",
        "Failing command/CI: {paste command or URL}.",
        "Recent change: {branch/PR/commit}.",
        "First classify the failure as product bug, test bug, environment drift, dependency drift, or flaky timing.",
        "Reproduce with the narrowest command, propose a minimal fix, run the focused test again, and output evidence."
      ],
      claudeCodeConfig: [
        "Use Claude Code for independent failure explanation:",
        "/explain-test-failure {log-file}",
        "Identify first failing assertion, likely root cause, minimal files to inspect, and safest validation command."
      ],
      cursorConfig: [
        "Add to .cursorrules for test triage:",
        "Do not rewrite tests just to make them pass.",
        "Find the first real failure before patching.",
        "Prefer focused test commands before full suites.",
        "Document whether the fix changes product code, test code, or environment config."
      ],
      mcpConfig: [
        "ci: read failing job logs and artifacts.",
        "github: inspect PR diff and checks.",
        "filesystem: inspect tests and related implementation.",
        "git: compare against last passing commit.",
        "package registry: check dependency/version drift.",
        "terminal: run focused reproduction command."
      ],
      agentWorkflow: [
        "Collect failing log and recent diff.",
        "Find first failure, not last cascade.",
        "Classify cause.",
        "Reproduce locally with focused command.",
        "Patch minimal root cause.",
        "Rerun focused and broader validation.",
        "Report fix type and residual risk."
      ],
    },
  },
  {
    slug: "gemini-cli-product-spec-pack",
    title: "Gemini CLI Product Spec Pack",
    tool: "Gemini CLI",
    subtitle: "Convert long user notes, competitor pages, and docs into a shippable product spec.",
    audience: "Founders and PMs turning messy ideas into buildable AI product tasks.",
    useCase: "You need to decide what to build in 72 hours and what to cut.",
    mcpStack: ["Search MCP", "Browser MCP", "Docs MCP", "Notes MCP", "Kanban MCP"],
    workflow: ["Gather evidence", "Extract user jobs", "Cut non-MVP scope", "Write page contracts", "Create build tasks"],
    savedTime: "3–6 hours per product sprint.",
    whyPay: "It reduces scope confusion and turns research into shippable work.",
    priceAnchor: "$19/month is cheap if it prevents one wasted build cycle.",
    seoTitle: "Gemini CLI Product Spec MCP Workflow Pack",
    seoDescription: "A Gemini CLI workflow pack for converting long research, notes, and competitor pages into a focused product spec and MVP tasks.",
    difficulty: "Medium",
    willingness: "Medium",
    marketSize: "High",
    launchPriority: 10,
    copyReady: {
      missingContent: [
        "Raw notes, competitor URLs, or customer messages.",
        "Target user and business goal.",
        "Deadline and must-not-build list.",
        "Existing infrastructure to reuse.",
        "Output format: PRD, route contract, tickets, or launch checklist."
      ],
      prompt: [
        "You are my Gemini CLI product spec agent.",
        "Inputs: {notes/URLs/docs}.",
        "Goal: ship a revenue-relevant MVP in {timebox}.",
        "Extract user jobs, willingness-to-pay triggers, MVP scope, must-not-build items, page routes, SEO angle, acceptance criteria, and launch checklist.",
        "Cut anything that does not help the first paid user within the deadline."
      ],
      claudeCodeConfig: [
        "Use Claude Code after the spec is frozen:",
        "/validate-spec-against-repo {spec-file}",
        "Check if each route/API/data requirement maps to existing code or a small change.",
        "Flag anything that implies new auth, payment, membership, or large refactor."
      ],
      cursorConfig: [
        "Add to .cursorrules for spec execution:",
        "Implement only the frozen route contract and acceptance criteria.",
        "Do not add unapproved pages, plans, or new systems.",
        "Reuse existing components, auth, billing, analytics, and deployment patterns."
      ],
      mcpConfig: [
        "search/browser: inspect competitor pages and SERP intent.",
        "docs/filesystem: read existing PRDs and repo structure.",
        "notes: store frozen decisions.",
        "kanban: create build tickets with owner/status.",
        "github: link tickets to implementation branches.",
        "analytics/search-console: validate existing demand signals where available."
      ],
      agentWorkflow: [
        "Gather messy inputs.",
        "Extract paid user jobs.",
        "Choose one MVP direction.",
        "Freeze route/content/data contract.",
        "Cut non-72-hour scope.",
        "Create build tickets.",
        "Hand off to implementation and QA."
      ],
    },
  },
];

export const topLaunchPacks = workflowPacks.filter((pack) => pack.launchPriority <= 3);

export function getWorkflowPack(slug: string) {
  return workflowPacks.find((pack) => pack.slug === slug);
}
