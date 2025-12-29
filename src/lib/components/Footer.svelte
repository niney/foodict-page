<script>
  import { navigateTo } from '../stores/app.js'
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="footer-logo-icon">🍲</div>
        <div>
          <p class="footer-logo-text">요리</p>
          <p class="footer-logo-desc">한식의 맛을 전하다</p>
        </div>
      </div>

      <div class="footer-links">
        <button on:click={() => navigateTo('today')}>오늘의 추천</button>
        <button on:click={() => navigateTo('chef')}>셰프 레시피</button>
      </div>

      <div class="footer-copyright">
        <p>&copy; 2025 요리. All rights reserved.</p>
        <p class="footer-made">Made with love for Korean cuisine</p>
      </div>
    </div>
  </div>
</footer>
