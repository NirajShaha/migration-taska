'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeFormSchema, TypeFormData } from '@/lib/schemas';
import { apiClient } from '@/lib/api';

/**
 * TypeForm - Maps COBOL HA003U screen approval section
 * Handles type approval No, date, and small series updates
 */
export const TypeForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeFormData>({
    resolver: zodResolver(TypeFormSchema),
  });

  const onSubmit = async (data: TypeFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Build approval date from separate fields
      let typApprDate = undefined;
      if (data.typApprDateDay && data.typApprDateMonth && data.typApprDateYear) {
        const day = String(data.typApprDateDay).padStart(2, '0');
        const month = String(data.typApprDateMonth).padStart(2, '0');
        typApprDate = `${data.typApprDateYear}-${month}-${day}`;
      }

      // Maps HA100T-UPDATE-APPROVAL-NO section
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

      setSuccessMessage('Type approval updated successfully');
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update type');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>WVTA HA003U - Update Type Approval</h1>

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
        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Type Information</legend>

          <label>
            Model: *
            <input {...register('typModel')} />
            {errors.typModel && <span style={{ color: 'red' }}>{errors.typModel.message}</span>}
          </label>

          <label>
            Type: *
            <input {...register('typType')} maxLength={4} />
            {errors.typType && <span style={{ color: 'red' }}>{errors.typType.message}</span>}
          </label>

          <label>
            Start Date: *
            <input {...register('typStartDate')} type="date" />
            {errors.typStartDate && <span style={{ color: 'red' }}>{errors.typStartDate.message}</span>}
          </label>

          <label>
            End Date: *
            <input {...register('typEndDate')} type="date" />
            {errors.typEndDate && <span style={{ color: 'red' }}>{errors.typEndDate.message}</span>}
          </label>

          <label>
            Manufacturer: *
            <input {...register('typManf')} maxLength={1} />
            {errors.typManf && <span style={{ color: 'red' }}>{errors.typManf.message}</span>}
          </label>
        </fieldset>

        <fieldset style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <legend>Approval Information</legend>

          <label>
            Approval No.:
            <input {...register('typApprovalNo')} maxLength={25} />
          </label>

          <label>
            Approval Date (DD):
            <input {...register('typApprDateDay')} type="number" min={1} max={31} />
          </label>

          <label>
            Approval Date (MM):
            <input {...register('typApprDateMonth')} type="number" min={1} max={12} />
          </label>

          <label>
            Approval Date (YYYY):
            <input {...register('typApprDateYear')} type="number" min={1900} max={2100} />
          </label>

          <label>
            Small Series Type Application:
            <input {...register('typSmallSeries')} maxLength={1} />
          </label>
        </fieldset>

        <label>
          User ID: *
          <input {...register('userId')} required />
          {errors.userId && <span style={{ color: 'red' }}>{errors.userId.message}</span>}
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Type Approval'}
        </button>
      </form>
    </div>
  );
};

export default TypeForm;
