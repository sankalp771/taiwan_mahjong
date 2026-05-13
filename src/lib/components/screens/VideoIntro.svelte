<script>
  import { nextStep } from '$lib/stores/tutorialStore.js';
  let videoElement;
</script>

<div class="video-container" on:click={() => videoElement && videoElement.play()}>
  <video bind:this={videoElement} autoplay muted playsinline class="main-video" on:ended={nextStep}>
    <source src="/intro.mp4" type="video/mp4" />
  </video>
  <button class="skip-btn btn btn-outline-light" on:click|stopPropagation={nextStep}>Skip Intro →</button>
</div>

<style>
  .video-container {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: black;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-video {
    width: 100%; height: 100%;
    object-fit: contain;
  }
  .skip-btn {
    position: absolute;
    bottom: 40px;
    right: 40px;
    z-index: 2010;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
  }
</style>
