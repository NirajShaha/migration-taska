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
import { UnifiedFormData } from '@/lib/schemas';

interface StepEngineDetailsProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepEngineDetails({ form }: StepEngineDetailsProps) {
  return (
    <div className="space-y-6 overflow-visible">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Engine & Technical Specifications</h2>
        <p className="text-slate-400">
          Engine configuration and specifications from HA003D screen
        </p>
      </div>

      {/* Engine Identification */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Engine Identification</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="engineCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., N57D30OL1"
                    maxLength={10}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineManufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Manufacturer</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., BMW AG"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Engine Technical Details */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Engine Working Specifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="workingPrinciple"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Working Principle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Four-stroke Otto cycle"
                    maxLength={40}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Cycle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4-stroke"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineIgnition"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Ignition Principle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Spark ignition"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="directInjection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Direct Injection</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., YES"
                    maxLength={5}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Cylinders & Fuel */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Cylinders & Fuel</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="noArrangementCylinders"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">No. and Arrangement of Cylinders</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 6"
                    maxLength={12}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  e.g., "6" or "4 cylinders"
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Fuel Type</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., DIESEL"
                    maxLength={15}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Capacity (cc)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 3498"
                    maxLength={6}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Power & Performance */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Power & Performance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maxNetPower"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Max Net Power (ICE) - kW/rpm</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 340 kW"
                    maxLength={15}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxHourlyOutputElec"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Max Hourly Output (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 50"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxNetPowerElec"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Max Net Power (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 45"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max30MinPowerElec"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Max 30-Minute Power (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 40"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
