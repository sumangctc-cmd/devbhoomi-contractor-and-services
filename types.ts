
export type Language = 'en' | 'hi';

export interface TranslationSet {
  welcome: string;
  tagline: string;
  selectLanguage: string;
  catering: string;
  decoration: string;
  bookNow: string;
  contactUs: string;
  fullName: string;
  mobile: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  notes: string;
  submit: string;
  success: string;
  whatsapp: string;
  call: string;
  adminLogin: string;
  login: string;
  password: string;
  dashboard: string;
  logout: string;
  servicesRequired: string;
  veg: string;
  nonVeg: string;
  viewMenu: string;
  stageDecoration: string;
  tentLighting: string;
  floral: string;
  theme: string;
  address: string;
}

export interface Booking {
  id: string;
  fullName: string;
  mobile: string;
  eventType: string;
  services: string[];
  date: string;
  location: string;
  guests: number;
  notes: string;
  status: 'pending' | 'confirmed';
  timestamp: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  images: string[];
  category: 'catering' | 'decoration';
  menu?: string[];
  menuHi?: string[];
}
