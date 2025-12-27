<script lang="ts">
  import { STATUS } from "$lib/types";
  import { cn } from "$lib/utils";

  let { status }: { status: STATUS } = $props();
</script>

<span class={cn(
  "flex justify-center items-center text-sm font-bold px-1.5",
  {
    "text-bg bg-fg": status === STATUS.DONE,
    "text-fg bg-bg-3": status  === STATUS.DOING,
    "border-2 border-fg text-fg": status === STATUS.DRAFT
  }
)}>
  {STATUS[status]}
</span>
