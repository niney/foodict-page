/**
 * 레스토랑 데이터 타입 정의
 */

/** 가격 정보 */
export interface Price {
  lunch?: string;
  dinner?: string;
  course?: string;
  menu?: string;
  range?: string;
}

/** 영업시간 */
export interface Hours {
  lunch?: string;
  dinner?: string;
  weekday?: string;
  weekend?: string;
  weekdayDinner?: string;
}

/** 주차 정보 */
export interface Parking {
  available?: boolean;
  type?: string;
  note?: string;
  [key: string]: boolean | string | undefined;
}

/** 발렛 정보 */
export interface Valet {
  available?: boolean;
  price?: string;
  note?: string;
  [key: string]: boolean | string | undefined;
}

/** 콜키지 정보 */
export interface Corkage {
  available?: boolean;
  price?: string;
  free?: boolean;
  note?: string;
  [key: string]: boolean | string | undefined;
}

/** 룸/개별실 정보 */
export interface Room {
  name?: string;
  capacity?: number | string;
  note?: string;
  [key: string]: string | number | undefined;
}

/** 좌석 정보 */
export interface Seating {
  total?: number;
  counter?: number;
  table?: number;
  private?: number;
  hall?: string;
  hall1?: string;
  hall2?: string;
  pdr?: string;
  rooms?: string;
}

/** 단체 정보 */
export interface Group {
  available?: boolean;
  minPeople?: number;
  maxPeople?: number;
  note?: string;
  [key: string]: boolean | number | string | undefined;
}

/** 바 정보 */
export interface Bar {
  available?: boolean;
  seats?: string;
  capacity?: string;
  note?: string;
}

/** 아이동반 정보 */
export interface KidsZone {
  allowed?: boolean;
  note?: string;
  [key: string]: boolean | string | undefined;
}

/** 레스토랑 데이터 */
export interface Restaurant {
  /** 고유 식별자 (필수) */
  id: number;

  // 기본 정보
  name?: string;
  nameEn?: string;
  searchName?: string;
  chef?: string | null;
  chefNickname?: string | null;
  spoonType?: 'white' | 'black' | string;
  category?: string;
  location?: string;
  michelin?: number;
  placeId?: string | null;
  nlpId?: number;
  image?: string;
  description?: string;
  signature?: string[];
  priceRange?: string;

  // 연락처 및 웹사이트
  phone?: string;
  website?: string;

  // 수상 이력
  awards?: string[];

  // 가격 정보
  price?: Price;

  // 영업 정보
  hours?: Hours | string;
  closedDays?: string;

  // 편의시설
  amenities?: string[];

  // 주차 및 발렛
  parking?: Parking | string;
  valet?: Valet;

  // 콜키지
  corkage?: Corkage | string;

  // 아이동반 관련 (중복 필드들 - 통합 권장)
  noKids?: boolean | string;
  kidsZone?: KidsZone | string;
  kidsNote?: string;

  // 룸/좌석 정보
  rooms?: Room[] | Room;
  roomNote?: string;
  seating?: Seating;
  maxCapacity?: number;

  // 단체/연회
  group?: Group | string;
  banquet?: string;

  // 바
  bar?: Bar;

  // 기타
  note?: string;
}

/** 레스토랑 목록 필터 함수 타입 */
export type RestaurantFilter = (restaurant: Restaurant) => boolean;

/** 스푼 타입 */
export type SpoonType = 'white' | 'black';
