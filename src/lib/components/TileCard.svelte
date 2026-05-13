<script>
  export let suit = 'bamboo';  // 'bamboo' | 'dots' | 'characters'
  export let value = 1;         // 1-9
  export let highlighted = false;
  export let faceDown = false;
  
  const unicodeMap = {
    characters: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏'],
    bamboo:     ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘'],
    dots:       ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡']
  };

  $: character = unicodeMap[suit]?.[value - 1] || '🀫';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="tile" class:highlighted class:face-down={faceDown} on:click>
  {#if faceDown}
    <div class="tile-back"></div>
  {:else}
    <span class="tile-char">{character}</span>
  {/if}
</div>

<style>
  .tile {
    width: 60px; height: 80px;
    background: var(--color-tile-bg);
    border-radius: 8px;
    border: 2px solid var(--color-tile-border);
    transition: transform var(--anim-med), box-shadow var(--anim-med);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    user-select: none;
    position: relative;
  }
  .tile::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    border-radius: 8px;
    box-shadow: inset 0 0 4px rgba(255,255,255,0.8);
    pointer-events: none;
  }
  .tile.highlighted {
    box-shadow: 0 0 18px 6px var(--color-glow);
    transform: translateY(-12px);
    border-color: var(--color-glow);
    z-index: 10;
  }
  .tile-back {
    width: 100%; height: 100%;
    background: var(--color-table);
    border-radius: 6px;
    opacity: 0.8;
  }
  .tile-char {
    font-size: 55px;
    line-height: 1;
    color: #333;
  }
  
  /* Responsive breakpoints */
  @media (max-width: 576px) {
    .tile { width: 48px; height: 64px; }
    .tile-char { font-size: 44px; }
  }
  @media (min-width: 768px) {
    .tile { width: 68px; height: 90px; }
    .tile-char { font-size: 60px; }
  }
</style>
