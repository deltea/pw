<script lang="ts">
	import "../app.css";
  import "iconify-icon";
	// import favicon from "$lib/assets/favicon.svg";
  import pfp from "$lib/assets/vibing.png";
  import banner from "$lib/assets/banner.gif"
  import { oneko } from "$lib/oneko";
  import { onMount } from "svelte";

	let { children } = $props();

  function isMobileUserAgentData() {
    if (navigator.userAgent) {
      console.log(navigator.userAgent.toLowerCase());
      return navigator.userAgent.toLowerCase().includes("mobile");
    }
    return false; // Fallback for browsers without support
  }

  onMount(() => {
    if (!isMobileUserAgentData()) {
      oneko();
    }
  });
</script>

<svelte:head>
  <title>@deltea</title>
	<!-- <link rel="icon" href={favicon} /> -->
  <meta name="description" content="hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!" />
</svelte:head>

<div class="min-h-screen flex justify-center py-8">
  <main class="w-full max-w-3xl flex flex-col items-start px-4">
    <!-- banner -->
    <!-- <div class="grid-background border-2 border-fg w-full h-30"></div> -->
    <div class="w-full h-30 border2 border-fg">
      <div
        class="bg-cover bg-[center_top_-8.5rem] w-full h-full"
        style:background-image="url({banner})"
      ></div>
    </div>

    <div class="flex gap-6 sm:-translate-y-8 -translate-y-4 sm:translate-x-8 translate-x-6">
      <!-- pfp -->
      <a aria-label="home" href="/" class="block sm:size-28 size-20 rounded-full outline3 outline-fg">
        <div
          class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg"
          style:background-image="url({pfp})"
        ></div>
      </a>

      <!-- title card -->
      <a href="/" class="flex flex-col sm:gap-1.5 gap-1 justify-end">
        <h1 class="font-bold text-2xl sm:text-3xl">@deltea</h1>
        <h2 class="fontbold text-fg">
          <span>1.01x developer</span>
          <span class="hidden sm:inline">| currently tinkering with hardware</span>
        </h2>
      </a>
    </div>

    <p class="text-muted text-justify mt-6 sm:mt-0">
      hi! i'm leo (14y), and this is my personal website where i put the things i make, like games, web apps, and other random stuff!
    </p>

    <!-- main page content -->
    <div class="grow w-full">
      {@render children?.()}
    </div>

    <footer class="font-bold mt-10 flex sm:justify-between justify-center items-center w-full">
      <div class="flex gap-4 underline">
        <a target="_blank" href="https://github.com/deltea">github</a>
        <a target="_blank" href="https://deltea.itch.io">itch.io</a>
        <a target="_blank" href="https://github.com/deltea/dotfiles">dotfiles</a>
        <!-- <a target="_blank" href="mailto:hello@deltea.space">contact</a> -->
        <a href="/guestbook">guestbook</a>
      </div>

      <span class="font-normal text-muted sm:block hidden">made with sveltekit</span>
    </footer>
  </main>
</div>
