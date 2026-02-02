// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fastmeuble-backend.onrender.com/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fast-meuble-token');
  }
  return null;
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('fast-meuble-token', token);
  }
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('fast-meuble-token');
  }
};

// API request helper
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, config);
    
    // Handle non-JSON responses
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return { data: null, message: 'Success' };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Provide more specific error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend server. Please ensure the backend is running on ${apiConfig.baseURL}`);
    }
    throw error;
  }
};

