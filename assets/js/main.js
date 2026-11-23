/**
 * REGALIA — Main Interactions & Navigation
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Header Sticky & Scroll Effect
  const header = document.querySelector('.regalia-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileClose = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  // Drawer dropdowns (Home, Services): chevron toggles the sub-menu
  document.querySelectorAll('.mobile-nav-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.mobile-nav-item');
      if (!item) return;
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Close the drawer when a link is chosen, on Escape, or when the screen grows to desktop size
  document.querySelectorAll('.mobile-nav-drawer a[href]').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1200) closeMobileNav(); });

  // 3. Gallery Category Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      layoutGalleryGrid();
    });
  });

  // Gallery grid: every card keeps the same size (no stretched last-row cards)
  function layoutGalleryGrid() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    grid.querySelectorAll('.gallery-item').forEach(i => i.style.removeProperty('--gallery-span'));
  }
  layoutGalleryGrid();
  window.addEventListener('resize', layoutGalleryGrid);

  // 4. Lightbox for Gallery
  const lightbox = document.querySelector('.regalia-lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
  let currentGalleryIndex = 0;
  const visibleGalleryImages = [];

  function updateVisibleGallery() {
    visibleGalleryImages.length = 0;
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      if (item.style.display !== 'none') {
        const img = item.querySelector('img');
        if (img) {
          visibleGalleryImages.push({
            src: img.getAttribute('src'),
            title: item.querySelector('.gallery-item-title')?.textContent || ''
          });
        }
      }
    });
  }

  function openLightbox(index) {
    updateVisibleGallery();
    if (visibleGalleryImages.length === 0 || !lightbox || !lightboxImg) return;
    currentGalleryIndex = index % visibleGalleryImages.length;
    lightboxImg.src = visibleGalleryImages[currentGalleryIndex].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryImages.length) % visibleGalleryImages.length;
      lightboxImg.src = visibleGalleryImages[currentGalleryIndex].src;
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryImages.length;
      lightboxImg.src = visibleGalleryImages[currentGalleryIndex].src;
    });
  }

  // Close lightbox on backdrop click or ESC
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 5. Sidebar Toggle for Dashboards
  const sidebarToggle = document.querySelector('.sidebar-toggle-btn');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  if (sidebarToggle && dashboardSidebar) {
    sidebarToggle.addEventListener('click', () => {
      dashboardSidebar.classList.toggle('active');
    });
  }

  // 5b. Dashboard sidebar: keep scroll position between page loads & keep active link visible
  if (dashboardSidebar) {
    const SIDEBAR_SCROLL_KEY = 'regalia_sidebar_scroll';
    const saveSidebarScroll = () => {
      try { sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(dashboardSidebar.scrollTop)); } catch (e) {}
    };

    // Restore the previous scroll position so the menu does not jump to the top
    try {
      const saved = parseInt(sessionStorage.getItem(SIDEBAR_SCROLL_KEY), 10);
      if (!isNaN(saved)) dashboardSidebar.scrollTop = saved;
    } catch (e) {}

    // Make sure the active item is visible (only scrolls if it is outside the view)
    const activeLink = dashboardSidebar.querySelector('.sidebar-link.active');
    if (activeLink) {
      activeLink.setAttribute('aria-current', 'page');
      const sbRect = dashboardSidebar.getBoundingClientRect();
      const lnRect = activeLink.getBoundingClientRect();
      if (lnRect.top < sbRect.top || lnRect.bottom > sbRect.bottom) {
        dashboardSidebar.scrollTop += (lnRect.top - sbRect.top) - (sbRect.height / 2) + (lnRect.height / 2);
      }
    }

    dashboardSidebar.addEventListener('scroll', saveSidebarScroll, { passive: true });
    dashboardSidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', saveSidebarScroll);
    });
    window.addEventListener('pagehide', saveSidebarScroll);
  }

  // Once an element's entrance animation has finished, flag it so hover transitions are instant
  function markRevealDone(el) {
    const delay = (parseFloat(getComputedStyle(el).transitionDelay) || 0) * 1000;
    setTimeout(() => el.classList.add('reveal-done'), 900 + delay);
  }

  // 6. Stripe-Level Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          markRevealDone(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => { el.classList.add('is-revealed'); markRevealDone(el); });
  }

  // Auto-apply reveal class to major section elements if not explicitly added
  document.querySelectorAll('.hall-card, .package-card, .service-editorial-card, .stat-kpi-card').forEach((card, index) => {
    if (!card.classList.contains('reveal-on-scroll')) {
      card.classList.add('reveal-on-scroll');
      const delay = (index % 3 + 1) * 100;
      card.setAttribute('data-reveal-delay', delay);
    }
  });

  // Re-run observer for newly tagged cards
  if ('IntersectionObserver' in window) {
    const autoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          markRevealDone(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach(el => autoObserver.observe(el));
  }
});
