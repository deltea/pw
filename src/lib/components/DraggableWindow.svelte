<script lang="ts">
  let { children } = $props();
  let position = $state({ x: 0, y: 0 });
  let dragOffset = $state({ x: 0, y: 0 });

  function onMouseDown(e: MouseEvent) {
    dragOffset = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      position = {
        x: moveEvent.clientX - dragOffset.x,
        y: moveEvent.clientY - dragOffset.y,
      };
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
</script>

<div
  class="fixed w-80"
  style:top="{position.y}px"
  style:left="{position.x}px"
  onmousedown={onMouseDown}
  role="button"
  tabindex="0"
>
  {@render children?.()}
</div>
