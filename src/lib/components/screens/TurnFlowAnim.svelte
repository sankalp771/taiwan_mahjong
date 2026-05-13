<script>
  export let step;
  import { onMount, onDestroy } from 'svelte';
  import TileCard from '../TileCard.svelte';
  
  let animState = 0; // 0: Start, 1: Pick, 2: Sort/Think, 3: Discard
  let interval;
  
  onMount(() => {
    interval = setInterval(() => {
      animState = (animState % 3) + 1;
    }, 1800);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="flow-screen text-center">
  <h1 class="mb-2 text-gold luxury-title">{step.title}</h1>
  
  <div class="animation-stage mt-5 position-relative mx-auto">
    <!-- WALL / DRAW STAGE -->
    <div class="stage-section" class:active={animState === 1}>
      <h4 class="stage-label">1. Draw</h4>
      <div class="tile-display draw-area position-relative">
         <div class="mini-wall d-flex">
           <div class="tile-scale"><TileCard faceDown={true} /></div>
           <div class="tile-scale"><TileCard faceDown={true} /></div>
           <div class="tile-scale draw-tile" class:drawing={animState === 1}>
              {#if animState === 1}
                <TileCard suit="bamboo" value={5} highlighted={true}/>
              {:else}
                <TileCard faceDown={true} />
              {/if}
           </div>
         </div>
      </div>
    </div>
    
    <div class="arrow">→</div>
    
    <!-- HAND STAGE -->
    <div class="stage-section" class:active={animState === 2}>
      <h4 class="stage-label">2. Evaluate</h4>
      <div class="tile-display hand-area d-flex">
         <div class="tile-scale"><TileCard suit="bamboo" value={3} /></div>
         <div class="tile-scale"><TileCard suit="bamboo" value={4} /></div>
         <div class="tile-scale evaluate-pop" class:active={animState === 2}>
           {#if animState >= 1}
              <TileCard suit="bamboo" value={5} highlighted={animState === 2} />
           {:else}
              <div style="width: 66px;"></div> <!-- placeholder -->
           {/if}
         </div>
         <div class="tile-scale ms-3" class:dimmed={animState === 2}><TileCard suit="dots" value={9} /></div>
      </div>
    </div>
    
    <div class="arrow">→</div>
    
    <!-- DISCARD STAGE -->
    <div class="stage-section" class:active={animState === 3}>
      <h4 class="stage-label">3. Discard</h4>
      <div class="tile-display discard-area position-relative">
         <div class="pond-bg"></div>
         <div class="tile-scale throw-tile" class:throwing={animState === 3}>
           {#if animState === 3}
             <TileCard suit="dots" value={9} />
           {/if}
         </div>
      </div>
    </div>
  </div>
</div>

<style>
  .flow-screen { padding: 20px; }
  
  .luxury-title {
    font-size: 3rem;
    letter-spacing: 2px;
    text-shadow: 0 2px 10px rgba(223, 182, 82, 0.4);
  }
  .text-gold { color: var(--color-gold); }
  
  .animation-stage {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    max-width: 900px;
    background: rgba(14, 56, 34, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(223, 182, 82, 0.3);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
  }
  
  .stage-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.5;
    transition: all 0.5s ease;
  }
  .stage-section.active {
    opacity: 1;
    transform: scale(1.05);
  }
  
  .stage-label {
    color: var(--color-gold);
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .tile-display {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tile-scale {
    transform: scale(0.8);
    margin: 0 -5px;
  }
  
  /* DRAW ANIMATION */
  .draw-tile {
    transition: all 0.5s ease;
  }
  .draw-tile.drawing {
    transform: scale(0.8) translateY(50px) translateX(20px);
    opacity: 0;
  }
  
  /* EVALUATE ANIMATION */
  .evaluate-pop {
    transition: all 0.5s ease;
    opacity: 0;
    transform: scale(0.8) translateY(-30px);
  }
  .evaluate-pop.active {
    opacity: 1;
    transform: scale(0.9) translateY(-10px);
    z-index: 10;
  }
  .dimmed {
    filter: brightness(0.5);
    transition: all 0.5s ease;
  }
  
  /* DISCARD ANIMATION */
  .pond-bg {
    width: 90px; height: 110px;
    background: rgba(0,0,0,0.3);
    border-radius: 12px;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 2px dashed rgba(255,255,255,0.2);
  }
  .throw-tile {
    opacity: 0;
    transform: scale(0.9) translateY(-50px);
    transition: all 0.5s ease;
  }
  .throw-tile.throwing {
    opacity: 1;
    transform: scale(0.8) translateY(0);
  }
  
  .arrow {
    font-size: 2rem;
    color: var(--color-gold);
    opacity: 0.7;
  }
</style>
