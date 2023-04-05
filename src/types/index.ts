import React from 'react'

export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

export interface CardBaseProps extends BaseProps {
  id?: string
  'data-testid'?: string
}

export type Size = 'small' | 'medium' | 'large'
export type Variant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'

// Card-specific types
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'
export type CardPadding = 'none' | 'small' | 'medium' | 'large'
export type CardRadius = 'none' | 'small' | 'medium' | 'large' | 'full'