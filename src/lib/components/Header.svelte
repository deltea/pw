<script lang="ts">
  import pfp from "$lib/assets/pfp.png";
  import banner from "$lib/assets/banner.gif"

  let { title, description }: {
    title: string;
    description: string;
  } = $props();
</script>

<!-- banner -->
<div class="w-full h-30 border2 border-fg">
  <div
    class="bg-cover bg-[center_40%] -scale-x-100 w-full h-full"
    style:background-image="url({banner})"
  ></div>
</div>

<div class="flex flex-col sm:flex-row sm:gap-6 gap-4 sm:-translate-y-8 -translate-y-4 items-center sm:items-end sm:translate-x-8 translate-x-0 mb-6 sm:mb-2">
  <!-- pfp -->
  <a aria-label="home" href="/" class="block sm:size-28 size-20 rounded-full outline-fg">
    <div
      class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg"
      style:background-image="url({pfp})"
    ></div>
  </a>

  <!-- title card -->
  <a href="/" class="flex flex-col gap-2 sm:gap-1.5 justify-end text-center sm:text-left px-8">
    <h1 class="font-bold text-2xl sm:text-2xl">{title}</h1>
    <h2 class="text-fg sm:w-full">{description}</h2>
  </a>
</div>
