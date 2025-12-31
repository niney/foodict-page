import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 21,
  name: '에그앤플라워 해방촌 본점',
  nameEn: 'Egg & Flower',
  chef: '김희은',
  chefNickname: null,
  spoonType: 'white',
  category: '파스타',
  location: '서울특별시 용산구 용산동2가',
  michelin: 0,
  placeId: null,
  image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600',
  description: '김희은 셰프의 캐주얼 파스타 레스토랑',
  signature: ['파스타', '브런치'],
  priceRange: '$$',
  phone: '02-3789-7681',
  awards: ['빕구르망 미쉐린가이드 서울 2025'],
  price: { range: '2-3만원' },
  hours: { lunch: '12:00~15:00', dinner: '17:30~22:00 (L.O 21:00)' },
  amenities: ['콜키지', '예약금 0원 결제', '무선인터넷'],
  valet: { rate: '5,000원' },
  corkage: { wine: '5만원/병', max: '1병' },
  rooms: { capacity: '4-5인', charge: '무료' },
};

export default data;
