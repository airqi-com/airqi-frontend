import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { Icon } from 'leaflet';
import { AlertTriangle, Wind } from 'lucide-react';
import { AirQualityData, HazardReport } from '../types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Map() {
  const [selectedPoint, setSelectedPoint] = useState<AirQualityData | HazardReport | null>(null);

  const { data: airQualityData, isLoading: isLoadingAQ } = useQuery({
    queryKey: ['airQuality'],
    queryFn: mockApi.airQuality.getAll
  });

  const { data: hazardReports, isLoading: isLoadingReports } = useQuery({
    queryKey: ['reports'],
    queryFn: mockApi.reports.getAll
  });

  if (isLoadingAQ || isLoadingReports) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center bg-white rounded-lg">
        <div className="text-lg text-gray-600">Loading map data...</div>
      </div>
    );
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-[calc(100vh-2rem)]">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="h-full w-full rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Air Quality Markers */}
        {Array.isArray(airQualityData) && airQualityData.map((point: AirQualityData) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            eventHandlers={{
              click: () => setSelectedPoint(point),
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <h3 className="font-bold">Air Quality Index</h3>
                </div>
                <div className={`inline-block px-2 py-1 rounded-full text-white ${getAQIColor(point.aqi)}`}>
                  {point.aqi}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Last updated: {new Date(point.measurementTime).toLocaleString()}
                </div>
                <div className="mt-2 text-sm">
                  <div className="font-semibold">Pollutants:</div>
                  <ul className="list-disc list-inside">
                    {Object.entries(point.pollutants).map(([key, value]) => (
                      <li key={key}>
                        {key.toUpperCase()}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hazard Report Markers */}
        {Array.isArray(hazardReports) && hazardReports.map((report: HazardReport) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            eventHandlers={{
              click: () => setSelectedPoint(report),
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h3 className="font-bold capitalize">
                    {report.hazardType.replace('_', ' ')}
                  </h3>
                </div>
                <p className="text-sm">{report.description}</p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Reported: {new Date(report.createdAt).toLocaleString()}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;