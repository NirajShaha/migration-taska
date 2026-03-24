# WVTA CoC Management System - Migration Documentation

## Project Overview

Complete migration of TELON 5.0/COBOL legacy automotive system to modern Spring Boot + Next.js tech stack.

**Original System**: COBOL TELON screen HA003U - "UPDATE COC CONTENT (TYPE/ VARIANT)"
**Migrated To**: Spring Boot 3.2 backend + Next.js 14 frontend

---

## Architecture

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 21
- **Database**: MySQL 8.0 (with Flyway migrations)
- **API**: RESTful JSON endpoints

#### Project Structure

```
backend/
├── pom.xml                               # Maven configuration
├── src/main/
│   ├── java/com/automotive/
│   │   ├── WvtaCocApplication.java      # Main Spring Boot application
│   │   ├── controller/
│   │   │   ├── VariantController.java   # Maps READ/UPDATE HATVAR
│   │   │   ├── TypeController.java      # Maps READ/UPDATE HATTYP
│   │   │   ├── VacController.java       # Maps HA300T (VAC fields)
│   │   │   └── CocController.java       # Maps HA900T (COC fields)
│   │   ├── service/
│   │   │   ├── HatVarVariantService.java # Variant business logic
│   │   │   ├── HatTypTypeService.java    # Type approval logic
│   │   │   ├── HatVacVariantService.java # Variant attributes logic
│   │   │   └── HatCocTypeService.java    # COC table logic
│   │   ├── entity/
│   │   │   ├── HatVarVariant.java        # Main variant entity
│   │   │   ├── HatTypType.java           # Type entity
│   │   │   ├── HatVacVariant.java        # VAC (attributes) entity
│   │   │   ├── HatCocType.java           # COC entity
│   │   │   └── *PK.java                  # Composite key classes (5 files)
│   │   ├── repository/
│   │   │   └── Hat*Repository.java       # JPA repositories (4 files)
│   │   ├── validator/
│   │   │   └── FieldValidator.java       # All field validation logic
│   │   ├── dto/
│   │   │   ├── VariantRequest.java
│   │   │   ├── VariantResponse.java
│   │   │   ├── TypeRequest.java
│   │   │   └── ValidationResult.java
│   │   └── exception/
│   │       ├── ValidationException.java
│   │       ├── ResourceNotFoundException.java
│   │       └── GlobalExceptionHandler.java
│   └── resources/
│       ├── application.properties         # Configuration
│       └── db/migration/
│           └── V1__init.sql              # Database schema
└── target/                                # Built artifacts
```

#### Key Features

1. **Composite Key Handling**: All tables use @Embeddable composite keys matching COBOL structure
2. **Field Validation**: FieldValidator contains all COBOL validation logic
3. **Change Tracking**: All entities have timestamp + userid fields matching COBOL audit trail
4. **Date-based Rules**: Complex validation with date thresholds (e.g., 2004-03-01)
5. **Manufacturer-specific Logic**: Landrover (L), Japan (J) conditions

---

### Frontend (Next.js)

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript 5.2
- **Form Validation**: React Hook Form + Zod
- **HTTP Client**: Axios (typed wrapper)

#### Project Structure

```
frontend/
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── next.config.js                        # Next.js config
├── .env.example                          # Environment template
└── src/
    ├── app/
    │   ├── page.tsx                      # Home page (tabs for Variant/Type)
    │   ├── layout.tsx                    # Root layout
    │   └── globals.css                   # Global styles
    ├── components/
    │   ├── VariantForm.tsx               # Maps HA003U variant screen
    │   └── TypeForm.tsx                  # Maps HA003U type section
    ├── hooks/
    │   └── useFieldValidation.ts         # Field validation hooks
    └── lib/
        ├── api.ts                        # Typed API client
        └── schemas.ts                    # Zod validation schemas
```

#### Key Features

1. **Form Validation**: Client-side validation matches backend FieldValidator
2. **Tab-based UI**: Separate tabs for Variant and Type management
3. **Field Dependencies**: Position/Interconnection required if Powered Axles specified
4. **CHIP Data Flag**: Disables CoC field editing when set
5. **Real-time Validation**: Hooks provide immediate feedback on invalid input

---

## Business Logic Mapping

