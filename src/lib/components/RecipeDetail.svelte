<script>
  import { closeRecipe, getDifficultyClass } from '../stores/app.js'

  export let recipe

  $: difficultyClass = getDifficultyClass(recipe?.difficulty)
</script>

{#if recipe}
<div class="modal open">
  <div class="modal-content">
    <!-- Hero -->
    <div class="detail-hero">
      <div class="detail-hero-bg" style="background-image: url({recipe.image})"></div>
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-overlay-side"></div>
      <div class="detail-hero-pattern"></div>

      <button class="detail-back-btn" on:click={() => closeRecipe()}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>목록으로</span>
      </button>

      <div class="detail-hero-content">
        <div class="detail-tags">
          {#each recipe.tags as tag}
            <span class="detail-tag">{tag}</span>
          {/each}
        </div>

        <h1 class="detail-title">{recipe.name}</h1>
        <p class="detail-title-en">{recipe.nameEn}</p>
        <p class="detail-description">{recipe.description}</p>

        <div class="detail-meta">
          <div class="detail-meta-card">
            <div class="detail-meta-icon detail-meta-icon-amber">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="detail-meta-label">조리시간</p>
              <p class="detail-meta-value">{recipe.cookTime}</p>
            </div>
          </div>

          <div class="detail-meta-card">
            <div class="detail-meta-icon detail-meta-icon-blue">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p class="detail-meta-label">인분</p>
              <p class="detail-meta-value">{recipe.servings}인분</p>
            </div>
          </div>

          <div class="detail-meta-card">
            <div class="detail-meta-icon detail-meta-icon-rose">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
              </svg>
            </div>
            <div>
              <p class="detail-meta-label">칼로리</p>
              <p class="detail-meta-value">{recipe.calories}kcal</p>
            </div>
          </div>

          <div class="detail-meta-card detail-meta-card-difficulty">
            <div class="detail-meta-icon detail-meta-icon-emerald">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <p class="detail-meta-label">난이도</p>
              <p class="detail-meta-value">{recipe.difficulty}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-hero-decor-1"></div>
      <div class="detail-hero-decor-2"></div>
    </div>

    <!-- Content -->
    <div class="detail-content">
      <div class="detail-grid">
        <!-- Ingredients -->
        <div class="detail-ingredients">
          <div class="detail-ingredients-card">
            <div class="detail-ingredients-header">
              <div class="detail-ingredients-header-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <div class="detail-ingredients-header-text">
                <h3>재료</h3>
                <p>{recipe.servings}인분 기준</p>
              </div>
            </div>
            <div class="detail-ingredients-list">
              <ul>
                {#each recipe.ingredients as ingredient, i}
                  <li style="animation-delay: {i * 0.05}s">{ingredient}</li>
                {/each}
              </ul>
            </div>
            <div class="detail-ingredients-footer"></div>
          </div>
        </div>

        <!-- Steps -->
        <div class="detail-steps">
          <div class="detail-steps-header">
            <h2>조리 순서</h2>
            <p>차근차근 따라해 보세요</p>
          </div>

          <div class="detail-steps-list">
            {#each recipe.steps as step, i}
              <div class="detail-step" style="animation-delay: {0.4 + i * 0.1}s">
                <div class="detail-step-number-wrapper">
                  <div class="detail-step-number">{step.step}</div>
                  {#if i < recipe.steps.length - 1}
                    <div class="detail-step-line"></div>
                  {/if}
                </div>

                <div class="detail-step-content">
                  <div class="detail-step-card">
                    <h3 class="detail-step-title">{step.title}</h3>
                    <p class="detail-step-desc">{step.description}</p>

                    {#if step.tip}
                      <div class="detail-step-tip">
                        <div class="detail-step-tip-icon">
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                          </svg>
                        </div>
                        <div class="detail-step-tip-content">
                          <p>Tip</p>
                          <p>{step.tip}</p>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div class="detail-completion">
            <div class="detail-completion-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3>완성!</h3>
            <p>맛있게 드세요 🍽️</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="detail-footer">
      <button class="detail-footer-btn" on:click={() => closeRecipe()}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>다른 레시피 보기</span>
      </button>
    </div>
  </div>
</div>
{/if}
