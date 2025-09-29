<script lang="ts">
  import type { PageProps } from "../$types";

  import Header from "$lib/components/Header.svelte";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>@deltea - blog</title>
</svelte:head>

<Header title="blog" description="random stuff i think about and decide to yap about" />
