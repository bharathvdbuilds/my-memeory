/* Live demo under /my-memeory/demos/. Sample copy is unchanged.
   Business is fictional. rating.includeInSchema stays false.
   Example physiotherapy clinic. Fictional business — not a real practice.
   Copy this file over site.config.js:
   cp presets/physiotherapy.js site.config.js
*/
window.SITE = {
  sampleContent: true,
  lang: "en-IN",
  locale: "en_IN",
  schemaType: "MedicalBusiness",
  name: "Arogya Physiotherapy",
  logoText: "AP",
  tagline: "Home physiotherapy in Chandapura, Bengaluru",
  title: "Arogya Physiotherapy | Home physiotherapy in Chandapura, Bengaluru",
  description: "Example clinic site: home physiotherapy for spine, shoulder and knee rehabilitation around Chandapura–Anekal Road, Bengaluru. Book a visit on WhatsApp or by phone.",
  url: "https://bharathvdbuilds.github.io/my-memeory/demos/physio/",
  themeColor: "#102A43",
  ogImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
  fonts: { heading: "Fraunces", body: "Manrope" },
  colors: {
    bg: "#f4fbfd",
    bgAlt: "#eaf5fa",
    card: "#ffffff",
    ink: "#102a43",
    muted: "#3e5366",
    brand: "#0e7f78",
    brandHover: "#0b6a64",
    brandSoft: "#d7f3f0",
    accent: "#d6a45c",
    accentInk: "#6b4a16",
    line: "#d7e3ec",
    invert: "#ffffff",
    footer: "#102a43",
    footerInk: "#d7e3ec"
  },
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@example.com",
  priceRange: "₹₹",
  areaServed: "Chandapura, Anekal, Hebbagodi, Jigani and Electronic City, Bengaluru",
  address: {
    street: "12 Example Arcade, Chandapura–Anekal Road",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560099",
    country: "IN",
    display: "12 Example Arcade, Chandapura–Anekal Road, Bengaluru, Karnataka 560099",
    mapsQuery: "Chandapura Anekal Road Bengaluru",
    mapsEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.685%2C12.785%2C77.725%2C12.818&layer=mapnik&marker=12.8016%2C77.7050",
    mapsLink: "https://maps.google.com/?q=Chandapura+Anekal+Road+Bengaluru"
  },
  geo: { lat: 12.8016, lng: 77.7050 },
  hours: [
    { daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], open: "09:00", close: "19:00", label: "Monday – Saturday", display: "9:00 AM – 7:00 PM" },
    { daysOfWeek: ["Sunday"], closed: true, label: "Sunday", display: "By appointment" }
  ],
  hoursNote: "Home visits are arranged by appointment and depend on your area and slot availability.",
  cta: {
    callLabel: "Call now",
    whatsappLabel: "WhatsApp",
    bookLabel: "Book a home visit",
    whatsappMessage: "Hello, I found Arogya Physiotherapy through your website. I would like to enquire about a home physiotherapy appointment."
  },
  hero: {
    eyebrow: "Home visits · Chandapura–Anekal Road",
    title: "Expert physiotherapy. In the comfort of your home.",
    subtitle: "Personalised care for spine, shoulder and knee rehabilitation, led by Dr. Ananya Rao (PT). Share your area on WhatsApp and we will confirm whether a visit is possible.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Physiotherapist guiding a patient through a supervised rehabilitation exercise",
    cardTitle: "Dr. Ananya Rao (PT)",
    cardText: "Senior physiotherapist · Spine, shoulder & knee rehab",
    bullets: ["Home-visit appointments", "Based around Chandapura"]
  },
  servicesTitle: "Specialised care for better movement",
  servicesIntro: "Clear session fees so you know what to expect before you book. Travel within the usual service area is included in the home-visit fee.",
  services: [
    {
      name: "Spine & back rehabilitation",
      description: "Assessment and guided rehab for back discomfort, spinal mobility and day-to-day movement.",
      price: "₹800",
      priceValue: 800,
      priceCurrency: "INR",
      duration: "/ session",
      tags: ["Back pain", "Mobility", "Spine rehab"],
      icon: "spine"
    },
    {
      name: "Shoulder rehabilitation",
      description: "Individualised work on shoulder movement, strength and functional recovery.",
      price: "₹800",
      priceValue: 800,
      priceCurrency: "INR",
      duration: "/ session",
      tags: ["Mobility", "Strength"],
      icon: "shoulder"
    },
    {
      name: "Knee rehabilitation",
      description: "Support for knee movement, stability, strength and everyday function.",
      price: "₹800",
      priceValue: 800,
      priceCurrency: "INR",
      duration: "/ session",
      tags: ["Stability", "Function"],
      icon: "knee"
    },
    {
      name: "Physiotherapy at home",
      description: "A full session in your home when your location and schedule allow. Includes travel in the usual service area.",
      price: "₹1,000",
      priceValue: 1000,
      priceCurrency: "INR",
      duration: "/ visit",
      tags: ["Home visit", "By appointment"],
      icon: "home"
    }
  ],
  about: {
    title: "Professional physiotherapy, made more personal",
    body: [
      "At Arogya Physiotherapy we believe access to care should be convenient, comfortable and centred on your needs. Home visits bring assessment and rehabilitation into a familiar environment, so you spend less time travelling and more time recovering.",
      "The clinic is led by Dr. Ananya Rao (PT), a fictional example practitioner created for this template. Replace this section with your clinician’s real qualifications, approach and photo."
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Clinician reviewing notes during a consultation",
    highlights: [
      { title: "Individualised care", text: "Sessions start from your own assessment, not a fixed routine." },
      { title: "Clear clinical focus", text: "Spine, shoulder and knee rehabilitation are the published areas of practice." },
      { title: "Home-visit convenience", text: "Care arranged at home, subject to area and appointment availability." },
      { title: "Direct contact", text: "Enquiries go straight to the clinic by phone or WhatsApp." }
    ]
  },
  stats: [
    { value: "8+", label: "Years of practice" },
    { value: "Home", label: "Visits around Chandapura" },
    { value: "1:1", label: "Sessions, not group classes" }
  ],
  testimonialsTitle: "Trust built through patient experiences",
  testimonialsIntro: "These are fictional sample reviews for the template. Replace them with quotes your client has approved.",
  rating: {
    value: 4.9,
    max: 5,
    count: 36,
    label: "sample Google-style rating",
    url: "",
    includeInSchema: false
  },
  testimonials: [
    { quote: "The home visits made it possible to start knee rehab without travelling across the city. Sessions were calm, clear and easy to follow.", name: "Priya S.", meta: "Electronic City", rating: 5 },
    { quote: "I had been putting off shoulder work because of office hours. Booking on WhatsApp was straightforward and I knew the fee before the first visit.", name: "Ramesh K.", meta: "Hebbagodi", rating: 5 },
    { quote: "Helpful guidance for my mother’s back pain at home. We were told honestly whether a visit could be scheduled in our area.", name: "Fatima N.", meta: "Anekal Road", rating: 5 }
  ],
  galleryTitle: "Care, close to home",
  galleryIntro: "Placeholder photographs from Unsplash. Swap them for the clinic’s own photos before launch.",
  gallery: [
    { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80", alt: "Guided strengthening exercise during a physiotherapy session" },
    { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80", alt: "Consultation desk with clinical notes" },
    { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80", alt: "Treatment table in a calm therapy room" },
    { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80", alt: "Hands-on mobility work during a session" }
  ],
  faqTitle: "Frequently asked questions",
  faqIntro: "A few practical details before you enquire. An in-person assessment may be needed to recommend suitable care.",
  faqs: [
    { q: "Do you provide physiotherapy at home?", a: "Yes. Home-visit physiotherapy is available around Chandapura, Anekal, Hebbagodi, Jigani and Electronic City, subject to schedule. Share your area on WhatsApp to confirm." },
    { q: "How do I book an appointment?", a: "Call or send a WhatsApp message with your name, locality and a short note about what you need. You can also use the form on this page — it opens WhatsApp with a pre-filled message." },
    { q: "What do you focus on?", a: "Spine, shoulder and knee rehabilitation, plus general home physiotherapy visits. Get in touch to discuss your specific requirements." },
    { q: "What are the charges?", a: "Clinic-style sessions are listed at ₹800. A home visit is ₹1,000 including travel in the usual service area. Confirm the fee when you book, as this is sample pricing." },
    { q: "What should I expect when I enquire?", a: "Share your location and a brief description of your concerns. We will confirm whether a visit is possible and suggest a suitable time." }
  ],
  visitTitle: "Home physiotherapy around Chandapura–Anekal Road",
  visitIntro: "The example clinic is based around Chandapura–Anekal Road, Bengaluru. Contact us to confirm whether home visits are available at your address.",
  form: {
    title: "Ready to take the next step?",
    subtitle: "Connect by phone or WhatsApp to enquire about a personalised visit.",
    heading: "Home visit enquiry",
    note: "Send on WhatsApp opens a pre-filled message. This website does not store the form.",
    placeholder: "Your area, and a short note about spine, shoulder, knee or general rehab.",
    submitLabel: "Send on WhatsApp",
    successNote: "You will be taken to WhatsApp to review and send the message."
  },
  social: [
    { name: "Instagram", url: "https://www.instagram.com/example" },
    { name: "Google Maps", url: "https://maps.google.com/?q=Chandapura+Anekal+Road+Bengaluru" }
  ],
  sameAs: [],
  demoNote: "Demo site by BVD Builds",
  demoNoteUrl: "/my-memeory/demos/",
  footer: {
    credit: "Demo site by BVD Builds",
    creditUrl: "/my-memeory/demos/"
  }
};
