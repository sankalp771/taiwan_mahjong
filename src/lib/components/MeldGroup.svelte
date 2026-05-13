<script>
  import TileCard from './TileCard.svelte';
  
  export let meld = []; // Array of tile objects
  export let type = 'pong'; // 'pong', 'chow'
</script>

<div class="meld-group">
  {#each meld as tile}
    <TileCard suit={tile.suit} value={tile.value} highlighted={tile.highlighted} />
  {/each}
</div>

<style>
  .meld-group {
    display: flex;
    gap: 4px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
</style>
