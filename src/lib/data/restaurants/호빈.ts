import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 4,
  name: '호빈',
  nameEn: 'Hobin',
  chef: '후덕죽',
  chefNickname: null,
  spoonType: 'white',
  category: '중식',
  location: '서울 중구 동호로 287 앰배서더 풀만 1층',
  michelin: 1,
  placeId: '1755459807',
  nlpId: 694,
  image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
  description: '한국 호텔 중식의 대부가 이끄는 프리미엄 중식당',
  signature: ['딤섬', '북경오리'],
  priceRange: '$$$',
  phone: '02-2270-3141',
  awards: ['1스타 미쉐린가이드 서울 2025'],
  price: { range: '9-30만원' },
  hours: { lunch: '11:30~14:30', dinner: '18:00~22:00 (L.O 21:00)' },
  amenities: ['콜키지', '장애인 편의시설', '무선인터넷'],
  parking: { type: '야외 주차장', duration: '최대 3시간', rate: '무료' },
  valet: { rate: '25,000원' },
  corkage: { wine: '7만원/병', whiskey: '15만원/병', sake: '15만원/병', traditional: '15만원/병', max: '1병씩' },
  group: '최소 8명 ~ 최대 30명',
  seating: { hall: '50석', pdr: '5룸 32석' },
};

export default data;
