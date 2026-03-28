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

interface StepVehicleDimensionsProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepVehicleDimensions({ form }: StepVehicleDimensionsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Vehicle Dimensions & Configuration</h2>
        <p className="text-slate-400">
          Physical dimensions and classification details from VAC (Variant Attributes Components)
        </p>
      </div>

      {/* Dimensions Section */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Physical Measurements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Length</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 5000"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Length in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lengthWithTowbar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Length with Towbar</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 5200"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Length including towbar in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Width</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1900"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Width in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Height</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1500"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Height in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rearOverhang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Rear Overhang</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1000"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Rear overhang in mm (max 9 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="track"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Track (Axle Width)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Front: 1600, Rear: 1620"
                    maxLength={32}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Track for each axle (max 32 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Body Classification */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Body Classification</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="typeOfBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Type of Body</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Sedan, SUV, Wagon"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Vehicle body classification (max 25 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classOfVehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Class of Vehicle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., M1, M2, N1"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  EU vehicle classification (e.g., I, II, III, IV, A, B, C)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noConfDoors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Number & Configuration of Doors</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4 Doors, 2 Sliding Doors"
                    maxLength={50}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Door configuration description (max 50 characters)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tyreValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Tire/Tyre Specification</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Y"
                    maxLength={1}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">
                  Tire configuration code (max 1 character)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
        <p className="text-sm text-slate-300">
          <strong>Note:</strong> All dimensions should be provided in millimeters (mm) unless otherwise specified. These measurements are critical for regulatory compliance and vehicle certification.
        </p>
      </div>
    </div>
  );
}
