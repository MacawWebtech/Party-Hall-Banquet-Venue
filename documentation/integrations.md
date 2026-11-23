# Regalia — Backend Integration Guide

As a commercial static HTML5 template, Regalia provides explicit integration-ready entry points:

---

### 1. Contact & Enquiry Forms
- Currently wired to `assets/js/forms.js`.
- **Formspree Integration**: Replace the `<form>` action with your Formspree endpoint:
  ```html
  <form action="https://formspree.io/f/{your_form_id}" method="POST">
  ```
- **Netlify Forms**: Simply add `data-netlify="true"` to any form tag.

---

### 2. Payment Gateway Integration
- Advance deposits calculate 25% of the total estimate.
- **Razorpay**:
  Include `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` and trigger `options = { amount: advanceAmount * 100, currency: "INR" }`.
- **Stripe**:
  Use Stripe Checkout Sessions with the calculated advance deposit.

---

### 3. Database & Authentication
- Connect `login.html` and `register.html` to Firebase Auth, Supabase, or your custom Node.js / Laravel backend.