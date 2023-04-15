import React from 'react'
import { cn } from '../../utils'

// Define the ArticleCard component props based on the specification
export interface ArticleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // Article Data
  image?: string | React.ReactNode
  title: string | React.ReactNode
  excerpt?: string | React.ReactNode
  author?: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
  }
  publishDate?: Date | string | React.ReactNode
  readTime?: string | React.ReactNode
  category?: string | React.ReactNode
  tags?: string[]
  
  // Actions
  onRead?: () => void
  onShare?: () => void
  onBookmark?: () => void
  onLike?: () => void
  
  // State
  isBookmarked?: boolean
  isLiked?: boolean
  likeCount?: number
  
  // Icons
  shareIcon?: React.ReactNode
  bookmarkIcon?: React.ReactNode
  heartIcon?: React.ReactNode
  timeIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'horizontal' | 'minimal'
  imagePosition?: 'top' | 'left' | 'right'
  showImage?: boolean
  showAuthor?: boolean
  showMeta?: boolean
  
  // Customization
  className?: string
  imageClassName?: string
  contentClassName?: string
  titleClassName?: string
  excerptClassName?: string
  authorClassName?: string
  metaClassName?: string
  tagsClassName?: string
  actionsClassName?: string
  
  // Base Props
  onClick?: () => void
}

const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  ({
    // Article Data
    image,
    title,
    excerpt,
    author,
    publishDate,
    readTime,
    category,
    tags,
    
    // Actions
    onRead,
    onShare,
    onBookmark,
    onLike,
    
    // State
    isBookmarked = false,
    isLiked = false,
    likeCount,
    
    // Icons
    shareIcon,
    bookmarkIcon,
    heartIcon,
    timeIcon,
    
    // Visual Options
    variant = 'default',
    imagePosition = 'top',
    showImage = true,
    showAuthor = true,
    showMeta = true,
    
    // Customization
    className,
    imageClassName,
    contentClassName,
    titleClassName,
    excerptClassName,
    authorClassName,
    metaClassName,
    tagsClassName,
    actionsClassName,
    
    // Base Props
    onClick,
    ...props
  }, ref) => {
    
    // Variant styles with professional colors
    const variantClasses = {
      default: 'bg-white border border-slate-200 shadow-lg hover:shadow-xl flex flex-col',
      horizontal: 'bg-white border border-slate-200 shadow-md hover:shadow-lg flex flex-row',
      minimal: 'bg-white border border-slate-100 shadow-sm hover:shadow-md flex flex-col'
    }
    
    // Default icons with professional styling
    const defaultShareIcon = (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
    )
    
    const defaultBookmarkIcon = (
      <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    )
    
    const defaultHeartIcon = (
      <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
    
    const defaultTimeIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
    
    // Format date function
    const formatDate = (date: Date | string | React.ReactNode) => {
      if (typeof date === 'string' || React.isValidElement(date)) {
        return date
      }
      if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
      return date
    }
    
    // Image component
    const ImageComponent = () => {
      if (!showImage || !image) return null
      
      return (
        <div className={cn(
          'relative overflow-hidden',
          variant === 'horizontal' ? 'w-1/3 h-48' : 'w-full h-48',
          variant === 'minimal' && 'h-32',
          imageClassName
        )}>
          {typeof image === 'string' ? (
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              {image}
            </div>
          )}
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
          )}
        </div>
      )
    }
    
    // Content component
    const ContentComponent = () => (
      <div className={cn(
        'flex-1 p-6',
        variant === 'horizontal' && 'p-4',
        variant === 'minimal' && 'p-4',
        contentClassName
      )}>
        {/* Title */}
        <h3 className={cn(
          'font-bold text-slate-900 mb-3 leading-tight line-clamp-2',
          variant === 'minimal' ? 'text-lg' : 'text-xl',
          variant === 'horizontal' && 'text-lg',
          onClick && 'hover:text-blue-600 cursor-pointer',
          titleClassName
        )}>
          {title}
        </h3>
        
        {/* Excerpt */}
        {excerpt && (
          <p className={cn(
            'text-slate-600 mb-4 leading-relaxed line-clamp-3',
            variant === 'minimal' ? 'text-sm' : 'text-base',
            excerptClassName
          )}>
            {excerpt}
          </p>
        )}
        
        {/* Author */}
        {author && showAuthor && (
          <div className={cn(
            'flex items-center gap-3 mb-4',
            authorClassName
          )}>
            {author.avatar && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {typeof author.avatar === 'string' ? (
                  <img
                    src={author.avatar}
                    alt={typeof author.name === 'string' ? author.name : 'Author'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                    {author.avatar}
                  </div>
                )}
              </div>
            )}
            <div>
              <p className="font-medium text-slate-900 text-sm">
                {author.name}
              </p>
            </div>
          </div>
        )}
        
        {/* Meta information */}
        {showMeta && (publishDate || readTime) && (
          <div className={cn(
            'flex items-center gap-4 text-sm text-slate-500 mb-4',
            metaClassName
          )}>
            {publishDate && (
              <span>{formatDate(publishDate)}</span>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                {timeIcon || defaultTimeIcon}
                <span>{readTime}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className={cn(
            'flex flex-wrap gap-2 mb-4',
            tagsClassName
          )}>
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className={cn(
          'flex items-center justify-between',
          actionsClassName
        )}>
          <div className="flex items-center gap-3">
            {onLike && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLike()
                }}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
                  isLiked
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                )}
              >
                {heartIcon || defaultHeartIcon}
                {likeCount !== undefined && (
                  <span className="text-sm font-medium">{likeCount}</span>
                )}
              </button>
            )}
            
            {onBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onBookmark()
                }}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isBookmarked
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                )}
                aria-label="Bookmark article"
              >
                {bookmarkIcon || defaultBookmarkIcon}
              </button>
            )}
            
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onShare()
                }}
                className="p-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Share article"
              >
                {shareIcon || defaultShareIcon}
              </button>
            )}
          </div>
          
          {onRead && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRead()
              }}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Read More
            </button>
          )}
        </div>
      </div>
    )
    
    return (
      <article
        ref={ref}
        className={cn(
          'relative rounded-xl transition-all duration-300 group overflow-hidden',
          variantClasses[variant],
          variant === 'horizontal' && imagePosition === 'right' && 'flex-row-reverse',
          onClick && 'cursor-pointer hover:scale-[1.02]',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Image */}
        {imagePosition === 'top' && <ImageComponent />}
        {imagePosition === 'left' && <ImageComponent />}
        
        {/* Content */}
        <ContentComponent />
        
        {/* Image for right position */}
        {imagePosition === 'right' && <ImageComponent />}
        
        {/* Hover effect overlay */}
        {onClick && (
          <div className="absolute inset-0 bg-slate-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </article>
    )
  }
)

ArticleCard.displayName = 'ArticleCard'

export { ArticleCard }
