<script lang="ts">
  import { featuredProjects } from "$lib/projects";
  import { formatDate, minutesToReadable } from "$lib/utils";
  import { onMount } from "svelte";
  import musicPlaceholder from "$lib/assets/music-placeholder.webp";
  import type { Game, MusicTrack, Post, WakatimeLanguage } from "$lib/types.js";

  import Antipixel from "$lib/components/Antipixel.svelte";
  import Header from "$lib/components/Header.svelte";
  import SkeletonLoader from "$components/SkeletonLoader.svelte";

  let posts: Post[] = $state([]);
  let wakatime: WakatimeLanguage[] = $state([]);
  let track: MusicTrack | null = $state(null);
  let isNowPlaying = $state(false);
  let game: Game | null = $state(null);

  onMount(async () => {
    fetch("/api/posts").then(async res => {
      posts = await res.json();
      posts = posts.filter(post => post.published);
      posts = posts.slice(0, 2);
    });

    // get wakatime data
    fetch("/api/wakatime").then(async res => {
      wakatime = await res.json();
    }).catch(() => []);

    // get last.fm track
    fetch("/api/lastfm").then(async res => {
      const data = await res.json();
      track = data.track;
      isNowPlaying = data.isNowPlaying;
    });

    // get steam last played game
    fetch("/api/steam").then(async res => {
      game = await res.json();
    });
  });
</script>

<svelte:head>
  <title>@deltea</title>
</svelte:head>

<Header
  title="@deltea"
  description={"currently tinkering with some hardware"}
/>

<p class="text-muted">
  hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, hardware, and other random stuff!
</p>

<!-- projects -->
<div class="flex items-center justify-between w-full">
  <h1 class="font-bold mt-10 mb-6">PROJECTS</h1>
  <a href="/projects" class="hover:underline font-bold mt-4">
    {"see all projects >"}
  </a>
</div>

<ul class="list-['-_'] pl-8">
  {#each featuredProjects as project}
    <li class="space-x-0">
      <a href={project.link} target="_blank" class="font-bold hover:underline">{project.name}</a>
      <span class="text-muted">/ {project.description}</span>
    </li>
  {/each}
</ul>

<!-- blog -->
<div class="flex items-center justify-between w-full">
  <h1 class="font-bold mt-10 mb-6">BLOG</h1>
  <a href="/blog" class="hover:underline font-bold mt-4">
    {"see more posts >"}
  </a>
</div>

{#if posts.length > 0}
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    {#each posts as post}
      <a href="/blog/{post.slug}" class="flex flex-col border-2 border-fg gap-4 p-3 group sm:w-1/2">
        <div class="flex justify-between w-full">
          <p class="font-bold group-hover:underline">{post.title}</p>
          <time>{formatDate(post.date)}</time>
        </div>

        <p class="break-words line-clamp-4 text-muted">
          {post.excerpt}
        </p>
      </a>
    {/each}
  </div>
{:else}
  <SkeletonLoader class="h-41" />
{/if}

<h2 class="font-bold mt-10 mb-6 space-x-1">
  <span>WAKATIME STATS</span>
  <span class="text-muted font-normal">(since may 2025)</span>
</h2>

<!-- stats -->
{#if wakatime.length > 0}
  <div class="flex flex-col gap-4 w-full bg-bg1 border2 border-fg lg:pl-4 text-sm">
    {#each wakatime as language}
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
{:else}
  <SkeletonLoader class="h-61" />
{/if}

<div class="flex items-center justify-between w-full">
  <h2 class="font-bold mt-10 mb-6">FUN STUFF</h2>
  <a href="/playlists" class="hover:underline font-bold mt-4">
    {"see my playlists >"}
  </a>
</div>

{#if track && game}
  <div class="flex md:flex-row flex-col gap-4 w-full">
    <!-- music -->
    <a
      href="https://last.fm/user/deltea_"
      target="_blank"
      class="flex border-2 border-fg p-2 gap-3 w-full overflow-hidden overflow-ellipsis"
    >
      <div
        class="bg-cover bg-center min-w-[4.5rem] aspect-square"
        style:background-image="url('{
          track.cover && track.cover?.length > 0 ?
            track.cover :
            musicPlaceholder
        }')"
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
    </a>

    <!-- last played game -->
    <div class="flex border-2 border-fg p-2 gap-3 w-full overflow-hidden overflow-ellipsis">
      <div
        class="bg-cover min-w-[4.5rem] aspect-square bg-center"
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
  </div>
{:else}
  <SkeletonLoader class="h-23!" />
{/if}

<Antipixel />
