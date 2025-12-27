
import React, { useState, useEffect } from 'react';
import { 
  X, Phone, MessageSquare, ChevronRight, 
  MapPin, Calendar, Users, Info, Settings, Shield, ChevronLeft, Sparkles,
  ChevronLeftCircle, ChevronRightCircle, CheckCircle2, MoveHorizontal,
  Image as ImageIcon, Loader2, Plus, Edit2, Trash2, Check, RefreshCcw
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language, Booking, ServiceItem } from './types';
import { geminiService } from './services/geminiService';
import { apiService } from './services/apiService';

type View = 'splash' | 'language' | 'home' | 'catering' | 'decoration' | 'book' | 'contact' | 'success' | 'admin' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('splash');
  const [lang, setLang] = useState<Language>('en');
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [prefilledServices, setPrefilledServices] = useState<string[]>([]);
  const [adminTab, setAdminTab] = useState<'bookings' | 'services'>('bookings');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => {
        const savedLang = localStorage.getItem('app_lang') as Language;
        if (savedLang) {
          setLang(savedLang);
          setView('home');
        } else {
          setView('language');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Load Initial Data via API
  useEffect(() => {
    const loadData = async () => {
      const [fetchedBookings, fetchedServices] = await Promise.all([
        apiService.getBookings(),
        apiService.getServices()
      ]);
      setBookings(fetchedBookings);
      setServices(fetchedServices);
    };
    loadData();
  }, [view]);

  const handleCreateBooking = async (newBooking: Omit<Booking, 'id' | 'timestamp' | 'status'>) => {
    setLoading(true);
    try {
      const saved = await apiService.createBooking(newBooking);
      setLastBooking(saved);
      setView('success');
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: 'confirmed' | 'pending') => {
    await apiService.updateBookingStatus(id, status);
    const updated = await apiService.getBookings();
    setBookings(updated);
  };

  const handleUpdateService = async (s: ServiceItem) => {
    setLoading(true);
    await apiService.updateService(s);
    const updated = await apiService.getServices();
    setServices(updated);
    setLoading(false);
    setSelectedService(null);
  };

  const selectLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem('app_lang', l);
    setView('home');
  };

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get('password') === 'admin123') {
      setIsAdmin(true);
      setView('dashboard');
    } else {
      alert("Invalid Password");
    }
  };

  const getAiHelp = async (eventType: string, guests: number) => {
    setLoadingAi(true);
    const suggestion = await geminiService.getMenuSuggestions(eventType, guests, lang);
    setAiSuggestion(suggestion);
    setLoadingAi(false);
  };

  const handleBookNowClick = () => {
    setPrefilledServices([]);
    setView('book');
  };

  if (view === 'splash') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-maroon text-cream p-10 text-center">
        <div className="w-32 h-32 border-4 border-[#D4AF37] rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-4xl font-elegant">DB</span>
        </div>
        <h1 className="text-3xl font-elegant mb-2">Devbhoomi</h1>
        <p className="text-lg opacity-80">Catering & Wedding House</p>
        <p className="mt-10 font-hindi text-xl">मंगलम भगवान विष्णुः मंगलम गरुड़ध्वजः</p>
      </div>
    );
  }

  if (view === 'language') {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-cream p-6">
        <h2 className="text-2xl font-elegant mb-10 text-maroon">{t.selectLanguage}</h2>
        <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
          <button onClick={() => selectLanguage('en')} className="bg-maroon text-cream py-4 rounded-xl text-xl font-medium shadow-lg active:scale-95 transition-all">English</button>
          <button onClick={() => selectLanguage('hi')} className="bg-gold text-maroon py-4 rounded-xl text-xl font-hindi font-bold shadow-lg active:scale-95 transition-all">हिंदी</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="bg-maroon text-cream p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center"><span className="text-xs font-elegant">DB</span></div>
          <div>
            <h1 className="text-sm font-elegant leading-tight">Devbhoomi</h1>
            <p className="text-[10px] opacity-70 tracking-widest uppercase">Catering</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('language')} className="p-2 opacity-80 hover:opacity-100"><Settings size={20} /></button>
          <button onClick={() => setView('admin')} className="p-2 opacity-80 hover:opacity-100"><Shield size={20} /></button>
        </div>
      </header>

      <main className="p-4">
        {view === 'home' && (
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-cream text-2xl font-elegant mb-1">{t.welcome}</h2>
                <p className="text-gold text-sm italic">{t.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ServiceButton title={t.catering} icon={<Info className="text-gold" />} onClick={() => setView('catering')} />
              <ServiceButton title={t.decoration} icon={<Sparkles className="text-gold" />} onClick={() => setView('decoration')} />
            </div>

            <button onClick={handleBookNowClick} className="w-full bg-maroon text-cream py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
              <Calendar /> {t.bookNow}
            </button>
            <button onClick={() => setView('contact')} className="w-full bg-cream border-2 border-gold text-maroon py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all">
              <Phone /> {t.contactUs}
            </button>
          </div>
        )}

        {view === 'catering' && (
          <div className="space-y-6">
            <BackButton onClick={() => setView('home')} />
            <SectionHeader title={t.catering} />
            <div className="grid grid-cols-1 gap-6">
              {services.filter(s => s.category === 'catering').map(service => (
                <ServiceCard key={service.id} service={service} lang={lang} onSelect={setSelectedService} />
              ))}
            </div>
          </div>
        )}

        {view === 'decoration' && (
          <div className="space-y-6">
            <BackButton onClick={() => setView('home')} />
            <SectionHeader title={t.decoration} />
            <div className="grid grid-cols-1 gap-6">
              {services.filter(s => s.category === 'decoration').map(service => (
                <ServiceCard key={service.id} service={service} lang={lang} onSelect={setSelectedService} />
              ))}
            </div>
            <DecorationGallery lang={lang} t={t} onSelectImage={(img) => {
              const s = services.find(sv => sv.images.includes(img));
              if (s) setSelectedService(s);
            }} services={services} />
          </div>
        )}

        {view === 'book' && (
          <div className="space-y-6">
            <BackButton onClick={() => setView('home')} />
            <SectionHeader title={t.bookNow} />
            <BookingForm 
              t={t} 
              onSubmit={handleCreateBooking} 
              onAiHelp={getAiHelp} 
              loadingAi={loadingAi} 
              loading={loading}
              aiSuggestion={aiSuggestion} 
              initialServices={prefilledServices}
            />
          </div>
        )}

        {view === 'success' && lastBooking && (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><Check size={40} /></div>
            <h2 className="text-2xl font-elegant text-maroon mb-4">{t.success}</h2>
            <p className="text-gray-600 mb-8">Ref: #{lastBooking.id}</p>
            <div className="w-full space-y-4">
              <a href="tel:+911234567890" className="w-full bg-maroon text-cream py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg"><Phone /> {t.call}</a>
              <a href={`https://wa.me/911234567890?text=Booking Request: ${lastBooking.id}`} className="w-full bg-green-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg"><MessageSquare /> {t.whatsapp}</a>
              <button onClick={() => setView('home')} className="w-full py-4 text-maroon font-medium">Return Home</button>
            </div>
          </div>
        )}

        {view === 'contact' && (
          <div className="space-y-8">
            <BackButton onClick={() => setView('home')} />
            <SectionHeader title={t.contactUs} />
            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
              <ContactInfoItem icon={<MapPin />} title="Address" value={t.address} />
              <ContactInfoItem icon={<Phone />} title="Phone" value="+91 98765 43210" />
              <div className="rounded-xl overflow-hidden h-48 border border-gray-200">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110190.62739345209!2d79.46740615599042!3d29.215582846985062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09ade14e47855%3A0xc3c66f7f3299c82!2sHaldwani%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="max-w-md mx-auto py-10 space-y-8">
            <BackButton onClick={() => setView('home')} />
            <div className="text-center">
              <h2 className="text-3xl font-elegant text-maroon mb-2">{t.adminLogin}</h2>
              <p className="text-gray-500">Secure access for staff</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <Input label={t.password} name="password" type="password" required placeholder="Enter admin password (admin123)" />
              <button type="submit" className="w-full bg-maroon text-cream py-4 rounded-xl font-bold shadow-lg">Login</button>
            </form>
          </div>
        )}

        {view === 'dashboard' && isAdmin && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-elegant text-maroon">{t.dashboard}</h2>
              <button onClick={() => { setIsAdmin(false); setView('home'); }} className="text-red-500 font-bold flex items-center gap-1"><X size={18} /> Logout</button>
            </div>

            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gold/20 mb-6">
              <button onClick={() => setAdminTab('bookings')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${adminTab === 'bookings' ? 'bg-maroon text-cream shadow-md' : 'text-gray-500'}`}>Bookings ({bookings.length})</button>
              <button onClick={() => setAdminTab('services')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${adminTab === 'services' ? 'bg-maroon text-cream shadow-md' : 'text-gray-500'}`}>Services ({services.length})</button>
            </div>

            {adminTab === 'bookings' ? (
              <div className="space-y-4">
                {bookings.length === 0 ? <EmptyState text="No bookings yet" /> : bookings.map(b => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-gold">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{b.fullName} <span className="text-[10px] text-gray-400 font-normal">#{b.id}</span></h4>
                      <select 
                        value={b.status} 
                        onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold outline-none border ${b.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gold/10 text-gold border-gold/20'}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-2"><Calendar size={12} /> {b.date} | <Users size={12} /> {b.guests} Guests</p>
                    <p className="text-xs text-gray-600 mb-3 italic">{b.notes || 'No specific notes'}</p>
                    <div className="flex gap-2">
                      <a href={`tel:${b.mobile}`} className="flex-1 bg-maroon text-cream text-[10px] py-2 rounded-lg text-center flex items-center justify-center gap-1 font-bold"><Phone size={12} /> Call</a>
                      <a href={`https://wa.me/91${b.mobile}`} className="flex-1 bg-green-600 text-white text-[10px] py-2 rounded-lg text-center flex items-center justify-center gap-1 font-bold"><MessageSquare size={12} /> WhatsApp</a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {services.map(s => (
                  <div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gold/10">
                    <div className="flex items-center gap-3">
                      <img src={s.images[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">{s.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.category}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedService(s)} className="p-2 text-maroon hover:bg-cream rounded-full transition-colors"><Edit2 size={18} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Service Detail / Edit Modal */}
      {selectedService && (
        <ServiceDetailModal 
          service={selectedService} 
          lang={lang} 
          t={t}
          isAdmin={isAdmin && adminTab === 'services'}
          onClose={() => setSelectedService(null)} 
          onSave={handleUpdateService}
          loading={loading}
          onBook={() => {
            const cat = selectedService.category;
            setPrefilledServices([cat.charAt(0).toUpperCase() + cat.slice(1)]);
            setSelectedService(null);
            setView('book');
          }}
        />
      )}

      {/* Persistence Floating Actions */}
      {!['splash', 'language', 'admin', 'dashboard', 'success'].includes(view) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gold/20 p-4 flex gap-4 z-50 animate-in slide-in-from-bottom">
          <a href="tel:+911234567890" className="flex-1 bg-maroon text-cream py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg font-bold"><Phone size={20} /> {t.call}</a>
          <a href="https://wa.me/911234567890" className="flex-1 bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg font-bold"><MessageSquare size={20} /> {t.whatsapp}</a>
        </div>
      )}
    </div>
  );
};

// --- Sub Components ---

const ServiceDetailModal: React.FC<{ 
  service: ServiceItem; 
  lang: string; 
  onClose: () => void; 
  onBook: () => void;
  onSave: (s: ServiceItem) => void;
  loading: boolean;
  isAdmin: boolean;
  t: any;
}> = ({ service, lang, onClose, onBook, onSave, loading, isAdmin, t }) => {
  const [editedService, setEditedService] = useState<ServiceItem>({ ...service });

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-cream w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom">
        <button onClick={onClose} className="absolute top-4 right-4 z-[110] bg-black/50 text-white p-2 rounded-full backdrop-blur-md"><X size={24} /></button>
        
        <div className="h-64 sm:h-80 w-full">
          <ImageGallery images={editedService.images} />
        </div>

        <div className="p-6 sm:p-10 space-y-6 pb-24">
          {isAdmin ? (
            <div className="space-y-4">
              <h3 className="text-xl font-elegant text-maroon flex items-center gap-2"><Edit2 size={18} /> Edit Service (Admin)</h3>
              <Input label="Title (EN)" value={editedService.title} onChange={(e: any) => setEditedService({...editedService, title: e.target.value})} />
              <Input label="Title (HI)" value={editedService.titleHi} onChange={(e: any) => setEditedService({...editedService, titleHi: e.target.value})} />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-maroon uppercase tracking-widest">Description (EN)</label>
                <textarea className="w-full p-3 rounded-xl border border-gold/20 bg-white min-h-[100px]" value={editedService.description} onChange={(e: any) => setEditedService({...editedService, description: e.target.value})} />
              </div>
              <button 
                onClick={() => onSave(editedService)} 
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Check /> Save Changes</>}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest"><Sparkles size={14} /> {service.category} Service</div>
                <h2 className="text-3xl sm:text-4xl font-elegant text-maroon">{lang === 'hi' ? service.titleHi : service.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">{lang === 'hi' ? service.descriptionHi : service.description}</p>
              
              {service.menu && (
                <div className="bg-white p-6 rounded-3xl border border-gold/20 shadow-sm space-y-4">
                  <h3 className="text-maroon font-elegant text-xl flex items-center gap-2"><Info size={20} className="text-gold" /> {t.viewMenu}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lang === 'hi' ? service.menuHi : service.menu).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gold/5 rounded-xl text-gray-700">
                        <CheckCircle2 size={16} className="text-maroon flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={onBook} className="w-full bg-maroon text-cream py-5 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center gap-3"><Calendar size={24} /> Book This Service</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceButton: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void }> = ({ title, icon, onClick }) => (
  <button onClick={onClick} className="bg-white p-6 rounded-3xl shadow-sm border border-gold/10 flex flex-col items-center justify-center text-center gap-3 active:bg-cream transition-colors">
    <div className="p-3 bg-cream rounded-2xl">{icon}</div>
    <span className="text-maroon font-bold text-xs uppercase tracking-wider">{title}</span>
  </button>
);

const CategoryLabel: React.FC<{ text: string }> = ({ text }) => (
  <div className="bg-white p-4 rounded-xl border border-gold/20 text-maroon text-xs font-bold text-center">{text}</div>
);

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-1 text-maroon font-bold text-sm mb-4"><ChevronLeft size={18} /> Back</button>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl font-elegant text-maroon border-b-2 border-gold pb-2 inline-block mb-4">{title}</h2>
);

const EmptyState: React.FC<{ text: string }> = ({ text }) => (
  <div className="p-10 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300 italic">{text}</div>
);

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-cream rounded-xl text-maroon">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-800 text-sm uppercase tracking-widest">{title}</h4>
      <p className="text-gray-500">{value}</p>
    </div>
  </div>
);

const DecorationGallery: React.FC<{ lang: string; t: any; onSelectImage: (img: string) => void; services: ServiceItem[] }> = ({ lang, t, onSelectImage, services }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const decorationServices = services.filter(s => s.category === 'decoration');
  const allImages = decorationServices.flatMap(s => s.images.map(img => ({ url: img, serviceTitle: lang === 'hi' ? s.titleHi : s.title })));
  const filteredImages = activeCategory ? allImages.filter(img => img.serviceTitle.toLowerCase().includes(activeCategory.toLowerCase())) : allImages;

  return (
    <div className="mt-12 space-y-6">
      <h3 className="text-2xl font-elegant text-maroon flex items-center gap-2"><ImageIcon className="text-gold" size={24} /> Inspiration Gallery</h3>
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4">
        {['All', 'Stage', 'Floral', 'Tent', 'Theme'].map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat === 'All' ? null : cat)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === (cat === 'All' ? null : cat) ? 'bg-maroon text-cream border-maroon' : 'bg-white text-maroon border-gold/20'}`}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredImages.map((img, i) => (
          <div key={i} className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg cursor-pointer" onClick={() => onSelectImage(img.url)}>
            <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative h-full w-full bg-black/5 group">
      <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img, i) => (<img key={i} src={img} className="w-full h-full object-cover flex-shrink-0" alt="" />))}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={() => setIndex(prev => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 p-2 bg-black/10 rounded-full"><ChevronLeftCircle /></button>
          <button onClick={() => setIndex(prev => (prev + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 p-2 bg-black/10 rounded-full"><ChevronRightCircle /></button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/10 rounded-full backdrop-blur-sm">
            {images.map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-gold w-3' : 'bg-white/40'}`} />))}
          </div>
        </>
      )}
    </div>
  );
};

const ServiceCard: React.FC<{ service: ServiceItem; lang: string; onSelect: (s: ServiceItem) => void }> = ({ service, lang, onSelect }) => (
  <div onClick={() => onSelect(service)} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gold/10 cursor-pointer group">
    <div className="relative h-56 overflow-hidden">
      <img src={service.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
      <div className="absolute top-4 right-4 bg-maroon text-cream text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg border border-gold/30">{service.category}</div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-elegant text-maroon mb-2">{lang === 'hi' ? service.titleHi : service.title}</h3>
      <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{lang === 'hi' ? service.descriptionHi : service.description}</p>
      <button className="w-full bg-cream border border-maroon text-maroon py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-maroon group-hover:text-cream transition-colors">View Details <ChevronRight size={16} /></button>
    </div>
  </div>
);

const BookingForm: React.FC<{ t: any; onSubmit: (data: any) => void; onAiHelp: (t: string, g: number) => void; loadingAi: boolean; loading: boolean; aiSuggestion: string | null; initialServices?: string[]; }> = ({ t, onSubmit, onAiHelp, loadingAi, loading, aiSuggestion, initialServices = [] }) => {
  const [services, setServices] = useState<string[]>(initialServices);
  const [eventType, setEventType] = useState('Wedding');
  const [guests, setGuests] = useState(100);

  useEffect(() => { setServices(initialServices); }, [initialServices]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      fullName: formData.get('fullName'),
      mobile: formData.get('mobile'),
      eventType,
      date: formData.get('eventDate'),
      location: formData.get('location'),
      guests,
      notes: formData.get('notes'),
      services
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-gold/10">
        <Input label={t.fullName} name="fullName" required placeholder="Enter your name" />
        <Input label={t.mobile} name="mobile" required type="tel" placeholder="98765 XXXXX" />
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-maroon uppercase tracking-widest">{t.eventType}</label>
          <select onChange={(e) => setEventType(e.target.value)} className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 outline-none text-sm font-medium">
            <option>Wedding</option><option>Reception</option><option>Engagement</option><option>Birthday Party</option><option>Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-maroon uppercase tracking-widest">{t.servicesRequired}</label>
          <div className="grid grid-cols-2 gap-2">
            {['Catering', 'Decoration'].map(s => (
              <button type="button" key={s} onClick={() => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} className={`p-3 rounded-xl border text-[10px] font-bold transition-all ${services.includes(s) ? 'bg-maroon text-cream border-maroon' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{s}</button>
            ))}
          </div>
        </div>
        <Input label={t.eventDate} name="eventDate" type="date" required />
        <Input label={t.location} name="location" placeholder="City or Venue name" required />
        <Input label={t.guests} name="guests" type="number" required defaultValue={100} onChange={(e: any) => setGuests(Number(e.target.value))} />
        <div className="pt-2">
          <button type="button" onClick={() => onAiHelp(eventType, guests)} disabled={loadingAi} className="w-full border border-gold/50 bg-gold/5 text-gold py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            {loadingAi ? <Loader2 className="animate-spin" size={14} /> : <><Sparkles size={14} /> Get AI Menu Suggestion</>}
          </button>
          {aiSuggestion && <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-800 italic whitespace-pre-wrap leading-relaxed">{aiSuggestion}</div>}
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-maroon uppercase tracking-widest">{t.notes}</label>
          <textarea name="notes" className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 outline-none h-20 text-xs" placeholder="Specific requests?" />
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-maroon text-cream py-5 rounded-2xl text-xl font-bold shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
        {loading ? <Loader2 className="animate-spin" /> : t.submit}
      </button>
    </form>
  );
};

const Input: React.FC<any> = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-maroon uppercase tracking-widest">{label}</label>
    <input className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 outline-none focus:ring-1 focus:ring-gold text-sm font-medium" {...props} />
  </div>
);

export default App;
