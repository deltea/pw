<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";

  interface Track {
    title: string;
    artist: string;
    cover: string;
  }

  let avatar: string | null = null;
  let track: Track | null = null;
  let isNowPlaying: boolean = false;
  let languages: any[] = [];

  const projects = [
    // ------ game projects ------
    {
      title: "Power Cut",
      type: "game",
      description: "a short puzzle platformer made for a game jam",
      image: "/images/projects/power-cut.png",
      link: "https://deltea.itch.io/power-cut",
      source: "https://github.com/deltea/power-cut"
    },
    {
      title: "Catalyst",
      type: "game",
      description: "a bullet hell boss rush game made for a long game jam",
      image: "/images/projects/catalyst.png",
      link: "https://deltea.itch.io/catalyst",
      source: "https://github.com/deltea/brj-exchange"
    },
    {
      title: "JetCat",
      type: "game",
      description: "a fast-paced speedrun platformer with a cat that can fly",
      image: "/images/projects/jetcat.png",
      link: "https://deltea.itch.io/jetcat",
      source: "https://github.com/deltea/Gravity"
    },
    {
      title: "G R A P P L E",
      type: "game",
      description: "grappling in the 90s",
      image: "/images/projects/grapple.png",
      link: "https://deltea.itch.io/grapple",
    },
    {
      title: "RPGeometry",
      type: "game",
      description: "a horde game made for bullet hell game jam 2023",
      image: "/images/projects/rpgeometry.png",
      link: "https://deltea.itch.io/rpgeometry",
    },
    {
      title: "Long Shot",
      type: "game",
      description: "an abstract shooter with a weird movement mechanic",
      image: "/images/projects/long-shot.png",
      link: "https://deltea.itch.io/long-shot",
    },

    // ------ web projects ------
    {
      title: "ChatJippity",
      type: "web",
      description: "basically omegle but it's chatgpt",
      image: "/images/projects/chatjippity.png",
      link: "https://chatjippity.vercel.app/",
      source: "https://github.com/deltea/chat-jippity"
    },
    {
      title: "The Movie Game",
      type: "web",
      description: "higher or lower game, but with movies",
      image: "/images/projects/the-movie-game.png",
      link: "https://the-movie-game.vercel.app/",
      source: "https://github.com/deltea/themoviegame",
    },
    {
      title: "YouGuess",
      type: "web",
      description: "higher or lower game, but with youtube videos",
      image: "/images/projects/youguess.png",
      link: "https://youguess.vercel.app/",
      source: "https://github.com/deltea/youguess",
    },
    {
      title: "Atlas Academy",
      type: "web",
      description: "a blog made to document our travels",
      image: "/images/projects/atlas-academy.png",
      link: "https://atlasacademy.blog/",
      source: "https://github.com/deltea/atlasacademy.blog",
    },
    {
      title: "Color Pong",
      type: "web",
      description: "a cool looking screensaver-ahh pong game",
      image: "/images/projects/color-pong.png",
      link: "https://color-pong.vercel.app/",
      source: "https://github.com/deltea/color-pong",
    }
  ];

  onMount(async () => {
    // get pfp
    let response = await fetch("https://api.github.com/users/deltea");
    let data = await response.json();
    avatar = data.avatar_url;

    // get wakatime data
    response = await fetch("/api/wakatime");
    data = await response.json();
    languages = data.languages.slice(0, 5);

    // get last.fm track
    response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=deltea_&api_key=${PUBLIC_LASTFM_API_KEY}&format=json&limit=1`);
    data = await response.json();
    isNowPlaying = data.recenttracks.track[0]["@attr"]?.nowplaying;
    track = {
      title: data.recenttracks.track[0].name,
      artist: data.recenttracks.track[0].artist["#text"],
      cover: data.recenttracks.track[0].image[1]["#text"]
    }
  });
</script>

<div class="min-h-screen flex justify-center py-8">
  <main class="gridbackground w-full max-w-2xl flex flex-col items-start px-4">
    <!-- banner -->
    <div class="grid-background border-2 border-fg w-full h-24"></div>

    <div class="flex gap-6 sm:-translate-y-10 -translate-y-3 sm:translate-x-8 translate-x-6">
      <!-- pfp -->
      <div class="sm:size-28 size-20 rounded-full outline-[16px] outline-bg bg-bg">
        <div class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg" style:background-image="url({avatar})"></div>
      </div>

      <!-- title card -->
      <div class="flex flex-col gap-0 justify-end">
        <h1 class="font-bold text-3xl">@deltea</h1>
        <h2 class="text-base font-normal text-fg">professional wip-er</h2>
      </div>
    </div>

    <!-- <hr class="border-zinc-900 mb-8 w-full" /> -->

    <p class="text-base text-muted mt-6 sm:mt-0">
      hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!
    </p>

    <h2 class="font-bold mt-10 mb-4">GAMES</h2>

    <ul class="list-disc pl-8">
      {#each projects.filter(p => p.type === "game") as project}
        <li class="space-x-0">
          <a href={project.link} target="_blank" class="font-bold underline lowercase">{project.title}</a>
          <span class="text-muted">~ {project.description}</span>
        </li>
      {/each}
    </ul>

    <h2 class="font-bold mt-10 mb-4">WEB APPS</h2>

    <ul class="list-disc pl-8">
      {#each projects.filter(p => p.type === "web") as project}
        <li class="space-x-0">
          <a href={project.link} target="_blank" class="font-bold underline lowercase">{project.title}</a>
          <span class="text-muted">~ {project.description}</span>
        </li>
      {/each}
    </ul>

    <h2 class="font-bold mt-10 mb-6">LANGUAGES</h2>

    <div class="flex flex-col gap-4 w-full bg-bg1 lg:px-8 text-sm">
      {#each languages as language}
        <div class="flex flex-col gap-2 fontbold">
          <div class="flex items-center lowercase justify-between">
            <h2>{language.name}</h2>
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

    <h2 class="font-bold mt-10 mb-6">FUN STUFF</h2>

    <div class="flex gap-4 w-full">
      <!-- music -->
      <div class="flex border-2 border-fg p-2 gap-3 w1/2 w-full overflow-hidden overflow-ellipsis">
        <div
          class="bg-cover bg-center size-18"
          style:background-image="url('{track?.cover ? track.cover : "/music-placeholder.webp"}')"
        ></div>

        <div class="flex flex-col justify-between">
          <p class="text-muted font-bold text-xs flex items-center gap-2">
            {#if isNowPlaying}
              <iconify-icon icon="svg-spinners:bars-scale-middle" class="text-base"></iconify-icon>
            {/if}

            {isNowPlaying ? "NOW LISTENING" : "LAST PLAYED TRACK"}
          </p>

          <h3 class="font-bold text-lg w-full overflow-hidden whitespace-nowrap overflow-ellipsis">{track?.title ? track.title : "----------"}</h3>
          <p class="text-muted font-bold">{track?.artist ? track.artist : "----------"}</p>
        </div>
      </div>

      <!-- last played game -->
      <!-- <div class="flex border-2 border-fg p-2 gap-2 w-1/2">
        <div
          class="bg-cover bg-center size-18"
          style:background-image="url('{track?.cover ? track.cover : "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png"}')"
        ></div>

        <div class="flex flex-col justify-center">
          <p class="text-muted text-sm">last played track</p>
          <h3 class="font-bold text-lg w-[14rem] overflow-hidden whitespace-nowrap overflow-ellipsis">{track?.title ? track.title : "no recent track"}</h3>
          <p class="text-muted">{track?.artist ? track.artist : "no artist"}</p>
        </div>
      </div> -->
    </div>

    <!-- <img src="https://ghchart.rshah.org/000000/deltea" class="invert mt-10" alt="github contribution graph"> -->
  </main>
</div>
