<script>
  import TileCard from './TileCard.svelte';
  
  export let tiles = [];
  export let highlightTiles = []; // array of indices
  export let onTileClick = (index, tile) => {};
</script>

<div class="d-flex gap-2 flex-wrap justify-content-center hand-container">
  {#each tiles as tile, i}
    <div class="tile-wrapper">
      <TileCard 
        suit={tile.suit} 
        value={tile.value} 
        highlighted={highlightTiles.includes(i) || tile.highlighted} 
        faceDown={tile.faceDown}
        on:click={() => onTileClick(i, tile)}
      />
    </div>
  {/each}
</div>

<style>
  .hand-container {
    padding: 20px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 4px 12px rgba(0,0,0,0.3);
    margin-top: auto; 
  }
  .tile-wrapper {
    perspective: 1000px;
  }
</style>
