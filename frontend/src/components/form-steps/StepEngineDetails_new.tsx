'use client';

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
import { AlertCircle } from 'lucide-react';

interface StepEngineDetailsProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepEngineDetails({ form }: StepEngineDetailsProps) {
  const watchType = form.watch('type');
  const watchVariant = form.watch('variant');
  const watchDesc = form.watch('typeDescription');
  const watchEngine = form.watch('engine');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-600 rounded"></div>
          <h2 className="text-3xl font-bold text-white">Engine & Technical Specifications</h2>
        </div>
        <p className="text-slate-300 ml-3">HA003D Screen - Complete engine and technical details</p>
      </div>

      {/* Vehicle Display */}
      <div className="bg-gradient-to-r from-slate-700/40 via-slate-800/40 to-slate-700/40 p-6 rounded-lg border border-slate-600/50 backdrop-blur">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
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
          <p className="text-sm text-blue-300 font-medium">Engine Specifications Format</p>
          <p className="text-xs text-blue-200/80 mt-1">
            Engine Cycle and Ignition Principle fields cannot contain commas
          </p>
        </div>
      </div>

      {/* Engine Identification */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Engine Identification</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="engineCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Engine Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 508PS"
                    maxLength={10}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
                <FormLabel className="text-slate-300 font-medium">Engine Manufacturer</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., TigerSoft Engines Ltd"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workingPrinciple"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-slate-300 font-medium">Working Principle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4-stroke Diesel Turbocharged"
                    maxLength={40}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Engine Operating Characteristics */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Operating Characteristics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="engineCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Engine Cycle (Engine Cycle)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4-stroke, 2-stroke"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">No commas allowed</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engineIgnition"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Engine Ignition Principle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Spark Ignition, Compression Ignition"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">No commas allowed</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="directInjection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Direct Injection</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Yes, Direct"
                    maxLength={5}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noArrangementCylinders"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">No. and Arrangement of Cylinders</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4 cylinders in-line"
                    maxLength={12}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Engine Performance */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Engine Performance & Specifications</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Fuel Type</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Diesel, Petrol, LPG"
                    maxLength={15}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
                <FormLabel className="text-slate-300 font-medium">Engine Capacity (cc)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1998"
                    maxLength={6}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxNetPower"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Max Net Power (ICE) - kW/rpm</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 386/5500"
                    maxLength={15}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
                <FormLabel className="text-slate-300 font-medium">Max Hourly Output (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 50"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
                <FormLabel className="text-slate-300 font-medium">Max Net Power (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 45"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
                <FormLabel className="text-slate-300 font-medium">Max 30-Minute Power (Electric) - kW</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 40"
                    maxLength={8}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
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
