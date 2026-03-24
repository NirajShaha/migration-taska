# WVTA CoC Frontend - Next.js Application

Modern React-based frontend for WVTA Certificate of Conformity (CoC) management system.

## Quick Start

### Prerequisites
- Node.js 18+ (or 20+)
- npm or yarn

### Setup & Run

```bash
# Install dependencies
npm install

# Development server
npm run dev
# Access at http://localhost:3000

# Production build
npm run build
npm start

# Linting
npm run lint
```

## Environment Configuration

Create `.env.local`:
```bash
cp .env.example .env.local
```

Configure API endpoint:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main page with tab navigation
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── VariantForm.tsx    # Variant management form (HA003U)
│   └── TypeForm.tsx       # Type approval form
├── hooks/
│   └── useFieldValidation.ts  # Field validation logic
└── lib/
    ├── api.ts             # API client with TypeScript types
    └── schemas.ts         # Zod validation schemas
```

## Forms

### VariantForm (Screen HA003U - Variant Management)
- **Key Validation**:
  - Position: Max 21 chars, no commas
  - Interconnection: Max 40 chars, no commas
  - Wheelbase: "H" or 4 digits
  - Axle/Wheel: NTN format (digit-alphanumeric-digit)
  - Pos Wheel/Steer Axle: C or NCN format
  - Class: I, II, III, A, or B

- **Conditional Logic**:
  - If Powered Axles specified → Position + Interconnection required
  - CHIP Data flag: Disables all CoC fields when enabled
  - Manufacturer-specific: Some fields for Landrover (L) or Japan (J) only

- **Fields Updated**:
  - Variant attributes (position, wheelbase, track, length, width, height, overhang)
  - Vehicle dimensions (length with towbar)
  - Classifications (body type, class, doors)
  - Testing information (test method)
  - CoC nexus (CHIP data, tyre list, new model indicator)

### TypeForm (Screen HA003U - Type Approval)
- **Fields Updated**:
  - Approval number
  - Approval date (DD/MM/YYYY format)
  - Small series type application (Y/N)

## Validation

Client-side validation happens in two places:

### 1. Field-level (useFieldValidation Hook)
Real-time validation as user types:
```typescript
const { errors, validatePosition, validateClass, ... } = useFieldValidation();
```

### 2. Form-level (Zod Schemas)
Schema validation before submission:
```typescript
const schema = VariantFormSchema.parse(formData);
```

### 3. Server-level
Final validation in Spring Boot backend before database update.

## API Client

Typed Axios wrapper in `lib/api.ts`:
```typescript
// Variant operations
apiClient.lookupVariant(model, type, startDate, endDate, variant, manf)
apiClient.createVariant(request)
apiClient.updateVariant(model, type, startDate, endDate, variant, manf, request)

// Type operations
apiClient.lookupType(model, type, startDate, endDate, manf)
apiClient.updateTypeApproval(model, type, startDate, endDate, manf, request)

// VAC field updates
apiClient.updateVacField(model, type, startDate, endDate, variant, manf, fieldNo, subField, value, userId)

//COC field updates
apiClient.updateCocField(model, type, startDate, endDate, manf, fieldNo, subField, country, value, userId)
```

## UI Features

- **Tab Navigation**: Switch between Variant and Type forms
- **Field Groups**: Organized by functional sections
- **Real-time Errors**: Immediate feedback on invalid input
- **Loading States**: Disabled submit button during API calls
- **Success Messages**: Confirmation after successful updates
- **CHIP Data Control**: Checkbox to enable/disable CoC fields
- **Disabled Fields**: Fields automatically disabled based on system state

## Dependencies

- **react**: UI library
- **react-dom**: DOM rendering
- **next**: Framework
- **axios**: HTTP client
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@hookform/resolvers**: Zod integration with React Hook Form
- **date-fns**: Date utilities

Dev dependencies:
- **typescript**: Type safety
- **eslint**: Code linting
- **next/eslint-config**: NextJS linting rules

## Styling

Basic CSS styling in `src/app/globals.css`:
- Form inputs with focus states
- Button styling with hover effects
- Color scheme: Blue (#0056b3) and dark blue (#003366)
- Responsive fieldsets and legends
- Error message highlighting (red)

Can be extended with:
- Tailwind CSS
- CSS Modules
- Styled Components
- shadcn/ui

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Next.js 14 automatic code splitting
- React Hook Form minimal re-renders
- Client-side validation to reduce server calls
- Image optimization (if added)
- CSS minification in production

## Error Handling

Errors displayed to user:
- Validation errors: Per-field error messages
- API errors: Toast or banner message
- Network errors: Connection failure message

Example flow:
```
User input → Field validation → Form validation → API request
                                                      ↓
                                          Server validation → Success/Error
```

## Development Tips

1. **Debug API calls**: Check browser DevTools Network tab
2. **Form state**: React Hook Form DevTools (if installed)
3. **API client**: Check `lib/api.ts` for endpoint URLs
4. **Validation schemas**: Update `lib/schemas.ts` for new fields
5. **Type safety**: Interfaces in `lib/api.ts` ensure type checking

## Testing

Manual testing checklist:
- [ ] Create new variant
- [ ] Update existing variant
- [ ] Validation errors display correctly
- [ ] CHIP Data flag disables fields
- [ ] Powered axles requirement enforced
- [ ] Type approval updates
- [ ] API calls succeed/fail appropriately
- [ ] Timestamps update on save
- [ ] Form resets after successful submit

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
# Build
docker build -t wvta-coc-frontend:1.0.0 .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://api:8080/api \
  wvta-coc-frontend:1.0.0
```

### Static Export (if no dynamic features)
```bash
# In next.config.js
export const output = 'export';

npm run build
# Upload 'out' directory to static hosting
```

### Traditional Node.js Server
```bash
npm run build
npm start
# Server runs on port 3000
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080/api` | Backend API endpoint |

## Troubleshooting

### API Connection Issues
```bash
# Check backend is running
curl http://localhost:8080/api/types/lookup

# Update .env.local if API URL is different
NEXT_PUBLIC_API_BASE_URL=http://your-api-server:8080/api
```

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Form Validation Not Working
- Check console for TypeScript errors
- Verify Zod schema matches form fields
- Ensure form field names match schema

### Styles Not Applied
- CSS is in `src/app/globals.css`
- Check if CSS is imported in layout.tsx
- Clear Next.js cache: `rm -rf .next`

## Future Enhancements

1. **Component Library**: Implement shadcn/ui or Material-UI
2. **State Management**: Add Redux/Zustand for complex state
3. **Charts/Dashboards**: Visualize data with Recharts
4. **Internationalization**: i18n for multiple languages
5. **Dark Mode**: Toggle theme support
6. **Offline Support**: Service workers for offline mode
7. **Export**: Download data as PDF/Excel
8. **Search/Filter**: Advanced filtering options
9. **Batch Operations**: Upload multiple records
10. **Analytics**: Track user actions and form submissions

---

**Version**: 1.0.0
**Framework**: Next.js 14 + React 18
**TypeScript**: 5.2+
**Node**: 18+
**License**: Internal Use Only
