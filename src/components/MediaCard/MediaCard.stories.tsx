import type { Meta, StoryObj } from '@storybook/react'
import { MediaCard } from './MediaCard'

const meta: Meta<typeof MediaCard> = {
  title: 'Components/MediaCard',
  component: MediaCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MediaCard

A comprehensive, professional media card component designed for video, audio, and image content with full playback controls, metadata display, and customizable styling.

### Features

- **Multi-Format Support**: Video, audio, image, and livestream content
- **Advanced Controls**: Play/pause, volume, progress, quality selection, fullscreen
- **Professional Player**: Custom video/audio player with modern UI
- **Metadata Display**: Title, description, duration, file information
- **Multiple Themes**: Light and dark themes with professional styling
- **Responsive Design**: Adapts to different screen sizes and aspect ratios
- **Accessibility**: Full keyboard navigation and screen reader support
- **Interactive Elements**: Download, share, and social interaction features

### Usage

\`\`\`tsx
import { MediaCard } from 'cockroach-ui-cards'

// Video player
<MediaCard
  type="video"
  sources={[
    { url: "/videos/demo.mp4", quality: "720p" },
    { url: "/videos/demo-hd.mp4", quality: "1080p" }
  ]}
  metadata={{
    title: "Product Demo Video",
    description: "Learn about our latest features",
    duration: 300
  }}
  poster="/images/video-poster.jpg"
  theme="dark"
  onPlay={() => console.log('Video started')}
/>

// Audio player
<MediaCard
  type="audio"
  sources={[{ url: "/audio/podcast.mp3", quality: "high" }]}
  metadata={{
    title: "Tech Talk Podcast",
    description: "Weekly technology discussions",
    duration: 3600
  }}
  controlsPosition="external"
/>

// Image gallery
<MediaCard
  type="image"
  sources={[{ url: "/images/gallery/photo1.jpg" }]}
  metadata={{
    title: "Professional Photography",
    description: "High-resolution landscape photo"
  }}
  aspectRatio="16:9"
/>
\`\`\`

### Design Principles

- **Content Focused**: Clean interface that highlights the media
- **Professional**: Modern design suitable for business and creative use
- **User Control**: Comprehensive controls for optimal user experience
- **Performance**: Optimized loading and playback experience
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['video', 'audio', 'image', 'livestream'],
      description: 'Type of media content to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'video' }
      }
    },
    sources: {
      description: 'Array of media sources with quality options',
      control: 'object'
    },
    metadata: {
      description: 'Media metadata including title, description, duration, etc.',
      control: 'object'
    },
    poster: {
      description: 'URL of the poster image for video content',
      control: 'text'
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Visual theme of the media player',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'dark' }
      }
    },
    aspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', 'auto'],
      description: 'Aspect ratio of the media container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '16:9' }
      }
    },
    controlsPosition: {
      control: 'select',
      options: ['bottom', 'overlay', 'external'],
      description: 'Position of the media controls relative to the player',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' }
      }
    },
    showControls: {
      control: 'boolean',
      description: 'Whether to display playback controls',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to display media metadata (title, description, etc.)',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to display progress bar for timed media',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    autoPlay: {
      control: 'boolean',
      description: 'Whether to automatically start playback when loaded',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    muted: {
      control: 'boolean',
      description: 'Whether to start with audio muted',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    loop: {
      control: 'boolean',
      description: 'Whether to automatically restart when finished',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    onPlay: {
      description: 'Callback when media starts playing',
      action: 'media-play'
    },
    onPause: {
      description: 'Callback when media is paused',
      action: 'media-pause'
    },
    onEnded: {
      description: 'Callback when media finishes playing',
      action: 'media-ended'
    },
    onTimeUpdate: {
      description: 'Callback with current time and duration during playback',
      action: 'time-update'
    },
    onVolumeChange: {
      description: 'Callback when volume level changes',
      action: 'volume-change'
    },
    onQualityChange: {
      description: 'Callback when video quality is changed',
      action: 'quality-change'
    },
    onFullscreen: {
      description: 'Callback when entering/exiting fullscreen mode',
      action: 'fullscreen-toggle'
    },
    onDownload: {
      description: 'Callback when download button is clicked',
      action: 'media-download'
    },
    onShare: {
      description: 'Callback when share button is clicked',
      action: 'media-share'
    },
    className: {
      description: 'Additional CSS classes to apply',
      control: 'text'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// Sample media sources
const sampleVideoSources = [
  { 
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    quality: '720p' as const 
  },
  { 
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    quality: '1080p' as const 
  }
]

const sampleAudioSources = [
  { 
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 
    quality: '720p' as const 
  }
]

const sampleImageSources = [
  { 
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80', 
    quality: '720p' as const 
  }
]

export const VideoDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default video player with dark theme, bottom controls, and full metadata display. Includes play/pause, volume control, quality selection, and fullscreen capabilities. Perfect for video content, tutorials, and media galleries.'
      }
    }
  },
  args: {
    id: 'default-video',
    type: 'video',
    sources: sampleVideoSources,
    metadata: {
      title: 'Big Buck Bunny',
      description: 'A short computer-animated comedy film featuring a giant rabbit.',
      duration: 634,
      fileSize: 158000000,
      resolution: '1920x1080',
      bitrate: 2000,
      codec: 'H.264'
    },
    poster: 'https://images.unsplash.com/photo-1489599904593-87b8cce278f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80',
    onPlay: () => console.log('Play'),
    onPause: () => console.log('Pause'),
    onEnded: () => console.log('Ended'),
    onTimeUpdate: (currentTime, duration) => console.log(`Time: ${currentTime}/${duration}`),
    onVolumeChange: (volume) => console.log(`Volume: ${volume}`),
    onQualityChange: (quality) => console.log(`Quality: ${quality}`),
    onFullscreen: () => console.log('Fullscreen'),
    onDownload: () => console.log('Download'),
    onShare: () => console.log('Share')
  }
}

export const VideoLightTheme: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Video player with light theme styling for bright interfaces. Features professional controls with enhanced visibility and clean aesthetics suitable for business applications and educational content.'
      }
    }
  },
  args: {
    ...VideoDefault.args,
    id: 'light-video',
    theme: 'light',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Nature Documentary',
      description: 'Beautiful landscapes and wildlife in stunning HD quality.'
    }
  }
}

export const VideoOverlayControls: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cinematic video experience with overlay controls that appear on hover. Provides immersive viewing with minimal interface distraction, ideal for promotional videos, presentations, and showcase content.'
      }
    }
  },
  args: {
    ...VideoDefault.args,
    id: 'overlay-video',
    controlsPosition: 'overlay',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Cinematic Experience',
      description: 'Immersive video with overlay controls for a cinematic feel.'
    }
  }
}

export const VideoCompact: Story = {
  args: {
    ...VideoDefault.args,
    id: 'compact-video',
    showMetadata: false,
    showProgress: false,
    aspectRatio: '1:1',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Quick Preview'
    }
  }
}

export const VideoAutoPlay: Story = {
  args: {
    ...VideoDefault.args,
    id: 'autoplay-video',
    autoPlay: true,
    muted: true,
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Auto-Playing Video',
      description: 'This video starts playing automatically (muted for UX).'
    }
  }
}

export const Audio: Story = {
  args: {
    id: 'audio-player',
    type: 'audio',
    sources: sampleAudioSources,
    metadata: {
      title: 'Relaxing Bell Sound',
      description: 'A soothing bell sound for meditation and relaxation.',
      duration: 3,
      fileSize: 45000,
      bitrate: 128,
      codec: 'WAV'
    },
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    onPlay: () => console.log('Audio play'),
    onPause: () => console.log('Audio pause'),
    onEnded: () => console.log('Audio ended'),
    onDownload: () => console.log('Download audio'),
    onShare: () => console.log('Share audio')
  }
}

export const AudioWithoutPoster: Story = {
  args: {
    ...Audio.args,
    id: 'audio-no-poster',
    poster: undefined,
    metadata: {
      ...Audio.args?.metadata,
      title: 'Podcast Episode #42',
      description: 'Deep dive into modern web development practices and trends.'
    }
  }
}

export const Image: Story = {
  args: {
    id: 'image-viewer',
    type: 'image',
    sources: sampleImageSources,
    metadata: {
      title: 'Mountain Landscape',
      description: 'Breathtaking view of snow-capped mountains during sunset.',
      fileSize: 2500000,
      resolution: '1920x1080'
    },
    onDownload: () => console.log('Download image'),
    onShare: () => console.log('Share image')
  }
}

export const ImagePortrait: Story = {
  args: {
    ...Image.args,
    id: 'portrait-image',
    aspectRatio: '4:3',
    sources: [
      { 
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80', 
        quality: '720p' as const 
      }
    ],
    metadata: {
      title: 'Forest Path',
      description: 'A mystical path through an enchanted forest.',
      fileSize: 1800000,
      resolution: '800x1200'
    }
  }
}

export const ImageSquare: Story = {
  args: {
    ...Image.args,
    id: 'square-image',
    aspectRatio: '1:1',
    sources: [
      { 
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80', 
        quality: '720p' as const 
      }
    ],
    metadata: {
      title: 'Abstract Art',
      description: 'Modern abstract composition with vibrant colors.',
      fileSize: 950000,
      resolution: '800x800'
    }
  }
}

export const VideoMultipleQualities: Story = {
  args: {
    ...VideoDefault.args,
    id: 'multi-quality-video',
    sources: [
      { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '240p' as const },
      { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '360p' as const },
      { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '480p' as const },
      { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '720p' as const },
      { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '1080p' as const }
    ],
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Multi-Quality Video',
      description: 'Video available in multiple quality options for different bandwidth needs.'
    }
  }
}

export const VideoMinimal: Story = {
  args: {
    ...VideoDefault.args,
    id: 'minimal-video',
    showControls: false,
    showMetadata: false,
    metadata: {
      title: 'Background Video',
      description: 'Minimal video for background use without controls.'
    }
  }
}

export const VideoCustomAspectRatio: Story = {
  args: {
    ...VideoDefault.args,
    id: 'custom-aspect-video',
    aspectRatio: 'auto',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Custom Aspect Ratio',
      description: 'Video with automatic aspect ratio based on content.'
    }
  }
}

export const VideoMuted: Story = {
  args: {
    ...VideoDefault.args,
    id: 'muted-video',
    muted: true,
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Muted Video',
      description: 'Video that starts muted for better user experience.'
    }
  }
}

export const VideoLoop: Story = {
  args: {
    ...VideoDefault.args,
    id: 'loop-video',
    loop: true,
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Looping Video',
      description: 'Video that loops continuously for ambient content.'
    }
  }
}

export const LargeFile: Story = {
  args: {
    ...VideoDefault.args,
    id: 'large-file-video',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: '4K Ultra HD Video',
      description: 'High-resolution video with large file size.',
      fileSize: 1500000000, // 1.5 GB
      resolution: '3840x2160',
      bitrate: 15000
    }
  }
}

export const ShortDuration: Story = {
  args: {
    ...VideoDefault.args,
    id: 'short-video',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Quick Clip',
      description: 'Short video clip under 30 seconds.',
      duration: 15
    }
  }
}

export const LongDuration: Story = {
  args: {
    ...VideoDefault.args,
    id: 'long-video',
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Feature Length Video',
      description: 'Full-length video content over an hour.',
      duration: 4800 // 80 minutes
    }
  }
}

export const NoControls: Story = {
  args: {
    ...VideoDefault.args,
    id: 'no-controls-video',
    showControls: false,
    metadata: {
      ...VideoDefault.args?.metadata,
      title: 'Presentation Video',
      description: 'Video without user controls for presentations.'
    }
  }
}

export const MinimalMetadata: Story = {
  args: {
    ...VideoDefault.args,
    id: 'minimal-metadata-video',
    metadata: {
      title: 'Simple Video'
    }
  }
}

export const CustomThumbnail: Story = {
  args: {
    ...Audio.args,
    id: 'custom-thumbnail-audio',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80',
    metadata: {
      ...Audio.args?.metadata,
      title: 'Music Track',
      description: 'Original composition with custom artwork.'
    }
  }
}
