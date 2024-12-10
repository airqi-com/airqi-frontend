import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, FileText, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Air Quality Monitor</h1>
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
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`
          }
        >
          <Home className="w-5 h-5 mr-3" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/map"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`
          }
        >
          <Map className="w-5 h-5 mr-3" />
          <span className="font-medium">Map View</span>
        </NavLink>

        <NavLink
          to="/reports"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`
          }
        >
          <FileText className="w-5 h-5 mr-3" />
          <span className="font-medium">Reports</span>
        </NavLink>

        <NavLink
          to="/profile"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`
          }
        >
          <User className="w-5 h-5 mr-3" />
          <span className="font-medium">Profile</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <ThemeToggle />
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;