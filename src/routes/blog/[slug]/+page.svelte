<script lang="ts">
  import type { PageProps } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import { formatDate } from "$lib/utils";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>@deltea - {data.meta.title}</title>
  <meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<Header
  title={data.meta.title}
  description="published {formatDate(data.meta.date)}"
/>

<article class="prose prose-default prose-base prose-h1:text-3xl prose-img:text-center prose-img:m-auto max-w-full prose-ul:list-['-_'] prose-pre:bg-bg-2 prose-pre:rounded-none prose-code:text-sm">
  <data.content />
</article>
