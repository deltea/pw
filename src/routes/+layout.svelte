<script lang="ts">
	import "../app.css";
  import "iconify-icon";
  import { oneko } from "$lib/oneko";
  import { onMount } from "svelte";
  import { isMobileUserAgentData } from "$lib/utils";
  import { musicPlayerUrl } from "$lib/stores";

  import Footer from "$lib/components/Footer.svelte";
  import MusicPlayer from "$components/MusicPlayer.svelte";

	let { children } = $props();

  onMount(() => {
    if (!isMobileUserAgentData()) {
      oneko();
    }
  });
</script>

<svelte:head>
  <title>@deltea</title>
  <meta name="description" content="hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!" />
</svelte:head>

<div class="min-h-screen flex justify-center py-8">
  <main class="w-full max-w-3xl flex flex-col items-start px-4">
    <!-- main page content -->
    <div class="grow w-full flex flex-col">
      {@render children?.()}
    </div>

    <Footer />
  </main>
</div>

{#if $musicPlayerUrl}
  <div class="fixed bottom-0 right-0 m-4 w-80">
    <MusicPlayer />
  </div>
{/if}
