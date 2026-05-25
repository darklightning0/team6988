export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }
    const url = 'https://developer.api.autodesk.com/authentication/v2/token';
    const authString = btoa(`${env.APS_CLIENT_ID}:${env.APS_CLIENT_SECRET}`);
    const body = new URLSearchParams({ grant_type: 'client_credentials', scope: 'viewables:read' });
    
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${authString}` }, body: body.toString() });
      const data = await response.json();
      return new Response(JSON.stringify({ access_token: data.access_token, expires_in: data.expires_in }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
  },
};
