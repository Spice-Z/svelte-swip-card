<script>
  import { spring } from "svelte/motion";
  import { pannable } from "./pannable.js";

  const coords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.4,
      damping: 0.2
    }
  );

  const handleSwipeStart = () => {
    coords.stiffness = coords.damping = 1;
  };

  const handleSwipeMove = event => {
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }));
  };

  const handleSwipeEnd = event => {
    const isEnoughSwipe =
      $coords.x >= 0
        ? $coords.x > window.innerWidth / 3
        : $coords.x * -1 > window.innerWidth / 3;
    if (isEnoughSwipe) {
      coords.stiffness = 0.1;
      coords.damping = 0.3;
      if ($coords.x >= 0) {
        coords.set(
          { x: window.innerWidth + $coords.x, y: $coords.y },
          { soft: 0.7 }
        );
      } else {
        coords.set(
          { x: window.innerWidth * -1 + $coords.x, y: $coords.y },
          { soft: 0.5 }
        );
      }
      setTimeout(() => {
        coords.set({ x: 0, y: 0 }, { hard: true });
      }, 500);
      return;
    }
    coords.stiffness = 0.1;
    coords.damping = 0.3;
    coords.set({ x: 0, y: 0 }, { soft: 0.5 });
  };
</script>

<style>
  .card {
    --width: 80vw;
    --height: 60vh;
    width: var(--width);
    height: var(--height);
    left: calc(50% - var(--width) / 2);
    top: calc(50% - var(--height) / 2);
    border-radius: 4px;
    background-color: #ff3e00;
    cursor: move;
  }
</style>

<div
  class="card"
  use:pannable
  on:swipestart={handleSwipeStart}
  on:swipemove={handleSwipeMove}
  on:swipeend={handleSwipeEnd}
  style="transform: translate3d({$coords.x}px,{$coords.y}px,0px) rotate({$coords.x * -0.05}deg)" />
