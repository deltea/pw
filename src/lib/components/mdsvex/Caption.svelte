<script lang="ts">
  let { children } = $props();
</script>

<p class="text-muted italic text-center mt3">
  {@render children?.()}
</p>
