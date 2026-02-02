import { apiRequest } from './config';

export interface Product {
  _id: string;
  id?: string;
  name: string;
  category: string | { _id: string; name: string; slug: string };
  price: number;
  originalPrice?: number;
  description: string;
  specifications: {
    material: string;
    dimensions: string;
    weight: string;
    color: string;
  };
  images: string[];
  mainImage: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isHot?: boolean;
  discount?: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isHot?: boolean;
}

export const productAPI = {
  getAll: async (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data.map((p: Product) => ({
      ...p,
      id: p._id || p.id,
      category: typeof p.category === 'object' ? p.category.name : p.category,
    }));
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiRequest(`/products/${id}`);
    const product = response.data;
    return {
      ...product,
      id: product._id || product.id,
      category: typeof product.category === 'object' ? product.category.name : product.category,
    };
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const response = await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return response.data;
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product> => {
    const response = await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    const response = await apiRequest('/products/stats');
    return response.data;
  },
};

