<script>
  export let step;
</script>

<div class="victory-screen d-flex align-items-center justify-content-center">
  <div class="cultural-border p-5 text-center shadow-lg">
    <div class="win-icon mb-2">🀄</div>
    <h1 class="mb-2 victory-title">MASTER OF THE TILES</h1>
    <h3 class="mb-4 text-gold subtitle">You are now ready to play Taiwan Mahjong.</h3>
    
    <div class="ornament mb-5">
      <span>🀆</span><span>🀅</span><span>🀄</span><span>🀅</span><span>🀆</span>
    </div>
    
    <div class="d-flex justify-content-center mt-3">
      <a href="https://planetmahjong.com" class="btn btn-primary btn-lg px-5 py-3 fs-3 play-btn">進入遊戲 (Play Game)</a>
    </div>
  </div>
</div>

<style>
  .victory-screen {
    min-height: calc(100vh - 120px);
    animation: fadeIn var(--anim-slow);
    padding: 20px;
  }
  
  .cultural-border {
    border: 4px solid var(--color-gold);
    border-radius: 16px;
    background: rgba(14, 56, 34, 0.9);
    position: relative;
    max-width: 800px;
    width: 100%;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.7);
    overflow: hidden;
  }
  
  .cultural-border::before {
    content: '🀫';
    position: absolute;
    top: 10px; left: 20px;
    color: var(--color-gold);
    font-size: 2.5rem;
    opacity: 0.3;
  }
  .cultural-border::after {
    content: '🀫';
    position: absolute;
    top: 10px; right: 20px;
    color: var(--color-gold);
    font-size: 2.5rem;
    opacity: 0.3;
  }
  
  .victory-title {
    font-size: 4rem;
    color: var(--color-gold);
    font-family: 'Georgia', serif;
    letter-spacing: 4px;
    text-shadow: 0 5px 15px rgba(0,0,0,0.8), 0 0 20px rgba(223, 182, 82, 0.4);
    margin-top: -10px;
  }
  
  .subtitle {
    color: #e0e0e0;
    font-weight: 300;
    letter-spacing: 1px;
  }
  
  .text-gold { color: var(--color-gold) !important; }
  
  .win-icon {
    font-size: 7rem;
    text-shadow: 0 10px 30px rgba(223, 182, 82, 0.5);
    animation: float 3s ease-in-out infinite;
    line-height: 1;
  }
  
  .ornament {
    font-size: 2.5rem;
    letter-spacing: 15px;
    color: #b32424; /* Dragon Red */
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  }
  
  .play-btn {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    box-shadow: 0 10px 30px rgba(223, 182, 82, 0.4);
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style>
