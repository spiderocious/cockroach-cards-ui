import React from 'react'

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'
export type NotificationStatus = 'unread' | 'read' | 'archived'
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'system' | 'user'

export interface NotificationAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: React.ReactNode
}

export interface NotificationCardProps {
  id: string
  title: string
  message: string
  type?: NotificationType
  priority?: NotificationPriority
  status?: NotificationStatus
  timestamp: Date
  
  // Content
  icon?: React.ReactNode
  avatar?: string
  actions?: NotificationAction[]
  
  // Visual options
  showTimestamp?: boolean
  showPriority?: boolean
  showActions?: boolean
  compact?: boolean
  
  // Interactive features
  onRead?: () => void
  onArchive?: () => void
  onDismiss?: () => void
  onClick?: () => void
  
  // Styling
  className?: string
  style?: React.CSSProperties
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  id: _id,
  title,
  message,
  type = 'info',
  priority = 'medium',
  status = 'unread',
  timestamp,
  icon,
  avatar,
  actions,
  showTimestamp = true,
  showPriority = true,
  showActions = true,
  compact = false,
  onRead,
  onArchive,
  onDismiss,
  onClick,
  className = '',
  style
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'system':
        return 'bg-slate-50 border-slate-200 text-slate-900'
      case 'user':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  const getPriorityStyles = () => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 border-l-4'
      case 'high':
        return 'border-l-yellow-500 border-l-4'
      case 'medium':
        return 'border-l-blue-500 border-l-2'
      default:
        return 'border-l-slate-300 border-l-1'
    }
  }

  const getPriorityIndicator = () => {
    if (!showPriority) return null
    
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Urgent
          </span>
        )
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            High
          </span>
        )
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Medium
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            Low
          </span>
        )
    }
  }

  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'system':
        return (
          <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        )
      case 'user':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    return date.toLocaleDateString()
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    }
    if (status === 'unread' && onRead) {
      onRead()
    }
  }

  const actionButtons = actions && showActions ? (
    <div className="flex items-center gap-2 mt-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation()
            action.onClick()
          }}
          className={`
            inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${action.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
            ${action.variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : ''}
            ${!action.variant || action.variant === 'secondary' ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : ''}
          `}
        >
          {action.icon && <span className="w-4 h-4">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  ) : null

  return (
    <div
      className={`
        relative rounded-lg border shadow-sm transition-all duration-200 cursor-pointer
        ${getTypeStyles()}
        ${getPriorityStyles()}
        ${status === 'unread' ? 'bg-opacity-90' : 'bg-opacity-50'}
        ${status === 'archived' ? 'opacity-75' : ''}
        ${compact ? 'p-3' : 'p-4'}
        hover:shadow-md hover:bg-opacity-100
        ${className}
      `}
      style={style}
      onClick={handleCardClick}
    >
      {/* Status indicator */}
      {status === 'unread' && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div className="flex items-start gap-3">
        {/* Icon or Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-50">
              {icon || getDefaultIcon()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-base'} truncate`}>
              {title}
            </h3>
            {showTimestamp && (
              <span className="text-xs text-current opacity-60 flex-shrink-0">
                {formatTimestamp(timestamp)}
              </span>
            )}
          </div>

          <p className={`text-current opacity-80 ${compact ? 'text-sm' : 'text-base'} leading-relaxed`}>
            {message}
          </p>

          {/* Priority indicator */}
          {showPriority && !compact && (
            <div className="mt-2">
              {getPriorityIndicator()}
            </div>
          )}

          {/* Actions */}
          {actionButtons}
        </div>
      </div>

      {/* Archive/Read buttons */}
      {(onArchive || (onRead && status === 'unread')) && (
        <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-current border-opacity-20">
          {onRead && status === 'unread' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRead()
              }}
              className="text-xs text-current opacity-60 hover:opacity-100 transition-opacity"
            >
              Mark as read
            </button>
          )}
          {onArchive && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onArchive()
              }}
              className="text-xs text-current opacity-60 hover:opacity-100 transition-opacity"
            >
              Archive
            </button>
          )}
        </div>
      )}
    </div>
  )
}
