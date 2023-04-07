import { render, screen, fireEvent } from '@testing-library/react'
import { BasicCard } from './BasicCard'

describe('BasicCard', () => {
  it('renders card with children', () => {
    render(<BasicCard>Card content</BasicCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with header and footer', () => {
    render(
      <BasicCard 
        header="Card Header" 
        footer="Card Footer"
      >
        Card body content
      </BasicCard>
    )
    
    expect(screen.getByText('Card Header')).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    render(<BasicCard data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200')
  })

  it('applies outlined variant when specified', () => {
    render(<BasicCard variant="outlined" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'border-2', 'border-gray-300')
  })

  it('applies elevated variant when specified', () => {
    render(<BasicCard variant="elevated" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white', 'shadow-lg', 'border', 'border-gray-100')
  })

  it('applies filled variant when specified', () => {
    render(<BasicCard variant="filled" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-gray-50', 'border', 'border-gray-200')
  })

  it('applies medium size by default', () => {
    render(<BasicCard data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('max-w-md')
  })

  it('applies small size when specified', () => {
    render(<BasicCard size="small" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('max-w-sm')
  })

  it('applies large size when specified', () => {
    render(<BasicCard size="large" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('max-w-lg')
  })

  it('applies medium padding by default', () => {
    render(<BasicCard data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('p-4')
  })

  it('applies small padding when specified', () => {
    render(<BasicCard padding="small" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('p-3')
  })

  it('applies large padding when specified', () => {
    render(<BasicCard padding="large" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('p-6')
  })

  it('applies no padding when specified', () => {
    render(<BasicCard padding="none" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).not.toHaveClass('p-3', 'p-4', 'p-6')
  })

  it('applies medium radius by default', () => {
    render(<BasicCard data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('rounded-md')
  })

  it('applies different radius options', () => {
    const { rerender } = render(<BasicCard radius="none" data-testid="card">Content</BasicCard>)
    expect(screen.getByTestId('card')).toHaveClass('rounded-none')

    rerender(<BasicCard radius="small" data-testid="card">Content</BasicCard>)
    expect(screen.getByTestId('card')).toHaveClass('rounded-sm')

    rerender(<BasicCard radius="large" data-testid="card">Content</BasicCard>)
    expect(screen.getByTestId('card')).toHaveClass('rounded-lg')

    rerender(<BasicCard radius="full" data-testid="card">Content</BasicCard>)
    expect(screen.getByTestId('card')).toHaveClass('rounded-xl')
  })

  it('applies clickable styles when clickable', () => {
    render(<BasicCard clickable data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('cursor-pointer', 'hover:shadow-md', 'transition-shadow')
  })

  it('handles click events when clickable', () => {
    const handleClick = jest.fn()
    render(
      <BasicCard clickable onClick={handleClick} data-testid="card">
        Content
      </BasicCard>
    )
    
    fireEvent.click(screen.getByTestId('card'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<BasicCard className="custom-class" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('applies custom header className', () => {
    render(
      <BasicCard 
        header="Header" 
        headerClassName="custom-header" 
        data-testid="card"
      >
        Content
      </BasicCard>
    )
    const header = screen.getByText('Header')
    expect(header).toHaveClass('custom-header')
  })

  it('applies custom body className', () => {
    render(
      <BasicCard 
        header="Header"
        bodyClassName="custom-body" 
        data-testid="card"
      >
        <div data-testid="content">Content</div>
      </BasicCard>
    )
    const content = screen.getByTestId('content')
    const body = content.parentElement
    expect(body).toHaveClass('custom-body')
  })

  it('applies custom footer className', () => {
    render(
      <BasicCard 
        footer="Footer" 
        footerClassName="custom-footer" 
        data-testid="card"
      >
        Content
      </BasicCard>
    )
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('custom-footer')
  })

  it('forwards additional props to card element', () => {
    render(<BasicCard data-custom="test" data-testid="card">Content</BasicCard>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-custom', 'test')
  })

  it('handles padding correctly with header and footer', () => {
    render(
      <BasicCard 
        header="Header"
        footer="Footer"
        padding="large"
        data-testid="card"
      >
        Content
      </BasicCard>
    )
    
    const card = screen.getByTestId('card')
    // Should not have main padding when header/footer present
    expect(card).not.toHaveClass('p-6')
    
    // Header should have appropriate padding
    const header = screen.getByText('Header')
    expect(header).toHaveClass('px-6', 'pt-6', 'pb-4')
    
    // Footer should have appropriate padding
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('px-6', 'pt-4', 'pb-6')
  })

  it('renders React nodes as header and footer', () => {
    const headerNode = <div data-testid="header-node">Complex Header</div>
    const footerNode = <div data-testid="footer-node">Complex Footer</div>
    
    render(
      <BasicCard header={headerNode} footer={footerNode}>
        Content
      </BasicCard>
    )
    
    expect(screen.getByTestId('header-node')).toBeInTheDocument()
    expect(screen.getByTestId('footer-node')).toBeInTheDocument()
  })

  it('applies border classes to header and footer', () => {
    render(
      <BasicCard header="Header" footer="Footer">
        Content
      </BasicCard>
    )
    
    const header = screen.getByText('Header')
    expect(header).toHaveClass('border-b', 'border-gray-100')
    
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('border-t', 'border-gray-100')
  })
})
