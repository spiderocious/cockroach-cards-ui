import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProfileCard is a user profile display component with avatar, bio, and social actions. Perfect for user directories, team pages, and social networking interfaces.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Visual style variant of the card'
    },
    avatarSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the profile avatar'
    },
    showStats: {
      control: 'boolean',
      description: 'Show user statistics section'
    },
    showSocial: {
      control: 'boolean',
      description: 'Show social media links'
    },
    isFollowing: {
      control: 'boolean',
      description: 'Whether the user is currently following this profile'
    },
    isOnline: {
      control: 'boolean',
      description: 'Show online status indicator'
    },
    verified: {
      control: 'boolean',
      description: 'Show verification badge'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    name: 'Alex Johnson',
    title: 'Software Engineer',
    bio: 'Passionate developer who loves building amazing products and solving complex problems.',
    location: 'San Francisco, CA',
    onFollow: () => console.log('Followed user'),
    onMessage: () => console.log('Message sent'),
  }
}

// With all features
export const WithAllFeatures: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    name: 'Sarah Chen',
    title: 'UX Designer & Creative Director',
    bio: 'Creative designer passionate about user experience, accessibility, and inclusive design. Love to mentor and share knowledge.',
    location: 'New York, NY',
    verified: true,
    isOnline: true,
    stats: [
      { label: 'Followers', value: '12.5K', icon: <span>👥</span> },
      { label: 'Following', value: '1.2K', icon: <span>👤</span> },
      { label: 'Projects', value: '48', icon: <span>🚀</span> }
    ],
    socialLinks: [
      { 
        platform: 'twitter', 
        url: 'https://twitter.com/sarahchen', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      },
      { 
        platform: 'linkedin', 
        url: 'https://linkedin.com/in/sarahchen', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      },
      { 
        platform: 'github', 
        url: 'https://github.com/sarahchen', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      }
    ],
    onFollow: () => console.log('Followed user'),
    onMessage: () => console.log('Message sent'),
    onConnect: () => console.log('Connection sent'),
  }
}

// Compact variant
export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    name: 'Mike Rodriguez',
    title: 'Product Manager'
  }
}

// Detailed variant
export const Detailed: Story = {
  args: {
    ...WithAllFeatures.args,
    variant: 'detailed',
    name: 'Emma Wilson',
    title: 'Senior Frontend Developer'
  }
}

// Different avatar sizes
export const SmallAvatar: Story = {
  args: {
    ...Default.args,
    avatarSize: 'small',
    name: 'Small Avatar Profile'
  }
}

export const LargeAvatar: Story = {
  args: {
    ...Default.args,
    avatarSize: 'large',
    name: 'Large Avatar Profile'
  }
}

// Following state
export const Following: Story = {
  args: {
    ...Default.args,
    isFollowing: true,
    name: 'Already Following'
  }
}

// Verified and online
export const VerifiedAndOnline: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    name: 'David Kim',
    title: 'Tech Lead',
    bio: 'Building the future of web development.',
    location: 'Seattle, WA',
    verified: true,
    isOnline: true,
    onFollow: () => console.log('Followed user'),
    onMessage: () => console.log('Message sent'),
  }
}

// Without stats and social
export const MinimalProfile: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e4?w=150&q=80',
    name: 'Lisa Park',
    title: 'Graphic Designer',
    bio: 'Creating beautiful visual experiences.',
    showStats: false,
    showSocial: false,
    onFollow: () => console.log('Followed user'),
  }
}

// Team member style
export const TeamMember: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&q=80',
    name: 'James Thompson',
    title: 'Engineering Manager',
    bio: 'Leading a team of talented engineers to build scalable solutions.',
    location: 'Austin, TX',
    stats: [
      { label: 'Team Size', value: '12', icon: <span>👥</span> },
      { label: 'Projects', value: '25', icon: <span>📋</span> },
      { label: 'Experience', value: '8yr', icon: <span>⭐</span> }
    ],
    variant: 'detailed',
    onMessage: () => console.log('Message sent'),
    onConnect: () => console.log('Connection sent'),
  }
}

// Custom button text
export const CustomButtonText: Story = {
  args: {
    ...Default.args,
    followText: 'Subscribe',
    messageText: 'Send Email',
    connectText: 'Add Friend'
  }
}

