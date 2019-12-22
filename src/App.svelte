<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";

  let images = [];
  let nextSecondImage = "";

  onMount(async () => {
    window.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      { passive: false }
    );
    const res = await Promise.all([
      fetch("https://picsum.photos/600"),
      fetch("https://picsum.photos/600"),
      fetch("https://picsum.photos/600")
    ]);
    images = await [res[0].url, res[1].url];
    nextSecondImage = await res[2].url;
  });

  const cardSwipeStart = async () => {
    images = [images[1], images[1]];
    const res = await fetch("https://picsum.photos/600");
    nextSecondImage = res.url;
  };

  const cardSwipeEnd = () => {
    images = [images[1], nextSecondImage];
  };
</script>

<style>
  .nav {
    height: 40px;
    width: 100%;
    position: absolute;
  }

  .main {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>

<div class="nav">header</div>
<div class="main">
  <Card image={images[1]} />
  <Card
    image={images[0]}
    isFront
    on:cardSwipeStart={cardSwipeStart}
    on:cardSwipeEnd={cardSwipeEnd} />
</div>
