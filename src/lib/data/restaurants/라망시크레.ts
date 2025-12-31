import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 2,
  name: '라망시크레',
  nameEn: 'L\'Amant Secret',
  chef: '손종원',
  chefNickname: null,
  spoonType: 'white',
  category: '컨템퍼러리',
  location: '서울 중구 퇴계로 67 레스케이프호텔 26층',
  michelin: 1,
  placeId: '1282957326',
  nlpId: 693,
  image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600',
  description: '손종원 셰프의 프렌치 파인다이닝',
  signature: ['프렌치 코스'],
  priceRange: '$$$$',
  phone: '02-317-4003',
  awards: ['1스타 미쉐린가이드 서울 2025'],
  price: { lunch: '17만원', dinner: '27만원' },
  hours: { lunch: '12:00~15:00', dinner: '18:00~22:00' },
  closedDays: '매주 일요일, 월요일',
  amenities: ['콜키지', '예약금 0원 결제', '노키즈존', '전문 소믈리에'],
  parking: { type: '실내 주차장', rate: '무료', duration: '점심 3시간 / 저녁 4시간' },
  valet: { rate: '25,000원', duration: '3시간 기준' },
  corkage: { wine: '10만원/병', max: '1-2병' },
  noKids: '미취학 아동 이용 불가',
  rooms: [
    { type: '1-2인룸', capacity: '2인', charge: '10만원' },
    { type: '3-6인룸', capacity: '3-6인', charge: '20만원' },
  ],
};

export default data;
