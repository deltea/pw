<script lang="ts">
  import Header from "$components/Header.svelte";
  import { musicPlayerUrl } from "$lib/stores.js";
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
    <!-- <a target="_blank" href={playlist.url} class="font-bold grow hover:underline">
      {playlist.title.toLowerCase()}
    </a> -->
    <button
      onclick={() => (musicPlayerUrl.set(playlist.url))}
      class="font-bold grow hover:underline text-left cursor-pointer"
    >
      {playlist.title.toLowerCase()}
    </button>
    <p class="text-muted">{formatDate(playlist.date)}</p>
  </div>
{/each}
