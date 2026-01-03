<script>
  import { onMount } from 'svelte'

  export let restaurant

  let sentimentData = null
  let menuData = null
  let isLoadingSentiment = false
  let isLoadingMenu = false
  let isMobile = false
  let showMap = false

  // 모바일/데스크탑에 따른 네이버 지도 URL
  $: placeUrl = isMobile
    ? `https://m.place.naver.com/restaurant/${restaurant.placeId}/location`
    : `https://map.naver.com/p/entry/place/${restaurant.placeId}`
  $: searchUrl = isMobile
    ? `https://m.place.naver.com/restaurant/${restaurant.placeId}/location`
    : `https://map.naver.com/p/search/${encodeURIComponent(restaurant.searchName || '')}`
  $: mapHeight = isMobile ? 600 : 800

  onMount(async () => {
    // 모바일 감지
    const checkMobile = () => {
      isMobile = window.innerWidth <= 768
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // iframe 지연 로딩 (뒤로가기 이벤트 충돌 방지)
    const mapTimer = setTimeout(() => {
      showMap = true
    }, 300)

    if (restaurant.nlpId) {
      isLoadingSentiment = true
      isLoadingMenu = true

      // 감정 분석 통계 조회
      try {
        const response = await fetch(
          `https://nlpfriendly.easypcb.co.kr/api/restaurants/${restaurant.nlpId}/statistics`
        )
        const result = await response.json()
        if (result.result && result.data) {
          sentimentData = result.data
        }
      } catch (error) {
        console.error('Failed to fetch sentiment data:', error)
      } finally {
        isLoadingSentiment = false
      }

      // 메뉴 통계 조회
      try {
        const response = await fetch(
          `https://nlpfriendly.easypcb.co.kr/api/restaurants/${restaurant.nlpId}/menu-statistics?minMentions=1`
        )
        const result = await response.json()
        if (result.result && result.data) {
          menuData = result.data
        }
      } catch (error) {
        console.error('Failed to fetch menu data:', error)
      } finally {
        isLoadingMenu = false
      }
    }

    // cleanup
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(mapTimer)
    }
  })

  function getSentimentColor(sentiment) {
    if (sentiment === 'positive') return '#22c55e'
    if (sentiment === 'negative') return '#ef4444'
    return '#f59e0b'
  }
</script>

