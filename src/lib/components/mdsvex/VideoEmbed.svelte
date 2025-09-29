<script lang="ts">
  let { src } = $props();
</script>

<video
  {src}
  class="w-full"
  controls
  loop
>
  <track kind="captions" />
</video>
