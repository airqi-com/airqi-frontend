export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AirQualityData {
  id: string;
  latitude: number;
  longitude: number;
  aqi: number;
  pollutants: Record<string, number>;
  measurementTime: string;
}

export interface HazardReport {
  id: string;
  latitude: number;
  longitude: number;
  hazardType: 'air_pollution' | 'chemical_spill' | 'fire' | 'construction' | 'other';
  description: string;
  metadata?: Record<string, any>;
  status: 'pending' | 'investigating' | 'resolved';
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'alert' | 'info' | 'warning';
  read: boolean;
  createdAt: string;
}

export interface Route {
  id: string;
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  waypoints: string[];
  distance: number;
  estimatedTime: number;
  airQualityIndex: number;
}