### COBOL → Spring Boot/Next.js

| COBOL Section | Backend Service | Frontend Component | Implementation |
|---|---|---|---|
| READ HATVAR | `HatVarVariantService.readVariant()` | VariantForm | GET /variants/lookup |
| UPDATE HATVAR | `HatVarVariantService.updateVariant()` | VariantForm | PUT /variants/{id} |
| HA200T-UPDATE-POWERED-AXLE | Variant service + validation | VariantForm | Position/Interconnection concat + validation |
| HA300T-UPDATE-VAC-FIELDS | `HatVacVariantService.updateVacField()` | VariantForm | POST /vac/update-field |
| HA100T-UPDATE-APPROVAL-NO | `HatTypTypeService.updateTypeApproval()` | TypeForm | PUT /types/{id}/approval |
| HA900T-UPDATE-COC-TABLE | `HatCocTypeService.updateCocField()` | Controllers | POST /coc/update-field |
| Field Validation (E305) | `FieldValidator` class | `useFieldValidation` hook | Input validation |

### Validation Rules Implemented

| Field | Rule | Validator | Frontend Hook |
|---|---|---|---|
| Position | No commas, max 21 chars | `validatePosition()` | `useFieldValidation` |
| Interconnection | No commas, max 40 chars | `validateInterconnection()` | `useFieldValidation` |
| Wheelbase | H or NNNN format | `validateWheelbase()` | `useFieldValidation` |
| Axle/Wheel | NTN format | `validateAxleWheel()` | `useFieldValidation` |
| Pos Wheel/Steer | C or NCN format | `validatePosWheelOrSteerAxle()` | `useFieldValidation` |
| Track | Complex date-based patterns | `validateTrack()` | Server-side only |
| Height | Date-based patterns (pre/post 2004-03-01) | `validateHeight()` | Server-side only |
| Length/Width | Date-based patterns | `validateLength/Width()` | Server-side only |
| Overhang | Multiple formats (Landrover-specific) | `validateOverhang()` | Server-side only |
| Small Series | /Y or /N | `validateSmallSeriesTypApp()` | `useFieldValidation` |
| Class | I, II, III, A, B | `validateClass()` | `useFieldValidation` |
| UB Doors | NSESX format (Landrover/Japan) | `validateUbDoors()` | Server-side only |
| Powered Axles Requirement | If specified, Position + Interconnection required | Service logic | Frontend validation |

---

## Database Schema

### Tables

1. **hat_typ_type** - Type information (5-part composite key)
   - typ_approval_no, typ_appr_date, typ_small_series (updated)

2. **hat_var_variant** - Variant information (6-part composite key)
   - var_axles_coc_val, var_coc_annex, var_newmod_actmas_ind (updated)

3. **hat_vac_variant** - Variant attributes (8-part composite key)
   - vac_value, vac_userid, vac_timestamp (stores dimension/classification data)

4. **hat_coc_type** - Certificate of Conformity (8-part composite key)
   - coc_value, coc_userid, coc_timestamp

5. **hat_tl1_telonhld** - TELON holds (not actively modified)

6. **audit_log** - Audit trail for all changes

---

## API Endpoints

### Variants
- `GET /api/variants/lookup` - Read variant by composite key
- `POST /api/variants` - Create variant
- `PUT /api/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}` - Update variant
- `POST /api/variants/validate-powered-axles` - Validate powered axles requirement

### Types
- `GET /api/types/lookup` - Read type by composite key
- `PUT /api/types/{model}/{type}/{startDate}/{endDate}/{manf}/approval` - Update type approval

### VAC (Variant Attributes)
- `POST /api/vac/update-field` - Update individual VAC field

### COC (Certificate of Conformity)
- `POST /api/coc/update-field` - Update individual COC field

---

## Setup & Deployment

### Backend Setup

```bash
cd backend

# 1. Configure MySQL
# Update src/main/resources/application.properties:
# spring.datasource.url=jdbc:mysql://localhost:3306/automotive_db
# spring.datasource.username=root
# spring.datasource.password=YOUR_PASSWORD

# 2. Build
mvn clean package

# 3. Run
java -jar target/wvta-coc-backend-1.0.0.jar
# Or: mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure API URL
cp .env.example .env.local
# Update NEXT_PUBLIC_API_BASE_URL if needed

# 3. Development
npm run dev
# Access at http://localhost:3000

# 4. Production build
npm run build
npm start
```

