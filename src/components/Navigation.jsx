import React from 'react';
import { Home, ListMusic } from 'lucide-react';

export const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'playlist', label: 'Playlist', icon: ListMusic },
  ];

  return (
    <nav className="flex justify-center space-x-1 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl p-1 sm:p-1.5 border border-white/20 shadow-xl">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex items-center space-x-1 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-md sm:rounded-lg lg:rounded-xl transition-all duration-300 font-medium text-xs sm:text-sm md:text-base ${
              currentPage === id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                : 'text-gray-300 hover:text-white hover:bg-white/15 hover:scale-102'
            }`}
          >
            <Icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            <span className="hidden xs:inline sm:inline text-xs sm:text-sm md:text-base">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};