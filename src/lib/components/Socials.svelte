<script lang="ts">
  import SpikyDivider from "$components/SpikyDivider.svelte";
  import { isMobileUserAgentData } from "$lib/utils";

  let isSocialsOpen = $state(!isMobileUserAgentData());
</script>

<div class="w-full flex flex-col sm:flex-row justify-between sm:gap-6 gap-4 mt-4 font-bold items-center">
  <SpikyDivider />
  {#if isSocialsOpen}
    <div class="flex flex-col sm:flex-row justify-between sm:gap-6 gap-4 items-center">
      <a class="hover:underline" href="https://github.com/deltea">github</a>
      <a class="hover:underline" href="https://deltea.itch.io">itch.io</a>
      <a class="hover:underline" href="https://youtube.com/@delteaa">youtube</a>
      <a class="hover:underline" href="https://last.fm/user/deltea_">last.fm</a>
      <a class="hover:underline" href="mailto:hey@deltea.space">email</a>
      <!-- <a class="hover:underline" href="/guestbook">guestbook</a>
      <a class="hover:underline" href="/now">now</a> -->
    </div>
  {:else}
    <button class="font-bold" onclick={() => (isSocialsOpen = !isSocialsOpen)}>
      view links
    </button>
  {/if}
  <SpikyDivider />
</div>
