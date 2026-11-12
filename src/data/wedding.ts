export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "date", label: "Date" },
  { id: "story", label: "Story" },
  { id: "couple", label: "Couple" },
  { id: "events", label: "Events" },
  { id: "travel", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
  { id: "thanks", label: "Thanks" },
];

export const coupleDetails = {
  names: "Kavya & Rohan",
  bride: "Kavya",
  groom: "Rohan",
  monogram: "K & R",
  eyebrow: "Where two rivers meet",
  heroLine: "two hearts become one",
  words: {
    he: "He found his calm.",
    she: "She found her home.",
  },
};

export const dateDetails = {
  title: "",
  dateFormatted: "12 · 12 · 2025",
  location: "Prayagraj, Uttar Pradesh",
  note: "as the rivers meet, so do our lives",
};

export interface StoryBeat {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  className: string;
}

export const weddingPhotos: string[] = [
  "https://images.pexels.com/photos/13887623/pexels-photo-13887623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=650",
  "https://images.pexels.com/photos/35069916/pexels-photo-35069916.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=650",
  "https://images.pexels.com/photos/28411910/pexels-photo-28411910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=650",
  "https://images.pexels.com/photos/39137516/pexels-photo-39137516.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=650",
];

export const storyBeats: StoryBeat[] = [
  {
    src: weddingPhotos[0],
    alt: "Ananya and Rohan in the mountains",
    title: "Two different dreams",
    subtitle: "found the same horizon",
    className: "beat-one",
  },
  {
    src: weddingPhotos[1],
    alt: "The couple sharing a quiet moment",
    title: "Two hearts",
    subtitle: "chose one path",
    className: "beat-two",
  },
  {
    src: weddingPhotos[2],
    alt: "Ananya and Rohan celebrating",
    title: "One Sangam",
    subtitle: "and then, one direction",
    className: "beat-three",
  },
];

export interface WeddingEvent {
  name: string;
  date: string;
  year?: string;
  className: string;
  note: string;
  timeLocation?: string;
}

export const weddingEvents: WeddingEvent[] = [
  {
    name: "Roka",
    date: "09 Dec",
    year: "2025",
    className: "roka",
    note: "Auspicious official commitment, blessings & shagun exchange",
    timeLocation: "Heritage Grand Hall · 10:00 AM onwards",
  },
  {
    name: "Mayra",
    date: "10 Dec",
    year: "2025",
    className: "mayra",
    note: "Maternal uncle's blessings & traditional gifts",
    timeLocation: "Sangam Courtyard · 10:00 AM onwards",
  },
  {
    name: "Shagun",
    date: "10 Dec",
    year: "2025",
    className: "shagun",
    note: "Auspicious tokens, sweets & family blessings",
    timeLocation: "Royal Banquet Hall · 1:00 PM onwards",
  },
  {
    name: "Cocktail",
    date: "10 Dec",
    year: "2025",
    className: "cocktail",
    note: "Toasts, signature spirits & glamorous dancing",
    timeLocation: "The Grand Ballroom · 7:30 PM onwards",
  },
  {
    name: "Tilak",
    date: "11 Dec",
    year: "2025",
    className: "tilak",
    note: "Sacred vermillion mark & traditional family honor",
    timeLocation: "Heritage Pavilions · 11:00 AM onwards",
  },
  {
    name: "Mehendi",
    date: "11 Dec",
    year: "2025",
    className: "mehendi",
    note: "Auspicious fragrant henna, folk songs & vibrant celebration",
    timeLocation: "The Riverside Courtyard · 1:00 PM onwards",
  },
  {
    name: "Engagement",
    date: "11 Dec",
    year: "2025",
    className: "engagement",
    note: "Exchange of rings & eternal promises",
    timeLocation: "Poolside Lawns · 5:00 PM onwards",
  },
  {
    name: "Sangeet",
    date: "11 Dec",
    year: "2025",
    className: "sangeet",
    note: "An evening of musical rhythms, joyous performances & dancing",
    timeLocation: "The Royal Amphitheatre · 7:30 PM onwards",
  },
  {
    name: "Haldi",
    date: "12 Dec",
    year: "2025",
    className: "haldi",
    note: "Golden turmeric blessings, fragrant rose petals & joyful laughter",
    timeLocation: "Sunlit Poolside Lawns · 10:00 AM onwards",
  },
  {
    name: "Bhaat",
    date: "12 Dec",
    year: "2025",
    className: "bhaat",
    note: "Folk melodies & maternal family welcoming",
    timeLocation: "Anand Bhavan Courtyard · 11:30 AM onwards",
  },
  {
    name: "Shaadi",
    date: "12 Dec",
    year: "2025",
    className: "shaadi",
    note: "The sacred royal wedding union, baraat & divine blessings",
    timeLocation: "The Vedic Sangam Mandap · 5:30 PM onwards",
  },
  {
    name: "Varmala",
    date: "12 Dec",
    year: "2025",
    className: "varmala",
    note: "Exchange of sacred fragrant floral garlands",
    timeLocation: "Sangam Ghat Mandap · 7:00 PM onwards",
  },
  {
    name: "Pheras",
    date: "12 Dec",
    year: "2025",
    className: "pheras",
    note: "Seven sacred vows around the holy fire",
    timeLocation: "The Vedic Mandap · 8:30 PM onwards",
  },
  {
    name: "Reception",
    date: "13 Dec",
    year: "2025",
    className: "reception",
    note: "A grand royal feast with music & celebrations",
    timeLocation: "The Grand Palace Lawns · 7:00 PM onwards",
  },
  {
    name: "Vidaai",
    date: "13 Dec",
    year: "2025",
    className: "vidaai",
    note: "Tearful farewell with petals & heartfelt blessings",
    timeLocation: "Main Portico · 11:00 PM onwards",
  },
];

