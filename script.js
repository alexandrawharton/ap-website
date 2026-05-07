/* =============================================
   AP Study Hub — script.js
   Handles: nav highlighting, subject filter,
   workload bar animation, smooth page feel
   ============================================= */

'use strict';

/* -----------------------------------------------
   NAV — mark active link based on current page
----------------------------------------------- */
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page);
  });
}

/* -----------------------------------------------
   WORKLOAD BARS — animate on page load
   Each .workload-fill has data-pct="75" etc.
----------------------------------------------- */
function animateWorkloadBars() {
  const bars = document.querySelectorAll('.workload-fill[data-pct]');
  if (!bars.length) return;

  // Small delay so the animation is visible after page load
  setTimeout(() => {
    bars.forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 300);
}

/* -----------------------------------------------
   SUBJECT FILTER — filter cards by category
   Buttons have data-filter="all|math|science|…"
   Cards have data-category="math" etc.
----------------------------------------------- */
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.subject-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards with a fade
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          // Re-trigger the fade-up animation
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -----------------------------------------------
   CARD HOVER — subtle scale on topic tags
----------------------------------------------- */
function initCardInteractions() {
  document.querySelectorAll('.topics-list li').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-1px)';
      tag.style.transition = '0.18s ease';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });
}

/* -----------------------------------------------
   STAGGER card animations on the study page
----------------------------------------------- */
function staggerCards() {
  document.querySelectorAll('.subject-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
  });
}

/* -----------------------------------------------
   BOOT — run everything on DOM ready
----------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  staggerCards();
  animateWorkloadBars();
  initFilter();
  initCardInteractions();
});
