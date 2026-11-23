# Regalia — 9-Step Booking Workflow Guide

Regalia features an interactive, front-end reactive 9-step booking journey in `booking.html`.

---

### Step-by-Step Breakdown

1. **Step 1 — Event Type Selection**: Wedding, Reception, Engagement, Anniversary, Corporate, or Private Soirée.
2. **Step 2 — Venue Selection**: Grand Imperial Ballroom, Kohinoor Palatial Hall, Royal Courtyard, Dynasty Suite, or Sapphire Terrace Lawn.
3. **Step 3 — Guest Attendance**: Host inputs expected attendance and preferred seating (Banquet Round, Theatre, Cluster, Plantain Leaf).
4. **Step 4 — Auspicious Date**: Month calendar view displaying available, tentative, and booked dates.
5. **Step 5 — Time Slot**: Morning Muhurtham (7am-2pm), Evening Reception (4pm-11pm), or Full Day (8am-11pm).
6. **Step 6 — Celebration Package**: Sovereign, Imperial, Heritage, or Custom.
7. **Step 7 — Catering Add-ons**: Pure Veg Feast (₹1,250), Imperial Gourmet (₹1,650), Mughlai & Coastal (₹2,100), plus specialty live counters.
8. **Step 8 — Host Contact**: Name, email, phone number, and special Vedic/ceremonial notes.
9. **Step 9 — Summary & Quotation**: Full transparent itemized calculation:
   $$\text{Estimated Total} = \text{Hall Base} + \text{Package} + (\text{Plate Rate} \times \text{Guests}) + \text{Add-ons} + 18\% \text{ GST}$$
   $$\text{Advance Due} = 25\% \times \text{Estimated Total}$$

### State Persistence
Upon submission, `booking.js` writes the payload to `localStorage.getItem('regalia_active_booking')` and redirects to `booking-confirmation.html`.