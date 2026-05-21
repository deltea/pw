<script lang="ts">
	import "../app.css";
  import "iconify-icon";
  import { oneko } from "$lib/oneko";
  import { onMount } from "svelte";
  import { isMobileUserAgentData } from "$lib/utils";

  import Footer from "$lib/components/Footer.svelte";
  import MusicPlayer from "$components/MusicPlayer.svelte";
  import DraggableWindow from "$components/DraggableWindow.svelte";

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

<div class="min-h-screen flex justify-center crt bg-grid">
  <main class="w-full max-w-content flex flex-col py-8 items-start px-8 bg-bg">
    <!-- main page content -->
    <div class="grow w-full flex flex-col">
      {@render children?.()}
    </div>

    <Footer />
  </main>
</div>

<DraggableWindow>
  <MusicPlayer />
</DraggableWindow>
