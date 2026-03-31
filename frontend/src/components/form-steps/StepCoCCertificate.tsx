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
import { Textarea } from '@/components/ui/textarea';
import { UnifiedFormData } from '@/lib/schemas';
import { AlertCircle } from 'lucide-react';

interface StepCoCCertificateProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepCoCCertificate({ form }: StepCoCCertificateProps) {
  return (
    <div className="space-y-6 overflow-visible">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Certificate of Conformity (CoC) Details</h2>
        <p className="text-slate-400">
          Vehicle information and certificate details from HA003R screen
        </p>
      </div>

      {/* Vehicle Identification (Read-only) */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Vehicle Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Type Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type code"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Variant Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Variant code"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Type Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type description"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Engine Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Engine code"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* VIN & Location Information */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">VIN Plate & Location</h3>

        <FormField
          control={form.control}
          name="vinPlateAttachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Location and Method of Attachment of VIN Plate</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., VIN Plate: Dashboard left side, welded to the bodywork"
                  maxLength={70}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 70 characters
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vinPlateLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Location of VIN on Chassis</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Chassis ID: Engine bay right side, stamped on body"
                  maxLength={70}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 70 characters
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Commercial Description */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Vehicle Description</h3>

        <FormField
          control={form.control}
          name="commercialDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Type / Commercial Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., BMW 7 Series Sedan - Premium Executive Vehicle"
                  maxLength={70}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 70 characters
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Remarks & Additional Information */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Remarks & Additional Information</h3>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Remarks</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., EU Regulation 2017/1014 compliant. All emissions limits met."
                  maxLength={375}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 375 characters
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Additional Technical Information</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Advanced climate control, adaptive suspension, intelligent cruise control. 8-speed auto transmission."
                  maxLength={375}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 375 characters
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Position & Interconnection */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">System Configuration</h3>

        {/* Info Alert */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-300 font-medium">Field Validation Rules</p>
            <p className="text-xs text-blue-200/80 mt-1">
              Position and Interconnection fields must not contain commas. These fields define how the vehicle is positioned and systems are connected.
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">
                Position <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Front Axle Position, Rear Axle Position"
                  maxLength={21}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-20"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 21 characters. No commas allowed.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interconnection"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">
                Interconnection System <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Electronic Control Unit, Hydraulic Lines, Mechanical Links"
                  maxLength={40}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-20"
                />
              </FormControl>
              <FormDescription className="text-xs text-slate-500">
                Maximum 40 characters. No commas allowed. Describes how vehicle systems are connected.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
