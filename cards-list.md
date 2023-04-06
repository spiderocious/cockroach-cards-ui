# Cockroach UI Cards - Card Design Specifications

A comprehensive collection of card components designed for different use cases in modern web applications.

## Card Types Overview

### 1. BasicCard
**Purpose**: Simple content container with optional header, body, and footer sections.
**Why Different**: Minimal structure for general-purpose content display, maximum flexibility.

**Props:**
```typescript
interface BasicCardProps {
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
  onClick?: () => void
  onHover?: () => void
  clickable?: boolean
  
  // Base Props
  id?: string
  'data-testid'?: string
}
```

### 2. ProductCard
**Purpose**: E-commerce product display with image, price, and action buttons.
**Why Different**: Specialized layout for product information, pricing, and purchase actions.

**Props:**
```typescript
interface ProductCardProps {
  // Product Data
  image: string | React.ReactNode
  title: string | React.ReactNode
  description?: string | React.ReactNode
  price: string | React.ReactNode
  originalPrice?: string | React.ReactNode
  rating?: number
  reviewCount?: number
  badge?: string | React.ReactNode
  
  // Actions
  onAddToCart?: () => void
  onQuickView?: () => void
  onWishlist?: () => void
  addToCartText?: string | React.ReactNode
  
  // Icons
  cartIcon?: React.ReactNode
  wishlistIcon?: React.ReactNode
  eyeIcon?: React.ReactNode
  starIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed'
  imageAspectRatio?: 'square' | '4:3' | '3:2' | '16:9'
  showQuickActions?: boolean
  
  // Customization
  className?: string
  imageClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  priceClassName?: string
  originalPriceClassName?: string
  badgeClassName?: string
  ratingClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 3. ProfileCard
**Purpose**: User profile display with avatar, bio, and social actions.
**Why Different**: Focused on personal information presentation and social interactions.

**Props:**
```typescript
interface ProfileCardProps {
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
  variant?: 'default' | 'compact' | 'detailed'
  avatarSize?: 'small' | 'medium' | 'large'
  showStats?: boolean
  showSocial?: boolean
  
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
  onClick?: () => void
}
```

### 4. StatCard
**Purpose**: Display key metrics and statistics with visual emphasis.
**Why Different**: Optimized for data visualization with prominent numbers and trends.

**Props:**
```typescript
interface StatCardProps {
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
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  
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
  variant?: 'default' | 'minimal' | 'detailed'
  size?: 'small' | 'medium' | 'large'
  showTrend?: boolean
  animated?: boolean
  
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
```

### 5. ArticleCard
**Purpose**: Blog posts and articles with featured image and metadata.
**Why Different**: Content-focused with reading metadata like date, author, and tags.

**Props:**
```typescript
interface ArticleCardProps {
  // Article Data
  image?: string | React.ReactNode
  title: string | React.ReactNode
  excerpt?: string | React.ReactNode
  author?: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
  }
  publishDate?: Date | string | React.ReactNode
  readTime?: string | React.ReactNode
  category?: string | React.ReactNode
  tags?: string[]
  
  // Actions
  onRead?: () => void
  onShare?: () => void
  onBookmark?: () => void
  onLike?: () => void
  
  // State
  isBookmarked?: boolean
  isLiked?: boolean
  likeCount?: number
  
  // Icons
  shareIcon?: React.ReactNode
  bookmarkIcon?: React.ReactNode
  heartIcon?: React.ReactNode
  timeIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'horizontal' | 'minimal'
  imagePosition?: 'top' | 'left' | 'right'
  showImage?: boolean
  showAuthor?: boolean
  showMeta?: boolean
  
