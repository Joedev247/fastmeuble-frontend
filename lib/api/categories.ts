import { apiRequest } from './config';

export interface Category {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export const categoryAPI = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiRequest('/categories');
    return response.data.map((c: Category) => ({
      ...c,
      id: c._id || c.id,
    }));
  },

  getById: async (id: string): Promise<Category> => {
    const response = await apiRequest(`/categories/${id}`);
    const category = response.data;
    return {
      ...category,
      id: category._id || category.id,
    };
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiRequest(`/categories/slug/${slug}`);
    const category = response.data;
    return {
      ...category,
      id: category._id || category.id,
    };
  },

  create: async (category: Partial<Category>): Promise<Category> => {
    const response = await apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
    const created = response.data;
    return {
      ...created,
      id: created._id || created.id,
    };
  },

  update: async (id: string, updates: Partial<Category>): Promise<Category> => {
    const response = await apiRequest(`/categories/${id}`, {
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
    await apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

