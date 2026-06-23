import axios from 'axios';

// Connect to your new Spring Boot backend
export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Automatically attach the JWT token to every single request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quantumos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Automatically handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If the backend rejects the token, wipe it and force logout
      localStorage.removeItem('quantumos_token');
      // Redirecting to login page (update URL based on your routing)
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);
