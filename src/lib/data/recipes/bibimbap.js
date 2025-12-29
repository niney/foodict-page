export default {
  id: 3,
  name: '비빔밥',
  nameEn: 'Bibimbap',
  description: '오색 나물과 고소한 참기름, 매콤한 고추장이 어우러진 영양 만점 비빔밥',
  cookTime: '40분',
  prepTime: '20분',
  servings: 2,
  difficulty: '보통',
  calories: 520,
  image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80',
  tags: ['밥', '나물', '건강식'],
  ingredients: ['밥 2공기', '시금치 100g', '당근 1/2개', '콩나물 100g', '계란 2개', '고추장 2큰술', '참기름 2큰술', '소금 약간'],
  steps: [
    { step: 1, title: '나물 준비', description: '시금치는 데쳐서 소금, 참기름으로 무치고, 콩나물도 삶아 양념합니다.' },
    { step: 2, title: '당근 볶기', description: '당근은 채 썰어 소금 간을 하고 팬에 살짝 볶아줍니다.' },
    { step: 3, title: '계란 프라이', description: '팬에 기름을 두르고 계란 프라이를 반숙으로 만듭니다.', tip: '노른자를 터뜨리지 않게 조심하세요' },
    { step: 4, title: '비빔밥 세팅', description: '그릇에 따뜻한 밥을 담고 나물들을 색깔별로 예쁘게 올립니다.' },
    { step: 5, title: '마무리', description: '고추장과 참기름을 올리고 계란 프라이를 얹어 완성합니다.' }
  ]
}
