import type { Restaurant } from '../../types/restaurant';

const data: Restaurant = {
  id: 12,
  name: '소울',
  nameEn: 'Soul',
  chef: '김희은',
  chefNickname: null,
  spoonType: 'white',
  category: '컨템퍼러리',
  location: '서울특별시 용산구 신흥로26길 35, 지하1층',
  michelin: 1,
  placeId: '1498888781',
  nlpId: 701,
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
  description: '한국의 맛을 현대적으로 재해석한 파인다이닝',
  signature: ['시그니처 코스', '페어링 와인'],
  priceRange: '$$$$',
  phone: '02-318-7685',
  awards: ['1스타 미쉐린가이드 서울 2025'],
  price: { lunch: '17만원', dinner: '27만원' },
  hours: { lunch: '12:00~15:00 (L.O 13:00)', dinner: '18:00~22:00 (L.O 19:30)' },
  closedDays: '화수 정기 휴무',
  amenities: ['발렛', '콜키지', '레터링', '대관', '노키즈존', '전문 소믈리에', '무선인터넷'],
  valet: { rate: '10,000원' },
  corkage: { wine: '10만원/병', max: '1병' },
};

export default data;
