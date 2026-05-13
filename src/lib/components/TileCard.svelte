<script>
  export let suit = 'bamboo';  
  export let value = 1;         
  export let highlighted = false;
  export let faceDown = false;
  
  const unicodeMap = {
    characters: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏'],
    bamboo:     ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘'],
    dots:       ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡'],
    winds:      ['🀀', '🀁', '🀂', '🀃'],
    dragons:    ['🀄', '🀅', '🀆'],
    flowers:    ['🀦', '🀧', '🀨', '🀩', '🀢', '🀣', '🀤', '🀥']
  };

  $: character = unicodeMap[suit]?.[value - 1] || '🀫';
  
  const colors = {
    characters: '#b32424',
    bamboo: '#1a6b31',
    dots: '#215c98',
    winds: '#333333',
    dragons: ['#b32424', '#1a6b31', '#215c98'], // Red, Green, White(Blue outline)
    flowers: '#8e24aa'
  };

  // Determine actual color
  $: charColor = suit === 'dragons' ? colors.dragons[value - 1] : colors[suit];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="tile" class:highlighted class:face-down={faceDown} on:click>
  {#if faceDown}
    <div class="tile-back"></div>
  {:else}
    <span class="tile-char" style="color: {charColor}">{character}</span>
  {/if}
</div>

<style>
  .tile {
    width: 66px; height: 90px;
    background: linear-gradient(135deg, #ffffff 0%, #ebe8df 100%);
    border-radius: 8px;
    transition: transform var(--anim-med), box-shadow var(--anim-med);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 
      inset 1px 1px 2px rgba(255,255,255,1),
      -1px 1px 0 #cfccc0,
      -2px 2px 0 var(--color-tile-side),
      -3px 3px 0 var(--color-tile-side),
      -4px 4px 0 #2a874b,
      -5px 5px 0 #2a874b,
      -8px 8px 15px var(--color-tile-shadow);
    user-select: none;
    position: relative;
    transform: translateY(0);
    margin: 0 4px; /* spacing */
  }
  
  .tile.highlighted {
    transform: translateY(-12px) translateX(4px);
    box-shadow: 
      inset 1px 1px 2px rgba(255,255,255,1),
      -1px 1px 0 #cfccc0,
      -2px 2px 0 var(--color-glow),
      -3px 3px 0 var(--color-glow),
      -4px 4px 0 #d9b811,
      -5px 5px 0 #d9b811,
      -12px 15px 25px rgba(0,0,0,0.8);
    z-index: 10;
  }
  
  .tile.face-down {
    background: linear-gradient(135deg, var(--color-tile-side) 0%, #2a874b 100%);
    box-shadow: 
      inset 1px 1px 2px rgba(255,255,255,0.3),
      -1px 1px 0 #2a874b,
      -2px 2px 0 #1f6638,
      -3px 3px 0 #1f6638,
      -6px 6px 12px var(--color-tile-shadow);
  }

  .tile-back {
    width: 100%; height: 100%;
    border-radius: 6px;
  }
  
  .tile-char {
    font-size: 64px;
    line-height: 1;
    filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.15));
  }
  
  /* Responsive breakpoints */
  @media (max-width: 576px) {
    .tile { width: 50px; height: 70px; margin: 0 2px; }
    .tile-char { font-size: 48px; }
  }
</style>
