// Admin order management utilities and types

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    country: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'mobile_money' | 'cash_on_delivery' | 'card';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock orders data
let orders: AdminOrder[] = [
  {
    id: '1',
    orderNumber: 'FM-12345678',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+237 6XX XXX XXX',
      address: '123 Main Street',
      city: 'Douala',
      region: 'Littoral',
      country: 'Cameroon',
    },
    items: [
      {
        productId: '1',
        productName: 'Modern Dining Chair',
        quantity: 2,
        price: 100.00,
        image: '/images/category-1.jpg',
      },
    ],
    subtotal: 200.00,
    shipping: 0,
    total: 200.00,
    paymentMethod: 'mobile_money',
    status: 'pending',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
];

export const orderService = {
  getAll: (): AdminOrder[] => orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ),
  
  getById: (id: string): AdminOrder | undefined => 
    orders.find(o => o.id === id),
  
  updateStatus: (id: string, status: AdminOrder['status']): AdminOrder | null => {
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    
    order.status = status;
    order.updatedAt = new Date().toISOString().split('T')[0];
    return order;
  },
  
  getStats: () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const confirmed = orders.filter(o => o.status === 'confirmed').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    
    return {
      total,
      pending,
      confirmed,
      processing,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
    };
  },
};
