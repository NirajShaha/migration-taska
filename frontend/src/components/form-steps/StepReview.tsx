import { UnifiedFormData } from '@/lib/schemas';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface StepReviewProps {
  formData: UnifiedFormData;
}

export default function StepReview({ formData }: StepReviewProps) {
  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === '') return '—';
    return String(value);
  };

  const ReviewSection = ({
    title,
    fields,
  }: {
    title: string;
    fields: { label: string; value: any }[];
  }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <div key={idx} className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/50">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{field.label}</p>
            <p className="text-sm text-white mt-1 font-medium">{formatValue(field.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 overflow-visible">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          Review & Confirm
        </h2>
        <p className="text-slate-400">
          Please review all the information before submitting. Once submitted, the changes will be updated in the database.
        </p>
      </div>

      {/* Alert */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-300 font-medium">Verify All Information</p>
          <p className="text-xs text-amber-200/80 mt-1">
            Please ensure all information is correct before submitting. Changes cannot be easily reverted.
          </p>
        </div>
      </div>

      {/* Step 1: Type Approval */}
      <div className="pt-4 border-t border-slate-700">
        <ReviewSection
          title="Step 1: Type Approval Information (HA003U)"
          fields={[
            { label: 'Type', value: formData.type },
            { label: 'Variant', value: formData.variant },
            { label: 'Type Description', value: formData.typeDescription },
            { label: 'Engine Code', value: formData.engine },
            { label: 'Start Date', value: formData.startDate },
            { label: 'End Date', value: formData.endDate },
            { label: 'Manufacturer', value: formData.manufacturer },
            { label: 'Approval Number', value: formData.approvalNo },
            {
              label: 'Approval Date',
              value:
                formData.approvalDay && formData.approvalMonth && formData.approvalYear
                  ? `${String(formData.approvalDay).padStart(2, '0')}/${String(formData.approvalMonth).padStart(2, '0')}/${formData.approvalYear}`
                  : '—',
            },
            { label: 'Small Series Type App.', value: formData.smallSeriesTypApp },
            { label: 'New Model Actual Mass', value: formData.newModelActmass },
            { label: 'Chip Data', value: formData.chipData },
            { label: 'Test Method', value: formData.testMethod },
          ]}
        />
      </div>

      {/* Step 2: CoC Certificate */}
      <div className="pt-4 border-t border-slate-700">
        <ReviewSection
          title="Step 2: Certificate of Conformity (HA003R)"
          fields={[
            { label: 'Position', value: formData.position },
            { label: 'Interconnection System', value: formData.interconnection },
          ]}
        />
      </div>

      {/* Step 3: Engine Details */}
      <div className="pt-4 border-t border-slate-700">
        <ReviewSection
          title="Step 3: Engine & Technical Specifications (HA003D)"
          fields={[
            { label: 'Axles & Wheels', value: formData.axlesWheels },
            { label: 'Wheelbase', value: formData.wheelbase },
            { label: 'Position of Twin Wheels', value: formData.posAxlesWithTwinWheels },
            { label: 'Steered Axles', value: formData.steeredAxles },
            { label: 'Powered Axles', value: formData.poweredAxles },
          ]}
        />
      </div>

      {/* Step 4: Vehicle Dimensions */}
      <div className="pt-4 border-t border-slate-700">
        <ReviewSection
          title="Step 4: Vehicle Dimensions & Configuration (VAC)"
          fields={[
            { label: 'Length', value: formData.length },
            { label: 'Length with Towbar', value: formData.lengthWithTowbar },
            { label: 'Width', value: formData.width },
            { label: 'Height', value: formData.height },
            { label: 'Rear Overhang', value: formData.rearOverhang },
            { label: 'Track', value: formData.track },
            { label: 'Type of Body', value: formData.typeOfBody },
            { label: 'Class of Vehicle', value: formData.classOfVehicle },
            { label: 'Number & Configuration of Doors', value: formData.noConfDoors },
            { label: 'Tire Value', value: formData.tyreValue || 'N/A' },
          ]}
        />
      </div>

      {/* System Fields */}
      <div className="pt-4 border-t border-slate-700">
        <ReviewSection
          title="System Information"
          fields={[{ label: 'User ID', value: formData.userId }]}
        />
      </div>

      {/* Summary */}
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <p className="text-sm text-green-300">
          ✓ All fields have been completed. Click <strong>Submit & Update</strong> to save these changes to the database.
        </p>
      </div>
    </div>
  );
}
