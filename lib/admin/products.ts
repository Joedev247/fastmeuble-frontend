// Admin product management utilities and types

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

// Mock data storage (in production, this would be a database)
let products: AdminProduct[] = [
  {
    id: '1',
    name: 'Modern Dining Chair',
    category: 'Dining Chairs',
    price: 100.00,
    description: 'A beautifully crafted padded seat chair that combines comfort with elegance.',
    specifications: {
      material: 'Wood & Fabric',
      dimensions: '45cm x 50cm x 90cm',
      weight: '8kg',
      color: 'Grey',
    },
    images: ['/images/category-1.jpg', '/images/category-2.jpg'],
    mainImage: '/images/category-1.jpg',
    rating: 4.5,
    reviews: 2,
    inStock: true,
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
];

export const productService = {
  getAll: (): AdminProduct[] => products,
  
  getById: (id: string): AdminProduct | undefined => 
    products.find(p => p.id === id),
  
  create: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): AdminProduct => {
    const newProduct: AdminProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    products.push(newProduct);
    return newProduct;
  },
  
  update: (id: string, updates: Partial<AdminProduct>): AdminProduct | null => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    return products[index];
  },
  
  delete: (id: string): boolean => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
  
  getStats: () => {
    const total = products.length;
    const published = products.filter(p => p.status === 'published').length;
    const drafts = products.filter(p => p.status === 'draft').length;
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    
    return { total, published, drafts, totalValue };
  },
};
