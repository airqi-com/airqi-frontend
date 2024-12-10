import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../services/api';
import { User } from 'lucide-react';

function Profile() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: auth.getProfile
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {profile?.data.firstName} {profile?.data.lastName}
            </h1>
            <p className="text-gray-600">{profile?.data.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    defaultChecked
                  />
                  <span className="ml-2">Air quality alerts</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    defaultChecked
                  />
                  <span className="ml-2">Hazard reports in my area</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Default Location</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your default location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notification Radius (km)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={5}
                min={1}
                max={50}
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;