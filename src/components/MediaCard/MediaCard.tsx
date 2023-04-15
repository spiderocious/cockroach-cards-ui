import React, { useState, useRef, useEffect } from 'react'

export type MediaType = 'video' | 'audio' | 'image' | 'livestream'
export type MediaQuality = '240p' | '360p' | '480p' | '720p' | '1080p' | '4K'

export interface MediaMetadata {
  title: string
  description?: string
  duration?: number
  fileSize?: number
  resolution?: string
  bitrate?: number
  codec?: string
  thumbnail?: string
}

export interface MediaSource {
  url: string
  quality?: MediaQuality
  type?: string
}

export interface MediaCardProps {
  id: string
  type: MediaType
  sources: MediaSource[]
  metadata: MediaMetadata
  
  // Visual options
  poster?: string
  thumbnail?: string
  showControls?: boolean
  showMetadata?: boolean
  showProgress?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  
  // Player customization
  controlsPosition?: 'bottom' | 'overlay' | 'external'
  theme?: 'light' | 'dark'
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto'
  
  // Interactive features
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (currentTime: number, duration: number) => void
  onVolumeChange?: (volume: number) => void
  onQualityChange?: (quality: MediaQuality) => void
  onFullscreen?: () => void
  onDownload?: () => void
  onShare?: () => void
  
  // Styling
  className?: string
  style?: React.CSSProperties
}

