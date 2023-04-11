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
  variant?: 'default' | 'compact' | 'detailed' | 'glassmorphism' | 'blur'
  avatarSize?: 'small' | 'medium' | 'large'
  showStats?: boolean
  showSocial?: boolean
  gradient?: boolean
  
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
    gradient = false,
    
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
    
    // Variant styles with professional colors and glassmorphism
    const variantClasses = {
      default: 'bg-white border border-slate-200 shadow-lg hover:shadow-xl',
      compact: 'bg-white border border-slate-100 shadow-md hover:shadow-lg',
      detailed: 'bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-xl hover:shadow-2xl',
      glassmorphism: 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10',
      blur: 'bg-white/80 backdrop-blur-md border border-white/40 shadow-xl'
    }
    
    // Avatar size classes with enhanced styling
    const avatarSizeClasses = {
      small: 'w-16 h-16',
      medium: 'w-20 h-20',
      large: 'w-24 h-24'
    }
    
    // Professional gradient schemes
    const gradientOverlays = {
      blue: 'from-blue-400 via-blue-500 to-indigo-600',
      teal: 'from-teal-400 via-cyan-500 to-blue-600',
      emerald: 'from-emerald-400 via-teal-500 to-cyan-600',
      slate: 'from-slate-400 via-slate-500 to-slate-600'
    }
    
    // Default icons with beautiful styling
    const defaultLocationIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
    
    const defaultVerifiedIcon = (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    )
    
    const defaultOnlineIcon = (
      <div className="relative">
        <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
        <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75" />
      </div>
    )
    
    // Calculate padding based on variant
    const paddingClass = variant === 'compact' ? 'p-6' : variant === 'detailed' ? 'p-8' : 'p-7'
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl transition-all duration-300 group overflow-hidden',
          variantClasses[variant],
          paddingClass,
          onClick && 'cursor-pointer hover:scale-[1.02]',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Gradient overlay for glassmorphism variants */}
        {(variant === 'glassmorphism' || variant === 'blur') && gradient && (
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-10',
            `bg-gradient-to-br ${gradientOverlays.teal}`
          )} />
        )}
        
        {/* Background pattern for enhanced visuals */}
        {variant === 'detailed' && (
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.15)_1px,_transparent_0)] bg-[size:24px_24px]" />
          </div>
        )}
        
        {/* Sparkle effects for glassmorphism */}
        {variant === 'glassmorphism' && (
          <>
            <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300/70 rounded-full animate-pulse" />
          </>
        )}
        
        {/* Header Section */}
        <div className={cn(
          'flex flex-col items-center text-center mb-6',
          variant === 'detailed' && 'mb-8',
          headerClassName
        )}>
          {/* Avatar with enhanced styling and online status */}
          <div className="relative mb-4">
            <div className={cn(
              'relative overflow-hidden rounded-full ring-4 ring-white shadow-xl',
              variant === 'glassmorphism' || variant === 'blur' 
                ? 'ring-white/30' 
                : 'ring-blue-50',
              avatarSizeClasses[avatarSize]
            )}>
              {typeof avatar === 'string' ? (
                <img
                  src={avatar}
                  alt={typeof name === 'string' ? name : 'Profile'}
                  className={cn(
                    'w-full h-full object-cover',
                    avatarClassName
                  )}
                />
              ) : (
                <div className={cn(
                  'w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100',
                  (variant === 'glassmorphism' || variant === 'blur') && 'from-white/20 to-white/10',
                  avatarClassName
                )}>
                  {avatar}
                </div>
              )}
            </div>
            
            {/* Online Indicator with enhanced styling */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1">
                {onlineIcon || defaultOnlineIcon}
              </div>
            )}
          </div>
          
          {/* Name with Verification Badge */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className={cn(
              'font-bold tracking-tight',
              variant === 'compact' ? 'text-xl' : 'text-2xl',
              variant === 'detailed' && 'text-3xl',
              variant === 'glassmorphism' || variant === 'blur'
                ? 'text-white'
                : 'text-slate-900',
              nameClassName
            )}>
              {name}
            </h3>
            {verified && (
              <span className={cn(
                'text-blue-500',
                (variant === 'glassmorphism' || variant === 'blur') && 'text-cyan-300'
              )}>
                {verifiedIcon || defaultVerifiedIcon}
              </span>
            )}
          </div>
          
          {/* Title with enhanced styling */}
          {title && (
            <p className={cn(
              'font-medium mb-3',
              variant === 'compact' ? 'text-base' : 'text-lg',
              variant === 'glassmorphism' || variant === 'blur'
                ? 'text-white/90'
                : 'text-slate-600',
              titleClassName
            )}>
              {title}
            </p>
          )}
          
          {/* Location with icon */}
          {location && (
            <div className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full',
              variant === 'glassmorphism' || variant === 'blur'
                ? 'bg-white/20 text-white/80'
                : 'bg-slate-100 text-slate-600',
              locationClassName
            )}>
              {locationIcon || defaultLocationIcon}
              <span className="text-sm font-medium">{location}</span>
            </div>
          )}
        </div>
        
        {/* Bio with enhanced typography */}
        {bio && (
          <div className={cn(
            'text-center mb-6',
            variant === 'detailed' && 'mb-8',
            bioClassName
          )}>
            <p className={cn(
              'leading-relaxed',
              variant === 'compact' ? 'text-sm' : 'text-base',
              variant === 'glassmorphism' || variant === 'blur'
                ? 'text-white/80'
                : 'text-slate-600'
            )}>
              {bio}
            </p>
          </div>
        )}
        
        {/* Stats with enhanced design */}
        {stats && stats.length > 0 && showStats && (
          <div className={cn(
            'grid grid-cols-3 gap-4 py-6 mb-6',
            variant === 'detailed' && 'py-8 mb-8',
            variant === 'glassmorphism' || variant === 'blur'
              ? 'border-t border-b border-white/20'
              : 'border-t border-b border-slate-200',
            statsClassName
          )}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {stat.icon && (
                    <span className={cn(
                      'transition-colors',
                      variant === 'glassmorphism' || variant === 'blur'
                        ? 'text-white/60 group-hover:text-white/80'
                        : 'text-slate-400 group-hover:text-slate-600'
                    )}>
                      {stat.icon}
                    </span>
                  )}
                  <span className={cn(
                    'font-bold tracking-tight',
                    variant === 'compact' ? 'text-xl' : 'text-2xl',
                    variant === 'glassmorphism' || variant === 'blur'
                      ? 'text-white'
                      : 'text-slate-900'
                  )}>
                    {stat.value}
                  </span>
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  variant === 'glassmorphism' || variant === 'blur'
                    ? 'text-white/70'
                    : 'text-slate-500'
                )}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Social Links with enhanced styling */}
        {socialLinks && socialLinks.length > 0 && showSocial && (
          <div className={cn(
            'flex justify-center gap-2 mb-6',
            variant === 'detailed' && 'mb-8',
            socialClassName
          )}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-3 rounded-xl transition-all duration-200 hover:scale-110',
                  variant === 'glassmorphism' || variant === 'blur'
                    ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 border border-slate-200'
                )}
                aria-label={`Visit ${link.platform}`}
                onClick={(e) => e.stopPropagation()}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
        
        {/* Action Buttons with stunning styling */}
        {(onFollow || onMessage || onConnect) && (
          <div className={cn(
            'flex gap-3',
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
                  'flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105',
                  variant === 'compact' && 'text-sm py-2.5',
                  isFollowing
                    ? variant === 'glassmorphism' || variant === 'blur'
                      ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300'
                    : variant === 'glassmorphism' || variant === 'blur'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700'
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
                  'flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105',
                  variant === 'compact' && 'text-sm py-2.5',
                  variant === 'glassmorphism' || variant === 'blur'
                    ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg'
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
                  'flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105',
                  variant === 'compact' && 'text-sm py-2.5',
                  variant === 'glassmorphism' || variant === 'blur'
                    ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg'
                )}
              >
                {connectText}
              </button>
            )}
          </div>
        )}
        
        {/* Hover effect overlay */}
        {onClick && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    )
  }
)

ProfileCard.displayName = 'ProfileCard'

export { ProfileCard }
