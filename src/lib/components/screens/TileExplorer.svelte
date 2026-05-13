<script>
  import TileCard from '../TileCard.svelte';
  export let step;
  export let onTileClick = () => {};
  
  let selectedSuit = null;
  const suits = ['bamboo', 'dots', 'characters'];
  
  const suitDescriptions = {
    bamboo: "Bamboo tiles feature sticks of bamboo. (This is the 1 of Bamboo, which is a special bird!)",
    dots: "Dot tiles feature circles or coins.",
    characters: "Character tiles feature Chinese numbers. (This is the number 1.)"
  };

  function handleTileClick(suit) {
    selectedSuit = suit;
    onTileClick(); // Notify parent that an action was taken
  }
</script>

<div class="explorer-screen text-center">
  <h1 class="mb-5">{step.title}</h1>
  
  <div class="d-flex justify-content-center gap-4 mb-5 flex-wrap">
    {#each suits as suit}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="text-center" on:click={() => handleTileClick(suit)}>
        <TileCard 
          suit={suit} 
          value={1} 
          highlighted={selectedSuit === suit} 
        />
        <div class="mt-2 text-capitalize">{suit}</div>
      </div>
    {/each}
  </div>
  
  <div class="description-box" class:visible={selectedSuit}>
    {#if selectedSuit}
      <h4>{selectedSuit.charAt(0).toUpperCase() + selectedSuit.slice(1)}</h4>
      <p>{suitDescriptions[selectedSuit]}</p>
    {/if}
  </div>
</div>

<style>
  .explorer-screen {
    padding: 40px 20px;
    animation: fadeIn var(--anim-slow);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .description-box {
    opacity: 0;
    transform: translateY(20px);
    transition: all var(--anim-med);
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(0,0,0,0.5);
    border-radius: 12px;
    border: 1px solid var(--color-gold);
  }
  .description-box.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
