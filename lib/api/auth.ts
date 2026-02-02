import { apiRequest, setAuthToken, removeAuthToken } from './config';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authAPI = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiRequest('/auth/me');
    return response.data;
  },

  logout: (): void => {
    removeAuthToken();
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('fast-meuble-token');
    }
    return false;
  },
};