  // Customization
  className?: string
  imageClassName?: string
  contentClassName?: string
  titleClassName?: string
  excerptClassName?: string
  authorClassName?: string
  metaClassName?: string
  tagsClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 6. NotificationCard
**Purpose**: System notifications and alerts with priority indicators.
**Why Different**: Designed for temporal information with urgency levels and action buttons.

**Props:**
```typescript
interface NotificationCardProps {
  // Notification Data
  title: string | React.ReactNode
  message: string | React.ReactNode
  timestamp?: Date | string | React.ReactNode
  
  // Type & Priority
  type?: 'info' | 'success' | 'warning' | 'error'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  
  // Visual Elements
  icon?: React.ReactNode
  avatar?: string | React.ReactNode
  
  // Actions
  onDismiss?: () => void
  onAction?: () => void
  actionText?: string | React.ReactNode
  
  // State
  isRead?: boolean
  isDismissible?: boolean
  
  // Icons
  closeIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'toast' | 'banner'
  showTimestamp?: boolean
  autoHide?: boolean
  hideDelay?: number
  
  // Customization
  className?: string
  headerClassName?: string
  iconClassName?: string
  avatarClassName?: string
  titleClassName?: string
  messageClassName?: string
  timestampClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
}
```

### 7. MediaCard
**Purpose**: Video, audio, and rich media content with playback controls.
**Why Different**: Specialized for media content with embedded controls and metadata.

**Props:**
```typescript
interface MediaCardProps {
  // Media Data
  src: string
  type: 'video' | 'audio' | 'image'
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  duration?: string | React.ReactNode
  thumbnail?: string | React.ReactNode
  
  // Media Controls
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  
  // Actions
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onShare?: () => void
  onDownload?: () => void
  
  // Icons
  playIcon?: React.ReactNode
  pauseIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  downloadIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'detailed'
  aspectRatio?: 'square' | '4:3' | '16:9' | '21:9'
  showControls?: boolean
  showMeta?: boolean
  
  // Customization
  className?: string
  mediaClassName?: string
  overlayClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  controlsClassName?: string
  metaClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 8. ContactCard
**Purpose**: Contact information display with communication actions.
**Why Different**: Focused on contact details and quick communication methods.

**Props:**
```typescript
interface ContactCardProps {
  // Contact Data
  name: string | React.ReactNode
  title?: string | React.ReactNode
  company?: string | React.ReactNode
  avatar?: string | React.ReactNode
  
  // Contact Information
  email?: string
  phone?: string
  address?: string | React.ReactNode
  website?: string
  
  // Social/Professional Links
  linkedin?: string
  twitter?: string
  github?: string
  
  // Actions
  onCall?: () => void
  onEmail?: () => void
  onMessage?: () => void
  onVideoCall?: () => void
  
  // Icons
  phoneIcon?: React.ReactNode
  emailIcon?: React.ReactNode
  messageIcon?: React.ReactNode
  videoIcon?: React.ReactNode
  locationIcon?: React.ReactNode
  websiteIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'compact' | 'business'
  layout?: 'vertical' | 'horizontal'
  showAllContacts?: boolean
  
