import { render, screen, fireEvent } from '@testing-library/react'
import { ProfileCard } from './ProfileCard'

// Mock data
const mockProfile = {
  avatar: 'https://example.com/avatar.jpg',
  name: 'John Doe',
  title: 'Software Engineer',
  bio: 'Passionate developer who loves building amazing products.',
  location: 'San Francisco, CA'
}

const mockStats = [
  { label: 'Followers', value: 1250, icon: <span data-testid="followers-icon">👥</span> },
  { label: 'Following', value: 180, icon: <span data-testid="following-icon">👤</span> },
  { label: 'Posts', value: 45, icon: <span data-testid="posts-icon">📝</span> }
]

const mockSocialLinks = [
  { platform: 'twitter', url: 'https://twitter.com/johndoe', icon: <span data-testid="twitter-icon">🐦</span> },
  { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe', icon: <span data-testid="linkedin-icon">💼</span> }
]

describe('ProfileCard', () => {
  it('renders profile with required props', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
      />
    )
    
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProfile.avatar)
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument()
  })

  it('renders profile title when provided', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        title={mockProfile.title}
      />
    )
    
    expect(screen.getByText(mockProfile.title)).toBeInTheDocument()
  })

  it('renders bio when provided', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        bio={mockProfile.bio}
      />
    )
    
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument()
  })

  it('renders location when provided', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        location={mockProfile.location}
      />
    )
    
    expect(screen.getByText(mockProfile.location)).toBeInTheDocument()
  })

  it('renders stats when provided', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        stats={mockStats}
      />
    )
    
    expect(screen.getByText('1250')).toBeInTheDocument()
    expect(screen.getByText('Followers')).toBeInTheDocument()
    expect(screen.getByText('180')).toBeInTheDocument()
    expect(screen.getByText('Following')).toBeInTheDocument()
    expect(screen.getByTestId('followers-icon')).toBeInTheDocument()
  })

  it('hides stats when showStats is false', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        stats={mockStats}
        showStats={false}
      />
    )
    
    expect(screen.queryByText('Followers')).not.toBeInTheDocument()
  })

  it('renders social links when provided', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        socialLinks={mockSocialLinks}
      />
    )
    
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit twitter/i })).toHaveAttribute('href', 'https://twitter.com/johndoe')
  })

  it('hides social links when showSocial is false', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        socialLinks={mockSocialLinks}
        showSocial={false}
      />
    )
    
    expect(screen.queryByTestId('twitter-icon')).not.toBeInTheDocument()
  })

  it('displays verified icon when verified is true', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        verified={true}
      />
    )
    
    const nameElement = screen.getByText(mockProfile.name)
    const verifiedIcon = nameElement.parentElement?.querySelector('svg')
    expect(verifiedIcon).toBeInTheDocument()
  })

  it('displays online indicator when isOnline is true', () => {
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        isOnline={true}
      />
    )
    
    const onlineIndicator = container.querySelector('.bg-green-500')
    expect(onlineIndicator).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'shadow-sm', 'p-5')
  })

  it('applies compact variant when specified', () => {
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        variant="compact"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('p-4')
  })

  it('applies detailed variant when specified', () => {
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        variant="detailed"
      />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('p-6', 'shadow-md')
  })

  it('applies medium avatar size by default', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
      />
    )
    
    const avatarImg = screen.getByRole('img')
    expect(avatarImg).toHaveClass('w-16', 'h-16')
  })

  it('applies different avatar sizes', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        avatarSize="large"
      />
    )
    
    const avatarImg = screen.getByRole('img')
    expect(avatarImg).toHaveClass('w-20', 'h-20')
  })

  it('handles follow action', () => {
    const onFollow = jest.fn()
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onFollow={onFollow}
      />
    )
    
    const followButton = screen.getByRole('button', { name: /follow/i })
    fireEvent.click(followButton)
    
    expect(onFollow).toHaveBeenCalledTimes(1)
  })

  it('handles message action', () => {
    const onMessage = jest.fn()
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onMessage={onMessage}
      />
    )
    
    const messageButton = screen.getByRole('button', { name: /message/i })
    fireEvent.click(messageButton)
    
    expect(onMessage).toHaveBeenCalledTimes(1)
  })

  it('handles connect action', () => {
    const onConnect = jest.fn()
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onConnect={onConnect}
      />
    )
    
    const connectButton = screen.getByRole('button', { name: /connect/i })
    fireEvent.click(connectButton)
    
    expect(onConnect).toHaveBeenCalledTimes(1)
  })

  it('shows "Following" when isFollowing is true', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onFollow={jest.fn()}
        isFollowing={true}
      />
    )
    
    expect(screen.getByRole('button', { name: /following/i })).toBeInTheDocument()
  })

  it('customizes button text', () => {
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onFollow={jest.fn()}
        onMessage={jest.fn()}
        followText="Subscribe"
        messageText="Send Message"
      />
    )
    
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-profile-card'
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        className={customClass}
      />
    )
    
    expect(container.firstChild).toHaveClass(customClass)
  })

  it('applies custom avatar className', () => {
    const customClass = 'custom-avatar'
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        avatarClassName={customClass}
      />
    )
    
    const avatarImg = screen.getByRole('img')
    expect(avatarImg).toHaveClass(customClass)
  })

  it('applies custom name className', () => {
    const customClass = 'custom-name'
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        nameClassName={customClass}
      />
    )
    
    const nameElement = screen.getByText(mockProfile.name)
    expect(nameElement).toHaveClass(customClass)
  })

  it('handles click events on the card', () => {
    const onClick = jest.fn()
    const { container } = render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onClick={onClick}
      />
    )
    
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('prevents event bubbling on action buttons', () => {
    const onCardClick = jest.fn()
    const onFollow = jest.fn()
    
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onClick={onCardClick}
        onFollow={onFollow}
      />
    )
    
    const followButton = screen.getByRole('button', { name: /follow/i })
    fireEvent.click(followButton)
    
    expect(onFollow).toHaveBeenCalledTimes(1)
    expect(onCardClick).not.toHaveBeenCalled()
  })

  it('prevents event bubbling on social links', () => {
    const onCardClick = jest.fn()
    
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        onClick={onCardClick}
        socialLinks={mockSocialLinks}
      />
    )
    
    const twitterLink = screen.getByRole('link', { name: /visit twitter/i })
    fireEvent.click(twitterLink)
    
    expect(onCardClick).not.toHaveBeenCalled()
  })

  it('forwards additional props to card element', () => {
    const testId = 'profile-card-test'
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={mockProfile.name}
        data-testid={testId}
      />
    )
    
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('renders React node as avatar', () => {
    const customAvatar = <div data-testid="custom-avatar">Custom Avatar</div>
    render(
      <ProfileCard
        avatar={customAvatar}
        name={mockProfile.name}
      />
    )
    
    expect(screen.getByTestId('custom-avatar')).toBeInTheDocument()
  })

  it('renders React node as name', () => {
    const customName = <span data-testid="custom-name">Custom Name</span>
    render(
      <ProfileCard
        avatar={mockProfile.avatar}
        name={customName}
      />
    )
    
    expect(screen.getByTestId('custom-name')).toBeInTheDocument()
  })

  it('renders with all features in detailed variant', () => {
    render(
      <ProfileCard
        avatar="https://example.com/avatar.jpg"
        name="Jane Smith"
        title="UX Designer"
        bio="Creative designer passionate about user experience"
        location="New York, NY"
        stats={mockStats}
        socialLinks={mockSocialLinks}
        verified={true}
        isOnline={true}
        variant="detailed"
        onFollow={jest.fn()}
        onMessage={jest.fn()}
        onConnect={jest.fn()}
      />
    )
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('UX Designer')).toBeInTheDocument()
    expect(screen.getByText('Creative designer passionate about user experience')).toBeInTheDocument()
    expect(screen.getByText('New York, NY')).toBeInTheDocument()
    expect(screen.getByText('1250')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /follow/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /message/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument()
  })
})
