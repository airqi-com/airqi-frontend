import { AirQualityData, HazardReport, Notification, User, Route } from '../types';
import { addDays, subDays, subHours } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'John',
    lastName: 'Doe'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith'
  }
];

// Mock Air Quality Data with historical records
export const mockAirQualityData: AirQualityData[] = [
  {
    id: '1',
    latitude: 51.5074,
    longitude: -0.1278,
    aqi: 45,
    pollutants: {
      pm25: 12,
      pm10: 25,
      no2: 30,
      o3: 48,
    },
    measurementTime: new Date().toISOString(),
  },
  {
    id: '2',
    latitude: 51.5074,
    longitude: -0.1278,
    aqi: 52,
    pollutants: {
      pm25: 15,
      pm10: 28,
      no2: 35,
      o3: 52,
    },
    measurementTime: subHours(new Date(), 1).toISOString(),
  },
  {
    id: '3',
    latitude: 51.5074,
    longitude: -0.1278,
    aqi: 38,
    pollutants: {
      pm25: 10,
      pm10: 22,
      no2: 28,
      o3: 45,
    },
    measurementTime: subHours(new Date(), 2).toISOString(),
  },
  {
    id: '4',
    latitude: 51.4993,
    longitude: -0.1276,
    aqi: 65,
    pollutants: {
      pm25: 18,
      pm10: 32,
      no2: 40,
      o3: 55,
    },
    measurementTime: new Date().toISOString(),
  }
];

// Mock Hazard Reports with different statuses
export const mockHazardReports: HazardReport[] = [
  {
    id: '1',
    latitude: 51.5074,
    longitude: -0.1278,
    hazardType: 'air_pollution',
    description: 'High levels of pollution detected near construction site',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    latitude: 51.5114,
    longitude: -0.1176,
    hazardType: 'chemical_spill',
    description: 'Chemical leak reported from industrial facility',
    status: 'investigating',
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: '3',
    latitude: 51.4994,
    longitude: -0.1248,
    hazardType: 'fire',
    description: 'Small fire in residential area affecting air quality',
    status: 'resolved',
    createdAt: subDays(new Date(), 2).toISOString(),
  }
];

// Mock Notifications with different types
export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Air quality alert: High pollution levels in your area',
    type: 'alert',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    message: 'New hazard report submitted near your location',
    type: 'info',
    read: false,
    createdAt: subHours(new Date(), 2).toISOString(),
  },
  {
    id: '3',
    message: 'Weekly air quality report available',
    type: 'info',
    read: true,
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: '4',
    message: 'Hazard status updated: Chemical spill contained',
    type: 'warning',
    read: true,
    createdAt: subDays(new Date(), 2).toISOString(),
  }
];

// Mock Routes with different characteristics
export const mockRoutes: Route[] = [
  {
    id: '1',
    startLat: 51.5074,
    startLon: -0.1278,
    endLat: 51.5194,
    endLon: -0.1270,
    waypoints: ['51.5114,-0.1176', '51.5154,-0.1223'],
    distance: 2.5,
    estimatedTime: 30,
    airQualityIndex: 45
  },
  {
    id: '2',
    startLat: 51.4994,
    startLon: -0.1248,
    endLat: 51.5074,
    endLon: -0.1278,
    waypoints: ['51.5034,-0.1263'],
    distance: 1.8,
    estimatedTime: 22,
    airQualityIndex: 52
  }
];