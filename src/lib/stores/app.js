import { writable, derived } from 'svelte/store'
import { getRandomRecipes, getRecipeById } from '../data/recipes/index.js'
import { getChefRecipeById } from '../data/chefs/index.js'

// 현재 페이지 상태
export const currentPage = writable('home') // 'home' | 'recipe'
export const selectedRecipeId = writable(null)

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

// 레시피 열기
export function openRecipe(id, pushHistory = true) {
  const recipe = getRecipeById(id) || getChefRecipeById(id)
  if (!recipe) return

  selectedRecipeId.set(id)
  currentPage.set('recipe')
  document.body.style.overflow = 'hidden'

  if (pushHistory) {
    const state = { page: 'recipe', id }
    history.pushState(state, '', `/recipe/${id}`)
  }
}

// 레시피 닫기
export function closeRecipe(pushHistory = true) {
  selectedRecipeId.set(null)
  currentPage.set('home')
  document.body.style.overflow = ''

  if (pushHistory) {
    const state = { page: 'home', id: null }
    history.pushState(state, '', '/')
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (section === 'today') {
    document.getElementById('todaySection')?.scrollIntoView({ behavior: 'smooth' })
  } else if (section === 'chef') {
    document.getElementById('chefSection')?.scrollIntoView({ behavior: 'smooth' })
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
  // 현재 URL 파싱
  const path = window.location.pathname
  const match = path.match(/\/recipe\/(\d+)/)

  if (match) {
    const id = parseInt(match[1])
    openRecipe(id, false)
  }

  // popstate 이벤트 등록
  window.addEventListener('popstate', (e) => {
    const state = e.state || { page: 'home', id: null }
    if (state.page === 'recipe' && state.id) {
      openRecipe(state.id, false)
    } else {
      closeRecipe(false)
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
        }
      })()
    }
  })
}
