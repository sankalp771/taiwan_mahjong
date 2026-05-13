<script>
  export let step;
  import { onMount, onDestroy } from 'svelte';
  
  let animState = 0; // 0: Start, 1: Pick, 2: Look, 3: Discard
  let interval;
  
  onMount(() => {
    interval = setInterval(() => {
      animState = (animState % 3) + 1;
    }, 1500);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="flow-screen text-center">
  <h1 class="mb-5">{step.title}</h1>
  
  <div class="flow-container d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
    <div class="step-box" class:active={animState === 1}>
      <div class="icon mb-2">🀫</div>
      Pick a Tile
    </div>
    <div class="arrow">→</div>
    <div class="step-box" class:active={animState === 2}>
      <div class="icon mb-2">👀</div>
      Look at Hand
    </div>
    <div class="arrow">→</div>
    <div class="step-box" class:active={animState === 3}>
      <div class="icon mb-2">⬇️</div>
      Discard
    </div>
  </div>
</div>

<style>
  .flow-screen {
    padding: 40px 20px;
  }
  .flow-container {
    max-width: 600px;
    margin: 0 auto;
    background: rgba(0,0,0,0.4);
    padding: 30px;
    border-radius: 16px;
  }
  .step-box {
    padding: 15px;
    border-radius: 12px;
    transition: all var(--anim-med);
    border: 2px solid transparent;
    opacity: 0.5;
    flex: 1;
    min-width: 120px;
  }
  .step-box.active {
    border-color: var(--color-gold);
    background: rgba(201, 168, 76, 0.2);
    opacity: 1;
    transform: scale(1.1);
  }
  .icon {
    font-size: 2rem;
  }
  .arrow {
    font-size: 1.5rem;
    color: var(--color-gold);
  }
</style>
