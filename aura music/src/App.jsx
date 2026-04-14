import React, { useCallback, useState } from 'react';
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
    setPlaylist((prev) => {
      if (prev.some((playlistTrack) => playlistTrack.id === track.id)) {
        return prev;
      }

      return [...prev, track];
    });
  }, [setPlaylist]);

  const handleRemoveFromPlaylist = useCallback((trackId) => {
    setPlaylist((prev) => prev.filter((track) => track.id !== trackId));
  }, [setPlaylist]);

  const handleReorderPlaylist = useCallback((newPlaylist) => {
    setPlaylist(newPlaylist);
  }, [setPlaylist]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)]"></div>
      </div>

      <div className="relative z-10">
        <header className="p-3 text-center sm:p-4 md:p-6 lg:p-8">
          <div className="mb-2 flex items-center justify-center space-x-3">
            <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 shadow-xl sm:rounded-xl sm:p-3 lg:rounded-2xl lg:p-4">
              <Music className="h-5 w-5 text-white sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            </div>
            <h1
              className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-xl font-bold text-transparent drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              style={{ fontFamily: "'Disengaged', sans-serif" }}
            >
              AURAMUSIC
            </h1>
          </div>
          <p
            className="px-2 text-xs font-medium text-gray-400 sm:px-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
            style={{ fontFamily: "'M PLUS Code Latin', sans-serif" }}
          >
            Discover and play your favorite music
          </p>
        </header>

        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>

        {currentPage === 'home' && (
          <div className="mb-4 px-3 sm:mb-6 sm:px-4 md:mb-8 md:px-6 lg:mb-10 lg:px-8">
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
          </div>
        )}

        {error && (
          <div className="mb-4 px-3 sm:mb-6 sm:px-4 md:mb-8 md:px-6 lg:px-8">
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-400 shadow-xl backdrop-blur-md sm:rounded-xl sm:p-4 sm:text-sm lg:rounded-2xl md:p-6 md:text-base">
              {error}
            </div>
          </div>
        )}

        <main className="px-3 pb-28 sm:px-4 sm:pb-32 md:px-6 md:pb-36 lg:px-8 lg:pb-40">
          {currentPage === 'home' && !searchQuery && tracks.length === 0 && (
            <div className="py-8 text-center sm:py-12 md:py-16 lg:py-24">
              <div className="mb-6">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-2xl backdrop-blur-sm sm:mb-4 sm:h-20 sm:w-20 md:mb-6 md:h-24 md:w-24 lg:h-32 lg:w-32">
                  <Music className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16" />
                </div>
              </div>
              <h2
                className="mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text px-3 text-3xl font-bold text-transparent sm:mb-3 sm:px-4 sm:text-8xl md:mb-4 md:text-8xl lg:text-6xl"
                style={{ fontFamily: "'Magison', sans-serif" }}
              >
                Start Your Music Journey
              </h2>
              <p
                className="mx-auto max-w-lg px-3 text-sm font-medium text-gray-400 sm:px-4 sm:text-base md:text-lg lg:text-xl"
                style={{ fontFamily: "'M PLUS Code Latin', sans-serif" }}
              >
                Search for any song, artist, or album to begin playing music. Discover new tracks and enjoy high-quality previews.
              </p>
            </div>
          )}

          {currentPage === 'home' && (tracks.length > 0 || isSearching) && (
            <div className="mx-auto max-w-5xl">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-24">
                  <div className="mb-3 h-10 w-10 animate-spin rounded-full border-2 border-purple-400 border-t-transparent shadow-xl sm:mb-4 sm:h-12 sm:w-12 md:mb-6 md:h-14 md:w-14 md:border-4 lg:h-16 lg:w-16"></div>
                  <p className="px-3 text-center text-sm font-medium text-gray-400 sm:px-4 sm:text-base md:text-lg lg:text-xl">
                    Searching for "{searchQuery}"...
                  </p>
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

        <audio ref={audioRef} preload="metadata" />
        <Footer />
      </div>
    </div>
  );
}

export default App;
