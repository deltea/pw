import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/posts/${params.slug}.svx`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch {
    error(404, "post not found");
  }
}
