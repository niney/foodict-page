export default {
  id: 2,
  name: '불고기',
  nameEn: 'Bulgogi',
  description: '달콤한 간장 양념에 재운 소고기를 불에 구워낸 대표 한식',
  cookTime: '45분',
  prepTime: '30분',
  servings: 3,
  difficulty: '보통',
  calories: 350,
  image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80',
  tags: ['구이', '소고기', '달콤한맛'],
  ingredients: ['소고기 불고기용 400g', '간장 4큰술', '배 1/4개', '양파 1개', '참기름 2큰술', '후추 약간', '설탕 2큰술', '다진마늘 1큰술'],
  steps: [
    { step: 1, title: '양념장 만들기', description: '배를 갈아서 간장, 설탕, 참기름, 다진마늘, 후추와 섞어 양념장을 만듭니다.', tip: '배 대신 키위나 사과를 사용해도 좋아요' },
    { step: 2, title: '고기 재우기', description: '소고기에 양념장을 골고루 버무려 최소 30분간 재워둡니다.' },
    { step: 3, title: '채소 준비', description: '양파는 채 썰어 준비합니다. 기호에 따라 버섯, 당근을 추가해도 좋습니다.' },
    { step: 4, title: '볶기', description: '달군 팬에 재운 고기와 양파를 함께 볶아 고기가 완전히 익을 때까지 조리합니다.' },
    { step: 5, title: '마무리', description: '접시에 담고 참깨를 뿌려 완성합니다.' }
  ]
}
