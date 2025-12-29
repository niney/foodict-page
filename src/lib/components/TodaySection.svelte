<script>
  import { recipes, isLoading, shuffleRecipes } from '../stores/app.js'
  import RecipeCard from './RecipeCard.svelte'
</script>

<section class="section section-today" id="todaySection">
  <div class="container">
    <div class="section-header">
      <div class="section-badge section-badge-emerald">
        <span>✨</span>
        <span>Today's Pick</span>
      </div>
      <h2 class="section-title">오늘의 추천</h2>
      <p class="section-desc">매일 새롭게 선정되는 한식 레시피를 만나보세요.</p>

      <button
        class="shuffle-btn"
        class:loading={$isLoading}
        disabled={$isLoading}
        on:click={shuffleRecipes}
      >
        <svg class="shuffle-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span>새로운 레시피 추천받기</span>
      </button>
    </div>

    <div class="recipe-grid" class:loading={$isLoading}>
      {#each $recipes as recipe, index (recipe.id)}
        <RecipeCard {recipe} {index} featured={index === 0} />
      {/each}
    </div>

    <div class="loading-overlay" class:show={$isLoading}>
      <div class="loading-spinner"></div>
      <p>레시피를 불러오는 중...</p>
    </div>
  </div>
</section>
