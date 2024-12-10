import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/users', data),
  getProfile: () => 
    api.get('/users/profile'),
};

export const airQuality = {
  getAll: () => 
    api.get('/air-quality'),
  getByLocation: (latitude: number, longitude: number, radius: number) =>
    api.get('/air-quality/location', { params: { latitude, longitude, radius } }),
  create: (data: any) =>
    api.post('/air-quality', data),
};

export const navigation = {
  createRoute: (data: any) =>
    api.post('/navigation/route', data),
  getOptimalRoute: (startLat: number, startLon: number, endLat: number, endLon: number) =>
    api.get('/navigation/optimal-route', { params: { startLat, startLon, endLat, endLon } }),
};

export const reports = {
  create: (data: any) =>
    api.post('/reports', data),
  getAll: () =>
    api.get('/reports'),
  getById: (id: string) =>
    api.get(`/reports/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/reports/${id}/status`, { status }),
  getNearby: (latitude: number, longitude: number, radius: number) =>
    api.get('/reports/nearby', { params: { latitude, longitude, radius } }),
};

export const notifications = {
  getAll: () =>
    api.get('/notifications'),
  markAsRead: (id: string) =>
    api.post(`/notifications/${id}/read`),
};

export default api;