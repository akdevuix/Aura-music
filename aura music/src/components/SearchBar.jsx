import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto group"
    >
      <div className="relative">

        {/* Search Icon with focus purple */}
        <Search 
          className="
            absolute left-3 top-1/2 -translate-y-1/2 
            text-gray-300 h-6 w-6 z-20 pointer-events-none
            transition-all duration-200
            group-focus-within:text-purple-400
          " 
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists, albums..."
          className="w-full pl-8 sm:pl-10 md:pl-12 lg:pl-14 pr-8 sm:pr-10 md:pr-12 lg:pr-14 py-2 sm:py-3 md:py-4 lg:py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl lg:rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 sm:focus:ring-4 focus:ring-purple-400/20 focus:outline-none transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg shadow-xl"
          disabled={isLoading}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 sm:right-3 md:right-4 lg:right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all duration-200"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 border-2 sm:border-3 border-purple-400 border-t-transparent"></div>
        </div>
      )}
    </form>
  );
};