---

## Date-Based Validation Rules

### Track Field (from COBOL validation logic)
- Pre-2004-03-01:
  - NNNN, NNNN-NNNN-NNNN, NNNN-SSSSSS-TS-NNNN-H-NNNN
- Post-2004-03-01:
  - NNNN-TS-NNNN, NNNN-T-NNNN-T-NNNN

### Height Field
- Pre-2004-03-01: NNNN, NNNN-H-NNNN, NNNN-T-NNNN
- Post-2004-03-01: NNNN, NNNN-H-NNNN

### Overhang Field
- Standard: NN, NNN, NNNN, SNNN, SSNN, SSSN, NNNN-H-NNNN, NNNN-T-NNNN
- Landrover only: NNN-H-NNNN

---

## Error Handling

### Backend
- **ValidationException**: Field validation errors (HTTP 400)
- **ResourceNotFoundException**: Record not found (HTTP 404)
- **GlobalExceptionHandler**: Consistent error response format

### Frontend
- **useFieldValidation**: Real-time field error tracking
- **Zod schemas**: Form-level validation before submission
- **API interceptor**: Error message extraction and display

---

## Code Statistics

- **Backend**: ~2,500 lines (entities, services, controllers, validators)
- **Frontend**: ~1,800 lines (components, hooks, API client, schemas)
- **Database**: Schema + migration scripts
- **Documentation**: This file + additional READMEs

---

## Testing

### Manual Testing Checklist

```
Variant Form:
[ ] Create new variant
[ ] Read existing variant
[ ] Update variant fields
[ ] Validate position field (no commas)
[ ] Validate interconnection field (no commas)
[ ] Validate wheelbase (H or NNNN)
[ ] Validate axle/wheel (NTN format)
[ ] Validate powered axles requirement
[ ] Toggle CHIP Data flag
[ ] Verify VAC field updates
[ ] Check timestamp updates

Type Form:
[ ] Read existing type
[ ] Update approval number
[ ] Update approval date (DD/MM/YYYY)
[ ] Update small series flag
[ ] Verify timestamp updates
```

### Integration Testing

```
[ ] End-to-end variant update flow
[ ] End-to-end type approval flow
[ ] Database persistence verification
[ ] Audit log records
[ ] Date-based validation edge cases (2004-03-01)
[ ] Composite key uniqueness
[ ] Manufacturer-specific logic (L, J codes)
```

---

## Migration Notes

### What Was Preserved
- All business logic from COBOL TELON screen
- All field validation rules
- All composite key structures
- All field names and data types
- Audit trail functionality

### What Was Improved
- Type safety (TypeScript/Java generics)
- Modern REST API
- Separate concerns (validation, services, controllers)
- Real-time frontend validation
- Database transaction management
- Error handling and logging

### Dependencies on External Systems
- MySQL 8.0 (configurable in application.properties)
- Node.js 18+ (for Next.js frontend)
- Java 21+ (for Spring Boot backend)

---

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u root

# Verify connection settings in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/automotive_db
```

### Frontend API Connection
```bash
# Ensure backend is running on port 8080
# Check .env.local has correct API_BASE_URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### Build Errors
```bash
# Backend: Clear Maven cache
mvn clean install -DskipTests

# Frontend: Clear Node modules
rm -rf node_modules package-lock.json
npm install
```

---

## Future Enhancements

1. **Authentication**: JWT tokens for user tracking
2. **Audit Dashboard**: View change history
3. **Batch Operations**: Upload multiple records
4. **Excel Export**: Export variant/type data
5. **Approval Workflow**: Multi-level approvals
6. **Search Filtering**: Advanced search by date range, manufacturer
7. **Unit Tests**: Jest (frontend), JUnit (backend)
8. **Docker**: Containerization for deployment

---

## Support

For questions about the migration or original COBOL logic, refer to:
- COBOL Source: HA003U.txt
- Schema Patterns: HAT_TYP_TYPE, HAT_VAR_VARIANT, HAT_VAC_VARIANT, HAT_COC_TYPE

---

**Last Updated**: March 2024
**Version**: 1.0.0
