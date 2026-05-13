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
    background: rgba(10, 30, 18, 0.85);
    border-top: 1px solid rgba(223, 182, 82, 0.5);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    backdrop-filter: blur(20px);
    box-shadow: 0 -10px 40px rgba(0,0,0,0.7);
  }
  
  .narration {
    color: var(--color-text);
    font-weight: 500;
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .narration-box { padding: 15px 10px !important; }
    .narration { font-size: 1.1rem; }
    .btn { padding: 8px 16px; font-size: 1rem; }
  }
</style>
