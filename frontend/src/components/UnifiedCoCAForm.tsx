'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnifiedFormSchema, UnifiedFormData } from '@/lib/schemas';
import { apiClient, UnifiedCoCAResponse, FieldError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select } from '@/components/ui/select';
import { AlertCircle, CheckCircle2, Search, RefreshCw, Save } from 'lucide-react';

/**
 * Unified CoCA Form Component (HA003U)
 * 
 * Modern UI using shadcn/ui components
 * Single page combining Type Approval and Variant Management fields
 */

// Sample variant data for pre-population
const SAMPLE_VARIANT = {
  type: 'LE',
  variant: 'NHFECO',
  typeDescription: 'Land Rover Defender',
  engine: '508PS 386kW',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  manufacturer: 'L',
  approvalNo: 'HA2024-001',
  approvalDay: '15',
  approvalMonth: '6',
  approvalYear: '2024',
  smallSeriesTypApp: 'N' as const,
  newModelActmass: 'Y' as const,
  approvalTypeIndicator: 'A' as const,
  generateTyreList: 'Y' as const,
  testMethod: 'UN ECE R14',
  axlesWheels: '2-2',
  wheelbase: '2587',
  posAxlesWithTwinWheels: '2nd',
  steeredAxles: '1st',
  poweredAxles: 'N',
  position: 'Front and Rear',
  interconnection: 'Propshaft',
  length: '3851',
  lengthWithTowbar: '4200',
  width: '1996',
  height: '1920',
  rearOverhang: '820',
  track: '1698/1683',
  typeOfBody: 'Off-road vehicle',
  classOfVehicle: 'I',
  noConfDoors: '4 side doors + 1 tailgate',
  tyreValue: 'A',
  engineCode: '',
  engineManufacturer: '',
  workingPrinciple: '',
  engineCycle: '',
  engineIgnition: '',
  directInjection: '',
  noArrangementCylinders: '',
  fuel: '',
  capacity: '',
  maxNetPower: '',
  maxHourlyOutputElec: '',
  maxNetPowerElec: '',
  max30MinPowerElec: '',
  vinPlateAttachment: '',
  vinPlateLocation: '',
  commercialDescription: '',
  remarks: '',
  additionalInfo: '',
  userId: 'USER001',
  pageNo: '01',
};

interface FormFieldError {
  [fieldName: string]: string;
}

