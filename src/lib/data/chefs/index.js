import * as baekJongwon from './baek-jongwon.js'
import * as leeYeonbok from './lee-yeonbok.js'
import * as choiHyunseok from './choi-hyunseok.js'
import * as limJiho from './lim-jiho.js'

export const chefs = [
  baekJongwon.chef,
  leeYeonbok.chef,
  choiHyunseok.chef,
  limJiho.chef
]

export const chefRecipes = [
  baekJongwon.recipe,
  leeYeonbok.recipe,
  choiHyunseok.recipe,
  limJiho.recipe
]

export function getChefById(id) {
  return chefs.find(chef => chef.id === id)
}

export function getChefRecipes(chefId) {
  return chefRecipes.filter(recipe => recipe.chefId === chefId)
}

export function getChefRecipeById(id) {
  return chefRecipes.find(recipe => recipe.id === id)
}

export { baekJongwon, leeYeonbok, choiHyunseok, limJiho }
