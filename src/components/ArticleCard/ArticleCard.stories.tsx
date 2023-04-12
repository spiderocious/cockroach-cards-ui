import type { Meta, StoryObj } from '@storybook/react'
import { ArticleCard } from './ArticleCard'

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive article card component for blog posts and articles with professional styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'horizontal', 'minimal'],
      description: 'Visual style variant of the card'
    },
    imagePosition: {
      control: 'select',
      options: ['top', 'left', 'right'],
      description: 'Position of the image relative to content'
    },
    showImage: {
      control: 'boolean',
      description: 'Whether to show the article image'
    },
    showAuthor: {
      control: 'boolean',
      description: 'Whether to show author information'
    },
    showMeta: {
      control: 'boolean',
      description: 'Whether to show meta information (date, read time)'
    },
    isBookmarked: {
      control: 'boolean',
      description: 'Whether the article is bookmarked'
    },
    isLiked: {
      control: 'boolean',
      description: 'Whether the article is liked'
    },
    likeCount: {
      control: 'number',
      description: 'Number of likes for the article'
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

// Sample data for stories
const sampleAuthor = {
  name: 'Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const sampleImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80'

export const Default: Story = {
  args: {
    title: 'Building Scalable React Applications',
    excerpt: 'Learn how to build maintainable and scalable React applications using modern best practices, state management patterns, and performance optimization techniques.',
    image: sampleImage,
    author: sampleAuthor,
    publishDate: new Date('2024-03-15'),
    readTime: '8 min read',
    category: 'Development',
    tags: ['React', 'JavaScript', 'Performance', 'Best Practices'],
    likeCount: 24,
    onRead: () => alert('Read more clicked'),
    onShare: () => alert('Share clicked'),
    onBookmark: () => alert('Bookmark clicked'),
    onLike: () => alert('Like clicked')
  }
}

export const Horizontal: Story = {
  args: {
    ...Default.args,
    variant: 'horizontal',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns and techniques that will make your code more type-safe and maintainable.',
    category: 'TypeScript'
  }
}

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    title: 'CSS Grid Layout Mastery',
    excerpt: 'Master CSS Grid with practical examples and real-world use cases.',
    category: 'CSS'
  }
}

export const WithoutImage: Story = {
  args: {
    ...Default.args,
    showImage: false,
    title: 'The Art of Clean Code',
    excerpt: 'Writing clean, readable, and maintainable code is an art form. Learn the principles and practices that separate good code from great code.'
  }
}

export const WithoutAuthor: Story = {
  args: {
    ...Default.args,
    showAuthor: false,
    title: 'JavaScript ES2024 Features',
    excerpt: 'Discover the latest JavaScript features that are changing how we write modern web applications.'
  }
}

export const WithoutMeta: Story = {
  args: {
    ...Default.args,
    showMeta: false,
    title: 'Design Systems in Practice',
    excerpt: 'How to build and maintain design systems that scale across multiple teams and products.'
  }
}

export const Bookmarked: Story = {
  args: {
    ...Default.args,
    isBookmarked: true,
    title: 'Web Performance Optimization',
    excerpt: 'Comprehensive guide to optimizing web performance for better user experience and SEO rankings.'
  }
}

export const Liked: Story = {
  args: {
    ...Default.args,
    isLiked: true,
    likeCount: 156,
    title: 'Modern CSS Techniques',
    excerpt: 'Explore modern CSS techniques including container queries, cascade layers, and subgrid.'
  }
}

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: 'The Complete Guide to Modern Web Development: From Planning to Deployment',
    excerpt: 'This comprehensive guide covers everything you need to know about modern web development, from initial planning and architecture decisions to deployment strategies and performance monitoring. We\'ll explore the latest tools, frameworks, and best practices that will help you build robust, scalable web applications.',
    tags: ['Web Development', 'React', 'Node.js', 'DevOps', 'Performance', 'Security', 'Testing', 'Deployment']
  }
}

export const TechArticle: Story = {
  args: {
    title: 'Microservices Architecture Patterns',
    excerpt: 'Understanding different microservices patterns and when to use them in your distributed systems.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80',
    author: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    publishDate: new Date('2024-02-28'),
    readTime: '12 min read',
    category: 'Architecture',
    tags: ['Microservices', 'DevOps', 'Cloud', 'Scalability'],
    likeCount: 89,
    isBookmarked: true,
    onRead: () => alert('Read more clicked'),
    onShare: () => alert('Share clicked'),
    onBookmark: () => alert('Bookmark clicked'),
    onLike: () => alert('Like clicked')
  }
}

export const DesignArticle: Story = {
  args: {
    title: 'User Interface Design Principles',
    excerpt: 'Essential principles every designer should know for creating intuitive and beautiful user interfaces.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    publishDate: new Date('2024-03-10'),
    readTime: '6 min read',
    category: 'Design',
    tags: ['UI Design', 'UX', 'Design Systems'],
    likeCount: 45,
    isLiked: true,
    onRead: () => alert('Read more clicked'),
    onShare: () => alert('Share clicked'),
    onBookmark: () => alert('Bookmark clicked'),
    onLike: () => alert('Like clicked')
  }
}

export const NewsArticle: Story = {
  args: {
    title: 'The Future of Web Development',
    excerpt: 'Industry experts share their predictions for the future of web development and emerging technologies.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    publishDate: new Date('2024-03-20'),
    readTime: '10 min read',
    category: 'Industry',
    tags: ['Future Tech', 'Trends', 'Innovation'],
    likeCount: 128,
    onRead: () => alert('Read more clicked'),
    onShare: () => alert('Share clicked'),
    onBookmark: () => alert('Bookmark clicked'),
    onLike: () => alert('Like clicked')
  }
}

export const CustomIcons: Story = {
  args: {
    ...Default.args,
    title: 'Custom Icon Integration',
    shareIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    bookmarkIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3a2 2 0 00-2 2v16l7-3.5L17 21V5a2 2 0 00-2-2H5z" />
      </svg>
    ),
    heartIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }
}
