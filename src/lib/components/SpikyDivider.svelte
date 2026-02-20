<script lang="ts">
  import { onMount } from "svelte";

  let dividerElement: HTMLDivElement;
  let scrollAmount = 0;
  let interval: NodeJS.Timeout;

  function scroll() {
    scrollAmount += 4;

    if (dividerElement) {
      dividerElement.style.backgroundPositionX = `-${scrollAmount}px`;
    }
  }

  onMount(() => {
    interval = setInterval(scroll, 150);
    return () => clearInterval(interval);
  });
</script>

<div
  bind:this={dividerElement}
  class="grow max-w-full bg-contain bg-repeat-x h-3"
  style:background-image="url('/spiky-divider.svg')"
></div>
