/**
 * REGALIA — Form Validation & Interaction Handler
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Contact Form
  const contactForm = document.getElementById('regalia-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.querySelector('[name="name"]')?.value;
      const responseBox = document.getElementById('contact-form-feedback');

      if (responseBox) {
        responseBox.style.display = 'block';
        responseBox.className = 'alert-regalia';
        responseBox.innerHTML = `
          <i class="bi bi-check-circle-fill" style="font-size: 1.3rem;"></i>
          <div>
            <strong>Thank you, ${name || 'esteemed guest'}!</strong><br>
            Your palatial event enquiry has been received. Our senior event concierge will contact you within 4 business hours.
          </div>
        `;
      }
      contactForm.reset();
    });
  }

  // Newsletter Form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing to Regalia The Newport Gazette. Exclusive celebration privileges will be sent to ${emailInput.value}.`);
        emailInput.value = '';
      }
    });
  });

  // Login form handler simulation
  const loginForm = document.getElementById('regalia-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value;
      const isAdmin = email && email.includes('admin');
      if (isAdmin) {
        window.location.href = 'admin/index.html';
      } else {
        window.location.href = 'client-dashboard/index.html';
      }
    });
  }
});
