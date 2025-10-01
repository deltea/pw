<script>
	import { page } from "$app/state";
  import Header from "$lib/components/Header.svelte";
</script>

<Header title="oops!" description="something went wrong" />

<div class="flex flex-col font-bold justify-center grow items-center w-full">
  <h1>{page.status}</h1>
  <h2>{page.error?.message.toLowerCase()}</h2>
</div>
