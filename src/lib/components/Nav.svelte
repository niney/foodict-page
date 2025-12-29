<script>
  import { isNavScrolled, activeSection, isMobileMenuOpen, navigateTo, toggleMobileMenu } from '../stores/app.js'
</script>

<nav class="nav" class:scrolled={$isNavScrolled}>
  <div class="nav-container">
    <button type="button" class="nav-logo" on:click={() => navigateTo('home')}>
      <div class="nav-logo-icon">🍲</div>
      <span class="nav-logo-text">맛</span>
    </button>

    <div class="nav-links">
      <button
        class="nav-link"
        class:active={$activeSection === 'home'}
        on:click={() => navigateTo('home')}
      >홈</button>
      <button
        class="nav-link"
        class:active={$activeSection === 'today'}
        on:click={() => navigateTo('today')}
      >오늘의 추천</button>
      <button
        class="nav-link"
        class:active={$activeSection === 'chef'}
        on:click={() => navigateTo('chef')}
      >셰프 레시피</button>
    </div>

    <div class="nav-actions">
      <button class="nav-btn" aria-label="검색">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
      <button class="nav-btn mobile-menu-btn" on:click={toggleMobileMenu} aria-label="메뉴">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu" class:open={$isMobileMenuOpen}>
    <button
      class="mobile-menu-link"
      class:active={$activeSection === 'home'}
      on:click={() => navigateTo('home')}
    >
      <span>홈</span>
      <span class="mobile-menu-link-en">Home</span>
    </button>
    <button
      class="mobile-menu-link"
      class:active={$activeSection === 'today'}
      on:click={() => navigateTo('today')}
    >
      <span>오늘의 추천</span>
      <span class="mobile-menu-link-en">Today</span>
    </button>
    <button
      class="mobile-menu-link"
      class:active={$activeSection === 'chef'}
      on:click={() => navigateTo('chef')}
    >
      <span>셰프 레시피</span>
      <span class="mobile-menu-link-en">Chef</span>
    </button>
  </div>
</nav>