export const MediaCard: React.FC<MediaCardProps> = ({
  id: _id,
  type,
  sources,
  metadata,
  poster,
  thumbnail,
  showControls = true,
  showMetadata = true,
  showProgress = true,
  autoPlay = false,
  muted = false,
  loop = false,
  controlsPosition = 'bottom',
  theme = 'dark',
  aspectRatio = '16:9',
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onQualityChange,
  onFullscreen,
  onDownload,
  onShare,
  className = '',
  style
}) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(muted)
  const [currentQuality, setCurrentQuality] = useState<MediaQuality>(sources[0]?.quality || '720p')
  const [showControlsOverlay, setShowControlsOverlay] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const handleLoadedMetadata = () => {
      setDuration(media.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime)
      onTimeUpdate?.(media.currentTime, media.duration)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    const handleVolumeChange = () => {
      setVolume(media.volume)
      setIsMuted(media.muted)
      onVolumeChange?.(media.volume)
    }

    media.addEventListener('loadedmetadata', handleLoadedMetadata)
    media.addEventListener('timeupdate', handleTimeUpdate)
    media.addEventListener('play', handlePlay)
    media.addEventListener('pause', handlePause)
    media.addEventListener('ended', handleEnded)
    media.addEventListener('volumechange', handleVolumeChange)

    return () => {
      media.removeEventListener('loadedmetadata', handleLoadedMetadata)
      media.removeEventListener('timeupdate', handleTimeUpdate)
      media.removeEventListener('play', handlePlay)
      media.removeEventListener('pause', handlePause)
      media.removeEventListener('ended', handleEnded)
      media.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [onPlay, onPause, onEnded, onTimeUpdate, onVolumeChange])

  const togglePlay = () => {
    const media = mediaRef.current
    if (!media) return

    if (isPlaying) {
      media.pause()
    } else {
      media.play()
      // Call onPlay callback directly for immediate feedback
      onPlay?.()
    }
  }

  const handleSeek = (time: number) => {
    const media = mediaRef.current
    if (!media) return

    media.currentTime = time
    setCurrentTime(time)
  }

  const handleVolumeUpdate = (newVolume: number) => {
    const media = mediaRef.current
    if (!media) return

    media.volume = newVolume
    setVolume(newVolume)
  }

  const toggleMute = () => {
    const media = mediaRef.current
    if (!media) return

    media.muted = !media.muted
    setIsMuted(media.muted)
  }

  const handleQualitySelect = (quality: MediaQuality) => {
    const source = sources.find(s => s.quality === quality)
    if (!source || !mediaRef.current) return

    const currentTime = mediaRef.current.currentTime
    const wasPlaying = isPlaying

    setCurrentQuality(quality)
    onQualityChange?.(quality)

    // Switch source and maintain playback position
    mediaRef.current.src = source.url
    mediaRef.current.currentTime = currentTime

    if (wasPlaying) {
      mediaRef.current.play()
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mediaRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    onFullscreen?.()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '4:3':
        return 'aspect-[4/3]'
      case '1:1':
        return 'aspect-square'
      case 'auto':
        return ''
      default:
        return 'aspect-video'
    }
  }

  const themeClasses = theme === 'dark' 
    ? 'bg-slate-900 text-white border-slate-700' 
    : 'bg-white text-slate-900 border-slate-200'

  const currentSource = sources.find(s => s.quality === currentQuality) || sources[0]

  if (!currentSource) {
    return (
      <div className={`rounded-lg border shadow-sm p-4 ${themeClasses} ${className}`} style={style}>
        <div className="text-center py-8">
          <p className="text-red-500">No media source available</p>
        </div>
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div
        className={`rounded-lg border shadow-sm overflow-hidden ${themeClasses} ${className}`}
        style={style}
      >
        <div className={`relative ${getAspectRatioClass()}`}>
          <img
            src={currentSource.url}
            alt={metadata.title}
            className="w-full h-full object-cover"
          />
          {showControls && (
            <div className="absolute top-2 right-2 flex gap-2">
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
                  title="Download"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {onShare && (
                <button
                  onClick={onShare}
                  className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all"
                  title="Share"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
        {showMetadata && (
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{metadata.title}</h3>
            {metadata.description && (
              <p className="text-sm opacity-80 mb-3">{metadata.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs opacity-60">
              {metadata.resolution && <span>Resolution: {metadata.resolution}</span>}
              {metadata.fileSize && <span>Size: {formatFileSize(metadata.fileSize)}</span>}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg border shadow-sm overflow-hidden ${themeClasses} ${className}`}
      style={style}
      onMouseEnter={() => setShowControlsOverlay(true)}
      onMouseLeave={() => setShowControlsOverlay(false)}
    >
      <div className={`relative ${getAspectRatioClass()}`}>
        {type === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={currentSource.url}
            poster={poster || thumbnail}
            autoPlay={autoPlay}
            muted={muted || undefined}
            loop={loop}
            className="w-full h-full object-cover"
            controls={false}
          />
        ) : (
          <>
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={currentSource.url}
              autoPlay={autoPlay}
              muted={muted || undefined}
              loop={loop}
              className="hidden"
            />
            {/* Audio poster/thumbnail */}
            {(poster || thumbnail) && (
              <img
                src={poster || thumbnail}
                alt={metadata.title}
                className="w-full h-full object-cover"
              />
            )}
          </>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play button overlay for audio or when paused */}
        {(type === 'audio' || !isPlaying) && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {type === 'audio' && (poster || thumbnail) && (
              <img
                src={poster || thumbnail}
                alt={metadata.title}
                className="w-full h-full object-cover absolute inset-0"
              />
            )}
            <button
              onClick={togglePlay}
              className="p-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all transform hover:scale-110"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Control overlay */}
        {showControls && controlsPosition === 'overlay' && (showControlsOverlay || !isPlaying) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="p-2 text-white hover:text-blue-400 transition-colors">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              {type === 'video' && onFullscreen && (
                <button onClick={toggleFullscreen} className="p-2 text-white hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      {showControls && controlsPosition === 'bottom' && (
        <div className="p-3 border-t border-opacity-20">
          {/* Progress bar */}
          {showProgress && showControls && duration > 0 && (
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer slider"
                data-testid="progress-bar"
              />
              <div className="flex justify-between text-xs opacity-60 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="p-1 hover:text-blue-500 transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="p-1 hover:text-blue-500 transition-colors">
                  {isMuted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.832 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.832l3.551-3.776zm7.895 1.486a1 1 0 011.414 0 11.952 11.952 0 010 16.876 1 1 0 11-1.414-1.414A9.952 9.952 0 0018.262 10a9.952 9.952 0 00-1.984-5.962 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.832 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.832l3.551-3.776zm7.895 1.486a1 1 0 011.414 0 11.952 11.952 0 010 16.876 1 1 0 11-1.414-1.414A9.952 9.952 0 0018.262 10a9.952 9.952 0 00-1.984-5.962 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {showProgress && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeUpdate(Number(e.target.value))}
                    className="w-16 h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quality selector */}
              {sources.length > 1 && (
                <select
                  value={currentQuality}
                  onChange={(e) => handleQualitySelect(e.target.value as MediaQuality)}
                  className="text-xs bg-transparent border rounded px-2 py-1"
                >
                  {sources.map((source) => (
                    <option key={source.quality} value={source.quality}>
                      {source.quality}
                    </option>
                  ))}
                </select>
              )}

              {/* Action buttons */}
              {onDownload && (
                <button onClick={onDownload} className="p-1 hover:text-blue-500 transition-colors" title="Download">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}

              {onShare && (
                <button onClick={onShare} className="p-1 hover:text-blue-500 transition-colors" title="Share">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              )}

              {type === 'video' && onFullscreen && (
                <button onClick={toggleFullscreen} className="p-1 hover:text-blue-500 transition-colors" title="Fullscreen">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      {showMetadata && (
        <div className="p-4 border-t border-opacity-20">
          <h3 className="font-semibold text-lg mb-2">{metadata.title}</h3>
          {metadata.description && (
            <p className="text-sm opacity-80 mb-3">{metadata.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs opacity-60">
            {metadata.duration && <span>Duration: {formatTime(metadata.duration)}</span>}
            {metadata.fileSize && <span>Size: {formatFileSize(metadata.fileSize)}</span>}
            {metadata.resolution && <span>Resolution: {metadata.resolution}</span>}
            {metadata.bitrate && <span>Bitrate: {metadata.bitrate} kbps</span>}
            {metadata.codec && <span>Codec: {metadata.codec}</span>}
          </div>
        </div>
      )}
    </div>
  )
}
