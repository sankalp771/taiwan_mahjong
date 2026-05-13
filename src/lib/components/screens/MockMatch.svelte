<script>
  import TileHand from '../TileHand.svelte';
  import MeldGroup from '../MeldGroup.svelte';
  import TileCard from '../TileCard.svelte';
  export let setNarration;
  export let setAction;
  
  let matchStep = 1;
  
  let hand = [
    { suit: 'bamboo', value: 3 },
    { suit: 'bamboo', value: 4 },
    { suit: 'dots',   value: 7 },
    { suit: 'dots',   value: 2 },
    { suit: 'characters', value: 1 },
    { suit: 'characters', value: 1 },
    { suit: 'bamboo', value: 8 },
    { suit: 'dots',   value: 9 },
  ];
  let melds = [];
  let discard = null;
  let drawnTile = null;
  
  function runStep1() {
    setNarration("You have 3 and 4 of Bamboo. Let's pick a tile…");
    hand[0].highlighted = true;
    hand[1].highlighted = true;
    hand = [...hand];
    setAction('Draw Tile', () => {
      drawnTile = { suit: 'bamboo', value: 5, highlighted: true };
      setNarration("Great! You picked a 5 of Bamboo and made a Chow!");
      setAction('Continue', runStep2);
    });
  }
  
  function runStep2() {
    melds = [...melds, [hand[0], hand[1], { suit: 'bamboo', value: 5 }]];
    hand = hand.slice(2);
    drawnTile = null;
    
    discard = { suit: 'characters', value: 1 }; 
    setNarration("Opponent discarded a 1 of Characters. You have two matching tiles! Would you like to Pong?");
    hand[2].highlighted = true;
    hand[3].highlighted = true;
    hand = [...hand];
    
    setAction('Yes, Pong!', () => {
      melds = [...melds, [hand[2], hand[3], discard]];
      hand = hand.filter((_, i) => i !== 2 && i !== 3);
      discard = null;
      setNarration("You made a Pong! It's now open.");
      setAction('Continue', runStep3);
    });
  }
  
  function runStep3() {
    hand.forEach(t => t.highlighted = false);
    let index = hand.findIndex(t => t.suit === 'dots' && t.value === 9);
    hand[index].highlighted = true;
    hand = [...hand];
    
    setNarration("This 9 of Dots doesn't fit any group right now. Let's discard it.");
    setAction('Discard Tile', () => {
      discard = hand[index];
      hand = hand.filter((_, i) => i !== index);
      setNarration("Good move!");
      setAction('Continue', runStep4);
    });
  }
  
  function runStep4() {
    setNarration("You are only ONE tile away from winning!");
    setAction('Draw Tile', () => {
      drawnTile = { suit: 'dots', value: 7, highlighted: true }; 
      setNarration("Your Chow, your Pong, and your Pair — that's a winning hand!");
      matchStep = 5;
      setAction('Mahjong!', runStep5);
    });
  }
  
  function runStep5() {
    setNarration("");
    setAction("Finish", () => {
      const event = new CustomEvent('tutorial-next');
      window.dispatchEvent(event);
    });
  }
  
  import { onMount } from 'svelte';
  onMount(() => {
    runStep1();
  });
</script>

<div class="match-screen h-100 d-flex flex-column justify-content-between p-4">
  <div class="top-area d-flex justify-content-center pt-4" style="min-height: 120px;">
    {#if discard}
      <div class="discard-area text-center">
        <p class="mb-1 text-muted">Discarded</p>
        <TileCard suit={discard.suit} value={discard.value} />
      </div>
    {/if}
  </div>
  
  <div class="melds-area d-flex gap-3 justify-content-center mt-4">
    {#each melds as meld}
      <MeldGroup {meld} />
    {/each}
  </div>
  
  <div class="hand-area d-flex justify-content-center align-items-end mt-auto mb-5 pb-5 gap-4">
    <TileHand tiles={hand} />
    {#if drawnTile}
      <div class="drawn-tile">
        <TileCard suit={drawnTile.suit} value={drawnTile.value} highlighted={drawnTile.highlighted} />
      </div>
    {/if}
  </div>
  
  {#if matchStep === 5}
    <div class="win-overlay">
      <h1 class="win-text">🀄 MAHJONG! YOU WIN! 🀄</h1>
    </div>
  {/if}
</div>

<style>
  .match-screen {
    position: relative;
    min-height: calc(100vh - 140px);
  }
  .discard-area {
    animation: fadeIn 0.3s;
  }
  .drawn-tile {
    margin-left: 20px;
    animation: slideIn var(--anim-slow);
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .win-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 50;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 70%);
  }
  .win-text {
    font-size: 3rem;
    color: var(--color-gold);
    text-shadow: 0 0 20px rgba(0,0,0,0.8);
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
</style>
