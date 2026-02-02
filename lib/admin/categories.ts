// Admin category management utilities and types
import { categoryAPI, Category as APICategory } from '../api/categories';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// Helper to convert API Category to Category
const convertToCategory = (category: APICategory): Category => {
  return {
    id: category.id || category._id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    productCount: category.productCount,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const categories = await categoryAPI.getAll();
      return categories.map(convertToCategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<Category | undefined> => {
    try {
      const category = await categoryAPI.getById(id);
      return convertToCategory(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      return undefined;
    }
  },
  
  getBySlug: async (slug: string): Promise<Category | undefined> => {
    try {
      const category = await categoryAPI.getBySlug(slug);
      return convertToCategory(category);
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return undefined;
    }
  },
  
  create: async (category: Omit<Category, 'id' | 'productCount' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    try {
      const created = await categoryAPI.create(category);
      return convertToCategory(created);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },
  
  update: async (id: string, updates: Partial<Category>): Promise<Category | null> => {
    try {
      const updated = await categoryAPI.update(id, updates);
      return convertToCategory(updated);
    } catch (error) {
      console.error('Error updating category:', error);
      return null;
    }
  },
  
  delete: async (id: string): Promise<boolean> => {
    try {
      await categoryAPI.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  },
};
