import type { Meta, StoryObj } from '@storybook/react'
import { NotificationCard } from './NotificationCard'

const meta: Meta<typeof NotificationCard> = {
  title: 'Components/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## NotificationCard

A modern, accessible notification card component designed for displaying alerts, messages, and system notifications with clean UI patterns.

### Features

- **Multiple Types**: Info, success, warning, and error with appropriate colors and icons
- **Flexible Variants**: Default, compact, and inline layouts for different use cases
- **Interactive Elements**: Optional action buttons and dismiss functionality
- **Accessibility**: Full keyboard navigation, ARIA roles, and screen reader support
- **Modern Design**: Circular icons, clean typography, and professional color schemes
- **Responsive**: Works seamlessly across different screen sizes

### Usage

\`\`\`tsx
import { NotificationCard } from 'cockroach-ui-cards'

// Basic notification
<NotificationCard
  id="basic"
  title="System Update"
  message="Your system has been updated successfully."
  type="success"
/>

// With action
<NotificationCard
  id="action"
  title="Storage Full"
  message="Your storage is running low. Consider upgrading."
  type="warning"
  actionText="Upgrade Now"
  onAction={() => console.log('Upgrade clicked')}
  onDismiss={() => console.log('Dismissed')}
/>

// Inline variant
<NotificationCard
  id="inline"
  title="Quick Alert"
  variant="inline"
  type="info"
  actionText="Action"
  onAction={() => console.log('Action')}
/>
\`\`\`

### Design Principles

- **Clean & Modern**: Simplified design with focus on readability
- **Consistent**: Unified styling across all notification types
- **Professional**: Blue/green color schemes avoiding flashy colors
- **Accessible**: WCAG compliant with proper contrast and navigation
        `,
      },
    },
  },
  argTypes: {
    id: {
      description: 'Unique identifier for the notification',
      control: 'text'
    },
    title: {
      description: 'Main title/heading of the notification',
      control: 'text'
    },
    message: {
      description: 'Optional detailed message content',
      control: 'text'
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of notification affecting visual styling and icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'inline'],
      description: 'Layout variant - default for full cards, compact for smaller spacing, inline for horizontal layout',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    timestamp: {
      description: 'Optional timestamp text to display',
      control: 'text'
    },
    actionText: {
      control: 'text',
      description: 'Text for the action button (button only appears if this is provided)'
    },
    onClick: {
      description: 'Callback when the notification card is clicked',
      action: 'card-clicked'
    },
    onAction: {
      description: 'Callback when the action button is clicked',
      action: 'action-clicked'
    },
    onDismiss: {
      description: 'Callback when the dismiss button is clicked',
      action: 'dismissed'
    },
    className: {
      description: 'Additional CSS classes to apply',
      control: 'text'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-100 min-h-[400px]">
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    id: 'info-notification',
    type: 'info',
    title: "Didn't get the code? Dial *5573*63#",
    message: '',
    actionText: 'Action',
    onAction: () => alert('Action clicked'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic info notification with blue color scheme and info icon. Perfect for general information and tips.'
      }
    }
  }
}

export const Success: Story = {
  args: {
    id: 'success-notification',
    type: 'success',
    title: 'Payment Successful',
    message: 'Your payment has been processed successfully.',
    actionText: 'View Receipt',
    onAction: () => alert('View receipt'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Success notification with emerald green color scheme. Use for confirmations and successful actions.'
      }
    }
  }
}

export const Warning: Story = {
  args: {
    id: 'warning-notification',
    type: 'warning',
    title: 'Storage Almost Full',
    message: 'You are running out of storage space. Consider upgrading your plan.',
    actionText: 'Upgrade Now',
    onAction: () => alert('Upgrade clicked'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning notification with amber color scheme. Use for cautionary messages and non-critical issues.'
      }
    }
  }
}

export const Error: Story = {
  args: {
    id: 'error-notification',
    type: 'error',
    title: 'Connection Failed',
    message: 'Unable to connect to the server. Please check your internet connection.',
    actionText: 'Retry',
    onAction: () => alert('Retry clicked'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Error notification with red color scheme. Use for critical errors and failures that need immediate attention.'
      }
    }
  }
}

export const WithTimestamp: Story = {
  args: {
    id: 'timestamp-notification',
    type: 'info',
    title: 'What we need',
    message: 'Your proof of address must clearly indicate your name and address. You\'ll have to re-upload if it doesn\'t.',
    timestamp: '23h : 59m : 45s',
    actionText: 'Action',
    onAction: () => alert('Action clicked')
  },
  parameters: {
    docs: {
      description: {
        story: 'Notification with timestamp showing when the notification was created or received.'
      }
    }
  }
}