<div class="restaurant-detail">
  <div class="restaurant-detail-scroll">
    <!-- 히어로 섹션: 이미지 + 오버레이 정보 -->
    <div class="hero-editorial" style="background-image: url({restaurant.image})">
      <div class="hero-editorial-overlay"></div>

      <!-- 메인 콘텐츠 오버레이 -->
      <div class="hero-content-overlay">
        <!-- 레스토랑 타이틀 + 배지 -->
        <div class="hero-title-block">
          <div class="hero-title-row">
            <h1 class="hero-title">{restaurant.name}</h1>
            <div class="hero-title-badges">
              <span class="hero-badge-spoon" class:white={restaurant.spoonType === 'white'}>
                {restaurant.spoonType === 'white' ? '백수저' : '흑수저'}
              </span>
              {#if restaurant.michelin > 0}
                <span class="hero-badge-michelin">
                  {'★'.repeat(restaurant.michelin)}
                </span>
              {/if}
            </div>
          </div>
          <p class="hero-title-en">{restaurant.nameEn}</p>
        </div>

        <!-- 글래스 카드: 핵심 정보 -->
        <div class="hero-glass-card">
          <!-- 셰프 정보 -->
          {#if restaurant.chef || restaurant.chefNickname}
            <div class="hero-chef-row">
              <span class="hero-chef-icon">👨‍🍳</span>
              <div class="hero-chef-text">
                {#if restaurant.chefNickname}
                  <span class="hero-chef-nickname">"{restaurant.chefNickname}"</span>
                {/if}
                {#if restaurant.chef}
                  <span class="hero-chef-name">{restaurant.chef}</span>
                {/if}
              </div>
            </div>
          {/if}

          <!-- 소개 -->
          <p class="hero-description">{restaurant.description}</p>

          <!-- 정보 그리드 -->
          <div class="hero-info-row">
            <div class="hero-info-item">
              <span class="hero-info-label">분야</span>
              <span class="hero-info-value">{restaurant.category}</span>
            </div>
            <div class="hero-info-divider"></div>
            <div class="hero-info-item">
              <span class="hero-info-label">위치</span>
              <span class="hero-info-value">{restaurant.location}</span>
            </div>
          </div>

          <!-- 대표 메뉴 -->
          {#if restaurant.signature && restaurant.signature.length > 0}
            <div class="hero-signature">
              <span class="hero-signature-label">Signature</span>
              <div class="hero-signature-items">
                {#each restaurant.signature as menu}
                  <span class="hero-signature-tag">{menu}</span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="restaurant-detail-body">

      <!-- 상세 정보 섹션 -->
      {#if restaurant.phone || restaurant.hours || restaurant.price || restaurant.amenities || restaurant.awards}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            상세 정보
          </h2>

          <div class="detail-info-cards">
            <!-- 어워드 -->
            {#if restaurant.awards && restaurant.awards.length > 0}
              <div class="detail-info-card award-card">
                <div class="detail-card-icon">🏆</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">어워드</span>
                  <div class="award-badges">
                    {#each restaurant.awards as award}
                      <span class="award-badge">{award}</span>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 연락처 -->
            {#if restaurant.phone}
              <div class="detail-info-card">
                <div class="detail-card-icon">📞</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">전화번호</span>
                  <a href="tel:{restaurant.phone}" class="detail-card-value phone-link">{restaurant.phone}</a>
                </div>
              </div>
            {/if}

            <!-- 웹사이트 -->
            {#if restaurant.website}
              <div class="detail-info-card">
                <div class="detail-card-icon">🌐</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">웹사이트</span>
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" class="detail-card-value website-link">
                    {restaurant.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                </div>
              </div>
            {/if}

            <!-- 가격 정보 -->
            {#if restaurant.price}
              <div class="detail-info-card price-card">
                <div class="detail-card-icon">💰</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">가격</span>
                  <div class="price-details">
                    {#if restaurant.price.lunch}
                      <div class="price-row">
                        <span class="price-time">점심</span>
                        <span class="price-amount">{restaurant.price.lunch}</span>
                      </div>
                    {/if}
                    {#if restaurant.price.dinner}
                      <div class="price-row">
                        <span class="price-time">저녁</span>
                        <span class="price-amount">{restaurant.price.dinner}</span>
                      </div>
                    {/if}
                    {#if restaurant.price.range}
                      <div class="price-row">
                        <span class="price-amount single">{restaurant.price.range}</span>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 영업시간 -->
            {#if restaurant.hours}
              <div class="detail-info-card hours-card">
                <div class="detail-card-icon">🕐</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">영업시간</span>
                  <div class="hours-details">
                    {#if restaurant.hours.lunch}
                      <div class="hours-row">
                        <span class="hours-label">점심</span>
                        <span class="hours-value">{restaurant.hours.lunch}</span>
                      </div>
                    {/if}
                    {#if restaurant.hours.dinner}
                      <div class="hours-row">
                        <span class="hours-label">저녁</span>
                        <span class="hours-value">{restaurant.hours.dinner}</span>
                      </div>
                    {/if}
                    {#if restaurant.hours.weekdayDinner}
                      <div class="hours-row">
                        <span class="hours-label">평일 저녁</span>
                        <span class="hours-value">{restaurant.hours.weekdayDinner}</span>
                      </div>
                    {/if}
                    {#if restaurant.hours.weekend}
                      <div class="hours-row">
                        <span class="hours-label">주말</span>
                        <span class="hours-value">{restaurant.hours.weekend}</span>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 정기휴무 -->
            {#if restaurant.closedDays}
              <div class="detail-info-card closed-card">
                <div class="detail-card-icon">📅</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">정기휴무</span>
                  <span class="detail-card-value closed-value">{restaurant.closedDays}</span>
                </div>
              </div>
            {/if}

            <!-- 주차 정보 -->
            {#if restaurant.parking}
              <div class="detail-info-card">
                <div class="detail-card-icon">🅿️</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">주차</span>
                  {#if typeof restaurant.parking === 'string'}
                    <span class="detail-card-value">{restaurant.parking}</span>
                  {:else}
                    <div class="parking-details">
                      {#if restaurant.parking.type}
                        <div class="parking-row"><span class="parking-key">형태</span><span>{restaurant.parking.type}</span></div>
                      {/if}
                      {#if restaurant.parking.capacity}
                        <div class="parking-row"><span class="parking-key">대수</span><span>{restaurant.parking.capacity}</span></div>
                      {/if}
                      {#if restaurant.parking.rate}
                        <div class="parking-row"><span class="parking-key">요금</span><span>{restaurant.parking.rate}</span></div>
                      {/if}
                      {#if restaurant.parking.duration}
                        <div class="parking-row"><span class="parking-key">시간</span><span>{restaurant.parking.duration}</span></div>
                      {/if}
                      {#if restaurant.parking.note}
                        <div class="parking-row"><span class="parking-key">참고</span><span>{restaurant.parking.note}</span></div>
                      {/if}
                      {#if restaurant.parking.valet}
                        <div class="parking-row"><span class="parking-key">발렛</span><span>{restaurant.parking.valet}</span></div>
                      {/if}
                      {#if restaurant.parking.valetHours}
                        <div class="parking-row"><span class="parking-key">발렛시간</span><span>{restaurant.parking.valetHours}</span></div>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            {/if}

            <!-- 발렛 정보 -->
            {#if restaurant.valet}
              <div class="detail-info-card">
                <div class="detail-card-icon">🚗</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">발렛</span>
                  <div class="valet-details">
                    {#if restaurant.valet.rate}
                      <div class="valet-row"><span class="valet-key">요금</span><span>{restaurant.valet.rate}</span></div>
                    {/if}
                    {#if restaurant.valet.duration}
                      <div class="valet-row"><span class="valet-key">시간</span><span>{restaurant.valet.duration}</span></div>
                    {/if}
                    {#if restaurant.valet.location}
                      <div class="valet-row"><span class="valet-key">위치</span><span>{restaurant.valet.location}</span></div>
                    {/if}
                    {#if restaurant.valet.additional}
                      <div class="valet-row"><span class="valet-key">추가요금</span><span>{restaurant.valet.additional}</span></div>
                    {/if}
                    {#if restaurant.valet.note}
                      <div class="valet-row"><span class="valet-key">참고</span><span>{restaurant.valet.note}</span></div>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 콜키지 -->
            {#if restaurant.corkage}
              <div class="detail-info-card corkage-card">
                <div class="detail-card-icon">🍷</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">콜키지</span>
                  <div class="corkage-details">
                    {#if restaurant.corkage.wine}
                      <div class="corkage-row"><span class="corkage-key">와인</span><span>{restaurant.corkage.wine}</span></div>
                    {/if}
                    {#if restaurant.corkage.whiskey}
                      <div class="corkage-row"><span class="corkage-key">위스키</span><span>{restaurant.corkage.whiskey}</span></div>
                    {/if}
                    {#if restaurant.corkage.whiskey_magnum}
                      <div class="corkage-row"><span class="corkage-key">위스키/매그넘</span><span>{restaurant.corkage.whiskey_magnum}</span></div>
                    {/if}
                    {#if restaurant.corkage.sake}
                      <div class="corkage-row"><span class="corkage-key">사케</span><span>{restaurant.corkage.sake}</span></div>
                    {/if}
                    {#if restaurant.corkage.traditional}
                      <div class="corkage-row"><span class="corkage-key">전통주</span><span>{restaurant.corkage.traditional}</span></div>
                    {/if}
                    {#if restaurant.corkage.other}
                      <div class="corkage-row"><span class="corkage-key">기타주류</span><span>{restaurant.corkage.other}</span></div>
                    {/if}
                    {#if restaurant.corkage.others}
                      <div class="corkage-row"><span class="corkage-key">기타</span><span>{restaurant.corkage.others}</span></div>
                    {/if}
                    {#if restaurant.corkage.max}
                      <div class="corkage-row"><span class="corkage-key">최대</span><span>{restaurant.corkage.max}</span></div>
                    {/if}
                    {#if restaurant.corkage.note}
                      <div class="corkage-row note"><span>{restaurant.corkage.note}</span></div>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 룸/좌석 정보 -->
            {#if restaurant.rooms || restaurant.seating || restaurant.maxCapacity || restaurant.group}
              <div class="detail-info-card seating-card">
                <div class="detail-card-icon">🪑</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">좌석 & 룸</span>
                  <div class="seating-details">
                    {#if restaurant.maxCapacity}
                      <div class="seating-row"><span class="seating-key">최대수용</span><span>{restaurant.maxCapacity}명</span></div>
                    {/if}
                    {#if restaurant.group}
                      <div class="seating-row"><span class="seating-key">단체</span><span>{restaurant.group}</span></div>
                    {/if}
                    {#if restaurant.seating}
                      {#if restaurant.seating.hall}
                        <div class="seating-row"><span class="seating-key">홀</span><span>{restaurant.seating.hall}</span></div>
                      {/if}
                      {#if restaurant.seating.pdr}
                        <div class="seating-row"><span class="seating-key">PDR</span><span>{restaurant.seating.pdr}</span></div>
                      {/if}
                    {/if}
                    {#if restaurant.rooms}
                      {#if Array.isArray(restaurant.rooms)}
                        {#each restaurant.rooms as room}
                          <div class="room-item">
                            <span class="room-type">{room.type || '룸'}</span>
                            <span class="room-capacity">{room.capacity}</span>
                            {#if room.charge}
                              <span class="room-charge">{room.charge}</span>
                            {/if}
                          </div>
                        {/each}
                      {:else}
                        {#if restaurant.rooms.capacity}
                          <div class="seating-row"><span class="seating-key">룸 인원</span><span>{restaurant.rooms.capacity}</span></div>
                        {/if}
                        {#if restaurant.rooms.charge}
                          <div class="seating-row"><span class="seating-key">룸차지</span><span>{restaurant.rooms.charge}</span></div>
                        {/if}
                        {#if restaurant.rooms.count}
                          <div class="seating-row"><span class="seating-key">룸 개수</span><span>{restaurant.rooms.count}</span></div>
                        {/if}
                      {/if}
                    {/if}
                  </div>
                </div>
              </div>
            {/if}

            <!-- 키즈 정보 -->
            {#if restaurant.noKids || restaurant.kidsZone || restaurant.kidsNote}
              <div class="detail-info-card kids-card" class:no-kids={restaurant.noKids}>
                <div class="detail-card-icon">{restaurant.noKids ? '🚫' : '👶'}</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">키즈 정책</span>
                  {#if restaurant.noKids}
                    <span class="detail-card-value no-kids-text">{restaurant.noKids}</span>
                  {/if}
                  {#if restaurant.kidsZone}
                    <span class="detail-card-value kids-zone-text">{restaurant.kidsZone}</span>
                  {/if}
                  {#if restaurant.kidsNote}
                    <span class="detail-card-value kids-note-text">{restaurant.kidsNote}</span>
                  {/if}
                </div>
              </div>
            {/if}

            <!-- 편의시설 -->
            {#if restaurant.amenities && restaurant.amenities.length > 0}
              <div class="detail-info-card amenities-card full-width">
                <div class="detail-card-icon">✨</div>
                <div class="detail-card-content">
                  <span class="detail-card-label">편의시설</span>
                  <div class="amenities-list">
                    {#each restaurant.amenities as amenity}
                      <span class="amenity-tag">{amenity}</span>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      {#if restaurant.placeId}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">위치</h2>
          <div class="restaurant-detail-map">
            {#if showMap}
              <iframe
                src={placeUrl}
                width="100%"
                height={mapHeight}
                frameborder="0"
                style="border:0; border-radius: 0.75rem;"
                allowfullscreen
                loading="lazy"
                title="{restaurant.name} 위치"
              ></iframe>
            {:else}
              <div class="map-placeholder" style="height: {mapHeight}px"></div>
            {/if}
          </div>
          <div class="restaurant-detail-actions">
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="restaurant-detail-btn btn-map"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              네이버 지도에서 보기
            </a>
            <a
              href="https://www.google.com/search?q={encodeURIComponent(restaurant.name + ' 예약')}"
              target="_blank"
              rel="noopener noreferrer"
              class="restaurant-detail-btn btn-reserve"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              예약하기
            </a>
          </div>
        </div>
      {:else if restaurant.searchName}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">위치</h2>
          <div class="restaurant-detail-map">
            {#if showMap}
              <iframe
                src={searchUrl}
                width="100%"
                height={mapHeight}
                frameborder="0"
                style="border:0; border-radius: 0.75rem;"
                allowfullscreen
                loading="lazy"
                title="{restaurant.name} 위치"
              ></iframe>
            {:else}
              <div class="map-placeholder" style="height: {mapHeight}px"></div>
            {/if}
          </div>
          <div class="restaurant-detail-actions">
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="restaurant-detail-btn btn-map"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              네이버 지도에서 검색
            </a>
            <a
              href="https://www.google.com/search?q={encodeURIComponent(restaurant.name + ' 예약')}"
              target="_blank"
              rel="noopener noreferrer"
              class="restaurant-detail-btn btn-reserve"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              예약하기
            </a>
          </div>
        </div>
      {/if}

      {#if sentimentData}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            네이버 리뷰 감정 분석
          </h2>

          <div class="sentiment-inline-card">
            <div class="sentiment-visual-bar">
              <div class="sentiment-bar-segment positive" style="width: {sentimentData.positiveRate}%"></div>
              <div class="sentiment-bar-segment neutral" style="width: {sentimentData.neutralRate}%"></div>
              <div class="sentiment-bar-segment negative" style="width: {sentimentData.negativeRate}%"></div>
            </div>
            <div class="sentiment-inline-stats">
              <span class="sentiment-inline-item positive">
                <span class="sentiment-dot"></span>
                <span class="sentiment-label">긍정 {sentimentData.positiveRate}%</span>
              </span>
              <span class="sentiment-inline-item neutral">
                <span class="sentiment-dot"></span>
                <span class="sentiment-label">중립 {sentimentData.neutralRate}%</span>
              </span>
              <span class="sentiment-inline-item negative">
                <span class="sentiment-dot"></span>
                <span class="sentiment-label">부정 {sentimentData.negativeRate}%</span>
              </span>
              <span class="sentiment-inline-total">{sentimentData.totalReviews}개 분석</span>
            </div>
          </div>
        </div>
      {:else if isLoadingSentiment}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">네이버 리뷰 감정 분석</h2>
          <div class="sentiment-inline-card loading">
            <div class="sentiment-inline-skeleton"></div>
          </div>
        </div>
      {/if}

      {#if menuData && menuData.menuStatistics && menuData.menuStatistics.length > 0}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3h18v18H3zM3 9h18M9 21V9"/>
            </svg>
            메뉴별 리뷰 분석
          </h2>

          <!-- Top Positive & Negative Menus -->
          {#if menuData.topPositiveMenus?.length > 0 || menuData.topNegativeMenus?.length > 0}
            <div class="menu-ranking-section">
              {#if menuData.topPositiveMenus?.length > 0}
                <div class="menu-ranking-card positive">
                  <div class="ranking-header">
                    <div class="ranking-badge positive">
                      <span class="badge-icon">🏆</span>
                      <span class="badge-text">인기 메뉴</span>
                    </div>
                    <span class="ranking-count">{menuData.topPositiveMenus.length}개</span>
                  </div>
                  <div class="ranking-table">
                    <div class="ranking-table-header">
                      <span class="col-rank">#</span>
                      <span class="col-name">메뉴</span>
                      <span class="col-sentiment">긍정</span>
                      <span class="col-sentiment">중립</span>
                      <span class="col-sentiment">부정</span>
                      <span class="col-rate">만족도</span>
                    </div>
                    {#each menuData.topPositiveMenus as menu, i}
                      <div class="ranking-row" style="animation-delay: {i * 0.05}s">
                        <span class="col-rank">
                          <span class="rank-num" class:gold={i === 0} class:silver={i === 1} class:bronze={i === 2}>{i + 1}</span>
                        </span>
                        <span class="col-name">{menu.menuName}</span>
                        <span class="col-sentiment positive">{menu.positive}</span>
                        <span class="col-sentiment neutral">{menu.neutral}</span>
                        <span class="col-sentiment negative">{menu.negative}</span>
                        <span class="col-rate">
                          <span class="rate-bar">
                            <span class="rate-fill positive" style="width: {menu.positiveRate}%"></span>
                          </span>
                          <span class="rate-value positive">{menu.positiveRate}%</span>
                        </span>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}

              {#if menuData.topNegativeMenus?.length > 0}
                <div class="menu-ranking-card negative">
                  <div class="ranking-header">
                    <div class="ranking-badge negative">
                      <span class="badge-icon">📉</span>
                      <span class="badge-text">개선 필요</span>
                    </div>
                    <span class="ranking-count">{menuData.topNegativeMenus.length}개</span>
                  </div>
                  <div class="ranking-table">
                    <div class="ranking-table-header">
                      <span class="col-rank">#</span>
                      <span class="col-name">메뉴</span>
                      <span class="col-sentiment">긍정</span>
                      <span class="col-sentiment">중립</span>
                      <span class="col-sentiment">부정</span>
                      <span class="col-rate">부정률</span>
                    </div>
                    {#each menuData.topNegativeMenus as menu, i}
                      <div class="ranking-row" style="animation-delay: {i * 0.05}s">
                        <span class="col-rank">
                          <span class="rank-num negative">{i + 1}</span>
                        </span>
                        <span class="col-name">{menu.menuName}</span>
                        <span class="col-sentiment positive">{menu.positive}</span>
                        <span class="col-sentiment neutral">{menu.neutral}</span>
                        <span class="col-sentiment negative">{menu.negative}</span>
                        <span class="col-rate">
                          <span class="rate-bar">
                            <span class="rate-fill negative" style="width: {menu.negativeRate}%"></span>
                          </span>
                          <span class="rate-value negative">{menu.negativeRate}%</span>
                        </span>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/if}

          <!-- All Menu Statistics -->
          <div class="menu-stats-container">
            {#each menuData.menuStatistics as menu}
              <div class="menu-stat-item">
                <div class="menu-stat-header">
                  <span class="menu-stat-name">{menu.menuName}</span>
                  <span class="menu-stat-mentions">{menu.totalMentions}회 언급</span>
                </div>
                <div class="menu-stat-counts">
                  <span class="count-item positive">👍 {menu.positive}</span>
                  <span class="count-item neutral">😐 {menu.neutral}</span>
                  <span class="count-item negative">👎 {menu.negative}</span>
                </div>
                <div class="menu-stat-bar-wrapper">
                  <div class="menu-stat-bar">
                    <div
                      class="menu-stat-bar-fill"
                      style="width: {menu.positiveRate}%; background: {getSentimentColor(menu.sentiment)}"
                    ></div>
                  </div>
                  <span class="menu-stat-rate" style="color: {getSentimentColor(menu.sentiment)}">
                    {menu.positiveRate}%
                  </span>
                </div>
                {#if menu.topReasons.positive.length > 0 || menu.topReasons.negative.length > 0 || menu.topReasons.neutral.length > 0}
                  <div class="menu-stat-tags">
                    {#each menu.topReasons.positive as reason}
                      <span class="menu-tag positive">{reason}</span>
                    {/each}
                    {#each menu.topReasons.neutral as reason}
                      <span class="menu-tag neutral">{reason}</span>
                    {/each}
                    {#each menu.topReasons.negative as reason}
                      <span class="menu-tag negative">{reason}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {:else if isLoadingMenu}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">메뉴별 리뷰 분석</h2>
          <div class="menu-stats-loading">
            {#each [1, 2, 3] as _}
              <div class="menu-stat-skeleton"></div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
