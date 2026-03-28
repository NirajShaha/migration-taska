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
    .refine((date: string) => !isNaN(Date.parse(date)), 'Invalid start date'),
  
  typEndDate: z.string()
    .refine((date: string) => !isNaN(Date.parse(date)), 'Invalid end date'),
  
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

// Variant Form Schema - Comprehensive with all VAC fields
export const VariantFormSchema = z.object({
  // ===== VARIANT IDENTIFICATION =====
  varModel: z.string()
    .min(1, 'Model is required')
    .max(1, 'Model must be 1 character'),
  
  varType: z.string()
    .min(1, 'Type is required')
    .max(4, 'Type must be max 4 characters'),
  
  varStartDate: z.string()
    .refine((date: string) => !isNaN(Date.parse(date)), 'Invalid start date'),
  
  varEndDate: z.string()
    .refine((date: string) => !isNaN(Date.parse(date)), 'Invalid end date'),
  
  varVariant: z.string()
    .min(1, 'Variant is required')
    .max(6, 'Variant must be max 6 characters'),
  
  varManf: z.string()
    .min(1, 'Manufacturer is required')
    .max(1, 'Manufacturer must be 1 character'),
  
  // ===== ENGINE & TRANSMISSION =====
  varEngine: z.string().max(12, 'Engine code max 12 characters').optional(),
  varCocMaxPower: z.string().max(20, 'Max power max 20 characters').optional(),
  varCocFuel: z.string().max(10, 'Fuel type max 10 characters').optional(),
  varCocCap: z.string().max(10, 'Engine capacity max 10 characters').optional(),
  varCocNoArrCyl: z.string().max(5, 'No. of cylinders max 5 characters').optional(),
  varCocDirectInj: z.string().max(5, 'Direct injection max 5 characters').optional(),
  varCocWrkPrin: z.string().max(40, 'Working principle max 40 characters').optional(),
  varCocEngCode: z.string().max(10, 'Engine code max 10 characters').optional(),
  varCocEngMan: z.string().max(25, 'Engine manufacturer max 25 characters').optional(),
  
  // ===== AXLES & CONFIGURATION =====
  varAxlesCocVal: z.string().max(50, 'Axles config max 50 characters').optional(),
  
  // ===== VEHICLE DIMENSIONS & CONFIGURATION (VAC Fields) =====
  // Field 1: Axles/Wheels Configuration
  axleWheelField1_1: z.string().max(12, 'Axle/wheel (1) max 12 characters').optional(),
  axleWheelField1_2: z.string().max(10, 'Axle/wheel (2) max 10 characters').optional(),
  
  // Field 3: Length
  lengthField3: z.string().max(10, 'Length max 10 characters').optional(),
  
  // Field 4: Width
  widthField4: z.string().max(10, 'Width max 10 characters').optional(),
  
  // Field 5: Height
  heightField5_1: z.string().max(10, 'Height (max) max 10 characters').optional(),
  heightField5_2: z.string().max(10, 'Height (min) max 10 characters').optional(),
  
  // Field 6: Rear Overhang
  rearOverhangField6: z.string().max(10, 'Rear overhang max 10 characters').optional(),
  
  // Field 7: Track - Axle
  trackAxleField7: z.string().max(20, 'Track-Axle max 20 characters').optional(),
  
  // Field 8: Type of Body
  typeBodyField8: z.string().max(25, 'Type of body max 25 characters').optional(),
  
  // Field 30: Class of Vehicle
  classVehicleField30: z.string().max(10, 'Class of vehicle max 10 characters').optional(),
  
  // Field 30.1: No and Conf. of Doors
  doorsField30_1: z.string().max(50, 'Doors config max 50 characters').optional(),
  
  // Field 31: Doors Configuration
  doorsField31: z.string().max(10, 'Doors max 10 characters').optional(),
  
  // Field 38: Tire Specifications
  tireField38: z.string().max(50, 'Tire specs max 50 characters').optional(),
  
  // ===== APPROVAL & FLAGS =====
  varCocAnnex: z.string().max(25, 'Test method max 25 characters').optional(),
  varChipData: z.string().max(1, 'Chip data max 1 character').optional(),
  varGenTyrList: z.string().max(1, 'Gen tyre list max 1 character').optional(),
  varNewmodActmasInd: z.string().max(1, 'ACTMASS ind max 1 character').optional(),
  
  // ===== SYSTEM =====
  userId: z.string()
    .min(1, 'User ID is required')
    .max(8, 'User ID max 8 characters'),
});

export type VariantFormData = z.infer<typeof VariantFormSchema>;

