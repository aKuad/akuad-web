/**
 * Frequently articles data fetching and caching to KV
 *
 * Powered by Cloudflare Workers and KV
 */

import { fetch_posts } from "@akuad/antenna";


const POST_PER_PAGE = 20;


export default {
  async scheduled(_controller: ScheduledController, env: Env, _ctx: ExecutionContext) {
    const fetch_result = await fetch_posts([{
      site_name: "qiita", uid: "aKuad"
    }]);

    if(fetch_result.fail_reasons.length)
      console.warn(fetch_result.fail_reasons);

    const posts = fetch_result.posts.reverse(); // fetch_posts returns old first order, reverse to latest order
    const total_page_count = Math.ceil(posts.length / POST_PER_PAGE);

    for(let page = 0; page < total_page_count; page++) {
      const post_start =  page      * POST_PER_PAGE;
      const post_end   = (page + 1) * POST_PER_PAGE;
      const page_posts = posts.slice(post_start, post_end);

      const next_page = (page == total_page_count - 1) ? null : page + 1; // Set null for last page

      await env.ARTICLES_KV.put(`articles-${page}`, JSON.stringify({ articles: page_posts, next_page }));
    }

    console.log(`KV updated: ${posts.length} articles, ${total_page_count} pages`);
  }
};
