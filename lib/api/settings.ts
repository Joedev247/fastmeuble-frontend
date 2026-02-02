import { apiRequest } from './config';

export interface Settings {
  _id?: string;
  storeName: string;
  storeDescription: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  businessHours: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  mobileMoney: boolean;
  cashOnDelivery: boolean;
  cardPayment: boolean;
  freeShippingThreshold: number;
  shippingRate: number;
  currency: string;
  language: string;
  createdAt?: string;
  updatedAt?: string;
}

export const settingsAPI = {
  get: async (): Promise<Settings> => {
    const response = await apiRequest('/settings');
    return response.data;
  },

  update: async (settings: Partial<Settings>): Promise<Settings> => {
    const response = await apiRequest('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    return response.data;
  },
};

