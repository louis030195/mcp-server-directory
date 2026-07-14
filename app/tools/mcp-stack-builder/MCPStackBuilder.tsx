"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Copy, Network } from "lucide-react";
import { agentGoals, buildMcpStack, clientOptions, dataSourceOptions, deploymentPreferences, securityLevels, type AgentGoal, type DeploymentPreference, type McpClient, type SecurityLevel } from "@/data/mcpStackBuilder";
import { trackAiPmToolComplete } from "@/lib/analytics/ai-pm-client";

export default function MCPStackBuilder() {
  const [goal, setGoal] = useState<AgentGoal>("coding");
  const [client, setClient] = useState<McpClient>("Claude Desktop");
  const [dataSources, setDataSources] = useState<string[]>(["Filesystem", "GitHub"]);
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>("Read only");
  const [deployment, setDeployment] = useState<DeploymentPreference>("Local");
  const renderedResult = useRef(false);

  const stack = useMemo(() => buildMcpStack(goal, client, dataSources, securityLevel, deployment), [client, dataSources, deployment, goal, securityLevel]);
  const selectedGoal = agentGoals.find((item) => item.id === goal) ?? agentGoals[0];

  useEffect(() => {
    if (!renderedResult.current && stack.categories.length > 0 && stack.setupSteps.length > 0) {
      renderedResult.current = true;
      trackAiPmToolComplete("stack");
    }
  }, [stack.categories.length, stack.setupSteps.length]);

  const toggleDataSource = (source: string) => {
    setDataSources((current) => current.includes(source) ? current.filter((item) => item !== source) : [...current, source]);
  };

  const configSkeleton = `{
  "mcpServers": {
    "example-server": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "env": {
        "API_TOKEN": "${"${YOUR_TOKEN}"}"
      }
    }
  }
}`;

  return (
    <section id="builder" className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Stack inputs</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">Choose your agent workflow</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">This static planner maps your workflow to MCP server categories, setup order, and safety checks. It does not connect accounts or call an AI model.</p>

            <div className="mt-6 space-y-5">
              <label className="block"><span className="text-sm font-medium text-slate-700">Agent goal</span><select value={goal} onChange={(event) => setGoal(event.target.value as AgentGoal)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none ring-blue-100 focus:border-blue-500 focus:ring-4">{agentGoals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
              <label className="block"><span className="text-sm font-medium text-slate-700">MCP client</span><select value={client} onChange={(event) => setClient(event.target.value as McpClient)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none ring-blue-100 focus:border-blue-500 focus:ring-4">{clientOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
              <div><p className="text-sm font-medium text-slate-700">Data sources</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{dataSourceOptions.map((source) => <label key={source} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700"><input type="checkbox" checked={dataSources.includes(source)} onChange={() => toggleDataSource(source)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />{source}</label>)}</div></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-medium text-slate-700">Security level</span><select value={securityLevel} onChange={(event) => setSecurityLevel(event.target.value as SecurityLevel)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950">{securityLevels.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="block"><span className="text-sm font-medium text-slate-700">Deployment</span><select value={deployment} onChange={(event) => setDeployment(event.target.value as DeploymentPreference)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950">{deploymentPreferences.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Recommended MCP stack</p>
            <h2 className="mt-3 text-2xl font-bold">{selectedGoal.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selectedGoal.description}</p>

            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <h3 className="font-semibold text-white">Recommended server categories</h3>
              <div className="mt-3 flex flex-wrap gap-2">{stack.categories.map((item) => <span key={item} className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-100">{item}</span>)}</div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/10 p-5">
              <h3 className="font-semibold text-white">Suggested servers</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{stack.servers.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-blue-300" />{item}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Setup order</h2>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-700">{stack.setupSteps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{index + 1}</span><span>{step}</span></li>)}</ol>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Security checklist</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">{stack.securityChecklist.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-blue-600" />{item}</li>)}</ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <div className="flex items-center gap-3"><Network className="h-6 w-6 text-blue-300" /><h2 className="text-2xl font-bold">Example config skeleton</h2></div>
          <p className="mt-3 text-sm leading-6 text-slate-300">Replace placeholders with your own package names and secrets. Never commit real tokens.</p>
          <pre className="mt-5 overflow-x-auto rounded-2xl bg-black/40 p-5 text-sm text-slate-100"><code>{configSkeleton}</code></pre>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400"><Copy className="h-4 w-4" /> Copy manually after reviewing every permission.</div>
        </div>
      </div>
    </section>
  );
}