// ===== UNIFIED CoCA FORM SCHEMA =====
// Single unified form combining Type Approval and Variant Management fields
// Based on COBOL HA003U screen structure with comprehensive validations
// All validations extracted from HA003U.txt COBOL source
export const UnifiedFormSchema = z.object({
  // ===== SEARCH/DISPLAY FIELDS =====
  type: z.string().max(4, 'Type max 4 characters').optional(),
  variant: z.string().max(6, 'Variant max 6 characters').optional(),
  typeDescription: z.string().max(28, 'Type description max 28 characters').optional(),
  engine: z.string().max(12, 'Engine max 12 characters').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  manufacturer: z.string().max(1, 'Manufacturer max 1 character').optional(),

  // ===== HA003U: TYPE APPROVAL INFORMATION =====
  approvalNo: z.string().max(25, 'Approval No max 25 characters').optional(),
  approvalDate: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$|^$/, 'Approval date must be DD/MM/YYYY format')
    .optional(),
  smallSeriesTypApp: z.enum(['Y', 'N', '/']).optional(),
  newModelActmass: z.enum(['Y', 'N']).optional(),
  chartData: z.enum(['Y', 'N']).default('N').optional(),
  testMethod: z.string().max(25, 'Test method max 25 characters').optional(),

  // ===== HA003U: AXLES CONFIGURATION =====
  axlesWheels: z.string().max(12, 'Axles/Wheels max 12 characters').optional(),
  wheelbase: z.string().max(9, 'Wheelbase max 9 characters').optional(),
  posAxlesWithTwinWheels: z.string().max(12, 'Twin wheels pos max 12 characters').optional(),
  steeredAxles: z.string().max(3, 'Steered axles max 3 characters').optional(),
  poweredAxles: z.string()
    .max(1, 'Powered axles max 1 character')
    .refine((val) => !val || /^[HN]$/.test(val), 'Powered Axles must be H or N')
    .optional(),

  // ===== HA003U: POSITION & INTERCONNECTION =====
  position: z.string()
    .max(21, 'Position max 21 characters')
    .refine((val) => !val || !val.includes(','), 'Position must not contain commas')
    .optional(),
  interconnection: z.string()
    .max(40, 'Interconnection max 40 characters')
    .refine((val) => !val || !val.includes(','), 'Interconnection must not contain commas')
    .optional(),

  // ===== HA003U: DIMENSIONS =====
  length: z.string().max(9, 'Length max 9 characters').optional(),
  lengthWithTowbar: z.string().max(9, 'Length with towbar max 9 characters').optional(),
  width: z.string().max(9, 'Width max 9 characters').optional(),
  height: z.string().max(9, 'Height max 9 characters').optional(),
  rearOverhang: z.string().max(9, 'Rear overhang max 9 characters').optional(),
  track: z.string().max(32, 'Track max 32 characters').optional(),

  // ===== HA003U: BODY CLASSIFICATION =====
  typeOfBody: z.string().max(25, 'Type of body max 25 characters').optional(),
  classOfVehicle: z.string()
    .max(3, 'Class of vehicle max 3 characters')
    .refine((val) => !val || /^(I|II|III|IV|A|B|C)$/.test(val), 'Class must be I, II, III, IV, A, B, or C')
    .optional(),
  noConfDoors: z.string().max(50, 'No and conf of doors max 50 characters').optional(),

  // ===== HA003R: CERTIFICATE OF CONFORMITY =====
  vinPlateAttachment: z.string().max(70, 'VIN plate attachment max 70 characters').optional(),
  vinPlateLocation: z.string().max(70, 'VIN plate location max 70 characters').optional(),
  commercialDescription: z.string().max(70, 'Commercial description max 70 characters').optional(),
  remarks: z.string().max(375, 'Remarks max 375 characters').optional(),

  // ===== HA003D: ENGINE SPECIFICATIONS =====
  engineCode: z.string().max(10, 'Engine code max 10 characters').optional(),
  engineManufacturer: z.string().max(25, 'Engine manufacturer max 25 characters').optional(),
  workingPrinciple: z.string().max(40, 'Working principle max 40 characters').optional(),
  engineCycle: z.string()
    .max(25, 'Engine cycle max 25 characters')
    .refine((val) => !val || !val.includes(','), 'Engine cycle must not contain commas')
    .optional(),
  engineIgnition: z.string()
    .max(25, 'Engine ignition max 25 characters')
    .refine((val) => !val || !val.includes(','), 'Engine ignition must not contain commas')
    .optional(),
  directInjection: z.string().max(5, 'Direct injection max 5 characters').optional(),
  noArrangementCylinders: z.string().max(12, 'Cylinders max 12 characters').optional(),
  fuel: z.string().max(15, 'Fuel max 15 characters').optional(),
  capacity: z.string().max(6, 'Capacity max 6 characters').optional(),
  maxNetPower: z.string().max(15, 'Max net power max 15 characters').optional(),
  maxHourlyOutputElec: z.string().max(8, 'Max hourly output max 8 characters').optional(),
  maxNetPowerElec: z.string().max(8, 'Max net power elec max 8 characters').optional(),
  max30MinPowerElec: z.string().max(8, 'Max 30min power max 8 characters').optional(),

  // ===== SYSTEM FIELDS =====
  userId: z.string().min(1, 'User ID is required').max(8, 'User ID max 8 characters'),
  pageNo: z.string().min(1, 'Page number is required'),
});

export type UnifiedFormData = z.infer<typeof UnifiedFormSchema>;
