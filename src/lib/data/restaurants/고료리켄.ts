import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 17,
  name: '고료리 켄',
  nameEn: 'Goryori Ken',
  chef: '김건',
  chefNickname: null,
  spoonType: 'white',
  category: '코스요리',
  location: '서울 강남구 도산공원',
  michelin: 1,
  placeId: '255351939',
  nlpId: 705,
  image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600',
  description: '정통 일본 요리를 선보이는 파인다이닝',
  signature: ['오마카세', '카이세키'],
  priceRange: '$$$$',
  phone: '02-511-7809',
  awards: ['Taste of Seoul', '1스타 미쉐린가이드 서울 2025'],
  price: { dinner: '25만원' },
  hours: { dinner: '18:00~22:00 (L.O 20:00)' },
  closedDays: '매주 일요일, 월요일',
  amenities: ['콜키지', '예약금 0원 결제', '노키즈존', '무선인터넷'],
  valet: { rate: '5,000원 (선불)', location: '도산공원 정문 앞 오페라갤러리 골목' },
  corkage: { wine: '5만원/병 (750ml)', whiskey_magnum: '10만원/병' },
  noKids: '노키즈존 운영',
  website: 'https://www.instagram.com/ichieseoul',
};

export default data;
