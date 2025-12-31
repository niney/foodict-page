import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 3,
  name: '이타닉 가든',
  nameEn: 'Itanic Garden',
  chef: '손종원',
  chefNickname: null,
  spoonType: 'white',
  category: '코스요리',
  location: '서울 강남구 테헤란로 231 조선팰리스 36층',
  michelin: 1,
  placeId: '1464664976',
  nlpId: 674,
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
  description: '조선팰리스 호텔 36층의 프리미엄 한식 다이닝',
  signature: ['한정식 코스', '제철 요리'],
  priceRange: '$$$$',
  phone: '02-727-7610',
  awards: ['Taste of Seoul', '1스타 미쉐린가이드 서울 2025'],
  price: { lunch: '25만원', dinner: '37만원' },
  closedDays: '매주 월요일, 화요일',
  amenities: ['예약금 0원 결제', '노키즈존'],
  parking: { type: '실내 주차장', duration: '최대 4시간 30분', rate: '무료' },
  valet: { rate: '35,000원' },
  corkage: '주류 반입 불가 (클럽조선/웰니스클럽 회원 제외)',
  noKids: '미취학 아동 이용 불가',
  rooms: [
    { type: '4인룸', capacity: '3-4인', charge: '10만원' },
    { type: '8인룸', capacity: '5-8인', charge: '10만원' },
  ],
};

export default data;
