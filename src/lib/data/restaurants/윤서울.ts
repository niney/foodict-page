import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 15,
  name: '윤서울',
  nameEn: 'Yun Seoul',
  chef: '김도윤',
  chefNickname: null,
  spoonType: 'white',
  category: '한식',
  location: '서울특별시 강남구 선릉로 805 W빌딩 1층',
  michelin: 1,
  placeId: '1698341503',
  nlpId: 703,
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  description: '한식의 정수를 담은 모던 한식 파인다이닝',
  signature: ['한정식 코스'],
  priceRange: '$$$$',
  phone: '02-336-3323',
  awards: ['Taste of Seoul', '1스타 미쉐린가이드 서울 2025'],
  price: { lunch: '12만원', dinner: '24만원' },
  closedDays: '매주 일요일, 월요일 / 화수 런치 휴무',
  amenities: ['콜키지', '노키즈존'],
  valet: { rate: '5,000원', duration: '2시간, 이후 30분당 2,000원' },
  corkage: { wine: '10만원/테이블', max: '1병' },
  noKids: '초등학생(13세 이하) 이용 불가',
  bar: { capacity: '1-5인', seats: '2개 운영' },
};

export default data;
