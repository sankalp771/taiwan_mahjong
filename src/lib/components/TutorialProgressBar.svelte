<script>
  import { currentStepIndex } from '$lib/stores/tutorialStore.js';
  import { tutorialSteps } from '$lib/data/tutorialSteps.js';
  
  $: progress = ($currentStepIndex / (tutorialSteps.length - 1)) * 100;
</script>

<div class="progress-container">
  <div class="progress" style="height: 8px; background-color: rgba(0,0,0,0.5); border-radius: 0; box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);">
    <div class="progress-bar" role="progressbar" style="width: {progress}%; background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold)); box-shadow: 0 0 15px var(--color-gold);" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .progress-bar {
    transition: width var(--anim-med);
  }
</style>
