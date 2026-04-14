import React from 'react';
import { Home, ListMusic } from 'lucide-react';

export const Navigation = ({ currentPage, onPageChange }) => {
  return (
    <nav className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-xl flex items-center">
        
        {/* Home Button */}
        <button
          onClick={() => onPageChange("home")}
          className={`
            flex flex-col items-center justify-center 
            px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4
            rounded-xl 
            transition-all duration-300 
            font-medium text-xs sm:text-sm md:text-base
            ${
              currentPage === "home"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
            }
          `}
          style={{fontFamily: "'Diphylleia', sans-serif"}}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-[10px] sm:text-xs md:text-sm">Home</span>
        </button>

        {/* Slim Divider */}
        <div className="w-[1px] h-8 sm:h-10 md:h-12 bg-white/25 mx-2 sm:mx-3"></div>

        {/* Playlist Button */}
        <button
          onClick={() => onPageChange("playlist")}
          className={`
            flex flex-col items-center justify-center 
            px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4
            rounded-xl 
            transition-all duration-300 
            font-medium text-xs sm:text-sm md:text-base
            ${
              currentPage === "playlist"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
            }
          `}
          style={{fontFamily: "'Diphylleia', sans-serif"}}
        >
          <ListMusic className="h-5 w-5 mb-1" />
          <span className="text-[10px] sm:text-xs md:text-sm">Playlist</span>
        </button>

      </div>
    </nav>
  );
};
