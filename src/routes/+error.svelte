<script>
	import { page } from "$app/state";
</script>

<div class="grow flex flex-col font-bold justify-center items-center w-full">
  <h1>{page.status}</h1>
  <h2>{page.error?.message}</h2>
</div>
