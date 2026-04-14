import React, { useState } from 'react';
import { TrackCard } from './TrackCard';
import { ListMusic, Trash2, Hash } from 'lucide-react';

export const PlaylistPage = ({
  playlist,
  currentTrack,
  isPlaying,
  onTrackPlay,
  onRemoveFromPlaylist,
  onReorderPlaylist,
}) => {
  const [editingPosition, setEditingPosition] = useState(null);
  const [tempPosition, setTempPosition] = useState('');

  const handlePositionEdit = (trackId, currentIndex) => {
    setEditingPosition(trackId);
    setTempPosition((currentIndex + 1).toString());
  };

  const handlePositionSave = (trackId) => {
    const newPosition = parseInt(tempPosition);
    const currentIndex = playlist.findIndex(track => track.id === trackId);
    
    if (newPosition >= 1 && newPosition <= playlist.length && newPosition !== currentIndex + 1) {
      const newPlaylist = [...playlist];
      const [movedTrack] = newPlaylist.splice(currentIndex, 1);
      newPlaylist.splice(newPosition - 1, 0, movedTrack);
      onReorderPlaylist(newPlaylist);
    }
    
    setEditingPosition(null);
    setTempPosition('');
  };

  const handlePositionCancel = () => {
    setEditingPosition(null);
    setTempPosition('');
  };

  const handleKeyPress = (e, trackId) => {
    if (e.key === 'Enter') {
      handlePositionSave(trackId);
    } else if (e.key === 'Escape') {
      handlePositionCancel();
    }
  };

  if (playlist.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4">
            <ListMusic className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-400" />
          </div>
        </div>
        <h2 className="text-xl sm:text-3xl font-semibold text-white mb-2 px-4 tracking-widest"
        style={{fontFamily:"'Oops', 'sans-serif'"}}>Your Playlist is Empty</h2>
        <p className="text-gray-400 text-m m:text-base lg:text-lg max-w-md mx-auto px-4"
        style={{fontFamily: "'M PLUS Code Latin', sans-serif"}}>
          Search for songs and add them to your playlist to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-white text-lg sm:text-xl font-bold sticky top-0 bg-black/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 -mx-4 sm:-mx-5 lg:-mx-6 rounded-xl lg:rounded-2xl border border-white/20 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-xl space-y-2 sm:space-y-0">
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">My Playlist ({playlist.length} songs)</span>
        <div className="flex items-center space-x-2 text-xs sm:text-sm">
          <span className="text-gray-400 font-medium">Click position number to reorder</span>
          <Hash className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-400" />
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Responsive Grid Layout for Playlist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {playlist.map((track, index) => (
            <div key={track.id} className="relative group">
              {/* Position Number - Top Left */}
              <div className="absolute top-3 left-3 z-10">
                {editingPosition === track.id ? (
                  <input
                    type="number"
                    min="1"
                    max={playlist.length}
                    value={tempPosition}
                    onChange={(e) => setTempPosition(e.target.value)}
                    onBlur={() => handlePositionSave(track.id)}
                    onKeyDown={(e) => handleKeyPress(e, track.id)}
                    className="w-10 h-10 bg-purple-500/90 border-2 border-purple-400 rounded-lg text-center text-white text-sm font-bold focus:outline-none focus:ring-4 focus:ring-purple-400/40 shadow-lg backdrop-blur-sm"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => handlePositionEdit(track.id, index)}
                    className="w-10 h-10 bg-black/70 hover:bg-purple-500/90 border-2 border-white/20 hover:border-purple-400 rounded-lg flex items-center justify-center text-white text-sm font-bold transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                    title="Click to change position"
                  >
                    {index + 1}
                  </button>
                )}
              </div>
              
              {/* Remove Button - Top Right */}
              <button
                onClick={() => onRemoveFromPlaylist(track.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-red-500/90 hover:bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                title="Remove from playlist"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </button>
              
              {/* Track Card */}
              <TrackCard
                track={track}
                isPlaying={isPlaying}
                isCurrentTrack={currentTrack?.id === track.id}
                onPlay={() => onTrackPlay(track, playlist, index)}
                showPlaylistButton={false}
              />
            </div>
          ))}
        </div>
      </div>
      
      {playlist.length > 1 && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 lg:p-6 bg-white/5 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
          <p className="text-gray-400 text-sm sm:text-base text-center font-medium">
            🎵 Songs will automatically play one after another • Click position numbers to reorder songs
          </p>
        </div>
      )}
    </div>
  );
};