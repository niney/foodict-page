<script>
  import { onMount, onDestroy } from 'svelte'
  import { getWhiteSpoonRestaurants, getBlackSpoonRestaurants } from '../data/restaurants/index.js'
  import { navigateTo, openRestaurant } from '../stores/app.js'

  let activeTab = 'all'

  $: restaurants = activeTab === 'white'
    ? getWhiteSpoonRestaurants()
    : activeTab === 'black'
      ? getBlackSpoonRestaurants()
      : [...getWhiteSpoonRestaurants(), ...getBlackSpoonRestaurants()]

  // 해시에서 탭 상태 읽기
  const getTabFromHash = () => {
    const hash = window.location.hash.slice(1)
    if (hash === 'white' || hash === 'black') {
      return hash
    }
    return 'all'
  }

  // 탭 변경 시 해시 업데이트
  const setTab = (tab) => {
    activeTab = tab
    const newHash = tab === 'all' ? '' : `#${tab}`
    const basePath = window.location.pathname
    history.pushState({ page: 'restaurants', tab }, '', basePath + newHash)
  }

  // 해시 변경 감지 (popstate 포함)
  const handleHashChange = () => {
    activeTab = getTabFromHash()
  }

  onMount(() => {
    // 초기 해시에서 탭 상태 설정
    activeTab = getTabFromHash()
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)
  })

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  })
</script>

<div class="restaurant-list-page">
  <header class="restaurant-list-header">
    <button class="back-btn" on:click={() => navigateTo('home')}>
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      <span>홈으로</span>
    </button>
    <h1 class="restaurant-list-title">
      <span class="restaurant-list-title-icon">🍽️</span>
      흑백요리사2 식당
    </h1>
    <p class="restaurant-list-desc">백수저 {getWhiteSpoonRestaurants().length}곳 · 흑수저 {getBlackSpoonRestaurants().length}곳</p>
  </header>

  <div class="restaurant-tabs">
    <button
      class="restaurant-tab"
      class:active={activeTab === 'all'}
      on:click={() => setTab('all')}
    >
      전체
    </button>
    <button
      class="restaurant-tab tab-white"
      class:active={activeTab === 'white'}
      on:click={() => setTab('white')}
    >
      🥄 백수저
    </button>
    <button
      class="restaurant-tab tab-black"
      class:active={activeTab === 'black'}
      on:click={() => setTab('black')}
    >
      🥢 흑수저
    </button>
  </div>

  <div class="restaurant-list-grid">
    {#each restaurants as restaurant, index}
      <div
        class="restaurant-list-card"
        style="animation-delay: {index * 0.05}s"
        on:click={() => openRestaurant(restaurant.id)}
        on:keydown={(e) => e.key === 'Enter' && openRestaurant(restaurant.id)}
        role="button"
        tabindex="0"
      >
        <div class="restaurant-list-card-image">
          <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
          {#if restaurant.michelin > 0}
            <div class="restaurant-list-card-michelin">
              {'⭐'.repeat(restaurant.michelin)} 미슐랭
            </div>
          {/if}
        </div>

        <div class="restaurant-list-card-content">
          <div class="restaurant-list-card-header">
            <h3 class="restaurant-list-card-name">{restaurant.name}</h3>
            <span class="restaurant-list-card-spoon" class:white={restaurant.spoonType === 'white'}>
              {restaurant.spoonType === 'white' ? '백수저' : '흑수저'}
            </span>
          </div>

          <div class="restaurant-list-card-chef">
            <span class="chef-icon">👨‍🍳</span>
            {#if restaurant.chefNickname}
              <span class="chef-nickname">"{restaurant.chefNickname}"</span>
            {/if}
            {#if restaurant.chef}
              <span class="chef-name">{restaurant.chef}</span>
            {/if}
          </div>

          <p class="restaurant-list-card-desc">{restaurant.description}</p>

          <div class="restaurant-list-card-info">
            <span class="restaurant-list-card-category">{restaurant.category}</span>
            <span class="restaurant-list-card-location">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              {restaurant.location}
            </span>
            <span class="restaurant-list-card-price">{restaurant.priceRange}</span>
          </div>

          <div class="restaurant-list-card-signature">
            {#each restaurant.signature as menu}
              <span class="signature-tag">{menu}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
