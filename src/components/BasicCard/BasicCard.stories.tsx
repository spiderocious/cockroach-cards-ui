import type { Meta, StoryObj } from '@storybook/react'
import { BasicCard } from './BasicCard'

const meta = {
  title: 'Components/BasicCard',
  component: BasicCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'full'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof BasicCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a basic card with default styling.',
  },
}

export const WithHeader: Story = {
  args: {
    header: 'Card Header',
    children: 'This card has a header section that can contain any React content.',
  },
}

export const WithFooter: Story = {
  args: {
    children: 'This card has a footer section for actions or additional information.',
    footer: 'Card Footer',
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Complete Card',
    children: 'This card demonstrates all three sections: header, body, and footer.',
    footer: 'Card Footer',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    header: 'Outlined Card',
    children: 'This card uses the outlined variant with a thicker border.',
    footer: 'Actions',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    header: 'Elevated Card',
    children: 'This card uses the elevated variant with a shadow effect.',
    footer: 'Elevated styling',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    header: 'Filled Card',
    children: 'This card uses the filled variant with a subtle background color.',
    footer: 'Filled styling',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    header: 'Small Card',
    children: 'This is a small-sized card.',
    footer: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    header: 'Large Card',
    children: 'This is a large-sized card with more space for content.',
    footer: 'Large size',
  },
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: 'This card has no internal padding.',
  },
}

export const LargePadding: Story = {
  args: {
    padding: 'large',
    header: 'Spacious Card',
    children: 'This card has large padding for a more spacious feel.',
    footer: 'Large padding',
  },
}

export const FullRadius: Story = {
  args: {
    radius: 'full',
    header: 'Rounded Card',
    children: 'This card has maximum border radius for a pill-like appearance.',
    footer: 'Full radius',
  },
}

export const NoRadius: Story = {
  args: {
    radius: 'none',
    header: 'Sharp Card',
    children: 'This card has no border radius for sharp, clean edges.',
    footer: 'No radius',
  },
}

export const Clickable: Story = {
  args: {
    clickable: true,
    header: 'Clickable Card',
    children: 'This card is clickable and shows hover effects. Try hovering over it!',
    footer: 'Click me',
  },
}

export const ComplexContent: Story = {
  args: {
    variant: 'elevated',
    header: (
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Complex Header</h3>
        <span className="text-sm text-gray-500">Badge</span>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <p>This card demonstrates complex React content in all sections.</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Tag 1</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Tag 2</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex justify-between items-center">
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
          Action
        </button>
        <span className="text-xs text-gray-500">Updated 2 hours ago</span>
      </div>
    ),
  },
}

export const AllVariants: Story = {
  args: {
    children: 'Content'
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <BasicCard variant="default" header="Default">
        Default variant card with standard styling.
      </BasicCard>
      <BasicCard variant="outlined" header="Outlined">
        Outlined variant with thicker border.
      </BasicCard>
      <BasicCard variant="elevated" header="Elevated">
        Elevated variant with shadow effect.
      </BasicCard>
      <BasicCard variant="filled" header="Filled">
        Filled variant with background color.
      </BasicCard>
    </div>
  ),
}

export const AllSizes: Story = {
  args: {
    children: 'Content'
  },
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <BasicCard size="small" header="Small">
        Small sized card
      </BasicCard>
      <BasicCard size="medium" header="Medium">
        Medium sized card (default)
      </BasicCard>
      <BasicCard size="large" header="Large">
        Large sized card with more width
      </BasicCard>
    </div>
  ),
}

export const AllPadding: Story = {
  args: {
    children: 'Content'
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <BasicCard padding="none" variant="outlined">
        No padding
      </BasicCard>
      <BasicCard padding="small" variant="outlined">
        Small padding
      </BasicCard>
      <BasicCard padding="medium" variant="outlined">
        Medium padding (default)
      </BasicCard>
      <BasicCard padding="large" variant="outlined">
        Large padding
      </BasicCard>
    </div>
  ),
}

export const AllRadius: Story = {
  args: {
    children: 'Content'
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <BasicCard radius="none" variant="outlined">
        No radius
      </BasicCard>
      <BasicCard radius="small" variant="outlined">
        Small radius
      </BasicCard>
      <BasicCard radius="medium" variant="outlined">
        Medium radius
      </BasicCard>
      <BasicCard radius="large" variant="outlined">
        Large radius
      </BasicCard>
      <BasicCard radius="full" variant="outlined">
        Full radius
      </BasicCard>
    </div>
  ),
}
