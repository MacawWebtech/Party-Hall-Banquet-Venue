/**
 * REGALIA — Client Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Seed sample bookings if none in localStorage
  function getClientBookings() {
    let bookings = [];
    try {
      const stored = localStorage.getItem('regalia_all_bookings');
      if (stored) {
        bookings = JSON.parse(stored);
      }
    } catch (e) {
      console.warn(e);
    }

    if (bookings.length === 0) {
      bookings = [
        {
          referenceNumber: 'REG-849201',
          eventType: 'Grand Wedding & Reception',
          venueName: 'Grand Imperial Ballroom',
          eventDate: '2026-12-18',
          guestCount: 650,
          packageName: 'Royal Sovereign Wedding',
          status: 'Confirmed',
          paymentStatus: 'Advance Received',
          amount: 845000,
          advancePaid: 211250
        },
        {
          referenceNumber: 'REG-712890',
          eventType: 'Engagement & Sangeet Gala',
          venueName: 'Kohinoor Palatial Hall',
          eventDate: '2027-01-24',
          guestCount: 350,
          packageName: 'Heritage Engagement',
          status: 'Review Underway',
          paymentStatus: 'Pending Verification',
          amount: 520000,
          advancePaid: 0
        },
        {
          referenceNumber: 'REG-563219',
          eventType: 'Silver Jubilee Anniversary',
          venueName: 'Royal Courtyard & Pavilion',
          eventDate: '2026-10-15',
          guestCount: 220,
          packageName: 'Bespoke Celebration Suite',
          status: 'Completed',
          paymentStatus: 'Fully Settled',
          amount: 380000,
          advancePaid: 380000
        }
      ];
      localStorage.setItem('regalia_all_bookings', JSON.stringify(bookings));
    }
    return bookings;
  }

  // Populate Bookings Table if on bookings or overview page
  const bookingsTableBody = document.getElementById('client-bookings-table-body');
  if (bookingsTableBody) {
    const bookings = getClientBookings();
    let rowsHtml = '';

    bookings.forEach(b => {
      let badgeClass = 'badge-status-pending';
      if (b.status === 'Confirmed') badgeClass = 'badge-status-confirmed';
      if (b.status === 'Completed') badgeClass = 'badge-status-confirmed';
      if (b.status === 'Cancelled') badgeClass = 'badge-status-cancelled';

      rowsHtml += `
        <tr>
          <td><strong style="color: var(--color-plum);">${b.referenceNumber}</strong></td>
          <td>
            <strong>${b.eventType}</strong><br>
            <small class="text-muted"><i class="bi bi-geo-alt"></i> ${b.venueName}</small>
          </td>
          <td>${b.eventDate}</td>
          <td>${b.guestCount} Guests</td>
          <td><span class="badge-status ${badgeClass}">${b.status}</span></td>
          <td>
            <span style="font-weight: 600;">₹${(b.amount || 750000).toLocaleString('en-IN')}</span><br>
            <small class="text-muted">${b.paymentStatus}</small>
          </td>
          <td>
            <div class="d-flex gap-2">
              <a href="booking-details.html?ref=${b.referenceNumber}" class="btn-action-icon" title="View Full Details">
                <i class="bi bi-eye"></i>
              </a>
              <button type="button" class="btn-action-icon btn-reschedule" data-ref="${b.referenceNumber}" title="Request Reschedule">
                <i class="bi bi-calendar3"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    bookingsTableBody.innerHTML = rowsHtml;
  }

  // Reschedule & cancellation handlers
  document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-reschedule')) {
      const ref = e.target.closest('.btn-reschedule').getAttribute('data-ref');
      const newDate = prompt(`Request date change for booking reference ${ref}.\nEnter preferred new date (YYYY-MM-DD):`);
      if (newDate) {
        alert(`Rescheduling request for ${ref} to ${newDate} has been lodged with the venue concierge team.`);
      }
    }
  });
});
