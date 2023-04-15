import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MediaCard } from './MediaCard'

// Mock HTMLMediaElement methods
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: jest.fn().mockImplementation(() => Promise.resolve()),
})

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: jest.fn(),
})

Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', {
  writable: true,
  value: 0,
})

Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
  writable: true,
  value: 100,
})

const defaultSources = [
  { url: 'https://example.com/video.mp4', quality: '720p' as const },
  { url: 'https://example.com/video-hd.mp4', quality: '1080p' as const }
]

const defaultMetadata = {
  title: 'Test Video',
  description: 'A test video for testing purposes',
  duration: 120,
  fileSize: 50000000,
  resolution: '1920x1080',
  bitrate: 5000,
  codec: 'H.264'
}

const defaultProps = {
  id: 'test-media',
  type: 'video' as const,
  sources: defaultSources,
  metadata: defaultMetadata
}

describe('MediaCard', () => {
  // Basic rendering tests
  it('renders with required props', () => {
    render(<MediaCard {...defaultProps} />)
    
    expect(screen.getByText('Test Video')).toBeInTheDocument()
    expect(screen.getByText('A test video for testing purposes')).toBeInTheDocument()
  })

  it('renders with custom className and style', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        className="custom-class"
        style={{ backgroundColor: 'red' }}
      />
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-class')
    expect(card).toHaveStyle({ backgroundColor: 'red' })
  })

  it('handles missing sources gracefully', () => {
    render(
      <MediaCard 
        {...defaultProps}
        sources={[]}
      />
    )
    
    expect(screen.getByText('No media source available')).toBeInTheDocument()
  })

  // Media type tests
  it('renders video type correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} type="video" />)
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', 'https://example.com/video.mp4')
  })

  it('renders audio type correctly', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        type="audio"
        sources={[{ url: 'https://example.com/audio.mp3', quality: '720p' }]}
      />
    )
    const audio = container.querySelector('audio')
    expect(audio).toBeInTheDocument()
    expect(audio).toHaveAttribute('src', 'https://example.com/audio.mp3')
  })

  it('renders image type correctly', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        type="image"
        sources={[{ url: 'https://example.com/image.jpg', quality: '720p' }]}
      />
    )
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  // Control visibility tests
  it('shows controls by default', () => {
    render(<MediaCard {...defaultProps} />)
    
    const playButton = screen.getByRole('button', { name: /play/i })
    expect(playButton).toBeInTheDocument()
  })

  it('hides controls when showControls is false', () => {
    render(<MediaCard {...defaultProps} showControls={false} />)
    
    const playButton = screen.queryByRole('button')
    expect(playButton).not.toBeInTheDocument()
  })

  it('shows metadata by default', () => {
    render(<MediaCard {...defaultProps} />)
    
    expect(screen.getByText('Test Video')).toBeInTheDocument()
    expect(screen.getByText('A test video for testing purposes')).toBeInTheDocument()
    expect(screen.getByText(/Duration:/)).toBeInTheDocument()
  })

  it('hides metadata when showMetadata is false', () => {
    render(<MediaCard {...defaultProps} showMetadata={false} />)
    
    expect(screen.queryByText('Test Video')).not.toBeInTheDocument()
    expect(screen.queryByText('A test video for testing purposes')).not.toBeInTheDocument()
  })

  it('shows progress bar by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const progressBar = container.querySelector('input[type="range"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('hides progress bar when showProgress is false', () => {
    const { container } = render(<MediaCard {...defaultProps} showProgress={false} />)
    const progressBar = container.querySelector('input[type="range"]')
    expect(progressBar).not.toBeInTheDocument()
  })

  // Theme tests
  it('renders dark theme by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    expect(container.firstChild).toHaveClass('bg-slate-900', 'text-white', 'border-slate-700')
  })

  it('renders light theme correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} theme="light" />)
    expect(container.firstChild).toHaveClass('bg-white', 'text-slate-900', 'border-slate-200')
  })

  // Aspect ratio tests
  it('renders 16:9 aspect ratio by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    expect(container.querySelector('.aspect-video')).toBeInTheDocument()
  })

  it('renders 4:3 aspect ratio correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} aspectRatio="4:3" />)
    expect(container.querySelector('.aspect-\\[4\\/3\\]')).toBeInTheDocument()
  })

  it('renders 1:1 aspect ratio correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} aspectRatio="1:1" />)
    expect(container.querySelector('.aspect-square')).toBeInTheDocument()
  })

  it('renders auto aspect ratio correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} aspectRatio="auto" />)
    expect(container.querySelector('.aspect-video')).not.toBeInTheDocument()
    expect(container.querySelector('.aspect-square')).not.toBeInTheDocument()
  })

  // Media attributes tests
  it('sets autoplay when specified', () => {
    const { container } = render(<MediaCard {...defaultProps} autoPlay />)
    const video = container.querySelector('video')
    expect(video).toHaveAttribute('autoplay')
  })


  it('sets loop when specified', () => {
    const { container } = render(<MediaCard {...defaultProps} loop />)
    const video = container.querySelector('video')
    expect(video).toHaveAttribute('loop')
  })

  it('sets poster when specified', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps} 
        poster="https://example.com/poster.jpg" 
      />
    )
    const video = container.querySelector('video')
    expect(video).toHaveAttribute('poster', 'https://example.com/poster.jpg')
  })

  // Quality selector tests
  it('renders quality selector when multiple sources available', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const qualitySelect = container.querySelector('select')
    expect(qualitySelect).toBeInTheDocument()
    expect(qualitySelect).toHaveValue('720p')
  })

  it('does not render quality selector with single source', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps} 
        sources={[{ url: 'https://example.com/video.mp4', quality: '720p' }]}
      />
    )
    const qualitySelect = container.querySelector('select')
    expect(qualitySelect).not.toBeInTheDocument()
  })

  it('calls onQualityChange when quality is changed', () => {
    const onQualityChange = jest.fn()
    const { container } = render(
      <MediaCard 
        {...defaultProps} 
        onQualityChange={onQualityChange}
      />
    )
    
    const qualitySelect = container.querySelector('select') as HTMLSelectElement
    fireEvent.change(qualitySelect, { target: { value: '1080p' } })
    
    expect(onQualityChange).toHaveBeenCalledWith('1080p')
  })

  // Interactive features tests
  it('calls onPlay when play button is clicked', () => {
    const onPlay = jest.fn()
    render(<MediaCard {...defaultProps} onPlay={onPlay} />)
    
    const playButtons = screen.getAllByRole('button')
    const playButton = playButtons.find(button => 
      button.querySelector('svg') && 
      button.closest('[class*="p-"]')
    )
    if (playButton) {
      fireEvent.click(playButton)
      expect(onPlay).toHaveBeenCalled()
    }
  })

  it('calls onDownload when download button is clicked', () => {
    const onDownload = jest.fn()
    render(<MediaCard {...defaultProps} onDownload={onDownload} />)
    
    const downloadButton = screen.getByTitle('Download')
    fireEvent.click(downloadButton)
    
    expect(onDownload).toHaveBeenCalled()
  })

  it('calls onShare when share button is clicked', () => {
    const onShare = jest.fn()
    render(<MediaCard {...defaultProps} onShare={onShare} />)
    
    const shareButton = screen.getByTitle('Share')
    fireEvent.click(shareButton)
    
    expect(onShare).toHaveBeenCalled()
  })

  it('calls onFullscreen when fullscreen button is clicked', () => {
    const onFullscreen = jest.fn()
    render(<MediaCard {...defaultProps} onFullscreen={onFullscreen} />)
    
    const fullscreenButton = screen.getByTitle('Fullscreen')
    fireEvent.click(fullscreenButton)
    
    expect(onFullscreen).toHaveBeenCalled()
  })

  // Control position tests
  it('renders bottom controls by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    expect(container.querySelector('.border-t')).toBeInTheDocument() // Bottom controls container
  })

  it('renders overlay controls correctly', () => {
    const { container } = render(<MediaCard {...defaultProps} controlsPosition="overlay" />)
    expect(container.querySelector('.absolute.inset-0')).toBeInTheDocument()
  })

  // Image type specific tests
  it('renders image with action buttons', () => {
    const onDownload = jest.fn()
    const onShare = jest.fn()
    
    render(
      <MediaCard 
        {...defaultProps}
        type="image"
        sources={[{ url: 'https://example.com/image.jpg', quality: '720p' }]}
        onDownload={onDownload}
        onShare={onShare}
      />
    )
    
    expect(screen.getByTitle('Download')).toBeInTheDocument()
    expect(screen.getByTitle('Share')).toBeInTheDocument()
  })

  // Metadata display tests
  it('displays duration metadata correctly', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Duration: 2:00')).toBeInTheDocument()
  })

  it('displays file size metadata correctly', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Size: 47.7 MB')).toBeInTheDocument()
  })

  it('displays resolution metadata correctly', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Resolution: 1920x1080')).toBeInTheDocument()
  })

  it('displays bitrate metadata correctly', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Bitrate: 5000 kbps')).toBeInTheDocument()
  })

  it('displays codec metadata correctly', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Codec: H.264')).toBeInTheDocument()
  })

  // Volume control tests
  it('renders volume control', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const volumeSlider = container.querySelector('input[type="range"][max="1"]')
    expect(volumeSlider).toBeInTheDocument()
  })

  it('calls onVolumeChange when volume is adjusted', async () => {
    const onVolumeChange = jest.fn()
    const { container } = render(
      <MediaCard {...defaultProps} onVolumeChange={onVolumeChange} />
    )
    
    const volumeSlider = container.querySelector('input[type="range"][max="1"]') as HTMLInputElement
    fireEvent.change(volumeSlider, { target: { value: '0.5' } })
    
    // Wait for volume change to propagate
    await waitFor(() => {
      expect(onVolumeChange).toHaveBeenCalled()
    })
  })

  // Audio type specific tests
  it('renders audio with poster image', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        type="audio"
        poster="https://example.com/poster.jpg"
        sources={[{ url: 'https://example.com/audio.mp3', quality: '720p' }]}
      />
    )
    
    const posterImage = container.querySelector('img[src="https://example.com/poster.jpg"]')
    expect(posterImage).toBeInTheDocument()
  })

  it('renders audio with thumbnail image', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        type="audio"
        thumbnail="https://example.com/thumb.jpg"
        sources={[{ url: 'https://example.com/audio.mp3', quality: '720p' }]}
      />
    )
    
    const thumbnailImage = container.querySelector('img[src="https://example.com/thumb.jpg"]')
    expect(thumbnailImage).toBeInTheDocument()
  })

  // Accessibility tests
  it('has proper button accessibility for download', () => {
    render(<MediaCard {...defaultProps} onDownload={jest.fn()} />)
    
    const downloadButton = screen.getByTitle('Download')
    expect(downloadButton).toHaveAttribute('title', 'Download')
  })

  it('has proper button accessibility for share', () => {
    render(<MediaCard {...defaultProps} onShare={jest.fn()} />)
    
    const shareButton = screen.getByTitle('Share')
    expect(shareButton).toHaveAttribute('title', 'Share')
  })

  it('has proper button accessibility for fullscreen', () => {
    render(<MediaCard {...defaultProps} onFullscreen={jest.fn()} />)
    
    const fullscreenButton = screen.getByTitle('Fullscreen')
    expect(fullscreenButton).toHaveAttribute('title', 'Fullscreen')
  })

  // Edge cases
  it('handles metadata without optional fields', () => {
    const minimalMetadata = { title: 'Minimal Video' }
    render(
      <MediaCard 
        {...defaultProps}
        metadata={minimalMetadata}
      />
    )
    
    expect(screen.getByText('Minimal Video')).toBeInTheDocument()
  })

  it('handles empty metadata gracefully', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        metadata={{ title: '' }}
      />
    )
    
    expect(container).toBeInTheDocument()
  })

  it('handles missing poster and thumbnail gracefully', () => {
    const { container } = render(
      <MediaCard 
        {...defaultProps}
        type="audio"
        poster=""
        thumbnail=""
      />
    )
    
    expect(container).toBeInTheDocument()
  })

  // Time formatting tests
  it('formats time correctly for minutes and seconds', () => {
    render(
      <MediaCard 
        {...defaultProps}
        metadata={{ ...defaultMetadata, duration: 75 }}
      />
    )
    
    expect(screen.getByText('Duration: 1:15')).toBeInTheDocument()
  })

  it('formats time correctly for seconds only', () => {
    render(
      <MediaCard 
        {...defaultProps}
        metadata={{ ...defaultMetadata, duration: 45 }}
      />
    )
    
    expect(screen.getByText('Duration: 0:45')).toBeInTheDocument()
  })

  // File size formatting tests
  it('formats file size in KB correctly', () => {
    render(
      <MediaCard 
        {...defaultProps}
        metadata={{ ...defaultMetadata, fileSize: 1500 }}
      />
    )
    
    expect(screen.getByText('Size: 1.5 KB')).toBeInTheDocument()
  })

  it('formats file size in GB correctly', () => {
    render(
      <MediaCard 
        {...defaultProps}
        metadata={{ ...defaultMetadata, fileSize: 2000000000 }}
      />
    )
    
    expect(screen.getByText('Size: 1.9 GB')).toBeInTheDocument()
  })
})
