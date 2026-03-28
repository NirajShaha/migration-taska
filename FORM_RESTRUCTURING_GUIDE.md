# Form Restructuring Implementation Guide

## Status: ✅ FORM COMPONENTS CREATED

Three new form components have been created with complete HA003U, HA003R, and HA003D fields:

- `StepTypeApproval_new.tsx` - Complete HA003U implementation
- `StepCoCCertificate_new.tsx` - Complete HA003R implementation  
- `StepEngineDetails_new.tsx` - Complete HA003D implementation

## Manual Steps Required (File Permissions Issue)

Since the file system has permission restrictions, complete these steps:

### Step 1: Replace Old Files

In VS Code Terminal:
```bash
cd /workspaces/migration-taska-arohi/frontend/src/components/form-steps

# Backup old files (optional)
cp StepTypeApproval.tsx StepTypeApproval.backup.tsx
cp StepCoCCertificate.tsx StepCoCCertificate.backup.tsx
cp StepEngineDetails.tsx StepEngineDetails.backup.tsx

# Replace with new versions
rm StepTypeApproval.tsx && mv StepTypeApproval_new.tsx StepTypeApproval.tsx
rm StepCoCCertificate.tsx && mv StepCoCCertificate_new.tsx StepCoCCertificate.tsx
rm StepEngineDetails.tsx && mv StepEngineDetails_new.tsx StepEngineDetails.tsx

# Remove unused component
rm StepVehicleDimensions.tsx
```

### Step 2: Update StepReview Component

The StepReview component needs to display all fields from the 4 steps. Update it to show:
- Type Approval info (HA003U)
- CoC Certificate info (HA003R)
- Engine Details (HA003D)

### Step 3: Update API Response Mapping

In `src/lib/api.ts`, ensure the response mapping functions properly convert:

```typescript
// Example mapping from API response to form fields
const mappedData = {
  approvalNo: response.typApprovalNo,
  approvalDate: formatDateToDDMMYYYY(response.typApprDay, response.typApprMonth, response.typApprYear),
  smallSeriesTypApp: response.typSmallSeries,
  // ... continue for all fields
};
```

### Step 4: Test Date Handling

Verification needed for DD/MM/YYYY format:
- Parse user input: "15/06/2024" → store as "2024-06-15" for backend
- Display stored dates: "2024-06-15" → show as "15/06/2024"

### Step 5: Verify Build

```bash
cd frontend
npm run build
```

Should complete without errors.

## Key Features Implemented

✅ Three distinct screen-specific forms  
✅ Approval Date in DD/MM/YYYY format (single field)
✅ All HA003U fields: Approval, Axles, Position, Interconnection, Dimensions, Body
✅ All HA003R fields: VIN location, Vehicle description, Remarks
✅ All HA003D fields: Engine specs, Fuel, Power ratings
✅ Improved UI with gradient accents  
✅ Organized sections with visual hierarchy
✅ Proper FormProvider context for all fields
✅ Default values initialization

## Field Count by Screen

- **HA003U**: 23 fields
- **HA003R**: 4 fields  
- **HA003D**: 13 fields
- **Total**: 40 fields + Display fields

## Next: API Integration

Ensure backend properly maps request/response to these field names matching the Zod schema.
