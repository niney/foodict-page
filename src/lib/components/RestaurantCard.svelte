<script>
  import { openRestaurant } from '../stores/app.js'

  export let restaurant
  export let index = 0
</script>

<div
  class="restaurant-card"
  style="animation-delay: {index * 0.1}s"
  on:click={() => openRestaurant(restaurant.id)}
  on:keydown={(e) => e.key === 'Enter' && openRestaurant(restaurant.id)}
  role="button"
  tabindex="0"
>
  <div class="restaurant-card-image">
    <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
    <div class="restaurant-card-image-overlay"></div>

    {#if restaurant.michelin > 0}
      <div class="restaurant-card-michelin">
        {'⭐'.repeat(restaurant.michelin)}
      </div>
    {/if}

    <div class="restaurant-card-spoon" class:white={restaurant.spoonType === 'white'} class:black={restaurant.spoonType === 'black'}>
      {restaurant.spoonType === 'white' ? '🥄' : '🥢'}
      <span>{restaurant.spoonType === 'white' ? '백수저' : '흑수저'}</span>
    </div>

    <div class="restaurant-card-title-wrapper">
      <h3 class="restaurant-card-title">{restaurant.name}</h3>
      <p class="restaurant-card-title-en">{restaurant.nameEn}</p>
    </div>
  </div>

  <div class="restaurant-card-content">
    <div class="restaurant-card-chef">
      <span class="restaurant-card-chef-icon">👨‍🍳</span>
      <span class="restaurant-card-chef-name">
        {restaurant.chefNickname ? `${restaurant.chefNickname}` : ''}
        {restaurant.chef || ''}
      </span>
    </div>

    <p class="restaurant-card-desc">{restaurant.description}</p>

    <div class="restaurant-card-meta">
      <span class="restaurant-card-category">{restaurant.category}</span>
      <span class="restaurant-card-location">
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {restaurant.location}
      </span>
    </div>
  </div>
</div>
