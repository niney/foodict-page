import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 28,
  name: '크라운돼지 제주점',
  nameEn: 'Crown Pork Jeju',
  chef: '송훈',
  chefNickname: null,
  spoonType: 'white',
  category: '육류/고기요리',
  location: '제주특별자치도 제주시 애월읍 상가목장길 84',
  michelin: 0,
  placeId: null,
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  description: '송훈 셰프의 제주 흑돼지 전문점 제주점',
  signature: ['흑돼지 구이', '숙성 삼겹살'],
  priceRange: '$$$',
  phone: '064-805-5091',
  price: { range: '1-4만원' },
  hours: '11:00~21:00 (L.O 20:00)',
  amenities: ['주차', '단체', '무선인터넷'],
  parking: { type: '야외 주차장', rate: '무료' },
  website: 'https://www.instagram.com/song_hoon_park',
};

export default data;
