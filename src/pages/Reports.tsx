import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { HazardReport } from '../types';

function Reports() {
  const [filter, setFilter] = useState('all');

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: mockApi.reports.getAll
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'investigating':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const filteredReports = React.useMemo(() => {
    if (!Array.isArray(reportsData)) return [];
    
    return reportsData.filter((report: HazardReport) => {
      if (filter === 'all') return true;
      return report.status === filter;
    });
  }, [reportsData, filter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hazard Reports</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          New Report
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'pending'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('investigating')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'investigating'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Investigating
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'resolved'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Resolved
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No reports found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 p-4">
            {filteredReports.map((report: HazardReport) => (
              <div
                key={report.id}
                className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700">
                        {report.hazardType.replace('_', ' ')}
                      </span>
                      {getStatusIcon(report.status)}
                    </div>
                    <p className="mt-2 dark:text-gray-300">{report.description}</p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Reported on {new Date(report.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Location: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;