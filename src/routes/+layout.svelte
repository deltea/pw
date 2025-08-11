<script lang="ts">
	import "../app.css";
  import "iconify-icon";
	import favicon from "$lib/assets/favicon.svg";
  import pfp from "$lib/assets/pfp.jpg";

	let { children } = $props();
</script>

<svelte:head>
  <title>@deltea</title>
	<link rel="icon" href={favicon} />
  <meta name="description" content="hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!" />
</svelte:head>

<div class="min-h-screen flex justify-center py-8">
  <main class="w-full max-w-3xl flex flex-col items-start px-4">
    <!-- banner -->
    <div class="grid-background border-2 border-fg w-full h-24"></div>

    <div class="flex gap-6 sm:-translate-y-10 -translate-y-3 sm:translate-x-8 translate-x-6">
      <!-- pfp -->
      <a aria-label="home" href="/" class="block sm:size-28 size-20 rounded-full outline-[16px] outline-bg bg-bg">
        <div
          class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg"
          style:background-image="url({pfp})"
        ></div>
      </a>

      <!-- title card -->
      <div class="flex flex-col gap-0 justify-end">
        <h1 class="font-bold text-3xl">@deltea</h1>
        <h2 class="text-base font-bold text-fg">professional wip-er</h2>
      </div>
    </div>

    <p class="text-base text-muted mt-6 sm:mt-0">
      hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!
    </p>

    <!-- main page content -->
    <div class="grow w-full">
      {@render children?.()}
    </div>

    <footer class="font-bold mt-8 flex sm:justify-between justify-center items-center w-full">
      <div class="flex gap-4 underline">
        <a target="_blank" href="https://github.com/deltea">github</a>
        <a target="_blank" href="https://deltea.itch.io">itch.io</a>
        <a target="_blank" href="https://github.com/deltea/dotfiles">dotfiles</a>
      </div>

      <span class="font-normal text-muted sm:block hidden">made with svelte</span>
    </footer>
  </main>
</div>
