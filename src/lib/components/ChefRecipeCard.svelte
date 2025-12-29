<script>
  import { openRecipe, getDifficultyClass } from '../stores/app.js'
  import { getChefById } from '../data/chefs/index.js'

  export let recipe
  export let index = 0

  $: chef = getChefById(recipe.chefId)
  $: difficultyClass = getDifficultyClass(recipe.difficulty)
</script>

<div
  class="chef-recipe-card"
  style="animation-delay: {index * 0.15}s"
  on:click={() => openRecipe(recipe.id)}
  on:keydown={(e) => e.key === 'Enter' && openRecipe(recipe.id)}
  role="button"
  tabindex="0"
>
  <div class="chef-recipe-card-image">
    <img src={recipe.image} alt={recipe.name} loading="lazy" />
    <div class="chef-recipe-card-image-overlay"></div>

    <div class="chef-recipe-card-chef-badge">
      <div class="chef-recipe-card-chef-icon">👨‍🍳</div>
      <span class="chef-recipe-card-chef-name">{chef?.name}</span>
    </div>

    <div class="chef-recipe-card-title-wrapper">
      <h3 class="chef-recipe-card-title">{recipe.name}</h3>
      <p class="chef-recipe-card-title-en">{recipe.nameEn}</p>
    </div>
  </div>

  <div class="chef-recipe-card-content">
    <p class="chef-recipe-card-desc">{recipe.description}</p>

    {#if recipe.chefNote}
      <div class="chef-recipe-card-note">
        <p class="chef-recipe-card-note-label">💡 {chef?.name} 셰프의 팁</p>
        <p class="chef-recipe-card-note-text">"{recipe.chefNote}"</p>
      </div>
    {/if}

    <div class="chef-recipe-card-meta">
      <div class="recipe-card-meta-info">
        <span class="recipe-card-meta-item">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {recipe.cookTime}
        </span>
        <span class="recipe-card-meta-item {difficultyClass}">{recipe.difficulty}</span>
      </div>
      <span class="recipe-card-view">
        자세히 보기
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </span>
    </div>
  </div>
</div>
