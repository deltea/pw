<script lang="ts">
  import { onMount } from "svelte";

  const SCROLL_SPEED = 0.3;
  const buttons = [
    "button-now",
    "crashout",
    "flipnote",
    "godot",
    "homebrew",
    "internet-archive",
    "itch-io",
    "kris-where-are-we",
    "last-fm",
    "neocities",
    "peek",
    "rain-world",
    "rice-place",
    "spamton",
    "transistor",
    "yeah"
  ];

  let container: HTMLDivElement;
  let scrollAmount = 0;

  function scroll() {
    scrollAmount += SCROLL_SPEED;
    if (container) {
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.style.transform = `translateX(-${scrollAmount}px)`;
    }

    requestAnimationFrame(scroll);
  }

  onMount(scroll)
</script>

<div class="flex space-x-2 overflow-hidden no-scrollbar mt-6">
  <div bind:this={container} class="flex space-x-2">
    {#each [1,2] as _}
      {#each buttons as button}
        <img class="inline pixelated" src="/antipixel/{button}.webp" alt="web button">
      {/each}
    {/each}
  </div>
</div>
