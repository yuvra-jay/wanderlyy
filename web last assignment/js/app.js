/**
 * Wanderly - Travel Application Controller
 * Handles live tour search, filtering, currency conversion,
 * interactive itinerary details modal, cart drawer, and checkout.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currency: 'INR',
    searchQuery: '',
    selectedDestination: 'all',
    selectedTourType: 'all',
    selectedSeason: 'all',
    selectedDuration: 'all',
    sortBy: 'recommended',
    showAllReviews: false,
    cart: [],
    bookingHistory: [],
    wishlist: new Set(),
    activePromo: null,
    activeModalTour: null,
    modalConfig: {
      travelers: 2,
      departureDate: '',
      roomTier: 'comfort', // standard, comfort, superior
      selectedAddOns: new Set()
    }
  };

  // Promo Codes
  const PROMO_CODES = {
    'EARLYBIRD': { type: 'percent', value: 0.10, desc: '10% Early Bird Discount' },
    'NORDIC2027': { type: 'flatEUR', value: 200, desc: '€200 2027 Advance Booking Credit' }
  };
  const TOUR_PRICE_MULTIPLIER = 0.5;
  const REVIEW_ENABLED_BOOKING_REFERENCE = 'NV-2027-219896';

  // DOM Elements cache
  const el = {};

  // Initialize Application
  function init() {
    cacheDom();
    loadPersistedState();
    bindEvents();
    renderDestinations();
    renderTourStyles();
    renderTestimonials();
    renderFaqs();
    applyFiltersAndRender();
    updateCartUI();
    updateBookingHistoryUI();
    updateWishlistUI();
    updateCurrencyDisplay();
  }

  function cacheDom() {
    el.currencyTrigger = document.getElementById('currencyTrigger');
    el.currencyDropdown = document.getElementById('currencyDropdown');
    el.currencyText = document.getElementById('currencyText');
    el.cartBtn = document.getElementById('cartBtn');
    el.cartCountBadge = document.getElementById('cartCountBadge');
    el.bookingHistoryBtn = document.getElementById('bookingHistoryBtn');
    el.historyCountBadge = document.getElementById('historyCountBadge');
    el.bookingHistoryBackdrop = document.getElementById('bookingHistoryBackdrop');
    el.bookingHistoryClose = document.getElementById('bookingHistoryClose');
    el.bookingHistoryList = document.getElementById('bookingHistoryList');
    el.loginBtn = document.getElementById('loginBtn');
    el.loginBackdrop = document.getElementById('loginBackdrop');
    el.loginCloseBtn = document.getElementById('loginCloseBtn');
    el.loginDoneBtn = document.getElementById('loginDoneBtn');
    el.wishlistBtn = document.getElementById('wishlistBtn');
    el.wishlistCountBadge = document.getElementById('wishlistCountBadge');
    el.cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
    el.cartDrawerClose = document.getElementById('cartDrawerClose');
    el.cartItemsList = document.getElementById('cartItemsList');
    el.cartSubtotal = document.getElementById('cartSubtotal');
    el.cartDiscountRow = document.getElementById('cartDiscountRow');
    el.cartDiscountVal = document.getElementById('cartDiscountVal');
    el.cartTotal = document.getElementById('cartTotal');
    el.promoInput = document.getElementById('promoInput');
    el.applyPromoBtn = document.getElementById('applyPromoBtn');
    el.checkoutBtn = document.getElementById('checkoutBtn');

    // Filter controls
    el.filterSearchInput = document.getElementById('filterSearchInput');
    el.filterPills = document.getElementById('filterPills');
    el.filterTypeSelect = document.getElementById('filterTypeSelect');
    el.filterSeasonSelect = document.getElementById('filterSeasonSelect');
    el.filterDurationSelect = document.getElementById('filterDurationSelect');
    el.sortSelect = document.getElementById('sortSelect');
    el.clearFiltersBtn = document.getElementById('clearFiltersBtn');
    el.resultsCount = document.getElementById('resultsCount');
    el.toursGrid = document.getElementById('toursGrid');

    // Hero Search
    el.heroDestinationSelect = document.getElementById('heroDestinationSelect');
    el.heroTypeSelect = document.getElementById('heroTypeSelect');
    el.heroSeasonSelect = document.getElementById('heroSeasonSelect');
    el.heroFindBtn = document.getElementById('heroFindBtn');

    // Containers
    el.destinationsGrid = document.getElementById('destinationsGrid');
    el.tourStylesGrid = document.getElementById('tourStylesGrid');
    el.testimonialsGrid = document.getElementById('testimonialsGrid');
    el.allReviewsBtn = document.getElementById('allReviewsBtn');
    el.faqsAccordion = document.getElementById('faqsAccordion');
    el.askQuestionForm = document.getElementById('askQuestionForm');
    el.askQuestionStatus = document.getElementById('askQuestionStatus');

    // Itinerary Modal
    el.itineraryModalBackdrop = document.getElementById('itineraryModalBackdrop');
    el.itineraryModalClose = document.getElementById('itineraryModalClose');
    el.itineraryContent = document.getElementById('itineraryContent');

    // Checkout Modal
    el.checkoutModalBackdrop = document.getElementById('checkoutModalBackdrop');
    el.checkoutModalClose = document.getElementById('checkoutModalClose');

    // Toast
    el.toast = document.getElementById('toastNotification');
    el.toastText = document.getElementById('toastText');
  }

  function loadPersistedState() {
    try {
      const savedCurrency = localStorage.getItem('nv_currency');
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        state.currency = savedCurrency;
      }
      const savedCart = localStorage.getItem('nv_cart');
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }
      const savedBookingHistory = localStorage.getItem('nv_booking_history');
      if (savedBookingHistory) {
        state.bookingHistory = JSON.parse(savedBookingHistory);
      }
      const savedWishlist = localStorage.getItem('nv_wishlist');
      if (savedWishlist) {
        state.wishlist = new Set(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn('Could not load localStorage', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem('nv_currency', state.currency);
      localStorage.setItem('nv_cart', JSON.stringify(state.cart));
      localStorage.setItem('nv_booking_history', JSON.stringify(state.bookingHistory));
      localStorage.setItem('nv_wishlist', JSON.stringify(Array.from(state.wishlist)));
    } catch (e) {
      console.warn('Could not save localStorage', e);
    }
  }

  function formatPrice(amountEUR) {
    const cur = CURRENCIES[state.currency] || CURRENCIES.EUR;
    return cur.format(amountEUR);
  }

  function getTourPriceEUR(tour) {
    return tour.priceEUR * TOUR_PRICE_MULTIPLIER;
  }

  function bindEvents() {
    if (el.askQuestionForm) {
      el.askQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const responseMessage = 'Question received successfully! We’re happy to help you plan your trip. Messages are not sent to support yet.';
        if (el.askQuestionStatus) {
          el.askQuestionStatus.textContent = responseMessage;
        }
        el.askQuestionForm.reset();
        showToast(responseMessage);
      });
    }

    if (el.allReviewsBtn) {
      el.allReviewsBtn.addEventListener('click', () => {
        state.showAllReviews = !state.showAllReviews;
        renderTestimonials();
      });
    }

    // Currency Selector
    if (el.currencyTrigger) {
      el.currencyTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        el.currencyDropdown.classList.toggle('active');
      });
    }

    document.addEventListener('click', () => {
      if (el.currencyDropdown) el.currencyDropdown.classList.remove('active');
    });

    document.querySelectorAll('.currency-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const code = btn.dataset.currency;
        if (CURRENCIES[code]) {
          state.currency = code;
          saveState();
          updateCurrencyDisplay();
          applyFiltersAndRender();
          updateCartUI();
          if (state.activeModalTour) {
            updateModalPricing();
          }
          showToast(`Currency changed to ${code} (${CURRENCIES[code].symbol})`);
        }
      });
    });

    // Cart Drawer Toggle
    if (el.cartBtn) {
      el.cartBtn.addEventListener('click', openCartDrawer);
    }
    if (el.bookingHistoryBtn) {
      el.bookingHistoryBtn.addEventListener('click', openBookingHistory);
    }
    if (el.loginBtn) {
      el.loginBtn.addEventListener('click', openLoginDialog);
    }
    if (el.loginCloseBtn) {
      el.loginCloseBtn.addEventListener('click', closeLoginDialog);
    }
    if (el.loginDoneBtn) {
      el.loginDoneBtn.addEventListener('click', closeLoginDialog);
    }
    if (el.loginBackdrop) {
      el.loginBackdrop.addEventListener('click', (e) => {
        if (e.target === el.loginBackdrop) closeLoginDialog();
      });
    }
    if (el.bookingHistoryClose) {
      el.bookingHistoryClose.addEventListener('click', closeBookingHistory);
    }
    if (el.bookingHistoryBackdrop) {
      el.bookingHistoryBackdrop.addEventListener('click', (e) => {
        if (e.target === el.bookingHistoryBackdrop) closeBookingHistory();
      });
    }
    if (el.bookingHistoryList) {
      el.bookingHistoryList.addEventListener('submit', (e) => {
        const form = e.target.closest('.booking-review-form');
        if (!form) return;
        e.preventDefault();
        saveBookingReview(form);
      });
    }
    if (el.cartDrawerClose) {
      el.cartDrawerClose.addEventListener('click', closeCartDrawer);
    }
    if (el.cartDrawerBackdrop) {
      el.cartDrawerBackdrop.addEventListener('click', (e) => {
        if (e.target === el.cartDrawerBackdrop) closeCartDrawer();
      });
    }

    // Wishlist Toggle
    if (el.wishlistBtn) {
      el.wishlistBtn.addEventListener('click', () => {
        if (state.wishlist.size === 0) {
          showToast('Your wishlist is empty. Tap the heart on any tour to save it!');
        } else {
          // Filter to wishlisted tours
          state.selectedDestination = 'all';
          state.selectedTourType = 'all';
          document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          scrollToSection('toursSection');
          renderWishlistFilteredTours();
          showToast(`Showing ${state.wishlist.size} saved tours`);
        }
      });
    }

    // Filter Search Input with Debounce
    let searchDebounceTimer;
    if (el.filterSearchInput) {
      el.filterSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
          state.searchQuery = e.target.value.trim().toLowerCase();
          applyFiltersAndRender();
        }, 250);
      });
    }

    // Filter Dropdowns
    if (el.filterTypeSelect) {
      el.filterTypeSelect.addEventListener('change', (e) => {
        state.selectedTourType = e.target.value;
        applyFiltersAndRender();
      });
    }
    if (el.filterSeasonSelect) {
      el.filterSeasonSelect.addEventListener('change', (e) => {
        state.selectedSeason = e.target.value;
        applyFiltersAndRender();
      });
    }
    if (el.filterDurationSelect) {
      el.filterDurationSelect.addEventListener('change', (e) => {
        state.selectedDuration = e.target.value;
        applyFiltersAndRender();
      });
    }
    if (el.sortSelect) {
      el.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Clear Filters Button
    if (el.clearFiltersBtn) {
      el.clearFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // Hero Find Trip CTA
    if (el.heroFindBtn) {
      el.heroFindBtn.addEventListener('click', () => {
        if (el.heroDestinationSelect) state.selectedDestination = el.heroDestinationSelect.value;
        if (el.heroTypeSelect) state.selectedTourType = el.heroTypeSelect.value;
        if (el.heroSeasonSelect) state.selectedSeason = el.heroSeasonSelect.value;

        // Synchronize pills
        document.querySelectorAll('.filter-pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.dest === state.selectedDestination);
        });
        if (el.filterTypeSelect) el.filterTypeSelect.value = state.selectedTourType;
        if (el.filterSeasonSelect) el.filterSeasonSelect.value = state.selectedSeason;

        applyFiltersAndRender();
        scrollToSection('toursSection');
      });
    }

    // Promo code apply
    if (el.applyPromoBtn) {
      el.applyPromoBtn.addEventListener('click', applyPromoCode);
    }
    if (el.promoInput) {
      el.promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyPromoCode();
      });
    }

    // Proceed to Checkout
    if (el.checkoutBtn) {
      el.checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    if (el.checkoutModalClose) {
      el.checkoutModalClose.addEventListener('click', closeCheckoutModal);
    }
    if (el.checkoutModalBackdrop) {
      el.checkoutModalBackdrop.addEventListener('click', (e) => {
        if (e.target === el.checkoutModalBackdrop) closeCheckoutModal();
      });
    }

    // Itinerary Modal Close
    if (el.itineraryModalClose) {
      el.itineraryModalClose.addEventListener('click', closeItineraryModal);
    }
    if (el.itineraryModalBackdrop) {
      el.itineraryModalBackdrop.addEventListener('click', (e) => {
        if (e.target === el.itineraryModalBackdrop) closeItineraryModal();
      });
    }

    // Keyboard ESC to close modals/drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeItineraryModal();
        closeCartDrawer();
        closeCheckoutModal();
        closeBookingHistory();
        closeLoginDialog();
      }
    });

    // Mobile nav toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
          navMenu.style.display = 'flex';
          navMenu.style.flexDirection = 'column';
          navMenu.style.position = 'absolute';
          navMenu.style.top = '100%';
          navMenu.style.left = '0';
          navMenu.style.right = '0';
          navMenu.style.backgroundColor = '#fff';
          navMenu.style.padding = '20px';
          navMenu.style.boxShadow = 'var(--shadow-lg)';
        } else {
          navMenu.style.display = '';
        }
      });
    }
  }

  function updateCurrencyDisplay() {
    if (el.currencyText) {
      el.currencyText.textContent = `${state.currency} (${CURRENCIES[state.currency].symbol})`;
    }
    document.querySelectorAll('.currency-option').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.currency === state.currency);
    });
  }

  function resetAllFilters() {
    state.searchQuery = '';
    state.selectedDestination = 'all';
    state.selectedTourType = 'all';
    state.selectedSeason = 'all';
    state.selectedDuration = 'all';
    state.sortBy = 'recommended';

    if (el.filterSearchInput) el.filterSearchInput.value = '';
    if (el.filterTypeSelect) el.filterTypeSelect.value = 'all';
    if (el.filterSeasonSelect) el.filterSeasonSelect.value = 'all';
    if (el.filterDurationSelect) el.filterDurationSelect.value = 'all';
    if (el.sortSelect) el.sortSelect.value = 'recommended';
    if (el.heroDestinationSelect) el.heroDestinationSelect.value = 'all';
    if (el.heroTypeSelect) el.heroTypeSelect.value = 'all';
    if (el.heroSeasonSelect) el.heroSeasonSelect.value = 'all';

    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.dest === 'all');
    });

    applyFiltersAndRender();
    showToast('Filters cleared');
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================================
  // Rendering Destinations & Styles
  // =========================================================================
  function renderDestinations() {
    if (!el.destinationsGrid) return;
    el.destinationsGrid.innerHTML = DESTINATIONS_DATA.map(dest => `
      <div class="destination-card" data-dest="${dest.id}">
        <img class="destination-img" src="${dest.image}" alt="${dest.name}" loading="lazy" />
        <div class="destination-overlay">
          <div class="destination-top">
            <span class="badge badge-teal">${dest.badge}</span>
          </div>
          <div>
            <h3 class="destination-name">${dest.name}</h3>
            <p class="destination-tagline">${dest.tagline}</p>
            <div class="destination-cta">
              Explore ${dest.tourCount} tours <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Bind click to filter
    el.destinationsGrid.querySelectorAll('.destination-card').forEach(card => {
      card.addEventListener('click', () => {
        const destId = card.dataset.dest;
        state.selectedDestination = destId;
        document.querySelectorAll('.filter-pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.dest === destId);
        });
        applyFiltersAndRender();
        scrollToSection('toursSection');
        showToast(`Filtered tours to ${card.querySelector('.destination-name').textContent}`);
      });
    });

    // Also render Filter Pills
    if (el.filterPills) {
      const pills = [
        { id: 'all', name: 'All Destinations' },
        ...DESTINATIONS_DATA.map(d => ({ id: d.id, name: d.name }))
      ];
      el.filterPills.innerHTML = pills.map(p => `
        <button class="filter-pill ${p.id === 'all' ? 'active' : ''}" data-dest="${p.id}">
          ${p.name}
        </button>
      `).join('');

      el.filterPills.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          el.filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.selectedDestination = pill.dataset.dest;
          applyFiltersAndRender();
        });
      });
    }

    // Populate Hero Destination Dropdown
    if (el.heroDestinationSelect) {
      el.heroDestinationSelect.innerHTML = `
        <option value="all">Anywhere in India</option>
        ${DESTINATIONS_DATA.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
      `;
    }
  }

  function renderTourStyles() {
    if (!el.tourStylesGrid) return;
    el.tourStylesGrid.innerHTML = TOUR_TYPES_DATA.map(style => `
      <div class="tour-style-card" data-style="${style.id}">
        <div class="tour-style-thumb">
          <img src="${style.image}" alt="${style.name}" loading="lazy" />
        </div>
        <div class="tour-style-body">
          <div class="tour-style-perk">${style.perk}</div>
          <h3 class="tour-style-name">${style.name}</h3>
          <p class="tour-style-desc">${style.description}</p>
          <button class="btn btn-outline btn-sm btn-block">
            View All Tour Packages <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `).join('');

    el.tourStylesGrid.querySelectorAll('.tour-style-card').forEach(card => {
      card.addEventListener('click', () => {
        resetAllFilters();
        scrollToSection('toursSection');
      });
    });
  }

  // =========================================================================
  // Tour Filtering & Rendering
  // =========================================================================
  function applyFiltersAndRender() {
    let filtered = TOURS_DATA.filter(tour => {
      // Keyword search
      if (state.searchQuery) {
        const q = state.searchQuery;
        const matchesTitle = tour.title.toLowerCase().includes(q);
        const matchesSub = tour.subTitle.toLowerCase().includes(q);
        const matchesDest = tour.destinationName.toLowerCase().includes(q);
        const matchesCountry = tour.countryTag.toLowerCase().includes(q);
        const matchesHighlights = tour.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSub && !matchesDest && !matchesCountry && !matchesHighlights) {
          return false;
        }
      }

      // Destination filter
      if (state.selectedDestination !== 'all' && tour.destination !== state.selectedDestination) {
        return false;
      }

      // Tour Type filter
      if (state.selectedTourType !== 'all' && tour.type !== state.selectedTourType) {
        return false;
      }

      // Season filter
      if (state.selectedSeason !== 'all' && tour.season !== state.selectedSeason) {
        return false;
      }

      // Duration filter
      if (state.selectedDuration !== 'all') {
        if (state.selectedDuration === 'short' && (tour.durationDays > 6)) return false;
        if (state.selectedDuration === 'medium' && (tour.durationDays < 7 || tour.durationDays > 9)) return false;
        if (state.selectedDuration === 'long' && (tour.durationDays < 10)) return false;
      }

      return true;
    });

    const hasMatchingTours = filtered.length > 0;

    // Sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'price-asc': return getTourPriceEUR(a) - getTourPriceEUR(b);
        case 'price-desc': return getTourPriceEUR(b) - getTourPriceEUR(a);
        case 'duration-asc': return a.durationDays - b.durationDays;
        case 'duration-desc': return b.durationDays - a.durationDays;
        case 'rating': return b.rating - a.rating;
        default: return (b.reviewCount * b.rating) - (a.reviewCount * a.rating); // Recommended
      }
    });

    if (!hasMatchingTours) {
      filtered = [...TOURS_DATA];
      for (let index = filtered.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [filtered[index], filtered[randomIndex]] = [filtered[randomIndex], filtered[index]];
      }
    }

    renderTours(filtered, !hasMatchingTours);
  }

  function renderWishlistFilteredTours() {
    const filtered = TOURS_DATA.filter(t => state.wishlist.has(t.id));
    renderTours(filtered);
  }

  function renderTours(tours, showingRandomFallback = false) {
    if (!el.toursGrid) return;

    if (el.resultsCount) {
      el.resultsCount.innerHTML = showingRandomFallback
        ? `No exact matches. Showing <span>${tours.length}</span> tour packages in a random order`
        : `Showing <span>${tours.length}</span> curated tour packages`;
    }

    if (tours.length === 0) {
      el.toursGrid.innerHTML = `
        <div class="tours-empty-state">
          <div class="empty-icon"><i class="fas fa-compass"></i></div>
          <h3 class="empty-title">No tours match your criteria</h3>
          <p class="empty-desc">Try clearing some of your filters or searching for different keywords like "Aurora", "Fjord", or "Glacier".</p>
          <button class="btn btn-navy" id="emptyClearBtn">Clear All Filters</button>
        </div>
      `;
      const btn = document.getElementById('emptyClearBtn');
      if (btn) btn.addEventListener('click', resetAllFilters);
      return;
    }

    el.toursGrid.innerHTML = tours.map(tour => {
      const isWishlisted = state.wishlist.has(tour.id);
      return `
        <div class="tour-card" data-tour-id="${tour.id}">
          <div class="tour-card-header">
            <img class="tour-card-img" src="${tour.image}" alt="${tour.title}" loading="lazy" />
            <div class="tour-card-badges">
              ${tour.badge ? `<span class="badge badge-teal">${tour.badge}</span>` : ''}
              <span class="badge badge-discount">50% OFF</span>
            </div>
            <button class="tour-wishlist-btn ${isWishlisted ? 'active' : ''}" data-tour-id="${tour.id}" title="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
              <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="tour-card-meta-bar">
              <span><i class="fas fa-map-marker-alt"></i> ${tour.destinationName}</span>
              <span><i class="fas fa-car-side"></i> ${tour.typeName}</span>
            </div>
          </div>
          <div class="tour-card-content">
            <div class="tour-card-details-row">
              <div class="tour-rating">
                <i class="fas fa-star star-icon"></i>
                <span>${tour.rating.toFixed(1)}</span>
                <span style="color:var(--neutral-500);font-weight:400">(${tour.reviewCount})</span>
              </div>
              <div class="tour-duration-season">
                <i class="far fa-clock"></i> ${tour.durationDays} days · ${tour.seasonMonths}
              </div>
            </div>

            <h3 class="tour-card-title">${tour.title}</h3>
            <p class="tour-card-subtitle">${tour.subTitle}</p>

            <div class="tour-highlights-chips">
              ${tour.highlights.slice(0, 3).map(h => `
                <span class="highlight-chip"><i class="fas fa-check" style="color:var(--accent-teal);font-size:0.7rem"></i> ${h}</span>
              `).join('')}
            </div>

            <div class="tour-card-footer">
              <div class="tour-price-box">
                <span class="tour-price-label">Price per person from</span>
                <span class="tour-price-orig">${formatPrice(tour.priceEUR)}</span>
                <span class="tour-price-current">${formatPrice(getTourPriceEUR(tour))}</span>
              </div>
              <div class="tour-card-actions">
                <button class="btn btn-outline btn-sm view-itinerary-btn" data-tour-id="${tour.id}">
                  Itinerary
                </button>
                <button class="btn btn-primary btn-sm quick-book-btn" data-tour-id="${tour.id}">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind card buttons
    el.toursGrid.querySelectorAll('.view-itinerary-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openItineraryModal(btn.dataset.tourId);
      });
    });

    el.toursGrid.querySelectorAll('.quick-book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tour = TOURS_DATA.find(t => t.id === btn.dataset.tourId);
        if (tour) {
          quickAddToCart(tour);
        }
      });
    });

    el.toursGrid.querySelectorAll('.tour-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(btn.dataset.tourId);
      });
    });
  }

  // =========================================================================
  // Wishlist Logic
  // =========================================================================
  function toggleWishlist(tourId) {
    if (state.wishlist.has(tourId)) {
      state.wishlist.delete(tourId);
      showToast('Removed from wishlist');
    } else {
      state.wishlist.add(tourId);
      showToast('Added to your saved wishlist! ❤️');
    }
    saveState();
    updateWishlistUI();
    applyFiltersAndRender();
  }

  function updateWishlistUI() {
    if (el.wishlistCountBadge) {
      el.wishlistCountBadge.textContent = state.wishlist.size;
    }
  }

  // =========================================================================
  // Itinerary Details Modal
  // =========================================================================
  function openItineraryModal(tourId) {
    const tour = TOURS_DATA.find(t => t.id === tourId);
    if (!tour) return;

    state.activeModalTour = tour;
    state.modalConfig = {
      travelers: 2,
      departureDate: getNextMonthDate(),
      roomTier: 'comfort',
      selectedAddOns: new Set()
    };

    renderItineraryModalContent(tour);
    if (el.itineraryModalBackdrop) {
      el.itineraryModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeItineraryModal() {
    state.activeModalTour = null;
    if (el.itineraryModalBackdrop) {
      el.itineraryModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function getNextMonthDate() {
    const d = new Date();
    d.setMonth(d.getMonth() + 2);
    return d.toISOString().split('T')[0];
  }

  function renderItineraryModalContent(tour) {
    if (!el.itineraryContent) return;

    el.itineraryContent.innerHTML = `
      <div class="modal-hero-banner">
        <img class="modal-hero-img" src="${tour.gallery[0] || tour.image}" alt="${tour.title}" />
        <div class="modal-hero-overlay">
          <span class="badge badge-teal" style="width:fit-content;margin-bottom:8px">${tour.badge || tour.destinationName}</span>
          <h2 class="modal-title">${tour.title}</h2>
          <p class="modal-subtitle">${tour.subTitle}</p>
          <div class="modal-meta-row">
            <span><i class="far fa-clock"></i> ${tour.durationDays} Days / ${tour.durationNights} Nights</span>
            <span><i class="fas fa-star star-icon"></i> ${tour.rating.toFixed(1)} (${tour.reviewCount} verified reviews)</span>
            <span><i class="fas fa-tag"></i> Pace: ${tour.paceLevel}</span>
          </div>
        </div>
      </div>

      <div class="modal-body">
        <div class="modal-tabs-nav">
          <button class="modal-tab-btn active" data-tab="tab-itinerary">Day-by-Day Itinerary</button>
          <button class="modal-tab-btn" data-tab="tab-inclusions">What's Included</button>
          <button class="modal-tab-btn" data-tab="tab-overview">Trip Highlights</button>
        </div>

        <!-- Tab 1: Itinerary -->
        <div class="modal-tab-pane active" id="tab-itinerary">
          <div class="timeline-container">
            ${tour.itinerary.map(day => `
              <div class="timeline-day-card">
                <div class="timeline-marker">${day.day}</div>
                <div class="timeline-header">
                  <h4 class="timeline-day-title">Day ${day.day}: ${day.title}</h4>
                  <span class="timeline-day-tag">Day ${day.day}</span>
                </div>
                <p class="timeline-desc">${day.description}</p>
                <div class="timeline-perks">
                  <span><i class="fas fa-utensils"></i> ${day.meals}</span>
                  <span><i class="fas fa-bed"></i> ${day.hotel}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tab 2: Inclusions -->
        <div class="modal-tab-pane" id="tab-inclusions">
          <div class="inclusions-grid">
            <div class="inclusion-card">
              <h4 class="inclusion-card-title"><i class="fas fa-check-circle" style="color:#10b981"></i> Everything Included</h4>
              <ul class="checklist">
                ${tour.included.map(item => `
                  <li class="checklist-item">
                    <span class="check-icon"><i class="fas fa-check"></i></span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="inclusion-card">
              <h4 class="inclusion-card-title"><i class="fas fa-times-circle" style="color:#ef4444"></i> Not Included</h4>
              <ul class="checklist">
                ${tour.notIncluded.map(item => `
                  <li class="checklist-item">
                    <span class="cross-icon"><i class="fas fa-times"></i></span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Tab 3: Highlights -->
        <div class="modal-tab-pane" id="tab-overview">
          <p style="font-size:1.05rem;line-height:1.7;margin-bottom:24px;color:var(--neutral-700)">${tour.summary}</p>
          <h4 style="font-family:var(--font-serif);font-size:1.3rem;margin-bottom:14px;color:var(--primary-navy)">Signature Experiences on this Tour:</h4>
          <ul class="checklist" style="margin-bottom:24px">
            ${tour.highlights.map(h => `
              <li class="checklist-item">
                <span class="check-icon" style="color:var(--accent-teal)"><i class="fas fa-star"></i></span>
                <strong>${h}</strong>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Interactive Booking Configuration Box -->
        <div class="modal-booking-panel">
          <h3 class="booking-panel-title"><i class="fas fa-sliders-h"></i> Customize & Book This Itinerary</h3>
          <div class="booking-fields-grid">
            <div class="booking-input-group">
              <label><i class="far fa-calendar-alt"></i> Departure Date</label>
              <input type="date" class="booking-input" id="modalDatePicker" value="${state.modalConfig.departureDate}" />
            </div>
            <div class="booking-input-group">
              <label><i class="fas fa-user-friends"></i> Number of Travelers</label>
              <select class="booking-input" id="modalTravelersSelect">
                <option value="1">1 Traveler (Solo)</option>
                <option value="2" selected>2 Travelers (Standard)</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers (Family/Group)</option>
                <option value="5">5+ Travelers</option>
              </select>
            </div>
            <div class="booking-input-group">
              <label><i class="fas fa-hotel"></i> Accommodation Tier</label>
              <select class="booking-input" id="modalRoomTierSelect">
                <option value="standard">Standard (Cozy Countryside Guesthouses)</option>
                <option value="comfort" selected>Comfort (Handpicked 3-4★ Boutique Stays)</option>
                <option value="superior">Superior (Premier 4-5★ Historic Estates)</option>
              </select>
            </div>
          </div>

          <!-- Addons -->
          ${tour.availableAddOns && tour.availableAddOns.length > 0 ? `
            <div class="modal-addons-section">
              <div class="addons-title"><i class="fas fa-plus-circle"></i> Recommended Excursion Add-Ons:</div>
              <div class="addons-list">
                ${tour.availableAddOns.map(addon => `
                  <div class="addon-row" data-addon-id="${addon.id}">
                    <div class="addon-left">
                      <input type="checkbox" id="addon_${addon.id}" class="addon-checkbox" style="width:18px;height:18px;cursor:pointer" />
                      <div>
                        <div class="addon-name">${addon.name}</div>
                        <div class="addon-desc">${addon.description}</div>
                      </div>
                    </div>
                    <div class="addon-price">+${formatPrice(addon.priceEUR)} / person</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="modal-calc-bar">
            <div class="modal-total-display">
              <span class="modal-total-label">Estimated Total Price (Taxes Included)</span>
              <span class="modal-total-price" id="modalCalculatedTotal">Calculating...</span>
            </div>
            <button class="btn btn-primary" id="modalAddToCartBtn" style="padding:14px 32px;font-size:1.05rem">
              <i class="fas fa-suitcase-rolling"></i> Add to Booking Cart
            </button>
          </div>
        </div>
      </div>
    `;

    // Modal Tabs logic
    el.itineraryContent.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        el.itineraryContent.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        el.itineraryContent.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    // Customizer events
    const datePicker = document.getElementById('modalDatePicker');
    const travelersSelect = document.getElementById('modalTravelersSelect');
    const roomTierSelect = document.getElementById('modalRoomTierSelect');

    if (datePicker) {
      datePicker.addEventListener('change', (e) => {
        state.modalConfig.departureDate = e.target.value;
      });
    }
    if (travelersSelect) {
      travelersSelect.addEventListener('change', (e) => {
        state.modalConfig.travelers = parseInt(e.target.value, 10);
        updateModalPricing();
      });
    }
    if (roomTierSelect) {
      roomTierSelect.addEventListener('change', (e) => {
        state.modalConfig.roomTier = e.target.value;
        updateModalPricing();
      });
    }

    // Add-on checkboxes
    el.itineraryContent.querySelectorAll('.addon-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const checkbox = row.querySelector('.addon-checkbox');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        const addonId = row.dataset.addonId;
        if (checkbox.checked) {
          state.modalConfig.selectedAddOns.add(addonId);
          row.classList.add('selected');
        } else {
          state.modalConfig.selectedAddOns.delete(addonId);
          row.classList.remove('selected');
        }
        updateModalPricing();
      });
    });

    // Add to cart button
    const addToCartBtn = document.getElementById('modalAddToCartBtn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        addCustomizedTourToCart();
      });
    }

    updateModalPricing();
  }

  function calculateModalTotal() {
    if (!state.activeModalTour) return 0;
    const tour = state.activeModalTour;
    const travelers = state.modalConfig.travelers || 2;

    let basePerPerson = getTourPriceEUR(tour);

    // Room tier modifiers
    if (state.modalConfig.roomTier === 'comfort') {
      basePerPerson += 120;
    } else if (state.modalConfig.roomTier === 'superior') {
      basePerPerson += 340;
    }

    // Addons
    let addonsPerPerson = 0;
    if (tour.availableAddOns) {
      tour.availableAddOns.forEach(a => {
        if (state.modalConfig.selectedAddOns.has(a.id)) {
          addonsPerPerson += a.priceEUR;
        }
      });
    }

    return (basePerPerson + addonsPerPerson) * travelers;
  }

  function updateModalPricing() {
    const totalEUR = calculateModalTotal();
    const totalEl = document.getElementById('modalCalculatedTotal');
    if (totalEl) {
      totalEl.textContent = formatPrice(totalEUR);
    }
  }

  function addCustomizedTourToCart() {
    const tour = state.activeModalTour;
    if (!tour) return;

    const totalEUR = calculateModalTotal();
    const addOnList = [];
    if (tour.availableAddOns) {
      tour.availableAddOns.forEach(a => {
        if (state.modalConfig.selectedAddOns.has(a.id)) {
          addOnList.push(a.name);
        }
      });
    }

    const cartItem = {
      cartItemId: 'item_' + Date.now(),
      tourId: tour.id,
      title: tour.title,
      subTitle: tour.subTitle,
      image: tour.image,
      destinationName: tour.destinationName,
      countryTag: tour.countryTag,
      typeName: tour.typeName,
      seasonMonths: tour.seasonMonths,
      durationDays: tour.durationDays,
      packagePriceEUR: getTourPriceEUR(tour),
      travelers: state.modalConfig.travelers,
      departureDate: state.modalConfig.departureDate || getNextMonthDate(),
      roomTier: state.modalConfig.roomTier,
      addOns: addOnList,
      totalEUR: totalEUR,
      unitPriceEUR: totalEUR / state.modalConfig.travelers
    };

    state.cart.push(cartItem);
    saveState();
    updateCartUI();
    closeItineraryModal();
    openCartDrawer();
    showToast(`Added "${tour.title}" to your booking cart!`);
  }

  function quickAddToCart(tour) {
    const defaultTravelers = 2;
    const discountedPriceEUR = getTourPriceEUR(tour);
    const totalEUR = discountedPriceEUR * defaultTravelers;

    const cartItem = {
      cartItemId: 'item_' + Date.now(),
      tourId: tour.id,
      title: tour.title,
      subTitle: tour.subTitle,
      image: tour.image,
      destinationName: tour.destinationName,
      countryTag: tour.countryTag,
      typeName: tour.typeName,
      seasonMonths: tour.seasonMonths,
      durationDays: tour.durationDays,
      packagePriceEUR: discountedPriceEUR,
      travelers: defaultTravelers,
      departureDate: getNextMonthDate(),
      roomTier: 'comfort',
      addOns: [],
      totalEUR: totalEUR,
      unitPriceEUR: discountedPriceEUR
    };

    state.cart.push(cartItem);
    saveState();
    updateCartUI();
    openCartDrawer();
    showToast(`Added "${tour.title}" for 2 travelers to cart!`);
  }

  // =========================================================================
  // Booking Cart Drawer
  // =========================================================================
  function openCartDrawer() {
    if (el.cartDrawerBackdrop) {
      el.cartDrawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderCartItems();
    }
  }

  function closeCartDrawer() {
    if (el.cartDrawerBackdrop) {
      el.cartDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateCartUI() {
    if (el.cartCountBadge) {
      el.cartCountBadge.textContent = state.cart.length;
    }
    renderCartItems();
  }

  function updateBookingHistoryUI() {
    if (el.historyCountBadge) {
      el.historyCountBadge.textContent = state.bookingHistory.length;
    }
  }

  function openBookingHistory() {
    if (!el.bookingHistoryBackdrop) return;
    renderBookingHistory();
    el.bookingHistoryBackdrop.classList.add('active');
    el.bookingHistoryBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingHistory() {
    if (!el.bookingHistoryBackdrop) return;
    el.bookingHistoryBackdrop.classList.remove('active');
    el.bookingHistoryBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openLoginDialog() {
    if (!el.loginBackdrop) return;
    el.loginBackdrop.classList.add('active');
    el.loginBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLoginDialog() {
    if (!el.loginBackdrop) return;
    el.loginBackdrop.classList.remove('active');
    el.loginBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderBookingHistory() {
    if (!el.bookingHistoryList) return;
    if (state.bookingHistory.length === 0) {
      el.bookingHistoryList.innerHTML = `
        <div class="booking-history-empty">
          <i class="fas fa-clock-rotate-left"></i>
          <p>No completed bookings yet.</p>
        </div>
      `;
      return;
    }

    el.bookingHistoryList.innerHTML = state.bookingHistory.map(booking => `
      <article class="booking-history-order">
        <div class="booking-history-order-header">
          <div>
            <h3>Reference ${booking.reference}</h3>
            <time datetime="${booking.bookedAt}">${new Date(booking.bookedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
          <strong>${formatPrice(booking.totalEUR)}</strong>
        </div>
        <div class="booking-history-tours">
          ${booking.tours.map(tour => `
            <div class="booking-history-tour">
              <strong>${tour.title}</strong>
              <span>${tour.destinationName || tour.countryTag || ''} · ${tour.travelers} traveler(s) · ${tour.departureDate}</span>
              ${renderTourReview(booking, tour)}
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function isTourComplete(tour, booking) {
    if (booking.reference === REVIEW_ENABLED_BOOKING_REFERENCE) return true;
    if (!tour.departureDate || !Number.isFinite(Number(tour.durationDays))) return false;
    const tripEnd = new Date(`${tour.departureDate}T00:00:00`);
    if (Number.isNaN(tripEnd.getTime())) return false;
    tripEnd.setDate(tripEnd.getDate() + Number(tour.durationDays));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tripEnd <= today;
  }

  function renderTourReview(booking, tour) {
    if (!isTourComplete(tour, booking)) {
      return '<span class="booking-review-pending"><i class="far fa-clock"></i> Review available after your tour</span>';
    }

    const review = tour.review;
    const reviewText = review ? escapeHtml(review.comment) : '';
    const stars = [5, 4, 3, 2, 1].map(rating => `
      <label class="booking-review-star" aria-label="${rating} ${rating === 1 ? 'star' : 'stars'}">
        <input type="radio" name="rating" value="${rating}" required ${review && review.rating === rating ? 'checked' : ''} />
        <i class="fas fa-star" aria-hidden="true"></i>
      </label>
    `).join('');

    return `
      <form class="booking-review-form" data-reference="${escapeHtml(booking.reference)}" data-tour-id="${escapeHtml(tour.cartItemId)}">
        <label class="booking-review-label">${review ? 'Your review' : 'Rate this tour'}</label>
        <div class="booking-review-stars" role="radiogroup" aria-label="Tour rating">${stars}</div>
        <label class="booking-review-label" for="review-${escapeHtml(tour.cartItemId)}">Share your experience</label>
        <textarea id="review-${escapeHtml(tour.cartItemId)}" name="comment" rows="3" maxlength="1000" placeholder="What did you enjoy about this tour?" required>${reviewText}</textarea>
        <button class="btn btn-primary booking-review-submit" type="submit">${review ? 'Update review' : 'Submit review'}</button>
        ${review ? `<span class="booking-review-saved">Submitted ${new Date(review.submittedAt).toLocaleDateString('en-IN')}</span>` : ''}
      </form>
    `;
  }

  function saveBookingReview(form) {
    const booking = state.bookingHistory.find(item => item.reference === form.dataset.reference);
    const tour = booking && booking.tours.find(item => item.cartItemId === form.dataset.tourId);
    const formData = new FormData(form);
    const rating = Number(formData.get('rating'));
    const comment = String(formData.get('comment') || '').trim();
    if (!tour || !isTourComplete(tour, booking) || rating < 1 || rating > 5 || !comment) return;

    tour.review = { rating, comment, submittedAt: new Date().toISOString() };
    saveState();
    renderBookingHistory();
    showToast('Your tour review has been saved.');
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function renderCartItems() {
    if (!el.cartItemsList) return;

    if (state.cart.length === 0) {
      el.cartItemsList.innerHTML = `
        <div class="cart-empty-message">
          <div class="cart-empty-icon"><i class="fas fa-suitcase"></i></div>
          <p style="font-weight:700;font-size:1.1rem;margin-bottom:6px">Your booking cart is empty</p>
          <p style="font-size:0.88rem">Explore our curated tours and customize your dream European trip.</p>
        </div>
      `;
      if (el.cartSubtotal) el.cartSubtotal.textContent = formatPrice(0);
      if (el.cartTotal) el.cartTotal.textContent = formatPrice(0);
      if (el.checkoutBtn) el.checkoutBtn.disabled = true;
      if (el.cartDiscountRow) el.cartDiscountRow.style.display = 'none';
      return;
    }

    if (el.checkoutBtn) el.checkoutBtn.disabled = false;

    el.cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item-card" data-cart-id="${item.cartItemId}">
        <div class="cart-item-top">
          <img src="${item.image}" alt="${item.title}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            ${item.destinationName ? `<div class="cart-item-meta"><i class="fas fa-map-marker-alt"></i> Destination: ${item.destinationName}${item.countryTag ? `, ${item.countryTag}` : ''}</div>` : ''}
            ${item.typeName ? `<div class="cart-item-meta"><i class="fas fa-route"></i> ${item.typeName}</div>` : ''}
            ${item.durationDays ? `<div class="cart-item-meta"><i class="far fa-clock"></i> ${item.durationDays} days${item.seasonMonths ? ` · ${item.seasonMonths}` : ''}</div>` : ''}
            ${item.packagePriceEUR != null ? `<div class="cart-item-meta">Package price: ${formatPrice(item.packagePriceEUR)} / person</div>` : ''}
            <div class="cart-item-meta"><i class="far fa-calendar-alt"></i> Date: ${item.departureDate}</div>
            <div class="cart-item-meta"><i class="fas fa-bed"></i> Room: ${item.roomTier ? item.roomTier.toUpperCase() : 'COMFORT'}</div>
            ${item.addOns && item.addOns.length > 0 ? `
              <div class="cart-addons-preview" style="margin-top:4px">
                + ${item.addOns.length} Excursion(s): ${item.addOns.join(', ')}
              </div>
            ` : ''}
            <button class="cart-item-remove-btn" data-cart-id="${item.cartItemId}">
              <i class="far fa-trash-alt"></i> Remove trip
            </button>
          </div>
        </div>
        <div class="cart-item-calc-row">
          <div class="travelers-counter">
            <button class="counter-btn minus-btn" data-cart-id="${item.cartItemId}">-</button>
            <span class="counter-val">${item.travelers}</span>
            <button class="counter-btn plus-btn" data-cart-id="${item.cartItemId}">+</button>
            <span style="font-size:0.8rem;color:var(--neutral-500);margin-left:4px">Traveler(s)</span>
          </div>
          <div class="cart-item-total">
            ${formatPrice(item.totalEUR)}
          </div>
        </div>
      </div>
    `).join('');

    // Bind quantity and remove buttons
    el.cartItemsList.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.cartId;
        state.cart = state.cart.filter(i => i.cartItemId !== id);
        saveState();
        updateCartUI();
        showToast('Removed tour from cart');
      });
    });

    el.cartItemsList.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = state.cart.find(i => i.cartItemId === btn.dataset.cartId);
        if (item) {
          item.travelers += 1;
          item.totalEUR = item.unitPriceEUR * item.travelers;
          saveState();
          updateCartUI();
        }
      });
    });

    el.cartItemsList.querySelectorAll('.minus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = state.cart.find(i => i.cartItemId === btn.dataset.cartId);
        if (item && item.travelers > 1) {
          item.travelers -= 1;
          item.totalEUR = item.unitPriceEUR * item.travelers;
          saveState();
          updateCartUI();
        }
      });
    });

    // Calculate totals
    const subtotalEUR = state.cart.reduce((sum, item) => sum + item.totalEUR, 0);
    let discountEUR = 0;

    if (state.activePromo) {
      if (state.activePromo.type === 'percent') {
        discountEUR = subtotalEUR * state.activePromo.value;
      } else if (state.activePromo.type === 'flatEUR') {
        discountEUR = Math.min(state.activePromo.value, subtotalEUR);
      }
    }

    const finalTotalEUR = Math.max(0, subtotalEUR - discountEUR);

    if (el.cartSubtotal) el.cartSubtotal.textContent = formatPrice(subtotalEUR);
    if (el.cartTotal) el.cartTotal.textContent = formatPrice(finalTotalEUR);

    if (el.cartDiscountRow && el.cartDiscountVal) {
      if (discountEUR > 0) {
        el.cartDiscountRow.style.display = 'flex';
        el.cartDiscountVal.textContent = `-${formatPrice(discountEUR)} (${state.activePromo.desc})`;
      } else {
        el.cartDiscountRow.style.display = 'none';
      }
    }
  }

  function applyPromoCode() {
    if (!el.promoInput) return;
    const code = el.promoInput.value.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      state.activePromo = PROMO_CODES[code];
      showToast(`Promo Code Applied: ${state.activePromo.desc} 🎉`);
      renderCartItems();
    } else {
      showToast('Invalid promo code. Try "EARLYBIRD" for 10% off!');
    }
  }

  // =========================================================================
  // Multi-Step Checkout Modal
  // =========================================================================
  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    closeCartDrawer();

    if (el.checkoutModalBackdrop) {
      el.checkoutModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderCheckoutStep1();
    }
  }

  function closeCheckoutModal() {
    if (el.checkoutModalBackdrop) {
      el.checkoutModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderCheckoutStep1() {
    const container = document.getElementById('checkoutModalContent');
    if (!container) return;

    const subtotalEUR = state.cart.reduce((sum, item) => sum + item.totalEUR, 0);
    const discountEUR = state.activePromo ? (state.activePromo.type === 'percent' ? subtotalEUR * state.activePromo.value : state.activePromo.value) : 0;
    const finalTotalEUR = Math.max(0, subtotalEUR - discountEUR);

    container.innerHTML = `
      <div class="checkout-header">
        <h3 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:700">Trip Checkout & Reservation</h3>
        <p style="color:#cbd5e1;font-size:0.9rem">Step 1 of 3: Primary Traveler Information</p>
        <div class="checkout-steps">
          <div class="step-indicator active"><span class="step-num">1</span> Traveler Info</div>
          <div class="step-indicator"><span class="step-num">2</span> Preferences</div>
          <div class="step-indicator"><span class="step-num">3</span> Confirmation</div>
        </div>
      </div>
      <div class="checkout-body">
        <form id="checkoutFormStep1">
          <div class="checkout-form-grid">
            <div class="form-group">
              <label>First Name *</label>
              <input type="text" class="form-control" id="custFirstName" placeholder="" required value="Yuvraj" />
            </div>
            <div class="form-group">
              <label>Last Name *</label>
              <input type="text" class="form-control" id="custLastName" placeholder="e.g. Smith" required value="Singh Nathawat" />
            </div>
            <div class="form-group">
              <label>Email Address (for booking voucher) *</label>
              <input type="email" class="form-control" id="custEmail" placeholder="name@example.com" required value="20254bscs034@curaj.ac.in" />
            </div>
            <div class="form-group">
              <label>Phone Number (with country code) *</label>
              <input type="tel" class="form-control" id="custPhone" placeholder="" required value="+91 8505063848" />
            </div>
            <div class="form-group">
              <label>Country of Residence *</label>
              <select class="form-control" id="custCountry">
               <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Emergency Contact (Name & Number)</label>
              <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="form-group form-full-width">
              <label>Special Requests or Mobility Needs</label>
              <textarea class="form-control" rows="2" placeholder="e.g. High floor room, dietary restrictions, honeymoon celebration"></textarea>
            </div>
          </div>

          <div style="background:var(--neutral-100);padding:16px;border-radius:var(--radius-md);margin-bottom:24px;display:flex;justify-content:space-between;align-items:center">
            <div>
              <span style="font-size:0.85rem;color:var(--neutral-600)">Total Reservation Price:</span>
              <div style="font-size:1.4rem;font-weight:800;color:var(--primary-navy)">${formatPrice(finalTotalEUR)}</div>
            </div>
            <div style="font-size:0.8rem;color:#059669;font-weight:700">
              <i class="fas fa-shield-alt"></i> Book With Confidence Protection Included
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:12px">
            <button type="button" class="btn btn-outline" id="cancelCheckoutBtn">Cancel</button>
            <button type="submit" class="btn btn-primary" style="padding:12px 28px">
              Continue to Step 2 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('cancelCheckoutBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutFormStep1').addEventListener('submit', (e) => {
      e.preventDefault();
      renderCheckoutStep2();
    });
  }

  function renderCheckoutStep2() {
    const container = document.getElementById('checkoutModalContent');
    if (!container) return;

    container.innerHTML = `
      <div class="checkout-header">
        <h3 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:700">Trip Checkout & Reservation</h3>
        <p style="color:#cbd5e1;font-size:0.9rem">Step 2 of 3: Payment Simulation</p>
        <div class="checkout-steps">
          <div class="step-indicator completed"><span class="step-num"><i class="fas fa-check"></i></span> Traveler Info</div>
          <div class="step-indicator active"><span class="step-num">2</span> Payment</div>
          <div class="step-indicator"><span class="step-num">3</span> Confirmation</div>
        </div>
      </div>
      <div class="checkout-body">
        <form id="checkoutFormStep2">
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:14px;border-radius:var(--radius-md);margin-bottom:20px;color:#166534;font-size:0.88rem">
            <i class="fas fa-lock"></i> <strong>Secure Reservation</strong>. No deposit is charged during checkout. Your voucher is generated instantly.
          </div>

          <div class="checkout-form-grid">
            <div class="form-group form-full-width">
              <label>Name on Card *</label>
              <input type="text" class="form-control" required value="Yuvraj Singh Nathawat" />
            </div>
            <div class="form-group form-full-width">
              <label>Card Number *</label>
              <input type="text" class="form-control" required placeholder="4000 1234 5678 9010" value="•••• •••• •••• 4242" />
            </div>
            <div class="form-group">
              <label>Expiration Date *</label>
              <input type="text" class="form-control" required placeholder="MM/YY" value="12/28" />
            </div>
            <div class="form-group">
              <label>CVC Security Code *</label>
              <input type="text" class="form-control" required placeholder="123" value="888" />
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:28px">
            <button type="button" class="btn btn-outline" id="backToStep1Btn">Back</button>
            <button type="submit" class="btn btn-primary" style="padding:14px 32px">
              Confirm & Generate Voucher <i class="fas fa-check-circle"></i>
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('backToStep1Btn').addEventListener('click', renderCheckoutStep1);
    document.getElementById('checkoutFormStep2').addEventListener('submit', (e) => {
      e.preventDefault();
      renderCheckoutConfirmation();
    });
  }

  function renderCheckoutConfirmation() {
    const container = document.getElementById('checkoutModalContent');
    if (!container) return;

    const refNum = 'NV-2027-' + Math.floor(100000 + Math.random() * 900000);
    const bookedTours = [...state.cart];
    const subtotalEUR = bookedTours.reduce((sum, item) => sum + item.totalEUR, 0);
    const discountEUR = state.activePromo ? (state.activePromo.type === 'percent' ? subtotalEUR * state.activePromo.value : state.activePromo.value) : 0;
    const finalTotalEUR = Math.max(0, subtotalEUR - discountEUR);

    state.bookingHistory.unshift({
      reference: refNum,
      bookedAt: new Date().toISOString(),
      totalEUR: finalTotalEUR,
      tours: bookedTours
    });

    // Clear cart upon successful order
    state.cart = [];
    state.activePromo = null;
    saveState();
    updateCartUI();
    updateBookingHistoryUI();

    container.innerHTML = `
      <div class="checkout-header" style="background:#064e3b">
        <h3 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:700">Booking Confirmed!</h3>
        <p style="color:#a7f3d0;font-size:0.9rem">Your European journey has been reserved with Wanderly</p>
      </div>
      <div class="checkout-body" id="bookingVoucherContent">
        <div class="voucher-container">
          <span class="voucher-badge"><i class="fas fa-check-circle"></i> OFFICIAL BOOKING VOUCHER</span>
          <p style="color:var(--neutral-500);font-size:0.85rem">Booking Reference ID:</p>
          <div class="voucher-ref">${refNum}</div>
          <p style="color:var(--neutral-600);font-size:0.95rem">
            A confirmation pack with full daily vouchers, driving routes, and hotel contacts has been sent to <strong>20254bscs034@curaj.ac.in</strong>.
          </p>

          <div class="voucher-meta-grid">
            <div>
              <div class="voucher-meta-label">Primary Traveler</div>
              <div class="voucher-meta-val">Yuvraj Singh Nathawat</div>
            </div>
            <div>
              <div class="voucher-meta-label">Booking Status</div>
              <div class="voucher-meta-val" style="color:#059669">CONFIRMED (Guaranteed)</div>
            </div>
            <div>
              <div class="voucher-meta-label">Total Amount</div>
              <div class="voucher-meta-val">${formatPrice(finalTotalEUR)}</div>
            </div>
          </div>
        </div>

        <h4 style="font-family:var(--font-serif);font-size:1.2rem;margin-bottom:12px;color:var(--primary-navy)">
          Booked Tour Package(s):
        </h4>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px">
          ${bookedTours.map(t => `
            <div style="background:var(--neutral-50);border:1px solid var(--neutral-200);padding:14px;border-radius:var(--radius-md);display:flex;justify-content:space-between;align-items:center">
              <div>
                <strong>${t.title}</strong>
                <div style="font-size:0.82rem;color:var(--neutral-500)">
                  Departure: ${t.departureDate} · ${t.travelers} Traveler(s) · ${t.roomTier ? t.roomTier.toUpperCase() : 'COMFORT'}
                </div>
              </div>
              <div style="font-weight:700;color:var(--primary-navy)">
                ${formatPrice(t.totalEUR)}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center">
          <button class="btn btn-outline" onclick="window.print()">
            <i class="fas fa-print"></i> Print Booking Voucher
          </button>
          <button class="btn btn-navy" id="voucherDoneBtn" style="padding:12px 30px">
            Done & Return to Homepage
          </button>
        </div>
      </div>
    `;

    document.getElementById('voucherDoneBtn').addEventListener('click', closeCheckoutModal);
    showToast(`Booking Successful! Ref: ${refNum}`);
  }

  // =========================================================================
  // Testimonials & FAQs
  // =========================================================================
  function renderTestimonials() {
    if (!el.testimonialsGrid) return;
    const reviews = state.showAllReviews ? TESTIMONIALS_DATA : TESTIMONIALS_DATA.slice(0, 4);
    el.testimonialsGrid.innerHTML = reviews.map(item => `
      <div class="testimonial-card">
        <div class="testimonial-stars">
          ${Array(item.rating).fill('<i class="fas fa-star"></i>').join('')}
        </div>
        <p class="testimonial-quote">"${item.comment}"</p>
        <div class="testimonial-author">
          <img class="testimonial-avatar" src="${item.avatar}" alt="${item.name}" loading="lazy" />
          <div>
            <div class="author-name">${item.name}</div>
            <div class="author-info">${item.location} · <span style="color:var(--accent-teal-hover)">${item.trip}</span></div>
          </div>
        </div>
      </div>
    `).join('');

    if (el.allReviewsBtn) {
      el.allReviewsBtn.textContent = state.showAllReviews ? 'Show Fewer Reviews' : 'All Reviews';
      el.allReviewsBtn.setAttribute('aria-expanded', String(state.showAllReviews));
    }
  }

  function renderFaqs() {
    if (!el.faqsAccordion) return;
    el.faqsAccordion.innerHTML = FAQS_DATA.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question">
          <span>${faq.question}</span>
          <span class="faq-icon"><i class="fas fa-plus"></i></span>
        </button>
        <div class="faq-answer">
          ${faq.answer}
        </div>
      </div>
    `).join('');

    el.faqsAccordion.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-question');
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        el.faqsAccordion.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  // =========================================================================
  // Toast Helper
  // =========================================================================
  let toastTimer;
  function showToast(message) {
    if (!el.toast || !el.toastText) return;
    el.toastText.textContent = message;
    el.toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.classList.remove('active');
    }, 3200);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
