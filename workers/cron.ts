/**
 * Frequently articles data fetching and caching to KV
 *
 * Powered by Cloudflare Workers and KV
 */

export default {
  async scheduled(_controller: ScheduledController, env: Env, _ctx: ExecutionContext) {
    await env.ARTICLES_KV.put("articles", new Date().toISOString());  // Date string as sample data now
    console.log("cron ran");
  },
};
