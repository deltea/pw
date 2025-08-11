<script lang="ts">
  import { onMount } from "svelte";

  interface GuestbookEntry {
    name?: string;
    timestamp: string;
    website?: string;
    music?: string;
    food?: string;
    message: string;
  }

  let isSending = $state(false);
  let isLoading = $state(true);
  let guestbook: GuestbookEntry[] = $state([]);

  onMount(async () => {
    isLoading = true;
    const response = await fetch("/api/guestbook");
    const data = await response.json();
    guestbook = data || [];
    isLoading = false;
  });

  function prettyURL(url: string): string {
    return url.replace(/https?:\/\//, "").replace(/www\./, "");
  }
</script>

<svelte:head>
  <title>guestbook</title>
</svelte:head>

<h2 class="font-bold mt-10 mb-6">GUESTBOOK</h2>

<!-- submit guestbook entry -->
<form method="POST" class="border2 border-fg lg:px-6 w-full flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <label class="font-bold" for="name">name: </label>
    <input
      id="name"
      name="name"
      type="text"
      class="border-2 border-fg p-2 w-full"
      placeholder="guest"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="website">website: </label>
    <input
      id="website"
      name="website"
      type="text"
      class="border-2 border-fg p-2 w-full"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="music">cool music you want to share: </label>
    <input
      id="music"
      name="music"
      type="text"
      class="border-2 border-fg p-2 w-full"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="music">fav food: </label>
    <input
      id="food"
      name="food"
      type="text"
      class="border-2 border-fg p-2 w-full"
      placeholder="optional"
    />
  </div>

  <div class="flex flex-col gap-2">
    <label class="font-bold" for="message">message*: </label>
    <textarea
      id="message"
      name="message"
      class="border-2 border-fg p-2 w-full"
      placeholder="say something nice..."
      required
    ></textarea>
  </div>

  <button type="submit" class="border-2 flex justify-center items-center border-fg w-min mt-2 py-2 px-4 font-bold cursor-pointer">
    {#if isSending}
      <iconify-icon icon="svg-spinners:3-dots-scale" class="text-2xl"></iconify-icon>
    {:else}
      <span>send</span>
    {/if}
  </button>
</form>

<!-- guestbook entries -->
{#if isLoading}
  <p class="font-bold mt-10">loading guestbook...</p>
{/if}

<ul class="list['-_'] mt-10 flex flex-col gap-4">
  {#each guestbook as entry}
    <li class="border-2 border-fg p-3">
      <div class="flex justify-between text-muted">
        <!-- name and website -->
        <div class="flex gap-4">
          <p class="font-bold text-fg">[{entry.name}]</p>
          {#if entry.website}
            <a class="underline" target="_blank" href={entry.website}>
              {prettyURL(entry.website)}
            </a>
          {/if}
        </div>

        <!-- date -->
        <p>
          {new Date(entry.timestamp).toLocaleDateString()}
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
