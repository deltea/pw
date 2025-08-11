<script>
	import { page } from "$app/state";
</script>

<div class="flex flex-col font-bold justify-center h-full items-center w-full">
  <h1>{page.status}</h1>
  <h2>{page.error?.message}</h2>
</div>
