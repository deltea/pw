<script lang="ts">
	import "../app.css";
  import "iconify-icon";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
  <title>deltea</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
