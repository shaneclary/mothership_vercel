# Mothership - Postpartum Meal Delivery Web App

A comprehensive web application for **Mothership**, a postpartum meal delivery service that nourishes new mothers with wholesome, frozen meals inspired by ancient postpartum care traditions.

## 🌟 Features

### Enhanced Shopping Experience
- **Quantity Selector**: Minus/Number/Plus buttons for each meal (default 0)
- **Build Your Own Package**: Integrated directly into the meals page when 5+ meals are selected
- **Smart Progress Tracking**: Visual indicators showing minimum order progress and discount tiers
- **Tiered Discounts**: 5% off at 8 meals, 10% off at 12 meals, 15% off at 15+ meals

### Membership Features
- **Enhanced Member Dashboard**: One-off orders and subscription management
- **Subscription Management**: Modify meal quantities, delivery frequency, and meal selections
- **Digital Resources**: PDF guides, audio meditations, and nutrition resources
- **Events & Classes**: Workshop registration and virtual class access
- **Referral Program**: Code generation and rewards tracking

### Core Functionality
- **12 Curated Meals**: Broths, soups, and full meals with detailed nutrition info
- **4 Meal Packages**: Pre-curated collections with savings
- **5-Meal Minimum**: Enforced with progress indicators
- **Responsive Design**: Mobile-first approach with beautiful UI
- **State Management**: Zustand with localStorage persistence

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Cedarville Cursive + Inter)
- **TypeScript**: Full type safety throughout

## 🎨 Design System

### Color Palette
- **Sage**: #A6B8A0 (Primary brand color)
- **Dusty Rose**: #D6AFA3 (Secondary accent)
- **Terracotta**: #CBA392 (Highlight color)
- **Cream**: #F9F6F1 (Background)
- **Charcoal**: #4B4B4B (Text)

### Typography
- **Cedarville Cursive**: Brand headers and special text
- **Inter**: Body text and UI elements

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eatmothership
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with compelling messaging
- Brand story and mission
- How it works (3-step process)
- Featured meals carousel
- Membership benefits
- Customer testimonials
- Email signup

### Meals Page (`/meals`)
- Search and filter functionality
- Enhanced quantity selectors (- [0] +)
- Progress indicator for minimum orders
- Package builder integration
- Tiered discount messaging
- Responsive grid layout

### Packages Page (`/packages`)
- Pre-curated meal packages
- Package comparison and benefits
- Custom package CTA
- Value proposition messaging

### Cart Page (`/cart`)
- Item management with quantity controls
- Progress tracking
- Order summary with tax calculation
- Minimum order enforcement
- Continue shopping options

### About Page (`/about`)
- Company story and mission
- Team information
- Process explanation
- Values and commitment

### Contact Page (`/contact`)
- Contact form with validation
- Business information
- FAQ section
- Multiple contact methods

## 🎯 Key Enhancements Implemented

### 1. Enhanced Quantity Selector
- Replaced simple "+" buttons with full quantity controls
- Default state is 0 (not 1)
- Minus button disabled when quantity is 0
- Smooth animations and visual feedback

### 2. Build Your Own Package Integration
- Triggered when user has 5+ meals in cart
- Prominent CTA on meals page
- Modal interface for package creation
- Real-time savings calculation
- Integration with existing cart system

### 3. Smart Progress System
- Visual progress bar for minimum order
- Dynamic messaging based on current state
- Next tier savings information
- Discount tier visualization

### 4. Enhanced Member Dashboard
- One-off ordering capability
- Subscription management interface
- Meal selection and quantity controls
- Delivery frequency modification
- Plan upgrade/downgrade options

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion integration
- **Loading States**: Skeleton loaders and transitions
- **Error Handling**: Comprehensive error boundaries
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading

## 📊 State Management

The application uses Zustand for state management with the following stores:

- **App Store**: Cart items, user state, UI state, package builder
- **Persistent Storage**: Cart and user data saved to localStorage
- **Helper Functions**: Discount calculations, progress tracking

## 🔧 Customization

### Adding New Meals
1. Update `mockMeals` array in `src/lib/mock-data.ts`
2. Ensure proper TypeScript types in `src/types/index.ts`
3. Test quantity selector and cart functionality

### Modifying Discount Tiers
1. Update `getDiscountTier` function in `src/lib/store.ts`
2. Adjust progress indicator messaging
3. Update UI components accordingly

### Styling Changes
1. Modify color palette in `tailwind.config.ts`
2. Update CSS variables in `globals.css`
3. Adjust component styles as needed

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://eatmothership.com
# Add other environment variables as needed
```

## 📈 Performance Optimizations

- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic with Next.js App Router
- **Bundle Analysis**: Built-in Next.js bundle analyzer
- **Caching**: Strategic use of localStorage and React state
- **SEO**: Comprehensive meta tags and structured data

## 🔒 Security Considerations

- **Input Validation**: Form validation with Zod schemas
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection
- **Environment Variables**: Secure handling of sensitive data

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.

---

**Mothership** - Nourishing new mothers with the wisdom of traditional postpartum care, delivered with modern convenience.