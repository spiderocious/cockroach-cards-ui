import React from 'react'
import { cn } from '@/utils'

export interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // Product Data
  image: string | React.ReactNode
  title: string | React.ReactNode
  description?: string | React.ReactNode
  price: string | React.ReactNode
  originalPrice?: string | React.ReactNode
  rating?: number
  reviewCount?: number
  badge?: string | React.ReactNode
  
  // Actions
  onAddToCart?: () => void
  onQuickView?: () => void
  onWishlist?: () => void
  addToCartText?: string | React.ReactNode
  
  // Icons
  cartIcon?: React.ReactNode
  wishlistIcon?: React.ReactNode
  eyeIcon?: React.ReactNode
  starIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed'
  imageAspectRatio?: 'square' | '4:3' | '3:2' | '16:9'
  showQuickActions?: boolean
  
  // Customization
  className?: string
  imageClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  priceClassName?: string
  originalPriceClassName?: string
  badgeClassName?: string
  ratingClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    // Product Data
    image,
    title,
    description,
    price,
    originalPrice,
    rating,
    reviewCount,
    badge,
    
    // Actions
    onAddToCart,
    onQuickView,
    onWishlist,
    addToCartText = 'Add to Cart',
    
    // Icons
    cartIcon,
    wishlistIcon,
    eyeIcon,
    starIcon,
    
    // Visual Options
    variant = 'default',
    imageAspectRatio = 'square',
    showQuickActions = true,
    
    // Customization
    className,
    imageClassName,
    contentClassName,
    titleClassName,
    descriptionClassName,
    priceClassName,
    originalPriceClassName,
    badgeClassName,
    ratingClassName,
    actionsClassName,
    
    // Base Props
    onClick,
    ...props
  }, ref) => {
    
    // Variant styles
    const variantClasses = {
      default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
      compact: 'bg-white border border-gray-100 shadow-sm',
      detailed: 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
    }
    
    // Image aspect ratio classes
    const aspectRatioClasses = {
      square: 'aspect-square',
      '4:3': 'aspect-[4/3]',
      '3:2': 'aspect-[3/2]',
      '16:9': 'aspect-[16/9]'
    }
    
    // Default icons
    const defaultCartIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h8M17 21a1 1 0 100-2 1 1 0 000 2zM9 21a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    )
    
    const defaultWishlistIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
    
    const defaultEyeIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
    
    const defaultStarIcon = (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
    
    // Render star rating
    const renderRating = () => {
      if (typeof rating !== 'number') return null
      
      const stars = []
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 !== 0
      
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          stars.push(
            <span key={i} className="text-yellow-400">
              {starIcon || defaultStarIcon}
            </span>
          )
        } else if (i === fullStars && hasHalfStar) {
          stars.push(
            <span key={i} className="text-yellow-400 relative">
              <span className="absolute inset-0 overflow-hidden w-1/2">
                {starIcon || defaultStarIcon}
              </span>
              <span className="text-gray-300">
                {starIcon || defaultStarIcon}
              </span>
            </span>
          )
        } else {
          stars.push(
            <span key={i} className="text-gray-300">
              {starIcon || defaultStarIcon}
            </span>
          )
        }
      }
      
      return (
        <div className={cn('flex items-center gap-1', ratingClassName)}>
          <div className="flex items-center">
            {stars}
          </div>
          <span className="text-sm text-gray-600">
            {rating}
            {reviewCount && (
              <span className="ml-1">({reviewCount})</span>
            )}
          </span>
        </div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg transition-all duration-200 group',
          variantClasses[variant],
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div className={cn(
            'absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded',
            badgeClassName
          )}>
            {badge}
          </div>
        )}
        
        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onWishlist && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onWishlist()
                }}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Add to wishlist"
              >
                {wishlistIcon || defaultWishlistIcon}
              </button>
            )}
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickView()
                }}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Quick view"
              >
                {eyeIcon || defaultEyeIcon}
              </button>
            )}
          </div>
        )}
        
        {/* Product Image */}
        <div className={cn(
          'relative overflow-hidden rounded-t-lg',
          aspectRatioClasses[imageAspectRatio],
          imageClassName
        )}>
          {typeof image === 'string' ? (
            <img
              src={image}
              alt={typeof title === 'string' ? title : 'Product'}
              className="w-full h-full object-cover"
            />
          ) : (
            image
          )}
        </div>
        
        {/* Product Content */}
        <div className={cn(
          'p-4',
          variant === 'compact' && 'p-3',
          variant === 'detailed' && 'p-6',
          contentClassName
        )}>
          {/* Title */}
          <h3 className={cn(
            'font-semibold text-gray-900 mb-1',
            variant === 'compact' ? 'text-sm' : 'text-base',
            variant === 'detailed' && 'text-lg',
            titleClassName
          )}>
            {title}
          </h3>
          
          {/* Description */}
          {description && (
            <p className={cn(
              'text-gray-600 mb-2',
              variant === 'compact' ? 'text-xs' : 'text-sm',
              descriptionClassName
            )}>
              {description}
            </p>
          )}
          
          {/* Rating */}
          {rating !== undefined && (
            <div className="mb-3">
              {renderRating()}
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn(
              'font-bold text-gray-900',
              variant === 'compact' ? 'text-base' : 'text-lg',
              variant === 'detailed' && 'text-xl',
              priceClassName
            )}>
              {price}
            </span>
            {originalPrice && (
              <span className={cn(
                'text-sm text-gray-500 line-through',
                originalPriceClassName
              )}>
                {originalPrice}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          {onAddToCart && (
            <div className={cn(actionsClassName)}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart()
                }}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium',
                  variant === 'compact' && 'text-sm py-1.5'
                )}
              >
                {cartIcon || defaultCartIcon}
                {addToCartText}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export { ProductCard }
