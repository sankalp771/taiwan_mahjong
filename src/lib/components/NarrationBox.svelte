<script>
  export let narration = '';
  export let showBack = true;
  export let actionLabel = 'Next';
  export let onNext = () => {};
  export let onBack = () => {};
</script>

<div class="narration-box p-4 text-center">
  <p class="narration mb-0">{narration}</p>
  <div class="d-flex gap-3 justify-content-center mt-3">
    {#if showBack}
      <button class="btn btn-outline-light" on:click={onBack}>← Back</button>
    {/if}
    {#if actionLabel}
      <button class="btn btn-primary btn-lg" on:click={onNext}>{actionLabel}</button>
    {/if}
  </div>
</div>

<style>
  .narration-box {
    background: rgba(0, 0, 0, 0.85);
    border-top: 4px solid var(--color-gold);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.5);
  }
  
  .narration {
    color: var(--color-text);
    font-weight: 500;
  }
</style>
