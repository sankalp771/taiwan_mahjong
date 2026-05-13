<script>
  import { currentStepIndex } from '$lib/stores/tutorialStore.js';
  import { tutorialSteps } from '$lib/data/tutorialSteps.js';
  
  $: progress = ($currentStepIndex / (tutorialSteps.length - 1)) * 100;
</script>

<div class="progress-container">
  <div class="progress" style="height: 6px; background-color: rgba(255,255,255,0.2);">
    <div class="progress-bar" role="progressbar" style="width: {progress}%; background-color: var(--color-gold);" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
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
