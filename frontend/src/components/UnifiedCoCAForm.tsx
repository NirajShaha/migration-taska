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
  chipData: 'N' as const,
  approvalNo: 'HA2024-001',
  approvalDay: 15,
  approvalMonth: 6,
  approvalYear: 2024,
  smallSeriesTypApp: 'N' as const,
  newModelActmass: 'Y' as const,
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

  // Handle form lookup
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

      if (response.valid) {
        reset(response as any);
        setShowSearchForm(false);
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
      const response = await apiClient.validateUnifiedVariant(data);

      if (response.valid) {
        const updateResponse = await apiClient.updateUnifiedVariant(
          data.manufacturer,
          data.type,
          data.startDate,
          data.endDate,
          data.variant,
          data.manufacturer,
          data
        );

        if (updateResponse.valid) {
          setSuccessMessage('Variant updated successfully!');
          setTimeout(() => {
            setSuccessMessage(null);
            setShowSearchForm(true);
            reset();
          }, 3000);
        } else {
          setError('Failed to update variant');
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
          <Alert variant="success" className="mb-6 animate-slideDown">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
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
