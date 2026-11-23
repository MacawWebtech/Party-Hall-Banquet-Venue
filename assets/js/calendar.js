/**
 * REGALIA — Interactive Booking Calendar
 */

class RegaliaCalendar {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      onSelect: null,
      bookedDates: ['2026-11-25', '2026-11-28', '2026-12-05', '2026-12-12', '2026-12-25', '2026-12-31'],
      tentativeDates: ['2026-11-26', '2026-12-08', '2026-12-18']
    }, options);

    this.currentDate = new Date();
    this.selectedDate = null;

    this.render();
  }

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let html = `
      <div class="calendar-widget">
        <div class="calendar-header">
          <button type="button" class="btn-action-icon prev-month-btn" aria-label="Previous Month">
            <i class="bi bi-chevron-left"></i>
          </button>
          <h4 class="calendar-month-title">${monthNames[month]} ${year}</h4>
          <button type="button" class="btn-action-icon next-month-btn" aria-label="Next Month">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        <div class="calendar-grid-header">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="calendar-days-grid">
    `;

    // Blank cells before first day
    for (let i = 0; i < firstDayIndex; i++) {
      html += `<div class="calendar-day-cell disabled" style="opacity: 0.15; cursor: default;"></div>`;
    }

    // Days of month
    for (let day = 1; day <= totalDays; day++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      let statusClass = 'status-available';
      let title = 'Available for Booking';
      let isBooked = this.options.bookedDates.includes(dateStr);
      let isTentative = this.options.tentativeDates.includes(dateStr);

      if (isBooked) {
        statusClass = 'status-booked';
        title = 'Booked / Unavailable';
      } else if (isTentative) {
        statusClass = 'status-tentative';
        title = 'Tentative Reservation';
      }

      const isSelected = this.selectedDate === dateStr ? 'selected' : '';

      html += `
        <div class="calendar-day-cell ${statusClass} ${isSelected}" 
             data-date="${dateStr}" 
             title="${title}"
             ${isBooked ? 'aria-disabled="true"' : 'role="button" tabindex="0"'}>
          <span>${day}</span>
        </div>
      `;
    }

    html += `
        </div>
        <div class="calendar-legend">
          <div class="legend-item"><span class="legend-dot available"></span> Available</div>
          <div class="legend-item"><span class="legend-dot tentative"></span> Tentative</div>
          <div class="legend-item"><span class="legend-dot booked"></span> Booked</div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEvents();
  }

  attachEvents() {
    const prevBtn = this.container.querySelector('.prev-month-btn');
    const nextBtn = this.container.querySelector('.next-month-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
      });
    }

    const dayCells = this.container.querySelectorAll('.calendar-day-cell:not(.disabled):not(.status-booked)');
    dayCells.forEach(cell => {
      cell.addEventListener('click', () => {
        const date = cell.getAttribute('data-date');
        this.selectedDate = date;
        this.container.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');

        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect(date);
        }
      });
    });
  }
}

window.RegaliaCalendar = RegaliaCalendar;
