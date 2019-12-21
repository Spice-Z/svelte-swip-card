<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";

  let images = [];

  onMount(async () => {
    const res = await Promise.all([
      fetch('https://source.unsplash.com/random'),
      fetch('https://source.unsplash.com/random')
    ]);
    images = await [res[0].url, res[1].url];
  });

  const cardSwiped = async () => {
    const res = await fetch('https://source.unsplash.com/random');
    images = [res.url, images[1]]
  }
  
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
  <Card image={images[0]} on:cardSwiped={cardSwiped}/>
</div>
