'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeFormSchema, TypeFormData } from '@/lib/schemas';
import { apiClient } from '@/lib/api';

export const TypeForm: React.FC = () => {
  const [phase, setPhase] = useState<'lookup' | 'update'>('lookup');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Lookup form
  const {
    register: registerLookup,
    handleSubmit: handleSubmitLookup,
    formState: { errors: errorsLookup },
  } = useForm({
    defaultValues: {
      typModel: '',
      typType: '',
      typStartDate: '',
      typEndDate: '',
      typManf: '',
    },
  });

  // Update form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TypeFormData>({
    resolver: zodResolver(TypeFormSchema),
  });

  const onSubmitLookup = async (data: any) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const result = await apiClient.lookupType(
        data.typModel,
        data.typType,
        data.typStartDate,
        data.typEndDate,
        data.typManf
      );

      if (!result) {
        setErrorMessage('Type not found');
        return;
      }

      // Pre-fill the update form
      setValue('typModel', result.typModel || data.typModel);
      setValue('typType', result.typType || data.typType);
      setValue('typStartDate', result.typStartDate || data.typStartDate);
      setValue('typEndDate', result.typEndDate || data.typEndDate);
      setValue('typManf', result.typManf || data.typManf);
      setValue('typApprovalNo', result.typApprovalNo || '');
      setValue('userId', 'USER001');

      // Parse approval date if exists
      if (result.typApprDate) {
        const dateParts = result.typApprDate.split('-');
        if (dateParts.length === 3) {
          setValue('typApprDateYear', parseInt(dateParts[0]));
          setValue('typApprDateMonth', parseInt(dateParts[1]));
          setValue('typApprDateDay', parseInt(dateParts[2]));
        }
      }

      setValue('typSmallSeries', result.typSmallSeries || '');

      setPhase('update');
      setSuccessMessage('✓ Type found! You can now update the approval details.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to lookup type');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitUpdate = async (data: TypeFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      let typApprDate = undefined;
      if (data.typApprDateDay && data.typApprDateMonth && data.typApprDateYear) {
        const day = String(data.typApprDateDay).padStart(2, '0');
        const month = String(data.typApprDateMonth).padStart(2, '0');
        typApprDate = `${data.typApprDateYear}-${month}-${day}`;
      }

      await apiClient.updateTypeApproval(
        data.typModel,
        data.typType,
        data.typStartDate,
        data.typEndDate,
        data.typManf,
        {
          typModel: data.typModel,
          typType: data.typType,
          typStartDate: data.typStartDate,
          typEndDate: data.typEndDate,
          typManf: data.typManf,
          typApprovalNo: data.typApprovalNo,
          typApprDate,
          typSmallSeries: data.typSmallSeries,
          userId: data.userId,
        }
      );

      setSuccessMessage('✓ Type approval updated successfully');
      setTimeout(() => {
        setPhase('lookup');
        reset();
        setSuccessMessage('');
      }, 1500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update type');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>📋 WVTA HA003U - Type Approval Management</h1>

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
          <fieldset style={{ marginBottom: '20px', padding: '15px', border: '2px solid #0056b3', borderRadius: '4px', backgroundColor: '#f0f7ff' }}>
            <legend style={{ color: '#0056b3', fontWeight: 'bold', padding: '0 10px' }}>🔍 Step 1: Search for Type</legend>
            <p style={{ color: '#666', marginTop: '10px' }}>Enter the type details to retrieve existing approval information before updating</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <label>
                <strong>Model: *</strong>
                <input {...registerLookup('typModel')} maxLength={1} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="A" />
              </label>

              <label>
                <strong>Type: *</strong>
                <input {...registerLookup('typType')} maxLength={4} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="ABC1" />
              </label>

              <label>
                <strong>Start Date: *</strong>
                <input {...registerLookup('typStartDate')} type="date" required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </label>

              <label>
                <strong>End Date: *</strong>
                <input {...registerLookup('typEndDate')} type="date" required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </label>

              <label style={{ gridColumn: '1 / -1' }}>
                <strong>Manufacturer: *</strong>
                <input {...registerLookup('typManf')} maxLength={1} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="M" />
              </label>
            </div>

            <button type="submit" disabled={isLoading} style={{ marginTop: '20px', width: '100%', padding: '10px 30px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              {isLoading ? '⏳ Searching...' : '🔍 Search Type'}
            </button>
          </fieldset>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitUpdate)}>
          <div style={{ backgroundColor: '#d4edda', padding: '12px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #c3e6cb', color: '#155724' }}>
            <p style={{ margin: '0' }}>✓ <strong>Type found!</strong> Now you can update the approval details below.</p>
          </div>

          <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <legend style={{ fontWeight: 'bold' }}>Type Information (Read-only)</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <label>
                Model:
                <input {...register('typModel')} disabled style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5' }} />
              </label>
              <label>
                Type:
                <input {...register('typType')} maxLength={4} disabled style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5' }} />
              </label>
              <label>
                Start Date:
                <input {...register('typStartDate')} disabled style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5' }} />
              </label>
              <label>
                End Date:
                <input {...register('typEndDate')} disabled style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5' }} />
              </label>
              <label style={{ gridColumn: '1 / -1' }}>
                Manufacturer:
                <input {...register('typManf')} maxLength={1} disabled style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f5f5f5' }} />
              </label>
            </div>
          </fieldset>

          <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <legend style={{ fontWeight: 'bold' }}>Approval Information</legend>

            <label style={{ display: 'block', marginBottom: '15px' }}>
              <strong>Approval No.:</strong>
              <input {...register('typApprovalNo')} maxLength={25} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </label>

            <div style={{ marginBottom: '15px' }}>
              <strong>Approval Date (DD/MM/YYYY):</strong>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '5px' }}>
                <label>
                  Day:
                  <input {...register('typApprDateDay')} type="number" min={1} max={31} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </label>
                <label>
                  Month:
                  <input {...register('typApprDateMonth')} type="number" min={1} max={12} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </label>
                <label>
                  Year:
                  <input {...register('typApprDateYear')} type="number" min={1900} max={2100} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </label>
              </div>
            </div>

            <label style={{ display: 'block' }}>
              <strong>Small Series Type Application:</strong>
              <input {...register('typSmallSeries')} maxLength={1} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </label>
          </fieldset>

          <label style={{ marginBottom: '20px', display: 'block' }}>
            <strong>User ID: *</strong>
            <input {...register('userId')} required style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
            {errors.userId && <span style={{ color: 'red' }}>{errors.userId.message}</span>}
          </label>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" disabled={isLoading} style={{ flex: 1, padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              {isLoading ? '⏳ Updating...' : '✓ Update Type'}
            </button>
            <button type="button" onClick={() => { setPhase('lookup'); reset(); }} style={{ flex: 1, padding: '12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              ← Back to Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TypeForm;
