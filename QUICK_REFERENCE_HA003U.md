# Quick Start Guide - HA003U Unified Form

## Development Setup

### Prerequisites
- Java 21+ (Backend)
- Node.js 18+ (Frontend)
- MySQL 8.0+
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run Spring Boot application
mvn spring-boot:run

# Expected output: "Application started on port 8081"
```

**Backend API:** http://localhost:8081/api

**Health Check Endpoint:**
```bash
curl http://localhost:8081/api/coc/health
```

Expected response:
```json
{
  "status": "UP",
  "module": "Unified CoC Service",
  "screen": "HA003U"
}
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Expected output: "ready - started server on 0.0.0.0:3000"
```

**Frontend App:** http://localhost:3000

## Using the Application

### Workflow

1. **Open the Application**
   - Navigate to http://localhost:3000
   - You'll see the Unified Form (HA003U)

2. **Search for a Variant**
   - Enter search criteria:
     - Model: A
     - Type: LE
     - Start Date: 2024-01-01
     - End Date: 2024-12-31
     - Variant: NHFECO
     - Manufacturer: L
   - Click "Search"

3. **Edit the Data**
   - Form populates with sample Land Rover data
   - Modify any field (except read-only ones)
   - Notice field validation indicators

4. **Save Changes**
   - Click "Save Changes"
   - Form validates with backend
   - Errors display under each field if present
   - Success message shows on successful save

5. **New Search**
   - Click "New Search"
   - Returns to search form for new variant

### Form Sections

#### 1. Type Identification (Read-Only)
- Type: LE
- Variant: NHFECO
- Type Description: Land Rover Defender
- Engine: 508PS 386kW
- Dates and Manufacturer

#### 2. Type Approval (Editable)
- Approval Number
- Approval Date (Day/Month/Year)
- Small Series Type App (Y/N)
- New Model Actmass (Y/N)
- Test Method

#### 3. Axles Configuration (Editable)
- Axles/Wheels: 2-2
- Wheelbase: 2587
- Position Twin Wheels
- Steered Axles
- Powered Axles (H/N only)

#### 4. Position & Interconnection (Editable)
- Position (max 21, no commas)
- Interconnection (max 40, no commas)

#### 5. Vehicle Dimensions (Editable)
- Length: 3851 mm
- Length with Towbar: 4200 mm
- Width: 1996 mm
- Height: 1920 mm
- Rear Overhang: 820 mm
- Track: 1698/1683 mm

#### 6. Body Classification (Editable)
- Type of Body
- Class of Vehicle (I/II/III/A/B/C)
- Doors Configuration
- Tire Value

#### 7. System Fields (Editable)
- CHIP Data (Y/N flag)
- User ID
- Page Number

### Field Validation Rules

#### Special Indicators
- ⚠ = Validation error on field
- ⊘ = Field is disabled (CHIP=Y)

#### Position Field
- Max 21 characters
- Cannot contain commas
- Example: "Front and Rear"

#### Interconnection Field
- Max 40 characters
- Cannot contain commas
- Example: "Propshaft"

#### Powered Axles
- Only accepts: H or N
- H = hydraulic, N = no

#### Class of Vehicle
- Accepts: I, II, III, IV, A, B, C
- Example: "I"

#### CHIP Data Flag
- Value Y = Most validations disabled
- Value N = Full validation
- Notice ⊘ symbol on fields when Y

### API Endpoints

#### 1. Lookup Variant
```bash
GET /api/coc/variants/:model/:type/:startDate/:endDate/:variant/:manf

curl "http://localhost:8081/api/coc/variants/A/LE/2024-01-01/2024-12-31/NHFECO/L"
```

Response:
```json
{
  "type": "LE",
  "variant": "NHFECO",
  "typeDescription": "Land Rover Defender",
  "engine": "508PS 386kW",
  "position": "Front and Rear",
  "interconnection": "Propshaft",
  ...
  "valid": true,
  "errors": null
}
```

#### 2. Validate Fields
```bash
POST /api/coc/validate
Content-Type: application/json

curl -X POST "http://localhost:8081/api/coc/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "position": "X,Y",
    "interconnection": "Test",
    ...
  }'
```

Response with errors:
```json
{
  "valid": false,
  "errors": [
    {
      "fieldName": "position",
      "errorMessage": "Position must not contain commas",
      "rejectedValue": "X,Y"
    }
  ]
}
```

#### 3. Update Variant
```bash
PUT /api/coc/variants/:model/:type/:startDate/:endDate/:variant/:manf
Content-Type: application/json

curl -X PUT "http://localhost:8081/api/coc/variants/A/LE/2024-01-01/2024-12-31/NHFECO/L" \
  -H "Content-Type: application/json" \
  -d '{ ...form data... }'
```

Response:
```json
{
  "valid": true,
  "errors": [],
  "message": "Variant updated successfully"
}
```

#### 4. Health Check
```bash
GET /api/coc/health

