<script lang="ts">
  import type { PageProps } from "../$types";
  import { formatDate } from "$lib/utils";

  import Header from "$lib/components/Header.svelte";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>@deltea - blog</title>
</svelte:head>

<Header title="blog" description="random stuff i think about and decide to yap about" />

<div class="flex gap-4 w-full flex-col">
  {#each data.posts as post}
    <a href="/blog/{post.slug}" class="flex flex-col border-2 border-fg gap-4 p-3 w-full">
      <div class="flex justify-between w-full">
        <p class="font-bold">{post.title}</p>
        <time>{formatDate(post.date)}</time>
      </div>

      <p class="break-words line-clamp-4 text-muted">
        {post.excerpt}
      </p>
    </a>
  {/each}
</div>
