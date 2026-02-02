// Admin order management utilities and types
import { orderAPI, Order } from '../api/orders';

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

// Helper to convert API Order to AdminOrder
const convertToAdminOrder = (order: Order): AdminOrder => {
  return {
    id: order.id || order._id,
    orderNumber: order.orderNumber,
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phone,
      address: order.customer.address,
      city: order.customer.city,
      region: order.customer.region,
      country: order.customer.country || 'Cameroon',
    },
    items: order.items,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    paymentMethod: order.paymentMethod,
    status: order.status,
    notes: order.notes,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

export const orderService = {
  getAll: async (): Promise<AdminOrder[]> => {
    try {
      // Fetch all orders for admin (high limit to get all orders)
      const orders = await orderAPI.getAll({ limit: 1000 });
      return orders.map(convertToAdminOrder).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
  
  getById: async (id: string): Promise<AdminOrder | undefined> => {
    try {
      const order = await orderAPI.getById(id);
      return convertToAdminOrder(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      return undefined;
    }
  },
  
  updateStatus: async (id: string, status: AdminOrder['status']): Promise<AdminOrder | null> => {
    try {
      const order = await orderAPI.updateStatus(id, status);
      return convertToAdminOrder(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      return null;
    }
  },
  
  getStats: async () => {
    try {
      return await orderAPI.getStats();
    } catch (error) {
      console.error('Error fetching order stats:', error);
      return {
        total: 0,
        pending: 0,
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0,
      };
    }
  },
};
