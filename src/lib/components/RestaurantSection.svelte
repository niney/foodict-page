<script>
  import { getFeaturedRestaurants } from '../data/restaurants/index.js'
  import { navigateTo } from '../stores/app.js'
  import RestaurantCard from './RestaurantCard.svelte'

  const featuredRestaurants = getFeaturedRestaurants()
</script>

<section class="section section-restaurant" id="restaurantSection">
  <div class="container">
    <div class="section-header">
      <div class="section-badge section-badge-gold">
        <span>🍽️</span>
        <span>Black & White Chef 2</span>
      </div>
      <h2 class="section-title">흑백요리사2 식당</h2>
      <p class="section-desc">
        넷플릭스 '흑백요리사: 요리 계급 전쟁 2'에 출연한 셰프들의 레스토랑
      </p>
    </div>

    <div class="restaurant-grid">
      {#each featuredRestaurants as restaurant, index}
        <RestaurantCard {restaurant} {index} />
      {/each}
    </div>

    <div class="section-more">
      <button class="btn-more" on:click={() => navigateTo('restaurants')}>
        <span>전체 식당 보기</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </button>
    </div>
  </div>
</section>
