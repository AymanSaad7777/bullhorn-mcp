# Bullhorn MCP Integration

This project provides a Model Context Protocol (MCP) server that integrates with the Bullhorn API, allowing you to authenticate and search for candidates in your Bullhorn database using simple tools.

## Features
- Authenticate with Bullhorn using your username and password
- Search for candidates by name or partial name
- Modular code structure with helpers for authentication and search

## Project Structure
- `src/index.ts`: Main entry point for the MCP server
- `src/helpers.ts`: Contains helper functions for authentication and candidate search
- `build/`: Compiled JavaScript output

## Prerequisites
- Node.js (v18 or higher recommended for native fetch support)
- Bullhorn API credentials (username and password)

## Installation
1. Clone the repository or copy the project files to your local machine.
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Build the project (if using TypeScript):
   ```sh
   npm run build
   ```
2. Add MCP server to your favourite AI agent (e.g Claude, Github Copilot, ...)
3. Use the MCP tools to:
   - Authenticate: Provide your Bullhorn username and password
   - Search: Query Candidates by name

## Customization
- You can modify or extend the tools in `src/index.ts` and helper functions in `src/helpers.ts` to add more Bullhorn API features as needed.

## Notes
- Make sure your Bullhorn credentials are kept secure and not hard-coded in public files.
- The project uses the `zod` library for runtime validation of tool parameters.

## License
This project is for internal or educational use. Please check with your organization for licensing and usage policies.
