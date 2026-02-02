import { apiRequest } from './config';

export interface Contact {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export const contactAPI = {
  create: async (contact: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<Contact> => {
    const response = await apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
    const contactData = response.data;
    return {
      ...contactData,
      id: contactData._id || contactData.id,
    };
  },
};

