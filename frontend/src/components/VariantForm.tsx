'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariantFormSchema, VariantFormData } from '@/lib/schemas';
import { apiClient } from '@/lib/api';
import { useFieldValidation } from '@/hooks/useFieldValidation';

/**
 * VariantForm - Maps COBOL HA003U screen "UPDATE COC CONTENT (TYPE/ VARIANT)"
 * Handles variant updates with all field validations and COC content management
 */
export const VariantForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [chipData, setChipData] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<VariantFormData>({
    resolver: zodResolver(VariantFormSchema),
  });

  const {
    errors: validationErrors,
    validatePosition,
    validateInterconnection,
    validateWheelbase,
    validateAxleWheel,
    validatePosWheelOrSteerAxle,
    validateSmallSeriesTypApp,
    validateClass,
  } = useFieldValidation();

  const poweredAxles = watch('axleWheel');
  const position = watch('position');
  const interconnection = watch('interconnection');

  // Validation: If powered axles provided, position and interconnection required
  useEffect(() => {
    if (poweredAxles && poweredAxles.trim() && (!position || !interconnection)) {
      setErrorMessage('If Powered Axles specified, Position and Interconnection are required');
    } else {
      setErrorMessage('');
    }
  }, [poweredAxles, position, interconnection]);

  const onSubmit = async (data: VariantFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Validate all fields according to COBOL rules
      if (!validatePosition(data.position || '')) {
        throw new Error(validationErrors.position || 'Invalid position');
      }
      if (!validateInterconnection(data.interconnection || '')) {
        throw new Error(validationErrors.interconnection || 'Invalid interconnection');
      }
      if (!validateWheelbase(data.wheelbase || '')) {
        throw new Error(validationErrors.wheelbase || 'Invalid wheelbase');
      }
      if (!validateAxleWheel(data.axleWheel || '')) {
        throw new Error(validationErrors.axleWheel || 'Invalid axle/wheel');
      }
      if (!validatePosWheelOrSteerAxle(data.posWheel || '')) {
        throw new Error(validationErrors.posWheel || 'Invalid position wheel');
      }
      if (!validatePosWheelOrSteerAxle(data.steerAxle || '')) {
        throw new Error(validationErrors.posWheel || 'Invalid steer axle');
      }
      if (!validateSmallSeriesTypApp(data.smallSeriesTypApp || '')) {
        throw new Error(validationErrors.smallSeries || 'Invalid small series type');
      }
      if (!validateClass(data.classOfVehicle || '')) {
        throw new Error(validationErrors.class || 'Invalid class');
      }

      // Build powered axles concatenation (maps HA200T-UPDATE-POWERED-AXLE section logic)
      let varAxlesCocVal = data.axleWheel || '';
      if (data.position) {
        varAxlesCocVal += ',' + data.position;
      }
      if (data.interconnection) {
        varAxlesCocVal += ',' + data.interconnection;
      }

      // Update variant
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
          varAxlesCocVal,
          varCocAnnex: data.testMethod,
          varChipData: chipData ? 'Y' : 'N',
          varGenTyrList: data.varGenTyrList,
          varNewmodActmasInd: data.varNewmodActmasInd,
          userId: data.userId,
        }
      );

      // Update VAC fields (maps HA300T-UPDATE-VAC-FIELDS section)
      if (!chipData) {
        const vacUpdates = [
          { fieldNo: '1', subField: '1', value: data.axleWheel },
          { fieldNo: '3', subField: '1', value: data.wheelbase },
          { fieldNo: '4', subField: '1', value: data.track },
          { fieldNo: '5', subField: '1', value: data.length },
          { fieldNo: '5', subField: '2', value: data.lengthWithTowbar },
          { fieldNo: '6', subField: '1', value: data.width },
          { fieldNo: '7', subField: '1', value: data.height },
          { fieldNo: '8', subField: '1', value: data.overhang },
          { fieldNo: '0.1', subField: '3', value: data.posWheel },
          { fieldNo: '0.1', subField: '4', value: data.steerAxle },
          { fieldNo: '30', subField: '1', value: data.typeOfBody },
          { fieldNo: '30.1', subField: '1', value: data.classOfVehicle },
          { fieldNo: '31', subField: '1', value: data.noOfDoors },
        ];

        for (const vac of vacUpdates) {
          if (vac.value) {
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
      }

      setSuccessMessage('Variant updated successfully');
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update variant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>WVTA HA003U - Update CoC Content (Type/Variant)</h1>

      {successMessage && (
        <div style={{ color: 'green', padding: '10px', marginBottom: '10px', border: '1px solid green' }}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={{ color: 'red', padding: '10px', marginBottom: '10px', border: '1px solid red' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Type and Variant Section */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Type and Variant Information</legend>

          <label>
            Model: *
            <input {...register('varModel')} />
            {errors.varModel && <span style={{ color: 'red' }}>{errors.varModel.message}</span>}
          </label>

          <label>
            Type: *
            <input {...register('varType')} maxLength={4} />
            {errors.varType && <span style={{ color: 'red' }}>{errors.varType.message}</span>}
          </label>

          <label>
            Start Date: *
            <input {...register('varStartDate')} type="date" />
            {errors.varStartDate && <span style={{ color: 'red' }}>{errors.varStartDate.message}</span>}
          </label>

          <label>
            End Date: *
            <input {...register('varEndDate')} type="date" />
            {errors.varEndDate && <span style={{ color: 'red' }}>{errors.varEndDate.message}</span>}
          </label>

          <label>
            Variant: *
            <input {...register('varVariant')} maxLength={6} />
            {errors.varVariant && <span style={{ color: 'red' }}>{errors.varVariant.message}</span>}
          </label>

          <label>
            Manufacturer: *
            <input {...register('varManf')} maxLength={1} />
            {errors.varManf && <span style={{ color: 'red' }}>{errors.varManf.message}</span>}
          </label>
        </fieldset>

        {/* Engine and Test Method */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Engine and Testing Information</legend>

          <label>
            Engine:
            <input {...register('varEngine')} maxLength={12} />
          </label>

          <label>
            Testing Method:
            <input {...register('testMethod')} maxLength={25} />
          </label>
        </fieldset>

        {/* Approval Information */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Approval Information</legend>

          <label>
            Small Series Type Application:
            <input {...register('smallSeriesTypApp')} onBlur={(e) => validateSmallSeriesTypApp(e.target.value)} />
            {validationErrors.smallSeries && <span style={{ color: 'red' }}>{validationErrors.smallSeries}</span>}
          </label>

          <label>
            New Model for ACTMASS:
            <input {...register('varNewmodActmasInd')} maxLength={1} />
          </label>
        </fieldset>

        {/* Powered Axles Configuration */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Powered Axles Configuration</legend>

          <label>
            Axles/Wheels:
            <input {...register('axleWheel')} onBlur={(e) => validateAxleWheel(e.target.value)} />
            {validationErrors.axleWheel && <span style={{ color: 'red' }}>{validationErrors.axleWheel}</span>}
          </label>

          <label>
            Position (Max 21 chars):
            <input {...register('position')} onBlur={(e) => validatePosition(e.target.value)} disabled={chipData} />
            {validationErrors.position && <span style={{ color: 'red' }}>{validationErrors.position}</span>}
          </label>

          <label>
            Interconnection (Max 40 chars):
            <input {...register('interconnection')} onBlur={(e) => validateInterconnection(e.target.value)} disabled={chipData} />
            {validationErrors.interconnection && <span style={{ color: 'red' }}>{validationErrors.interconnection}</span>}
          </label>

          <label>
            Pos Wheel:
            <input {...register('posWheel')} onBlur={(e) => validatePosWheelOrSteerAxle(e.target.value)} disabled={chipData} />
          </label>

          <label>
            Steer Axle:
            <input {...register('steerAxle')} onBlur={(e) => validatePosWheelOrSteerAxle(e.target.value)} disabled={chipData} />
          </label>
        </fieldset>

        {/* Dimensions */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Vehicle Dimensions</legend>

          <label>
            Wheelbase:
            <input {...register('wheelbase')} onBlur={(e) => validateWheelbase(e.target.value)} disabled={chipData} />
            {validationErrors.wheelbase && <span style={{ color: 'red' }}>{validationErrors.wheelbase}</span>}
          </label>

          <label>
            Track:
            <input {...register('track')} disabled={chipData} />
          </label>

          <label>
            Length:
            <input {...register('length')} disabled={chipData} />
          </label>

          <label>
            Length with Towbar:
            <input {...register('lengthWithTowbar')} disabled={chipData} />
          </label>

          <label>
            Width:
            <input {...register('width')} disabled={chipData} />
          </label>

          <label>
            Height:
            <input {...register('height')} disabled={chipData} />
          </label>

          <label>
            Rear Overhang:
            <input {...register('overhang')} disabled={chipData} />
          </label>
        </fieldset>

        {/* Vehicle Classification */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Vehicle Classification</legend>

          <label>
            Type of Body:
            <input {...register('typeOfBody')} maxLength={25} disabled={chipData} />
          </label>

          <label>
            Class of Vehicle (I/II/III/A/B):
            <input {...register('classOfVehicle')} maxLength={3} onBlur={(e) => validateClass(e.target.value)} disabled={chipData} />
            {validationErrors.class && <span style={{ color: 'red' }}>{validationErrors.class}</span>}
          </label>

          <label>
            No and Configuration of Doors:
            <input {...register('noOfDoors')} maxLength={50} disabled={chipData} />
          </label>
        </fieldset>

        {/* System Settings */}
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>System Settings</legend>

          <label>
            <input
              type="checkbox"
              checked={chipData}
              onChange={(e) => setChipData(e.target.checked)}
            />
            CHIP Data (Y) - Disables all CoC field editing
          </label>
        </fieldset>

        {/* General */}
        <label>
          User ID: *
          <input {...register('userId')} required />
          {errors.userId && <span style={{ color: 'red' }}>{errors.userId.message}</span>}
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Variant'}
        </button>
      </form>
    </div>
  );
};

export default VariantForm;
