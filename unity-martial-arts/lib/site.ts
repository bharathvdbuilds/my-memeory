export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

export const WHATSAPP_TEXT =
  "Hi, I saw the Unity Martial Arts Club website. I would like to enquire about the ₹2,000 offer (valid for 24 hours). Please share class details.";

export const WHATSAPP_URL = `https://wa.me/918050460145?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const PHONE_TEL = "tel:+918050460145";
export const PHONE_DISPLAY = "+91 80504 60145";
export const MAPS_URL = "https://share.google/7QPRBrl3fEyY1xSl5";

export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#coach", label: "Our Coach" },
  { href: "#fees", label: "Fees" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export const PROGRAMS = [
  {
    index: "01",
    title: "Karate Training",
    body: "Technique, coordination, fitness, and discipline, built through traditional fundamentals. Classes give students a clear structure to practise and improve.",
  },
  {
    index: "02",
    title: "Kata Training",
    body: "Improve movement, balance, precision, memory, and traditional forms. Students repeat each form until the sequence is controlled and remembered.",
  },
  {
    index: "03",
    title: "Kumite Training",
    body: "Sparring fundamentals: timing, distance, and control, with preparation for students who want to compete. Practice stays measured and parent-appropriate.",
  },
  {
    index: "04",
    title: "Self-Defence",
    body: "Practical awareness and defence skills for kids, teens, and adults, boys and girls. Sessions focus on reading a situation and using simple, effective responses.",
  },
] as const;

export const FEE_GROUPS = [
  {
    title: "Kids",
    text: "Group classes for children, covering karate along with kata, kumite, and self-defence.",
  },
  {
    title: "Teenagers",
    text: "Group classes for teenagers, covering karate along with kata, kumite, and self-defence.",
  },
  {
    title: "Adults",
    text: "Group classes for adults, covering karate along with kata, kumite, and self-defence.",
  },
] as const;

export const GALLERY = [
  {
    src: "/images/gallery-1.jpg",
    alt: "A young student and an instructor holding a karate stance in a sunlit dojo",
    width: 1400,
    height: 933,
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "A child in a red gi training beside an instructor",
    width: 1400,
    height: 933,
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Two adults practising a controlled block",
    width: 1400,
    height: 933,
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "A student in a white gi practising a kick",
    width: 1400,
    height: 933,
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Two teenagers in karate gi during training",
    width: 1400,
    height: 787,
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "A group practising karate outdoors at sunset",
    width: 1600,
    height: 1006,
  },
] as const;
