import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'

// Mock data
const mockProduct = {
  image: 'https://example.com/product.jpg',
  title: 'Test Product',
  price: '$29.99'
}

describe('ProductCard', () => {
  it('renders product with required props', () => {
    render(<ProductCard {...mockProduct} />)
    
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image)
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument()
  })

  it('renders product description when provided', () => {
    const description = 'A fantastic product for everyone'
    render(
      <ProductCard
        {...mockProduct}
        description={description}
      />
    )
    
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('renders original price with strikethrough when provided', () => {
    const originalPrice = '$39.99'
    render(
      <ProductCard
        {...mockProduct}
        originalPrice={originalPrice}
      />
    )
    
    const originalPriceElement = screen.getByText(originalPrice)
    expect(originalPriceElement).toBeInTheDocument()
    expect(originalPriceElement).toHaveClass('line-through')
  })

  it('renders badge when provided', () => {
    const badge = 'Sale'
    render(
      <ProductCard
        {...mockProduct}
        badge={badge}
      />
    )
    
    expect(screen.getByText(badge)).toBeInTheDocument()
  })

  it('renders rating with stars', () => {
    render(
      <ProductCard
        {...mockProduct}
        rating={4.5}
        reviewCount={120}
      />
    )
    
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('(120)')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(<ProductCard {...mockProduct} />)
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'shadow-sm')
  })

  it('applies compact variant when specified', () => {
    const { container } = render(
      <ProductCard {...mockProduct} variant="compact" />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-100', 'shadow-sm')
  })

  it('applies detailed variant when specified', () => {
    const { container } = render(
      <ProductCard {...mockProduct} variant="detailed" />
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'shadow-md')
  })

  it('applies square aspect ratio by default', () => {
    const { container } = render(<ProductCard {...mockProduct} />)
    const imageContainer = container.querySelector('div[class*="aspect-"]')
    
    expect(imageContainer).toHaveClass('aspect-square')
  })

  it('applies different aspect ratios', () => {
    const { container } = render(
      <ProductCard {...mockProduct} imageAspectRatio="16:9" />
    )
    const imageContainer = container.querySelector('div[class*="aspect-"]')
    
    expect(imageContainer).toHaveClass('aspect-[16/9]')
  })

  it('handles add to cart action', () => {
    const onAddToCart = jest.fn()
    render(
      <ProductCard
        {...mockProduct}
        onAddToCart={onAddToCart}
      />
    )
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addToCartButton)
    
    expect(onAddToCart).toHaveBeenCalledTimes(1)
  })

  it('handles wishlist action', () => {
    const onWishlist = jest.fn()
    render(
      <ProductCard
        {...mockProduct}
        onWishlist={onWishlist}
      />
    )
    
    const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i })
    fireEvent.click(wishlistButton)
    
    expect(onWishlist).toHaveBeenCalledTimes(1)
  })

  it('handles quick view action', () => {
    const onQuickView = jest.fn()
    render(
      <ProductCard
        {...mockProduct}
        onQuickView={onQuickView}
      />
    )
    
    const quickViewButton = screen.getByRole('button', { name: /quick view/i })
    fireEvent.click(quickViewButton)
    
    expect(onQuickView).toHaveBeenCalledTimes(1)
  })

  it('hides quick actions when showQuickActions is false', () => {
    render(
      <ProductCard
        {...mockProduct}
        onWishlist={jest.fn()}
        onQuickView={jest.fn()}
        showQuickActions={false}
      />
    )
    
    expect(screen.queryByRole('button', { name: /add to wishlist/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /quick view/i })).not.toBeInTheDocument()
  })

  it('customizes add to cart button text', () => {
    const customText = 'Buy Now'
    render(
      <ProductCard
        {...mockProduct}
        onAddToCart={jest.fn()}
        addToCartText={customText}
      />
    )
    
    expect(screen.getByRole('button', { name: new RegExp(customText, 'i') })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-product-card'
    const { container } = render(
      <ProductCard {...mockProduct} className={customClass} />
    )
    
    expect(container.firstChild).toHaveClass(customClass)
  })

  it('applies custom image className', () => {
    const customClass = 'custom-image'
    const { container } = render(
      <ProductCard {...mockProduct} imageClassName={customClass} />
    )
    const imageContainer = container.querySelector('div[class*="aspect-"]')
    
    expect(imageContainer).toHaveClass(customClass)
  })

  it('applies custom title className', () => {
    const customClass = 'custom-title'
    render(
      <ProductCard {...mockProduct} titleClassName={customClass} />
    )
    
    const titleElement = screen.getByText(mockProduct.title)
    expect(titleElement).toHaveClass(customClass)
  })

  it('applies custom price className', () => {
    const customClass = 'custom-price'
    render(
      <ProductCard {...mockProduct} priceClassName={customClass} />
    )
    
    const priceElement = screen.getByText(mockProduct.price)
    expect(priceElement).toHaveClass(customClass)
  })

  it('handles click events on the card', () => {
    const onClick = jest.fn()
    const { container } = render(
      <ProductCard {...mockProduct} onClick={onClick} />
    )
    
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('prevents event bubbling on action buttons', () => {
    const onCardClick = jest.fn()
    const onAddToCart = jest.fn()
    
    render(
      <ProductCard
        {...mockProduct}
        onClick={onCardClick}
        onAddToCart={onAddToCart}
      />
    )
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addToCartButton)
    
    expect(onAddToCart).toHaveBeenCalledTimes(1)
    expect(onCardClick).not.toHaveBeenCalled()
  })

  it('forwards additional props to card element', () => {
    const testId = 'product-card-test'
    render(
      <ProductCard {...mockProduct} data-testid={testId} />
    )
    
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('renders React node as image', () => {
    const customImage = <div data-testid="custom-image">Custom Image</div>
    render(
      <ProductCard
        {...mockProduct}
        image={customImage}
      />
    )
    
    expect(screen.getByTestId('custom-image')).toBeInTheDocument()
  })

  it('renders React node as title', () => {
    const customTitle = <span data-testid="custom-title">Custom Title</span>
    render(
      <ProductCard
        {...mockProduct}
        title={customTitle}
      />
    )
    
    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })

  it('renders with all features in detailed variant', () => {
    render(
      <ProductCard
        image="https://example.com/product.jpg"
        title="Premium Product"
        description="The best product you'll ever use"
        price="$99.99"
        originalPrice="$129.99"
        rating={4.8}
        reviewCount={256}
        badge="Best Seller"
        variant="detailed"
        onAddToCart={jest.fn()}
        onWishlist={jest.fn()}
        onQuickView={jest.fn()}
      />
    )
    
    expect(screen.getByText('Premium Product')).toBeInTheDocument()
    expect(screen.getByText('The best product you\'ll ever use')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$129.99')).toBeInTheDocument()
    expect(screen.getByText('4.8')).toBeInTheDocument()
    expect(screen.getByText('(256)')).toBeInTheDocument()
    expect(screen.getByText('Best Seller')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
