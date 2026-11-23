/**
 * REGALIA — Theme & RTL Controller
 * Controls Light/Dark mode and LTR/RTL layout direction.
 * Adheres strictly to Obsidian Black (#171419), Warm Ivory (#F6F0E7), Royal Plum (#54264B).
 */

(function () {
  'use strict';

  const THEME_KEY = 'regalia_theme';
  const DIR_KEY = 'regalia_dir';

  // Apply saved theme or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcons(savedTheme);
    } else {
      // Default to Light Mode as requested in prompt, with system auto-detect support
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', initialTheme);
      updateThemeIcons(initialTheme);
    }
  }

  // Apply saved RTL or LTR
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateDirIcons(savedDir);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcons(newTheme);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem(DIR_KEY, newDir);
    updateDirIcons(newDir);
  }

  function updateThemeIcons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun';
          btn.setAttribute('title', 'Switch to Warm Ivory Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars';
          btn.setAttribute('title', 'Switch to Obsidian Dark Mode');
        }
      }
    });
  }

  function updateDirIcons(dir) {
    const buttons = document.querySelectorAll('.rtl-toggle-btn');
    buttons.forEach(btn => {
      const text = btn.querySelector('.dir-label');
      if (text) {
        text.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)');
    });
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();

    // Bind event listeners to all theme toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Bind event listeners to all RTL toggles
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDirection();
      });
    });
  });

  // Export to window for inline calls if needed
  window.RegaliaTheme = {
    toggleTheme,
    toggleDirection
  };
})();
