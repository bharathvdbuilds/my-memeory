export type NavItem = {
  label: string;
  path: string;
};

export const primaryNav: NavItem[] = [
  { label: "About", path: "/about" },
  { label: "Civil", path: "/civil-construction" },
  { label: "Commercial", path: "/commercial-construction" },
  { label: "PEB & Industrial", path: "/peb-industrial" },
  { label: "Architecture", path: "/architecture" },
  { label: "Projects", path: "/projects" },
  { label: "Materials", path: "/material-collaborations" },
  { label: "Joint Ventures", path: "/joint-ventures" },
  { label: "Contact", path: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Home", path: "/" },
  ...primaryNav,
];

export const contactPlaceholders = {
  phoneDisplay: "[Phone placeholder]",
  phoneHref: "tel:+910000000000",
  whatsappDisplay: "[WhatsApp placeholder]",
  whatsappHref: "https://wa.me/910000000000",
  emailDisplay: "[email placeholder]",
  emailHref: "mailto:hello@example.com",
  address: "[Office address placeholder — to be confirmed]",
  note: "Contact details are placeholders until verified for this site build. Replace before launch.",
};
