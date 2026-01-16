import { writable, derived } from 'svelte/store'
import { getRandomRecipes, getRecipeById } from '../data/recipes/index.js'
import { getChefRecipeById } from '../data/chefs/index.js'
import { getRestaurantById } from '../data/restaurants/index.js'

// 현재 페이지 상태
export const currentPage = writable('home') // 'home' | 'recipe' | 'restaurant' | 'restaurants'
export const selectedRecipeId = writable(null)
export const selectedRestaurantId = writable(null)

// 레시피 목록
export const recipes = writable(getRandomRecipes(10))
export const isLoading = writable(false)

// 네비게이션 상태
export const activeSection = writable('home')
export const isNavScrolled = writable(false)
export const isMobileMenuOpen = writable(false)

// 선택된 레시피 (derived store)
export const selectedRecipe = derived(
  selectedRecipeId,
  ($id) => {
    if (!$id) return null
    return getRecipeById($id) || getChefRecipeById($id)
  }
)

// 선택된 식당 (derived store)
export const selectedRestaurant = derived(
  selectedRestaurantId,
  ($id) => {
    if (!$id) return null
    return getRestaurantById($id)
  }
)

// Base URL (Vite에서 설정한 base 경로)
const BASE_URL = import.meta.env.BASE_URL

// 레시피 열기
export function openRecipe(id, pushHistory = true) {
  const recipe = getRecipeById(id) || getChefRecipeById(id)
  if (!recipe) return

  if (pushHistory) {
    // 현재 상태에 스크롤 위치 저장
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, null)
    const state = { page: 'recipe', id }
    history.pushState(state, null, `${BASE_URL}recipe/${id}`)
  }

  selectedRecipeId.set(id)
  currentPage.set('recipe')
  document.body.style.overflow = 'hidden'
}

// 레시피 닫기
export function closeRecipe(pushHistory = true) {
  selectedRecipeId.set(null)
  currentPage.set('home')
  document.body.style.overflow = ''

  if (pushHistory) {
    const state = { page: 'home', id: null }
    history.pushState(state, '', BASE_URL)
  }
}

// 식당 열기
export function openRestaurant(id, pushHistory = true) {
  const restaurant = getRestaurantById(id)
  if (!restaurant) return

  if (pushHistory) {
    // 현재 상태에 스크롤 위치 저장
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, null)
    const state = { page: 'restaurant', id }
    history.pushState(state, null, `${BASE_URL}restaurant/${id}`)
  }

  selectedRestaurantId.set(id)
  currentPage.set('restaurant')
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// 식당 닫기
export function closeRestaurant(pushHistory = true) {
  selectedRestaurantId.set(null)
  currentPage.set('home')

  if (pushHistory) {
    const state = { page: 'home', id: null }
    history.pushState(state, '', BASE_URL)
  }
}

// 레시피 셔플
export function shuffleRecipes() {
  isLoading.set(true)

  setTimeout(() => {
    recipes.set(getRandomRecipes(10))
    isLoading.set(false)
  }, 300)
}

// 섹션 이동
export function navigateTo(section) {
  activeSection.set(section)
  isMobileMenuOpen.set(false)

  if (section === 'home') {
    currentPage.set('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.pushState({ page: 'home' }, '', BASE_URL)
  } else if (section === 'today') {
    document.getElementById('todaySection')?.scrollIntoView({ behavior: 'smooth' })
  } else if (section === 'chef') {
    document.getElementById('chefSection')?.scrollIntoView({ behavior: 'smooth' })
  } else if (section === 'restaurant') {
    document.getElementById('restaurantSection')?.scrollIntoView({ behavior: 'smooth' })
  } else if (section === 'restaurants') {
    // 현재 상태에 스크롤 위치 저장
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, null)
    currentPage.set('restaurants')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.pushState({ page: 'restaurants' }, null, `${BASE_URL}restaurants`)
  }
}

// 모바일 메뉴 토글
export function toggleMobileMenu() {
  isMobileMenuOpen.update(v => !v)
}

// 난이도 클래스
export function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case '쉬움': return 'difficulty-easy'
    case '보통': return 'difficulty-medium'
    case '어려움': return 'difficulty-hard'
    default: return 'difficulty-medium'
  }
}

// 라우터 초기화
export function initRouter() {
  // 현재 URL 파싱 (base path 제거)
  const fullPath = window.location.pathname
  const path = fullPath.replace(BASE_URL.slice(0, -1), '') || '/'

  const recipeMatch = path.match(/\/recipe\/(\d+)/)
  const restaurantMatch = path.match(/\/restaurant\/(\d+)/)

  if (recipeMatch) {
    const id = parseInt(recipeMatch[1])
    openRecipe(id, false)
  } else if (restaurantMatch) {
    const id = parseInt(restaurantMatch[1])
    openRestaurant(id, false)
  } else if (path === '/restaurants') {
    currentPage.set('restaurants')
  }

  // popstate 이벤트 등록
  window.addEventListener('popstate', (e) => {
    const state = e.state || { page: 'home', id: null }
    if (state.page === 'recipe' && state.id) {
      openRecipe(state.id, false)
    } else if (state.page === 'restaurant' && state.id) {
      openRestaurant(state.id, false)
    } else if (state.page === 'restaurants') {
      currentPage.set('restaurants')
      document.body.style.overflow = ''
    } else {
      closeRecipe(false)
      closeRestaurant(false)
      currentPage.set('home')
    }

    // 스크롤 위치 복원
    if (state.scrollY !== undefined) {
      requestAnimationFrame(() => window.scrollTo(0, state.scrollY))
    }
  })

  // 스크롤 이벤트
  window.addEventListener('scroll', () => {
    isNavScrolled.set(window.scrollY > 50)
  })

  // ESC 키 이벤트
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      currentPage.subscribe(page => {
        if (page === 'recipe') {
          closeRecipe()
        } else if (page === 'restaurant') {
          closeRestaurant()
        }
      })()
    }
  })
}
