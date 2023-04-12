import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ArticleCard } from './ArticleCard'

// Mock data for testing
const mockArticle = {
  title: 'Test Article Title',
  excerpt: 'This is a test excerpt for the article.',
  author: {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg'
  },
  publishDate: new Date('2023-01-15'),
  readTime: '5 min read',
  category: 'Technology',
  tags: ['React', 'JavaScript', 'Testing'],
  image: 'https://example.com/article-image.jpg'
}

describe('ArticleCard', () => {
  it('renders article with required props', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        excerpt={mockArticle.excerpt}
      />
    )
    
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for the article.')).toBeInTheDocument()
  })

  it('renders article image when provided', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        image={mockArticle.image}
      />
    )
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockArticle.image)
  })

  it('renders category badge when provided', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        image={mockArticle.image}
        category={mockArticle.category}
      />
    )
    
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  it('renders author information when provided', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        author={mockArticle.author}
      />
    )
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    const authorAvatar = screen.getByRole('img')
    expect(authorAvatar).toHaveAttribute('src', mockArticle.author.avatar)
  })

  it('hides author when showAuthor is false', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        author={mockArticle.author}
        showAuthor={false}
      />
    )
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('renders meta information when provided', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        publishDate={mockArticle.publishDate}
        readTime={mockArticle.readTime}
      />
    )
    
    expect(screen.getByText('Jan 15, 2023')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('hides meta when showMeta is false', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        publishDate={mockArticle.publishDate}
        readTime={mockArticle.readTime}
        showMeta={false}
      />
    )
    
    expect(screen.queryByText('Jan 15, 2023')).not.toBeInTheDocument()
    expect(screen.queryByText('5 min read')).not.toBeInTheDocument()
  })

  it('renders tags when provided', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        tags={mockArticle.tags}
      />
    )
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('limits tags display and shows count when more than 3', () => {
    const manyTags = ['React', 'JavaScript', 'Testing', 'TypeScript', 'Jest']
    render(
      <ArticleCard
        title={mockArticle.title}
        tags={manyTags}
      />
    )
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(
      <ArticleCard title={mockArticle.title} />
    )
    
    const article = container.firstChild as HTMLElement
    expect(article).toHaveClass('bg-white', 'border', 'border-slate-200', 'shadow-lg')
  })

  it('applies horizontal variant when specified', () => {
    const { container } = render(
      <ArticleCard title={mockArticle.title} variant="horizontal" />
    )
    
    const article = container.firstChild as HTMLElement
    expect(article).toHaveClass('flex', 'flex-row')
  })

  it('applies minimal variant when specified', () => {
    const { container } = render(
      <ArticleCard title={mockArticle.title} variant="minimal" />
    )
    
    const article = container.firstChild as HTMLElement
    expect(article).toHaveClass('shadow-sm')
  })

  it('handles read action', () => {
    const handleRead = jest.fn()
    render(
      <ArticleCard
        title={mockArticle.title}
        onRead={handleRead}
      />
    )
    
    fireEvent.click(screen.getByText('Read More'))
    expect(handleRead).toHaveBeenCalledTimes(1)
  })

  it('handles bookmark action', () => {
    const handleBookmark = jest.fn()
    render(
      <ArticleCard
        title={mockArticle.title}
        onBookmark={handleBookmark}
      />
    )
    
    const bookmarkButton = screen.getByLabelText('Bookmark article')
    fireEvent.click(bookmarkButton)
    expect(handleBookmark).toHaveBeenCalledTimes(1)
  })

  it('handles share action', () => {
    const handleShare = jest.fn()
    render(
      <ArticleCard
        title={mockArticle.title}
        onShare={handleShare}
      />
    )
    
    const shareButton = screen.getByLabelText('Share article')
    fireEvent.click(shareButton)
    expect(handleShare).toHaveBeenCalledTimes(1)
  })

  it('handles like action', () => {
    const handleLike = jest.fn()
    render(
      <ArticleCard
        title={mockArticle.title}
        onLike={handleLike}
        likeCount={5}
      />
    )
    
    const likeButton = screen.getByText('5').closest('button')
    fireEvent.click(likeButton!)
    expect(handleLike).toHaveBeenCalledTimes(1)
  })

  it('shows liked state when isLiked is true', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        onLike={jest.fn()}
        isLiked={true}
      />
    )
    
    const likeButton = screen.getByRole('button')
    expect(likeButton).toHaveClass('bg-emerald-50', 'text-emerald-600')
  })

  it('shows bookmarked state when isBookmarked is true', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        onBookmark={jest.fn()}
        isBookmarked={true}
      />
    )
    
    const bookmarkButton = screen.getByLabelText('Bookmark article')
    expect(bookmarkButton).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('handles click events on the card', () => {
    const handleClick = jest.fn()
    render(
      <ArticleCard
        title={mockArticle.title}
        onClick={handleClick}
      />
    )
    
    fireEvent.click(screen.getByRole('article'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('prevents event bubbling on action buttons', () => {
    const handleClick = jest.fn()
    const handleRead = jest.fn()
    
    render(
      <ArticleCard
        title={mockArticle.title}
        onClick={handleClick}
        onRead={handleRead}
      />
    )
    
    fireEvent.click(screen.getByText('Read More'))
    expect(handleRead).toHaveBeenCalledTimes(1)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ArticleCard
        title={mockArticle.title}
        className="custom-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies custom title className', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        titleClassName="custom-title"
      />
    )
    
    expect(screen.getByText('Test Article Title')).toHaveClass('custom-title')
  })

  it('forwards additional props to article element', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        data-testid="custom-article"
        id="article-1"
      />
    )
    
    const article = screen.getByTestId('custom-article')
    expect(article).toHaveAttribute('id', 'article-1')
  })

  it('renders React node as title', () => {
    const titleNode = <span data-testid="custom-title">Custom Title</span>
    render(
      <ArticleCard title={titleNode} />
    )
    
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })

  it('renders React node as image', () => {
    const imageNode = <div data-testid="custom-image">Custom Image</div>
    render(
      <ArticleCard
        title={mockArticle.title}
        image={imageNode}
      />
    )
    
    expect(screen.getByTestId('custom-image')).toBeInTheDocument()
  })

  it('hides image when showImage is false', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        image={mockArticle.image}
        showImage={false}
      />
    )
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders with all features in horizontal variant', () => {
    render(
      <ArticleCard
        title={mockArticle.title}
        excerpt={mockArticle.excerpt}
        image={mockArticle.image}
        author={mockArticle.author}
        publishDate={mockArticle.publishDate}
        readTime={mockArticle.readTime}
        category={mockArticle.category}
        tags={mockArticle.tags}
        variant="horizontal"
        isLiked={true}
        isBookmarked={true}
        likeCount={10}
        onRead={jest.fn()}
        onShare={jest.fn()}
        onBookmark={jest.fn()}
        onLike={jest.fn()}
      />
    )
    
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for the article.')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jan 15, 2023')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Read More')).toBeInTheDocument()
  })
})
