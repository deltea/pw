<script lang="ts">
  import pfp from "$lib/assets/pfp.png";
  import banner from "$lib/assets/banner.gif"

  let { title, description } = $props();
</script>

<!-- banner -->
<!-- <div class="grid-background border-2 border-fg w-full h-30"></div> -->
<div class="w-full h-30 border2 border-fg">
  <div
    class="bg-cover bg-[center_top_-125px] -scale-x-100 w-full h-full"
    style:background-image="url({banner})"
  ></div>
</div>

<div class="flex gap-6 sm:-translate-y-8 -translate-y-4 sm:translate-x-8 translate-x-6 mb-6 sm:mb-2">
  <!-- pfp -->
  <a aria-label="home" href="/" class="block sm:size-28 size-20 rounded-full outline3 outline-fg">
    <div
      class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg"
      style:background-image="url({pfp})"
    ></div>
  </a>

  <!-- title card -->
  <a href="/" class="flex flex-col sm:gap-1.5 gap-1 justify-end">
    <h1 class="font-bold text-2xl sm:text-3xl">{title}</h1>
    <h2 class="fontbold text-fg">
      {description}
      <!-- <span>1.01x developer</span>
      <span class="hidden sm:inline">| currently tinkering with hardware</span> -->
    </h2>
  </a>
</div>
