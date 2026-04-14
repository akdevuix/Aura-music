import React from 'react';
import { TrackCard } from './TrackCard';

export const TrackList = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackPlay,
  onAddToPlaylist,
  playlist = [],
}) => {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No tracks found</div>
        <div className="text-gray-500 text-sm">Try searching for your favorite songs or artists</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-white text-lg font-semibold sticky top-0 bg-black/50 backdrop-blur-sm p-4 -mx-4 rounded-xl border border-white/10 mb-6">
        Search Results ({tracks.length} tracks)
      </div>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {tracks.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            isPlaying={isPlaying}
            isCurrentTrack={currentTrack?.id === track.id}
            onPlay={() => onTrackPlay(track, tracks, index)}
            onAddToPlaylist={onAddToPlaylist}
            isInPlaylist={playlist.some(p => p.id === track.id)}
          />
        ))}
      </div>
    </div>
  );
};