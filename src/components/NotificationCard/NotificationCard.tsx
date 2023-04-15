import React from 'react'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationVariant = 'default' | 'compact' | 'inline'

export interface NotificationCardProps {
  id: string
  title: string
  message?: string
  type?: NotificationType
  variant?: NotificationVariant
  timestamp?: string
  actionText?: string
  
  // Interactive features
  onClick?: () => void
  onAction?: () => void
  onDismiss?: () => void
  
  // Styling
  className?: string
  style?: React.CSSProperties
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  id: _id,
  title,
  message,
  type = 'info',
  variant = 'default',
  timestamp,
  actionText,
  onClick,
  onAction,
  onDismiss,
  className = '',
  style,
  ...props
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          iconBg: 'bg-emerald-500',
          iconColor: 'text-white',
          textColor: 'text-emerald-900'
        }
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-500',
          iconColor: 'text-white',
          textColor: 'text-amber-900'
        }
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconBg: 'bg-red-500',
          iconColor: 'text-white',
          textColor: 'text-red-900'
        }
      default: // info
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-500',
          iconColor: 'text-white',
          textColor: 'text-blue-900'
        }
    }
  }

  const getIcon = () => {
    const iconClass = "w-5 h-5"
    
    switch (type) {
      case 'success':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        )
      case 'error':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        )
      default: // info
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  const styles = getTypeStyles()
  const isCompact = variant === 'compact'
  const isInline = variant === 'inline'

  if (isInline) {
    return (
      <div
        className={`
          flex flex-row items-center gap-3 p-3 rounded-lg transition-all duration-200
          ${styles.bg} ${styles.border} border
          ${onClick ? 'cursor-pointer hover:shadow-sm' : ''}
          ${className}
        `}
        style={style}
        onClick={onClick}
        role="alert"
        {...props}
      >
        {/* Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center`}>
          <div className={styles.iconColor}>
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${styles.textColor}`}>
            {title}
          </p>
        </div>

        {/* Action */}
        {actionText && onAction && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onAction()
              }
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {actionText}
          </button>
        )}

        {/* Dismiss */}
        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDismiss()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onDismiss()
              }
            }}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-5 transition-colors"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={`
        relative rounded-xl border shadow-sm transition-all duration-200
        ${styles.bg} ${styles.border}
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${isCompact ? 'p-3' : 'p-6'}
        ${className}
      `}
      style={style}
      onClick={onClick}
      role="alert"
      {...props}
    >
      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              onDismiss()
            }
          }}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-black hover:bg-opacity-5 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center`}>
          <div className={styles.iconColor}>
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-semibold ${styles.textColor} ${isCompact ? 'text-base' : 'text-lg'} leading-tight`}>
              {title}
            </h3>
            
            {/* Timestamp */}
            {timestamp && (
              <span className="text-xs text-slate-500 flex-shrink-0 mt-1">
                {timestamp}
              </span>
            )}
          </div>

          {message && (
            <p className={`text-slate-600 ${isCompact ? 'text-sm' : 'text-base'} leading-relaxed mb-4`}>
              {message}
            </p>
          )}

          {/* Action Button */}
          {actionText && onAction && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAction()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.stopPropagation()
                  onAction()
                }
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
