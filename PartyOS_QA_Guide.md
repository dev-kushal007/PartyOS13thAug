# PartyOS — QA Guide & UX Checklist
**Version 1.0 | Sep 2026**

A single reference for QA engineers covering end-to-end test flows, per-page UX acceptance criteria, and platform-specific (web/mobile) verification points.

---

## Table of Contents
1. [App Architecture at a Glance](#1-app-architecture-at-a-glance)
2. [End-to-End User Flows](#2-end-to-end-user-flows)
   - 2.1 Guest Discovery → Booking (Happy Path)
   - 2.2 Logged-in Returning User Quick Rebook
   - 2.3 New User Registration via Discount Nudge
   - 2.4 Search → Filter → Compare → Book
   - 2.5 Failed / Abandoned Payment Recovery
   - 2.6 Admin Monitoring Flow
3. [Page-by-Page UX Checklist](#3-page-by-page-ux-checklist)
   - 3.1 Global / Navigation
   - 3.2 Home Page
   - 3.3 Search & Filter Page
   - 3.4 Experience Detail Page
   - 3.5 Login / Signup Modal
   - 3.6 Booking Review Page
   - 3.7 Payment Page
   - 3.8 Booking Confirmation Page
   - 3.9 Profile / My Bookings Page
   - 3.10 Admin Dashboard
4. [Web vs. Mobile Experience Matrix](#4-web-vs-mobile-experience-matrix)
5. [Cross-Cutting Quality Concerns](#5-cross-cutting-quality-concerns)
6. [Regression Smoke Checklist](#6-regression-smoke-checklist)

---

## 1. App Architecture at a Glance

| Page Key       | Route / State     | Auth Required | Notes                                  |
|----------------|-------------------|---------------|----------------------------------------|
| `home`         | Landing           | No            | Hero carousel, featured venues         |
| `search`       | Search results    | No            | Two-row sticky filters, card grid      |
| `detail`       | Venue detail      | No (view)     | Must be logged in to proceed to review |
| `review`       | Booking review    | Yes           | Pax, date, time summary                |
| `payment`      | Payment checkout  | Yes           | 10% advance, card form                 |
| `confirmation` | Booking confirmed | Yes           | No footer shown                        |
| `profile`      | My bookings       | Yes           | Booking history, user info             |
| `admin`        | Admin dashboard   | Yes (admin)   | Sidebar nav, charts, venue management  |

**Overlays / Modals:**
- `LoginModal` — OTP + email auth, optional discount-nudge variant
- `CompareModal` — side-by-side comparison of up to N venues
- `FilterDropdown` — inline filter popovers on search page

---

## 2. End-to-End User Flows

### Flow 2.1 — Guest Discovery → Booking (Happy Path)

> **Persona:** First-time corporate event planner, not logged in. Wants to book a rooftop venue in Bangalore for 40 people.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open app at `/` | Home page loads; hero carousel auto-rotates; no auth state | ☐ |
| 2 | Type "rooftop" in the search bar widget | Input accepts text; no error state | ☐ |
| 3 | Set guest count to 40 using the `+/−` control | Value updates; does not exceed capacity limits | ☐ |
| 4 | Click "Search Experiences" / hit Enter | Navigates to search page; results visible | ☐ |
| 5 | Apply "Rooftop" venue-type filter from row 2 | Card grid re-filters; applied filter chip is highlighted | ☐ |
| 6 | Scroll down 2+ card rows | Discount nudge popup appears (one-time, first visit only) | ☐ |
| 7 | Dismiss the discount nudge (×) | Popup closes; does not reappear on same session | ☐ |
| 8 | Hover over a venue card | Image carousel cycles at 1.5 s intervals | ☐ |
| 9 | Click "View Details" on Skydeck Brewery | Detail page loads; back-breadcrumb visible | ☐ |
| 10 | Click "Book Now" | Login modal opens (guest cannot proceed without auth) | ☐ |
| 11 | Enter email address | OTP field appears; "Check your inbox" message shown | ☐ |
| 12 | Enter valid OTP | Modal closes; user is logged in; Booking Review page loads | ☐ |
| 13 | Confirm pax, date, time on Review page | Summary reflects choices; total and 10% advance shown | ☐ |
| 14 | Click "Proceed to Payment" | Payment page loads; card form is present | ☐ |
| 15 | Enter card details and submit | Processing spinner shows ~2.2 s; then Confirmation page | ☐ |
| 16 | View Confirmation page | Booking reference, venue name, date, host contact visible | ☐ |
| 17 | Click "View My Bookings" | Profile page opens with the new booking listed | ☐ |

---

### Flow 2.2 — Logged-in Returning User Quick Rebook

> **Persona:** User who booked before; already logged in; wants to rebook from profile.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open app; user is pre-authenticated | Navbar shows avatar/initials, no login CTA | ☐ |
| 2 | Navigate to Profile via navbar avatar | Profile page shows previous bookings | ☐ |
| 3 | Click "Book Again" on a past booking | Detail page of that venue loads | ☐ |
| 4 | Click "Book Now" | Skips login — goes directly to Booking Review | ☐ |
| 5 | Adjust guest count | Count updates; price recalculates | ☐ |
| 6 | Proceed through payment to confirmation | Same flow as 2.1 steps 14–17 | ☐ |

---

### Flow 2.3 — New User Registration via Discount Nudge

> **Persona:** Guest browsing the detail page; triggered by the 1.5 s auto-nudge.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Open any venue detail page | Page loads fully | ☐ |
| 2 | Wait 1.5 seconds without interaction | Discount nudge popup appears | ☐ |
| 3 | Nudge shows "Sign up & save" messaging | Gold discount badge / promo copy is visible | ☐ |
| 4 | Click "Sign Up" inside the nudge | Auth modal opens in signup variant | ☐ |
| 5 | Complete OTP signup | User is logged in; modal closes | ☐ |
| 6 | Nudge does not reappear on this session | Navigate away and back to detail — nudge absent | ☐ |
| 7 | "Book Now" now goes directly to Review | Confirm no second login prompt | ☐ |

---

### Flow 2.4 — Search → Filter → Compare → Book

> **Persona:** Procurement manager comparing 2 venues before deciding.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | On Search page, apply city "Mumbai" from nav city picker | Results filter to Mumbai venues only | ☐ |
| 2 | Apply budget filter ≤ ₹2,000 per person | Cards outside budget are hidden | ☐ |
| 3 | Apply "Team Dinner" experience type filter | Grid narrows further; filter chip active | ☐ |
| 4 | Hover over a card; click the scale/compare icon in overlay | Venue added to compare bar at bottom | ☐ |
| 5 | Add a second venue to compare bar | Bar shows 2 venues; "Compare" CTA enabled | ☐ |
| 6 | Click "Compare" in compare bar | CompareModal opens with side-by-side columns | ☐ |
| 7 | Review amenities, price, capacity, rating in modal | All data columns populate correctly | ☐ |
| 8 | Click "Book This" on preferred venue in modal | Navigates to Detail page; modal closes | ☐ |
| 9 | Complete booking (logged-in) | Confirmation page reached | ☐ |

---

### Flow 2.5 — Failed / Abandoned Payment Recovery

> **Persona:** User reaches payment but gets distracted or payment fails.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | On Payment page, click "← Back" | Returns to Booking Review; inputs preserved | ☐ |
| 2 | On Booking Review, click "← Back" | Returns to Detail page | ☐ |
| 3 | Navigate away to Home via navbar | No crash; clean state | ☐ |
| 4 | Return to Search and re-open same venue | Detail page shows correct data | ☐ |
| 5 | Re-initiate booking | Review page re-populates (or starts fresh) | ☐ |

---

### Flow 2.6 — Admin Monitoring Flow

> **Persona:** PartyOS admin reviewing bookings and venue performance.

| Step | Action | Expected Result | Pass/Fail |
|------|--------|-----------------|-----------|
| 1 | Click "Admin" in navbar (when logged in) | Admin Dashboard loads; sidebar visible | ☐ |
| 2 | Review KPI tiles at top | Revenue, bookings, active venues, growth metrics shown | ☐ |
| 3 | Review AreaChart and BarChart | Charts render with data; tooltips work on hover | ☐ |
| 4 | Browse venue table / list | All venues listed; status indicators correct | ☐ |
| 5 | Click "Go to Home" in sidebar | Returns to Home page cleanly | ☐ |
| 6 | Footer is not shown on admin page | Confirm no footer rendering | ☐ |

---

## 3. Page-by-Page UX Checklist

> **Legend:** ☐ = Untested | ✓ = Pass | ✗ = Fail  
> Test on both Desktop (≥1280 px) and Mobile (375–430 px) unless noted.

---

### 3.1 Global / Navigation

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| G1 | Logo click always returns to Home | ☐ | ☐ |
| G2 | Navbar is sticky; does not jitter on scroll | ☐ | ☐ |
| G3 | City picker dropdown opens and closes cleanly | ☐ | ☐ |
| G4 | Selected city persists across page navigations | ☐ | ☐ |
| G5 | "Experiences" nav link goes to Search page | ☐ | ☐ |
| G6 | "My Bookings" shown only when logged in | ☐ | ☐ |
| G7 | "Admin" link shown only when logged in | ☐ | ☐ |
| G8 | Hamburger menu opens on mobile (< 768 px) | — | ☐ |
| G9 | Hamburger menu contains all nav items | — | ☐ |
| G10 | Hamburger menu closes after any nav click | — | ☐ |
| G11 | Login/avatar button is always accessible in navbar | ☐ | ☐ |
| G12 | Page transition is smooth; no white flash | ☐ | ☐ |
| G13 | Active page state not causing stuck transitions | ☐ | ☐ |

---

### 3.2 Home Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| H1 | Hero carousel auto-rotates; interval is perceptible (not too fast) | ☐ | ☐ |
| H2 | Manual carousel arrow controls work (prev/next) | ☐ | ☐ |
| H3 | Carousel dots/indicators reflect current slide | ☐ | ☐ |
| H4 | Hero text is legible over image (sufficient contrast) | ☐ | ☐ |
| H5 | Search widget in hero: all 3 fields (search, pax, budget) are usable | ☐ | ☐ |
| H6 | Search widget triggers navigation to Search page | ☐ | ☐ |
| H7 | "Featured Experiences" section renders all featured cards | ☐ | ☐ |
| H8 | Featured card click navigates to correct Detail page | ☐ | ☐ |
| H9 | Testimonial carousel autoplays and is readable | ☐ | ☐ |
| H10 | "Explore All Experiences" CTA navigates to Search | ☐ | ☐ |
| H11 | City quick-links (if present) filter search results | ☐ | ☐ |
| H12 | Footer renders on Home page | ☐ | ☐ |
| H13 | No horizontal scroll on mobile | — | ☐ |
| H14 | Images load without broken-image placeholders | ☐ | ☐ |
| H15 | Gold accents (#C9A227) consistent across all sections | ☐ | ☐ |

---

### 3.3 Search & Filter Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| S1 | Sticky filter bar stays fixed on scroll without layout shift | ☐ | ☐ |
| S2 | Row 1: Search field, pax count, budget range all functional | ☐ | ☐ |
| S3 | Row 2: Experience type, venue type, food, music dropdowns open & close | ☐ | ☐ |
| S4 | Active filter chips are visually highlighted (gold border/fill) | ☐ | ☐ |
| S5 | Clearing a filter restores the full result set | ☐ | ☐ |
| S6 | Multiple filters apply cumulatively (AND logic) | ☐ | ☐ |
| S7 | Results count updates dynamically on filter change | ☐ | ☐ |
| S8 | Sort control (e.g. price asc/desc, rating) reorders cards | ☐ | ☐ |
| S9 | Empty state shown when no results match filters | ☐ | ☐ |
| S10 | 3-column grid on desktop; 1-column on mobile | ☐ | ☐ |
| S11 | Card hover triggers image carousel (1.5 s cycle) | ☐ (hover) | — |
| S12 | Card shows: name, location, rating, price, capacity, availability | ☐ | ☐ |
| S13 | "Starts from ₹" price format correct on all cards | ☐ | ☐ |
| S14 | Long venue names truncate to single line (ellipsis) | ☐ | ☐ |
| S15 | Card image overlay shows Compare (⚖) and Share (↗) icons on hover | ☐ (hover) | ☐ (tap) |
| S16 | Compare icon toggles venue in compare bar | ☐ | ☐ |
| S17 | Share icon copies link / triggers share sheet | ☐ | ☐ |
| S18 | Compare bar appears when ≥ 1 venue is selected; sticky at bottom | ☐ | ☐ |
| S19 | "Clear All" in compare bar removes all selections | ☐ | ☐ |
| S20 | CompareModal opens; shows side-by-side columns | ☐ | ☐ |
| S21 | CompareModal is scrollable on mobile | — | ☐ |
| S22 | Discount nudge fires after scrolling past 2 card rows (once per session) | ☐ | ☐ |
| S23 | Clicking a card (not an overlay button) goes to Detail page | ☐ | ☐ |
| S24 | City filter from navbar applies to search results | ☐ | ☐ |
| S25 | Filter dropdowns do not overflow viewport on mobile | — | ☐ |

---

### 3.4 Experience Detail Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| D1 | Back breadcrumb ("← Search Results") navigates back correctly | ☐ | ☐ |
| D2 | Hero image displays at correct aspect ratio; no distortion | ☐ | ☐ |
| D3 | Venue name, location, rating, review count all present | ☐ | ☐ |
| D4 | Price per person clearly shown | ☐ | ☐ |
| D5 | Capacity range displayed (e.g. "20–150 guests") | ☐ | ☐ |
| D6 | Availability badge shown (e.g. "Available this Friday") | ☐ | ☐ |
| D7 | Description text is fully readable; no truncation | ☐ | ☐ |
| D8 | Amenities chips render for all amenities in data | ☐ | ☐ |
| D9 | Tags render correctly with colour coding | ☐ | ☐ |
| D10 | "Book Now" button is prominent; gold styling | ☐ | ☐ |
| D11 | Unauthenticated "Book Now" triggers Login modal | ☐ | ☐ |
| D12 | Authenticated "Book Now" goes directly to Booking Review | ☐ | ☐ |
| D13 | Discount nudge auto-fires after 1.5 s on first visit | ☐ | ☐ |
| D14 | Nudge does not re-fire on return visits in same session | ☐ | ☐ |
| D15 | Sticky "Book Now" bar visible on mobile when scrolled past CTA | — | ☐ |
| D16 | Page is fully scrollable; no content clipped | ☐ | ☐ |
| D17 | Multiple images (if available) shown in gallery | ☐ | ☐ |

---

### 3.5 Login / Signup Modal

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| L1 | Modal opens with backdrop overlay | ☐ | ☐ |
| L2 | Close (×) button dismisses modal; user stays on current page | ☐ | ☐ |
| L3 | Backdrop click also closes modal | ☐ | ☐ |
| L4 | Email field accepts valid email formats | ☐ | ☐ |
| L5 | Invalid email shows inline error (not a page reload) | ☐ | ☐ |
| L6 | "Send OTP" button is disabled until email is valid | ☐ | ☐ |
| L7 | OTP field appears after email submission | ☐ | ☐ |
| L8 | OTP input accepts numeric characters only | ☐ | ☐ |
| L9 | Incorrect OTP shows error message | ☐ | ☐ |
| L10 | Correct OTP logs user in and closes modal | ☐ | ☐ |
| L11 | Post-login, user lands on the page they intended (not home) | ☐ | ☐ |
| L12 | Discount-nudge variant shows promo badge / offer copy | ☐ | ☐ |
| L13 | Discount-nudge variant still functions as normal auth | ☐ | ☐ |
| L14 | Modal is centred and fully visible on mobile | — | ☐ |
| L15 | Keyboard does not push modal off-screen on mobile | — | ☐ |
| L16 | Tab/focus order is logical within modal | ☐ | — |
| L17 | Escape key closes modal | ☐ | — |

---

### 3.6 Booking Review Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| R1 | Back arrow ("← Venue Detail") returns to Detail page | ☐ | ☐ |
| R2 | Venue name and image shown in summary header | ☐ | ☐ |
| R3 | Guest count control (+ / −) works within valid range | ☐ | ☐ |
| R4 | Guest count cannot go below 1 or above venue max capacity | ☐ | ☐ |
| R5 | Date picker allows future dates only | ☐ | ☐ |
| R6 | Time slot selector shows available slots | ☐ | ☐ |
| R7 | Price per person × pax = subtotal (correctly calculated) | ☐ | ☐ |
| R8 | 10% advance amount displayed clearly | ☐ | ☐ |
| R9 | Full booking value also shown for transparency | ☐ | ☐ |
| R10 | "Proceed to Payment" is disabled until all fields are filled | ☐ | ☐ |
| R11 | "Proceed to Payment" navigates to Payment page | ☐ | ☐ |
| R12 | Unauthenticated access redirects to login (guard) | ☐ | ☐ |
| R13 | Layout is scannable on mobile; no horizontal scroll | — | ☐ |

---

### 3.7 Payment Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| P1 | Back arrow returns to Booking Review | ☐ | ☐ |
| P2 | Booking summary (venue, date, pax, advance amount) visible | ☐ | ☐ |
| P3 | Card number field accepts 16-digit input with formatting | ☐ | ☐ |
| P4 | Expiry and CVV fields present and functional | ☐ | ☐ |
| P5 | "Pay ₹X" button shows correct advance amount | ☐ | ☐ |
| P6 | Processing spinner appears for ~2 seconds on submit | ☐ | ☐ |
| P7 | After processing, navigates to Confirmation page | ☐ | ☐ |
| P8 | Security/trust indicators visible (shield, lock icons) | ☐ | ☐ |
| P9 | Keyboard type on card field is `tel`/`numeric` on mobile | — | ☐ |
| P10 | No double-submit possible (button disabled during processing) | ☐ | ☐ |

---

### 3.8 Booking Confirmation Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| C1 | Footer is NOT shown on this page | ☐ | ☐ |
| C2 | Booking reference / ID is displayed prominently | ☐ | ☐ |
| C3 | Venue name, date, time, pax shown in confirmed booking summary | ☐ | ☐ |
| C4 | Amount paid (advance) shown | ☐ | ☐ |
| C5 | Host contact details visible | ☐ | ☐ |
| C6 | Confetti / success animation plays (if implemented) | ☐ | ☐ |
| C7 | "View My Bookings" navigates to Profile page | ☐ | ☐ |
| C8 | Download / copy booking button works | ☐ | ☐ |
| C9 | No back-navigation accidentally re-triggers payment | ☐ | ☐ |
| C10 | Page is readable without scrolling on most mobile viewports | — | ☐ |

---

### 3.9 Profile / My Bookings Page

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| PR1 | Unauthenticated access redirects to login | ☐ | ☐ |
| PR2 | User name / email shown in profile header | ☐ | ☐ |
| PR3 | All past bookings listed with venue, date, status | ☐ | ☐ |
| PR4 | "Book Again" CTA on each past booking | ☐ | ☐ |
| PR5 | "Book Again" navigates to correct venue detail | ☐ | ☐ |
| PR6 | Booking status labels (confirmed, pending, past) are correct | ☐ | ☐ |
| PR7 | Empty state shown if no bookings exist | ☐ | ☐ |
| PR8 | Logout clears auth state; navbar reverts to guest mode | ☐ | ☐ |
| PR9 | After logout, "My Bookings" nav link disappears | ☐ | ☐ |
| PR10 | List is scrollable on mobile without layout issues | — | ☐ |

---

### 3.10 Admin Dashboard

| # | Check | Web | Mobile |
|---|-------|-----|--------|
| A1 | Admin page is only accessible when logged in | ☐ | ☐ |
| A2 | Sidebar navigation renders all sections | ☐ | — |
| A3 | KPI stat tiles show correct labels and values | ☐ | ☐ |
| A4 | AreaChart renders without console errors | ☐ | ☐ |
| A5 | BarChart renders without console errors | ☐ | ☐ |
| A6 | Chart tooltips appear on hover / tap | ☐ | ☐ |
| A7 | Venue table/list renders all 56 venues (or paginated) | ☐ | ☐ |
| A8 | "Go to Home" returns to Home page | ☐ | ☐ |
| A9 | Footer is NOT rendered on admin page | ☐ | ☐ |
| A10 | Mobile: sidebar collapses or is replaced by a drawer | — | ☐ |
| A11 | Charts are horizontally scrollable on mobile (not clipped) | — | ☐ |

---

## 4. Web vs. Mobile Experience Matrix

| Concern | Desktop (≥ 1280 px) | Tablet (768–1279 px) | Mobile (< 768 px) |
|---------|---------------------|----------------------|-------------------|
| **Layout grid** | 3-column card grid | 2-column grid | 1-column stack |
| **Navbar** | Full horizontal links | Full or abbreviated | Hamburger menu |
| **Hero carousel** | Full bleed, tall | Full bleed, medium | Reduced height, safe area |
| **Filter bar** | Two-row sticky bar | Two-row scrollable | Horizontal scroll or accordion |
| **Filter dropdowns** | Opens downward | Opens downward | Opens as bottom sheet |
| **Card hover carousel** | Image cycles on hover | — | Image cycles on swipe / tap |
| **Compare bar** | Fixed bottom bar | Fixed bottom bar | Compact bottom bar, tap to expand |
| **CompareModal** | Side-by-side columns | Scroll between columns | Vertical stack per venue |
| **Detail page** | Two-column (info + CTA sticky) | Two-column | Single column; sticky book bar at bottom |
| **Modals** | Centred overlay | Centred overlay | Full-screen or bottom sheet |
| **Payment form** | Standard layout | Standard layout | Numeric keyboard auto-activates |
| **Admin dashboard** | Full sidebar | Collapsible sidebar | Drawer / icon-only sidebar |
| **Touch targets** | ≥ 32 px | ≥ 40 px | ≥ 44 px (iOS HIG minimum) |
| **Font sizes** | Base 16 px | Base 16 px | Min 14 px body, 12 px labels |
| **Tap/click feedback** | Cursor pointer + hover state | Hover state (touch fallback) | Active state via `:active` / `bg-opacity` |

### Mobile-Specific Must-Checks

- [ ] No element requires hover to be discoverable (all interactions tappable)
- [ ] Overlay icons on cards (compare, share) visible on mobile without hover
- [ ] Sticky navbar does not occlude content at top of every page
- [ ] iOS Safari: bottom safe area not blocked by sticky CTAs
- [ ] Android Chrome: no address-bar resize janks the layout
- [ ] All font sizes ≥ 12 px (no pinch-zoom required to read)
- [ ] Input fields do not zoom the page on focus (font-size ≥ 16 px on inputs)
- [ ] Modals dismiss on swipe down (if implemented) or via accessible close button
- [ ] Touch targets for `+` / `−` guest count controls are ≥ 44 × 44 px
- [ ] Horizontal scroll is intentional (carousels) — never unexpected page overflow

---

## 5. Cross-Cutting Quality Concerns

### 5.1 Performance

| Check | Target | Notes |
|-------|--------|-------|
| First Contentful Paint | < 2 s on 4G | Unsplash images lazy-loaded |
| Images load with correct aspect ratios | No CLS | Use explicit width/height on `<img>` |
| Card grid renders without layout shift on filter change | 0 CLS | Avoid height changes |
| Carousel image pre-load | Next image loads before cycle | Prevents blank frame |
| No janky scroll on search page (56 cards) | 60 fps | Avoid unnecessary re-renders |

### 5.2 Accessibility

| Check | Standard |
|-------|----------|
| All interactive elements have focus outlines | WCAG 2.1 AA |
| Gold (#C9A227) on white background contrast ≥ 3:1 for large text | WCAG AA |
| Dark text on white card background ≥ 4.5:1 | WCAG AA |
| Modal traps focus; Escape closes | ARIA dialog pattern |
| Image `alt` attributes present for all venue images | WCAG 1.1.1 |
| Form fields have associated `<label>` elements | WCAG 1.3.1 |
| Error messages announced to screen readers (`role="alert"`) | WCAG 4.1.3 |
| Carousel has pause control or respects `prefers-reduced-motion` | WCAG 2.3.3 |

### 5.3 State Integrity

- [ ] Navigating back/forward does not lose selected venue context
- [ ] City filter set in navbar applies correctly on Search page
- [ ] Auth state persists if user navigates away and returns (within session)
- [ ] Discount nudge fires only once per session — not on every page load
- [ ] Compare bar clears when user navigates away from Search page
- [ ] Payment processing spinner cannot be bypassed (button disabled during processing)

### 5.4 Edge Cases

| Scenario | Expected Behaviour |
|----------|--------------------|
| 0 results after applying filters | "No results found" empty state with a reset CTA |
| Direct link/refresh to a page other than Home | Graceful fallback to Home (no white screen) |
| Typing special characters in search input | Input sanitised; no crash |
| Very long venue name | Truncated with ellipsis; tooltip on hover |
| User logs out mid-booking flow | Redirected to login; booking context preserved if possible |
| Viewport resized from desktop to mobile mid-session | Layout reflows correctly; no overlapping elements |
| Slow image load (throttled network) | Skeleton / placeholder visible; no broken-image icon |

### 5.5 Visual Quality

- [ ] Gold accent (#C9A227) used consistently — not mixed with off-brand yellows
- [ ] Playfair Display applied to all headings; Inter to body text
- [ ] No orphaned words in hero headings at any viewport width
- [ ] Consistent border-radius on cards, modals, buttons
- [ ] Shadows and elevation levels consistent across cards and modals
- [ ] Hover states on all interactive elements (cursor + colour change)
- [ ] Loading/processing states use spinner or skeleton — never blank white

---

## 6. Regression Smoke Checklist

Run after every code change before signoff.

| # | Smoke Test | Web | Mobile |
|---|-----------|-----|--------|
| SM1 | Home page renders without JS errors | ☐ | ☐ |
| SM2 | Search page renders all cards | ☐ | ☐ |
| SM3 | Applying "Rooftop" filter shows only rooftop venues | ☐ | ☐ |
| SM4 | Skydeck Brewery detail page opens | ☐ | ☐ |
| SM5 | Login modal opens from unauthenticated "Book Now" | ☐ | ☐ |
| SM6 | OTP flow completes and user is logged in | ☐ | ☐ |
| SM7 | Booking Review page loads with correct venue data | ☐ | ☐ |
| SM8 | Payment → Confirmation flow completes end-to-end | ☐ | ☐ |
| SM9 | Profile page shows mock booking history | ☐ | ☐ |
| SM10 | Admin dashboard loads with charts rendered | ☐ | ☐ |
| SM11 | Footer visible on Home, Search, Detail, Review, Profile | ☐ | ☐ |
| SM12 | Footer NOT visible on Confirmation and Admin | ☐ | ☐ |
| SM13 | Discount nudge fires once on Search after 2-row scroll | ☐ | ☐ |
| SM14 | Discount nudge fires once on Detail after 1.5 s | ☐ | ☐ |
| SM15 | Compare bar appears when a venue is selected | ☐ | ☐ |

---

*Document maintained by: PartyOS Product & QA Team*  
*Last updated: September 2026*
