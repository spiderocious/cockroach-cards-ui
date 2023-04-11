import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive profile card component with stunning glassmorphism effects and professional color schemes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'glassmorphism', 'blur'],
      description: 'Visual style variant of the card'
    },
    avatarSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatar image'
    },
    isFollowing: {
      control: 'boolean',
      description: 'Whether the user is currently following this profile'
    },
    isOnline: {
      control: 'boolean',
      description: 'Whether the user is currently online'
    },
    verified: {
      control: 'boolean',
      description: 'Whether the profile is verified'
    },
    showStats: {
      control: 'boolean',
      description: 'Whether to show statistics'
    },
    showSocial: {
      control: 'boolean',
      description: 'Whether to show social links'
    },
    gradient: {
      control: 'boolean',
      description: 'Whether to apply gradient overlay (glassmorphism/blur variants)'
    }
  },
  decorators: [
    (Story, context) => {
      const { variant } = context.args
      const isGlassmorphism = variant === 'glassmorphism' || variant === 'blur'
      
      return (
        <div className={`p-8 ${isGlassmorphism ? 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 min-h-screen' : 'bg-slate-50'}`}>
          <div className="max-w-md mx-auto">
            <Story />
          </div>
        </div>
      )
    }
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data for all stories
const sampleAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const socialIcons = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
    </svg>
  )
}

const sampleStats = [
  { value: '1.2K', label: 'Followers', icon: '👥' },
  { value: '234', label: 'Following', icon: '➕' },
  { value: '45', label: 'Posts', icon: '📝' }
]

const sampleSocialLinks = [
  { platform: 'Twitter', url: 'https://twitter.com', icon: socialIcons.twitter },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: socialIcons.linkedin },
  { platform: 'GitHub', url: 'https://github.com', icon: socialIcons.github }
]

export const Default: Story = {
  args: {
    avatar: sampleAvatar,
    name: 'Alex Johnson',
    title: 'Software Engineer',
    bio: 'Passionate about creating beautiful and functional user interfaces. Love working with React and modern web technologies.',
    location: 'San Francisco, CA',
    stats: sampleStats,
    socialLinks: sampleSocialLinks,
    isOnline: true,
    verified: true,
    onFollow: () => alert('Follow clicked'),
    onMessage: () => alert('Message clicked'),
    onConnect: () => alert('Connect clicked')
  }
}

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    avatarSize: 'small',
    bio: 'Software engineer passionate about React and modern web technologies.'
  }
}

export const Detailed: Story = {
  args: {
    ...Default.args,
    variant: 'detailed',
    avatarSize: 'large',
    bio: 'Senior Software Engineer with 8+ years of experience building scalable web applications. Passionate about creating beautiful and functional user interfaces using React, TypeScript, and modern web technologies. Always excited to learn new things and share knowledge with the community.'
  }
}

export const Glassmorphism: Story = {
  args: {
    ...Default.args,
    variant: 'glassmorphism',
    gradient: true,
    name: 'Maya Chen',
    title: 'UI/UX Designer',
    bio: 'Creating stunning digital experiences with a focus on user-centered design. Specializing in modern interfaces and interaction design.',
    location: 'New York, NY'
  }
}

export const Blur: Story = {
  args: {
    ...Default.args,
    variant: 'blur',
    gradient: false,
    name: 'David Rodriguez',
    title: 'Product Manager',
    bio: 'Building products that make a difference. Passionate about user experience and data-driven decision making.',
    location: 'Austin, TX'
  }
}

export const Following: Story = {
  args: {
    ...Default.args,
    isFollowing: true,
    name: 'Sarah Wilson',
    title: 'Frontend Developer',
    bio: 'React enthusiast and open source contributor. Love building responsive and accessible web applications.'
  }
}

export const Offline: Story = {
  args: {
    ...Default.args,
    isOnline: false,
    verified: false,
    name: 'Michael Brown',
    title: 'Backend Developer',
    bio: 'Building robust and scalable APIs. Experienced with Node.js, Python, and cloud technologies.'
  }
}

export const NoActions: Story = {
  args: {
    avatar: sampleAvatar,
    name: 'Emma Davis',
    title: 'Data Scientist',
    bio: 'Turning data into insights. Passionate about machine learning and statistical analysis.',
    location: 'Seattle, WA',
    stats: sampleStats,
    socialLinks: sampleSocialLinks,
    isOnline: true,
    verified: true
  }
}

export const MinimalStats: Story = {
  args: {
    ...Default.args,
    stats: [
      { value: '500', label: 'Followers' },
      { value: '125', label: 'Following' }
    ],
    showSocial: false,
    name: 'James Taylor',
    title: 'DevOps Engineer'
  }
}

export const NoSocial: Story = {
  args: {
    ...Default.args,
    showSocial: false,
    name: 'Lisa Anderson',
    title: 'Full Stack Developer',
    bio: 'Building end-to-end applications with modern technologies. Always learning and growing.'
  }
}

export const CustomAvatar: Story = {
  args: {
    ...Default.args,
    avatar: (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
        JD
      </div>
    ),
    name: 'John Doe',
    title: 'Creative Director'
  }
}

export const GlassmorphismShowcase: Story = {
  args: {
    variant: 'glassmorphism',
    gradient: true,
    avatar: sampleAvatar,
    name: 'Sophia Kim',
    title: 'Design Systems Lead',
    bio: 'Crafting cohesive design languages that scale across products. Passionate about accessibility and inclusive design.',
    location: 'Los Angeles, CA',
    stats: [
      { value: '2.4K', label: 'Followers', icon: '✨' },
      { value: '456', label: 'Following', icon: '🎨' },
      { value: '89', label: 'Projects', icon: '🚀' }
    ],
    socialLinks: sampleSocialLinks,
    isOnline: true,
    verified: true,
    avatarSize: 'large',
    onFollow: () => alert('Follow clicked'),
    onMessage: () => alert('Message clicked'),
    onConnect: () => alert('Connect clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Stunning glassmorphism variant with backdrop blur effects and gradient overlays, perfect for modern applications.'
      }
    }
  }
}

export const BlurShowcase: Story = {
  args: {
    variant: 'blur',
    gradient: false,
    avatar: sampleAvatar,
    name: 'Marcus Thompson',
    title: 'Technical Lead',
    bio: 'Leading high-performance engineering teams. Focused on architecture, scalability, and developer experience.',
    location: 'Toronto, ON',
    stats: [
      { value: '3.1K', label: 'Followers', icon: '👥' },
      { value: '892', label: 'Following', icon: '🔗' },
      { value: '156', label: 'Contributions', icon: '💡' }
    ],
    socialLinks: sampleSocialLinks,
    isOnline: true,
    verified: true,
    avatarSize: 'large',
    onFollow: () => alert('Follow clicked'),
    onMessage: () => alert('Message clicked'),
    onConnect: () => alert('Connect clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Beautiful blur variant with professional styling, ideal for corporate and business applications.'
      }
    }
  }
}
