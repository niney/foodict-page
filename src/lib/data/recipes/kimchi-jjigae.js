export default {
  id: 1,
  name: '김치찌개',
  nameEn: 'Kimchi Jjigae',
  description: '잘 익은 김치와 돼지고기가 어우러진 얼큰하고 깊은 맛의 찌개',
  cookTime: '30분',
  prepTime: '15분',
  servings: 2,
  difficulty: '쉬움',
  calories: 280,
  image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
  tags: ['찌개', '매운맛', '돼지고기'],
  ingredients: ['김치 300g', '돼지고기 앞다리살 200g', '두부 1/2모', '대파 1대', '고춧가루 1큰술', '다진마늘 1큰술', '참기름 1큰술', '물 3컵'],
  steps: [
    { step: 1, title: '재료 손질', description: '김치는 적당한 크기로 썰고, 돼지고기는 한입 크기로 썰어주세요. 두부는 2cm 두께로 깍둑썰기 합니다.' },
    { step: 2, title: '고기 볶기', description: '냄비에 참기름을 두르고 돼지고기를 중불에서 볶아 겉면이 익을 때까지 조리합니다.', tip: '고기를 먼저 볶으면 잡내가 줄어들어요' },
    { step: 3, title: '김치 볶기', description: '고기가 어느 정도 익으면 김치와 고춧가루를 넣고 함께 볶아줍니다.' },
    { step: 4, title: '끓이기', description: '물을 붓고 센 불로 끓여주세요. 끓어오르면 중불로 줄이고 15분간 끓입니다.' },
    { step: 5, title: '마무리', description: '두부와 대파, 다진마늘을 넣고 5분 더 끓여 완성합니다.', tip: '기호에 따라 청양고추를 추가하면 더 얼큰해요' }
  ]
}
