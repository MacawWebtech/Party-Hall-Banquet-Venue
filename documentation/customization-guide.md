# Regalia — Customization Guide
## Branding, Colours, Typography & Content

This guide explains how buyers can adapt the **Regalia** template to their exact brand identity.

---

### 1. Strict Three-Colour Brand System

Regalia strictly uses only three brand colours and their tonal variations:

| Colour Name | Hex Code | Primary Usage |
|---|---|---|
| **Obsidian Black** | `#171419` | Dark sections, primary headings, premium backgrounds |
| **Warm Ivory** | `#F6F0E7` | Light backgrounds, editorial cards, body contrast |
| **Royal Plum** | `#54264B` | Primary brand accent, CTA buttons, active pills |

#### How to update the colours:
Open `assets/css/style.css` and locate the root variables:
```css
:root {
  --color-black: #171419;
  --color-ivory: #F6F0E7;
  --color-plum:  #54264B; /* Primary Accent */
  
  --color-plum-hover: #431d3c;
  --color-plum-light: #6e3362;
  --color-ivory-light: #fcf9f5;
  --color-ivory-dark: #ede5d8;
}
```
All components, buttons, badges, tables, and borders inherit from these custom properties.

---

### 2. Typography Customization

Regalia strictly pairs two Google Fonts:
1. **Playfair Display** — Headings, hero headlines, editorial pull-quotes.
2. **Inter** — Body text, interface labels, tables, navigation, and dashboard elements.

In `assets/css/style.css`:
```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
}
```

---

### 3. Modifying Hall Details & Tariffs

To modify venue capacities and pricing in the booking engine, open `assets/js/booking.js`:
```javascript
const VENUES = {
  'hall-imperial': { name: 'Grand Imperial Ballroom', basePrice: 350000, capacity: '500 - 1500 Guests' },
  'hall-kohinoor': { name: 'Kohinoor Palatial Hall', basePrice: 280000, capacity: '300 - 800 Guests' },
  ...
};
```

---

### 4. Updating Catering Menu Rates

In `assets/js/booking.js`:
```javascript
const CATERING_PLATE = {
  'grand-veg': { name: 'Grand Royal Vegetarian Feast', rate: 1250 },
  'imperial-nonveg': { name: 'Imperial Multi-Cuisine Gourmet', rate: 1650 },
  'mughlai-coastal': { name: 'Royal Mughlai & Coastal Banquet', rate: 2100 }
};
```