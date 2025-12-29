<script>
  import { openRecipe, getDifficultyClass } from '../stores/app.js'

  export let recipe
  export let index = 0
  export let featured = false

  $: difficultyClass = getDifficultyClass(recipe.difficulty)
</script>

<div
  class="recipe-card"
  class:featured
  style="animation-delay: {index * 0.1}s"
  on:click={() => openRecipe(recipe.id)}
  on:keydown={(e) => e.key === 'Enter' && openRecipe(recipe.id)}
  role="button"
  tabindex="0"
>
  <div class="recipe-card-image">
    <img src={recipe.image} alt={recipe.name} loading="lazy" />
    <div class="recipe-card-image-overlay"></div>

    <div class="recipe-card-tags">
      {#each recipe.tags.slice(0, 2) as tag}
        <span class="recipe-card-tag">{tag}</span>
      {/each}
    </div>

    <span class="recipe-card-difficulty {difficultyClass}">{recipe.difficulty}</span>

    <div class="recipe-card-title-wrapper">
      <h3 class="recipe-card-title">{recipe.name}</h3>
      <p class="recipe-card-title-en">{recipe.nameEn}</p>
    </div>
  </div>

  <div class="recipe-card-content">
    <p class="recipe-card-desc">{recipe.description}</p>

    <div class="recipe-card-meta">
      <div class="recipe-card-meta-info">
        <span class="recipe-card-meta-item">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {recipe.cookTime}
        </span>
        <span class="recipe-card-meta-item">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {recipe.servings}인분
        </span>
      </div>
      <span class="recipe-card-view">
        자세히 보기
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </span>
    </div>

    {#if featured}
      <div class="recipe-card-ingredients">
        <p class="recipe-card-ingredients-label">주재료</p>
        <div class="recipe-card-ingredients-list">
          {#each recipe.ingredients.slice(0, 4) as ingredient}
            <span class="recipe-card-ingredient">{ingredient.split(' ')[0]}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="recipe-card-decor"></div>
</div>
