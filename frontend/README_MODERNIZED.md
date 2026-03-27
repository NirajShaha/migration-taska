# WVTA CoC Frontend - Modern UI v2.0

Modern, full-stack web application with latest Next.js, React, and shadcn/ui components.

## 🚀 What's New

### UI Framework Upgrade
- **Next.js 14.2** - Latest version with improved performance
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui Components** - Beautifully designed, accessible components
- **Lucide Icons** - Modern icon library
- **React 18.3** - Latest stable version

### Enhanced Design
- Modern gradient header and footer
- Card-based responsive layout
- Color-coded form sections (Blue, Indigo, Purple, Green, Cyan, Orange, Red)
- Smooth animations and transitions
- Better mobile responsiveness (768px breakpoint)
- Professional alerts and status messages

### Component Library
- `Button` - Multiple variants (default, outline, secondary, ghost, link)
- `Input` - Styled text inputs
- `Label` - Form labels
- `Card` - Container components (CardHeader, CardContent, CardFooter, CardTitle, CardDescription)
- `Alert` - Alert components (success, destructive, warning)
- `Select` - Dropdown selects
- `Badge` - Tag/badge components

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

```bash
cd frontend

# Install dependencies
npm install

# Or with yarn
yarn install
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
# App runs on http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (modernized)
│   │   └── globals.css        # Tailwind directives & CSS variables
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── card.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   └── UnifiedCoCAForm.tsx # Main form component
│   └── lib/
│       ├── api.ts             # API client
│       ├── schemas.ts         # Zod validation schemas
│       └── utils.ts           # Utility functions (cn)
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (600-700) - Main actions
- **Secondary**: Indigo - Secondary actions
- **Backgrounds**: Gradient (Slate 50 to 100)
- **Cards**: With hover shadow transitions
- **Sections**: Color-coded by purpose:
  - Blue: Type Identification
  - Indigo: Type Approval
  - Purple: Axles Configuration
  - Green: Position & Interconnection
  - Cyan: Vehicle Dimensions
  - Orange: Body Classification
  - Red: System Fields

### Responsive Grid
- **Mobile**: 1 column
- **Tablet**: 2-3 columns (768px breakpoint)
- **Desktop**: 2-3 columns with max-width container

### Interactive Elements
- Loading states on buttons
- Error/Success alerts with icons
- Field-level error indicators
- Smooth animations (fadeIn, slideDown, pulse-soft)

## 🔧 Configuration

### Tailwind CSS
Configured in `tailwind.config.ts` with:
- CSS custom properties for theming
- Extended colors and animations
- Container queries support
- Dark mode support (class-based)

### PostCSS
Configured in `postcss.config.mjs` with:
- Tailwind CSS processor
- Autoprefixer for vendor prefixes

## 📝 Form Components

### UnifiedCoCAForm
Main form component with sections:
1. **Type Identification** - Read-only vehicle info
2. **Type Approval** - Approval details
3. **Axles Configuration** - Wheel specifications
4. **Position & Interconnection** - System config
5. **Vehicle Dimensions** - Physical measurements
6. **Body Classification** - Vehicle class info
7. **System Fields** - User and admin data

Features:
- Validation using React Hook Form + Zod
- Backend API integration
- Field-level error display
- Search/Lookup functionality
- Sample data pre-population

## 🎯 Development Workflow

### Adding New UI Components

1. Create component in `src/components/ui/[name].tsx`
2. Use shadcn-style patterns with CVA for variants
3. Use `cn()` utility for class merging
4. Export from component

Example:
```tsx
import { cn } from "@/lib/utils"

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MyComponent = ({ className, ...props }: MyComponentProps) => (
  <div className={cn("base-classes", className)} {...props} />
)

export { MyComponent }
```

### Styling with Tailwind

- Use utility classes (no CSS files needed)
- Use CSS variables for colors: `text-foreground`, `bg-background`
- Responsive prefixes: `md:`, `lg:`, `sm:`
- Dark mode: `dark:` prefix

### Form Validation

- Frontend: Zod schemas in `src/lib/schemas.ts`
- Backend: Java validators
- Error display: Field-level under each input

## 📦 Build & Deploy

### Build
```bash
npm run build
# Creates .next directory
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

### Deployment Options
- Vercel (recommended for Next.js)
- Netlify
- Docker
- Traditional hosting (Node.js 18+)

## 🧪 Type Safety

Full TypeScript support:
- `src/lib/schemas.ts` - Type exports from Zod
- Component props interfaces
- API response types
- Form data types

## 🔗 API Integration

API endpoints integration through `src/lib/api.ts`:
- `lookupUnifiedVariant()` - Search variants
- `validateUnifiedVariant()` - Validate fields
- `updateUnifiedVariant()` - Save changes
- `checkUnifiedServiceHealth()` - Health check

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zod Validation](https://zod.dev)
- [Lucide Icons](https://lucide.dev)

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Tailwind Classes Not Applied
- Run `npm install`
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

### API Connection Issues
- Verify backend is running on port 8081
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration on backend

## 📄 License

© 2024 WVTA System - All rights reserved

## Version History

**v2.0.0** (Current)
- Modernized with Next.js 14, React 18, Tailwind CSS 3
- Full shadcn/ui component library
- Enhanced responsive design
- Improved UX with better animations

**v1.0.0**
- Initial implementation with basic styling
