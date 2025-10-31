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
  description="all my random playlists in one place"
/>

<p class="text-muted mb-6">
  click a playlist to load it in the music player!<br>
  these are all sorted by chronological order:
</p>

{#each data.playlists as playlist}
  <div class="flex">
    <p class="w-16">#{playlist.num}</p>
    <button
      onclick={() => (musicPlayerUrl.set(playlist.url))}
      class="font-bold grow hover:underline text-left cursor-pointer"
    >
      {playlist.title.toLowerCase()}
    </button>
    <p class="text-muted">{formatDate(playlist.date)}</p>
  </div>
{/each}

<p class="text-muted my-6">
  these ones are random unrelated playlists, sorted by no particular order:
</p>

<div class="grid grid-cols-1 sm:grid-cols-2">
  {#each data.unsortedPlaylists as playlist}
    <div class="flex">
      <button
        onclick={() => (musicPlayerUrl.set(playlist.url))}
        class="font-bold grow hover:underline text-left cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis"
      >
        {playlist.title.toLowerCase()}
      </button>
    </div>
  {/each}
</div>