export const CompactVariant: Story = {
  args: {
    id: 'compact-notification',
    type: 'success',
    variant: 'compact',
    title: 'Settings Saved',
    message: 'Your preferences have been updated successfully.',
    actionText: 'Undo',
    onAction: () => alert('Undo clicked'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with reduced padding (p-3) for use in smaller spaces or when displaying multiple notifications.'
      }
    }
  }
}

export const InlineVariant: Story = {
  args: {
    id: 'inline-notification',
    type: 'info',
    variant: 'inline',
    title: 'A Very Short Alert Title',
    message: '',
    actionText: 'Action',
    onAction: () => alert('Action clicked'),
    onDismiss: () => alert('Dismissed')
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline variant with horizontal layout (flex-row) perfect for banner-style notifications or in-page alerts.'
      }
    }
  }
}

export const InlineError: Story = {
  args: {
    id: 'inline-error',
    type: 'error',
    variant: 'inline',
    title: 'A Very Short Alert Title',
    message: '',
    actionText: 'Action',
    onAction: () => alert('Action clicked'),
    onDismiss: () => alert('Dismissed')
  }
}

export const InlineWarning: Story = {
  args: {
    id: 'inline-warning',
    type: 'warning',
    variant: 'inline',
    title: 'A Very Short Alert Title',
    message: '',
    actionText: 'Action',
    onAction: () => alert('Action clicked'),
    onDismiss: () => alert('Dismissed')
  }
}

export const InlineSuccess: Story = {
  args: {
    id: 'inline-success',
    type: 'success',
    variant: 'inline',
    title: 'A Very Short Alert Title',
    message: '',
    actionText: 'Action',
    onAction: () => alert('Action clicked'),
    onDismiss: () => alert('Dismissed')
  }
}

export const WithoutAction: Story = {
  args: {
    id: 'no-action-notification',
    type: 'info',
    title: 'System Update',
    message: 'The system will be updated during the maintenance window tonight.',
    timestamp: '2h ago',
    onDismiss: () => alert('Dismissed')
  }
}

export const WithoutDismiss: Story = {
  args: {
    id: 'no-dismiss-notification',
    type: 'warning',
    title: 'Important Notice',
    message: 'Please complete your profile to access all features.',
    actionText: 'Complete Profile',
    onAction: () => alert('Complete profile')
  }
}

export const ClickableCard: Story = {
  args: {
    id: 'clickable-notification',
    type: 'info',
    title: 'New Feature Available',
    message: 'Check out our latest feature that helps you work more efficiently.',
    onClick: () => alert('Card clicked'),
    onDismiss: () => alert('Dismissed')
  }
}

export const LongContent: Story = {
  args: {
    id: 'long-content-notification',
    type: 'warning',
    title: 'Security Alert: Unusual Activity Detected',
    message: 'We have detected unusual activity on your account from an unrecognized device. If this was not you, please secure your account immediately by changing your password and enabling two-factor authentication.',
    actionText: 'Secure Account',
    timestamp: '5m ago',
    onAction: () => alert('Secure account'),
    onDismiss: () => alert('Dismissed')
  }
}

// Multiple notifications showcase
export const MultipleNotifications: Story = {
  render: () => (
    <div className="space-y-4">
      <NotificationCard
        id="multi-1"
        type="info"
        variant="inline"
        title="Didn't get the code? Dial *5573*63#"
        message=""
        actionText="Action"
        onAction={() => alert('Action 1')}
        onDismiss={() => alert('Dismiss 1')}
      />
      <NotificationCard
        id="multi-2"
        type="error"
        variant="inline"
        title="A Very Short Alert Title"
        message=""
        actionText="Action"
        onAction={() => alert('Action 2')}
        onDismiss={() => alert('Dismiss 2')}
      />
      <NotificationCard
        id="multi-3"
        type="warning"
        variant="inline"
        title="A Very Short Alert Title"
        message=""
        actionText="Action"
        onAction={() => alert('Action 3')}
        onDismiss={() => alert('Dismiss 3')}
      />
      <NotificationCard
        id="multi-4"
        type="success"
        variant="inline"
        title="A Very Short Alert Title"
        message=""
        actionText="Action"
        onAction={() => alert('Action 4')}
        onDismiss={() => alert('Dismiss 4')}
      />
    </div>
  )
}

export const CardWithChip: Story = {
  args: {
    id: 'chip-notification',
    type: 'info',
    title: 'This POS Terminal is Uninsured!',
    message: 'In the case where the terminal gets faulty, lost or stolen, you\'ll have to pay ₦30,000.',
    actionText: 'Button',
    onAction: () => alert('Button clicked'),
    onDismiss: () => alert('Dismissed')
  }
}
