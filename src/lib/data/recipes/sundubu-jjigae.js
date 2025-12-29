export default {
  id: 7,
  name: '순두부찌개',
  nameEn: 'Sundubu Jjigae',
  description: '부드러운 순두부와 해산물이 어우러진 얼큰한 찌개',
  cookTime: '25분',
  prepTime: '10분',
  servings: 2,
  difficulty: '쉬움',
  calories: 220,
  image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&q=80',
  tags: ['찌개', '두부', '해산물'],
  ingredients: ['순두부 1봉', '바지락 100g', '새우 5마리', '계란 1개', '고춧가루 1큰술', '대파 1/2대', '다진마늘 1큰술', '참기름 1큰술'],
  steps: [
    { step: 1, title: '해산물 준비', description: '바지락은 해감하고, 새우는 손질해둡니다.' },
    { step: 2, title: '양념 볶기', description: '뚝배기에 참기름을 두르고 고춧가루, 다진마늘을 볶아 향을 냅니다.' },
    { step: 3, title: '끓이기', description: '물을 붓고 바지락, 새우를 넣어 끓입니다.' },
    { step: 4, title: '순두부 넣기', description: '국물이 끓으면 순두부를 숟가락으로 떠서 넣고 끓입니다.', tip: '순두부는 너무 많이 저으면 부서져요' },
    { step: 5, title: '마무리', description: '계란을 깨트려 넣고 대파를 올려 완성합니다.' }
  ]
}
