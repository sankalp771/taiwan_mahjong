<script>
  import TileCard from '../TileCard.svelte';
  export let step;
  
  let activeTab = 'tiles'; // 'tiles', 'setup', 'rules'
</script>

<div class="rules-screen d-flex flex-column h-100">
  <div class="header-section text-center mb-3">
    <h1 class="text-gold title-glow">How to Play Taiwan Mahjong</h1>
    
    <div class="nav nav-pills justify-content-center mt-3 gap-2 gap-md-3" role="tablist">
      <button class="nav-link" class:active={activeTab === 'tiles'} on:click={() => activeTab = 'tiles'}>Taiwan Mahjong Tiles</button>
      <button class="nav-link" class:active={activeTab === 'setup'} on:click={() => activeTab = 'setup'}>Game Setup</button>
      <button class="nav-link" class:active={activeTab === 'rules'} on:click={() => activeTab = 'rules'}>Basic Rules</button>
    </div>
  </div>

  <div class="content-scroll flex-grow-1 p-2 p-md-3 pb-5">
    <div class="card glass-card p-4 mx-auto" style="max-width: 900px;">
      
      {#if activeTab === 'tiles'}
        <div class="tab-pane fade show active fade-in">
          <h3 class="mb-3 text-gold border-bottom pb-2">Suits: Bamboo, Dots, and Characters</h3>
          <p class="mb-3">36 tiles each (numbers 1–9, 4 copies per number).</p>
          <div class="d-flex flex-wrap mb-3">
            {#each Array(9) as _, i} <div class="tile-sm"><TileCard suit="characters" value={i+1}/></div> {/each}
          </div>
          <div class="d-flex flex-wrap mb-3">
            {#each Array(9) as _, i} <div class="tile-sm"><TileCard suit="bamboo" value={i+1}/></div> {/each}
          </div>
          <div class="d-flex flex-wrap mb-5">
            {#each Array(9) as _, i} <div class="tile-sm"><TileCard suit="dots" value={i+1}/></div> {/each}
          </div>
          
          <h3 class="mb-3 text-gold border-bottom pb-2">Wind Tiles</h3>
          <p class="mb-3">East, South, West, North (4 copies each, 16 total).</p>
          <div class="d-flex flex-wrap mb-5">
            {#each Array(4) as _, i} <div class="tile-sm"><TileCard suit="winds" value={i+1}/></div> {/each}
          </div>
          
          <h3 class="mb-3 text-gold border-bottom pb-2">Dragon Tiles</h3>
          <p class="mb-3">Red Dragon, Green Dragon, and White Dragon (4 copies each, 12 total).</p>
          <div class="d-flex flex-wrap mb-5">
            {#each Array(3) as _, i} <div class="tile-sm"><TileCard suit="dragons" value={i+1}/></div> {/each}
          </div>
          
          <h3 class="mb-3 text-gold border-bottom pb-2">Flower Tiles</h3>
          <p class="mb-3">Spring, Summer, Autumn, Winter, Plum, Orchid, Bamboo, Chrysanthemum (1 copy each, 8 total).</p>
          <div class="d-flex flex-wrap mb-2">
            {#each Array(8) as _, i} <div class="tile-sm"><TileCard suit="flowers" value={i+1}/></div> {/each}
          </div>
        </div>
      {/if}
      
      {#if activeTab === 'setup'}
        <div class="tab-pane fade show active fade-in">
          <h3 class="mb-3 text-gold">Seating & Dealer</h3>
          <p class="mb-5">Four players sit in positions corresponding to East, South, West, and North. The first dealer (East) is determined by a dice roll.</p>
          
          <h3 class="mb-3 text-gold">Starting Hands</h3>
          <p class="mb-5">The dealer draws <strong>17 tiles</strong>; other players draw <strong>16 tiles</strong> each.</p>
          
          <h3 class="mb-3 text-gold">Flower Replacement</h3>
          <p>Players immediately reveal and replace any flower tiles drawn in their starting hands by drawing from the <em>"dead wall"</em> (the end of the tile wall).</p>
        </div>
      {/if}
      
      {#if activeTab === 'rules'}
        <div class="tab-pane fade show active fade-in">
          <h3 class="mb-3 text-gold">Winning Hand</h3>
          <p class="mb-5">
            Requires <strong>four melds + one pair</strong> (sequences, triplets, or quads). 
            <br/><br/>
            <small style="color: #b0b0b0;">(Taiwan Mahjong often features larger combination variations, but the core foundation is built on standard melds.)</small>
          </p>
          
          <h3 class="mb-3 text-gold">Tile Wall & Drawing</h3>
          <p class="mb-4">
            Each player builds two stacks of 18 tiles (36 total). The last 16 tiles form the <em>"dead wall"</em> for flower replacements.
            Drawing proceeds counterclockwise, with the dealer acting first.
          </p>
        </div>
      {/if}

    </div>
  </div>
</div>

<style>
  .rules-screen {
    padding-top: 10px;
    animation: fadeIn var(--anim-med);
  }
  
  .title-glow {
    font-size: 2.5rem;
    text-shadow: 0 4px 15px rgba(223, 182, 82, 0.4);
    letter-spacing: 1px;
  }
  
  .text-gold { color: var(--color-gold); }
  
  .nav-pills .nav-link {
    color: var(--color-text);
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px;
    padding: 10px 24px;
    font-weight: 600;
    transition: all var(--anim-fast);
    cursor: pointer;
  }
  .nav-pills .nav-link:hover {
    background: rgba(255,255,255,0.1);
  }
  .nav-pills .nav-link.active {
    background: var(--color-gold);
    color: #1a1a1a;
    box-shadow: 0 0 15px rgba(223, 182, 82, 0.5);
    border-color: var(--color-gold);
  }
  
  .content-scroll {
    overflow-y: auto;
    /* Hide scrollbar for a cleaner look, but keep functionality */
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.2) transparent;
  }
  .content-scroll::-webkit-scrollbar { width: 6px; }
  .content-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
  
  .glass-card {
    background: rgba(14, 56, 34, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(223, 182, 82, 0.3);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 2px 20px rgba(0,0,0,0.3);
    color: #e0e0e0;
    font-size: 1.15rem;
    line-height: 1.6;
    border-radius: 16px;
  }
  
  .border-bottom {
    border-color: rgba(223, 182, 82, 0.2) !important;
  }

  .tile-sm {
    transform: scale(0.65);
    transform-origin: top left;
    width: 48px; 
    height: 60px;
    margin-right: 2px;
  }
  
  .fade-in {
    animation: fadeIn var(--anim-fast);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
