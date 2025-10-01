import type { Post } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/posts");
  let posts: Post[] = await response.json();
  posts = posts.filter(post => post.published);
  posts = posts.slice(0, 2);

  return { posts };
}) satisfies PageServerLoad;
