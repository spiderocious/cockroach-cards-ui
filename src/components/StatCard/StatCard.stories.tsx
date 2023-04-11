import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'StatCard displays key metrics and statistics with stunning visual effects including glassmorphism and blur variants. Perfect for dashboards, analytics, and data visualization.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'detailed', 'glassmorphism', 'blur'],
      description: 'Visual style variant including modern glassmorphism effects'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'info', 'teal', 'cyan', 'slate'],
      description: 'Color scheme with beautiful gradients'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the card'
    },
    animated: {
      control: 'boolean',
      description: 'Enable pulse animation'
    },
    gradient: {
      control: 'boolean',
      description: 'Show gradient overlay (for glassmorphism/blur variants)'
    },
    showTrend: {
      control: 'boolean',
      description: 'Show trend indicator'
    }
  },
  decorators: [
    (Story, context) => {
      // Add beautiful background for glassmorphism demos
      if (context.args.variant === 'glassmorphism' || context.args.variant === 'blur') {
        return (
          <div className="relative min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 p-8 flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-300/30 rounded-full blur-lg animate-bounce" />
              <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300/40 rounded-full blur-md animate-ping" />
            </div>
            <Story />
          </div>
        )
      }
      return <Story />
    }
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// Beautiful chart component for demos
const MiniChart = () => (
  <svg width="60" height="30" viewBox="0 0 60 30" className="text-current">
    <path
      d="M5,25 Q15,5 25,15 T45,10 T55,8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="opacity-70"
    />
    <circle cx="55" cy="8" r="2" fill="currentColor" className="opacity-90" />
  </svg>
)

// Beautiful icons
const RevenueIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const OrdersIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const GrowthIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

// Default story
export const Default: Story = {
  args: {
    value: '$45,678',
    label: 'Monthly Revenue',
    description: 'Total revenue generated this month',
    icon: <RevenueIcon />,
    trend: { value: 12.5, direction: 'up', label: 'vs last month' },
    chart: <MiniChart />,
    color: 'primary'
  }
}

// Glassmorphism showcase - the star of the show!
export const GlassmorphismShowcase: Story = {
  args: {
    value: '24,847',
    label: 'Active Users',
    description: 'Real-time user engagement metrics',
    icon: <UsersIcon />,
    trend: { value: 8.2, direction: 'up', label: 'this week' },
    variant: 'glassmorphism',
    gradient: true,
    size: 'large',
    chart: <MiniChart />
  }
}

// Blur variant
export const BlurVariant: Story = {
  args: {
    value: '1,234',
    label: 'New Orders',
    description: 'Orders placed in the last 24 hours',
    icon: <OrdersIcon />,
    trend: { value: 15.8, direction: 'up', label: 'vs yesterday' },
    variant: 'blur',
    gradient: true,
    color: 'success',
    chart: <MiniChart />
  }
}

// Color spectrum showcase
export const ColorSpectrum: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
      <StatCard
        value="$12.5K"
        label="Revenue"
        color="primary"
        icon={<RevenueIcon />}
        trend={{ value: 12.5, direction: 'up' }}
        size="medium"
      />
      <StatCard
        value="2,847"
        label="Users"
        color="success"
        icon={<UsersIcon />}
        trend={{ value: 8.2, direction: 'up' }}
        size="medium"
      />
      <StatCard
        value="156"
        label="Orders"
        color="warning"
        icon={<OrdersIcon />}
        trend={{ value: -2.1, direction: 'down' }}
        size="medium"
      />
      <StatCard
        value="+23%"
        label="Growth"
        color="teal"
        icon={<GrowthIcon />}
        trend={{ value: 23.4, direction: 'up' }}
        size="medium"
      />
      <StatCard
        value="4.8"
        label="Rating"
        color="info"
        icon={<RevenueIcon />}
        trend={{ value: 0.3, direction: 'up' }}
        size="medium"
      />
      <StatCard
        value="99.9%"
        label="Uptime"
        color="cyan"
        icon={<UsersIcon />}
        trend={{ value: 0, direction: 'neutral', label: 'stable' }}
        size="medium"
      />
      <StatCard
        value="1.2M"
        label="Views"
        color="slate"
        icon={<OrdersIcon />}
        trend={{ value: 45.2, direction: 'up' }}
        size="medium"
      />
      <StatCard
        value="567"
        label="Conversions"
        color="default"
        icon={<GrowthIcon />}
        trend={{ value: -5.1, direction: 'down' }}
        size="medium"
      />
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}

