<script lang="ts">
  import Header from '$components/Header.svelte';
    import { formatUnixDate } from '$lib/utils.js';

  let { data } = $props();
</script>

<svelte:head>
  <title>@deltea - diary</title>
</svelte:head>

<Header
  title="daily diary"
  description="my daily diary, automated with my slack bot"
/>

<ul class="flex flex-col gap-4">
  {#each data.entries as entry}
    <li class="border-2 border-fg p-3">
      <div class="flex justify-between">
        <b>{formatUnixDate(entry.timestamp)}</b>
        <a
          href={entry.url}
          class="flex justify-center items-center cursor-pointer"
          aria-label="open in slack"
          title="open in slack"
        >
          <iconify-icon icon="mdi:arrow-top-right" class="text-2xl"></iconify-icon>
        </a>
      </div>
      <pre class="mt-4">{entry.body}</pre>

      {#if entry.files}
        {#if entry.files.length > 0}
          <div class="mt-4 flex gap-2 h-64 overflow-x-auto snap-x">
            {#each entry.files as file}
              <img src={file.url} alt={file.name} class="h-full flex-shrink-0 snap-center" />
            {/each}
          </div>
        {/if}
      {/if}
    </li>
  {/each}
</ul>
