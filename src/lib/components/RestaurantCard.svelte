<script>
  import { onMount } from 'svelte'
  import { openRestaurant } from '../stores/app.js'

  export let restaurant
  export let index = 0

  let sentimentData = null
  let isLoadingSentiment = false

  onMount(async () => {
    if (restaurant.nlpId) {
      isLoadingSentiment = true
      try {
        const response = await fetch(
          `https://nlpfriendly.easypcb.co.kr/api/restaurants/${restaurant.nlpId}/statistics`
        )
        const result = await response.json()
        if (result.result && result.data) {
          sentimentData = result.data
        }
      } catch (error) {
        console.error('Failed to fetch sentiment data:', error)
      } finally {
        isLoadingSentiment = false
      }
    }
  })
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

    {#if sentimentData}
      <div class="restaurant-card-sentiment">
        <div class="sentiment-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span>리뷰 감정 분석</span>
          <span class="sentiment-count">{sentimentData.totalReviews}개</span>
        </div>
        <div class="sentiment-bar">
          <div
            class="sentiment-positive"
            style="width: {sentimentData.positiveRate}%"
            title="긍정 {sentimentData.positiveRate}%"
          ></div>
          <div
            class="sentiment-neutral"
            style="width: {sentimentData.neutralRate}%"
            title="중립 {sentimentData.neutralRate}%"
          ></div>
          <div
            class="sentiment-negative"
            style="width: {sentimentData.negativeRate}%"
            title="부정 {sentimentData.negativeRate}%"
          ></div>
        </div>
        <div class="sentiment-labels">
          <span class="label-positive">
            <span class="dot"></span>
            긍정 {sentimentData.positiveRate}%
          </span>
          <span class="label-neutral">
            <span class="dot"></span>
            중립 {sentimentData.neutralRate}%
          </span>
          <span class="label-negative">
            <span class="dot"></span>
            부정 {sentimentData.negativeRate}%
          </span>
        </div>
      </div>
    {:else if isLoadingSentiment}
      <div class="restaurant-card-sentiment loading">
        <div class="sentiment-skeleton"></div>
      </div>
    {/if}

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
