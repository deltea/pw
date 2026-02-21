<script lang="ts">
  import Header from "$components/Header.svelte";

  let { data } = $props();
  console.log(data.subscriptions[0]);
</script>

<svelte:head>
  <title>@deltea - subscriptions</title>
</svelte:head>

<Header
  title="subscriptions"
  description="cool people i subscribe to on youtube"
/>

<!-- images don't load because of 429 too many requests -->
{#each data.subscriptions as sub}
  <img
    loading="lazy"
    class="w-24"
    src={sub.snippet.thumbnails.medium.url}
    alt={sub.snippet.title}
  />
  <div>{sub.snippet.title}</div>
{/each}
