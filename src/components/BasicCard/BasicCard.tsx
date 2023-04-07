import React from 'react'
import { cn } from '@/utils'

export interface BasicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Content
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  
  // Visual Styling
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  size?: 'small' | 'medium' | 'large'
  padding?: 'none' | 'small' | 'medium' | 'large'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  
  // Customization
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  
  // Interactions
  clickable?: boolean
  
  // Base Props
  'data-testid'?: string
}

const cardVariants = {
  default: 'bg-white border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg border border-gray-100',
  filled: 'bg-gray-50 border border-gray-200',
}

const cardSizes = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
}

const cardPadding = {
  none: '',
  small: 'p-3',
  medium: 'p-4',
  large: 'p-6',
}

const cardRadius = {
  none: 'rounded-none',
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
  full: 'rounded-xl',
}

const headerPadding = {
  none: '',
  small: 'px-3 pt-3 pb-2',
  medium: 'px-4 pt-4 pb-3',
  large: 'px-6 pt-6 pb-4',
}

const bodyPadding = {
  none: '',
  small: 'px-3',
  medium: 'px-4',
  large: 'px-6',
}

const footerPadding = {
  none: '',
  small: 'px-3 pt-2 pb-3',
  medium: 'px-4 pt-3 pb-4',
  large: 'px-6 pt-4 pb-6',
}

export const BasicCard: React.FC<BasicCardProps> = ({
  variant = 'default',
  size = 'medium',
  padding = 'medium',
  radius = 'medium',
  header,
  children,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  clickable = false,
  ...props
}) => {
  const baseClasses = 'transition-colors'
  const variantClasses = cardVariants[variant]
  const sizeClasses = cardSizes[size]
  const radiusClasses = cardRadius[radius]
  const clickableClasses = clickable 
    ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' 
    : ''
  
  // Handle padding - if we have header/footer, don't apply padding to main container
  const hasHeaderOrFooter = header || footer
  const containerPadding = hasHeaderOrFooter ? '' : cardPadding[padding]
  
  const combinedClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    radiusClasses,
    clickableClasses,
    containerPadding,
    className
  )

  const headerClasses = cn(
    'border-b border-gray-100',
    hasHeaderOrFooter ? headerPadding[padding] : '',
    headerClassName
  )

  const bodyClasses = cn(
    hasHeaderOrFooter ? bodyPadding[padding] : '',
    hasHeaderOrFooter && (header && footer) ? 'py-4' : '',
    hasHeaderOrFooter && header && !footer ? 'pb-4' : '',
    hasHeaderOrFooter && !header && footer ? 'pt-4' : '',
    bodyClassName
  )

  const footerClasses = cn(
    'border-t border-gray-100',
    hasHeaderOrFooter ? footerPadding[padding] : '',
    footerClassName
  )

  return (
    <div className={combinedClasses} {...props}>
      {header && (
        <div className={headerClasses}>
          {header}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {footer && (
        <div className={footerClasses}>
          {footer}
        </div>
      )}
    </div>
  )
}
