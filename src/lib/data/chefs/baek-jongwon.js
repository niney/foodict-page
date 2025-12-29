export const chef = {
  id: 1,
  name: '백종원',
  nameEn: 'Baek Jong-won',
  title: '요리연구가',
  description: '대중적이고 쉬운 레시피로 한국의 집밥 문화를 이끄는 요리 연구가',
  specialty: ['집밥', '분식', '중식'],
  restaurant: '더본코리아'
}

export const recipe = {
  id: 101,
  chefId: 1,
  name: '백종원 제육볶음',
  nameEn: "Baek's Spicy Pork Stir-fry",
  description: '집에서 쉽게 따라할 수 있는 백종원표 제육볶음. 황금비율 양념장으로 실패 없이 맛있게!',
  cookTime: '20분',
  prepTime: '10분',
  servings: 2,
  difficulty: '쉬움',
  calories: 420,
  image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
  tags: ['백종원', '제육볶음', '집밥'],
  ingredients: ['돼지 앞다리살 300g', '양파 1개', '대파 1대', '간장 3큰술', '설탕 1큰술', '고춧가루 2큰술', '다진마늘 1큰술', '후추 약간'],
  steps: [
    { step: 1, title: '양념장 황금비율', description: '간장 3, 설탕 1, 다진마늘 1 비율로 양념장을 만듭니다.', tip: '설탕은 꼭 볶아서 캐러멜화 시켜주세요' },
    { step: 2, title: '고기 볶기', description: '센 불에 돼지고기를 넣고 빠르게 볶아 육즙을 가둡니다.' },
    { step: 3, title: '양념 투하', description: '고기가 80% 익으면 양념장을 넣고 센 불에서 빠르게 볶습니다.' },
    { step: 4, title: '채소 추가', description: '양파, 대파를 넣고 아삭함이 살도록 30초만 볶습니다.' },
    { step: 5, title: '마무리', description: '후추와 참기름을 넣고 불을 끄면 완성!', tip: '밥 위에 올려 덮밥으로 즐겨보세요' }
  ],
  chefNote: '양념장 비율만 기억하면 누구나 성공할 수 있어요!'
}
