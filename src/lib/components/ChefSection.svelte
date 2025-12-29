<script>
  import { chefs, chefRecipes } from '../data/chefs/index.js'
  import ChefBadge from './ChefBadge.svelte'
  import ChefRecipeCard from './ChefRecipeCard.svelte'
</script>

<section class="section section-chef" id="chefSection">
  <div class="container">
    <div class="section-header">
      <div class="section-badge section-badge-amber">
        <span>👨‍🍳</span>
        <span>Chef's Special</span>
      </div>
      <h2 class="section-title">유명 셰프 레시피</h2>
      <p class="section-desc">
        대한민국을 대표하는 셰프들의 시그니처 레시피를 만나보세요.<br>
        전문가의 노하우가 담긴 특별한 요리를 집에서 즐겨보세요.
      </p>
    </div>

    <div class="chef-badges">
      {#each chefs as chef, index}
        <ChefBadge {chef} {index} />
      {/each}
    </div>

    <div class="chef-recipe-grid">
      {#each chefRecipes as recipe, index}
        <ChefRecipeCard {recipe} {index} />
      {/each}
    </div>
  </div>
</section>
