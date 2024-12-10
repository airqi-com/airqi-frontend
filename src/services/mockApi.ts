import { mockAirQualityData, mockHazardReports, mockNotifications, mockUsers, mockRoutes } from '../mocks/data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  auth: {
    login: async (email: string, password: string) => {
      await delay(500);
      const user = mockUsers.find(u => u.email === email);
      if (!user || password !== 'admin') {
        throw new Error('Invalid credentials');
      }
      return {
        token: 'mock-jwt-token',
        user
      };
    },
    register: async (data: any) => {
      await delay(500);
      const newUser = {
        id: String(mockUsers.length + 1),
        ...data
      };
      mockUsers.push(newUser);
      return newUser;
    },
    getProfile: async () => {
      await delay(300);
      return mockUsers[0];
    }
  },

  airQuality: {
    getAll: async () => {
      await delay(300);
      return mockAirQualityData;
    },
    getByLocation: async (latitude: number, longitude: number, radius: number) => {
      await delay(300);
      return mockAirQualityData.filter(data => {
        const distance = Math.sqrt(
          Math.pow(data.latitude - latitude, 2) + Math.pow(data.longitude - longitude, 2)
        );
        return distance <= radius;
      });
    }
  },

  reports: {
    getAll: async () => {
      await delay(300);
      return mockHazardReports;
    },
    create: async (data: any) => {
      await delay(500);
      const newReport = {
        id: String(mockHazardReports.length + 1),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...data
      };
      mockHazardReports.push(newReport);
      return newReport;
    },
    updateStatus: async (id: string, status: string) => {
      await delay(300);
      const report = mockHazardReports.find(r => r.id === id);
      if (report) {
        report.status = status;
        return report;
      }
      throw new Error('Report not found');
    }
  },

  notifications: {
    getAll: async () => {
      await delay(300);
      return mockNotifications;
    },
    markAsRead: async (id: string) => {
      await delay(200);
      const notification = mockNotifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        return notification;
      }
      throw new Error('Notification not found');
    }
  },

  navigation: {
    getOptimalRoute: async (startLat: number, startLon: number, endLat: number, endLon: number) => {
      await delay(500);
      return mockRoutes.find(r => 
        r.startLat === startLat && 
        r.startLon === startLon && 
        r.endLat === endLat && 
        r.endLon === endLon
      ) || mockRoutes[0];
    }
  }
};