  // Customization
  className?: string
  headerClassName?: string
  avatarClassName?: string
  nameClassName?: string
  titleClassName?: string
  companyClassName?: string
  contactsClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 9. PricingCard
**Purpose**: Subscription plans and pricing tiers with feature comparisons.
**Why Different**: Optimized for plan comparison with prominent pricing and feature lists.

**Props:**
```typescript
interface PricingCardProps {
  // Plan Data
  planName: string | React.ReactNode
  price: string | React.ReactNode
  billing?: string | React.ReactNode
  description?: string | React.ReactNode
  
  // Features
  features: Array<{
    text: string | React.ReactNode
    included: boolean
    icon?: React.ReactNode
  }>
  
  // Badges & Labels
  badge?: string | React.ReactNode
  popular?: boolean
  recommended?: boolean
  
  // Actions
  onSelect?: () => void
  onLearnMore?: () => void
  selectText?: string | React.ReactNode
  learnMoreText?: string | React.ReactNode
  
  // Icons
  checkIcon?: React.ReactNode
  crossIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'highlighted' | 'minimal'
  currency?: string
  billingCycle?: 'monthly' | 'yearly' | 'custom'
  
  // Customization
  className?: string
  headerClassName?: string
  planNameClassName?: string
  priceClassName?: string
  billingClassName?: string
  descriptionClassName?: string
  badgeClassName?: string
  featuresClassName?: string
  featureClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
}
```

### 10. EventCard
**Purpose**: Event information with date, location, and RSVP functionality.
**Why Different**: Time-sensitive content with location data and attendance actions.

**Props:**
```typescript
interface EventCardProps {
  // Event Data
  title: string | React.ReactNode
  description?: string | React.ReactNode
  image?: string | React.ReactNode
  
  // Date & Time
  startDate: Date | string
  endDate?: Date | string
  timeZone?: string
  
  // Location
  location?: {
    name: string | React.ReactNode
    address?: string | React.ReactNode
    coordinates?: { lat: number; lng: number }
  }
  
  // Event Details
  organizer?: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
  }
  attendees?: number
  maxAttendees?: number
  tags?: string[]
  
  // Actions
  onRSVP?: () => void
  onShare?: () => void
  onAddToCalendar?: () => void
  onGetDirections?: () => void
  
  // State
  rsvpStatus?: 'going' | 'maybe' | 'not-going' | 'none'
  
  // Icons
  calendarIcon?: React.ReactNode
  locationIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  directionsIcon?: React.ReactNode
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed'
  showAttendees?: boolean
  showOrganizer?: boolean
  
  // Customization
  className?: string
  imageClassName?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  dateClassName?: string
  locationClassName?: string
  organizerClassName?: string
  attendeesClassName?: string
  tagsClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

## Common Props Across All Cards

### Base Styling Props
- `className?: string` - Root container styling
- `id?: string` - Element ID
- `data-testid?: string` - Testing identifier

### Interaction Props
- `onClick?: () => void` - Click handler
- `onHover?: () => void` - Hover handler
- `clickable?: boolean` - Whether the card is clickable

### Visual Variant Props
- `variant?: string` - Style variations
- `size?: 'small' | 'medium' | 'large'` - Size variants
- `padding?: 'none' | 'small' | 'medium' | 'large'` - Internal spacing
- `radius?: 'none' | 'small' | 'medium' | 'large' | 'full'` - Border radius

## Design Principles

### 1. Maximum Customizability
- Every visual element has its own className prop
- Support for both string and ReactNode content
- Flexible icon system using ReactNode
- Comprehensive prop interface for all variations

### 2. Consistent API
- Shared base props across all card types
- Predictable naming conventions
- Optional props with sensible defaults
- TypeScript support for type safety

### 3. Accessibility
- Proper semantic markup
- Keyboard navigation support
- Screen reader compatibility
- ARIA attributes where needed

### 4. Performance
- Lightweight components
- Tree-shakeable exports
- Minimal re-renders
- Optimized for large lists

### 11. TestimonialCard
**Purpose**: Customer reviews and testimonials with ratings and author attribution.
**Why Different**: Focuses on social proof with prominent quotes, ratings, and credibility indicators.

**Props:**
```typescript
interface TestimonialCardProps {
  // Testimonial Data
  quote: string | React.ReactNode
  author: {
    name: string | React.ReactNode
    title?: string | React.ReactNode
    company?: string | React.ReactNode
    avatar?: string | React.ReactNode
  }
  
  // Rating
  rating?: number
  maxRating?: number
  
  // Visual Elements
  quoteIcon?: React.ReactNode
  starIcon?: React.ReactNode
  
  // Actions
  onViewProfile?: () => void
  onShare?: () => void
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'featured' | 'card-style'
  quoteStyle?: 'large' | 'normal' | 'italic'
  showQuotes?: boolean
  showRating?: boolean
  
  // Customization
  className?: string
  quoteClassName?: string
  authorClassName?: string
  avatarClassName?: string
  nameClassName?: string
  titleClassName?: string
  companyClassName?: string
  ratingClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 12. FeatureCard
**Purpose**: Product features and benefits with visual highlights.
**Why Different**: Emphasizes features with icons, benefits, and call-to-action elements.

**Props:**
```typescript
interface FeatureCardProps {
  // Feature Data
  icon?: React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  benefits?: string[] | React.ReactNode[]
  
  // Visual Elements
  image?: string | React.ReactNode
  gradient?: string
  color?: string
  
  // Actions
  onLearnMore?: () => void
  onTryFeature?: () => void
  learnMoreText?: string | React.ReactNode
  tryFeatureText?: string | React.ReactNode
  
  // State
  isNew?: boolean
  isPopular?: boolean
  isComingSoon?: boolean
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'highlighted' | 'glass' | 'gradient'
  iconSize?: 'small' | 'medium' | 'large'
  layout?: 'vertical' | 'horizontal'
  
  // Customization
  className?: string
  headerClassName?: string
  iconClassName?: string
  imageClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  benefitsClassName?: string
  actionsClassName?: string
  badgeClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 13. TeamMemberCard
**Purpose**: Team member profiles with roles and social links.
**Why Different**: Professional presentation with role emphasis and team-specific actions.

**Props:**
```typescript
interface TeamMemberCardProps {
  // Member Data
  avatar: string | React.ReactNode
  name: string | React.ReactNode
  role: string | React.ReactNode
  department?: string | React.ReactNode
  bio?: string | React.ReactNode
  
