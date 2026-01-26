// Admin category management utilities and types

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

// Mock categories data
let categories: Category[] = [
  {
    id: '1',
    name: 'Dining Chairs',
    slug: 'dining-chairs',
    description: 'Comfortable and elegant dining chairs',
    image: '/images/category-1.jpg',
    productCount: 12,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Modern and comfortable sofas',
    image: '/images/category-2.jpg',
    productCount: 8,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Tables',
    slug: 'tables',
    description: 'Stylish dining and coffee tables',
    image: '/images/category-3.jpg',
    productCount: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export const categoryService = {
  getAll: (): Category[] => categories,
  
  getById: (id: string): Category | undefined => 
    categories.find(c => c.id === id),
  
  getBySlug: (slug: string): Category | undefined => 
    categories.find(c => c.slug === slug),
  
  create: (category: Omit<Category, 'id' | 'productCount' | 'createdAt' | 'updatedAt'>): Category => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      productCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    categories.push(newCategory);
    return newCategory;
  },
  
  update: (id: string, updates: Partial<Category>): Category | null => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    return categories[index];
  },
  
  delete: (id: string): boolean => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  },
};
