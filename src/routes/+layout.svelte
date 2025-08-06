<script lang="ts">
	import "../app.css";
  import "iconify-icon";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
  <title>@deltea</title>
	<link rel="icon" href={favicon} />
  <meta name="description" content="hi! i'm leo, and this is my personal website where i put the things i make, like games, web apps, and other random stuff!" />
</svelte:head>

{@render children?.()}
