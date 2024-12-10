import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, X } from 'lucide-react';
import { mockApi } from '../services/mockApi';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from '../types';

interface NotificationPanelProps {
  onClose?: () => void;
}

function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: mockApi.notifications.getAll
  });

  const { markAsRead } = useNotifications();

  if (isLoading) {
    return (
      <div className="h-full">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Notifications</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">Loading notifications...</p>
        </div>
      </div>
    );
  }

  const notifications = notificationsData || [];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-700">
            {notifications.map((notification: Notification) => (
              <div
                key={notification.id}
                className={`p-4 ${notification.read ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;