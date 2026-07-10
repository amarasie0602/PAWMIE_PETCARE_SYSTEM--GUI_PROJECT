# Pawmie Pet Care (Frontend Demo)

Pawmie is a pet-care web app demo built with Vue 3 + TypeScript + Vite.
It shows a complete user flow for pet parents: sign in, book services, manage bookings, browse a marketplace, add items to cart, place demo orders, and manage marketplace items from an admin page.

This project is focused on frontend UI/UX and local demo data (no real backend database yet).

## What I Built

- Authentication flow with login/signup UI
- Route protection for private pages using router guards
- Service booking flow with reusable booking form
- "My Bookings" page grouped by category, with live search/filter by pet, owner, or service
- Profile page showing the signed-in user's account details and booking stats
- Toast notification system for booking, contact form, and error feedback
- Custom 404 page for unmatched routes
- Pet marketplace with:
  - category filters
  - search
  - product detail page
  - cart
  - demo checkout
  - orders history
- Admin marketplace page to add/edit/delete demo products
- About and Contact pages powered by JSON content files
- Dark mode toggle with theme persistence
- Responsive navbar with mobile menu and protected links

## Important Demo Notes

- This is a **demo app**. Most data is saved in **browser localStorage**.
- Bookings, cart, orders, and admin-added items are device/browser specific.
- Login uses [DummyJSON auth API](https://dummyjson.com/auth/login) for demo authentication.
- Signup is simulated locally and marks the user as authenticated in localStorage.
- Admin panel uses a demo unlock code: `pawmie-admin`

## Tech Stack

- Vue 3 (beta)
- TypeScript
- Vue Router
- Pinia
- Vite
- Tailwind CSS 4

## Main Pages and Flows

- `/` - Home landing page
- `/login` and `/signup` - Authentication pages
- `/services/*` - Service-specific booking pages:
  - vet appointment
  - emergency care
  - grooming booking
  - training services
- `/booking` - Generic booking page (supports query params)
- `/my-bookings` - Shows current user's bookings, with search/filter
- `/profile` - Signed-in user's account details and booking stats
- `/marketplace` - Product listing, filter, and search
- `/marketplace/:id` - Product detail page
- `/marketplace/cart` - Cart and checkout
- `/marketplace/orders` - Order history
- `/admin/marketplace` - Demo admin product manager
- `/about`, `/contact` - Content-driven informational pages
- `*` (any unmatched route) - Custom 404 page

## Project Structure (Key Files)

- `src/router/index.ts` - routes + auth guard
- `src/composables/useAuth.ts` - login/logout/auth helpers
- `src/stores/bookingStore.ts` - booking data store and grouping logic
- `src/components/bookings/BookingForm.vue` - reusable booking form UI
- `src/views/services/` - service booking pages
- `src/views/Marketplace.vue` - marketplace listing + filter/search/cart add
- `src/views/ProductDetail.vue` - product detail + related items
- `src/views/Cart.vue` - checkout simulation
- `src/views/Orders.vue` - demo order history
- `src/views/AdminMarketplace.vue` - admin CRUD for marketplace items
- `src/stores/*.json` - static dummy content/data files

## Local Setup

### Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm or bun

### Install

```sh
npm install
```

or

```sh
bun install
```

### Run Development Server

```sh
npm run dev
```

or

```sh
bun dev
```

### Build for Production

```sh
npm run build
```

or

```sh
bun run build
```

### Preview Build

```sh
npm run preview
```

## Demo Login Credentials

Use DummyJSON sample credentials:

- Username: `emilys`
- Password: `emilyspass`

## Future Improvements

- Replace localStorage with a real backend and database
- Add proper auth/session handling with secure tokens
- Add role-based access control for admin routes
- Add form validation with better error UX
- Add automated tests (unit + e2e)
- Add CI checks and deployment pipeline
