import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, AlertTriangle, Wind } from 'lucide-react';
import { format } from 'date-fns';
import { AirQualityData, HazardReport } from '../types';

function Dashboard() {
  const { data: airQualityData, isLoading: isLoadingAQ } = useQuery({
    queryKey: ['airQuality'],
    queryFn: mockApi.airQuality.getAll
  });

  const { data: reportsData, isLoading: isLoadingReports } = useQuery({
    queryKey: ['reports'],
    queryFn: mockApi.reports.getAll
  });

  // Format data for the chart
  const chartData = React.useMemo(() => {
    if (!Array.isArray(airQualityData)) return [];
    
    return [...airQualityData]
      .sort((a: AirQualityData, b: AirQualityData) => 
        new Date(a.measurementTime).getTime() - new Date(b.measurementTime).getTime()
      )
      .map((data: AirQualityData) => ({
        ...data,
        time: format(new Date(data.measurementTime), 'HH:mm'),
        date: format(new Date(data.measurementTime), 'MMM dd')
      }));
  }, [airQualityData]);

  if (isLoadingAQ || isLoadingReports) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  const currentAQI = chartData[chartData.length - 1]?.aqi || 'N/A';
  const activeHazards = Array.isArray(reportsData) ? 
    reportsData.filter((r: HazardReport) => r.status === 'pending').length : 0;
  const monitoredLocations = chartData.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Air Quality Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current AQI</h3>
            <Wind className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{currentAQI}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Hazards</h3>
            <AlertTriangle className="text-red-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{activeHazards}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Monitored Locations</h3>
            <MapPin className="text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{monitoredLocations}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Air Quality Trend</h3>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  label={{ 
                    value: 'Air Quality Index', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: 10
                  }}
                />
                <Tooltip
                  labelFormatter={(value) => `Time: ${value}`}
                  formatter={(value) => [`AQI: ${value}`, 'Air Quality Index']}
                />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;