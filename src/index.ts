import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { authenticate, search } from "./helpers.js";

// Create server instance
const server = new McpServer({
  name: "Bullhorn-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "bullhornAuthenticate",
  "Authenticate with Bullhorn using username and password.",
  {
    username: z.string().describe("Bullhorn username used to authenticate"),
    password: z.string().describe("Bullhorn password used to authenticate"),
  },
  async ({ username, password }) => authenticate(username, password)
);

server.tool(
  "bullhornSearchCandidates",
  "Search Bullhorn for candidates by name.",
  {
    query: z.string().describe("Search query for candidates. it represents a name or part of a name."),
  },
  async ({ query }) => search(query)
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bullhorn MCP Server running...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});