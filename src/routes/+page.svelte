<script>
  import { onMount } from 'svelte';
  import { currentStep, nextStep, prevStep, resetTutorial, currentStepIndex } from '$lib/stores/tutorialStore.js';
  import TutorialProgressBar from '$lib/components/TutorialProgressBar.svelte';
  import NarrationBox from '$lib/components/NarrationBox.svelte';
  
  // Screens
  import InfoScreen from '$lib/components/screens/InfoScreen.svelte';
  import TileExplorer from '$lib/components/screens/TileExplorer.svelte';
  import ComboDemo from '$lib/components/screens/ComboDemo.svelte';
  import TurnFlowAnim from '$lib/components/screens/TurnFlowAnim.svelte';
  import MockMatch from '$lib/components/screens/MockMatch.svelte';
  import Victory from '$lib/components/screens/Victory.svelte';
  import VideoIntro from '$lib/components/screens/VideoIntro.svelte';

  const screens = {
    InfoScreen,
    TileExplorer,
    ComboDemo,
    TurnFlowAnim,
    MockMatch,
    Victory,
    VideoIntro
  };
  
  let dynamicNarration = '';
  let dynamicActionLabel = '';
  let dynamicOnNext = null;
  
  $: {
    if ($currentStep && $currentStep.screen !== 'MockMatch') {
      dynamicNarration = $currentStep.narration;
      dynamicActionLabel = getActionLabel($currentStep.allowedAction);
      dynamicOnNext = handleNext;
    }
  }
  
  function getActionLabel(action) {
    if (action === 'next' || action === 'tap-tile') return 'Next';
    if (action === 'restart') return 'Replay Tutorial';
    return action;
  }
  
  function handleNext() {
    if ($currentStep.allowedAction === 'restart') {
      resetTutorial();
    } else {
      nextStep();
    }
  }
  
  onMount(() => {
    const handleTutorialNext = () => {
      nextStep();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('tutorial-next', handleTutorialNext);
      return () => window.removeEventListener('tutorial-next', handleTutorialNext);
    }
  });
  
  function setNarration(text) {
    dynamicNarration = text;
  }
  function setAction(label, callback) {
    dynamicActionLabel = label;
    dynamicOnNext = callback;
  }
</script>

<svelte:head>
  <title>Taiwan Mahjong Tutorial</title>
</svelte:head>

<div class="tutorial-app">
  <TutorialProgressBar />
  
  <main class="step-container">
    {#if $currentStep}
      {#key $currentStep.id}
        <svelte:component 
          this={screens[$currentStep.screen]} 
          step={$currentStep} 
          {setNarration}
          {setAction}
        />
      {/key}
    {/if}
  </main>
  
  {#if $currentStep && $currentStep.screen !== 'Victory' && $currentStep.screen !== 'VideoIntro'}
    <NarrationBox 
      narration={dynamicNarration} 
      showBack={$currentStepIndex > 1} 
      actionLabel={dynamicActionLabel} 
      onNext={dynamicOnNext}
      onBack={prevStep}
    />
  {/if}
  
  {#if $currentStep && $currentStep.screen === 'Victory'}
    <div class="fixed-bottom d-flex justify-content-center pb-4">
      <button class="btn btn-outline-light" on:click={resetTutorial}>Replay Tutorial</button>
    </div>
  {/if}
</div>

<style>
  .tutorial-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .step-container {
    flex: 1;
    padding-top: 10px;
    padding-bottom: 120px;
  }
</style>
