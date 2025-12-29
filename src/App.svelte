<script>
  import { onMount } from 'svelte'
  import Nav from './lib/components/Nav.svelte'
  import Hero from './lib/components/Hero.svelte'
  import TodaySection from './lib/components/TodaySection.svelte'
  import ChefSection from './lib/components/ChefSection.svelte'
  import RestaurantSection from './lib/components/RestaurantSection.svelte'
  import RestaurantListPage from './lib/components/RestaurantListPage.svelte'
  import Footer from './lib/components/Footer.svelte'
  import RecipeDetail from './lib/components/RecipeDetail.svelte'
  import RestaurantDetail from './lib/components/RestaurantDetail.svelte'
  import { currentPage, selectedRecipe, selectedRestaurant, initRouter } from './lib/stores/app.js'

  onMount(() => {
    initRouter()
  })
</script>

<Nav />

{#if $currentPage === 'home'}
  <main>
    <Hero />
    <TodaySection />
    <ChefSection />
    <RestaurantSection />
    <Footer />
  </main>
{/if}

{#if $currentPage === 'restaurants'}
  <RestaurantListPage />
{/if}

{#if $currentPage === 'recipe' && $selectedRecipe}
  <RecipeDetail recipe={$selectedRecipe} />
{/if}

{#if $currentPage === 'restaurant' && $selectedRestaurant}
  <RestaurantDetail restaurant={$selectedRestaurant} />
{/if}
