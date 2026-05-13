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
<div class="match-screen h-100 d-flex flex-column position-relative">
  
  <div class="board flex-grow-1 position-relative d-flex align-items-center justify-content-center">
    <!-- Opponent Walls -->
    <div class="wall wall-top">
       {#each Array(10) as _} <div class="wall-tile-top"><TileCard faceDown={true} /></div> {/each}
    </div>
    
    <div class="wall wall-left">
       {#each Array(8) as _} <div class="wall-tile-side"><TileCard faceDown={true} /></div> {/each}
    </div>
    
    <div class="wall wall-right">
       {#each Array(8) as _} <div class="wall-tile-side"><TileCard faceDown={true} /></div> {/each}
    </div>

    <!-- Center Pond / Discards -->
    <div class="pond">
      <div class="pond-inner d-flex flex-wrap justify-content-center align-content-center gap-2">
        <div class="dummy-discard"><TileCard suit="dots" value={3} /></div>
        <div class="dummy-discard"><TileCard suit="characters" value={8} /></div>
        <div class="dummy-discard"><TileCard suit="bamboo" value={1} /></div>
        
        {#if discard}
          <div class="discard-active">
            <TileCard suit={discard.suit} value={discard.value} highlighted={true} />
            <div class="discard-ping"></div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Player Area -->
  <div class="player-area mt-auto pb-5">
    <div class="melds-area d-flex gap-3 justify-content-center mb-3">
      {#each melds as meld}
        <MeldGroup {meld} />
      {/each}
    </div>
    
    <div class="hand-area d-flex justify-content-center align-items-end gap-2">
      <TileHand tiles={hand} />
      {#if drawnTile}
        <div class="drawn-tile ms-4">
          <TileCard suit={drawnTile.suit} value={drawnTile.value} highlighted={drawnTile.highlighted} />
        </div>
      {/if}
    </div>
  </div>
  
  {#if matchStep === 5}
    <div class="win-overlay">
      <h1 class="win-text">🀄 MAHJONG! YOU WIN! 🀄</h1>
    </div>
  {/if}
</div>

<style>
  .match-screen {
    min-height: calc(100vh - 120px);
    overflow: hidden;
  }
  
  .board {
    perspective: 1000px;
  }

  .wall {
    position: absolute;
    display: flex;
    gap: 2px;
  }

  .wall-top {
    top: 5%;
    left: 50%;
    transform: translateX(-50%) scale(0.6);
  }

  .wall-left {
    left: 5%;
    top: 40%;
    transform: translateY(-50%) scale(0.6) rotate(90deg);
  }

  .wall-right {
    right: 5%;
    top: 40%;
    transform: translateY(-50%) scale(0.6) rotate(-90deg);
  }

  .pond {
    width: 300px;
    height: 250px;
    background: rgba(0,0,0,0.2);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    box-shadow: inset 0 10px 30px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pond-inner {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .dummy-discard {
    transform: scale(0.6);
    opacity: 0.6;
    margin: -15px;
  }

  .discard-active {
    position: relative;
    transform: scale(0.8);
    margin: -10px;
    z-index: 5;
    animation: dropIn var(--anim-med);
  }
  
  @keyframes dropIn {
    from { transform: scale(1.5) translateY(-50px); opacity: 0; }
    to { transform: scale(0.8) translateY(0); opacity: 1; }
  }

  .discard-ping {
    position: absolute;
    top: 50%; left: 50%;
    width: 100px; height: 100px;
    background: var(--color-glow);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    animation: ping 1.5s infinite;
  }
  
  @keyframes ping {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }

  .drawn-tile {
    animation: slideIn var(--anim-slow);
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(30px); }
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
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
  }
  
  .win-text {
    font-size: 5rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(to bottom, #ffffff, var(--color-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 10px 40px rgba(223, 182, 82, 0.6), 0 5px 10px rgba(0,0,0,0.8);
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
</style>
