<script lang="ts">
  let { videoId } = $props();
</script>

<iframe
  class="w-full aspect-video"
  src={`https://www.youtube.com/embed/${videoId}`}
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
