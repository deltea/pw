<script lang="ts">
  import Header from "$components/Header.svelte";
  import { formatDate } from "$lib/utils";

  let { data } = $props();
</script>

<svelte:head>
  <title>@deltea - playlists</title>
</svelte:head>

<Header
  title="playlists"
  description="all my mixes sorted in chronological order"
/>

{#each data.playlists as playlist}
  <div class="flex">
    <p class="w-16">#{playlist.num}</p>
    <a target="_blank" href={playlist.url} class="font-bold grow hover:underline">
      {playlist.title.toLowerCase()}
    </a>
    <p class="text-muted">{formatDate(playlist.date)}</p>
  </div>
{/each}
