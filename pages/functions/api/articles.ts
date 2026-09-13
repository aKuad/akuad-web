/**
 * Articles data responding API
 *
 * Powered by Cloudflare Workers & Pages
 */

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const page = url.searchParams.get("page") || 0; // Default page 0
  const value = await context.env.ARTICLES_KV.get(`articles-${page}`);

  if(value)
    return new Response(value, { headers: { "content-type": "application/json" }});
  else
    return new Response("Page number out of range", { status: 404 });
};