// Glassmorphism grid - absolutely stunning!
export const GlassmorphismGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <StatCard
        value="$89,247"
        label="Total Revenue"
        description="Accumulated revenue this quarter"
        icon={<RevenueIcon />}
        trend={{ value: 18.7, direction: 'up', label: 'vs Q3' }}
        variant="glassmorphism"
        gradient={true}
        color="primary"
        chart={<MiniChart />}
      />
      <StatCard
        value="12,847"
        label="Active Users"
        description="Currently online users"
        icon={<UsersIcon />}
        trend={{ value: 24.1, direction: 'up', label: 'vs last week' }}
        variant="glassmorphism"
        gradient={true}
        color="success"
        chart={<MiniChart />}
      />
      <StatCard
        value="3,456"
        label="Pending Orders"
        description="Orders awaiting fulfillment"
        icon={<OrdersIcon />}
        trend={{ value: -8.3, direction: 'down', label: 'vs yesterday' }}
        variant="glassmorphism"
        gradient={true}
        color="warning"
        chart={<MiniChart />}
      />
      <StatCard
        value="+156%"
        label="Growth Rate"
        description="Year-over-year growth"
        icon={<GrowthIcon />}
        trend={{ value: 156.4, direction: 'up', label: 'YoY' }}
        variant="glassmorphism"
        gradient={true}
        color="teal"
        chart={<MiniChart />}
      />
      <StatCard
        value="4.9★"
        label="Customer Rating"
        description="Average customer satisfaction"
        icon={<RevenueIcon />}
        trend={{ value: 0.2, direction: 'up', label: 'this month' }}
        variant="glassmorphism"
        gradient={true}
        color="info"
        chart={<MiniChart />}
      />
      <StatCard
        value="99.99%"
        label="System Uptime"
        description="Service availability"
        icon={<UsersIcon />}
        trend={{ value: 0, direction: 'neutral', label: 'excellent' }}
        variant="glassmorphism"
        gradient={true}
        color="cyan"
        chart={<MiniChart />}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="relative min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 p-8">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-yellow-300/40 rounded-full blur-xl animate-bounce" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-300/50 rounded-full blur-lg animate-ping" />
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-green-300/30 rounded-full blur-lg animate-pulse" />
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small</h3>
        <StatCard
          value="1.2K"
          label="Small Card"
          icon={<RevenueIcon />}
          trend={{ value: 5.2, direction: 'up' }}
          size="small"
          color="primary"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Medium</h3>
        <StatCard
          value="12.5K"
          label="Medium Card"
          description="Default size card"
          icon={<UsersIcon />}
          trend={{ value: 12.5, direction: 'up' }}
          size="medium"
          color="success"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Large</h3>
        <StatCard
          value="125.8K"
          label="Large Card"
          description="Spacious layout with enhanced visuals"
          icon={<OrdersIcon />}
          trend={{ value: 25.8, direction: 'up', label: 'this month' }}
          size="large"
          color="teal"
          chart={<MiniChart />}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}

// Variant showcase
export const VariantShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <StatCard
          value="$24,680"
          label="Revenue"
          description="Clean and professional design"
          icon={<RevenueIcon />}
          trend={{ value: 12.5, direction: 'up' }}
          variant="default"
          color="primary"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Minimal</h3>
        <StatCard
          value="1,847"
          label="Users"
          description="Clean without borders"
          icon={<UsersIcon />}
          trend={{ value: 8.2, direction: 'up' }}
          variant="minimal"
          color="success"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Detailed</h3>
        <StatCard
          value="456"
          label="Orders"
          description="Enhanced with patterns and shadows"
          icon={<OrdersIcon />}
          trend={{ value: 15.8, direction: 'up' }}
          variant="detailed"
          color="warning"
          chart={<MiniChart />}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}

// Animated showcase
export const AnimatedShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <StatCard
        value="∞"
        label="Pulse Animation"
        description="Gentle pulsing effect"
        icon={<GrowthIcon />}
        trend={{ value: 100, direction: 'up', label: 'infinity' }}
        animated={true}
        color="teal"
        variant="detailed"
      />
      <StatCard
        value="✨"
        label="Glassmorphism Magic"
        description="With sparkle effects"
        icon={<RevenueIcon />}
        trend={{ value: 999, direction: 'up', label: 'magical' }}
        variant="glassmorphism"
        gradient={true}
        color="cyan"
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
    value: '🎯',
    label: 'Interactive Demo',
    description: 'Click me to see interactions! Check the Actions tab.',
    icon: <GrowthIcon />,
    trend: { value: 42, direction: 'up', label: 'engagement' },
    variant: 'detailed',
    color: 'primary',
    animated: true,
    onClick: () => console.log('🎉 StatCard clicked!'),
    onInfoClick: () => console.log('ℹ️ Info button clicked!'),
    chart: <MiniChart />
  }
}

// Dashboard layout example
export const DashboardLayout: Story = {
  render: () => (
    <div className="max-w-7xl space-y-8">
      {/* Top row - Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          value="$847.2K"
          label="Total Revenue"
          icon={<RevenueIcon />}
          trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
          color="primary"
          variant="detailed"
        />
        <StatCard
          value="24,847"
          label="Active Users"
          icon={<UsersIcon />}
          trend={{ value: 8.2, direction: 'up', label: 'vs last week' }}
          color="success"
          variant="detailed"
        />
        <StatCard
          value="3,456"
          label="Orders"
          icon={<OrdersIcon />}
          trend={{ value: -2.1, direction: 'down', label: 'vs yesterday' }}
          color="warning"
          variant="detailed"
        />
        <StatCard
          value="+23.4%"
          label="Growth"
          icon={<GrowthIcon />}
          trend={{ value: 23.4, direction: 'up', label: 'this quarter' }}
          color="teal"
          variant="detailed"
        />
      </div>
      
      {/* Featured metrics with glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatCard
          value="99.9%"
          label="System Uptime"
          description="Exceptional service reliability this month"
          icon={<RevenueIcon />}
          trend={{ value: 0.1, direction: 'up', label: 'vs target' }}
          variant="glassmorphism"
          gradient={true}
          color="cyan"
          size="large"
          chart={<MiniChart />}
        />
        <StatCard
          value="4.9★"
          label="Customer Satisfaction"
          description="Average rating from customer feedback"
          icon={<UsersIcon />}
          trend={{ value: 0.3, direction: 'up', label: 'this month' }}
          variant="glassmorphism"
          gradient={true}
          color="info"
          size="large"
          chart={<MiniChart />}
        />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Beautiful metrics with glassmorphism effects</p>
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
}
