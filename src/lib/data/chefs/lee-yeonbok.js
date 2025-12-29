export const chef = {
  id: 2,
  name: '이연복',
  nameEn: 'Lee Yeon-bok',
  title: '중식 마스터 셰프',
  description: '40년 경력의 중식 대가, 정통 중화요리의 대중화를 이끈 셰프',
  specialty: ['중식', '짜장면', '탕수육'],
  restaurant: '목란'
}

export const recipe = {
  id: 102,
  chefId: 2,
  name: '이연복 짜장면',
  nameEn: "Lee's Authentic Jajangmyeon",
  description: '40년 중식 노하우가 담긴 정통 짜장면. 춘장을 제대로 볶는 것이 핵심!',
  cookTime: '40분',
  prepTime: '20분',
  servings: 2,
  difficulty: '보통',
  calories: 680,
  image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
  tags: ['이연복', '짜장면', '중식'],
  ingredients: ['중화면 200g', '춘장 4큰술', '돼지고기 150g', '양파 2개', '감자 1개', '애호박 1/2개', '식용유 3큰술'],
  steps: [
    { step: 1, title: '춘장 볶기', description: '기름에 춘장을 약불에서 20분간 볶아 쓴맛을 날립니다.', tip: '인내심이 맛의 비결입니다' },
    { step: 2, title: '고기 양파 볶기', description: '돼지고기와 양파를 큼직하게 썰어 센 불에 볶습니다.' },
    { step: 3, title: '춘장 합체', description: '볶은 춘장을 넣고 물을 부어 농도를 맞춥니다.' },
    { step: 4, title: '면 삶기', description: '면을 넉넉한 물에 탱글하게 삶아 찬물에 헹굽니다.' },
    { step: 5, title: '완성', description: '면 위에 소스를 올리고 오이채를 곁들입니다.' }
  ],
  chefNote: '춘장은 무조건 오래 볶아야 깊은 맛이 나요'
}