export interface TravelMode {
  type: string;
  detail: string;
}

export interface TravelItem {
  label: string;
  detail?: string;
  url?: string;
}

export interface VenueDetails {
  sectionTitle?: string;
  headerTitle: string;
  name: string;
  city: string;
  mapPinLabel: string;
  mapUrl: string;
  travelItems: [
    TravelItem,
    TravelItem,
    TravelItem,
    TravelItem,
    TravelItem,
    TravelItem
  ];
  modes?: TravelMode[];
}

export const venueDetails: VenueDetails = {
  sectionTitle: "Venue",
  headerTitle: "Sangam Ghat",
  name: "Sangam Ghat",
  city: "Prayagraj, Uttar Pradesh",
  mapPinLabel: "Sangam Ghat",
  mapUrl: "https://maps.google.com/?q=Sangam+Ghat+Prayagraj",
  travelItems: [
    {
      label: "Road",
      detail:
        "Well-connected via NH19. Local app cabs & pre-booked private taxis are readily available.",
    },
    {
      label: "Air",
      detail:
        "Prayagraj Airport (IXD) is ~12 km away, with direct connecting flights from major cities.",
    },
    {
      label: "Train",
      detail:
        "Prayagraj Junction (PRYJ) is ~6 km from the venue, with frequent express trains across India.",
    },
    {
      label: "Boat Ghat",
      detail:
        "Auspicious ceremonial boat rides across the holy confluence of Ganga & Yamuna rivers.",
    },
    {
      label: "Nearby Stay",
      detail:
        "Luxury heritage riverside camps, resorts, and premium hotels located within 5–15 minutes.",
    },
    {
      label: "Travel Tips",
      detail:
        "Light shawl or warm evening wrap recommended for riverside breeze. Comfortable footwear advised.",
    },
  ],
  modes: [
    { type: "Car", detail: "Local taxis" },
    { type: "Flight", detail: "IXD airport" },
    { type: "Train", detail: "Prayagraj Jn." },
  ],
};

export interface GalleryItem {
  src: string;
  caption: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/photo_1.jpg",
    caption: "Rohan & Kavya",
    alt: "Rohan and Kavya sitting together",
  },
  {
    src: "/images/gallery/photo_2.jpg",
    caption: "Sunset at the Lake",
    alt: "Rohan and Kavya sitting on terrace overlooking sunset lake",
  },
  {
    src: "/images/gallery/photo_3.jpg",
    caption: "A Lifetime Promise",
    alt: "Holding hands with bridal mehndi and bangles",
  },
  {
    src: "/images/gallery/photo_4.jpg",
    caption: "Under the Floral Pavilion",
    alt: "Rohan and Kavya standing under floral arch overlooking lake",
  },
];

export const finaleDetails = {
  title: "Thank You",
  place: "Devprayag Sangam",
  message: "For following our rivers all the way home.",
};

export const weddingImages = {
  hero: "/images/backgrounds/hero-arch.jpg",
  date: "/images/backgrounds/Date-page.jpg",
  story: "/images/backgrounds/Story-page.png",
  couple: "/images/backgrounds/Couple-page.png",
  events: "/images/backgrounds/Event-page.png",
  travel: "/images/backgrounds/Venue-page.png",
  venue: "/images/backgrounds/Venue-page.png",
  gallery: "/images/backgrounds/Gallery-page.png",
  rsvp: "/images/backgrounds/RSVP-page-.png",
  finale: "/images/backgrounds/Final-page.png",
};
