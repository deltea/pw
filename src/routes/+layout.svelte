<script lang="ts">
	import "../app.css";
  import "iconify-icon";
  import { oneko } from "$lib/oneko";
  import { onMount } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();

  function isMobileUserAgentData() {
    if (navigator.userAgent) {
      console.log(navigator.userAgent.toLowerCase());
      return navigator.userAgent.toLowerCase().includes("mobile");
    }

    return false;
  }

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
    {@render children?.()}

    <Footer />
  </main>
</div>
