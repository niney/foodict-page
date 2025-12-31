import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 5,
  name: '테이블 포포',
  nameEn: 'Table for Four',
  chef: '김성윤',
  chefNickname: null,
  spoonType: 'white',
  category: '코스요리',
  location: '서울 용산구 한남동',
  michelin: 1,
  placeId: '20561198',
  nlpId: 695,
  image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600',
  description: '섬세한 플레이팅의 컨템퍼러리 다이닝',
  signature: ['시즌 코스'],
  priceRange: '$$$$',
  awards: ['Taste of Seoul', '미쉐린 가이드 2025'],
  price: { lunch: '15만원', dinner: '25만원' },
};

export default data;
