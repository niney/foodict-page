export const chef = {
  id: 3,
  name: '최현석',
  nameEn: 'Choi Hyun-seok',
  title: '모던 한식 셰프',
  description: '한식의 현대적 재해석으로 세계에 한국 요리를 알리는 셰프',
  specialty: ['모던한식', '퓨전', '파인다이닝'],
  restaurant: '쵸이닷'
}

export const recipe = {
  id: 103,
  chefId: 3,
  name: '최현석 양념치킨',
  nameEn: "Choi's Korean Fried Chicken",
  description: '셰프의 비법 소스로 만드는 프리미엄 양념치킨. 바삭함과 감칠맛의 완벽한 조화!',
  cookTime: '45분',
  prepTime: '30분',
  servings: 3,
  difficulty: '보통',
  calories: 520,
  image: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&q=80',
  tags: ['최현석', '양념치킨', '치킨'],
  ingredients: ['닭 1마리', '고추장 3큰술', '케첩 1.5큰술', '올리고당 1.5큰술', '간장 1큰술', '마늘 5쪽', '튀김가루 1컵'],
  steps: [
    { step: 1, title: '소스 만들기', description: '고추장, 케첩, 올리고당을 2:1:1 비율로 섞습니다.' },
    { step: 2, title: '닭 손질', description: '닭을 한입 크기로 잘라 소금, 후추로 밑간합니다.' },
    { step: 3, title: '튀기기', description: '180도 기름에 닭을 두 번 튀겨 바삭하게 만듭니다.', tip: '두 번 튀김이 바삭함의 비밀!' },
    { step: 4, title: '소스 버무리기', description: '팬에 소스를 끓이고 튀긴 닭을 넣어 빠르게 버무립니다.' },
    { step: 5, title: '마무리', description: '견과류를 뿌리고 바로 서빙합니다.' }
  ],
  chefNote: '소스에 버무린 후 30초 안에 드셔야 바삭함이 살아요'
}
