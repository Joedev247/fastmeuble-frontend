import { apiRequest } from './config';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country?: string;
  postalCode?: string;
}

export interface Order {
  _id: string;
  id?: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'mobile_money' | 'cash_on_delivery' | 'card';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const orderAPI = {
  getAll: async (filters?: OrderFilters): Promise<Order[]> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data.map((o: Order) => ({
      ...o,
      id: o._id || o.id,
    }));
  },

  getById: async (id: string): Promise<Order> => {
    const response = await apiRequest(`/orders/${id}`);
    const order = response.data;
    return {
      ...order,
      id: order._id || order.id,
    };
  },

  create: async (orderData: {
    items: OrderItem[];
    customer: OrderCustomer;
    paymentMethod: string;
    shipping?: number;
    notes?: string;
  }): Promise<Order> => {
    const response = await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    const order = response.data;
    return {
      ...order,
      id: order._id || order.id,
    };
  },

  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    const order = response.data;
    return {
      ...order,
      id: order._id || order.id,
    };
  },

  update: async (id: string, updates: Partial<Order>): Promise<Order> => {
    const response = await apiRequest(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    const order = response.data;
    return {
      ...order,
      id: order._id || order.id,
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest(`/orders/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    const response = await apiRequest('/orders/stats');
    return response.data;
  },
};

