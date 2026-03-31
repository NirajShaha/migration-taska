'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    manufacturer: '',
    type: '',
    startDate: '',
    endDate: '',
    variant: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setError(null);
    setIsSearching(true);

    // Validate required fields
    if (!formData.manufacturer || !formData.type || !formData.startDate || !formData.endDate || !formData.variant) {
      setError('All search fields are required');
      setIsSearching(false);
      return;
    }

    try {
      // Call backend to verify variant exists
      const response = await apiClient.lookupUnifiedVariant(
        formData.manufacturer,
        formData.type,
        formData.startDate,
        formData.endDate,
        formData.variant,
        formData.manufacturer
      );

      if (response?.valid) {
        // Map backend response field names to form field names
        const mappedData = {
          // Display fields
          type: response.typType || '',
          variant: response.varVariant || '',
          typeDescription: response.typDescription || '',
          engine: response.varEngine || '',
          startDate: response.typStartDate || '',
          endDate: response.typEndDate || '',
          manufacturer: response.typManf || '',

          // Type Approval fields
          approvalNo: response.typApprovalNo || '',
          approvalDay: response.typApprDay?.toString() || '',
          approvalMonth: response.typApprMonth?.toString() || '',
          approvalYear: response.typApprYear?.toString() || '',
          smallSeriesTypApp: response.typSmallSeries || '',
          newModelActmass: response.varNewmodActmasInd || '',
          approvalTypeIndicator: response.typApprTypeInd || '',
          generateTyreList: response.typGenTyrList || response.varGenTyrList || '',
          chartData: response.varChipData || 'N',
          testMethod: response.testMethod?.trim() || '',

          // Axles Configuration
          axlesWheels: response.axlesWheels || '',
          wheelbase: response.wheelbase || '',
          posAxlesWithTwinWheels: response.posAxlesWithTwinWheels || '',
          steeredAxles: response.steeredAxles || '',
          poweredAxles: response.poweredAxles || '',

          // Position & Interconnection
          position: response.position || '',
          interconnection: response.interconnection || '',

          // Dimensions
          length: response.length || '',
          lengthWithTowbar: response.lengthWithTowbar || '',
          width: response.width || '',
          height: response.height || '',
          rearOverhang: response.rearOverhang || '',
          track: response.track || '',

          // Body Classification
          typeOfBody: response.typeOfBody || '',
          classOfVehicle: response.classOfVehicle || '',
          noConfDoors: response.noConfDoors || '',
          tyreValue: response.tyreValue || '',

          // Engine Details (from varCoc* fields)
          engineCode: response.varCocEngCode || '',
          engineManufacturer: response.varCocEngMan || '',
          workingPrinciple: response.varCocWrkPrin || '',
          engineCycle: response.varCocWrkPrin || '',
          engineIgnition: '',
          directInjection: response.varCocDirectInj?.trim() || '',
          noArrangementCylinders: response.varCocNoArrCyl || '',
          fuel: response.varCocFuel || '',
          capacity: response.varCocCap || '',
          maxNetPower: response.varCocMaxPower || '',
          maxHourlyOutputElec: '',
          maxNetPowerElec: '',
          max30MinPowerElec: '',

          // Certificate (from coc* fields)
          vinPlateAttachment: response.cocLocAttachment || '',
          vinPlateLocation: response.cocLocOnChassis || '',
          commercialDescription: response.cocTypeDescription || '',
          remarks: response.cocRemarks || '',
          additionalInfo: response.cocAdditionalInfo || '',

          // System
          userId: response.lastUpdatedBy || 'USER001',
          pageNo: '01',
        };

        // Store search parameters and mapped response in sessionStorage
        sessionStorage.setItem('searchParams', JSON.stringify(formData));
        sessionStorage.setItem('variantData', JSON.stringify(mappedData));
        
        // Redirect to multi-step form
        router.push('/form/variant-update');
      } else {
        setError('Variant not found. Please check your search criteria.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search variant');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Certificate Management System</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Variant Management
            </h1>
            <p className="text-lg text-slate-300">
              Search and update vehicle variant information, certificates, and technical specifications
            </p>
          </div>

          {/* Search Card */}
          <Card className="mb-8 border-slate-700/50 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-400" />
                Search Variant
              </h2>

              {error && (
                <Alert className="mb-6 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Manufacturer Code */}
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer" className="text-slate-300 font-medium">
                      Manufacturer Code <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="manufacturer"
                      placeholder="e.g., B (BMW), M (Mercedes)"
                      value={formData.manufacturer}
                      onChange={(e) => handleInputChange('manufacturer', e.target.value.toUpperCase())}
                      maxLength={1}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700 focus:border-blue-500/50"
                      disabled={isSearching}
                    />
                    <p className="text-xs text-slate-400">Single character code</p>
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-slate-300 font-medium">
                      Type <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="type"
                      placeholder="e.g., 7A10"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value.toUpperCase())}
                      maxLength={4}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700 focus:border-blue-500/50"
                      disabled={isSearching}
                    />
                    <p className="text-xs text-slate-400">Max 4 characters</p>
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-slate-300 font-medium">
                      Start Date <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700 focus:border-blue-500/50"
                      disabled={isSearching}
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-slate-300 font-medium">
                      End Date <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700 focus:border-blue-500/50"
                      disabled={isSearching}
                    />
                  </div>

                  {/* Variant */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="variant" className="text-slate-300 font-medium">
                      Variant <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="variant"
                      placeholder="e.g., BASE00"
                      value={formData.variant}
                      onChange={(e) => handleInputChange('variant', e.target.value.toUpperCase())}
                      maxLength={6}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-700 focus:border-blue-500/50"
                      disabled={isSearching}
                    />
                    <p className="text-xs text-slate-400">Max 6 characters</p>
                  </div>
                </div>

                {/* Search Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Variant
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    Search
                  </div>
                  <p className="text-sm text-slate-400">Find your vehicle variant</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    Update
                  </div>
                  <p className="text-sm text-slate-400">Edit in guided steps</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    Confirm
                  </div>
                  <p className="text-sm text-slate-400">Review and submit</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
