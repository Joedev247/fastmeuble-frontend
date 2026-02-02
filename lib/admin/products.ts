// Admin product management utilities and types
import { productAPI, Product } from '../api/products';

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
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

// Helper to convert API Product to AdminProduct
const convertToAdminProduct = (product: Product): AdminProduct => {
  return {
    id: product.id || product._id,
    name: product.name,
    category: typeof product.category === 'object' ? product.category.name : product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    description: product.description,
    specifications: product.specifications,
    images: product.images,
    mainImage: product.mainImage,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.inStock,
    isHot: product.isHot,
    discount: product.discount,
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const productService = {
  getAll: async (): Promise<AdminProduct[]> => {
    try {
      // Fetch all products for admin (no limit, all statuses)
      const products = await productAPI.getAll({ status: 'all', limit: 1000 });
      return products.map(convertToAdminProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<AdminProduct | undefined> => {
    try {
      const product = await productAPI.getById(id);
      return convertToAdminProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  },
  
  create: async (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProduct> => {
    try {
      // Find category by name to get its ID
      const { categoryAPI } = await import('../api/categories');
      const categories = await categoryAPI.getAll();
      const category = categories.find(c => c.name === product.category);
      
      if (!category) {
        throw new Error('Category not found');
      }

      const created = await productAPI.create({
        ...product,
        category: category.id || category._id,
      });
      return convertToAdminProduct(created);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },
  
  update: async (id: string, updates: Partial<AdminProduct>): Promise<AdminProduct | null> => {
    try {
      // If category is being updated, find its ID
      if (updates.category && typeof updates.category === 'string') {
        const { categoryAPI } = await import('../api/categories');
        const categories = await categoryAPI.getAll();
        const category = categories.find(c => c.name === updates.category);
        if (category) {
          updates.category = category.id || category._id as any;
        }
      }

      const updated = await productAPI.update(id, updates);
      return convertToAdminProduct(updated);
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await productAPI.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },
  
  getStats: async () => {
    try {
      return await productAPI.getStats();
    } catch (error) {
      console.error('Error fetching product stats:', error);
      return { total: 0, published: 0, drafts: 0, totalValue: 0 };
    }
  },
};
