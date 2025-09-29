<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";
  import { projects } from "$lib/projects";
  import { formatDate } from "$lib/utils";

  import Antipixel from "$lib/components/Antipixel.svelte";
  import Header from "$lib/components/Header.svelte";

  interface Track {
    title: string;
    artist: string;
    cover: string;
  }

  let { data } = $props();
  let track: Track | null = $state(null);
  let isNowPlaying: boolean = $state(false);
  let languages: any[] = $state([]);
  let game: any | null = $state(null);

  const languageBlacklist = ["gdscript3", "scene", "markdown"];

  onMount(async () => {
    let response;
    let data;

    // get wakatime data
    try {
      response = await fetch("/api/wakatime");
      data = await response.json();
      languages = data.languages.filter((lang: any) => !languageBlacklist.includes(lang.name.toLowerCase()));
      languages = languages.slice(0, 5);
    } catch (error) {
      console.error("failed to fetch hackatime data:", error);
      languages = [];
    }

    // get last.fm track
    response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=deltea_&api_key=${PUBLIC_LASTFM_API_KEY}&format=json&limit=1`);
    data = await response.json();
    isNowPlaying = data.recenttracks.track[0]["@attr"]?.nowplaying;
    track = {
      title: data.recenttracks.track[0].name,
      artist: data.recenttracks.track[0].artist["#text"],
      cover: data.recenttracks.track[0].image[1]["#text"]
    }

    // get steam last played game
    response = await fetch("/api/steam");
    data = await response.json();
    game = data.games[0] || null;
  });

  function minutesToReadable(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
</script>

<svelte:head>
  <title>@deltea</title>
</svelte:head>

<Header
  title="@deltea"
  description="1.01x dev | currently tinkering with hardware"
/>

<p class="text-muted">
  hi! i'm leo (14y), and this is my personal website where i put the things i make, like games, web apps, and other random stuff!
</p>

<!-- web apps -->
<h2 class="font-bold mt-10 mb-4">WEB APPS</h2>

<ul class="list-['-_'] pl-8">
  {#each projects.filter(p => p.type === "web") as project}
    <li class="space-x-0">
      <a href={project.link} target="_blank" class="font-bold underline">{project.title}</a>
      <span class="text-muted">/ {project.description}</span>
    </li>
  {/each}
</ul>

<!-- games -->
<h2 class="font-bold mt-10 mb-4">GAMES</h2>

<ul class="list-['-_'] pl-8">
  {#each projects.filter(p => p.type === "game") as project}
    <li class="space-x-0">
      <a href={project.link} target="_blank" class="font-bold underline">{project.title}</a>
      <span class="text-muted">/ {project.description}</span>
    </li>
  {/each}
</ul>

<a href="/blog" class="font-bold mt-10 mb-6 underline">BLOG</a>

<div class="flex gap-4 w-full">
  {#each (data.posts.filter(x => x.published).slice(0, 2)) as post}
    <a href="/blog/{post.slug}" class="flex flex-col border-2 border-fg gap-4 p-3 w-1/2">
      <div class="flex justify-between w-full">
        <p class="font-bold">{post.title}</p>
        <time>{formatDate(post.date)}</time>
      </div>

      <p class="textjustify break-all line-clamp-3 text-muted">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis nihil tempora, optio veritatis est maxime sequi magni voluptas animi ut! Quis sapiente reiciendis ipsum quam maiores officiis voluptas corrupti quas?
      </p>
    </a>
  {/each}
</div>

<!-- stats -->
{#if languages.length > 0}
  <h2 class="font-bold mt-10 mb-6 space-x-1">
    <span>LANGUAGE STATS</span>
    <span class="text-muted font-normal">(since may 2025)</span>
  </h2>

  <div class="flex flex-col gap-4 w-full bg-bg1 border2 border-fg lg:pl-4 text-sm">
    {#each languages as language}
      <div class="flex flex-col gap-2 font-bold">
        <div class="flex items-center lowercase justify-between">
          <h2>[{language.name}]</h2>
          <p class="text-muted font-normal">{language.text} ({language.percent}%)</p>
        </div>

        <div class="w-full h-2 bg-bg-2 overflow-hidden">
          <div
            class="h-full bg-fg"
            style:width="{language.percent}%"
          ></div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<h2 class="font-bold mt-10 mb-6">FUN STUFF</h2>

<div class="flex md:flex-row flex-col gap-4 w-full">
  {#if track}
    <!-- music -->
    <div class="flex border-2 border-fg p-2 gap-3 w-full overflow-hidden overflow-ellipsis">
      <div
        class="bg-cover bg-center min-w-[4.5rem] aspect-square"
        style:background-image="url('{track?.cover ? track.cover : "/music-placeholder.webp"}')"
      ></div>

      <div class="flex flex-col justify-between min-w-0">
        <p class="text-muted font-bold text-xs flex items-center gap-2">
          {#if isNowPlaying}
            <iconify-icon icon="svg-spinners:bars-scale-middle" class="text-base"></iconify-icon>
          {/if}

          {isNowPlaying ? "NOW LISTENING" : "LAST PLAYED TRACK"}
        </p>

        <h3 title={track.title} class="font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
          {track.title ? track.title : "----------"}
        </h3>
        <p title={track.artist} class="text-muted font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
          {track.artist ? track.artist : "----------"}
        </p>
      </div>
    </div>
  {/if}

  <!-- last played game -->
  {#if game}
    <div class="flex border-2 border-fg p-2 gap-3 w-full overflow-hidden overflow-ellipsis">
      <div
        class="bg-cover bg-center min-w-[4.5rem] aspect-square"
        style:background-image="url('{`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}')"
      ></div>

      <div class="flex flex-col justify-between min-w-0">
        <p class="text-muted font-bold text-xs flex items-center gap-2">
          RECENTLY PLAYED
        </p>

        <h3 title={game.name} class="font-bold text-base w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
          {game.name}
        </h3>
        <p title={minutesToReadable(game.playtime_forever)} class="text-muted font-bold">
          {minutesToReadable(game.playtime_forever)}
        </p>
      </div>
    </div>
  {/if}
</div>

<Antipixel />
