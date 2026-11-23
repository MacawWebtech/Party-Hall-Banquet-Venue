# Regalia — Palatial Banquet Venue HTML Template
## Installation & Deployment Guide

Welcome to **Regalia – Palatial Banquets & Luxury Event Venues**. This document explains how to install, locally test, and deploy the template to any static hosting or web server.

---

### 1. File Structure Overview

```text
regalia-banquet-venue/
├── index.html                 # Main Luxury Landing Page
├── index-2.html               # Celebration & Event Discovery Landing
├── about.html                 # Palatial Heritage & Leadership
├── halls.html                 # All Venues with Capacity Filters
├── hall-details.html          # Comprehensive Single Hall Spotlight
├── services.html              # Wedding, Reception & Event Services
├── packages.html              # Packages & Comparison Matrix
├── gallery.html               # Full-Width Filtered Lightbox Gallery
├── booking.html               # 9-Step Interactive Booking Wizard
├── booking-confirmation.html  # Reservation Request Summary
├── pricing.html               # Comprehensive Price Guide (INR ₹)
├── faq.html                   # Categorized Accordion FAQs
├── blog.html                  # Celebration & Wedding Journal
├── blog-details.html          # Full Editorial Article
├── contact.html               # Location, Hours & Appointments
├── login.html                 # Client & Admin Login Portal
├── register.html              # Guest Registration
├── forgot-password.html       # Credential Recovery
├── 404.html                   # Royal 404 Error Page
├── coming-soon.html           # New Glass Pavilion Countdown
├── maintenance.html           # System Refinement Notice
│
├── client-dashboard/          # 13 Dedicated Client Portal Pages
│   ├── index.html             # Overview & Upcoming Event
│   ├── bookings.html          # My Bookings List
│   ├── booking-details.html   # Detailed Booking View
│   ├── availability.html      # Interactive Hall Calendar
│   ├── new-booking.html       # Guided New Reservation
│   ├── my-events.html         # Timeline of Events
│   ├── packages.html          # Package Upgrades
│   ├── catering.html          # Catering Menu & Dietary Add-ons
│   ├── payment-history.html   # Transactions & Receipts
│   ├── invoices.html          # State Luxury Tax Invoices
│   ├── messages.html          # Concierge Chat
│   ├── profile.html           # Guest Profile & Preferences
│   └── settings.html          # Password & Notifications
│
├── admin/                     # 16 Dedicated Venue Operations Pages
│   ├── index.html             # Executive Overview & KPI Metrics
│   ├── bookings.html          # Full Booking Approval & Management
│   ├── halls.html             # Hall Inventory & Tariffs
│   ├── hall-availability.html # Master Calendar & Date Blocker
│   ├── customers.html         # Host CRM Directory
│   ├── event-types.html       # Event Multipliers & Hall Assignments
│   ├── packages.html          # Package Configurator
│   ├── catering.html          # Menus & Plate Rates
│   ├── add-ons.html           # Specialty Lounges & Production
│   ├── payments.html          # Payment Ledger
│   ├── invoices.html          # GST Invoice Generation
│   ├── messages.html          # Concierge Inbox
│   ├── gallery.html           # Photography Management
│   ├── reviews.html           # Testimonial Approval
│   ├── reports.html           # Analytics & Financial Export
│   └── settings.html          # Venue Rules & Business Policies
│
├── assets/
│   ├── css/                   # style.css, dark-mode.css, rtl.css, responsive.css, dashboard.css, components.css
│   └── js/                    # main.js, theme.js, booking.js, calendar.js, client-dashboard.js, admin-dashboard.js, forms.js
│
├── documentation/             # Markdown Developer Guides
├── sitemap.xml                # SEO Sitemap
├── robots.txt                 # Search Engine Directives
└── README.md                  # Project Readme
```

---

### 2. Local Previewing

To preview the template on your local workstation:

1. **Direct Browser Opening**:
   Double click `index.html` to open directly in any modern browser (Chrome, Edge, Safari, Firefox).
   
2. **Local HTTP Server (Recommended)**:
   For local storage persistence and smooth font rendering, run a lightweight static web server:
   ```bash
   # Using Python 3:
   python -m http.server 8080

   # Or using Node npx:
   npx serve .
   ```
   Open `http://localhost:8080` in your web browser.

---

### 3. Production Deployment

#### Deploying to Netlify / Vercel
1. Upload the entire project directory to GitHub or drag-and-drop into Netlify Drop.
2. Build command: None required (static HTML5/CSS3/ES6).
3. Publish directory: `.` (root directory).

#### Deploying to Apache / Nginx / cPanel
1. Connect via FTP or cPanel File Manager.
2. Upload all files into the `public_html` directory.
3. Ensure `.htaccess` or Nginx conf has standard MIME types enabled for SVG, WOFF2, and CSS.