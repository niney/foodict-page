export const chef = {
  id: 4,
  name: '임지호',
  nameEn: 'Lim Ji-ho',
  title: '한식 명인',
  description: '전통 한식의 깊은 맛을 지키며 정성을 담아 요리하는 한식 명인',
  specialty: ['전통한식', '궁중요리', '발효음식']
}

export const recipe = {
  id: 104,
  chefId: 4,
  name: '임지호 잔치국수',
  nameEn: "Lim's Traditional Banquet Noodles",
  description: '정성껏 우려낸 육수로 만드는 전통 잔치국수. 깊고 깔끔한 국물 맛이 일품!',
  cookTime: '30분',
  prepTime: '8시간',
  servings: 4,
  difficulty: '어려움',
  calories: 380,
  image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
  tags: ['임지호', '잔치국수', '전통한식'],
  ingredients: ['소면 400g', '양지 300g', '소뼈 500g', '무 1/4개', '대파 2대', '계란 2개', '김 약간', '간장 적당량'],
  steps: [
    { step: 1, title: '육수 준비', description: '소뼈를 8시간 이상 푹 고아 깊은 육수를 만듭니다.' },
    { step: 2, title: '양지 삶기', description: '육수에 양지를 넣고 2시간 삶아 부드럽게 익힙니다.' },
    { step: 3, title: '면 준비', description: '소면을 삶아 찬물에 헹궈 준비합니다.' },
    { step: 4, title: '고명 준비', description: '양지는 얇게 썰고, 계란지단, 김가루를 준비합니다.' },
    { step: 5, title: '담아내기', description: '면 위에 뜨거운 육수를 붓고 고명을 올립니다.', tip: '육수가 식으면 간장으로 간을 맞추세요' }
  ],
  chefNote: '육수에 정성을 들이면 면발이 달라집니다'
}
