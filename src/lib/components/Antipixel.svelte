<script lang="ts">
  import { onMount } from "svelte";

  const SCROLL_SPEED = 0.4;
  const buttons = [
    "button-now.webp",
    "crashout.webp",
    "flipnote.webp",
    "godot.webp",
    "homebrew.webp",
    "internet-archive.webp",
    "itch-io.webp",
    "peek.webp",
    "kris-where-are-we.webp",
    "last-fm.webp",
    "neocities.webp",
    "rain-world.webp",
    "rice-place.webp",
    "spamton.webp",
    "transistor.webp",
    "yeah.webp",
    "lain.png"
  ];

  let container: HTMLDivElement;
  let scrollAmount = 0;
  let interval: NodeJS.Timeout;

  function scroll() {
    scrollAmount += 4;

    if (container) {
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }

  onMount(() => {
    interval = setInterval(scroll, 100);
    return () => clearInterval(interval);
  });
</script>

<div class="flex space-x-2 overflow-hidden no-scrollbar mt-4">
  <div bind:this={container} class="flex space-x-2">
    {#each [1,2] as _}
      {#each buttons as button}
        <img class="inline pixelated" src="/antipixel/{button}" alt="web button">
      {/each}
    {/each}
  </div>
</div>
