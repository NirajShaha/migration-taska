import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { UnifiedFormData } from '@/lib/schemas';

interface StepEngineDetailsProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepEngineDetails({ form }: StepEngineDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Engine & Technical Specifications</h2>
        <p className="text-slate-400">
          Engine configuration and axle details from HA003D screen
        </p>
      </div>

      {/* Axles Configuration */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Axles Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="axlesWheels"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Axles & Wheels</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2A1"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Axle configuration code (max 3 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wheelbase"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Wheelbase</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 3110"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Wheelbase measurement in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="posAxlesWithTwinWheels"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Position of Twin Wheels</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Position code (max 3 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="steeredAxles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Steered Axles</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Number of steered axles (max 3 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="poweredAxles"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Powered Axles</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  className="text-white"
                >
                  <option value="">Select powered axles type</option>
                  <option value="H">H - Hydraulic</option>
                  <option value="N">N - Not Powered</option>
                </Select>
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Select whether axles are powered (H) or not powered (N)
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Engine Technical Details */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Engine Technical Details</h3>

        <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
          <p className="text-sm text-slate-300">
            <strong>From HA003D Screen:</strong> These fields capture detailed engine and axle configuration data. They define the mechanical setup and powered systems of the vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}
