
import React from 'react';
import { TranslationSet, ServiceItem } from './types';

export const TRANSLATIONS: Record<'en' | 'hi', TranslationSet> = {
  en: {
    welcome: "Welcome to Devbhoomi",
    tagline: "Making Your Special Day Unforgettable",
    selectLanguage: "Choose Your Language",
    catering: "Catering Services",
    decoration: "Wedding Decoration",
    bookNow: "Book Now",
    contactUs: "Contact Us",
    fullName: "Full Name",
    mobile: "Mobile Number",
    eventType: "Event Type",
    eventDate: "Event Date",
    location: "Event Location",
    guests: "Number of Guests",
    notes: "Additional Notes",
    submit: "Submit Request",
    success: "Thank You! We have received your request.",
    whatsapp: "WhatsApp Us",
    call: "Call Us",
    adminLogin: "Admin Login",
    login: "Login",
    password: "Password",
    dashboard: "Admin Dashboard",
    logout: "Logout",
    servicesRequired: "Services Required",
    veg: "Veg",
    nonVeg: "Non-Veg",
    viewMenu: "View Menu",
    stageDecoration: "Stage Decoration",
    tentLighting: "Tent & Lighting",
    floral: "Floral Decoration",
    theme: "Theme Wedding",
    address: "Haldwani, Uttarakhand, India"
  },
  hi: {
    welcome: "देवभूमि में आपका स्वागत है",
    tagline: "आपके विशेष दिन को यादगार बनाना",
    selectLanguage: "अपनी भाषा चुनें",
    catering: "खान-पान सेवाएं",
    decoration: "शादी की सजावट",
    bookNow: "अभी बुक करें",
    contactUs: "संपर्क करें",
    fullName: "पूरा नाम",
    mobile: "मोबाइल नंबर",
    eventType: "कार्यक्रम का प्रकार",
    eventDate: "कार्यक्रम की तिथि",
    location: "कार्यक्रम का स्थान",
    guests: "मेहमानों की संख्या",
    notes: "अतिरिक्त निर्देश",
    submit: "अनुरोध भेजें",
    success: "धन्यवाद! हमें आपका अनुरोध प्राप्त हो गया है।",
    whatsapp: "व्हाट्सएप करें",
    call: "कॉल करें",
    adminLogin: "एडमिन लॉगिन",
    login: "लॉगिन",
    password: "पासवर्ड",
    dashboard: "एडमिन डैशबोर्ड",
    logout: "लॉगआउट",
    servicesRequired: "आवश्यक सेवाएं",
    veg: "शाकाहारी",
    nonVeg: "माँसाहारी",
    viewMenu: "मेन्यू देखें",
    stageDecoration: "स्टेज सजावट",
    tentLighting: "टेंट और लाइटिंग",
    floral: "फूलों की सजावट",
    theme: "थीम वेडिंग",
    address: "हल्द्वानी, उत्तराखंड, भारत"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'cat-1',
    category: 'catering',
    title: 'Wedding Catering',
    titleHi: 'शादी खान-पान',
    description: 'Traditional Pahadi and multi-cuisine experience with a focus on hygiene and presentation.',
    descriptionHi: 'स्वच्छता और प्रस्तुति पर ध्यान देने के साथ पारंपरिक पहाड़ी और बहु-व्यंजन अनुभव।',
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544124499-58ec52cf37ee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop'
    ],
    menu: ['Kumaoni Raita', 'Bhatt ki Churkani', 'Paneer Butter Masala', 'Jhangora ki Kheer'],
    menuHi: ['कुमाऊँनी रायता', 'भट्ट की चुड़कानी', 'पनीर बटर मसाला', 'झंगोरा की खीर']
  },
  {
    id: 'cat-2',
    category: 'catering',
    title: 'Reception & Event Buffet',
    titleHi: 'रिसेप्शन और इवेंट बुफे',
    description: 'Modern global buffet featuring live counters, mocktails, and gourmet appetizers.',
    descriptionHi: 'लाइव काउंटर, मॉकटेल और गॉरमेट ऐपेटाइज़र के साथ आधुनिक ग्लोबल बुफे।',
    images: [
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop'
    ],
    menu: ['Grilled Starters', 'Exotic Salads', 'Fusion Pasta', 'Ice Cream Sundae Bar'],
    menuHi: ['ग्रिल्ड स्टार्टर्स', 'विदेशी सलाद', 'फ्यूजन पास्ता', 'आइसक्रीम संडे बार']
  },
  {
    id: 'dec-1',
    category: 'decoration',
    title: 'Royal Stage Decoration',
    titleHi: 'शाही स्टेज सजावट',
    description: 'Elegant stage setup with gold accents, rich fabrics, and majestic floral arrangements.',
    descriptionHi: 'सोने के लहजे, समृद्ध कपड़ों और आलीशान फूलों की व्यवस्था के साथ सुंदर स्टेज सेटअप।',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561912734-77436329486c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'dec-2',
    category: 'decoration',
    title: 'Floral & Entrance Theme',
    titleHi: 'फ्लोरल और प्रवेश द्वार थीम',
    description: 'Breathtaking floral pathways and grand entrances that leave a lasting impression.',
    descriptionHi: 'शानदार फूलों के रास्ते और भव्य प्रवेश द्वार जो एक स्थायी प्रभाव छोड़ते हैं।',
    images: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522673607200-164883eecd4c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'dec-3',
    category: 'decoration',
    title: 'Tent & Lighting Decor',
    titleHi: 'टेंट और लाइटिंग सजावट',
    description: 'Magical lighting setups and grand tenting structures for outdoor night celebrations.',
    descriptionHi: 'बाहरी रात के समारोहों के लिए जादुई लाइटिंग सेटअप और भव्य टेंटिंग संरचनाएं।',
    images: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

export const COLORS = {
  maroon: '#800000',
  gold: '#D4AF37',
  cream: '#FFFDD0'
};