  // Skills & Expertise
  skills?: string[]
  expertise?: string[]
  
  // Contact & Social
  email?: string
  phone?: string
  socialLinks?: Array<{
    platform: string
    url: string
    icon: React.ReactNode
  }>
  
  // Actions
  onContact?: () => void
  onViewProfile?: () => void
  onScheduleMeeting?: () => void
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'detailed' | 'business'
  layout?: 'vertical' | 'horizontal'
  showSkills?: boolean
  showSocial?: boolean
  showContact?: boolean
  
  // Customization
  className?: string
  avatarClassName?: string
  headerClassName?: string
  nameClassName?: string
  roleClassName?: string
  departmentClassName?: string
  bioClassName?: string
  skillsClassName?: string
  socialClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 14. CourseCard
**Purpose**: Educational courses with progress tracking and enrollment.
**Why Different**: Learning-focused with progress indicators, difficulty levels, and educational metadata.

**Props:**
```typescript
interface CourseCardProps {
  // Course Data
  title: string | React.ReactNode
  description?: string | React.ReactNode
  instructor: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
    rating?: number
  }
  thumbnail?: string | React.ReactNode
  
  // Course Details
  duration?: string | React.ReactNode
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  category?: string | React.ReactNode
  language?: string
  
  // Progress & Stats
  progress?: number
  studentsEnrolled?: number
  rating?: number
  reviewCount?: number
  
  // Pricing
  price?: string | React.ReactNode
  originalPrice?: string | React.ReactNode
  isFree?: boolean
  
  // Actions
  onEnroll?: () => void
  onPreview?: () => void
  onAddToWishlist?: () => void
  onShare?: () => void
  
  // State
  isEnrolled?: boolean
  isWishlisted?: boolean
  isCompleted?: boolean
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed' | 'horizontal'
  showProgress?: boolean
  showInstructor?: boolean
  showStats?: boolean
  
  // Icons
  playIcon?: React.ReactNode
  bookmarkIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  starIcon?: React.ReactNode
  
  // Customization
  className?: string
  thumbnailClassName?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  instructorClassName?: string
  metaClassName?: string
  progressClassName?: string
  priceClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 15. ProjectCard
**Purpose**: Project showcases with tech stack and collaboration details.
**Why Different**: Portfolio and development-focused with technical details and project status.

**Props:**
```typescript
interface ProjectCardProps {
  // Project Data
  title: string | React.ReactNode
  description: string | React.ReactNode
  image?: string | React.ReactNode
  
  // Technical Details
  techStack?: Array<{
    name: string
    icon?: React.ReactNode
    color?: string
  }>
  repository?: string
  liveDemo?: string
  
  // Project Status
  status?: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  progress?: number
  
  // Team & Collaboration
  contributors?: Array<{
    name: string
    avatar?: string | React.ReactNode
    role?: string
  }>
  
  // Stats
  stars?: number
  forks?: number
  issues?: number
  
  // Actions
  onViewProject?: () => void
  onViewCode?: () => void
  onViewDemo?: () => void
  onStar?: () => void
  onFork?: () => void
  
  // State
  isStarred?: boolean
  isForked?: boolean
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'showcase' | 'developer'
  showTechStack?: boolean
  showContributors?: boolean
  showStats?: boolean
  
  // Icons
  githubIcon?: React.ReactNode
  externalLinkIcon?: React.ReactNode
  starIcon?: React.ReactNode
  forkIcon?: React.ReactNode
  
