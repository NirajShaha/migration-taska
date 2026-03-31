import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { UnifiedFormData } from '@/lib/schemas';

interface StepTypeApprovalProps {
  form: UseFormReturn<UnifiedFormData>;
}

export default function StepTypeApproval({ form }: StepTypeApprovalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Type Approval Information</h2>
        <p className="text-slate-400">
          Complete the type approval and variant identification details from HA003U screen
        </p>
      </div>

      {/* Type & Variant (Read-only Display) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Type</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., 7A10"
                  className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Variant</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., BASE00"
                  className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Type Description & Engine (Read-only Display) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="typeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Type Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., BMW 7 Series Sedan"
                  className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
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
                  placeholder="e.g., N57D30OL1"
                  className="bg-slate-700/50 border-slate-600/50 text-slate-300 cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="bg-slate-700/50 border-slate-600/50 text-white cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="bg-slate-700/50 border-slate-600/50 text-white cursor-not-allowed"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      {/* Manufacturer */}
      <FormField
        control={form.control}
        name="manufacturer"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-300">Manufacturer Code</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g., B"
                maxLength={1}
                className="bg-slate-700/50 border-slate-600/50 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />

      {/* Approval Fields */}
      <div className="space-y-4 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Approval Information</h3>

        <FormField
          control={form.control}
          name="approvalNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Approval No.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., EU2024/001234/DE"
                  maxLength={25}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="approvalDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Day</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="01-31"
                    min={1}
                    max={31}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="approvalMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Month</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="01-12"
                    min={1}
                    max={12}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="approvalYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Year</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="YYYY"
                    min={1900}
                    max={9999}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Flags */}
      <div className="space-y-4 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Additional Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="smallSeriesTypApp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Small Series Type App.</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="Y">Yes (Y)</option>
                    <option value="N">No (N)</option>
                    <option value="/">Not Applicable (/)</option>
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
                <FormLabel className="text-slate-300">New Model Actual Mass</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="Y">Yes (Y)</option>
                    <option value="N">No (N)</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chipData"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Chip Data</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="Y">Yes (Y)</option>
                    <option value="N">No (N)</option>
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
                <FormLabel className="text-slate-300">Test Method</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., WVTA"
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
            name="approvalTypeIndicator"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Approval Type Indicator</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="A">A - Type</option>
                    <option value="B">B - Individual</option>
                    <option value="C">C - Small Series</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="generateTyreList"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Generate Tyre List</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="Y">Yes (Y)</option>
                    <option value="N">No (N)</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Dimensions & Body Classification */}
      <div className="space-y-4 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Dimensions & Body Configuration</h3>

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
                    placeholder="e.g., 3850"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
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
                <FormLabel className="text-slate-300">Length with Towbar</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 4201"
                    maxLength={9}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
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
                <FormLabel className="text-slate-300">Class of Vehicle</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
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
              <FormItem>
                <FormLabel className="text-slate-300">No. & Conf. of Doors</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., M1"
                    maxLength={50}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Position & Interconnection */}
      <div className="space-y-4 pt-4 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-white">Axles & Position</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="posAxlesWithTwinWheels"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Position of Twin Wheel Axles</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 2N4"
                    maxLength={12}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
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
                <FormLabel className="text-slate-300">Steered Axles</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., 1S3"
                    maxLength={3}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
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
                <FormLabel className="text-slate-300">Powered Axles</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  >
                    <option value="">Select</option>
                    <option value="H">H</option>
                    <option value="N">N</option>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Position</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Front and Rea"
                    maxLength={21}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interconnection"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Interconnection System</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Propshaf"
                    maxLength={40}
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
