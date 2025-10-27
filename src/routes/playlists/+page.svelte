<script lang="ts">
  import Header from "$components/Header.svelte";
    import { formatDate } from "$lib/utils";

  let { data } = $props();

  const playlists = data.playlists.filter((x: any) => /- Mix/.test(x.snippet.title));
  console.log(data.playlists);
</script>

<svelte:head>
  <title>@deltea - playlists</title>
</svelte:head>

<Header
  title="playlists"
  description="all my mixes over the years"
/>

{#each playlists as playlist}
  <div class="flex gap-6">
    <p>#{playlist.snippet.title.slice(-2)}</p>
    <a target="_blank" href="https://music.youtube.com/playlist?list={playlist.id}" class="font-bold grow hover:underline">
      {playlist.snippet.title.slice(0, -9).toLowerCase()}
    </a>
    <p class="text-muted">{formatDate(new Date(playlist.snippet.publishedAt).toString())}</p>
  </div>
{/each}
