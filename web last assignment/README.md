# Wanderly — Your World, Your Adventure

An interactive, responsive travel application crafted with clean semantic **HTML5**, modern **CSS3**, and modular **Vanilla JavaScript (ES6+)**.

---

## 🌟 Key Features

### 1. Interactive Tour Packages Explorer & Live Search
- **Instant Keyword Search**: Live debounced search across tour titles, subheadings, destinations, and highlighted landmarks (e.g. *"Ring Road"*, *"Aurora"*, *"Ice Cave"*, *"Flåm"*).
- **Multi-Faceted Filtering**:
  - **By Destination**: Iceland, Norway, Scotland, Ireland, The Alps, Lapland, Scandinavia, and Italy.
  - **By Travel Style**: Self-Drive, Guided Small Groups, Scenic Trains & Cruises, and Privately Guided.
  - **By Season**: Winter & Northern Lights vs. Summer & Midnight Sun.
  - **By Duration**: Getaways (1–6 days), 1 Week (7–9 days), and Grand Tours (10+ days).
- **Smart Sorting**: Recommended, Price (Low to High / High to Low), Duration, and Highest Traveler Rating.

### 2. Real-Time Dynamic Currency Switcher
- Switch seamlessly between **INR (₹)**, **EUR (€)**, and **GBP (£)**.
- Automatically re-calculates all tour prices, excursion add-ons, sub-totals, discounts, and final checkout vouchers across the entire site in real-time.
- Persists user currency preferences via `localStorage`.

### 3. Interactive Itinerary Details Modal
- **Day-by-Day Timeline**: Detailed collapsible itinerary cards outlining daily routes, included meals, and handpicked hotels.
- **Inclusions & Exclusions Checklist**: Transparent breakdown of what's included (transport, boutique stays, certified guides, insurances) vs. what's optional.
- **On-the-Fly Booking Customizer**:
  - Departure date selector.
  - Traveler count adjuster (Solo, Standard 2-person, Family 4+).
  - Room category tier selector (*Standard*, *Comfort*, *Superior*).
  - Optional excursion checkboxes (e.g. *Blue Lagoon Comfort Pass*, *Glacier Snowmobile Safari*, *Husky Sledding*).
  - Instant live total price calculation.

### 4. Slide-Over Booking Cart Drawer & Local Storage Persistence
- Right-hand slide-over drawer accessible from any section.
- Itemized display of reserved tours, selected departure dates, traveler counts, and customized excursion add-ons.
- Traveler count increment/decrement with reactive total adjustments.
- **Promo Code Engine**: Test with `EARLYBIRD` (10% discount) or `NORDIC2027` (€200 advance booking credit).
- All cart items and wishlist state automatically persist across page refreshes via `localStorage`.

### 5. Multi-Step Checkout & Printable Booking Voucher
- **Step 1 — Traveler Information**: Full contact form with validation, emergency contact, and special dietary/mobility requests.
- **Step 2 — Secure Payment Simulation**: Encrypted payment form with card validation preview.
- **Step 3 — Official Booking Confirmation Voucher**: Generates a verified booking reference ID (e.g., `NV-2027-XXXXXX`), summary of reservations, and includes a **one-click printable voucher** layout.

### 6. Interactive Wishlist Engine
- Save favorite journeys using the heart button on any tour card.
- Dedicated wishlist badge in the top navigation with quick filtering to saved trips.

### 7. Responsive Nordic Design System
- Authentic color scheme: Arctic Teal (`#2cc9d0`), Deep Ocean Navy (`#102a36`), and Warm Amber (`#e69500`).
- Typography pairing: Classical editorial headings (*Playfair Display*) with modern digital interface typography (*Inter*).
- 100% responsive across desktop, tablet, and mobile viewport sizes.

---

## 📁 File Structure

```
├── index.html          # Main application page with semantic markup
├── css/
│   └── styles.css      # Custom responsive CSS design system
├── js/
│   ├── data.js         # Tour datasets, destinations, itineraries, and currencies
│   └── app.js          # Controller handling search, filters, modals, cart, and checkout
└── README.md           # Project documentation and submission notes
```

---

## 🚀 How to Run the Application

This project is completely standalone with zero external build tools required.

### Method 1: Direct File Open
Double-click `index.html` in your file explorer or open it in any modern browser (Chrome, Safari, Firefox, Edge).

### Method 2: Local HTTP Server (Recommended)
From this project directory, run:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.
