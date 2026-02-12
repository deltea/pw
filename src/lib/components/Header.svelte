<script lang="ts">
  import pfp from "$lib/assets/pfp.png";
  import banner from "$lib/assets/banner.gif";
  import { onMount } from "svelte";

  let { title, description }: {
    title: string;
    description: string;
  } = $props();

  let spikesElement: HTMLDivElement;
  let scrollAmount = 0;
  let interval: NodeJS.Timeout;

  function scroll() {
    scrollAmount += 6;

    if (spikesElement) {
      spikesElement.style.backgroundPositionX = `-${scrollAmount}px`;
    }
  }

  onMount(() => {
    interval = setInterval(scroll, 150);
    return () => clearInterval(interval);
  });

</script>

<!-- banner -->
<div class="w-full sm:h-36 h-30 border-fg">
  <div
    class="bg-cover bg-[center_40%] -scale-x-100 w-full h-full relative overflow-hidden"
    style:background-image="url({banner})"
  >
    <div
      bind:this={spikesElement}
      class="absolute bottom-[-1px] w-full bg-contain bg-repeat-x sm:h-6 h-4 left-0"
      style:background-image="url('/spike.svg')"
    ></div>
  </div>
</div>

<div class="flex flex-col sm:flex-row sm:gap-6 gap-4 sm:-translate-y-8 -translate-y-4 items-center sm:items-end sm:translate-x-8 translate-x-0 mb-6 sm:mb-2">
  <!-- pfp -->
  <a aria-label="home" href="/" class="block sm:size-28 size-20 rounded-full outline-fg relative group overflow-hidden">
    <div
      class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg"
      style:background-image="url({pfp})"
    ></div>
    <img src="/shades.png" alt="Shades" class="absolute group-hover:top-3.5 -top-16 -rotate-3 left-1/4 size-16 -scale-x-100 duration-150">
  </a>

  <!-- title card -->
  <a href="/" class="flex flex-col gap-2 sm:gap-1.5 text-center sm:text-left sm:px-0 px-10">
    <h1 class="font-bold text-2xl sm:text-2xl">{title}</h1>
    <h2 class="text-fg sm:w-full">{@html description}</h2>
  </a>
</div>
