<script>
  export let step;
</script>

<div class="victory-screen text-center">
  <div class="win-icon mb-4">🏆</div>
  <h1 class="mb-4">{step.title}</h1>
  <p class="fs-4 mb-5">You've learned the basics of Taiwan Mahjong.</p>
  
  <div class="d-flex justify-content-center gap-4 flex-wrap mt-5">
    <a href="https://planetmahjong.com" class="btn btn-primary btn-lg px-5 py-3 fs-3">🎮 Play Game</a>
  </div>
</div>

<style>
  .victory-screen {
    padding: 60px 20px;
    animation: fadeIn var(--anim-slow);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .win-icon {
    font-size: 6rem;
    animation: bounce 2s infinite;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
</style>
