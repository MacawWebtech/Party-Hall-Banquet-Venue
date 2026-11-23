/**
 * REGALIA — Admin Dashboard Controller
 * Venue Operations, Hall Availability & Booking Management
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const adminTableBody = document.getElementById('admin-bookings-table-body');
  if (adminTableBody) {
    let bookings = [];
    try {
      const stored = localStorage.getItem('regalia_all_bookings');
      if (stored) bookings = JSON.parse(stored);
    } catch (e) {
      console.warn(e);
    }

    if (bookings.length === 0) {
      bookings = [
        {
          referenceNumber: 'REG-849201',
          customerName: 'Alexander & Charlotte Kensington',
          phone: '+1 (800) 542-7342',
          venueName: 'Grand Imperial Ballroom',
          eventDate: '2026-12-18',
          guestCount: 650,
          status: 'Confirmed',
          amount: 845000
        },
        {
          referenceNumber: 'REG-712890',
          customerName: 'William Vanderbilt-Hayes',
          phone: '+1 (212) 980-4420',
          venueName: 'Kohinoor Palatial Hall',
          eventDate: '2027-01-24',
          guestCount: 350,
          status: 'Pending',
          amount: 520000
        },
        {
          referenceNumber: 'REG-991204',
          customerName: 'Bradford & Sarah Sterling',
          phone: '+1 (617) 542-8810',
          venueName: 'Sapphire Terrace Lawn',
          eventDate: '2026-12-30',
          guestCount: 280,
          status: 'Pending',
          amount: 410000
        }
      ];
    }

    function renderAdminTable(data) {
      let html = '';
      data.forEach((item, index) => {
        let badgeClass = 'badge-status-pending';
        if (item.status === 'Confirmed') badgeClass = 'badge-status-confirmed';
        if (item.status === 'Cancelled' || item.status === 'Rejected') badgeClass = 'badge-status-cancelled';

        html += `
          <tr>
            <td><strong style="color: var(--color-plum);">${item.referenceNumber}</strong></td>
            <td>
              <strong>${item.customerName || 'Celebration Host'}</strong><br>
              <small class="text-muted"><i class="bi bi-telephone"></i> ${item.phone || '+1 (401) 847-0000'}</small>
            </td>
            <td>
              <strong>${item.venueName}</strong><br>
              <small class="text-muted"><i class="bi bi-calendar-event"></i> ${item.eventDate}</small>
            </td>
            <td>${item.guestCount} Guests</td>
            <td>₹${(item.amount || 650000).toLocaleString('en-IN')}</td>
            <td><span class="badge-status ${badgeClass}" id="admin-badge-${index}">${item.status}</span></td>
            <td>
              <div class="d-flex gap-2">
                <button type="button" class="btn-action-icon btn-approve" data-index="${index}" title="Approve Reservation">
                  <i class="bi bi-check-lg" style="color: var(--color-plum);"></i>
                </button>
                <button type="button" class="btn-action-icon btn-reject" data-index="${index}" title="Reject Reservation">
                  <i class="bi bi-x-lg" style="color: var(--color-black);"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });
      adminTableBody.innerHTML = html;
    }

    renderAdminTable(bookings);

    // Event delegation for approve/reject
    adminTableBody.addEventListener('click', function (e) {
      const approveBtn = e.target.closest('.btn-approve');
      const rejectBtn = e.target.closest('.btn-reject');

      if (approveBtn) {
        const idx = approveBtn.getAttribute('data-index');
        bookings[idx].status = 'Confirmed';
        renderAdminTable(bookings);
        localStorage.setItem('regalia_all_bookings', JSON.stringify(bookings));
        alert(`Booking ${bookings[idx].referenceNumber} has been officially Confirmed.`);
      }

      if (rejectBtn) {
        const idx = rejectBtn.getAttribute('data-index');
        bookings[idx].status = 'Rejected';
        renderAdminTable(bookings);
        localStorage.setItem('regalia_all_bookings', JSON.stringify(bookings));
        alert(`Booking ${bookings[idx].referenceNumber} marked as Rejected.`);
      }
    });

    // Search filter
    const searchInput = document.getElementById('admin-booking-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filtered = bookings.filter(b => 
          b.referenceNumber.toLowerCase().includes(query) ||
          (b.customerName && b.customerName.toLowerCase().includes(query)) ||
          b.venueName.toLowerCase().includes(query)
        );
        renderAdminTable(filtered);
      });
    }
  }
});
