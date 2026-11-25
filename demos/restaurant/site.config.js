/* Live demo under /my-memeory/demos/. Sample copy is unchanged.
   Business is fictional. rating.includeInSchema stays false.
   Example restaurant / cafe. Fictional business — not a real restaurant.
   Copy this file over site.config.js:
   cp presets/restaurant.js site.config.js
*/
window.SITE = {
  sampleContent: true,
  lang: "en-IN",
  locale: "en_IN",
  schemaType: "Restaurant",
  name: "Saffron Leaf",
  logoText: "SL",
  tagline: "South Indian kitchen and cafe in Koramangala",
  title: "Saffron Leaf | Cafe and restaurant in Koramangala, Bengaluru",
  description: "Example restaurant site: breakfast, filter coffee, thalis and weekend specials in Koramangala, Bengaluru. WhatsApp for a table or parcel order.",
  url: "https://bharathvdbuilds.github.io/my-memeory/demos/restaurant/",
  themeColor: "#1F1511",
  ogImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  fonts: { heading: "Fraunces", body: "Source Sans 3" },
  colors: {
    bg: "#f6f0e6",
    bgAlt: "#efe4d4",
    card: "#fffaf3",
    ink: "#1f1511",
    muted: "#5c463c",
    brand: "#9c3d2e",
    brandHover: "#7e3125",
    brandSoft: "#f3d7c8",
    accent: "#c4a35a",
    accentInk: "#5c4a1f",
    line: "#e4d3bd",
    invert: "#fffaf3",
    footer: "#1f1511",
    footerInk: "#efe4d4"
  },
  phone: "+919876501234",
  phoneDisplay: "+91 98765 01234",
  whatsapp: "919876501234",
  email: "reservations@example.com",
  priceRange: "₹₹",
  areaServed: "Koramangala, and parcel orders across south Bengaluru where delivery partners operate",
  address: {
    street: "7 Example House, 5th Block, Koramangala",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560095",
    country: "IN",
    display: "7 Example House, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    mapsQuery: "Koramangala 5th Block Bengaluru",
    mapsEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.606%2C12.924%2C77.648%2C12.945&layer=mapnik&marker=12.9346%2C77.6266",
    mapsLink: "https://maps.google.com/?q=Koramangala+5th+Block+Bengaluru"
  },
  geo: { lat: 12.9346, lng: 77.6266 },
  hours: [
    { daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "08:00", close: "22:30", label: "Monday – Friday", display: "8:00 AM – 10:30 PM" },
    { daysOfWeek: ["Saturday", "Sunday"], open: "08:00", close: "23:00", label: "Saturday – Sunday", display: "8:00 AM – 11:00 PM" }
  ],
  hoursNote: "Breakfast is served until 11:30 AM. Last seating is 45 minutes before closing.",
  cta: {
    callLabel: "Call the kitchen",
    whatsappLabel: "WhatsApp",
    bookLabel: "Reserve a table",
    whatsappMessage: "Hello, I found Saffron Leaf through your website. I would like to reserve a table."
  },
  hero: {
    eyebrow: "Koramangala 5th Block · All day",
    title: "Filter coffee, honest thalis, a table when you need it.",
    subtitle: "A fictional neighbourhood restaurant for breakfast, lunch and an unhurried dinner. WhatsApp us for a reservation or a parcel order.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Restaurant dining room with warm lighting and set tables",
    cardTitle: "Open all week",
    cardText: "Breakfast from 8:00 AM · Last seating before close",
    bullets: ["Indoor seating", "Parcel on WhatsApp"]
  },
  servicesTitle: "A few plates from the menu",
  servicesIntro: "Sample dishes and prices so the template looks complete. Replace this section with the restaurant’s current menu or a short signature list.",
  services: [
    {
      name: "South Indian breakfast",
      description: "Idli, dosa, vada and podi, with filter coffee. Served until 11:30 AM.",
      price: "₹180",
      priceValue: 180,
      priceCurrency: "INR",
      duration: "onwards",
      tags: ["Breakfast", "Vegetarian"],
      icon: "coffee"
    },
    {
      name: "Weekday thali",
      description: "A changing lunch thali with rice, a dry vegetable, rasam or sambar, and a sweet.",
      price: "₹280",
      priceValue: 280,
      priceCurrency: "INR",
      duration: "/ plate",
      tags: ["Lunch"],
      icon: "utensil"
    },
    {
      name: "Dinner plates",
      description: "Curries, grilled mains and a short list of continental cafe plates after 6:30 PM.",
      price: "₹350",
      priceValue: 350,
      priceCurrency: "INR",
      duration: "onwards",
      tags: ["Dinner"],
      icon: "leaf"
    },
    {
      name: "Weekend special",
      description: "A longer thali and a dessert of the day. Limited plates — ask us to hold one when you book.",
      price: "₹450",
      priceValue: 450,
      priceCurrency: "INR",
      duration: "/ plate",
      tags: ["Sat–Sun"],
      icon: "star"
    }
  ],
  about: {
    title: "A Koramangala table, kept simple",
    body: [
      "Saffron Leaf is an example restaurant for this template: a small dining room, a cafe counter for coffee, and a kitchen that would rather do fewer plates well.",
      "Swap this copy for the chef or family’s story, sourcing notes, and a photograph of the real room."
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Plated restaurant dish with garnish",
    highlights: [
      { title: "Tables on WhatsApp", text: "Tell us the party size and time. We confirm if a table is free." },
      { title: "Parcel without an app fee", text: "Order on WhatsApp and collect, or ask whether delivery is available that evening." },
      { title: "Vegetarian first", text: "A full vegetarian kitchen, with clearly marked egg or meat specials when they run." },
      { title: "Quiet enough to talk", text: "A small room — better for a meal than a loud Friday crowd." }
    ]
  },
  stats: [
    { value: "8 AM", label: "Kitchen opens" },
    { value: "30", label: "Seats in the room" },
    { value: "7", label: "Days a week" }
  ],
  testimonialsTitle: "From the comment book",
  testimonialsIntro: "Fictional sample reviews. Use only quotes the restaurant has approved.",
  rating: {
    value: 4.7,
    max: 5,
    count: 128,
    label: "sample Google-style rating",
    url: "",
    includeInSchema: false
  },
  testimonials: [
    { quote: "The weekday thali is the reason I walk over from work. Rasam is consistent, and they don’t rush the table.", name: "Meera J.", meta: "Koramangala 5th Block", rating: 5 },
    { quote: "Booked Saturday dinner on WhatsApp and they held a table for four. Filter coffee at the end was a nice touch.", name: "Arun & Kavya", meta: "Weekend dinner", rating: 5 },
    { quote: "Came for breakfast dosa, stayed for a parcel of evening curry. Clear prices on the site helped.", name: "Thomas L.", meta: "HSR Layout", rating: 4 }
  ],
  galleryTitle: "The room and the plate",
  galleryIntro: "Unsplash placeholders. Use the restaurant’s own food and interior photographs.",
  gallery: [
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80", alt: "Dining room with warm lighting" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", alt: "Plated dish ready to serve" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80", alt: "Close-up of a colourful prepared meal" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80", alt: "Cafe table setting by a window" }
  ],
  faqTitle: "Before you visit",
  faqIntro: "Opening hours, reservations and parcel notes for this example restaurant.",
  faqs: [
    { q: "Do I need a reservation?", a: "Walk-ins are welcome for breakfast and lunch. For dinner, especially on Friday to Sunday, WhatsApp us with the time and party size." },
    { q: "Do you take parcel orders?", a: "Yes. Message us the dishes and whether you will collect or need delivery. Delivery depends on partner availability that evening." },
    { q: "Are you vegetarian?", a: "The everyday menu is vegetarian. Egg or meat specials, when offered, are marked clearly. Adjust this answer to match the real kitchen." },
    { q: "Is there parking?", a: "Street parking around 5th Block is limited. A nearby paid lot is usually the easier option after 7 PM." },
    { q: "Do you host large groups?", a: "The room seats about 30. For more than eight people, write to us a day ahead so we can arrange tables." }
  ],
  visitTitle: "Koramangala 5th Block",
  visitIntro: "The example restaurant is placed in 5th Block, a short walk from the main 80 Feet and 100 Feet Road junction.",
  form: {
    title: "Reserve a table or order parcel",
    subtitle: "Tell us the date, time and party size, or the dishes you want packed.",
    heading: "Reservation / parcel",
    note: "This form opens WhatsApp with a pre-filled message. Nothing is stored on a server.",
    placeholder: "Table for 2 this Saturday at 8 PM, or a parcel list for collection.",
    submitLabel: "Send on WhatsApp",
    successNote: "You will be taken to WhatsApp to review and send the message."
  },
  social: [
    { name: "Instagram", url: "https://www.instagram.com/example" },
    { name: "Google Maps", url: "https://maps.google.com/?q=Koramangala+5th+Block+Bengaluru" }
  ],
  sameAs: [],
  demoNote: "Demo site by BVD Builds",
  demoNoteUrl: "/my-memeory/demos/",
  footer: {
    credit: "Demo site by BVD Builds",
    creditUrl: "/my-memeory/demos/"
  }
};
