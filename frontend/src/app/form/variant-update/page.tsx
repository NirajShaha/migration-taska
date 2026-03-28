'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

import { UnifiedFormSchema, type UnifiedFormData } from '@/lib/schemas';
import { apiClient } from '@/lib/api';
import StepTypeApproval from '@/components/form-steps/StepTypeApproval';
import StepCoCCertificate from '@/components/form-steps/StepCoCCertificate';
import StepEngineDetails from '@/components/form-steps/StepEngineDetails';
import StepVehicleDimensions from '@/components/form-steps/StepVehicleDimensions';
import StepReview from '@/components/form-steps/StepReview';
import FormStepper from '@/components/FormStepper';

const TOTAL_STEPS = 4;

// Default form values - prevents controlled/uncontrolled input warnings
const DEFAULT_FORM_VALUES: UnifiedFormData = {
  // Search/Display fields
  type: '',
  variant: '',
  typeDescription: '',
  engine: '',
  startDate: '',
  endDate: '',
  manufacturer: '',

  // HA003U: Type Approval
  approvalNo: '',
  approvalDate: '',
  smallSeriesTypApp: undefined,
  newModelActmass: undefined,
  chartData: 'N',
  testMethod: '',

  // HA003U: Axles
  axlesWheels: '',
  wheelbase: '',
  posAxlesWithTwinWheels: '',
  steeredAxles: '',
  poweredAxles: '',

  // HA003U: Position & Interconnection
  position: '',
  interconnection: '',

  // HA003U: Dimensions
  length: '',
  lengthWithTowbar: '',
  width: '',
  height: '',
  rearOverhang: '',
  track: '',

  // HA003U: Body
  typeOfBody: '',
  classOfVehicle: '',
  noConfDoors: '',

  // HA003R: CoC Certificate
  vinPlateAttachment: '',
  vinPlateLocation: '',
  commercialDescription: '',
  remarks: '',

  // HA003D: Engine Specifications
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

  // System
  userId: 'USER001',
  pageNo: '01',
};

export default function VariantUpdatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(UnifiedFormSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Load data from sessionStorage on mount
  useEffect(() => {
    const variantData = sessionStorage.getItem('variantData');
    if (variantData) {
      const data = JSON.parse(variantData);
      form.reset({ ...DEFAULT_FORM_VALUES, ...data });
    }
  }, [form]);

  const handleNext = async () => {
    setError(null);
    
    // Get fields for current step
    const stepFields = getStepFields(currentStep);
    
    // Validate only fields for current step
    const isValid = await form.trigger(stepFields as any);
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError('Please fix the errors before proceeding');
    }
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (data: UnifiedFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const searchParams = JSON.parse(sessionStorage.getItem('searchParams') || '{}');
      
      const response = await apiClient.updateUnifiedVariant(
        searchParams.manufacturer,
        searchParams.type,
        searchParams.startDate,
        searchParams.endDate,
        searchParams.variant,
        searchParams.manufacturer,
        data
      );

      if (response?.valid) {
        setSuccess(true);
        setTimeout(() => {
          sessionStorage.removeItem('searchParams');
          sessionStorage.removeItem('variantData');
          router.push('/');
        }, 2000);
      } else {
        setError('Failed to update variant. Please check the errors.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update variant');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1: // HA003U: Type Approval
        return [
          'approvalNo',
          'approvalDate',
          'smallSeriesTypApp',
          'newModelActmass',
          'chartData',
          'testMethod',
          'axlesWheels',
          'wheelbase',
          'posAxlesWithTwinWheels',
          'steeredAxles',
          'poweredAxles',
          'position',
          'interconnection',
          'length',
          'lengthWithTowbar',
          'width',
          'height',
          'rearOverhang',
          'track',
          'typeOfBody',
          'classOfVehicle',
          'noConfDoors',
        ];
      case 2: // HA003R: Certificate of Conformity
        return [
          'vinPlateAttachment',
          'vinPlateLocation',
          'commercialDescription',
          'remarks',
        ];
      case 3: // HA003D: Engine Specifications
        return [
          'engineCode',
          'engineManufacturer',
          'workingPrinciple',
          'engineCycle',
          'engineIgnition',
          'directInjection',
          'noArrangementCylinders',
          'fuel',
          'capacity',
          'maxNetPower',
          'maxHourlyOutputElec',
          'maxNetPowerElec',
          'max30MinPowerElec',
        ];
      case 4: // Review
        return [];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepTypeApproval form={form} />;
      case 2:
        return <StepCoCCertificate form={form} />;
      case 3:
        return <StepEngineDetails form={form} />;
      case 4:
        return <StepReview formData={form.getValues()} />;
      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="border-green-500/50 bg-slate-800/50 backdrop-blur-xl max-w-md w-full">
          <div className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-slate-300 mb-6">Variant updated successfully. Redirecting...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
            className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Update Variant Information</h1>
            <p className="text-slate-300">Complete all steps to update your vehicle variant details</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <FormStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Form Card */}
        <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl shadow-2xl mb-6">
          <div className="p-8">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isLoading}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep === TOTAL_STEPS ? (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Submit & Update
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
              </form>
            </FormProvider>
          </div>
        </Card>

        {/* Progress Info */}
        <div className="text-center text-sm text-slate-400">
          <p>Step {currentStep} of {TOTAL_STEPS}</p>
        </div>
      </div>
    </div>
  );
}
