
import { Booking, ServiceItem } from '../types';
import { SERVICES } from '../constants';

const BOOKINGS_KEY = 'db_bookings_v1';
const SERVICES_KEY = 'db_services_v1';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  private init() {
    if (!localStorage.getItem(SERVICES_KEY)) {
      localStorage.setItem(SERVICES_KEY, JSON.stringify(SERVICES));
    }
  }

  constructor() {
    this.init();
  }

  // --- Bookings ---
  async getBookings(): Promise<Booking[]> {
    await delay(600);
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  }

  async createBooking(booking: Omit<Booking, 'id' | 'timestamp' | 'status'>): Promise<Booking> {
    await delay(1000);
    const bookings = await this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: Date.now(),
      status: 'pending'
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  }

  async updateBookingStatus(id: string, status: 'confirmed' | 'pending'): Promise<void> {
    await delay(500);
    const bookings = await this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  }

  // --- Services ---
  async getServices(): Promise<ServiceItem[]> {
    await delay(400);
    const data = localStorage.getItem(SERVICES_KEY);
    return data ? JSON.parse(data) : SERVICES;
  }

  async updateService(updatedService: ServiceItem): Promise<void> {
    await delay(800);
    const services = await this.getServices();
    const updated = services.map(s => s.id === updatedService.id ? updatedService : s);
    localStorage.setItem(SERVICES_KEY, JSON.stringify(updated));
  }
}

export const apiService = new ApiService();
