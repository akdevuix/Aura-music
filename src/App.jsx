import React, { useState, useCallback } from 'react';
import { Music } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { TrackList } from './components/TrackList';
import { PlaylistPage } from './components/PlaylistPage';
import { PlayerControls } from './components/PlayerControls';
import { Footer } from './components/Footer';
import { usePlayer } from './hooks/usePlayer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { searchTracks } from './services/auraMusicApi';
import NotificationPlayer from "./components/NotificationPlayer";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useLocalStorage('auramusic-playlist', []);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const {
    audioRef,
    playerState,
    playTrack,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
  } = usePlayer();

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setTracks([]);
      setSearchQuery('');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await searchTracks(query);
      setTracks(response.tracks.items);
    } catch (err) {
      setError('Failed to search tracks. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleTrackPlay = useCallback((track, trackList, index) => {
    if (playerState.currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track, trackList, index);
    }
  }, [playerState.currentTrack, togglePlayPause, playTrack]);

  const handleAddToPlaylist = useCallback((track) => {
    setPlaylist(prev => {
      if (prev.some(p => p.id === track.id)) {
        return prev; // Already in playlist
      }
      return [...prev, track];
    });
  }, []);

  const handleRemoveFromPlaylist = useCallback((trackId) => {
    setPlaylist(prev => prev.filter(track => track.id !== trackId));
  }, []);

  const handleReorderPlaylist = useCallback((newPlaylist) => {
    setPlaylist(newPlaylist);
    
    // Update player queue if currently playing from playlist
    if (playerState.currentTrack && playlist.some(track => track.id === playerState.currentTrack.id)) {
      const currentTrackIndex = newPlaylist.findIndex(track => track.id === playerState.currentTrack.id);
      if (currentTrackIndex !== -1) {
        // Update the queue without restarting the current track
        const updatedPlayerState = {
          ...playerState,
          queue: newPlaylist,
          currentIndex: currentTrackIndex
        };
      }
    }
  }, [playerState.currentTrack, playlist, playTrack]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="p-2 sm:p-3 md:p-3 lg:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl">
              <Music className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
              AURAMUSIC
            </h1>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium px-2 sm:px-4">Discover and play your favorite music</p>
        </header>

        {/* Navigation */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>

        {/* Search - only show on home page */}
        {currentPage === 'home' && (
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-6 text-red-400 text-center backdrop-blur-md shadow-xl text-xs sm:text-sm md:text-base">
              {error}
            </div>
          </div>
        )}

        {/* Content */}
        <main className="px-3 sm:px-4 md:px-6 lg:px-8 pb-28 sm:pb-32 md:pb-36 lg:pb-40">
          {currentPage === 'home' && !searchQuery && tracks.length === 0 && (
            <div className="text-center py-8 sm:py-12 md:py-16 lg:py-24">
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-2xl backdrop-blur-sm">
                  <Music className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-purple-400" />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-3 sm:px-4">Start Your Music Journey</h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-lg mx-auto font-medium px-3 sm:px-4">
                Search for any song, artist, or album to begin playing music. Discover new tracks and enjoy high-quality previews.
              </p>
            </div>
          )}

          {currentPage === 'home' && (tracks.length > 0 || isSearching) && (
            <div className="max-w-5xl mx-auto">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-24">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 border-2 sm:border-3 md:border-4 border-purple-400 border-t-transparent mb-3 sm:mb-4 md:mb-6 shadow-xl"></div>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium px-3 sm:px-4 text-center">Searching for "{searchQuery}"...</p>
                </div>
              ) : (
                <TrackList
                  tracks={tracks}
                  currentTrack={playerState.currentTrack}
                  isPlaying={playerState.isPlaying}
                  onTrackPlay={handleTrackPlay}
                  onAddToPlaylist={handleAddToPlaylist}
                  playlist={playlist}
                />
              )}
            </div>
          )}

          {currentPage === 'playlist' && (
            <PlaylistPage
              playlist={playlist}
              currentTrack={playerState.currentTrack}
              isPlaying={playerState.isPlaying}
              onTrackPlay={handleTrackPlay}
              onRemoveFromPlaylist={handleRemoveFromPlaylist}
              onReorderPlaylist={handleReorderPlaylist}
            />
          )}
        </main>

        {/* Player Controls */}
        <PlayerControls
          currentTrack={playerState.currentTrack}
          isPlaying={playerState.isPlaying}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          volume={playerState.volume}
          onTogglePlayPause={togglePlayPause}
          onSeek={seekTo}
          onVolumeChange={setVolume}
          onNext={nextTrack}
          onPrevious={previousTrack}
          canGoNext={playerState.currentIndex < playerState.queue.length - 1}
          canGoPrevious={playerState.currentIndex > 0}
        />

        {/* Audio Element */}
        <audio ref={audioRef} preload="metadata" />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );

  function App() {
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        // Fetch song when component mounts
        fetchSong().then((data) => {
            setCurrentSong({
                title: data.title,
                artist: data.artist,
                cover: data.cover,
                duration: data.duration,
                durationSec: data.durationSec,
                currentSec: 0
            });
        });
    }, []);

    return (
        <div className="App min-h-screen bg-gray-900 text-white">
            {/* Tumhara baaki content yahan */}

            {/* Notification Player */}
            {currentSong && <NotificationPlayer song={currentSong} />}
        </div>
    );
}
}
export default App;