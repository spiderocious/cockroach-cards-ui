import { render, screen, fireEvent } from '@testing-library/react'
import { StatCard } from './StatCard'

// Mock data
const mockStat = {
  value: '12,458',
  label: 'Total Sales',
  description: 'Sales this month compared to last month'
}

const mockTrend = {
  value: 12.5,
  direction: 'up' as const,
  label: 'vs last month'
}

const mockIcon = <span data-testid="mock-icon">📊</span>
const mockChart = <div data-testid="mock-chart">Chart Component</div>

describe('StatCard', () => {
  it('renders stat with required props', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
      />
    )
    
    expect(screen.getByText(mockStat.value)).toBeInTheDocument()
    expect(screen.getByText(mockStat.label)).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        description={mockStat.description}
      />
    )
    
    expect(screen.getByText(mockStat.description)).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        icon={mockIcon}
      />
    )
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('renders trend indicator when provided', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        trend={mockTrend}
      />
    )
    
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('vs last month')).toBeInTheDocument()
  })

  it('hides trend when showTrend is false', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        trend={mockTrend}
        showTrend={false}
      />
    )
    
    expect(screen.queryByText('+12.5%')).not.toBeInTheDocument()
  })

  it('renders chart when provided', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        chart={mockChart}
      />
    )
    
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200')
  })

  it('applies glassmorphism variant when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        variant="glassmorphism"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white/20', 'backdrop-blur-xl', 'border-white/30')
  })

  it('applies blur variant when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        variant="blur"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white/80', 'backdrop-blur-md', 'border-white/40')
  })

  it('applies minimal variant when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        variant="minimal"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-transparent', 'border-0', 'shadow-none')
  })

  it('applies detailed variant when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        variant="detailed"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('shadow-lg')
  })

  it('applies medium size by default', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('p-6')
  })

  it('applies small size when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        size="small"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('p-4')
  })

  it('applies large size when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        size="large"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('p-8')
  })

  it('applies default color scheme by default', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border-gray-200')
  })

  it('applies primary color when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        color="primary"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-indigo-50')
  })

  it('applies success color when specified', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        color="success"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('from-emerald-50', 'to-green-50')
  })

  it('handles different trend directions', () => {
    const { rerender } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        trend={{ value: -5.2, direction: 'down', label: 'vs last week' }}
      />
    )
    
    expect(screen.getByText('-5.2%')).toBeInTheDocument()
    
    rerender(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        trend={{ value: 0, direction: 'neutral', label: 'no change' }}
      />
    )
    
    expect(screen.getByText('no change')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = jest.fn()
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        onClick={onClick}
      />
    )
    
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('handles info button click', () => {
    const onInfoClick = jest.fn()
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        onInfoClick={onInfoClick}
      />
    )
    
    const infoButton = screen.getByRole('button', { name: /more information/i })
    fireEvent.click(infoButton)
    
    expect(onInfoClick).toHaveBeenCalledTimes(1)
  })

  it('prevents event bubbling on info button', () => {
    const onCardClick = jest.fn()
    const onInfoClick = jest.fn()
    
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        onClick={onCardClick}
        onInfoClick={onInfoClick}
      />
    )
    
    const infoButton = screen.getByRole('button', { name: /more information/i })
    fireEvent.click(infoButton)
    
    expect(onInfoClick).toHaveBeenCalledTimes(1)
    expect(onCardClick).not.toHaveBeenCalled()
  })

  it('applies animated class when animated is true', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        animated={true}
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    const customClass = 'custom-stat-card'
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        className={customClass}
      />
    )
    
    expect(container.firstChild).toHaveClass(customClass)
  })

  it('applies custom value className', () => {
    const customClass = 'custom-value'
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        valueClassName={customClass}
      />
    )
    
    const valueElement = screen.getByText(mockStat.value)
    expect(valueElement).toHaveClass(customClass)
  })

  it('applies custom label className', () => {
    const customClass = 'custom-label'
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        labelClassName={customClass}
      />
    )
    
    const labelElement = screen.getByText(mockStat.label)
    expect(labelElement).toHaveClass(customClass)
  })

  it('forwards additional props to card element', () => {
    const testId = 'stat-card-test'
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        data-testid={testId}
      />
    )
    
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('renders React node as value', () => {
    const customValue = <span data-testid="custom-value">Custom Value</span>
    render(
      <StatCard
        value={customValue}
        label={mockStat.label}
      />
    )
    
    expect(screen.getByTestId('custom-value')).toBeInTheDocument()
  })

  it('renders React node as label', () => {
    const customLabel = <span data-testid="custom-label">Custom Label</span>
    render(
      <StatCard
        value={mockStat.value}
        label={customLabel}
      />
    )
    
    expect(screen.getByTestId('custom-label')).toBeInTheDocument()
  })

  it('renders with all features in detailed variant', () => {
    render(
      <StatCard
        value="$45,678"
        label="Monthly Revenue"
        description="Total revenue generated this month"
        icon={mockIcon}
        chart={mockChart}
        trend={{ value: 18.2, direction: 'up', label: 'vs last month' }}
        variant="detailed"
        color="success"
        size="large"
        animated={true}
        onClick={jest.fn()}
        onInfoClick={jest.fn()}
      />
    )
    
    expect(screen.getByText('$45,678')).toBeInTheDocument()
    expect(screen.getByText('Monthly Revenue')).toBeInTheDocument()
    expect(screen.getByText('Total revenue generated this month')).toBeInTheDocument()
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument()
    expect(screen.getByText('+18.2%')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /more information/i })).toBeInTheDocument()
  })

  it('renders glassmorphism variant with special effects', () => {
    const { container } = render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        variant="glassmorphism"
        gradient={true}
      />
    )
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-white/20', 'backdrop-blur-xl')
    
    // Check for sparkle effect
    const sparkle = container.querySelector('.animate-ping')
    expect(sparkle).toBeInTheDocument()
  })

  it('renders trend without percentage sign for neutral direction', () => {
    render(
      <StatCard
        value={mockStat.value}
        label={mockStat.label}
        trend={{ value: 0, direction: 'neutral', label: 'stable' }}
      />
    )
    
    expect(screen.getByText('stable')).toBeInTheDocument()
    expect(screen.queryByText('0%')).not.toBeInTheDocument()
  })
})
