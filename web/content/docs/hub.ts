export const docsHub = {
  title: "Everything you need to Get Started with StackGen",
  productsTitle: "Products",
  productsBody:
    "Pick a product to open its docs hub. Each area is grouped so onboarding, how-tos, and deeper reference stay easy to scan.",
  products: [
    {
      href: "/docs/stackgen",
      title: "StackGen",
      body: "Design and ship cloud infrastructure and applications, with clear paths from first setup to production.",
    },
    {
      href: "/docs/aiden",
      title: "Aiden",
      body: "AI help for SRE: answers, guided tasks, and the integrations on-call already uses.",
    },
    {
      href: "/docs/observenow",
      title: "ObserveNow",
      body: "Bring metrics, dashboards, and alerts together so on-call can spot and fix issues quickly.",
    },
  ],
  toolsTitle: "Developer tools",
  toolsLead:
    "Build, deploy, and manage StackGen from your workflows. Use the CLI, Integrations and MCP tools to move from configuration to production with control and consistency.",
  tools: [
    {
      href: "/docs/stackgen/cli-guide",
      title: "StackGen CLI",
      body: "Run workflows, manage environments, and access the full command surface when you need precision.",
    },
    {
      href: "/docs/stackgen/integrations",
      title: "Integrations",
      body: "Work with tools like Backstage, Terraform Cloud, and Wiz, keeping one flow from portal to production.",
    },
    {
      href: "/docs/stackgen/mcp",
      title: "MCP",
      body: "Enable IDEs and AI assistants to act with awareness and guardrails you define.",
    },
  ],
} as const;
