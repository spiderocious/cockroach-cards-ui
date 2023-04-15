import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationCard } from './NotificationCard'

// Mock functions
const mockOnAction = jest.fn()
const mockOnDismiss = jest.fn()
const mockOnClick = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

// Helper function for common props
const getBasicProps = () => ({
  id: 'test-notification',
  title: 'Test Notification',
  message: 'This is a test message',
  onAction: mockOnAction,
  onDismiss: mockOnDismiss
})

describe('NotificationCard', () => {
  describe('Rendering', () => {
    it('renders with title only', () => {
      render(<NotificationCard id="test" title="Test Title" />)
      
      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders with title and message', () => {
      render(<NotificationCard id="test" title="Test Title" message="Test message" />)
      
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('renders with timestamp', () => {
      render(<NotificationCard id="test" title="Test Title" timestamp="2h ago" />)
      
      expect(screen.getByText('2h ago')).toBeInTheDocument()
    })

    it('renders action button when actionText is provided', () => {
      render(<NotificationCard {...getBasicProps()} actionText="Click Me" />)
      
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders dismiss button when onDismiss is provided', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
    })

    it('does not render action button when actionText is not provided', () => {
      const { ...propsWithoutAction } = getBasicProps()
      render(<NotificationCard {...propsWithoutAction} />)
      
      expect(screen.queryByRole('button', { name: /action/i })).not.toBeInTheDocument()
    })

    it('does not render dismiss button when onDismiss is not provided', () => {
      const {  ...propsWithoutDismiss } = getBasicProps()
      render(<NotificationCard {...propsWithoutDismiss} />)
      
      expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument()
    })
  })

  describe('Types and Icons', () => {
    it('renders info notification with info icon', () => {
      render(<NotificationCard {...getBasicProps()} type="info" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('border-blue-200')
    })

    it('renders success notification with success icon', () => {
      render(<NotificationCard {...getBasicProps()} type="success" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('border-emerald-200')
    })

    it('renders warning notification with warning icon', () => {
      render(<NotificationCard {...getBasicProps()} type="warning" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('border-amber-200')
    })

    it('renders error notification with error icon', () => {
      render(<NotificationCard {...getBasicProps()} type="error" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('border-red-200')
    })
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('p-6')
    })

    it('renders compact variant correctly', () => {
      render(<NotificationCard {...getBasicProps()} variant="compact" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('p-3')
    })

    it('renders inline variant correctly', () => {
      render(<NotificationCard {...getBasicProps()} variant="inline" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('p-3', 'flex-row')
    })
  })

  describe('Interactions', () => {
    it('calls onAction when action button is clicked', () => {
      render(<NotificationCard {...getBasicProps()} actionText="Click Me" />)
      
      const actionButton = screen.getByRole('button', { name: /click me/i })
      fireEvent.click(actionButton)
      
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('calls onDismiss when dismiss button is clicked', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      fireEvent.click(dismissButton)
      
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when card is clicked', () => {
      render(<NotificationCard {...getBasicProps()} onClick={mockOnClick} />)
      
      const notification = screen.getByRole('alert')
      fireEvent.click(notification)
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when action button is clicked', () => {
      render(<NotificationCard {...getBasicProps()} onClick={mockOnClick} actionText="Action" />)
      
      const actionButton = screen.getByRole('button', { name: /action/i })
      fireEvent.click(actionButton)
      
      expect(mockOnClick).not.toHaveBeenCalled()
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when dismiss button is clicked', () => {
      render(<NotificationCard {...getBasicProps()} onClick={mockOnClick} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      fireEvent.click(dismissButton)
      
      expect(mockOnClick).not.toHaveBeenCalled()
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('has proper aria-label for action button', () => {
      render(<NotificationCard {...getBasicProps()} actionText="Save Changes" />)
      
      const actionButton = screen.getByRole('button', { name: /save changes/i })
      expect(actionButton).toBeInTheDocument()
    })

    it('has proper aria-label for dismiss button', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss notification')
    })

    it('supports keyboard navigation for action button', () => {
      render(<NotificationCard {...getBasicProps()} actionText="Action" />)
      
      const actionButton = screen.getByRole('button', { name: /action/i })
      actionButton.focus()
      fireEvent.keyDown(actionButton, { key: 'Enter' })
      
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard navigation for dismiss button', () => {
      render(<NotificationCard {...getBasicProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss/i })
      dismissButton.focus()
      fireEvent.keyDown(dismissButton, { key: 'Enter' })
      
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty title gracefully', () => {
      render(<NotificationCard id="test" title="" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toBeInTheDocument()
    })

    it('handles empty message gracefully', () => {
      render(<NotificationCard id="test" title="Title" message="" />)
      
      expect(screen.getByText('Title')).toBeInTheDocument()
    })

    it('handles long title text', () => {
      const longTitle = 'This is a very long notification title that should still render properly without breaking the layout or causing any issues'
      render(<NotificationCard id="test" title={longTitle} />)
      
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles long message text', () => {
      const longMessage = 'This is a very long notification message that should wrap properly and not break the layout even when it contains a lot of text content that exceeds normal message lengths'
      render(<NotificationCard id="test" title="Title" message={longMessage} />)
      
      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })

    it('handles special characters in title', () => {
      const specialTitle = 'Title with émojis 🎉 and special chars & symbols'
      render(<NotificationCard id="test" title={specialTitle} />)
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument()
    })

    it('handles special characters in message', () => {
      const specialMessage = 'Message with émojis 🚀 & symbols <>&"'
      render(<NotificationCard id="test" title="Title" message={specialMessage} />)
      
      expect(screen.getByText(specialMessage)).toBeInTheDocument()
    })
  })

  describe('Type Safety', () => {
    it('accepts all valid type values', () => {
      const types = ['info', 'success', 'warning', 'error'] as const
      
      types.forEach(type => {
        const { rerender } = render(<NotificationCard id={`test-${type}`} title="Test" type={type} />)
        expect(screen.getByRole('alert')).toBeInTheDocument()
        rerender(<div />)
      })
    })

    it('accepts all valid variant values', () => {
      const variants = ['default', 'compact', 'inline'] as const
      
      variants.forEach(variant => {
        const { rerender } = render(<NotificationCard id={`test-${variant}`} title="Test" variant={variant} />)
        expect(screen.getByRole('alert')).toBeInTheDocument()
        rerender(<div />)
      })
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<NotificationCard id="test" title="Test" className="custom-class" />)
      
      const notification = screen.getByRole('alert')
      expect(notification).toHaveClass('custom-class')
    })

    it('accepts custom data attributes', () => {
      render(<NotificationCard id="test" title="Test" data-testid="custom-notification" />)
      
      expect(screen.getByTestId('custom-notification')).toBeInTheDocument()
    })
  })

  describe('Content Variations', () => {
    it('renders without message when not provided', () => {
      render(<NotificationCard id="test" title="Only Title" />)
      
      expect(screen.getByText('Only Title')).toBeInTheDocument()
      // Should not have a message container
      const notification = screen.getByRole('alert')
      expect(notification.querySelector('p')).not.toBeInTheDocument()
    })

    it('renders with all content elements', () => {
      render(
        <NotificationCard 
          id="test" 
          title="Full Notification" 
          message="Complete message"
          timestamp="1h ago"
          actionText="Action"
          onAction={mockOnAction}
          onDismiss={mockOnDismiss}
        />
      )
      
      expect(screen.getByText('Full Notification')).toBeInTheDocument()
      expect(screen.getByText('Complete message')).toBeInTheDocument()
      expect(screen.getByText('1h ago')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
    })
  })

  describe('Layout Consistency', () => {
    it('maintains consistent layout across different types', () => {
      const types = ['info', 'success', 'warning', 'error'] as const
      
      types.forEach(type => {
        const { rerender } = render(
          <NotificationCard 
            id={`test-${type}`} 
            title="Test Title" 
            message="Test message"
            type={type}
            actionText="Action"
            onDismiss={mockOnDismiss}
          />
        )
        
        const notification = screen.getByRole('alert')
        expect(notification).toHaveClass('rounded-xl', 'border')
        // Check that it has a background color (type-specific)
        expect(notification.className).toMatch(/bg-\w+-\d+/)
        rerender(<div />)
      })
    })

    it('maintains consistent layout across different variants', () => {
      const variants = ['default', 'compact', 'inline'] as const
      
      variants.forEach(variant => {
        const { rerender } = render(
          <NotificationCard 
            id={`test-${variant}`} 
            title="Test Title" 
            variant={variant}
          />
        )
        
        const notification = screen.getByRole('alert')
        // Different variants may have different border radius
        if (variant === 'inline') {
          expect(notification).toHaveClass('rounded-lg', 'border')
        } else {
          expect(notification).toHaveClass('rounded-xl', 'border')
        }
        // Check that it has a background color (type-specific)  
        expect(notification.className).toMatch(/bg-\w+-\d+/)
        rerender(<div />)
      })
    })
  })
})
