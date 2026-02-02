import { apiRequest } from './config';

export interface Review {
  _id: string;
  id?: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const reviewAPI = {
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await apiRequest(`/reviews/product/${productId}`);
    return response.data.map((r: Review) => ({
      ...r,
      id: r._id || r.id,
    }));
  },

  create: async (review: {
    productId: string;
    userName: string;
    rating: number;
    comment: string;
  }): Promise<Review> => {
    const response = await apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(review),
    });
    const reviewData = response.data;
    return {
      ...reviewData,
      id: reviewData._id || reviewData.id,
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest(`/reviews/${id}`, {
      method: 'DELETE',
    });
  },
};

