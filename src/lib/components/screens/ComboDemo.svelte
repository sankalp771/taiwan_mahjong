<script>
  import TileHand from '../TileHand.svelte';
  export let step;
  
  let combos = {
    pong: [
      { suit: 'bamboo', value: 5, highlighted: true },
      { suit: 'bamboo', value: 5, highlighted: true },
      { suit: 'bamboo', value: 5, highlighted: true },
    ],
    chow: [
      { suit: 'bamboo', value: 3, highlighted: true },
      { suit: 'bamboo', value: 4, highlighted: true },
      { suit: 'bamboo', value: 5, highlighted: true },
    ],
    goal: [
      { suit: 'bamboo', value: 5 }, { suit: 'bamboo', value: 5 }, { suit: 'bamboo', value: 5 }, // Pong
      { suit: 'dots', value: 2 }, { suit: 'dots', value: 3 }, { suit: 'dots', value: 4 }, // Chow
      { suit: 'characters', value: 7 }, { suit: 'characters', value: 8 }, { suit: 'characters', value: 9 }, // Chow
      { suit: 'bamboo', value: 1 }, { suit: 'bamboo', value: 1 }, { suit: 'bamboo', value: 1 }, // Pong
      { suit: 'dots', value: 8 }, { suit: 'dots', value: 8 } // Pair
    ]
  };
</script>

<div class="demo-screen text-center">
  <h1 class="mb-5">{step.title}</h1>
  
  {#if step.comboType === 'goal'}
    <div class="goal-container d-flex flex-wrap justify-content-center gap-4">
      <div class="text-center">
        <div class="d-flex gap-1 mb-2">
          <TileHand tiles={combos.goal.slice(0, 3)} />
        </div>
        <small>Pong</small>
      </div>
      <div class="text-center">
        <div class="d-flex gap-1 mb-2">
          <TileHand tiles={combos.goal.slice(3, 6)} />
        </div>
        <small>Chow</small>
      </div>
      <div class="text-center">
        <div class="d-flex gap-1 mb-2">
          <TileHand tiles={combos.goal.slice(6, 9)} />
        </div>
        <small>Chow</small>
      </div>
      <div class="text-center">
        <div class="d-flex gap-1 mb-2">
          <TileHand tiles={combos.goal.slice(9, 12)} />
        </div>
        <small>Pong</small>
      </div>
      <div class="text-center">
        <div class="d-flex gap-1 mb-2">
          <TileHand tiles={combos.goal.slice(12, 14)} />
        </div>
        <small>Pair</small>
      </div>
    </div>
    <div class="mt-4">
      <p class="fs-4 text-warning">4 Groups + 1 Pair = WIN!</p>
    </div>
  {:else}
    <div class="d-flex justify-content-center gap-2">
      <TileHand tiles={combos[step.comboType]} />
    </div>
  {/if}
</div>

<style>
  .demo-screen {
    padding: 40px 20px;
    animation: fadeIn var(--anim-slow);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .goal-container {
    background: rgba(0,0,0,0.3);
    padding: 20px;
    border-radius: 16px;
  }
</style>
