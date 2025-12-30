<script>
  import { onMount } from 'svelte'
  import { closeRestaurant } from '../stores/app.js'

  export let restaurant

  let sentimentData = null
  let menuData = null
  let isLoadingSentiment = false
  let isLoadingMenu = false
  let isMobile = false

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
    }
  })

  function getSentimentColor(sentiment) {
    if (sentiment === 'positive') return '#22c55e'
    if (sentiment === 'negative') return '#ef4444'
    return '#f59e0b'
  }
</script>

<div class="restaurant-detail">
  <button class="restaurant-detail-close" on:click={() => closeRestaurant()} aria-label="닫기">
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>

  <div class="restaurant-detail-scroll">
    <div class="restaurant-detail-hero" style="background-image: url({restaurant.image})">
      <div class="restaurant-detail-hero-overlay"></div>

      <div class="restaurant-detail-hero-content">
        <div class="restaurant-detail-badges">
          <span class="restaurant-detail-spoon" class:white={restaurant.spoonType === 'white'}>
            {restaurant.spoonType === 'white' ? '🥄 백수저' : '🥢 흑수저'}
          </span>
          {#if restaurant.michelin > 0}
            <span class="restaurant-detail-michelin">
              {'⭐'.repeat(restaurant.michelin)} 미슐랭 {restaurant.michelin}스타
            </span>
          {/if}
        </div>

        <h1 class="restaurant-detail-title">{restaurant.name}</h1>
        <p class="restaurant-detail-title-en">{restaurant.nameEn}</p>
      </div>
    </div>

    <div class="restaurant-detail-body">
      <div class="restaurant-detail-section">
        <div class="restaurant-detail-chef-card">
          <div class="restaurant-detail-chef-icon">👨‍🍳</div>
          <div class="restaurant-detail-chef-info">
            {#if restaurant.chefNickname}
              <p class="restaurant-detail-chef-nickname">"{restaurant.chefNickname}"</p>
            {/if}
            {#if restaurant.chef}
              <p class="restaurant-detail-chef-name">{restaurant.chef} 셰프</p>
            {/if}
          </div>
        </div>
      </div>

      <div class="restaurant-detail-section">
        <h2 class="restaurant-detail-section-title">소개</h2>
        <p class="restaurant-detail-description">{restaurant.description}</p>
      </div>

      <div class="restaurant-detail-section">
        <h2 class="restaurant-detail-section-title">정보</h2>
        <div class="restaurant-detail-info-grid">
          <div class="restaurant-detail-info-item">
            <span class="info-label">분야</span>
            <span class="info-value">{restaurant.category}</span>
          </div>
          <div class="restaurant-detail-info-item">
            <span class="info-label">위치</span>
            <span class="info-value">{restaurant.location}</span>
          </div>
          <div class="restaurant-detail-info-item">
            <span class="info-label">가격대</span>
            <span class="info-value">{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      <div class="restaurant-detail-section">
        <h2 class="restaurant-detail-section-title">대표 메뉴</h2>
        <div class="restaurant-detail-signature">
          {#each restaurant.signature as menu}
            <span class="signature-item">{menu}</span>
          {/each}
        </div>
      </div>

      {#if restaurant.placeId}
        <div class="restaurant-detail-section">
          <h2 class="restaurant-detail-section-title">위치</h2>
          <div class="restaurant-detail-map">
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
