<script>
  import TileCard from '../TileCard.svelte';
  import { currentStep } from '$lib/stores/tutorialStore.js';
  import { onMount, onDestroy } from 'svelte';
  export let step;
  
  let animState = 0;
  let interval;
  
  onMount(() => {
    interval = setInterval(() => {
      animState = (animState + 1) % 4; // 0, 1, 2, 3
    }, 1200);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
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
        <!-- OPEN HAND -->
        <div class="col-md-6">
          <div class="split-card p-4 h-100">
            <h3 class="text-gold mb-2">Open Hand</h3>
            <p class="mb-4 small" style="color: #d0d0d0;">You can take tiles others discard.</p>
            
            <div class="anim-box">
               <div class="opponent-discard" class:visible={animState >= 1}>
                 <div class="tile-mini"><TileCard suit="dots" value={5} /></div>
                 <div class="label-mini mt-1" style="color: #b0b0b0;">Opponent Discards</div>
               </div>
               
               <div class="player-meld mt-4 d-flex justify-content-center">
                 <div class="tile-mini"><TileCard suit="dots" value={5} /></div>
                 <div class="tile-mini"><TileCard suit="dots" value={5} /></div>
                 <div class="tile-mini claim-tile" class:claimed={animState >= 2}>
                   {#if animState >= 2}
                     <TileCard suit="dots" value={5} highlighted={true}/>
                   {/if}
                 </div>
               </div>
               {#if animState >= 2}
                 <div class="action-label text-success mt-2">PONG!</div>
               {:else}
                 <div class="action-label mt-2">&nbsp;</div>
               {/if}
            </div>
          </div>
        </div>
        
        <!-- HIDDEN HAND -->
        <div class="col-md-6">
          <div class="split-card p-4 h-100">
            <h3 class="text-gold mb-2">Hidden Hand</h3>
            <p class="mb-4 small" style="color: #d0d0d0;">Using only your own drawn tiles.</p>
            
            <div class="anim-box">
               <div class="wall-draw d-flex justify-content-center">
                 <div class="tile-mini"><TileCard faceDown={true} /></div>
                 <div class="tile-mini"><TileCard faceDown={true} /></div>
                 <div class="tile-mini wall-tile" class:taken={animState >= 1}><TileCard faceDown={true} /></div>
               </div>
               <div class="label-mini mt-1" style="color: #b0b0b0;">Draw from Wall</div>
               
               <div class="player-hidden-hand mt-4 d-flex justify-content-center">
                 <div class="tile-mini"><TileCard suit="characters" value={2} /></div>
                 <div class="tile-mini"><TileCard suit="characters" value={3} /></div>
                 <div class="tile-mini player-draw" class:drawn={animState >= 2}>
                   {#if animState >= 2}
                     <TileCard suit="characters" value={4} highlighted={true}/>
                   {/if}
                 </div>
               </div>
               {#if animState >= 2}
                 <div class="action-label text-info mt-2">Secretly added to hand</div>
               {:else}
                 <div class="action-label mt-2">&nbsp;</div>
               {/if}
            </div>
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

  /* Split Screen Animations */
  .split-card {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(223, 182, 82, 0.4);
    border-radius: 16px;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
  }
  
  .anim-box {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgba(14, 56, 34, 0.5);
    border-radius: 12px;
    padding: 20px;
  }
  
  .tile-mini {
    transform: scale(0.6);
    margin: -10px -15px;
    height: 90px;
    width: 66px;
    display: flex;
    justify-content: center;
  }
  
  .label-mini { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  .action-label { font-size: 0.9rem; font-weight: bold; }
  
  /* Open Hand Anim */
  .opponent-discard { opacity: 0; transform: translateY(-20px); transition: all 0.4s ease; display: flex; flex-direction: column; align-items: center; }
  .opponent-discard.visible { opacity: 1; transform: translateY(0); }
  
  .claim-tile { opacity: 0; transform: scale(1.5) translate(-30px, -40px); transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .claim-tile.claimed { opacity: 1; transform: scale(1) translate(0, 0); }
  
  /* Hidden Hand Anim */
  .wall-tile { transition: all 0.4s ease; }
  .wall-tile.taken { opacity: 0; transform: translateY(-30px); }
  
  .player-draw { opacity: 0; transform: translateY(30px); transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .player-draw.drawn { opacity: 1; transform: translateY(0); }
</style>
