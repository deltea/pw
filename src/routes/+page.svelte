<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";
  import Antipixel from "$lib/components/Antipixel.svelte";

  interface Track {
    title: string;
    artist: string;
    cover: string;
  }

  let track: Track | null = null;
  let isNowPlaying: boolean = false;
  let languages: any[] = [];
  let game: any | null = null;

  const languageBlacklist = ["gdscript3", "scene", "markdown"];
  const projects = [
    // ------ game projects ------
    {
      title: "power-cut",
      type: "game",
      description: "a short puzzle platformer made for a game jam",
      link: "https://deltea.itch.io/power-cut",
      source: "https://github.com/deltea/power-cut"
    },
    {
      title: "catalyst",
      type: "game",
      description: "a bullet hell boss rush game made for a month long game jam",
      link: "https://deltea.itch.io/catalyst",
      source: "https://github.com/deltea/brj-exchange"
    },
    {
      title: "jetcat",
      type: "game",
      description: "a fast-paced speedrun platformer with a cat that can fly",
      link: "https://deltea.itch.io/jetcat",
      source: "https://github.com/deltea/Gravity"
    },
    {
      title: "g r a p p l e",
      type: "game",
      description: "grappling in the 90s",
      link: "https://deltea.itch.io/grapple",
    },
    {
      title: "rpgeometry",
      type: "game",
      description: "a horde shooter made for bullet hell game jam 2023",
      link: "https://deltea.itch.io/rpgeometry",
    },
    {
      title: "long-shot",
      type: "game",
      description: "an abstract shooter with a weird movement mechanic",
      link: "https://deltea.itch.io/long-shot",
    },

    // ------ web projects ------
    {
      title: "downbeat",
      type: "web",
      description: "sync gifs to the beat",
      link: "https://downbeat.deltea.space/",
      source: "https://github.com/deltea/downbeat"
    },
    {
      title: "the-movie-game",
      type: "web",
      description: "higher or lower game, but with movies",
      link: "https://movie-game.deltea.space/",
      source: "https://github.com/deltea/themoviegame",
    },
    {
      title: "youguess",
      type: "web",
      description: "higher or lower game, but with youtube videos",
      link: "https://youguess.deltea.space/",
      source: "https://github.com/deltea/youguess",
    },
    {
      title: "atlas-academy",
      type: "web",
      description: "a blog made to document my travels",
      link: "https://atlasacademy.blog/",
      source: "https://github.com/deltea/atlasacademy.blog",
    },
    {
      title: "color-pong",
      type: "web",
      description: "a cool looking screensaver-ahh pong simulation",
      link: "https://color-pong.deltea.space/",
      source: "https://github.com/deltea/color-pong",
    }
  ];

  onMount(async () => {
    let response;
    let data;

    // get wakatime data
    try {
      response = await fetch("/api/wakatime");
      data = await response.json();
      console.log(data.languages);
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

<!-- stats -->
{#if languages.length > 0}
  <h2 class="font-bold mt-10 mb-6 space-x-1">
    <span>STATS</span>
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

<!-- guestbook button -->
<!-- <a href="/guestbook" class="border-2 border-fg py-3 w-full text-center mt-4 font-bold block hover:underline">open guestbook</a> -->
