<script>
  import TileCard from '../TileCard.svelte';
  import { currentStep } from '$lib/stores/tutorialStore.js';
  export let step;
</script>

<div class="info-screen">
  <div class="content card shadow-lg p-4 p-md-5">
    {#if step.id === 'welcome'}
      <h1 class="mb-2 text-center text-gold luxury-title">{step.title}</h1>
      <p class="text-center mb-4">{step.narration}</p>
      
      <div class="all-tiles-showcase d-flex flex-column gap-3 mb-2">
        <div class="suit-row d-flex justify-content-center">
          {#each Array(9) as _, i} <div class="tile-scale"><TileCard suit="characters" value={i+1}/></div> {/each}
        </div>
        <div class="suit-row d-flex justify-content-center">
          {#each Array(9) as _, i} <div class="tile-scale"><TileCard suit="bamboo" value={i+1}/></div> {/each}
        </div>
        <div class="suit-row d-flex justify-content-center">
          {#each Array(9) as _, i} <div class="tile-scale"><TileCard suit="dots" value={i+1}/></div> {/each}
        </div>
        <div class="suit-row d-flex justify-content-center mt-1">
          {#each Array(4) as _, i} <div class="tile-scale"><TileCard suit="winds" value={i+1}/></div> {/each}
          <div class="mx-2"></div>
          {#each Array(3) as _, i} <div class="tile-scale"><TileCard suit="dragons" value={i+1}/></div> {/each}
        </div>
      </div>
    {:else}
      <h1 class="mb-4 text-center">{step.title}</h1>
    {/if}
    
    {#if step.isSplitScreen}
      <div class="row text-center mt-4 g-4">
        <div class="col-md-6">
          <div class="p-4 border rounded" style="border-color: var(--color-gold) !important; background: rgba(0,0,0,0.5);">
            <h3>Open Hand</h3>
            <p>You can use tiles others discard.</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-4 border rounded" style="border-color: var(--color-gold) !important; background: rgba(0,0,0,0.5);">
            <h3>Hidden Hand</h3>
            <p>Using only your own tiles may score more.</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .info-screen {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: 20px;
    animation: fadeIn var(--anim-slow);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .content {
    background: rgba(14, 56, 34, 0.95);
    border: 2px solid var(--color-gold);
    color: var(--color-text);
    max-width: 900px;
    width: 100%;
    z-index: 2;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5);
  }
  
  .luxury-title {
    font-size: 3rem;
    color: var(--color-gold);
    letter-spacing: 2px;
    text-shadow: 0 2px 10px rgba(223, 182, 82, 0.4);
  }

  .text-gold {
    color: var(--color-gold);
  }
  
  .tile-scale {
    transform: scale(0.65);
    margin: -15px -10px; /* Compress the gap */
    transition: transform 0.2s;
  }
  
  .tile-scale:hover {
    transform: scale(0.8) translateY(-10px);
    z-index: 10;
    position: relative;
  }
  
  /* Mobile scaling for the tiles */
  @media (max-width: 768px) {
    .tile-scale {
      transform: scale(0.45);
      margin: -25px -15px;
    }
  }
</style>
