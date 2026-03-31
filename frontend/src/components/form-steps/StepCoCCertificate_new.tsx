'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UnifiedFormData } from '@/lib/schemas';
import { AlertCircle } from 'lucide-react';

interface StepCoCCertificateProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepCoCCertificate({ form }: StepCoCCertificateProps) {
  const watchType = form.watch('type');
  const watchVariant = form.watch('variant');
  const watchDesc = form.watch('typeDescription');
  const watchEngine = form.watch('engine');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded"></div>
          <h2 className="text-3xl font-bold text-white">Certificate of Conformity Details</h2>
        </div>
        <p className="text-slate-300 ml-3">HA003R Screen - Vehicle Identification and Description</p>
      </div>

      {/* Vehicle Display Section */}
      <div className="bg-gradient-to-r from-slate-700/40 via-slate-800/40 to-slate-700/40 p-6 rounded-lg border border-slate-600/50 backdrop-blur">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          Vehicle Information (From Search)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DisplayField label="Type Code" value={watchType} />
          <DisplayField label="Variant Code" value={watchVariant} />
          <DisplayField label="Type Description" value={watchDesc} className="md:col-span-2" />
          <DisplayField label="Engine Code" value={watchEngine} className="md:col-span-2" />
        </div>
      </div>

      {/* Info Alert */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-300 font-medium">Vehicle Identification Information</p>
          <p className="text-xs text-blue-200/80 mt-1">
            Complete all fields related to VIN location, vehicle description, and remarks
          </p>
        </div>
      </div>

      {/* VIN Plate Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">VIN Plate Location & Attachment</h3>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-6">
          <FormField
            control={form.control}
            name="vinPlateAttachment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Location and Method of Attachment</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe where and how the VIN plate is attached to the vehicle..."
                    maxLength={70}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none h-24 min-h-24"
                  />
                </FormControl>
                <p className="text-xs text-slate-500">Max 70 characters</p>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vinPlateLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Location on Chassis</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Specify the exact location of the Vehicle Identification Number on the chassis..."
                    maxLength={70}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none h-24 min-h-24"
                  />
                </FormControl>
                <p className="text-xs text-slate-500">Max 70 characters</p>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Vehicle Description & Remarks */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Description & Remarks</h3>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-6">
          <FormField
            control={form.control}
            name="commercialDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Type/Commercial Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter the commercial description or product type..."
                    maxLength={70}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none h-20 min-h-20"
                  />
                </FormControl>
                <p className="text-xs text-slate-500">Max 70 characters</p>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Remarks & Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter any additional remarks or notes about this vehicle..."
                    maxLength={375}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none h-32 min-h-32"
                  />
                </FormControl>
                <p className="text-xs text-slate-500">Max 375 characters</p>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Additional Technical Information</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter any additional technical information or specifications..."
                    maxLength={375}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none h-32 min-h-32"
                  />
                </FormControl>
                <p className="text-xs text-slate-500">Max 375 characters</p>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function DisplayField({ label, value, className = '' }: { label: string; value: any; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</label>
      <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-700/50 text-slate-100 font-medium">
        {value || '—'}
      </div>
    </div>
  );
}
