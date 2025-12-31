import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 27,
  name: '뽀모',
  nameEn: 'Pomo',
  chef: '김성운',
  chefNickname: null,
  spoonType: 'white',
  category: '이탈리아음식',
  location: '서울특별시 강남구 선릉로 334 1층 102호',
  michelin: 0,
  placeId: null,
  image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600',
  description: '김성운 셰프의 캐주얼 이탈리안',
  signature: ['파스타', '피자'],
  priceRange: '$$',
  phone: '050-71466-4024',
  price: { range: '1-2만원' },
  hours: '11:00~22:00 (L.O 21:00), 일요일: 11:00~21:30 (L.O 20:30)',
  amenities: ['콜키지', '자동결제', '무선인터넷'],
  parking: '불가 (인근 도곡초 공영주차장 이용, 5분당 300원)',
  corkage: { wine: '2만원/병' },
  website: 'https://www.instagram.com/pomo_daechi/',
};

export default data;
