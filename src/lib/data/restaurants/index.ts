import type { Restaurant } from '../../types/restaurant'

// 백수저 셰프 식당
import 스와니예 from './스와니예.js'
import 라망시크레 from './라망시크레.js'
import 이타닉가든 from './이타닉가든.js'
import 호빈 from './호빈.js'
import 테이블포포 from './테이블포포.js'
import 카덴 from './카덴.js'
import 코자차 from './코자차.js'
import 임성근국가공인진갈비 from './임성근국가공인진갈비.js'
import 오스테리아샘킴 from './오스테리아샘킴.js'
import 뜨라또리아샘킴 from './뜨라또리아샘킴.js'
import 천상현의천상 from './천상현의천상.js'
import 소울 from './소울.js'
import 일삼육길육미 from './136길육미.js'
import 크라운돼지신사본점 from './크라운돼지신사본점.js'
import 윤서울 from './윤서울.js'
import 면서울 from './면서울.js'
import 고료리켄 from './고료리켄.js'
import 이치에 from './이치에.js'
import 회현식당 from './회현식당.js'
import 봉래헌 from './봉래헌.js'
import 에그앤플라워해방촌본점 from './에그앤플라워해방촌본점.js'
import 도우룸 from './도우룸.js'
import 회현카페 from './회현카페.js'
import 루드베키아 from './루드베키아.js'
import 콩두명동 from './콩두명동.js'
import 도우룸광화문 from './도우룸광화문.js'
import 뽀모 from './뽀모.js'
import 크라운돼지제주점 from './크라운돼지제주점.js'

// 흑수저 셰프 식당
import 세누프라이빗키친 from './세누프라이빗키친.js'
import 드레스덴그린 from './드레스덴그린.js'
import 소바쥬 from './소바쥬.js'
import 모노로그 from './모노로그.js'
import 독도16도 from './독도16도.js'
import 수퍼판 from './수퍼판.js'
import 온지음레스토랑 from './온지음레스토랑.js'
import 옥동식 from './옥동식.js'
import 더이탈리안클럽 from './더이탈리안클럽.js'
import 해방촌윤주당 from './해방촌윤주당.js'
import 동경밥상본점 from './동경밥상본점.js'
import 유용욱바베큐연구소 from './유용욱바베큐연구소.js'
import 오리지널넘버스 from './오리지널넘버스.js'
import 비스트로드욘트빌 from './비스트로드욘트빌.js'
import 쌤쌤쌤용산점 from './쌤쌤쌤용산점.js'
import 금룡 from './금룡.js'
import 솔밤 from './솔밤.js'
import Oyatte from './Oyatte.js'

// 백수저 셰프 식당 배열
const whiteSpoonRestaurants: Restaurant[] = [
  스와니예,
  라망시크레,
  이타닉가든,
  호빈,
  테이블포포,
  카덴,
  코자차,
  임성근국가공인진갈비,
  오스테리아샘킴,
  뜨라또리아샘킴,
  천상현의천상,
  소울,
  일삼육길육미,
  크라운돼지신사본점,
  윤서울,
  면서울,
  고료리켄,
  이치에,
  회현식당,
  봉래헌,
  에그앤플라워해방촌본점,
  도우룸,
  회현카페,
  루드베키아,
  콩두명동,
  도우룸광화문,
  뽀모,
  크라운돼지제주점,
]

// 흑수저 셰프 식당 배열
const blackSpoonRestaurants: Restaurant[] = [
  세누프라이빗키친,
  드레스덴그린,
  소바쥬,
  모노로그,
  독도16도,
  수퍼판,
  온지음레스토랑,
  옥동식,
  더이탈리안클럽,
  해방촌윤주당,
  동경밥상본점,
  유용욱바베큐연구소,
  오리지널넘버스,
  비스트로드욘트빌,
  쌤쌤쌤용산점,
  금룡,
  솔밤,
  Oyatte,
]

// 전체 식당 목록
export const allRestaurants: Restaurant[] = [...whiteSpoonRestaurants, ...blackSpoonRestaurants]

// 백수저 식당만
export const getWhiteSpoonRestaurants = (): Restaurant[] => whiteSpoonRestaurants

// 흑수저 식당만
export const getBlackSpoonRestaurants = (): Restaurant[] => blackSpoonRestaurants

// 배열 셔플 (Fisher-Yates 알고리즘)
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 추천 식당 (미슐랭 랜덤 4개 + 흑수저 랜덤 5개)
export const getFeaturedRestaurants = (): Restaurant[] => {
  const michelinRestaurants = whiteSpoonRestaurants.filter(r => (r.michelin ?? 0) > 0)
  const randomMichelin = shuffleArray(michelinRestaurants).slice(0, 4)
  const randomBlackSpoon = shuffleArray(blackSpoonRestaurants).slice(0, 5)
  return [...randomMichelin, ...randomBlackSpoon]
}

// ID로 식당 찾기
export const getRestaurantById = (id: number): Restaurant | undefined => {
  return allRestaurants.find(r => r.id === id)
}

// 타입별 필터
export const getRestaurantsBySpoonType = (type: string): Restaurant[] => {
  return allRestaurants.filter(r => r.spoonType === type)
}
