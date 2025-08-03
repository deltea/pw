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

  const tech = [
    {
      icon: "ri:svelte-fill",
      color: "#F54419",
      link: "https://svelte.dev",
    },
    {
      icon: "ri:tailwind-css-fill",
      color: "#00B5F7",
      link: "https://tailwindcss.com/",
    },
    {
      icon: "simple-icons:github",
      color: "#E6ECF3",
      link: "https://github.com",
    },
    {
      icon: "mdi:language-typescript",
      color: "#3175C0",
      link: "https://www.typescriptlang.org/",
    },
    {
      icon: "simple-icons:obsidian",
      color: "#A186F1",
      link: "https://obsidian.md/",
    },
    {
      icon: "mingcute:arc-browser-fill",
      color: "#F49495",
      link: "https://arc.net",
    },
    {
      icon: "simple-icons:godotengine",
      color: "#4C8BBB",
      link: "https://godotengine.org/",
    },
    {
      icon: "tabler:brand-vercel-filled",
      color: "#F5F5F6",
      link: "https://vercel.com/",
    },
    {
      icon: "simple-icons:bambulab",
      color: "#12A742",
      link: "https://bambulab.com/",
    },
    {
      icon: "cib:itch-io",
      color: "#F55959",
      link: "https://itch.io/",
    },
    {
      icon: "mingcute:vscode-fill",
      color: "#27A3E9",
      link: "https://code.visualstudio.com/",
    },
    {
      icon: "simple-icons:astro",
      color: "#FF5D10",
      link: "https://astro.build/",
    },
  ]

  onMount(async () => {
    // get pfp
    let response = await fetch("https://api.github.com/users/deltea");
    let data = await response.json();
    avatar = data.avatar_url;

    // get last.fm track
    response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=deltea_&api_key=${PUBLIC_LASTFM_API_KEY}&format=json&limit=1`);
    data = await response.json();
    isNowPlaying = data.recenttracks.track[0]["@attr"]?.nowplaying;
    track = {
      title: data.recenttracks.track[0].name,
      artist: data.recenttracks.track[0].artist["#text"],
      cover: data.recenttracks.track[0].image[2]["#text"]
    }
  });
</script>

<div class="min-h-screen flex justify-center py-8">
  <main class="gridbackground w-full max-w-2xl flex flex-col items-start">
    <!-- banner -->
    <div class="grid-background border-2 border-fg w-full h-24"></div>

    <div class="flex gap-6 -translate-y-10 translate-x-8">
      <!-- pfp -->
      <div class="size-28 rounded-full outline-[16px] outline-bg bg-bg">
        <div class="bg-cover bg-center size-full rounded-full outline-[16px] outline-bg" style:background-image="url({avatar})"></div>
      </div>

      <!-- title card -->
      <div class="flex flex-col gap-0 justify-end">
        <h1 class="font-bold text-3xl">@deltea</h1>
        <h2 class="text-base font-normal text-fg">the wips are wip-ing</h2>
      </div>
    </div>

    <!-- <hr class="border-zinc-900 mb-8 w-full" /> -->

    <p class="text-base text-muted">
      hi! i'm leo, and this is my personal website where i put the things i make, including games, web apps, stats, and other random stuff!
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

    <div class="flex gap-4 mt-10 w-full">
      <!-- music -->
      <div class="flex border-2 border-fg p-2 gap-2 w1/2 grow">
        <div
          class="bg-cover bg-center size-18"
          style:background-image="url('{track?.cover ? track.cover : "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png"}')"
        ></div>

        <div class="flex flex-col justify-center">
          <p class="text-muted font-bold text-xs">{isNowPlaying ? "NOW LISTENING" : "LAST PLAYED TRACK"}</p>
          <h3 class="font-bold text-lg w-[14rem] overflow-hidden whitespace-nowrap overflow-ellipsis">{track?.title ? track.title : "no recent track"}</h3>
          <p class="text-muted font-bold">{track?.artist ? track.artist : "no artist"}</p>
        </div>
      </div>

      <!-- game -->
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

    <!-- <ul class="w-full flex justify-between mt-10">
      {#each tech as t}
        <a
          href={t.link}
          aria-label="button"
          target="_blank"
          class="border-2 border-bg-2 text-muted hover:border-fg hover:text-fg size-10 flex justify-center items-center"
        >
          <iconify-icon icon={t.icon} class="text-lg"></iconify-icon>
        </a>
      {/each}
    </ul> -->
  </main>
</div>