export default function UnifiedCoCAForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormFieldError>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors: zodErrors },
    reset,
    watch,
    setValue,
  } = useForm<UnifiedFormData>({
    resolver: zodResolver(UnifiedFormSchema),
    defaultValues: SAMPLE_VARIANT,
    mode: 'onChange',
  });

  const chipData = watch('chipData');

  // Handle form lookup with comprehensive field mapping
  const handleLookup = async (searchData: any) => {
    setIsSearching(true);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      const response = await apiClient.lookupUnifiedVariant(
        searchData.manufacturer,
        searchData.type,
        searchData.startDate,
        searchData.endDate,
        searchData.variant,
        searchData.manufacturer
      );

      if (response && response.valid) {
        // ===== MAP RESPONSE TO FORM FIELDS =====
        // Use empty string for all fields to prevent controlled component warnings
        
        // Type Identification fields
        setValue('type', response.typType || '');
        setValue('variant', response.varVariant || '');
        setValue('typeDescription', response.typDescription || '');
        setValue('engine', response.varEngine || '');
        setValue('startDate', response.typStartDate || '');
        setValue('endDate', response.typEndDate || '');
        setValue('manufacturer', response.typManf || '');

        // Type Approval fields
        setValue('approvalNo', response.typApprovalNo || '');
        setValue('approvalDay', response.typApprDay?.toString() || '');
        setValue('approvalMonth', response.typApprMonth?.toString() || '');
        setValue('approvalYear', response.typApprYear?.toString() || '');
        setValue('smallSeriesTypApp', (response.typSmallSeries as 'Y' | 'N' | '/' | undefined) || '');
        setValue('newModelActmass', (response.varNewmodActmasInd as 'Y' | 'N' | undefined) || '');
        setValue('approvalTypeIndicator', (response.typApprTypeInd as 'A' | 'B' | 'C' | undefined) || '');
        setValue('generateTyreList', (response.typGenTyrList as 'Y' | 'N' | undefined) || '');
        setValue('testMethod', response.testMethod?.trim() || '');

        // Axles Configuration fields
        setValue('axlesWheels', response.axlesWheels || '');
        setValue('wheelbase', response.wheelbase || '');
        setValue('posAxlesWithTwinWheels', response.posAxlesWithTwinWheels || '');
        setValue('steeredAxles', response.steeredAxles || '');
        setValue('poweredAxles', response.poweredAxles || '');

        // Position & Interconnection fields
        setValue('position', response.position || '');
        setValue('interconnection', response.interconnection || '');

        // Vehicle Dimensions fields
        setValue('length', response.length || '');
        setValue('lengthWithTowbar', response.lengthWithTowbar || '');
        setValue('width', response.width || '');
        setValue('height', response.height || '');
        setValue('rearOverhang', response.rearOverhang || '');
        setValue('track', response.track || '');

        // Body Classification fields
        setValue('typeOfBody', response.typeOfBody || '');
        setValue('classOfVehicle', response.classOfVehicle || '');
        setValue('noConfDoors', response.noConfDoors || '');
        setValue('tyreValue', response.tyreValue || '');

        // ===== ENGINE DETAILS (HA003D) =====
        setValue('engineCode', response.varCocEngCode || '');
        setValue('engineManufacturer', response.varCocEngMan || '');
        setValue('workingPrinciple', response.varCocWrkPrin || '');
        setValue('engineCycle', response.varCocWrkPrin || ''); // Use varCocWrkPrin as engine cycle
        setValue('engineIgnition', ''); // Not in API response yet
        setValue('directInjection', response.varCocDirectInj?.trim() || '');
        setValue('noArrangementCylinders', response.varCocNoArrCyl || '');
        setValue('fuel', response.varCocFuel || '');
        setValue('capacity', response.varCocCap || '');
        setValue('maxNetPower', response.varCocMaxPower || '');
        setValue('maxHourlyOutputElec', ''); // Not in API response yet
        setValue('maxNetPowerElec', ''); // Not in API response yet
        setValue('max30MinPowerElec', ''); // Not in API response yet

        // ===== CERTIFICATE OF CONFORMITY (HA003R) =====
        // Map coc* fields to form field names
        setValue('vinPlateAttachment', response.cocLocAttachment || '');
        setValue('vinPlateLocation', response.cocLocOnChassis || '');
        setValue('commercialDescription', response.cocTypeDescription || '');
        setValue('remarks', response.cocRemarks || '');
        setValue('additionalInfo', response.cocAdditionalInfo || '');

        // System Fields
        setValue('userId', response.lastUpdatedBy || 'USER001');
        setValue('pageNo', '01');

        setShowSearchForm(false);
        setSuccessMessage('Variant data loaded successfully');
      } else {
        setError('Variant not found. Please check your search criteria.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to lookup variant');
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data: UnifiedFormData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      // Transform frontend field names to backend field names before validation
      const backendData = {
        // Type Identification
        typModel: data.manufacturer,
        typType: data.type,
        typStartDate: data.startDate,
        typEndDate: data.endDate,
        typManf: data.manufacturer,
        typDescription: data.typeDescription,

        // Variant Identification
        varVariant: data.variant,
        varEngine: data.engine,

        // Type Approval
        typApprovalNo: data.approvalNo,
        typApprDay: data.approvalDay ? parseInt(data.approvalDay) : undefined,
        typApprMonth: data.approvalMonth ? parseInt(data.approvalMonth) : undefined,
        typApprYear: data.approvalYear ? parseInt(data.approvalYear) : undefined,
        typSmallSeries: data.smallSeriesTypApp,
        typApprTypeInd: data.approvalTypeIndicator,
        typGenTyrList: data.generateTyreList,
        varNewmodActmasInd: data.newModelActmass,
        varGenTyrList: data.generateTyreList,

        // Engine Details - map frontend field names to backend varCoc* field names
        varCocEngCode: data.engineCode,
        varCocEngMan: data.engineManufacturer,
        varCocWrkPrin: data.workingPrinciple,
        varCocDirectInj: data.directInjection,
        varCocNoArrCyl: data.noArrangementCylinders,
        varCocFuel: data.fuel,
        varCocCap: data.capacity,
        varCocMaxPower: data.maxNetPower,

        // Test Method
        testMethod: data.testMethod,

        // Axles Configuration
        axlesWheels: data.axlesWheels,
        wheelbase: data.wheelbase,
        posAxlesWithTwinWheels: data.posAxlesWithTwinWheels,
        steeredAxles: data.steeredAxles,
        poweredAxles: data.poweredAxles,

        // Position & Interconnection
        position: data.position,
        interconnection: data.interconnection,

        // Dimensions
        length: data.length,
        lengthWithTowbar: data.lengthWithTowbar,
        width: data.width,
        height: data.height,
        rearOverhang: data.rearOverhang,
        track: data.track,

        // Body Classification
        typeOfBody: data.typeOfBody,
        classOfVehicle: data.classOfVehicle,
        noConfDoors: data.noConfDoors,
        tyreValue: data.tyreValue,

        // Certificate - map frontend field names to backend coc* field names
        cocLocAttachment: data.vinPlateAttachment,
        cocLocOnChassis: data.vinPlateLocation,
        cocTypeDescription: data.commercialDescription,
        cocRemarks: data.remarks,
        cocAdditionalInfo: data.additionalInfo,

        // System
        userId: data.userId,
      };

      const response = await apiClient.validateUnifiedVariant(backendData);

      if (response.valid) {
        const updateResponse = await apiClient.updateUnifiedVariant(
          data.manufacturer || '',
          data.type || '',
          data.startDate || '',
          data.endDate || '',
          data.variant || '',
          data.manufacturer || '',
          backendData as any
        );

        if (updateResponse.valid) {
          setSuccessMessage('Variant updated successfully!');
          setTimeout(() => {
            setSuccessMessage(null);
            setShowSearchForm(true);
            reset();
          }, 3000);
        } else {
          const backendMessage = updateResponse?.errors?.[0]?.errorMessage || 'Failed to update variant';
          setError(backendMessage);
        }
      } else if (response.errors && response.errors.length > 0) {
        const errors: FormFieldError = {};
        response.errors.forEach((err: FieldError) => {
          errors[err.fieldName] = err.errorMessage;
        });
        setFieldErrors(errors);
        setError(`Validation failed: ${response.errors.length} field(s) have errors`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update variant');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSearchForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">WVTA CoC Management</h1>
            <p className="text-lg text-slate-600">Certificate of Conformity - Unified Form (HA003U)</p>
          </div>

          {/* Search Card */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Variant
              </CardTitle>
              <CardDescription className="text-blue-100">
                Enter your variant details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(handleLookup)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="manufacturer" className="text-sm font-medium">Manufacturer Code</Label>
                    <Input
                      id="manufacturer"
                      placeholder="e.g., L"
                      {...register('manufacturer')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                    <Input
                      id="type"
                      placeholder="e.g., LE"
                      {...register('type')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="variant" className="text-sm font-medium">Variant</Label>
                    <Input
                      id="variant"
                      placeholder="e.g., NHFECO"
                      {...register('variant')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register('startDate')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate" className="text-sm font-medium">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...register('endDate')}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSearching} className="w-full" size="lg">
                  {isSearching ? '🔍 Searching...' : 'Search Variant'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Update CoC Content</h1>
          <p className="text-lg text-slate-600">Edit vehicle type and variant information</p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6 animate-slideDown">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-500/50 bg-green-500/10 animate-slideDown">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-200">Success</AlertTitle>
            <AlertDescription className="text-green-100">{successMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Type Identification */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-xl">Type Identification</CardTitle>
              <CardDescription>Read-only vehicle type information</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Type" value={watch('type')} />
              <FormField label="Variant" value={watch('variant')} />
              <FormField label="Type Description" value={watch('typeDescription')} />
              <FormField label="Engine" value={watch('engine')} />
              <FormField label="Start Date" value={watch('startDate')} />
              <FormField label="End Date" value={watch('endDate')} />
            </CardContent>
          </Card>

          {/* Type Approval */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-indigo-50 border-b">
              <CardTitle className="text-xl">Type Approval</CardTitle>
              <CardDescription>Approval and certification details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Approval No</Label>
                <Input {...register('approvalNo')} className="mt-1" />
                {fieldErrors.approvalNo && <ErrorText text={fieldErrors.approvalNo} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Approval Day</Label>
                <Input type="number" {...register('approvalDay')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Approval Month</Label>
                <Input type="number" {...register('approvalMonth')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Approval Year</Label>
                <Input type="number" {...register('approvalYear')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Small Series Type App</Label>
                <Select {...register('smallSeriesTypApp')}>
                  <option value="N">N</option>
                  <option value="Y">Y</option>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">New Model Actmass</Label>
                <Select {...register('newModelActmass')}>
                  <option value="N">N</option>
                  <option value="Y">Y</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Test Method</Label>
                <Input {...register('testMethod')} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Axles Configuration */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-purple-50 border-b">
              <CardTitle className="text-xl">Axles Configuration</CardTitle>
              <CardDescription>Wheel and axle specifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Axles/Wheels</Label>
                <Input {...register('axlesWheels')} className="mt-1" />
                {fieldErrors.axlesWheels && <ErrorText text={fieldErrors.axlesWheels} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Wheelbase</Label>
                <Input {...register('wheelbase')} className="mt-1" />
                {fieldErrors.wheelbase && <ErrorText text={fieldErrors.wheelbase} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Pos Axles with Twin Wheels</Label>
                <Input {...register('posAxlesWithTwinWheels')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Steered Axles</Label>
                <Input {...register('steeredAxles')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Powered Axles</Label>
                <Select {...register('poweredAxles')}>
                  <option value="">Select...</option>
                  <option value="H">H (Hydraulic)</option>
                  <option value="N">N (No)</option>
                </Select>
                {fieldErrors.poweredAxles && <ErrorText text={fieldErrors.poweredAxles} />}
              </div>
            </CardContent>
          </Card>

          {/* Position & Interconnection */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-green-50 border-b">
              <CardTitle className="text-xl">Position & Interconnection</CardTitle>
              <CardDescription>System configuration details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium">Position (max 21 chars, no commas)</Label>
                <Input {...register('position')} className="mt-1" />
                {fieldErrors.position && <ErrorText text={fieldErrors.position} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Interconnection (max 40 chars, no commas)</Label>
                <Input {...register('interconnection')} className="mt-1" />
                {fieldErrors.interconnection && <ErrorText text={fieldErrors.interconnection} />}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Dimensions */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-cyan-50 border-b">
              <CardTitle className="text-xl">Vehicle Dimensions</CardTitle>
              <CardDescription>Physical measurements in millimeters</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Length</Label>
                <Input {...register('length')} className="mt-1" />
                {fieldErrors.length && <ErrorText text={fieldErrors.length} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Length with Towbar</Label>
                <Input {...register('lengthWithTowbar')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Width</Label>
                <Input {...register('width')} className="mt-1" />
                {fieldErrors.width && <ErrorText text={fieldErrors.width} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Height</Label>
                <Input {...register('height')} className="mt-1" />
                {fieldErrors.height && <ErrorText text={fieldErrors.height} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Rear Overhang</Label>
                <Input {...register('rearOverhang')} className="mt-1" />
                {fieldErrors.rearOverhang && <ErrorText text={fieldErrors.rearOverhang} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Track</Label>
                <Input {...register('track')} className="mt-1" />
                {fieldErrors.track && <ErrorText text={fieldErrors.track} />}
              </div>
            </CardContent>
          </Card>

          {/* Body Classification */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-orange-50 border-b">
              <CardTitle className="text-xl">Body Classification</CardTitle>
              <CardDescription>Vehicle body and class information</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Type of Body</Label>
                <Input {...register('typeOfBody')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Class of Vehicle</Label>
                <Select {...register('classOfVehicle')}>
                  <option value="">Select...</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Select>
                {fieldErrors.classOfVehicle && <ErrorText text={fieldErrors.classOfVehicle} />}
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium">No. Conf Doors</Label>
                <Input {...register('noConfDoors')} className="mt-1" />
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Tire Value</Label>
                <Input {...register('tyreValue')} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Engine Details (HA003D) */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-red-50 border-b">
              <CardTitle className="text-xl">Engine Details (HA003D)</CardTitle>
              <CardDescription>Engine specifications and performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Engine Code</Label>
                <Input {...register('engineCode')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Engine Manufacturer</Label>
                <Input {...register('engineManufacturer')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Working Principle</Label>
                <Input {...register('workingPrinciple')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Engine Cycle</Label>
                <Input {...register('engineCycle')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Engine Ignition Principle</Label>
                <Input {...register('engineIgnition')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Direct Injection</Label>
                <Input {...register('directInjection')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">No. and Arrangement of Cylinders</Label>
                <Input {...register('noArrangementCylinders')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Fuel Type</Label>
                <Input {...register('fuel')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Engine Capacity (cc)</Label>
                <Input {...register('capacity')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Max Net Power (ICE) - kW/rpm</Label>
                <Input {...register('maxNetPower')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Max Hourly Output (Electric) - kW</Label>
                <Input {...register('maxHourlyOutputElec')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Max Net Power (Electric) - kW</Label>
                <Input {...register('maxNetPowerElec')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Max 30-Minute Power (Electric) - kW</Label>
                <Input {...register('max30MinPowerElec')} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Certificate of Conformity (HA003R) */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-amber-50 border-b">
              <CardTitle className="text-xl">Certificate of Conformity (HA003R)</CardTitle>
              <CardDescription>CoC certificate and vehicle information</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium">Location and Method of Attachment of VIN Plate</Label>
                <textarea {...register('vinPlateAttachment')} className="mt-1 p-2 border rounded w-full min-h-24 text-sm" />
              </div>

              <div>
                <Label className="text-sm font-medium">Location of VIN on Chassis</Label>
                <textarea {...register('vinPlateLocation')} className="mt-1 p-2 border rounded w-full min-h-24 text-sm" />
              </div>

              <div>
                <Label className="text-sm font-medium">Type / Commercial Description</Label>
                <textarea {...register('commercialDescription')} className="mt-1 p-2 border rounded w-full min-h-24 text-sm" />
              </div>

              <div>
                <Label className="text-sm font-medium">Remarks</Label>
                <textarea {...register('remarks')} className="mt-1 p-2 border rounded w-full min-h-24 text-sm" />
                {fieldErrors.remarks && <ErrorText text={fieldErrors.remarks} />}
              </div>

              <div>
                <Label className="text-sm font-medium">Additional Technical Information</Label>
                <textarea {...register('additionalInfo')} className="mt-1 p-2 border rounded w-full min-h-24 text-sm" />
                {fieldErrors.additionalInfo && <ErrorText text={fieldErrors.additionalInfo} />}
              </div>
            </CardContent>
          </Card>

          {/* System Fields */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-red-50 border-b">
              <CardTitle className="text-xl">System Fields</CardTitle>
              <CardDescription>User and administrative information</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">CHIP Data</Label>
                <Select {...register('chipData')}>
                  <option value="N">N</option>
                  <option value="Y">Y</option>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">User ID</Label>
                <Input {...register('userId')} className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Page No</Label>
                <Input {...register('pageNo')} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-3 justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowSearchForm(true);
                reset();
              }}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Search
            </Button>

            <Button type="submit" disabled={isLoading} size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <Label className="text-sm font-medium text-slate-600">{label}</Label>
      <div className="mt-1 p-3 bg-slate-50 rounded-md text-sm text-slate-900 border border-slate-200">
        {value || '-'}
      </div>
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {text}
    </p>
  );
}
