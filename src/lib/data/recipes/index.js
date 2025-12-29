import kimchiJjigae from './kimchi-jjigae.js'
import bulgogi from './bulgogi.js'
import bibimbap from './bibimbap.js'
import tteokbokki from './tteokbokki.js'
import samgyeopsal from './samgyeopsal.js'
import japchae from './japchae.js'
import sundubuJjigae from './sundubu-jjigae.js'
import galbijjim from './galbijjim.js'
import doenjangJjigae from './doenjang-jjigae.js'
import dakgalbi from './dakgalbi.js'

export const recipes = [
  kimchiJjigae,
  bulgogi,
  bibimbap,
  tteokbokki,
  samgyeopsal,
  japchae,
  sundubuJjigae,
  galbijjim,
  doenjangJjigae,
  dakgalbi
]

export function getRandomRecipes(count = 10) {
  const shuffled = [...recipes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, recipes.length))
}

export function getRecipeById(id) {
  return recipes.find(recipe => recipe.id === id)
}

export {
  kimchiJjigae,
  bulgogi,
  bibimbap,
  tteokbokki,
  samgyeopsal,
  japchae,
  sundubuJjigae,
  galbijjim,
  doenjangJjigae,
  dakgalbi
}
