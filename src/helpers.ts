const authUrl = "https://universal.bullhornstaffing.com/universal-login/session/login?";

const bullhornSession = {
  BhRestToken: null as string | null,
  restUrl: null as string | null
};

export const authenticate = async (username: string, password: string) => {
  const headers = {
    Accept: "application/json",
  };
  try {
    const res: any = await fetch(`${authUrl}username=${username}&password=${password}`, { headers });
    const authRes = await res.json();
    console.log('Auth response:', authRes);
    const sessionData = authRes.sessions?.find((s: any) => s.name === "rest")?.value;
    if (!sessionData) {
      throw new Error("Failed to retrieve session data.");
    }
    bullhornSession.BhRestToken = sessionData.token;
    bullhornSession.restUrl = sessionData.endpoint;
    return { content: [{ type: "text" as const, text: "Bullhorn authentication successful." }] };
  } catch (err: any) {
    return { content: [{ type: "text" as const, text: `Authentication failed: ${err.message}` }] };
  }
};

export const search = async (query: string) => {
  try {
    if (!bullhornSession.BhRestToken || !bullhornSession.restUrl) {
      throw new Error("Not authenticated. Please authenticate first.");
    }
    const searchRes = await fetch(`${bullhornSession.restUrl}search/Candidate?query=${encodeURIComponent(`name:${query}`)}&fields=id,firstName,lastName,email&BhRestToken=${bullhornSession.BhRestToken}`);
    const searchData = await searchRes.json();
    if (!searchData.data) return { content: [{ type: "text" as const, text: "No candidates found." }] };
    const results = searchData.data.map((c: any) => `${c.id}: ${c.firstName} ${c.lastName} (${c.email || 'no email'})`).join("\n");
    return { content: [{ type: "text" as const, text: `Candidates found for '${query}':\n${results}` }] };
  } catch (err: any) {
    return { content: [{ type: "text" as const, text: `Error: ${err.message}` }] };
  }
};
