/* Live demo under /my-memeory/demos/. Sample copy is unchanged.
   Business is fictional. rating.includeInSchema stays false.
   Example salon / beauty studio. Fictional business — not a real salon.
   Copy this file over site.config.js:
   cp presets/salon.js site.config.js
*/
window.SITE = {
  sampleContent: true,
  lang: "en-IN",
  locale: "en_IN",
  schemaType: "BeautySalon",
  name: "Orchid & Oak Salon",
  logoText: "O&",
  tagline: "Hair, skin and colour in Indiranagar, Bengaluru",
  title: "Orchid & Oak Salon | Hair and beauty in Indiranagar, Bengaluru",
  description: "Example salon site: haircuts, colour, facials and bridal styling in Indiranagar, Bengaluru. WhatsApp to book a chair or a home makeup trial.",
  url: "https://bharathvdbuilds.github.io/my-memeory/demos/salon/",
  themeColor: "#2B1C1E",
  ogImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  fonts: { heading: "Cormorant Garamond", body: "Manrope" },
  colors: {
    bg: "#faf6f3",
    bgAlt: "#f3e8e4",
    card: "#ffffff",
    ink: "#2b1c1e",
    muted: "#6a4f52",
    brand: "#8a3f4c",
    brandHover: "#72333e",
    brandSoft: "#f3dbe0",
    accent: "#c4a484",
    accentInk: "#6b4e32",
    line: "#ead8d3",
    invert: "#ffffff",
    footer: "#2b1c1e",
    footerInk: "#f3e8e4"
  },
  phone: "+919123456789",
  phoneDisplay: "+91 91234 56789",
  whatsapp: "919123456789",
  email: "book@example.com",
  priceRange: "₹₹",
  areaServed: "Indiranagar, Domlur, HAL and surrounding east Bengaluru",
  address: {
    street: "42 Example Lane, 100 Feet Road, Indiranagar",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560038",
    country: "IN",
    display: "42 Example Lane, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    mapsQuery: "100 Feet Road Indiranagar Bengaluru",
    mapsEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.620%2C12.968%2C77.662%2C12.988&layer=mapnik&marker=12.9784%2C77.6408",
    mapsLink: "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru"
  },
  geo: { lat: 12.9784, lng: 77.6408 },
  hours: [
    { daysOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], open: "10:00", close: "20:00", label: "Tuesday – Sunday", display: "10:00 AM – 8:00 PM" },
    { daysOfWeek: ["Monday"], closed: true, label: "Monday", display: "Closed" }
  ],
  hoursNote: "Walk-ins are welcome when a chair is free. Bridal and colour work are by appointment only.",
  cta: {
    callLabel: "Call the salon",
    whatsappLabel: "WhatsApp",
    bookLabel: "Book on WhatsApp",
    whatsappMessage: "Hello, I found Orchid & Oak Salon through your website. I would like to book an appointment."
  },
  hero: {
    eyebrow: "Indiranagar · Women and men",
    title: "Quiet, considered hair and skin care.",
    subtitle: "A fictional neighbourhood salon for cuts, colour, facials and wedding-day styling. Message us with the service you want and a preferred day.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Warm salon interior with styling chairs and mirrors",
    cardTitle: "Open Tue–Sun",
    cardText: "10:00 AM – 8:00 PM · Closed Mondays",
    bullets: ["Colour specialists", "Bridal trials on request"]
  },
  servicesTitle: "Menu & pricing",
  servicesIntro: "Sample prices for a typical east-Bengaluru salon. Replace them with the client’s current menu before the site goes live.",
  services: [
    {
      name: "Haircut & finish",
      description: "Consultation, cut and blow-dry for women or men, finished for the week ahead.",
      price: "₹700",
      priceValue: 700,
      priceCurrency: "INR",
      duration: "onwards",
      tags: ["Women & men", "45–60 min"],
      icon: "cut"
    },
    {
      name: "Colour & highlights",
      description: "Global colour, root touch-up or highlights, with a bond-care treatment.",
      price: "₹2,200",
      priceValue: 2200,
      priceCurrency: "INR",
      duration: "onwards",
      tags: ["By appointment"],
      icon: "spark"
    },
    {
      name: "Signature facial",
      description: "A 60-minute cleanse, steam, extraction and mask, chosen for your skin type.",
      price: "₹1,500",
      priceValue: 1500,
      priceCurrency: "INR",
      duration: "/ 60 min",
      tags: ["Skin"],
      icon: "flower"
    },
    {
      name: "Bridal makeup trial",
      description: "A dedicated trial for hair and makeup, so the wedding-day look is decided in advance.",
      price: "₹4,500",
      priceValue: 4500,
      priceCurrency: "INR",
      duration: "/ trial",
      tags: ["Weddings"],
      icon: "spa"
    }
  ],
  about: {
    title: "A neighbourhood studio, not a rush hour",
    body: [
      "Orchid & Oak is an example salon created for this template. The tone is unhurried: one guest at a time in each chair, honest advice on colour, and a price you see before you sit down.",
      "Replace this story with the owner’s background, the products they use, and a photograph of the actual studio."
    ],
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hair colour being mixed in a salon bowl",
    highlights: [
      { title: "Appointments that hold", text: "WhatsApp bookings are confirmed with a time, so you are not left waiting." },
      { title: "Patch tests", text: "Colour work includes a patch test when it is the safe thing to do." },
      { title: "Bridal calendar", text: "Wedding dates are blocked only after a trial and a written estimate." },
      { title: "Easy to reach", text: "On 100 Feet Road, with parking guidance shared when you book." }
    ]
  },
  stats: [
    { value: "Tue–Sun", label: "Open six days" },
    { value: "1:1", label: "Stylist per guest" },
    { value: "Trial", label: "Before wedding day" }
  ],
  testimonialsTitle: "Kind words from the chair",
  testimonialsIntro: "Fictional sample reviews. Swap in quotes the salon has approved before going live.",
  rating: {
    value: 4.8,
    max: 5,
    count: 64,
    label: "sample Google-style rating",
    url: "",
    includeInSchema: false
  },
  testimonials: [
    { quote: "My colour has stayed even for weeks, and they explained the upkeep without pushing an expensive package.", name: "Aditi R.", meta: "Indiranagar", rating: 5 },
    { quote: "Booked a haircut on WhatsApp in the morning and was in the chair after work. No rush, clean finish.", name: "Vikram P.", meta: "Domlur", rating: 5 },
    { quote: "The bridal trial felt organised. We left with photos and a clear plan for the ceremony morning.", name: "Nisha & Arjun", meta: "Wedding trial", rating: 5 }
  ],
  galleryTitle: "The studio",
  galleryIntro: "Unsplash placeholders. Use the client’s own interior, hair and makeup photographs.",
  gallery: [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80", alt: "Salon floor with styling chairs and large mirrors" },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80", alt: "Hair colour preparation" },
    { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", alt: "Makeup brushes and soft lighting for a beauty session" },
    { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80", alt: "Stylist cutting hair in a bright salon" }
  ],
  faqTitle: "Before you book",
  faqIntro: "Practical details for a first visit. Opening hours and prices here are examples.",
  faqs: [
    { q: "How do I book?", a: "Call or WhatsApp with the service, a preferred day and whether the appointment is for an adult or a child. The form on this page prepares that message for you." },
    { q: "Do you take walk-ins?", a: "Yes, for haircuts if a chair is free. Colour, keratin and bridal work need an appointment." },
    { q: "What products do you use?", a: "Replace this answer with the salon’s actual colour and skincare lines." },
    { q: "Is there parking?", a: "Street and building parking vary by time of day. We share the easiest option when we confirm your slot." },
    { q: "What is the cancellation policy?", a: "Please give at least 12 hours’ notice so the chair can be offered to someone else. Sample policy — confirm with the owner." }
  ],
  visitTitle: "Find us in Indiranagar",
  visitIntro: "The example salon sits just off 100 Feet Road. Use the map for directions, then confirm the entrance when you book.",
  form: {
    title: "Reserve a chair",
    subtitle: "Tell us the service and a day that works. We will confirm on WhatsApp.",
    heading: "Booking request",
    note: "This form opens WhatsApp with a pre-filled message. Nothing is stored on a server.",
    placeholder: "Service, preferred day and time, and any reference photos you plan to send next.",
    submitLabel: "Send on WhatsApp",
    successNote: "You will be taken to WhatsApp to review and send the message."
  },
  social: [
    { name: "Instagram", url: "https://www.instagram.com/example" },
    { name: "Google Maps", url: "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru" }
  ],
  sameAs: [],
  demoNote: "Demo site by BVD Builds",
  demoNoteUrl: "/my-memeory/demos/",
  footer: {
    credit: "Demo site by BVD Builds",
    creditUrl: "/my-memeory/demos/"
  }
};
