import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProductCard is an e-commerce product display component with image, price, and action buttons. Perfect for product listings, catalogs, and shopping interfaces.'
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
    imageAspectRatio: {
      control: 'select',
      options: ['square', '4:3', '3:2', '16:9'],
      description: 'Aspect ratio of the product image'
    },
    showQuickActions: {
      control: 'boolean',
      description: 'Show hover actions for wishlist and quick view'
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Product rating (0-5)'
    },
    reviewCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of reviews'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium quality headphones with noise cancellation and 30-hour battery life.',
    price: '$129.99',
    onAddToCart: () => console.log('Added to cart'),
  }
}

// With all features
export const WithAllFeatures: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    title: 'Nike Air Max 270',
    description: 'Comfortable running shoes with responsive cushioning and breathable mesh upper.',
    price: '$89.99',
    originalPrice: '$119.99',
    rating: 4.8,
    reviewCount: 256,
    badge: 'Best Seller',
    onAddToCart: () => console.log('Added to cart'),
    onWishlist: () => console.log('Added to wishlist'),
    onQuickView: () => console.log('Quick view opened'),
  }
}

// Compact variant
export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    title: 'Compact Product',
    description: 'A more condensed version of the product card.'
  }
}

// Detailed variant
export const Detailed: Story = {
  args: {
    ...WithAllFeatures.args,
    variant: 'detailed',
    title: 'Premium Product Details',
    description: 'This is the detailed variant with larger spacing and prominent features.'
  }
}

// Different aspect ratios
export const AspectRatio4x3: Story = {
  args: {
    ...Default.args,
    imageAspectRatio: '4:3',
    title: '4:3 Aspect Ratio Product',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'
  }
}

export const AspectRatio16x9: Story = {
  args: {
    ...Default.args,
    imageAspectRatio: '16:9',
    title: '16:9 Aspect Ratio Product',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80'
  }
}

// Without quick actions
export const NoQuickActions: Story = {
  args: {
    ...WithAllFeatures.args,
    showQuickActions: false,
    title: 'No Quick Actions'
  }
}

// Sale product with badge
export const SaleProduct: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80',
    title: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches.',
    price: '$79.99',
    originalPrice: '$99.99',
    badge: '20% OFF',
    rating: 4.6,
    reviewCount: 89,
    onAddToCart: () => console.log('Added to cart'),
    onWishlist: () => console.log('Added to wishlist'),
    onQuickView: () => console.log('Quick view opened'),
  }
}

// Product with high rating
export const HighRating: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
    title: 'Premium Coffee Maker',
    description: 'Professional-grade coffee machine with built-in grinder.',
    price: '$299.99',
    rating: 4.9,
    reviewCount: 1024,
    onAddToCart: () => console.log('Added to cart'),
    onWishlist: () => console.log('Added to wishlist'),
    onQuickView: () => console.log('Quick view opened'),
  }
}

// Custom button text
export const CustomButtonText: Story = {
  args: {
    ...Default.args,
    addToCartText: 'Buy Now',
    title: 'Custom Button Text'
  }
}

// Product grid layout
export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <ProductCard
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
        title="Wireless Headphones"
        price="$129.99"
        rating={4.5}
        reviewCount={124}
        onAddToCart={() => console.log('Added to cart')}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
        title="Running Shoes"
        price="$89.99"
        originalPrice="$119.99"
        badge="Sale"
        rating={4.8}
        reviewCount={256}
        onAddToCart={() => console.log('Added to cart')}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
        title="Smart Watch"
        price="$199.99"
        rating={4.7}
        reviewCount={89}
        onAddToCart={() => console.log('Added to cart')}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
        title="Laptop Backpack"
        price="$49.99"
        rating={4.4}
        reviewCount={67}
        onAddToCart={() => console.log('Added to cart')}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80"
        title="Gaming Keyboard"
        price="$79.99"
        originalPrice="$99.99"
        badge="20% OFF"
        rating={4.6}
        reviewCount={89}
        onAddToCart={() => console.log('Added to cart')}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
        title="Coffee Maker"
        price="$299.99"
        rating={4.9}
        reviewCount={1024}
        onAddToCart={() => console.log('Added to cart')}
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
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    title: 'Interactive Product Card',
    description: 'Click the buttons to see interactions in the Actions tab.',
    price: '$99.99',
    originalPrice: '$129.99',
    rating: 4.5,
    reviewCount: 156,
    badge: 'Popular',
    onAddToCart: () => console.log('🛒 Product added to cart!'),
    onWishlist: () => console.log('💝 Product added to wishlist!'),
    onQuickView: () => console.log('👁️ Quick view opened!'),
    onClick: () => console.log('📱 Product card clicked!')
  }
}

// Different states
export const ProductStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Regular Product</h3>
        <ProductCard
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
          title="Regular Product"
          price="$99.99"
          rating={4.5}
          reviewCount={124}
          onAddToCart={() => console.log('Added to cart')}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sale Product</h3>
        <ProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
          title="Sale Product"
          price="$79.99"
          originalPrice="$99.99"
          badge="25% OFF"
          rating={4.7}
          reviewCount={89}
          onAddToCart={() => console.log('Added to cart')}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Premium Product</h3>
        <ProductCard
          image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
          title="Premium Product"
          price="$299.99"
          rating={4.9}
          reviewCount={512}
          badge="Premium"
          variant="detailed"
          onAddToCart={() => console.log('Added to cart')}
          onWishlist={() => console.log('Added to wishlist')}
          onQuickView={() => console.log('Quick view')}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Compact Product</h3>
        <ProductCard
          image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
          title="Compact Product"
          price="$49.99"
          rating={4.3}
          reviewCount={67}
          variant="compact"
          onAddToCart={() => console.log('Added to cart')}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded'
  }
}