  // Customization
  className?: string
  imageClassName?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  techStackClassName?: string
  statusClassName?: string
  progressClassName?: string
  contributorsClassName?: string
  statsClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 16. WeatherCard
**Purpose**: Weather information with forecasts and conditions.
**Why Different**: Data-heavy with visual weather representations and location-based information.

**Props:**
```typescript
interface WeatherCardProps {
  // Location
  location: string | React.ReactNode
  
  // Current Weather
  current: {
    temperature: number
    condition: string | React.ReactNode
    icon?: React.ReactNode
    humidity?: number
    windSpeed?: number
    feelsLike?: number
  }
  
  // Forecast
  forecast?: Array<{
    day: string | React.ReactNode
    high: number
    low: number
    condition: string
    icon?: React.ReactNode
  }>
  
  // Additional Data
  airQuality?: {
    index: number
    level: 'good' | 'moderate' | 'unhealthy'
  }
  uvIndex?: number
  sunrise?: string
  sunset?: string
  
  // Actions
  onRefresh?: () => void
  onViewDetails?: () => void
  onChangeLocation?: () => void
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'detailed' | 'compact'
  unit?: 'celsius' | 'fahrenheit'
  showForecast?: boolean
  showDetails?: boolean
  
  // Icons
  refreshIcon?: React.ReactNode
  locationIcon?: React.ReactNode
  
  // Customization
  className?: string
  headerClassName?: string
  locationClassName?: string
  currentClassName?: string
  temperatureClassName?: string
  conditionClassName?: string
  detailsClassName?: string
  forecastClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 17. RecipeCard
**Purpose**: Cooking recipes with ingredients and cooking information.
**Why Different**: Culinary-focused with cooking times, difficulty, and ingredient listings.

**Props:**
```typescript
interface RecipeCardProps {
  // Recipe Data
  title: string | React.ReactNode
  description?: string | React.ReactNode
  image: string | React.ReactNode
  
  // Cooking Details
  prepTime?: string | React.ReactNode
  cookTime?: string | React.ReactNode
  totalTime?: string | React.ReactNode
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  
  // Nutrition (optional)
  calories?: number
  nutrition?: Array<{
    name: string
    amount: string
    unit: string
  }>
  
  // Recipe Meta
  cuisine?: string
  category?: string
  dietary?: string[] // vegetarian, vegan, gluten-free, etc.
  
  // Chef/Author
  chef?: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
  }
  
  // Ratings & Social
  rating?: number
  reviewCount?: number
  
  // Actions
  onSave?: () => void
  onShare?: () => void
  onViewRecipe?: () => void
  onRate?: (rating: number) => void
  
  // State
  isSaved?: boolean
  userRating?: number
  
  // Visual Options
  variant?: 'default' | 'minimal' | 'detailed' | 'magazine'
  showNutrition?: boolean
  showChef?: boolean
  showRating?: boolean
  
  // Icons
  timeIcon?: React.ReactNode
  servingsIcon?: React.ReactNode
  bookmarkIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  starIcon?: React.ReactNode
  
  // Customization
  className?: string
  imageClassName?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  metaClassName?: string
  timeClassName?: string
  servingsClassName?: string
  difficultyClassName?: string
  chefClassName?: string
  ratingClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 18. GameCard
**Purpose**: Video games and gaming content with ratings and platform info.
**Why Different**: Gaming-focused with platform support, ratings, and gaming-specific metadata.

**Props:**
```typescript
interface GameCardProps {
  // Game Data
  title: string | React.ReactNode
  description?: string | React.ReactNode
  coverImage: string | React.ReactNode
  screenshots?: string[]
  
  // Game Details
  genre?: string | string[]
  platform?: string[]
  developer?: string | React.ReactNode
  publisher?: string | React.ReactNode
  releaseDate?: Date | string
  
  // Ratings & Reviews
  rating?: number
  ageRating?: string // E, T, M, etc.
  metaScore?: number
  userScore?: number
  
  // Pricing
  price?: string | React.ReactNode
  originalPrice?: string | React.ReactNode
  discount?: number
  isFree?: boolean
  
  // Gameplay
  multiplayer?: boolean
  singlePlayer?: boolean
  onlinePlay?: boolean
  
  // Actions
  onPlay?: () => void
  onWishlist?: () => void
  onShare?: () => void
  onViewTrailer?: () => void
  
  // State
  isInstalled?: boolean
  isWishlisted?: boolean
  isOwned?: boolean
  
  // Visual Options
  variant?: 'default' | 'compact' | 'showcase' | 'library'
  showScreenshots?: boolean
  showDetails?: boolean
  showRatings?: boolean
  
  // Icons
  playIcon?: React.ReactNode
  wishlistIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  trailerIcon?: React.ReactNode
  
  // Customization
  className?: string
  coverClassName?: string
  headerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  genreClassName?: string
  platformClassName?: string
  ratingClassName?: string
  priceClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 19. PropertyCard
**Purpose**: Real estate listings with property details and viewing options.
**Why Different**: Real estate-focused with property specifics, location data, and viewing actions.

**Props:**
```typescript
interface PropertyCardProps {
  // Property Data
  title: string | React.ReactNode
  address: string | React.ReactNode
  images: string[] | React.ReactNode[]
  
