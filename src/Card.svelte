<script>
  import { spring } from "svelte/motion";
  import { swipe } from "./swipe.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let image = "";
  export let isFront = false;

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
    const swipeTime = 0.3;
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
          { soft: swipeTime }
        );
      } else {
        coords.set(
          { x: window.innerWidth * -1 + $coords.x, y: $coords.y },
          { soft: swipeTime }
        );
      }
      dispatch("cardSwipeStart");
      setTimeout(() => {
        coords.set({ x: 0, y: 0 }, { hard: true });
        dispatch("cardSwipeEnd");
      }, swipeTime * 1000);
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
    border-radius: 4px;
    background-color: #ff3e00;
    cursor: move;
  }

  .card--back {
    position: absolute;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

{#if isFront}
  <div
    class="card"
    use:swipe
    on:swipestart={handleSwipeStart}
    on:swipemove={handleSwipeMove}
    on:swipeend={handleSwipeEnd}
    style="transform: translate3d({$coords.x}px,{$coords.y}px,0px) rotate({$coords.x * -0.05}deg)">
    <img class="card-img" src={image} alt="" role="presentation" />
  </div>
{:else}
  <div class="card card--back">
    <img class="card-img" src={image} alt="" role="presentation" />
  </div>
{/if}
