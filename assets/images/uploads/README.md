# Regalia – Image Upload Guide

All website images live in `assets/images/uploads/`. Every image on the site already points to a file here,
so to use your own photo **save it with the same file name in the same sub-folder** (it overwrites the placeholder).
No code changes are needed. If your photo is a different type (e.g. `.png` or `.webp`), either convert it to `.jpg`
or update the path in the HTML file(s) listed in the "Used on" column.

## Folders

| Folder | What goes inside |
|---|---|
| `banners/` | Page heading background images (one per page) and the Home 1 hero image |
| `halls/` | Ballroom / hall photos (used on Home 1, Home 2 and Halls) |
| `gallery/` | Gallery page photos |
| `services/` | Services page photos |
| `team/` | Leadership portraits (About, Blog details) |
| `testimonials/` | Guest photos for the Home 1 testimonials |
| `blog/` | Blog list and blog post photos |
| `hall-details/` | Hall details page photos |
| `home-2/` | Home 2 photos |
| `about/` | About page photos |
| `general/` | Social-share image (`og-image.jpg`) |

## Heading background images

Page headings use the class `page-banner`. The image path is set inline in each page, for example:

```html
<section class="section-full-sm page-banner" style="background-image: url('assets/images/uploads/banners/about-banner.jpg'); ...">
```

The dark overlay that keeps the heading text readable is in `assets/css/components.css` (`.page-banner::before`).

## Every image slot

| File | Recommended size | Used on |
|---|---|---|
| `about/estate-chandelier-ballroom.jpg` | 1200 x 900 px | index.html |
| `about/regalia-newport-estate.jpg` | 1200 x 900 px | about.html |
| `about/values-banquet-table.jpg` | 1200 x 900 px | about.html |
| `banners/about-banner.jpg` | 1920 x 600 px | about.html |
| `banners/blog-banner.jpg` | 1920 x 600 px | blog.html |
| `banners/blog-details-banner.jpg` | 1920 x 600 px | blog-details.html |
| `banners/booking-banner.jpg` | 1920 x 600 px | booking.html |
| `banners/contact-banner.jpg` | 1920 x 600 px | contact.html |
| `banners/faq-banner.jpg` | 1920 x 600 px | faq.html |
| `banners/gallery-banner.jpg` | 1920 x 600 px | gallery.html |
| `banners/hall-details-banner.jpg` | 1920 x 600 px | hall-details.html |
| `banners/halls-banner.jpg` | 1920 x 600 px | halls.html |
| `banners/home-hero.jpg` | 1920 x 1080 px | index.html |
| `banners/packages-banner.jpg` | 1920 x 600 px | packages.html |
| `banners/pricing-banner.jpg` | 1920 x 600 px | pricing.html |
| `banners/services-banner.jpg` | 1920 x 600 px | services.html |
| `blog/chandelier-lighting.jpg` | 1200 x 800 px | blog.html |
| `blog/courtyard-sangeet.jpg` | 1200 x 800 px | blog.html |
| `blog/featured-wedding-planning.jpg` | 1200 x 800 px | blog.html |
| `blog/post-palatial-wedding-hall.jpg` | 1200 x 800 px | blog-details.html |
| `blog/royal-catering-menu.jpg` | 1200 x 800 px | blog.html |
| `gallery/bohemian-chandeliers.jpg` | 1200 x 900 px | admin/gallery.html, gallery.html |
| `gallery/fairy-light-starlit-lawn.jpg` | 1200 x 900 px | gallery.html |
| `gallery/garden-courtyard-aisle.jpg` | 1200 x 900 px | gallery.html |
| `gallery/gourmet-catering-pavilion.jpg` | 1200 x 900 px | gallery.html |
| `gallery/imperial-round-banquet.jpg` | 1200 x 900 px | gallery.html |
| `gallery/palatial-facade-dusk.jpg` | 1200 x 900 px | gallery.html |
| `gallery/royal-floral-mandap.jpg` | 1200 x 900 px | gallery.html |
| `gallery/royal-tableware-crystal.jpg` | 1200 x 900 px | gallery.html |
| `gallery/warm-architectural-ambiance.jpg` | 1200 x 900 px | gallery.html |
| `general/og-image.jpg` | 1200 x 630 px | 404.html, about.html, blog-details.html, blog.html, booking-confirmation.html, booking.html, coming-soon.html, contact.html, faq.html, forgot-password.html, gallery.html, hall-details.html, halls.html, index-2.html, index.html, login.html, maintenance.html, packages.html, pricing.html, register.html, services.html |
| `hall-details/ballroom-main-view.jpg` | 1600 x 1000 px | hall-details.html |
| `hall-details/chandelier-detail.jpg` | 900 x 600 px | hall-details.html |
| `hall-details/stage-mandap-setup.jpg` | 900 x 600 px | hall-details.html |
| `halls/grand-imperial-ballroom.jpg` | 1200 x 800 px | admin/gallery.html, halls.html, index-2.html, index.html |
| `halls/kohinoor-palatial-hall.jpg` | 1200 x 800 px | halls.html, index-2.html, index.html |
| `halls/royal-courtyard-pavilion.jpg` | 1200 x 800 px | index-2.html, index.html |
| `home-2/banquet-catering.jpg` | 1200 x 800 px | index-2.html |
| `home-2/society-wedding-celebration.jpg` | 1200 x 800 px | index-2.html |
| `services/cocktail-galas.jpg` | 900 x 600 px | services.html |
| `services/corporate-conclaves.jpg` | 900 x 600 px | services.html |
| `services/royal-wedding-ceremonies.jpg` | 900 x 600 px | services.html |
| `services/sangeet-mehendi-evenings.jpg` | 900 x 600 px | services.html |
| `services/starlit-lawn-soirees.jpg` | 900 x 600 px | services.html |
| `services/wedding-receptions.jpg` | 900 x 600 px | services.html |
| `team/chef-julian-thorne.jpg` | 400 x 400 px | about.html |
| `team/eleanor-vance-sterling.jpg` | 400 x 400 px | about.html, blog-details.html |
| `team/harrison-montgomery.jpg` | 400 x 400 px | about.html |
| `team/marcus-alexander.jpg` | 400 x 400 px | about.html |
| `testimonials/charlotte-kensington.jpg` | 400 x 400 px | index.html |
| `testimonials/eleanor-whitfield.jpg` | 400 x 400 px | index.html |
| `testimonials/michael-harrington.jpg` | 400 x 400 px | index.html |

Tips: keep each photo under ~300 KB (JPG, quality 75-85). `og-image.jpg` is the preview shown when a page is shared;
social sites need a full address, so replace the relative `og:image` path with `https://your-domain/assets/images/uploads/general/og-image.jpg` after you publish.