  // Property Details
  price: string | React.ReactNode
  bedrooms?: number
  bathrooms?: number
  area?: {
    value: number
    unit: 'sqft' | 'sqm'
  }
  propertyType?: 'house' | 'apartment' | 'condo' | 'townhouse'
  
  // Features
  features?: string[]
  amenities?: string[]
  
  // Location & Transport
  neighborhood?: string | React.ReactNode
  nearbySchools?: Array<{
    name: string
    distance: string
    rating?: number
  }>
  transportLinks?: string[]
  
  // Agent/Agency
  agent?: {
    name: string | React.ReactNode
    avatar?: string | React.ReactNode
    phone?: string
    agency?: string
  }
  
  // Actions
  onViewDetails?: () => void
  onScheduleViewing?: () => void
  onContactAgent?: () => void
  onSave?: () => void
  onShare?: () => void
  
  // State
  isSaved?: boolean
  isNewListing?: boolean
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed' | 'luxury'
  showAgent?: boolean
  showFeatures?: boolean
  showNearby?: boolean
  
  // Icons
  bedIcon?: React.ReactNode
  bathIcon?: React.ReactNode
  areaIcon?: React.ReactNode
  locationIcon?: React.ReactNode
  heartIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  
  // Customization
  className?: string
  imageClassName?: string
  headerClassName?: string
  titleClassName?: string
  addressClassName?: string
  priceClassName?: string
  detailsClassName?: string
  featuresClassName?: string
  agentClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

### 20. JobCard
**Purpose**: Job listings with application tracking and company information.
**Why Different**: Career-focused with salary, requirements, and application workflow integration.

**Props:**
```typescript
interface JobCardProps {
  // Job Data
  title: string | React.ReactNode
  company: {
    name: string | React.ReactNode
    logo?: string | React.ReactNode
    size?: string
    industry?: string
  }
  description?: string | React.ReactNode
  
  // Job Details
  location?: string | React.ReactNode
  workType?: 'remote' | 'hybrid' | 'on-site'
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience?: string | React.ReactNode
  
  // Compensation
  salary?: {
    min?: number
    max?: number
    currency?: string
    period?: 'hour' | 'month' | 'year'
  }
  benefits?: string[]
  
  // Requirements
  skills?: string[]
  requirements?: string[]
  education?: string
  
  // Application Info
  postedDate?: Date | string
  deadline?: Date | string
  applicants?: number
  
  // Actions
  onApply?: () => void
  onSave?: () => void
  onShare?: () => void
  onViewCompany?: () => void
  
  // State
  isApplied?: boolean
  isSaved?: boolean
  applicationStatus?: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted'
  
  // Visual Options
  variant?: 'default' | 'compact' | 'detailed' | 'premium'
  showSalary?: boolean
  showSkills?: boolean
  showBenefits?: boolean
  
  // Icons
  locationIcon?: React.ReactNode
  workTypeIcon?: React.ReactNode
  bookmarkIcon?: React.ReactNode
  shareIcon?: React.ReactNode
  
  // Customization
  className?: string
  headerClassName?: string
  companyClassName?: string
  logoClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  locationClassName?: string
  salaryClassName?: string
  skillsClassName?: string
  benefitsClassName?: string
  metaClassName?: string
  actionsClassName?: string
  
  // Base Props
  id?: string
  'data-testid'?: string
  onClick?: () => void
}
```

This expanded specification provides a comprehensive foundation for building a versatile card component library that can handle most common use cases while maintaining flexibility for custom implementations. The library now includes 20 distinct card types covering various domains from testimonials to real estate, each designed with beautiful, functional layouts and extensive customization options.
