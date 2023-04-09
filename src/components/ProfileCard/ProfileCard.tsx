import React from 'react'
import { cn } from '@/utils'

export interface ProfileCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // Profile Data
  avatar: string | React.ReactNode
  name: string | React.ReactNode
  title?: string | React.ReactNode
  bio?: string | React.ReactNode
  location?: string | React.ReactNode
  
  // Stats
  stats?: Array<{
    label: string | React.ReactNode
    value: string | number | React.ReactNode
    icon?: React.ReactNode
  }>
  
  // Social Links
  socialLinks?: Array<{
    platform: string
    url: string
    icon: React.ReactNode
  }>
  
  // Actions
  onFollow?: () => void
  onMessage?: () => void
  onConnect?: () => void
  followText?: string | React.ReactNode
  messageText?: string | React.ReactNode
  connectText?: string | React.ReactNode
  
  // Status
  isFollowing?: boolean
  isOnline?: boolean
  verified?: boolean
  
  // Icons
  locationIcon?: React.ReactNode
  verifiedIcon?: React.ReactNode
  onlineIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed'
  avatarSize?: 'small' | 'medium' | 'large'
  showStats?: boolean
  showSocial?: boolean
  
  // Customization
  className?: string
  headerClassName?: string
  avatarClassName?: string
  nameClassName?: string
  titleClassName?: string
  bioClassName?: string
  locationClassName?: string
  statsClassName?: string
  socialClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({
    // Profile Data
    avatar,
    name,
    title,
    bio,
    location,
    
    // Stats
    stats,
    
    // Social Links
    socialLinks,
    
    // Actions
    onFollow,
    onMessage,
    onConnect,
    followText = 'Follow',
    messageText = 'Message',
    connectText = 'Connect',
    
    // Status
    isFollowing = false,
    isOnline = false,
    verified = false,
    
    // Icons
    locationIcon,
    verifiedIcon,
    onlineIcon,
    
    // Visual Options
    variant = 'default',
    avatarSize = 'medium',
    showStats = true,
    showSocial = true,
    
    // Customization
    className,
    headerClassName,
    avatarClassName,
    nameClassName,
    titleClassName,
    bioClassName,
    locationClassName,
    statsClassName,
    socialClassName,
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
    
    // Avatar size classes
    const avatarSizeClasses = {
      small: 'w-12 h-12',
      medium: 'w-16 h-16',
      large: 'w-20 h-20'
    }
    
    // Default icons
    const defaultLocationIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
    
    const defaultVerifiedIcon = (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
    
    const defaultOnlineIcon = (
      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    )
    
    // Calculate padding based on variant
    const paddingClass = variant === 'compact' ? 'p-4' : variant === 'detailed' ? 'p-6' : 'p-5'
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg transition-all duration-200',
          variantClasses[variant],
          paddingClass,
          onClick && 'cursor-pointer hover:scale-[1.02]',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Header Section */}
        <div className={cn(
          'flex flex-col items-center text-center mb-4',
          variant === 'detailed' && 'mb-6',
          headerClassName
        )}>
          {/* Avatar with Online Status */}
          <div className="relative mb-3">
            {typeof avatar === 'string' ? (
              <img
                src={avatar}
                alt={typeof name === 'string' ? name : 'Profile'}
                className={cn(
                  'rounded-full object-cover',
                  avatarSizeClasses[avatarSize],
                  avatarClassName
                )}
              />
            ) : (
              <div className={cn(
                'rounded-full flex items-center justify-center bg-gray-200',
                avatarSizeClasses[avatarSize],
                avatarClassName
              )}>
                {avatar}
              </div>
            )}
            
            {/* Online Indicator */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1">
                {onlineIcon || defaultOnlineIcon}
              </div>
            )}
          </div>
          
          {/* Name with Verification */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              'font-semibold text-gray-900',
              variant === 'compact' ? 'text-lg' : 'text-xl',
              variant === 'detailed' && 'text-2xl',
              nameClassName
            )}>
              {name}
            </h3>
            {verified && (
              <span className="text-blue-500">
                {verifiedIcon || defaultVerifiedIcon}
              </span>
            )}
          </div>
          
          {/* Title */}
          {title && (
            <p className={cn(
              'text-gray-600 mb-2',
              variant === 'compact' ? 'text-sm' : 'text-base',
              titleClassName
            )}>
              {title}
            </p>
          )}
          
          {/* Location */}
          {location && (
            <div className={cn(
              'flex items-center gap-1 text-gray-500',
              variant === 'compact' ? 'text-xs' : 'text-sm',
              locationClassName
            )}>
              {locationIcon || defaultLocationIcon}
              <span>{location}</span>
            </div>
          )}
        </div>
        
        {/* Bio */}
        {bio && (
          <div className={cn(
            'text-center mb-4',
            variant === 'detailed' && 'mb-6',
            bioClassName
          )}>
            <p className={cn(
              'text-gray-600 leading-relaxed',
              variant === 'compact' ? 'text-sm' : 'text-base'
            )}>
              {bio}
            </p>
          </div>
        )}
        
        {/* Stats */}
        {stats && stats.length > 0 && showStats && (
          <div className={cn(
            'grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 mb-4',
            variant === 'detailed' && 'py-6 mb-6',
            statsClassName
          )}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {stat.icon && <span className="text-gray-400">{stat.icon}</span>}
                  <span className={cn(
                    'font-bold text-gray-900',
                    variant === 'compact' ? 'text-lg' : 'text-xl'
                  )}>
                    {stat.value}
                  </span>
                </div>
                <span className={cn(
                  'text-gray-500',
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                )}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && showSocial && (
          <div className={cn(
            'flex justify-center gap-3 mb-4',
            variant === 'detailed' && 'mb-6',
            socialClassName
          )}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Visit ${link.platform}`}
                onClick={(e) => e.stopPropagation()}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
        
        {/* Action Buttons */}
        {(onFollow || onMessage || onConnect) && (
          <div className={cn(
            'flex gap-2',
            variant === 'compact' && 'flex-col',
            (onFollow && onMessage && onConnect) ? 'grid grid-cols-1 sm:grid-cols-3' : 'flex',
            actionsClassName
          )}>
            {onFollow && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFollow()
                }}
                className={cn(
                  'flex-1 px-4 py-2 rounded-md font-medium transition-colors',
                  variant === 'compact' && 'text-sm py-1.5',
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                {isFollowing ? 'Following' : followText}
              </button>
            )}
            
            {onMessage && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMessage()
                }}
                className={cn(
                  'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors',
                  variant === 'compact' && 'text-sm py-1.5'
                )}
              >
                {messageText}
              </button>
            )}
            
            {onConnect && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onConnect()
                }}
                className={cn(
                  'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors',
                  variant === 'compact' && 'text-sm py-1.5'
                )}
              >
                {connectText}
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)

ProfileCard.displayName = 'ProfileCard'

export { ProfileCard }
