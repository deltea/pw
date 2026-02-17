<script lang="ts">
  import type { PageProps } from "./$types";
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
    <a href="/blog/{post.slug}" class="flex flex-col border-2 border-fg p-3 w-full group">
      <div class="flex justify-between w-full">
        <p class="font-bold group-hover:underline">{post.title}</p>
        <time>{formatDate(post.date)}</time>
      </div>

      <div class="flex gap-2 mb-5 mt-1">
        {#each post.tags as tag}
          <div class="flex items-center gap-1.5 bg-bg-2 py-1 px-2">
            <iconify-icon icon="mdi:tag" class="text-base text-muted"></iconify-icon>
            <p class="text-sm text-muted">{tag}</p>
          </div>
        {/each}
      </div>

      <p class="break-words line-clamp-4 text-muted">
        {post.excerpt}
      </p>
    </a>
  {/each}
</div>
