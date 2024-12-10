import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import NotificationPanel from './NotificationPanel';
import ThemeToggle from './ThemeToggle';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Air Quality Monitor</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Notifications</span>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-200 ${
          isSidebarOpen || isNotificationPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsSidebarOpen(false);
          setIsNotificationPanelOpen(false);
        }}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 flex-shrink-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content and Notification Panel Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="h-full p-4">
            <Outlet />
          </div>
        </main>

        {/* Notification Panel */}
        <div
          className={`fixed lg:static inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg transform ${
            isNotificationPanelOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 flex-shrink-0`}
        >
          <NotificationPanel onClose={() => setIsNotificationPanelOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default Layout;