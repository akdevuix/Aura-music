import { useState, useRef, useCallback, useEffect } from 'react';

export const usePlayer = () => {
  const audioRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    queue: [],
    currentIndex: -1,
  });

  const playTrack = useCallback((track, queue = [], index = 0) => {
    if (!track.preview_url) {
      console.warn('No preview available for this track');
      return;
    }

    if (audioRef.current) {
      audioRef.current.src = track.preview_url;
      audioRef.current.volume = playerState.volume;

      // 👇 Autoplay fix
      audioRef.current
        .play()
        .then(() => {
          setPlayerState(prev => ({
            ...prev,
            currentTrack: track,
            queue: queue.length > 0 ? queue : [track],
            currentIndex: index,
            isPlaying: true,
          }));
        })
        .catch(err => console.error("Autoplay blocked:", err));
    }
  }, [playerState.volume]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !playerState.currentTrack) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  }, [playerState.isPlaying, playerState.currentTrack]);

  const setVolume = useCallback((volume) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setPlayerState(prev => ({ ...prev, volume: clampedVolume }));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const nextTrack = useCallback(() => {
    const { queue, currentIndex } = playerState;
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      playTrack(queue[nextIndex], queue, nextIndex);
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [playerState, playTrack]);

  const previousTrack = useCallback(() => {
    const { queue, currentIndex } = playerState;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      playTrack(queue[prevIndex], queue, prevIndex);
    }
  }, [playerState, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handlePlay = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleEnded = () => {
      const { queue, currentIndex } = playerState;
      if (currentIndex < queue.length - 1) {
        nextTrack(); // autoplay next track
      } else {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [nextTrack, playerState.queue, playerState.currentIndex]);

  return {
    audioRef,
    playerState,
    playTrack,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
  };
};
