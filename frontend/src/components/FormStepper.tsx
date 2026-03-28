import { Check } from 'lucide-react';

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, title: 'Type Approval', description: 'HA003U - Approval & Dimensions' },
  { number: 2, title: 'CoC Certificate', description: 'HA003R - VIN & Description' },
  { number: 3, title: 'Engine Details', description: 'HA003D - Engine Specifications' },
  { number: 4, title: 'Review', description: 'Verify & Submit' },
];

export default function FormStepper({ currentStep, totalSteps }: FormStepperProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 w-full h-1 bg-slate-700/50 rounded-full"></div>

      {/* Progress bar fill */}
      <div
        className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>

      {/* Steps */}
      <div className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <button
                type="button"
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all mb-3 ${
                  isCompleted
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                    : isCurrent
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50 scale-110'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </button>

              <div className="text-center">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 hidden sm:block">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
