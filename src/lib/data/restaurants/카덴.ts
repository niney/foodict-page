import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 6,
  name: '카덴',
  nameEn: 'Kaden',
  chef: '정호영',
  chefNickname: null,
  spoonType: 'white',
  category: '이자카야',
  location: '서울특별시 서대문구 연희로 173 거화빌딩',
  michelin: 0,
  placeId: '218413355',
  nlpId: 696,
  image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600',
  description: '프리미엄 이자카야 스타일의 일식당',
  signature: ['사시미', '야키토리'],
  priceRange: '$$$',
  phone: '02-3142-6362',
  price: { range: '2-4만원' },
  hours: '11:30~22:00',
  closedDays: '일요일 휴무',
  amenities: ['단체', '홀'],
  parking: '주차, 발렛파킹',
  website: 'https://www.caden.co.kr/',
};

export default data;
