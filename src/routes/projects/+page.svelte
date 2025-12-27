<script lang="ts">
  import Header from "$components/Header.svelte";
  import StatusTag from "$components/StatusTag.svelte";
  import { projects } from "$lib/projects.js";
</script>

<svelte:head>
  <title>@deltea - projects</title>
</svelte:head>

<Header
  title="projects"
  description="all my projects i have worked on or am currently working on"
/>

<div class="space-y-10">
  {#each Object.keys(projects) as key}
    <div class="flex items-center justify-between w-full mb-6">
      <h1 class="font-bold">{key.toUpperCase()}</h1>
      {#if key === "games"}
        <a href="https://deltea.itch.io" target="_blank" class="hover:underline font-bold mt-4">
          {"see my itch.io >"}
        </a>
      {/if}
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each Object.values(projects[key]) as project}
        <a
        href={project.link}
          class="flex flex-col border-2 border-fg gap-4 p-3 group"
        >
          <div class="flex justify-between w-full">
            <p class="font-bold group-hover:underline">{project.name}</p>
            <StatusTag status={project.status} />
          </div>

          <p class="break-words line-clamp-4 text-muted">
            {project.description}
          </p>
        </a>
      {/each}
    </ul>
  {/each}
</div>
