<script>
  import { onMount } from 'svelte'
  import Nav from './lib/components/Nav.svelte'
  import Hero from './lib/components/Hero.svelte'
  import TodaySection from './lib/components/TodaySection.svelte'
  import ChefSection from './lib/components/ChefSection.svelte'
  import Footer from './lib/components/Footer.svelte'
  import RecipeDetail from './lib/components/RecipeDetail.svelte'
  import { currentPage, selectedRecipe, initRouter } from './lib/stores/app.js'

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
    <Footer />
  </main>
{/if}

{#if $currentPage === 'recipe' && $selectedRecipe}
  <RecipeDetail recipe={$selectedRecipe} />
{/if}
