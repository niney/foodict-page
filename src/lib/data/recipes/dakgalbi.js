export default {
  id: 10,
  name: '닭갈비',
  nameEn: 'Dakgalbi',
  description: '매콤한 양념에 버무린 닭고기와 채소를 철판에 볶아낸 춘천 명물',
  cookTime: '35분',
  prepTime: '20분',
  servings: 3,
  difficulty: '보통',
  calories: 340,
  image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&q=80',
  tags: ['볶음', '닭고기', '매운맛'],
  ingredients: ['닭다리살 500g', '양배추 1/4통', '고구마 1개', '떡 100g', '고추장 3큰술', '고춧가루 2큰술', '모짜렐라 치즈 100g', '간장 2큰술'],
  steps: [
    { step: 1, title: '양념장 만들기', description: '고추장, 고춧가루, 간장, 설탕, 다진마늘을 섞어 양념장을 만듭니다.' },
    { step: 2, title: '닭고기 재우기', description: '닭다리살을 한입 크기로 썰어 양념장에 30분간 재웁니다.' },
    { step: 3, title: '채소 준비', description: '양배추는 큼직하게 썰고, 고구마는 얇게 슬라이스합니다.' },
    { step: 4, title: '볶기', description: '팬에 고구마를 먼저 깔고 양념한 닭고기와 채소를 올려 볶습니다.', tip: '중간중간 물을 조금씩 넣어주면 타지 않아요' },
    { step: 5, title: '마무리', description: '닭고기가 익으면 떡과 치즈를 올려 치즈가 녹을 때까지 조리합니다.' }
  ]
}
