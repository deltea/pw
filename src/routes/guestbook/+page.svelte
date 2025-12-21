<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import { formatDate, isMobileUserAgentData, prettyURL } from "$lib/utils";

  let { data } = $props();
  let isSending = $state(false);
</script>

<svelte:head>
  <title>@deltea - guestbook</title>
</svelte:head>

<Header
  title="guestbook"
  description="leave a message (or not)!"
/>

<!-- submit guestbook entry -->
<form method="POST" class="w-full flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <label class="font-bold" for="name">name: </label>
    <input
      id="name"
      name="name"
      type="text"
      class="border-2 border-bg-3 focus:border-fg p-2 w-full outline-none"
      placeholder="guest"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="website">website: </label>
    <input
      id="website"
      name="website"
      type="text"
      class="border-2 border-bg-3 focus:border-fg p-2 w-full outline-none"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="music">cool music you want to share: </label>
    <input
      id="music"
      name="music"
      type="text"
      class="border-2 border-bg-3 focus:border-fg p-2 w-full outline-none"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="music">fav food: </label>
    <input
      id="food"
      name="food"
      type="text"
      class="border-2 border-bg-3 focus:border-fg p-2 w-full outline-none"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="message">message*: </label>
    <textarea
      id="message"
      name="message"
      class="border-2 border-bg-3 focus:border-fg p-2 w-full outline-none"
      placeholder="say something nice..."
      required
    ></textarea>
  </div>

  <button type="submit" class="border-2 flex justify-center items-center outline-none border-fg w-min mt-4 py-2 px-4 font-bold cursor-pointer">
    {#if isSending}
      <iconify-icon icon="svg-spinners:3-dots-scale" class="text-2xl"></iconify-icon>
    {:else}
      <span>send</span>
    {/if}
  </button>
</form>

<hr class="border-bg-2 w-full border-1 mt-8">

<!-- guestbook entries -->
<ul class="list['-_'] mt-10 flex flex-col gap-4">
  {#each data.entries as entry}
    <li class="border-2 border-fg p-3">
      <div class="flex justify-between text-muted">
        <!-- name and website -->
        <div class="flex gap-4">
          {#if isMobileUserAgentData()}
            <a href="{entry.website}" class="font-bold text-fg">[{entry.name}]</a>
          {:else}
            <p class="font-bold text-fg">[{entry.name}]</p>
          {/if}
          {#if entry.website}
            <a class="underline hidden sm:block" target="_blank" href={entry.website}>
              {prettyURL(entry.website)}
            </a>
          {/if}
        </div>

        <p>
          {formatDate(new Date(entry.timestamp).toDateString())}
          <span class="hidden sm:inline">
            at
            {new Date(entry.timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            }).toLowerCase()}
          </span>
        </p>
      </div>

      {#if entry.music}
        <p class="text-muted">
          <span class="text-fg">cool music:</span>
          {entry.music}
        </p>
      {/if}
      {#if entry.food}
        <p class="text-muted">
          <span class="text-fg">fav food:</span>
          {entry.food}
        </p>
      {/if}

      <p class="text-muted mt-4">{entry.message}</p>
    </li>
  {/each}
</ul>
