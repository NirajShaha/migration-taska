"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { UnifiedFormSchema, type UnifiedFormData } from "@/lib/schemas";
import { apiClient, UnifiedCoCARequest } from "@/lib/api";
import StepTypeApproval from "@/components/form-steps/StepTypeApproval";
import StepCoCCertificate from "@/components/form-steps/StepCoCCertificate";
import StepEngineDetails from "@/components/form-steps/StepEngineDetails";
import StepReview from "@/components/form-steps/StepReview";
import FormStepper from "@/components/FormStepper";
import { DEFAULT_FORM_VALUES } from "@/lib/form-config";

const TOTAL_STEPS = 4;

export default function VariantUpdatePage() {
  const router = useRouter();

  // State Management
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false); // Prevents hydration mismatch

  // Form Setup
  const form = useForm<UnifiedFormData>({
    resolver: zodResolver(UnifiedFormSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { isSubmitting } = form.formState;

  // Safe Hydration & Data Loading
  useEffect(() => {
    setIsClient(true);

    try {
      const variantData = sessionStorage.getItem("variantData");
      if (variantData) {
        const parsedData = JSON.parse(variantData);
        form.reset({ ...DEFAULT_FORM_VALUES, ...parsedData });
      }
    } catch (e) {
      console.error("Failed to parse variant data from session storage", e);
      setError("Failed to load saved form data. You may need to start over.");
    }
  }, [form]);

  // Strictly typed step fields mapping
  const getStepFields = useCallback(
    (step: number): (keyof UnifiedFormData)[] => {
      switch (step) {
        case 1:
          return [
            "approvalNo",
            "approvalDate",
            "smallSeriesTypApp",
            "newModelActmass",
            "testMethod",
            "axlesWheels",
            "wheelbase",
            "posAxlesWithTwinWheels",
            "steeredAxles",
            "poweredAxles",
            "position",
            "interconnection",
            "length",
            "lengthWithTowbar",
            "width",
            "height",
            "rearOverhang",
            "track",
            "typeOfBody",
            "classOfVehicle",
            "noConfDoors",
          ];
        case 2:
          return [
            "vinPlateAttachment",
            "vinPlateLocation",
            "commercialDescription",
            "remarks",
          ];
        case 3:
          return [
            "engineCode",
            "engineManufacturer",
            "workingPrinciple",
            "engineCycle",
            "engineIgnition",
            "directInjection",
            "noArrangementCylinders",
            "fuel",
            "capacity",
            "maxNetPower",
            "maxHourlyOutputElec",
            "maxNetPowerElec",
            "max30MinPowerElec",
          ];
        case 4:
          return []; // Review step doesn't require new validation
        default:
          return [];
      }
    },
    []
  );

  const handleNext = async () => {
    setError(null);
    const stepFields = getStepFields(currentStep);

    // Strictly typed validation trigger - no more 'any'
    const isValid = await form.trigger(stepFields);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError("Please fix the highlighted errors before proceeding");
    }
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: UnifiedFormData) => {
    setError(null);

    try {
      // Safely parse search parameters
      const rawSearchParams = sessionStorage.getItem("searchParams");
      if (!rawSearchParams) {
        throw new Error("Session expired. Missing search context.");
      }

      const searchParams = JSON.parse(rawSearchParams);

      // Data Transformation Layer
      const apiPayload: UnifiedCoCARequest = {
        ...data,
        // Safely parse numbers. If field is blank string, send undefined to DB.
        approvalDay: data.approvalDay
          ? parseInt(data.approvalDay, 10)
          : undefined,
        approvalMonth: data.approvalMonth
          ? parseInt(data.approvalMonth, 10)
          : undefined,
        approvalYear: data.approvalYear
          ? parseInt(data.approvalYear, 10)
          : undefined,

        // Type coercion safety
        chipData: data.chipData || "N",
      };

      const response = await apiClient.updateUnifiedVariant(
        searchParams.manufacturer || "",
        searchParams.type || "",
        searchParams.startDate || "",
        searchParams.endDate || "",
        searchParams.variant || "",
        searchParams.manufacturer || "",
        apiPayload
      );

      if (response?.valid) {
        setSuccess(true);
        setTimeout(() => {
          sessionStorage.removeItem("searchParams");
          sessionStorage.removeItem("variantData");
          router.push("/");
        }, 2000);
      } else {
        // Display specific backend errors if available
        const backendMessage =
          response?.errors?.[0]?.errorMessage || "Failed to update variant.";
        setError(backendMessage);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
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

  // Prevent hydration mismatch by not rendering complex UI until client is ready
  if (!isClient) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="border-green-500/50 bg-slate-800/50 backdrop-blur-xl max-w-md w-full">
          <div className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-slate-300 mb-6">
              Variant updated successfully. Redirecting...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            type="button" // Critical: prevents accidental form submission
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Update Variant Information
            </h1>
            <p className="text-slate-300">
              Complete all steps to update your vehicle variant details
            </p>
          </div>
        </div>

        <div className="mb-8">
          <FormStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {error && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl shadow-2xl mb-6 overflow-visible">
          <div className="p-8 overflow-visible">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 overflow-visible"
              >
                <div className="overflow-visible">
                  {renderStep()}
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || isSubmitting}
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep === TOTAL_STEPS ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      {isSubmitting ? (
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
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
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

        <div className="text-center text-sm text-slate-400">
          <p>
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>
      </div>
    </div>
  );
}