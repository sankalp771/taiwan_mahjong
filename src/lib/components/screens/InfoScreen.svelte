<script>
  import { currentStep } from '$lib/stores/tutorialStore.js';
  export let step;
</script>

<div class="info-screen">
  <div class="content card shadow-lg p-5">
    <h1 class="mb-4 text-center">{step.title}</h1>
    
    {#if step.isSplitScreen}
      <div class="row text-center mt-4 g-4">
        <div class="col-md-6">
          <div class="p-4 border rounded" style="border-color: var(--color-gold) !important; background: rgba(0,0,0,0.5);">
            <h3>Open Hand</h3>
            <p>You can use tiles others discard.</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-4 border rounded" style="border-color: var(--color-gold) !important; background: rgba(0,0,0,0.5);">
            <h3>Hidden Hand</h3>
            <p>Using only your own tiles may score more.</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .info-screen {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: 20px;
    animation: fadeIn var(--anim-slow);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .content {
    background: rgba(26, 74, 46, 0.9);
    border: 2px solid var(--color-gold);
    color: var(--color-text);
    max-width: 800px;
    width: 100%;
    z-index: 2;
    border-radius: 16px;
  }
</style>
