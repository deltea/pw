<script lang="ts">
  import Header from "$components/Header.svelte";
  import { projects } from "$lib/projects.js";

  let { data } = $props();
</script>

<svelte:head>
  <title>@deltea - now</title>
</svelte:head>

<Header
  title="now"
  description="stuff i'm currently working on or doing"
/>

<p>currently working on:</p>
