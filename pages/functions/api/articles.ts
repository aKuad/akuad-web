/**
 * Articles data responding API
 *
 * Powered by Cloudflare Workers & Pages
 */

export const onRequest: PagesFunction<Env> = async (context) => {
  const value = await context.env.ARTICLES_KV?.get("articles");
  return new Response(value);
};
