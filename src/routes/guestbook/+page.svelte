<script lang="ts">
  interface GuestbookEntry {
    name?: string;
    timestamp: string;
    website?: string;
    music?: string;
    food?: string;
    message: string;
  }

  let isSending = $state(false);
  let guestbook: GuestbookEntry[] = $state([
    {
      name: "leo",
      timestamp: new Date().toISOString(),
      website: "https://deltea.itch.io",
      music: "Birdbrain by Jamie Paige",
      food: "sushi",
      message: "hi! this is my guestbook, feel free to leave a message!"
    },
    {
      name: "anon",
      timestamp: new Date().toISOString(),
      food: "pizza",
      message: "this is a test entry, you can delete it if you want"
    },
    {
      name: "guest",
      timestamp: new Date().toISOString(),
      website: "https://example.com",
      music: "some cool song",
      food: "ice cream",
      message: "i love your website!"
    }
  ]);

  function prettyURL(url: string): string {
    return url.replace(/https?:\/\//, "").replace(/www\./, "");
  }
</script>

<svelte:head>
  <title>guestbook</title>
</svelte:head>

<h2 class="font-bold mt-10 mb-6">GUESTBOOK</h2>

<!-- submit guestbook entry -->
<form action="post" class="border2 border-fg p-6 w-full flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <label class="font-bold" for="name">name: </label>
    <input
      id="name"
      name="name"
      type="text"
      class="border-2 border-fg p-2 w-full"
      placeholder="anon"
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
<ul class="list['-_'] mt-10 flex flex-col gap-4">
  {#each guestbook as entry}
    <li class="border-2 border-fg p-3">
      <div class="flex justify-between text-muted">
        <!-- name and website -->
        <div class="flex gap-4">
          <p class="font-bold text-fg">[{entry.name}]</p>
          {#if entry.website}
            <span>/</span>
            <a class="underline" target="_blank" href={entry.website}>
              {prettyURL(entry.website)}
            </a>
          {/if}
        </div>

        <!-- date -->
        <b>{new Date(entry.timestamp).toLocaleDateString()}</b>
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
