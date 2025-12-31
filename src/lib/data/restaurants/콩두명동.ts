import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 25,
  name: '콩두 명동',
  nameEn: 'Kongdu Myeongdong',
  chef: '박효남',
  chefNickname: null,
  spoonType: 'white',
  category: '한식',
  location: '서울 중구 명동7길 13 호텔28 6층',
  michelin: 0,
  placeId: null,
  image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600',
  description: '박효남 셰프의 프리미엄 한식 레스토랑',
  signature: ['한정식', '두부요리'],
  priceRange: '$$$$',
  phone: '02-722-7002',
  awards: ['라스트 찬스', '흑백요리사2'],
  price: { lunch: '4-12만원', dinner: '7-13만원' },
  hours: { lunch: '07:00~15:00 (L.O 13:30)', dinner: '18:00~21:30 (L.O 20:00)' },
  closedDays: '연중무휴',
  amenities: ['콜키지', '레터링', '자동결제', '예약금 0원 결제', '단체', '대관', '전문 소믈리에', '무선인터넷'],
  parking: '불가 (인근 유료주차장 이용)',
  corkage: { wine: '5만원/병', note: '와인만 가능' },
  rooms: [
    { type: 'A룸', capacity: '4-6인', charge: '무료' },
    { type: 'B룸', capacity: '6-8인', charge: '무료' },
    { type: 'C룸', capacity: '12-16인', charge: '무료' },
  ],
  roomNote: '타입별 최소 인원 미달시 1인 15,000원 Room Charge 발생',
  banquet: '별도 유선 상담 (최대 100인 가능)',
};

export default data;
