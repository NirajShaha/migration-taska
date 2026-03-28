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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Certificate of Conformity (CoC) Details</h2>
        <p className="text-slate-400">
          Vehicle positioning and interconnection information from HA003R screen
        </p>
      </div>

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

      {/* Vehicle Position and Interconnection */}
      <div className="space-y-6 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Position & Interconnection</h3>

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
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
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
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500 resize-none h-24"
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

      {/* Additional CoC Information */}
      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
        <p className="text-sm text-slate-300">
          <strong>Note:</strong> This step captures the Certificate of Conformity positioning and system interconnection data as defined in HA003R screen. These fields are critical for regulatory compliance and must accurately reflect the vehicle's configuration.
        </p>
      </div>
    </div>
  );
}
