'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariantFormSchema, VariantFormData } from '@/lib/schemas';
import { apiClient } from '@/lib/api';

export const VariantForm: React.FC = () => {
  const [phase, setPhase] = useState<'lookup' | 'display'>('lookup');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [retrievedData, setRetrievedData] = useState<any>(null);

  // Lookup form
  const {
    register: registerLookup,
    handleSubmit: handleSubmitLookup,
    formState: { errors: errorsLookup },
  } = useForm({
    defaultValues: {
      varModel: '',
      varType: '',
      varStartDate: '',
      varEndDate: '',
      varVariant: '',
      varManf: '',
    },
  });

  // Display/Update form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<VariantFormData>({
    resolver: zodResolver(VariantFormSchema),
  });

  const varChipData = watch('varChipData');

  // Handle lookup
  const onSubmitLookup = async (data: any) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const result = await apiClient.lookupVariant(
        data.varModel,
        data.varType,
        data.varStartDate,
        data.varEndDate,
        data.varVariant,
        data.varManf
      );

      if (!result) {
        setErrorMessage('Variant not found');
        return;
      }

      setRetrievedData(result);

      // Pre-fill ALL fields from the retrieved data
      setValue('varModel', result.varModel);
      setValue('varType', result.varType);
      setValue('varStartDate', result.varStartDate);
      setValue('varEndDate', result.varEndDate);
      setValue('varVariant', result.varVariant);
      setValue('varManf', result.varManf);

      // Engine & Power
      setValue('varEngine', result.varEngine || '');
      setValue('varCocMaxPower', result.varCocMaxPower || '');
      setValue('varCocFuel', result.varCocFuel || '');
      setValue('varCocCap', result.varCocCap || '');
      setValue('varCocNoArrCyl', result.varCocNoArrCyl || '');
      setValue('varCocDirectInj', result.varCocDirectInj || '');
      setValue('varCocWrkPrin', result.varCocWrkPrin || '');
      setValue('varCocEngCode', result.varCocEngCode || '');
      setValue('varCocEngMan', result.varCocEngMan || '');

      // Axles Configuration
      setValue('varAxlesCocVal', result.varAxlesCocVal || '');

      // Vehicle Dimensions & Configuration (VAC Fields)
      setValue('axleWheelField1_1', result.axleWheelField1_1 || '');
      setValue('axleWheelField1_2', result.axleWheelField1_2 || '');
      setValue('lengthField3', result.lengthField3 || '');
      setValue('widthField4', result.widthField4 || '');
      setValue('heightField5_1', result.heightField5_1 || '');
      setValue('heightField5_2', result.heightField5_2 || '');
      setValue('rearOverhangField6', result.rearOverhangField6 || '');
      setValue('trackAxleField7', result.trackAxleField7 || '');
      setValue('typeBodyField8', result.typeBodyField8 || '');
      setValue('classVehicleField30', result.classVehicleField30 || '');
      setValue('doorsField30_1', result.doorsField30_1 || '');
      setValue('doorsField31', result.doorsField31 || '');
      setValue('tireField38', result.tireField38 || '');

      // Approval & Flags
      setValue('varCocAnnex', result.varCocAnnex || '');
      setValue('varChipData', result.varChipData || '');
      setValue('varGenTyrList', result.varGenTyrList || '');
      setValue('varNewmodActmasInd', result.varNewmodActmasInd || '');

      setValue('userId', 'USER001');

      setPhase('display');
      setSuccessMessage('✓ Variant found! All details loaded below.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to lookup variant');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitUpdate = async (data: VariantFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Update main variant record
      await apiClient.updateVariant(
        data.varModel,
        data.varType,
        data.varStartDate,
        data.varEndDate,
        data.varVariant,
        data.varManf,
        {
          varModel: data.varModel,
          varType: data.varType,
          varStartDate: data.varStartDate,
          varEndDate: data.varEndDate,
          varVariant: data.varVariant,
          varManf: data.varManf,
          varEngine: data.varEngine,
          varCocMaxPower: data.varCocMaxPower,
          varCocFuel: data.varCocFuel,
          varCocCap: data.varCocCap,
          varCocNoArrCyl: data.varCocNoArrCyl,
          varCocDirectInj: data.varCocDirectInj,
          varCocWrkPrin: data.varCocWrkPrin,
          varCocEngCode: data.varCocEngCode,
          varCocEngMan: data.varCocEngMan,
          varAxlesCocVal: data.varAxlesCocVal,
          varCocAnnex: data.varCocAnnex,
          varChipData: data.varChipData || 'N',
          varGenTyrList: data.varGenTyrList,
          varNewmodActmasInd: data.varNewmodActmasInd,
          userId: data.userId,
        }
      );

      // Update VAC fields (dimension & configuration data)
      const vacUpdates = [
        { fieldNo: '1', subField: '1', value: data.axleWheelField1_1 },
        { fieldNo: '1', subField: '2', value: data.axleWheelField1_2 },
        { fieldNo: '3', subField: '1', value: data.lengthField3 },
        { fieldNo: '4', subField: '1', value: data.widthField4 },
        { fieldNo: '5', subField: '1', value: data.heightField5_1 },
        { fieldNo: '5', subField: '2', value: data.heightField5_2 },
        { fieldNo: '6', subField: '1', value: data.rearOverhangField6 },
        { fieldNo: '7', subField: '1', value: data.trackAxleField7 },
        { fieldNo: '8', subField: '1', value: data.typeBodyField8 },
        { fieldNo: '30', subField: '1', value: data.classVehicleField30 },
        { fieldNo: '30.1', subField: '1', value: data.doorsField30_1 },
        { fieldNo: '31', subField: '1', value: data.doorsField31 },
        { fieldNo: '38', subField: '1', value: data.tireField38 },
      ];

      for (const vac of vacUpdates) {
        if (vac.value && vac.value.trim()) {
          await apiClient.updateVacField(
            data.varModel,
            data.varType,
            data.varStartDate,
            data.varEndDate,
            data.varVariant,
            data.varManf,
            vac.fieldNo,
            vac.subField,
            vac.value,
            data.userId
          );
        }
      }

      setSuccessMessage('✓ Variant updated successfully!');
      setTimeout(() => {
        setPhase('lookup');
        reset();
        setRetrievedData(null);
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update variant');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormInput = (label: string, name: any, required = false, maxLength?: number) => (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        {...register(name)}
        maxLength={maxLength}
        required={required}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          boxSizing: 'border-box',
        }}
      />
      {errors[name as keyof typeof errors] && (
        <span style={{ color: 'red', fontSize: '12px' }}>
          {(errors[name as keyof typeof errors]?.message as string) || 'Invalid field'}
        </span>
      )}
    </div>
  );

  const sectionStyle: React.CSSProperties = {
    marginBottom: '25px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fafafa',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#0056b3',
    borderBottom: '2px solid #0056b3',
    paddingBottom: '8px',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0056b3', borderBottom: '3px solid #0056b3', paddingBottom: '10px' }}>
        📋 HA003U - Vehicle Type/Variant CoC Content
      </h1>

      {successMessage && (
        <div style={{ color: '#155724', padding: '12px', marginBottom: '15px', border: '1px solid #c3e6cb', borderRadius: '4px', backgroundColor: '#d4edda' }}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={{ color: '#721c24', padding: '12px', marginBottom: '15px', border: '1px solid #f5c6cb', borderRadius: '4px', backgroundColor: '#f8d7da' }}>
          {errorMessage}
        </div>
      )}

      {phase === 'lookup' ? (
        <form onSubmit={handleSubmitLookup(onSubmitLookup)}>
          <div style={{ ...sectionStyle, backgroundColor: '#e7f3ff', border: '2px solid #0056b3' }}>
            <div style={sectionTitleStyle}>🔍 Step 1: Search for Variant</div>
            <p style={{ color: '#666', marginTop: '0' }}>
              Enter the variant lookup parameters to retrieve existing data
            </p>

            <div style={gridStyle}>
              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Model <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varModel')}
                  maxLength={1}
                  required
                  placeholder="B"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varModel && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varModel.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Type <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varType')}
                  maxLength={4}
                  required
                  placeholder="7A10"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varType && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varType.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Start Date <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varStartDate')}
                  type="date"
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varStartDate && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varStartDate.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  End Date <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varEndDate')}
                  type="date"
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varEndDate && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varEndDate.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Variant <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varVariant')}
                  maxLength={6}
                  required
                  placeholder="BASE00"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varVariant && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varVariant.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>
                  Manufacturer <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  {...registerLookup('varManf')}
                  maxLength={1}
                  required
                  placeholder="B"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                {errorsLookup.varManf && <span style={{ color: 'red', fontSize: '12px' }}>{errorsLookup.varManf.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '20px',
                padding: '12px 30px',
                backgroundColor: '#0056b3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? '⏳ Searching...' : '🔍 Search Variant'}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitUpdate)}>
          <div style={{ backgroundColor: '#d4edda', padding: '12px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #c3e6cb', color: '#155724' }}>
            <p style={{ margin: '0' }}>✓ <strong>Variant found!</strong> Update details below and click Save.</p>
          </div>

          {/* SECTION 1: Variant Identification */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>📌 Variant Identification</div>
            <div style={gridStyle}>
              {renderFormInput('Model', 'varModel', true, 1)}
              {renderFormInput('Type', 'varType', true, 4)}
              {renderFormInput('Variant Code', 'varVariant', true, 6)}
              {renderFormInput('Manufacturer', 'varManf', true, 1)}
            </div>
            <div style={gridStyle}>
              {renderFormInput('Start Date', 'varStartDate', true)}
              {renderFormInput('End Date', 'varEndDate', true)}
            </div>
          </div>

          {/* SECTION 2: Engine & Power Information */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>🔧 Engine & Power Information</div>
            <div style={gridStyle}>
              {renderFormInput('Engine Code', 'varEngine', false, 12)}
              {renderFormInput('Max Power', 'varCocMaxPower', false, 20)}
              {renderFormInput('Fuel Type', 'varCocFuel', false, 10)}
              {renderFormInput('Displacement (cc)', 'varCocCap', false, 10)}
              {renderFormInput('No. of Cylinders', 'varCocNoArrCyl', false, 5)}
              {renderFormInput('Direct Injection', 'varCocDirectInj', false, 5)}
              {renderFormInput('Working Principle', 'varCocWrkPrin', false, 40)}
              {renderFormInput('Engine Manufacturer Code', 'varCocEngCode', false, 10)}
              {renderFormInput('Engine Manufacturer', 'varCocEngMan', false, 25)}
            </div>
          </div>

          {/* SECTION 3: Axles & Configuration */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>⚙️ Axles & Configuration</div>
            <div style={gridStyle}>
              {renderFormInput('Axles/Wheels CoC Value', 'varAxlesCocVal', false, 50)}
              {renderFormInput('Axles/Wheels Field (1.1)', 'axleWheelField1_1', false, 12)}
              {renderFormInput('Axles/Wheels Field (1.2)', 'axleWheelField1_2', false, 10)}
              {renderFormInput('Track - Axle (Field 7)', 'trackAxleField7', false, 20)}
            </div>
          </div>

          {/* SECTION 4: Vehicle Dimensions */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>📏 Vehicle Dimensions</div>
            <div style={gridStyle}>
              {renderFormInput('Length (mm) - Field 3', 'lengthField3', false, 10)}
              {renderFormInput('Width (mm) - Field 4', 'widthField4', false, 10)}
              {renderFormInput('Height - Max (mm) - Field 5.1', 'heightField5_1', false, 10)}
              {renderFormInput('Height - Min (mm) - Field 5.2', 'heightField5_2', false, 10)}
              {renderFormInput('Rear Overhang (mm) - Field 6', 'rearOverhangField6', false, 10)}
            </div>
          </div>

          {/* SECTION 5: Vehicle Classification */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>🚗 Vehicle Classification</div>
            <div style={gridStyle}>
              {renderFormInput('Type of Body - Field 8', 'typeBodyField8', false, 25)}
              {renderFormInput('Class of Vehicle - Field 30', 'classVehicleField30', false, 10)}
              {renderFormInput('No. and Config of Doors - Field 30.1', 'doorsField30_1', false, 50)}
              {renderFormInput('Doors - Field 31', 'doorsField31', false, 10)}
            </div>
          </div>

          {/* SECTION 6: Tires & Approval */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>🛞 Tires & Approval</div>
            <div style={gridStyle}>
              {renderFormInput('Tire Specifications - Field 38', 'tireField38', false, 50)}
              {renderFormInput('Test Method / Annex', 'varCocAnnex', false, 25)}
              {renderFormInput('Gen Tyre List', 'varGenTyrList', false, 1)}
              {renderFormInput('New Model/ACTMASS Indicator', 'varNewmodActmasInd', false, 1)}
              {renderFormInput('Chip Data', 'varChipData', false, 1)}
            </div>
          </div>

          {/* SECTION 7: System Fields */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>⚙️ System Fields</div>
            {renderFormInput('User ID', 'userId', true, 8)}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '25px', marginBottom: '20px' }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? '⏳ Saving...' : '✓ Save All Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase('lookup');
                reset();
                setRetrievedData(null);
                setSuccessMessage('');
              }}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              ← Back to Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VariantForm;
