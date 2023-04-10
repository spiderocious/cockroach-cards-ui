import React from 'react'
import { cn } from '@/utils'

export interface StatCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  // Data
  value: string | number | React.ReactNode
  label: string | React.ReactNode
  description?: string | React.ReactNode
  
  // Trend Data
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
    label?: string | React.ReactNode
  }
  
  // Visual Elements
  icon?: React.ReactNode
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan' | 'rose'
  
  // Chart/Visual (optional)
  chart?: React.ReactNode
  
  // Actions
  onClick?: () => void
  onInfoClick?: () => void
  
  // Icons
  trendUpIcon?: React.ReactNode
  trendDownIcon?: React.ReactNode
  infoIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'detailed' | 'glassmorphism' | 'blur'
  size?: 'small' | 'medium' | 'large'
  showTrend?: boolean
  animated?: boolean
  gradient?: boolean
  
  // Customization
  className?: string
  headerClassName?: string
  valueClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  trendClassName?: string
  iconClassName?: string
  chartClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({
    // Data
    value,
    label,
    description,
    
    // Trend Data
    trend,
    
    // Visual Elements
    icon,
    color = 'default',
    
    // Chart/Visual
    chart,
    
    // Actions
    onClick,
    onInfoClick,
    
    // Icons
    trendUpIcon,
    trendDownIcon,
    infoIcon,
    
    // Visual Options
    variant = 'default',
    size = 'medium',
    showTrend = true,
    animated = false,
    gradient = false,
    
    // Customization
    className,
    headerClassName,
    valueClassName,
    labelClassName,
    descriptionClassName,
    trendClassName,
    iconClassName,
    chartClassName,
    
    // Base Props
    ...props
  }, ref) => {
    
    // Color schemes with gradients and modern palettes
    const colorSchemes = {
      default: {
        bg: 'bg-white',
        border: 'border-gray-200',
        shadow: 'shadow-sm hover:shadow-md',
        icon: 'text-gray-600',
        value: 'text-gray-900',
        label: 'text-gray-600',
        trend: 'text-gray-500',
        gradient: 'from-gray-50 to-white'
      },
      primary: {
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        shadow: 'shadow-blue-100 hover:shadow-blue-200',
        icon: 'text-blue-600',
        value: 'text-blue-900',
        label: 'text-blue-700',
        trend: 'text-blue-600',
        gradient: 'from-blue-400 via-blue-500 to-indigo-600'
      },
      success: {
        bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
        border: 'border-emerald-200',
        shadow: 'shadow-emerald-100 hover:shadow-emerald-200',
        icon: 'text-emerald-600',
        value: 'text-emerald-900',
        label: 'text-emerald-700',
        trend: 'text-emerald-600',
        gradient: 'from-emerald-400 via-emerald-500 to-green-600'
      },
      warning: {
        bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
        border: 'border-amber-200',
        shadow: 'shadow-amber-100 hover:shadow-amber-200',
        icon: 'text-amber-600',
        value: 'text-amber-900',
        label: 'text-amber-700',
        trend: 'text-amber-600',
        gradient: 'from-amber-400 via-amber-500 to-orange-600'
      },
      danger: {
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        border: 'border-red-200',
        shadow: 'shadow-red-100 hover:shadow-red-200',
        icon: 'text-red-600',
        value: 'text-red-900',
        label: 'text-red-700',
        trend: 'text-red-600',
        gradient: 'from-red-400 via-red-500 to-rose-600'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
        border: 'border-purple-200',
        shadow: 'shadow-purple-100 hover:shadow-purple-200',
        icon: 'text-purple-600',
        value: 'text-purple-900',
        label: 'text-purple-700',
        trend: 'text-purple-600',
        gradient: 'from-purple-400 via-purple-500 to-violet-600'
      },
      cyan: {
        bg: 'bg-gradient-to-br from-cyan-50 to-sky-50',
        border: 'border-cyan-200',
        shadow: 'shadow-cyan-100 hover:shadow-cyan-200',
        icon: 'text-cyan-600',
        value: 'text-cyan-900',
        label: 'text-cyan-700',
        trend: 'text-cyan-600',
        gradient: 'from-cyan-400 via-cyan-500 to-sky-600'
      },
      rose: {
        bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
        border: 'border-rose-200',
        shadow: 'shadow-rose-100 hover:shadow-rose-200',
        icon: 'text-rose-600',
        value: 'text-rose-900',
        label: 'text-rose-700',
        trend: 'text-rose-600',
        gradient: 'from-rose-400 via-rose-500 to-pink-600'
      }
    }
    
    // Variant styles with glassmorphism and blur effects
    const variantClasses = {
      default: `${colorSchemes[color].bg} border ${colorSchemes[color].border} ${colorSchemes[color].shadow}`,
      minimal: 'bg-transparent border-0 shadow-none',
      detailed: `${colorSchemes[color].bg} border ${colorSchemes[color].border} ${colorSchemes[color].shadow} shadow-lg`,
      glassmorphism: 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10',
      blur: 'bg-white/80 backdrop-blur-md border border-white/40 shadow-xl'
    }
    
    // Size configurations
    const sizeClasses = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    }
    
    const valueSizeClasses = {
      small: 'text-2xl',
      medium: 'text-3xl',
      large: 'text-4xl'
    }
    
    const iconSizeClasses = {
      small: 'w-8 h-8',
      medium: 'w-10 h-10',
      large: 'w-12 h-12'
    }
    
    // Default icons with beautiful SVGs
    const defaultTrendUpIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
    
    const defaultTrendDownIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    )
    
    const defaultInfoIcon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
    
    // Trend color classes
    const trendColors = {
      up: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      down: 'text-red-600 bg-red-50 border-red-200',
      neutral: 'text-gray-600 bg-gray-50 border-gray-200'
    }
    
    // Animation classes
    const animationClasses = animated ? 'animate-pulse hover:animate-none' : ''
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl transition-all duration-300 group overflow-hidden',
          variantClasses[variant],
          sizeClasses[size],
          onClick && 'cursor-pointer hover:scale-105',
          animationClasses,
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Gradient overlay for glassmorphism variants */}
        {(variant === 'glassmorphism' || variant === 'blur') && gradient && (
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-10',
            `bg-gradient-to-br ${colorSchemes[color].gradient}`
          )} />
        )}
        
        {/* Background pattern for enhanced visuals */}
        {variant === 'detailed' && (
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[size:20px_20px]" />
          </div>
        )}
        
        {/* Header section */}
        <div className={cn(
          'flex items-start justify-between mb-4',
          size === 'large' && 'mb-6',
          headerClassName
        )}>
          {/* Icon section */}
          {icon && (
            <div className={cn(
              'flex-shrink-0 p-3 rounded-xl',
              variant === 'glassmorphism' || variant === 'blur' 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
                : `bg-gradient-to-br ${colorSchemes[color].gradient}`,
              iconClassName
            )}>
              <div className={cn(
                iconSizeClasses[size],
                variant === 'glassmorphism' || variant === 'blur' 
                  ? 'text-white' 
                  : 'text-white',
              )}>
                {icon}
              </div>
            </div>
          )}
          
          {/* Info button */}
          {onInfoClick && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onInfoClick()
              }}
              className={cn(
                'p-2 rounded-lg transition-colors opacity-60 hover:opacity-100',
                variant === 'glassmorphism' || variant === 'blur'
                  ? 'hover:bg-white/20'
                  : 'hover:bg-gray-100',
                colorSchemes[color].trend
              )}
              aria-label="More information"
            >
              {infoIcon || defaultInfoIcon}
            </button>
          )}
        </div>
        
        {/* Main content */}
        <div className="space-y-2">
          {/* Value */}
          <div className={cn(
            'font-bold tracking-tight',
            valueSizeClasses[size],
            variant === 'glassmorphism' || variant === 'blur'
              ? 'text-white'
              : colorSchemes[color].value,
            valueClassName
          )}>
            {value}
          </div>
          
          {/* Label */}
          <div className={cn(
            'font-medium',
            size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base',
            variant === 'glassmorphism' || variant === 'blur'
              ? 'text-white/90'
              : colorSchemes[color].label,
            labelClassName
          )}>
            {label}
          </div>
          
          {/* Description */}
          {description && (
            <p className={cn(
              'text-sm leading-relaxed',
              variant === 'glassmorphism' || variant === 'blur'
                ? 'text-white/70'
                : 'text-gray-600',
              descriptionClassName
            )}>
              {description}
            </p>
          )}
        </div>
        
        {/* Trend and Chart section */}
        {(trend || chart) && (
          <div className={cn(
            'flex items-center justify-between mt-4',
            size === 'large' && 'mt-6'
          )}>
            {/* Trend indicator */}
            {trend && showTrend && (
              <div className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border',
                variant === 'glassmorphism' || variant === 'blur'
                  ? 'bg-white/20 border-white/30 text-white'
                  : trendColors[trend.direction],
                trendClassName
              )}>
                <span className="flex items-center">
                  {trend.direction === 'up' && (trendUpIcon || defaultTrendUpIcon)}
                  {trend.direction === 'down' && (trendDownIcon || defaultTrendDownIcon)}
                  {trend.direction === 'neutral' && (
                    <div className="w-4 h-4 rounded-full bg-current opacity-60" />
                  )}
                </span>
                <span>
                  {trend.direction !== 'neutral' && (
                    <span className="font-semibold">
                      {trend.value > 0 ? '+' : ''}{trend.value}%
                    </span>
                  )}
                  {trend.label && (
                    <span className="ml-1 opacity-75">
                      {trend.label}
                    </span>
                  )}
                </span>
              </div>
            )}
            
            {/* Chart/Visual element */}
            {chart && (
              <div className={cn(
                'flex-shrink-0',
                chartClassName
              )}>
                {chart}
              </div>
            )}
          </div>
        )}
        
        {/* Hover effect overlay */}
        {onClick && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
        
        {/* Sparkle effect for glassmorphism */}
        {variant === 'glassmorphism' && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-ping" />
        )}
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'

export { StatCard }