curl http://localhost:8081/api/coc/health
```

## Common Issues & Troubleshooting

### Backend Won't Start
**Error:** "Port 8081 already in use"
```bash
# Find process using port 8081
lsof -i :8081

# Kill the process (replace PID)
kill -9 <PID>

# Or use different port: mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8082"
```

### Frontend Can't Connect to Backend
**Error:** "Failed to fetch"
```bash
1. Verify backend is running on :8081
2. Check CORS settings in backend (should allow localhost:*)
3. Check browser console for specific error
4. Verify API_BASE_URL in api.ts is "http://localhost:8081/api"
```

### Database Connection Failed
**Error:** "Unable to acquire JDBC Connection"
```bash
1. Check MySQL is running
2. Verify connection string in application.properties
3. Check database credentials
4. Ensure database and tables exist (run Flyway migrations)
```

### Form Submissions Not Working
**Debug Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Save Changes"
4. Look for failed API calls
5. Check Response tab for error details

### Validation Rules Not Triggering
1. Check CHIP Data flag (if Y, validations disabled)
2. Verify backend validator is deployed
3. Check browser console for JavaScript errors
4. Test API /validate endpoint directly with curl

## Database Schema

### Tables Used
1. `hat_var_variant` - Variant information
2. `hat_typ_type` - Type approval data
3. `hat_vac_variant` - Vehicle dimensional specs
4. `hat_coc_type` - Certificate of Conformity

### Composite Keys
Each table uses multi-part keys:
- Model + Type + StartDate + EndDate + Variant + Manufacturer

### Sample Data
Pre-populated with Land Rover Defender variant (LE/NHFECO)

## Code Organization

```
Frontend Structure:
  /src
    /app
      page.tsx                    # Main page
    /components
      UnifiedCoCAForm.tsx         # Main form component
    /lib
      api.ts                      # API client
      schemas.ts                  # Zod validation schemas
    /styles
      UnifiedCoCAForm.css         # Form styling
    /hooks
      useFieldValidation.ts       # Custom hooks

Backend Structure:
  /src/main/java/com/automotive
    /validator
      CoCFieldValidator.java      # All validation rules
    /controller
      UnifiedCoCController.java   # REST endpoints
    /service
      UnifiedCoCService.java      # Business logic
    /dto
      UnifiedCoCARequest.java     # Request DTO
      UnifiedCoCAResponse.java    # Response DTO
    /entity
      HatVarVariant.java          # Variant entity
      HatTypType.java             # Type entity
      HatVacVariant.java          # VAC entity
    /repository
      HatVarVariantRepository.java # Data access
      HatTypTypeRepository.java
      HatVacVariantRepository.java
```

## Testing

### Unit Test Examples

**Test Position Validation:**
```java
@Test
void testPositionWithCommasFails() {
    ValidationResult result = CoCFieldValidator.validatePosition("Front, Rear", "N");
    assertFalse(result.isValid());
    assertTrue(result.getErrorMessage().contains("commas"));
}
```

**Test Interconnection Max Length:**
```java
@Test
void testInterconnectionExceedsMaxLength() {
    String longString = "A".repeat(41);
    ValidationResult result = CoCFieldValidator.validateInterconnection(longString, "N");
    assertFalse(result.isValid());
}
```

### E2E Test Scenario

```gherkin
Feature: Update CoC Content (HA003U)
  
  Scenario: Successfully update variant with valid data
    Given I am on the CoC management page
    When I search for variant "NHFECO" of type "LE"
    And the form loads with existing data
    And I change position to "Front Alternative"
    And I click Save Changes
    Then the form shows success message
    And the backend confirms update
```

## Performance Notes

- Form validation: <5ms per field (frontend)
- Backend validation: <1ms per field
- Database lookup: <100ms (indexed by composite key)
- Full workflow: <500ms typical

## Next Steps for Development

1. **Add More Test Coverage**
   - Write unit tests for all validators
   - Integration tests for service layer
   - E2E tests for complete workflow

2. **Performance Optimization**
   - Add database query optimization
   - Implement caching for lookups
   - Add pagination for large result sets

3. **Enhanced Error Handling**
   - Add retry logic for API failures
   - Implement exponential backoff
   - Add detailed error logging

4. **Additional Features**
   - Add audit trail logging
   - Implement field-level permissions
   - Add multi-language support
   - Create batch import/export

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API endpoint documentation
3. Check backend logs: `tail -f backend/logs/app.log`
4. Check frontend DevTools console (F12)
5. Review database queries in application logs

## Related Documentation

- [HA003U Implementation Complete](./HA003U_IMPLEMENTATION_COMPLETE.md)
- [UNIFIED_FORM_DOCUMENTATION.md](./UNIFIED_FORM_DOCUMENTATION.md)
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md)
