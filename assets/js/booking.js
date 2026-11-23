/**
 * REGALIA — 9-Step Booking Wizard Controller
 * Handles live selections, reactive price calculations in INR (₹),
 * form validation, localStorage state persistence, and confirmation generation.
 */

(function () {
  'use strict';

  // Seed Data for halls, packages, catering
  const VENUES = {
    'hall-imperial': { name: 'Grand Imperial Ballroom', basePrice: 350000, capacity: '500 - 1500 Guests' },
    'hall-kohinoor': { name: 'Kohinoor Palatial Hall', basePrice: 280000, capacity: '300 - 800 Guests' },
    'hall-courtyard': { name: 'Royal Courtyard & Pavilion', basePrice: 220000, capacity: '200 - 600 Guests' },
    'hall-dynasty': { name: 'Dynasty Banquet Suite', basePrice: 180000, capacity: '100 - 350 Guests' },
    'hall-sapphire': { name: 'Sapphire Terrace Lawn', basePrice: 150000, capacity: '150 - 450 Guests' }
  };

  const PACKAGES = {
    'pkg-sovereign': { name: 'Royal Sovereign Wedding', price: 250000 },
    'pkg-reception': { name: 'Imperial Reception', price: 190000 },
    'pkg-heritage': { name: 'Heritage Engagement', price: 140000 },
    'pkg-corporate': { name: 'Aristocrat Corporate', price: 120000 },
    'pkg-custom': { name: 'Bespoke Celebration Suite', price: 90000 }
  };

  const CATERING_PLATE = {
    'grand-veg': { name: 'Grand Royal Vegetarian Feast', rate: 1250 },
    'imperial-nonveg': { name: 'Imperial Multi-Cuisine Gourmet', rate: 1650 },
    'mughlai-coastal': { name: 'Royal Mughlai & Coastal Banquet', rate: 2100 }
  };

  const ADDONS = {
    'addon-chaat': { name: 'Live Delhi Chaat & Tandoor Pavilion', price: 25000 },
    'addon-dessert': { name: 'Artisan Dessert & Pastry Studio', price: 35000 },
    'addon-drinks': { name: 'Signature Welcome Mocktail Lounge', price: 30000 },
    'addon-valet': { name: 'Royal Chauffeur & Valet Concierge', price: 20000 }
  };

  // State object
  const bookingState = {
    eventType: 'Wedding Ceremony & Gala',
    venueId: 'hall-imperial',
    venueName: VENUES['hall-imperial'].name,
    venuePrice: VENUES['hall-imperial'].basePrice,
    guestCount: 400,
    seatingStyle: 'Round Royal Banquet',
    eventDate: '2026-12-15',
    timeSlot: 'Full Day Grand Gala (08:00 - 23:00)',
    packageId: 'pkg-sovereign',
    packageName: PACKAGES['pkg-sovereign'].name,
    packagePrice: PACKAGES['pkg-sovereign'].price,
    cateringTier: 'grand-veg',
    cateringTierName: CATERING_PLATE['grand-veg'].name,
    cateringPlateRate: CATERING_PLATE['grand-veg'].rate,
    selectedAddons: ['addon-drinks'],
    customer: {
      name: '',
      email: '',
      phone: '',
      city: '',
      notes: ''
    }
  };

  let currentStep = 1;
  const totalSteps = 9;

  function initBookingWizard() {
    const wizardForm = document.getElementById('regalia-booking-wizard');
    if (!wizardForm) return;

    // Initialize calendar in Step 4
    if (document.getElementById('booking-calendar-mount') && window.RegaliaCalendar) {
      new window.RegaliaCalendar('booking-calendar-mount', {
        onSelect: (dateStr) => {
          bookingState.eventDate = dateStr;
          const displayEl = document.getElementById('selected-date-display');
          if (displayEl) displayEl.textContent = formatDate(dateStr);
          updateSummary();
        }
      });
    }

    bindStepInputs();
    bindNavigationButtons();
    updateStepView();
    updateSummary();
  }

  function bindStepInputs() {
    // Step 1: Event Type selection
    document.querySelectorAll('.event-type-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.event-type-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        bookingState.eventType = this.getAttribute('data-value') || 'Wedding';
        updateSummary();
      });
    });

    // Step 2: Hall selection
    document.querySelectorAll('.venue-select-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.venue-select-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        const vId = this.getAttribute('data-venue-id');
        if (VENUES[vId]) {
          bookingState.venueId = vId;
          bookingState.venueName = VENUES[vId].name;
          bookingState.venuePrice = VENUES[vId].basePrice;
          updateSummary();
        }
      });
    });

    // Step 3: Guest details
    const guestInput = document.getElementById('wizard-guest-count');
    if (guestInput) {
      guestInput.addEventListener('input', function () {
        const val = parseInt(this.value, 10);
        bookingState.guestCount = isNaN(val) || val < 50 ? 50 : val;
        updateSummary();
      });
    }

    const seatingSelect = document.getElementById('wizard-seating-style');
    if (seatingSelect) {
      seatingSelect.addEventListener('change', function () {
        bookingState.seatingStyle = this.value;
        updateSummary();
      });
    }

    // Step 5: Time Slot selection
    document.querySelectorAll('.timeslot-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.timeslot-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        bookingState.timeSlot = this.getAttribute('data-timeslot') || 'Evening';
        updateSummary();
      });
    });

    // Step 6: Package selection
    document.querySelectorAll('.package-select-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.package-select-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        const pId = this.getAttribute('data-package-id');
        if (PACKAGES[pId]) {
          bookingState.packageId = pId;
          bookingState.packageName = PACKAGES[pId].name;
          bookingState.packagePrice = PACKAGES[pId].price;
          updateSummary();
        }
      });
    });

    // Step 7: Catering Tier selection
    document.querySelectorAll('.catering-tier-radio').forEach(radio => {
      radio.addEventListener('change', function () {
        const cId = this.value;
        if (CATERING_PLATE[cId]) {
          bookingState.cateringTier = cId;
          bookingState.cateringTierName = CATERING_PLATE[cId].name;
          bookingState.cateringPlateRate = CATERING_PLATE[cId].rate;
          updateSummary();
        }
      });
    });

    // Catering Addons checkboxes
    document.querySelectorAll('.catering-addon-checkbox').forEach(chk => {
      chk.addEventListener('change', function () {
        const addonId = this.value;
        if (this.checked) {
          if (!bookingState.selectedAddons.includes(addonId)) {
            bookingState.selectedAddons.push(addonId);
          }
        } else {
          bookingState.selectedAddons = bookingState.selectedAddons.filter(id => id !== addonId);
        }
        updateSummary();
      });
    });

    // Step 8: Customer Details
    ['cust-name', 'cust-email', 'cust-phone', 'cust-city', 'cust-notes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          const key = id.replace('cust-', '');
          bookingState.customer[key] = this.value;
        });
      }
    });
  }

  // Never jump to the top of the page. Only nudge the scroll position if the step
  // progress bar has moved above the sticky header, and then only just enough.
  function keepStepInView() {
    const nav = document.querySelector('.wizard-steps-nav');
    if (!nav) return;
    const header = document.querySelector('.regalia-header');
    const offset = (header ? header.offsetHeight : 0) + 12;
    const top = nav.getBoundingClientRect().top;
    if (top < offset) {
      window.scrollBy({ top: top - offset, behavior: 'smooth' });
    }
  }

  // Step 1's "Continue" button sits centred; every other step keeps it on the right.
  // When the step changes, glide the Continue button between those two positions.
  function goToStep(newStep) {
    const oldPane = document.getElementById(`step-pane-${currentStep}`);
    const fromBtn = oldPane && oldPane.querySelector('.wizard-btn-next');
    const fromLeft = fromBtn ? fromBtn.getBoundingClientRect().left : null;
    const involvesFirstStep = currentStep === 1 || newStep === 1;

    currentStep = newStep;
    updateStepView();

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!involvesFirstStep || reduce || fromLeft === null) return;
    const newPane = document.getElementById(`step-pane-${currentStep}`);
    const toBtn = newPane && newPane.querySelector('.wizard-btn-next');
    if (!toBtn || !toBtn.animate) return;
    const dx = fromLeft - toBtn.getBoundingClientRect().left;
    if (Math.abs(dx) < 2) return;
    toBtn.animate(
      [{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }],
      { duration: 500, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }
    );
  }

  function bindNavigationButtons() {
    const nextBtns = document.querySelectorAll('.wizard-btn-next');
    const prevBtns = document.querySelectorAll('.wizard-btn-prev');
    const submitBtn = document.getElementById('wizard-btn-submit');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateCurrentStep()) {
          if (currentStep < totalSteps) {
            goToStep(currentStep + 1);
            keepStepInView();
          }
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
          keepStepInView();
        }
      });
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', handleBookingSubmit);
    }

    // Step Nav indicators direct click
    document.querySelectorAll('.step-nav-item').forEach(item => {
      item.addEventListener('click', function () {
        const targetStep = parseInt(this.getAttribute('data-step'), 10);
        if (targetStep < currentStep) {
          currentStep = targetStep;
          updateStepView();
        }
      });
    });
  }

  function validateCurrentStep() {
    if (currentStep === 8) {
      const name = document.getElementById('cust-name')?.value.trim();
      const email = document.getElementById('cust-email')?.value.trim();
      const phone = document.getElementById('cust-phone')?.value.trim();

      if (!name || !email || !phone) {
        alert('Please provide your Name, Email, and Contact Phone Number to proceed.');
        return false;
      }
    }
    return true;
  }

  function updateStepView() {
    // Hide all panes
    document.querySelectorAll('.wizard-step-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`step-pane-${currentStep}`);
    if (activePane) activePane.classList.add('active');

    // Update Step Nav indicators
    document.querySelectorAll('.step-nav-item').forEach(item => {
      const stepNum = parseInt(item.getAttribute('data-step'), 10);
      item.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        item.classList.add('active');
      } else if (stepNum < currentStep) {
        item.classList.add('completed');
      }
    });

    // Update progress bar percentage
    const progressBar = document.querySelector('.wizard-progress-bar');
    if (progressBar) {
      const pct = ((currentStep - 1) / totalSteps) * 100; // lands exactly on the active step's centre
      progressBar.style.width = `${pct}%`;
    }
  }

  function updateSummary() {
    // Math calculations
    const cateringTotal = (bookingState.cateringPlateRate * bookingState.guestCount);
    let addonsTotal = 0;
    bookingState.selectedAddons.forEach(addonId => {
      if (ADDONS[addonId]) addonsTotal += ADDONS[addonId].price;
    });

    const subtotal = bookingState.venuePrice + bookingState.packagePrice + cateringTotal + addonsTotal;
    const taxes = Math.round(subtotal * 0.18); // 9% Luxury Tax for luxury venue
    const grandTotal = subtotal + taxes;
    const advanceAmount = Math.round(grandTotal * 0.25); // 25% advance to hold date

    // DOM Updates
    setText('sum-event-type', bookingState.eventType);
    setText('sum-venue-name', bookingState.venueName);
    setText('sum-event-date', formatDate(bookingState.eventDate));
    setText('sum-timeslot', bookingState.timeSlot);
    setText('sum-guest-count', `${bookingState.guestCount} Guests (${bookingState.seatingStyle})`);
    setText('sum-package-name', bookingState.packageName);
    setText('sum-catering-tier', `${bookingState.cateringTierName} (₹${bookingState.cateringPlateRate.toLocaleString('en-IN')}/plate)`);

    setText('sum-venue-price', `₹${bookingState.venuePrice.toLocaleString('en-IN')}`);
    setText('sum-package-price', `₹${bookingState.packagePrice.toLocaleString('en-IN')}`);
    setText('sum-catering-price', `₹${cateringTotal.toLocaleString('en-IN')}`);
    setText('sum-addons-price', `₹${addonsTotal.toLocaleString('en-IN')}`);
    setText('sum-tax-price', `₹${taxes.toLocaleString('en-IN')}`);
    setText('sum-total-price', `₹${grandTotal.toLocaleString('en-IN')}`);
    setText('sum-advance-price', `₹${advanceAmount.toLocaleString('en-IN')}`);

    // Update Step 9 review details
    setText('rev-event-type', bookingState.eventType);
    setText('rev-hall-name', bookingState.venueName);
    setText('rev-event-date', formatDate(bookingState.eventDate));
    setText('rev-timeslot', bookingState.timeSlot);
    setText('rev-guests', `${bookingState.guestCount} Guests`);
    setText('rev-seating', bookingState.seatingStyle);
    setText('rev-package', bookingState.packageName);
    setText('rev-catering', bookingState.cateringTierName);
    setText('rev-total', `₹${grandTotal.toLocaleString('en-IN')}`);
    setText('rev-advance', `₹${advanceAmount.toLocaleString('en-IN')}`);
  }

  function handleBookingSubmit(e) {
    e.preventDefault();

    const termsAccepted = document.getElementById('agree-terms')?.checked;
    if (!termsAccepted) {
      alert('Please review and accept the reservation terms and conditions.');
      return;
    }

    const refNumber = 'REG-' + Math.floor(100000 + Math.random() * 900000);
    const bookingPayload = {
      referenceNumber: refNumber,
      createdAt: new Date().toISOString(),
      status: 'Booking Request Submitted',
      paymentStatus: 'Advance Payment Pending',
      ...bookingState
    };

    // Save to localStorage for demo persistence
    try {
      localStorage.setItem('regalia_active_booking', JSON.stringify(bookingPayload));
      const existingList = JSON.parse(localStorage.getItem('regalia_all_bookings') || '[]');
      existingList.unshift(bookingPayload);
      localStorage.setItem('regalia_all_bookings', JSON.stringify(existingList));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Redirect to confirmation page
    window.location.href = 'booking-confirmation.html';
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function formatDate(dStr) {
    if (!dStr) return 'Not Selected';
    const parts = dStr.split('-');
    if (parts.length !== 3) return dStr;
    const dt = new Date(parts[0], parts[1] - 1, parts[2]);
    return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }

  document.addEventListener('DOMContentLoaded', initBookingWizard);
})();