// Profile grid layout
export const ProfileGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
        name="Alex Johnson"
        title="Software Engineer"
        bio="Full-stack developer passionate about React and Node.js"
        location="San Francisco, CA"
        verified={true}
        stats={[
          { label: 'Repos', value: '42', icon: <span>📁</span> },
          { label: 'Stars', value: '1.2K', icon: <span>⭐</span> },
          { label: 'Followers', value: '856', icon: <span>👥</span> }
        ]}
        onFollow={() => console.log('Followed Alex')}
        onMessage={() => console.log('Message Alex')}
      />
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
        name="Sarah Chen"
        title="UX Designer"
        bio="Creating delightful user experiences with a focus on accessibility"
        location="New York, NY"
        isOnline={true}
        stats={[
          { label: 'Projects', value: '28', icon: <span>🎨</span> },
          { label: 'Awards', value: '5', icon: <span>🏆</span> },
          { label: 'Clients', value: '15', icon: <span>💼</span> }
        ]}
        onFollow={() => console.log('Followed Sarah')}
        onMessage={() => console.log('Message Sarah')}
      />
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
        name="David Kim"
        title="Product Manager"
        bio="Bridging the gap between technology and user needs"
        location="Seattle, WA"
        verified={true}
        isOnline={true}
        stats={[
          { label: 'Products', value: '8', icon: <span>🚀</span> },
          { label: 'Teams', value: '3', icon: <span>👥</span> },
          { label: 'Experience', value: '6yr', icon: <span>📈</span> }
        ]}
        onFollow={() => console.log('Followed David')}
        onMessage={() => console.log('Message David')}
      />
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b1e4?w=150&q=80"
        name="Lisa Park"
        title="Data Scientist"
        bio="Turning data into actionable insights for business growth"
        location="Los Angeles, CA"
        stats={[
          { label: 'Models', value: '15', icon: <span>🤖</span> },
          { label: 'Accuracy', value: '94%', icon: <span>🎯</span> },
          { label: 'Papers', value: '12', icon: <span>📄</span> }
        ]}
        onFollow={() => console.log('Followed Lisa')}
        onMessage={() => console.log('Message Lisa')}
      />
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&q=80"
        name="James Thompson"
        title="DevOps Engineer"
        bio="Building reliable infrastructure and streamlining deployments"
        location="Austin, TX"
        verified={true}
        stats={[
          { label: 'Uptime', value: '99.9%', icon: <span>⚡</span> },
          { label: 'Deploys', value: '500+', icon: <span>🚀</span> },
          { label: 'Servers', value: '200', icon: <span>🖥️</span> }
        ]}
        onFollow={() => console.log('Followed James')}
        onMessage={() => console.log('Message James')}
      />
      <ProfileCard
        avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80"
        name="Maria Rodriguez"
        title="Mobile Developer"
        bio="Creating amazing mobile experiences for iOS and Android"
        location="Miami, FL"
        isOnline={true}
        stats={[
          { label: 'Apps', value: '18', icon: <span>📱</span> },
          { label: 'Downloads', value: '2M+', icon: <span>⬇️</span> },
          { label: 'Rating', value: '4.8', icon: <span>⭐</span> }
        ]}
        onFollow={() => console.log('Followed Maria')}
        onMessage={() => console.log('Message Maria')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}

// Interactive example
export const Interactive: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    name: 'Interactive Profile',
    title: 'Click buttons to see interactions',
    bio: 'This profile demonstrates all interactive features. Check the Actions tab to see the console logs.',
    location: 'Demo Location',
    verified: true,
    isOnline: true,
    stats: [
      { label: 'Clicks', value: '∞', icon: <span>🖱️</span> },
      { label: 'Demo', value: '100%', icon: <span>🎯</span> },
      { label: 'Fun', value: 'MAX', icon: <span>🎉</span> }
    ],
    socialLinks: [
      { platform: 'demo', url: '#', icon: <span>🔗</span> }
    ],
    onFollow: () => console.log('🎉 User followed!'),
    onMessage: () => console.log('💌 Message sent!'),
    onConnect: () => console.log('🤝 Connection request sent!'),
    onClick: () => console.log('👆 Profile card clicked!')
  }
}

// Different variants showcase
export const VariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Compact</h3>
        <ProfileCard
          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
          name="Compact Profile"
          title="Software Engineer"
          bio="This is the compact variant with minimal spacing."
          variant="compact"
          onFollow={() => console.log('Followed')}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <ProfileCard
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
          name="Default Profile"
          title="UX Designer"
          bio="This is the default variant with standard spacing."
          onFollow={() => console.log('Followed')}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Detailed</h3>
        <ProfileCard
          avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
          name="Detailed Profile"
          title="Product Manager"
          bio="This is the detailed variant with generous spacing and enhanced visuals."
          variant="detailed"
          verified={true}
          onFollow={() => console.log('Followed')}
          onMessage={() => console.log('Message sent')}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}
