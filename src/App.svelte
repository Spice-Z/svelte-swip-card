<script>
  import Card from './Card.svelte';
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
  <Card/>
</div>
