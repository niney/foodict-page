# Foodict - AI Coding Instructions

## Project Overview
Korean recipe website built with **Svelte 5 + Vite 6**, deployed to GitHub Pages. Content is in Korean (한국어).

## Architecture

### Data Layer (`src/lib/data/`)
- **Static JS modules** - No backend/API. Each entity exports a default object or named exports.
- **Recipes**: Individual files per recipe (e.g., `kimchi-jjigae.js`) with `index.js` aggregating + helper functions
- **Chefs**: Export both `chef` object and `recipe` object per file (chef's signature dish)
- **Restaurants**: Single `index.js` with arrays for `whiteSpoonRestaurants` and `blackSpoonRestaurants`

### State Management (`src/lib/stores/app.js`)
- Uses Svelte's `writable` and `derived` stores
- **Custom hash-based routing** via `initRouter()` - NOT a library router
- Navigation functions: `openRecipe(id)`, `closeRecipe()`, `openRestaurant(id)`, `navigateTo(section)`
- `BASE_URL` from `import.meta.env.BASE_URL` handles GitHub Pages subpath (`/foodict-page/`)

### Component Patterns (`src/lib/components/`)
- **Card + Detail pairs**: `RecipeCard.svelte` → `RecipeDetail.svelte`, `RestaurantCard.svelte` → `RestaurantDetail.svelte`
- **Section components**: `TodaySection`, `ChefSection`, `RestaurantSection` compose the homepage
- Props use `export let` (Svelte 4 syntax compatible with Svelte 5)
- Click handlers call store functions directly: `on:click={() => openRecipe(recipe.id)}`

## Key Conventions

### Data Object Schema
```javascript
// Recipe required fields
{ id, name, nameEn, description, cookTime, prepTime, servings, 
  difficulty, calories, image, tags[], ingredients[], steps[] }

// Step object
{ step: number, title: string, description: string, tip?: string }

// Chef recipe adds: chefId, chefNote
```

### Difficulty Levels
Use Korean values: `'쉬움'` (easy), `'보통'` (medium), `'어려움'` (hard)
Helper: `getDifficultyClass(difficulty)` returns CSS class names

### Styling
- **Single global CSS file**: `src/app.css` (~3000 lines) - no CSS modules or scoped styles
- **CSS Variables**: Colors use `--stone-*`, `--amber-*`, `--emerald-*` palette
- **Fonts**: `--font-serif` (Nanum Myeongjo), `--font-sans` (Noto Sans KR)
- BEM-like naming: `.recipe-card`, `.recipe-card-image`, `.recipe-card-title`

## Development Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build
```

## Adding New Content

### New Recipe
1. Create `src/lib/data/recipes/{recipe-name}.js` with default export
2. Import and add to `recipes` array in `src/lib/data/recipes/index.js`
3. Use unique numeric `id` (check existing IDs: 1-10 for recipes, 101+ for chef recipes)

### New Chef + Signature Recipe
1. Create `src/lib/data/chefs/{chef-name}.js` exporting `chef` and `recipe`
2. Import in `src/lib/data/chefs/index.js`, add to `chefs` and `chefRecipes` arrays

## GitHub Pages Deployment
- Base path configured in `vite.config.js`: `base: '/foodict-page/'`
- `public/404.html` handles SPA routing on GitHub Pages
- All asset URLs must work with the subpath
