<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import musicPlaceholder from "$lib/assets/music-placeholder.webp";
  import { PUBLIC_YOUTUBE_API_KEY } from "$env/static/public";
  import { musicPlayerUrl } from "$lib/stores";

  // let { playlistUrl } = $props();

  let playerElement: HTMLIFrameElement;
  let player: YT.Player;
  let tracks: string[] = $state([]);
  let currentTrackIndex: number = $state(0);
  let isReady = $state(false);
  let isPlaying = $state(false);

  musicPlayerUrl.subscribe((url) => {
    console.log("new url: ", url);
    loadPlaylist(url);
  });

  async function loadPlaylist(url: string) {
    player?.loadPlaylist({
      listType: "playlist",
      list: url.split("list=")[1],
    });

    setTimeout(() => {
      currentTrackIndex = 0;
      tracks = player?.getPlaylist() || [];
      console.log($state.snapshot(tracks));
    }, 1000);
  }

  function togglePlay() {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function changeTrack(dir: 1 | -1) {
    if (!player) return;

    if (currentTrackIndex + dir < 0 || currentTrackIndex + dir >= tracks.length) {
      return;
    }

    currentTrackIndex += dir;
    if (dir === 1) {
      player.nextVideo();
    } else {
      player.previousVideo();
    }
  }

  async function getTrackData(videoId: string) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${PUBLIC_YOUTUBE_API_KEY}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const snippet = data.items[0].snippet;
      return {
        title: snippet.title,
        artist: snippet.channelTitle,
        cover: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || musicPlaceholder
      };
    } else {
      return {
        title: "unknown title",
        artist: "unknown artist",
        cover: musicPlaceholder
      };
    }
  }

  onMount(() => {
    if (!browser) return;

    if (!window.YT) {
      const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (player) return;
      player = new YT.Player(playerElement, {
        playerVars: {
          listType: "playlist",
        },
        events: {
          onReady: (event) => {
            console.log("player ready");
            loadPlaylist($musicPlayerUrl);
            isReady = true;
          },
          onStateChange: (event) => {
            console.log("state changed: ", event.data);
            if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING) {
              isPlaying = true;
            } else {
              isPlaying = false;
            }
          },
        },
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  });
</script>

{#if tracks}

  <div class="border-2 border-fg p-3 bg-bg w-[20rem] h-[32rem] flex flex-col items-center">
    {#await getTrackData(tracks[currentTrackIndex])}
      <div
        class="w-full aspect-video bg-cover bg-center"
        style:background-image="url('{musicPlaceholder}')"
      ></div>

      <div class="flex flex-col w-full text-center mt-4">
        <h3 class="font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">unknown title</h3>
        <p class="text-muted font-bold overflow-hidden whitespace-nowrap text-sm overflow-ellipsis">unknown artist</p>
      </div>
    {:then data}
      <div
        class="w-full aspect-video bg-cover bg-center"
        style:background-image="url('{data.cover}')"
      ></div>

      <div class="flex flex-col w-full text-center mt-4">
        <h3 class="font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">{data.title}</h3>
        <p class="text-muted font-bold overflow-hidden whitespace-nowrap text-sm overflow-ellipsis">{data.artist.replaceAll(" - Topic", "")}</p>
      </div>
    {/await}

    <div class="flex items-center justify-center gap-3 w-full mt-1">
      <button
        on:click={() => changeTrack(-1)}
        class="flex justify-center items-center cursor-pointer"
      >
        <iconify-icon icon="mdi:skip-previous" class="text-3xl"></iconify-icon>
      </button>
      <button
        on:click={togglePlay}
        class="flex justify-center items-center cursor-pointer"
      >
        <iconify-icon
          icon={isPlaying ? "mdi:pause" : "mdi:play"}
          class="text-5xl"
        ></iconify-icon>
      </button>

      <button
        on:click={() => changeTrack(1)}
        class="flex justify-center items-center cursor-pointer"
      >
        <iconify-icon icon="mdi:skip-next" class="text-3xl"></iconify-icon>
      </button>
    </div>

    <div class="overflow-y-auto mt-2 w-full space-y-1 no-scrollbar">
      {#if tracks.length > 0}
        {#each tracks as track, i}
          <button
            on:click={() => {
              currentTrackIndex = i;
              player.playVideoAt(i);
            }}
            class="border-2 border-fg p-2 pl-2.5 w-full cursor-pointer text-left group"
          >
            {#await getTrackData(track)}
              <p>loading...</p>
            {:then data}
              <p class="font-bold flex items-center gap-1.5 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis group-hover:underline">
                {#if i === currentTrackIndex}
                  <iconify-icon icon="svg-spinners:bars-scale-middle" class="text-base"></iconify-icon>
                {/if}
                <span>{data.title}</span>
              </p>
              <p class="text-muted font-bold text-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                {data.artist.replaceAll(" - Topic", "")}
              </p>
            {/await}
          </button>
        {/each}
      {:else}
        <p class="text-center text-sm text-muted">loading playlist...</p>
      {/if}
    </div>
  </div>

  <div bind:this={playerElement} class="hidden"></div>
{/if}
