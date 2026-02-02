import { apiRequest } from './config';

export interface FeaturedSection {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  discount?: string;
  title: string;
  buttonText: string;
  image: string;
  link: string;
  productId?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const featuredSectionAPI = {
  getAll: async (): Promise<FeaturedSection[]> => {
    const response = await apiRequest('/featured-sections');
    return response.data.map((s: FeaturedSection) => ({
      ...s,
      id: s._id || s.id,
    }));
  },

  getById: async (id: string): Promise<FeaturedSection> => {
    const response = await apiRequest(`/featured-sections/${id}`);
    const section = response.data;
    return {
      ...section,
      id: section._id || section.id,
    };
  },

  create: async (section: Partial<FeaturedSection>): Promise<FeaturedSection> => {
    const response = await apiRequest('/featured-sections', {
      method: 'POST',
      body: JSON.stringify(section),
    });
    const created = response.data;
    return {
      ...created,
      id: created._id || created.id,
    };
  },

  update: async (id: string, updates: Partial<FeaturedSection>): Promise<FeaturedSection> => {
    const response = await apiRequest(`/featured-sections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    const updated = response.data;
    return {
      ...updated,
      id: updated._id || updated.id,
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest(`/featured-sections/${id}`, {
      method: 'DELETE',
    });
  },
};


