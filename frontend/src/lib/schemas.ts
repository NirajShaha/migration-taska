import { z } from 'zod';

/**
 * Schema validations for WVTA CoC Management forms
 * Maps to COBOL field definitions with proper constraints
 */

// Type Form Schema
export const TypeFormSchema = z.object({
  typModel: z.string()
    .min(1, 'Model is required')
    .max(1, 'Model must be 1 character')
    .regex(/^[A-Z0-9]$/, 'Model must be alphanumeric'),
  
  typType: z.string()
    .min(1, 'Type is required')
    .max(4, 'Type must be max 4 characters'),
  
  typStartDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  
  typEndDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid end date'),
  
  typManf: z.string()
    .min(1, 'Manufacturer is required')
    .max(1, 'Manufacturer must be 1 character'),
  
  typApprovalNo: z.string().max(25, 'Approval No max 25 characters').optional(),
  typApprDateDay: z.coerce.number().min(1).max(31).optional(),
  typApprDateMonth: z.coerce.number().min(1).max(12).optional(),
  typApprDateYear: z.coerce.number().min(1900).max(2100).optional(),
  typSmallSeries: z.string().max(1, 'Small series max 1 character').optional(),
  
  userId: z.string()
    .min(1, 'User ID is required')
    .max(8, 'User ID max 8 characters'),
});

export type TypeFormData = z.infer<typeof TypeFormSchema>;

// Variant Form Schema
export const VariantFormSchema = z.object({
  // Variant Identification
  varModel: z.string()
    .min(1, 'Model is required')
    .max(1, 'Model must be 1 character'),
  
  varType: z.string()
    .min(1, 'Type is required')
    .max(4, 'Type must be max 4 characters'),
  
  varStartDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  
  varEndDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid end date'),
  
  varVariant: z.string()
    .min(1, 'Variant is required')
    .max(6, 'Variant must be max 6 characters'),
  
  varManf: z.string()
    .min(1, 'Manufacturer is required')
    .max(1, 'Manufacturer must be 1 character'),
  
  // Engine and Testing
  varEngine: z.string().max(12, 'Engine code max 12 characters').optional(),
  testMethod: z.string().max(25, 'Test method max 25 characters').optional(),
  
  // Approval
  smallSeriesTypApp: z.string().max(1, 'Small series max 1 character').optional(),
  varNewmodActmasInd: z.string().max(1, 'ACTMASS ind max 1 character').optional(),
  
  // Powered Axles
  axleWheel: z.string().max(12, 'Axle/wheel max 12 characters').optional(),
  position: z.string().max(21, 'Position max 21 characters').optional(),
  interconnection: z.string().max(40, 'Interconnection max 40 characters').optional(),
  posWheel: z.string().optional(),
  steerAxle: z.string().optional(),
  
  // Dimensions
  wheelbase: z.string().optional(),
  track: z.string().optional(),
  length: z.string().optional(),
  lengthWithTowbar: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  overhang: z.string().optional(),
  
  // Classification
  typeOfBody: z.string().max(25, 'Type of body max 25 characters').optional(),
  classOfVehicle: z.string().max(3, 'Class max 3 characters').optional(),
  noOfDoors: z.string().max(50, 'Doors max 50 characters').optional(),
  
  // Flags
  varGenTyrList: z.string().max(1, 'Gen tyre list max 1 character').optional(),
  
  // System
  userId: z.string()
    .min(1, 'User ID is required')
    .max(8, 'User ID max 8 characters'),
});

export type VariantFormData = z.infer<typeof VariantFormSchema>;
