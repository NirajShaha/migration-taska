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
import { Select } from '@/components/ui/select';
import { UnifiedFormData } from '@/lib/schemas';
import { Info } from 'lucide-react';

interface StepTypeApprovalProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepTypeApproval({ form }: StepTypeApprovalProps) {
  const watchType = form.watch('type');
  const watchVariant = form.watch('variant');
  const watchDesc = form.watch('typeDescription');
  const watchEngine = form.watch('engine');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
          <h2 className="text-3xl font-bold text-white">Type Approval Information</h2>
        </div>
        <p className="text-slate-300 ml-3">HA003U Screen - Complete all required fields</p>
      </div>

      {/* Info Alert */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-300 font-medium">Important Format Requirements</p>
          <ul className="text-xs text-blue-200/80 mt-2 space-y-1 list-disc list-inside">
            <li>Approval Date must be in DD/MM/YYYY format</li>
            <li>Position and Interconnection fields cannot contain commas</li>
            <li>Engine Cycle and Ignition fields cannot contain commas</li>
          </ul>
        </div>
      </div>

      {/* Vehicle Display Section */}
      <div className="bg-gradient-to-r from-slate-700/40 via-slate-800/40 to-slate-700/40 p-6 rounded-lg border border-slate-600/50 backdrop-blur">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          Vehicle Information (From Search)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DisplayField label="Type Code" value={watchType} />
          <DisplayField label="Variant Code" value={watchVariant} />
          <DisplayField label="Type Description" value={watchDesc} className="md:col-span-2" />
          <DisplayField label="Engine Code" value={watchEngine} className="md:col-span-2" />
        </div>
      </div>

      {/* Approval Information Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Approval Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="approvalNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Approval Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., HA2024-001"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">Max 25 characters</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="approvalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Approval Date <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">Format: DD/MM/YYYY (e.g., 15/06/2024)</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smallSeriesTypApp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Small Series Type App</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <option value="">Select...</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                    <option value="/">Not Applicable</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newModelActmass"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">New Model Actual Mass</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <option value="">Select...</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chartData"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Chart Data</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Test Method</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., UN ECE R14"
                    maxLength={25}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Axles Configuration */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Axles & Chassis Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="axlesWheels"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Axles/Wheels <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2-2"
                    maxLength={12}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wheelbase"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Wheelbase (mm) <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2587"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="posAxlesWithTwinWheels"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Position of Twin Wheel Axles</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2nd"
                    maxLength={12}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="steeredAxles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Steered Axles</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1st"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="poweredAxles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Powered Axles</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <option value="">Select...</option>
                    <option value="H">H (Hydraulic)</option>
                    <option value="N">N (Not Powered)</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Position & Interconnection */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Position & System Interconnection</h3>
        </div>

        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 space-y-6">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Position <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Front Axle Position, Rear Axle Position"
                    maxLength={21}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">Max 21 characters. No commas allowed.</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interconnection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Interconnection System <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Electronic Control Unit, Hydraulic Lines, Mechanical Links"
                    maxLength={40}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormDescription className="text-xs text-slate-500">Max 40 characters. No commas allowed. Describes system connections.</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Vehicle Dimensions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Vehicle Dimensions (in mm)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Length <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 3851"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lengthWithTowbar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Length with Towbar</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4200"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Width <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1996"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Height <span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1920"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rearOverhang"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Rear Overhang</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 820"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="track"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Track (Axle 1/2/3)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1698/1683"
                    maxLength={32}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Body Classification */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-600 rounded"></div>
          <h3 className="text-xl font-semibold text-white">Body Classification</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <FormField
            control={form.control}
            name="typeOfBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Type of Body</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Off-road vehicle, Sedan"
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
            name="classOfVehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-medium">Class of Vehicle</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                  >
                    <option value="">Select...</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noConfDoors"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-slate-300 font-medium">No. and Configuration of Doors</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4 side doors + 1 tailgate"
                    maxLength={50}
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
