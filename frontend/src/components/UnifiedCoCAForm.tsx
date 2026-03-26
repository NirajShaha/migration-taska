'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnifiedFormSchema, UnifiedFormData } from '@/lib/schemas';
import { apiClient, UnifiedCoCAResponse, FieldError } from '@/lib/api';
import '../styles/UnifiedCoCAForm.css';

/**
 * Unified CoCA Form Component (HA003U)
 * 
 * Single page combining Type Approval and Variant Management fields
 * Features:
 * - 40+ fields from COBOL HA003U screen
 * - Backend validation with comprehensive error messages
 * - Field-level error display
 * - Lookup/Search and Update operations
 * - Sample data pre-population
 */

// Sample variant data for pre-population
const SAMPLE_VARIANT = {
  type: 'LE',
  variant: 'NHFECO',
  typeDescription: 'Land Rover Defender',
  engine: '508PS 386kW',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  manufacturer: 'L',
  chipData: 'N' as const,
  approvalNo: 'HA2024-001',
  approvalDay: 15,
  approvalMonth: 6,
  approvalYear: 2024,
  smallSeriesTypApp: 'N' as const,
  newModelActmass: 'Y' as const,
  testMethod: 'UN ECE R14',
  axlesWheels: '2-2',
  wheelbase: '2587',
  posAxlesWithTwinWheels: '2nd',
  steeredAxles: '1st',
  poweredAxles: 'N',
  position: 'Front and Rear',
  interconnection: 'Propshaft',
  length: '3851',
  lengthWithTowbar: '4200',
  width: '1996',
  height: '1920',
  rearOverhang: '820',
  track: '1698/1683',
  typeOfBody: 'Off-road vehicle',
  classOfVehicle: 'I',
  noConfDoors: '4 side doors + 1 tailgate',
  tyreValue: 'A',
  userId: 'USER001',
  pageNo: '01',
};

interface FormFieldError {
  [fieldName: string]: string;
}

export default function UnifiedCoCAForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormFieldError>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [lookupData, setLookupData] = useState<UnifiedCoCAResponse | null>(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

  // Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors: zodErrors },
    reset,
    watch,
    setValue,
  } = useForm<UnifiedFormData>({
    resolver: zodResolver(UnifiedFormSchema),
    defaultValues: SAMPLE_VARIANT,
    mode: 'onChange',
  });

  const chipData = watch('chipData');

  // Handle form lookup
  const handleLookup = async (searchData: any) => {
    setIsSearching(true);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      // Use actual search parameters, not defaults
      const response = await apiClient.lookupUnifiedVariant(
        searchData.manufacturer,
        searchData.type,
        searchData.startDate,
        searchData.endDate,
        searchData.variant,
        searchData.manufacturer
      );

      if (response.valid === false && response.errors) {
        const errMap: FormFieldError = {};
        response.errors.forEach((err: FieldError) => {
          errMap[err.fieldName] = err.errorMessage;
        });
        setFieldErrors(errMap);
      }

      setLookupData(response);
      setShowSearchForm(false);
      
      // Populate form with lookup data - map response field names to form field names
      const fieldMapping: { [key: string]: keyof UnifiedFormData } = {
        typModel: 'manufacturer',
        typType: 'type',
        typStartDate: 'startDate',
        typEndDate: 'endDate',
        typManf: 'manufacturer',
        typDescription: 'typeDescription',
        typApprovalNo: 'approvalNo',
        typApprDay: 'approvalDay',
        typApprMonth: 'approvalMonth',
        typApprYear: 'approvalYear',
        typSmallSeries: 'smallSeriesTypApp',
        varVariant: 'variant',
        varEngine: 'engine',
        varChipData: 'chipData',
        varNewmodActmasInd: 'newModelActmass',
        testMethod: 'testMethod',
        axlesWheels: 'axlesWheels',
        wheelbase: 'wheelbase',
        posAxlesWithTwinWheels: 'posAxlesWithTwinWheels',
        steeredAxles: 'steeredAxles',
        poweredAxles: 'poweredAxles',
        position: 'position',
        interconnection: 'interconnection',
        length: 'length',
        lengthWithTowbar: 'lengthWithTowbar',
        width: 'width',
        height: 'height',
        rearOverhang: 'rearOverhang',
        track: 'track',
        typeOfBody: 'typeOfBody',
        classOfVehicle: 'classOfVehicle',
        noConfDoors: 'noConfDoors',
        tyreValue: 'tyreValue',
        userId: 'userId'
      };

      // Apply field mapping to set form values correctly
      Object.entries(fieldMapping).forEach(([responseKey, formKey]) => {
        const responseValue = (response as any)[responseKey];
        if (responseValue !== undefined && responseValue !== null) {
          // Format dates properly (convert string to YYYY-MM-DD if needed)
          if ((formKey === 'startDate' || formKey === 'endDate') && typeof responseValue === 'string') {
            const dateStr = responseValue instanceof Date ? responseValue.toISOString().split('T')[0] : responseValue;
            setValue(formKey, dateStr as any);
          } else {
            setValue(formKey, responseValue as any);
          }
        }
      });

      setSuccessMessage('Variant data loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to lookup variant';
      setError(message);
      setSuccessMessage(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Transform form data to backend DTO format
  const transformFormToDTO = (formData: UnifiedFormData): any => {
    return {
      typModel: formData.manufacturer,
      typType: formData.type,
      typStartDate: formData.startDate,
      typEndDate: formData.endDate,
      typManf: formData.manufacturer,
      typDescription: formData.typeDescription,
      typApprovalNo: formData.approvalNo,
      typApprDay: formData.approvalDay,
      typApprMonth: formData.approvalMonth,
      typApprYear: formData.approvalYear,
      typSmallSeries: formData.smallSeriesTypApp,
      varVariant: formData.variant,
      varEngine: formData.engine,
      varChipData: formData.chipData,
      varNewmodActmasInd: formData.newModelActmass,
      testMethod: formData.testMethod,
      axlesWheels: formData.axlesWheels,
      wheelbase: formData.wheelbase,
      posAxlesWithTwinWheels: formData.posAxlesWithTwinWheels,
      steeredAxles: formData.steeredAxles,
      poweredAxles: formData.poweredAxles,
      position: formData.position,
      interconnection: formData.interconnection,
      length: formData.length,
      lengthWithTowbar: formData.lengthWithTowbar,
      width: formData.width,
      height: formData.height,
      rearOverhang: formData.rearOverhang,
      track: formData.track,
      typeOfBody: formData.typeOfBody,
      classOfVehicle: formData.classOfVehicle,
      noConfDoors: formData.noConfDoors,
      tyreValue: formData.tyreValue,
      userId: formData.userId,
    };
  };

  // Handle form submission (Save)
  const onSubmit = async (data: UnifiedFormData) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    try {
      // First validate the data
      const validationResult = await apiClient.validateUnifiedVariant(data);

      if (!validationResult.valid && validationResult.errors) {
        const errMap: FormFieldError = {};
        validationResult.errors.forEach((err: FieldError) => {
          errMap[err.fieldName] = err.errorMessage;
        });
        setFieldErrors(errMap);
        setError('Validation failed. Please correct the errors below.');
        return;
      }

      // If validation passed, update the variant with transformed DTO
      const dtoData = transformFormToDTO(data);
      const updateResult = await apiClient.updateUnifiedVariant(
        data.manufacturer || 'L',
        data.type || 'LE',
        data.startDate || '2024-01-01',
        data.endDate || '2024-12-31',
        data.variant || 'NHFECO',
        data.manufacturer || 'L', // use actual manufacturer from data
        dtoData // Pass the transformed DTO data as request body
      );

      if (updateResult.valid === false && updateResult.errors) {
        const errMap: FormFieldError = {};
        updateResult.errors.forEach((err: FieldError) => {
          errMap[err.fieldName] = err.errorMessage;
        });
        setFieldErrors(errMap);
        setError('Update failed. Please correct the errors and try again.');
        return;
      }

      setSuccessMessage('Variant updated successfully!');
      setFieldErrors({});
      setError(null);

      // Refresh form with updated data
      setTimeout(() => {
        setShowSearchForm(true);
        reset();
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update variant';
      setError(message);
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear/Reset functions
  const handleReset = () => {
    reset(SAMPLE_VARIANT);
    setFieldErrors({});
    setError(null);
    setSuccessMessage(null);
  };

  const handleNewSearch = () => {
    setShowSearchForm(true);
    reset();
    setLookupData(null);
    setFieldErrors({});
    setError(null);
    setSuccessMessage(null);
  };

  // Render field with error highlighting
  const renderFieldWithError = (
    fieldName: keyof UnifiedFormData,
    label: string,
    type: string = 'text',
    maxLength?: number,
    disabled: boolean = false
  ) => {
    const fieldError = fieldErrors[fieldName as string];
    const zodError = zodErrors[fieldName];
    const hasError = !!fieldError || !!zodError;

    return (
      <div key={fieldName} className="form-field">
        <label htmlFor={fieldName as string} className="field-label">
          {label}
          {chipData === 'Y' && !['chipData', 'userId', 'pageNo'].includes(fieldName as string) && (
            <span className="chip-disabled-indicator" title="Validation disabled (CHIP=Y)">
              ⊘
            </span>
          )}
        </label>
        <input
          id={fieldName as string}
          type={type}
          {...register(fieldName, { valueAsNumber: type === 'number' })}
          maxLength={maxLength}
          disabled={disabled}
          className={`form-input ${hasError ? 'error' : ''}`}
        />
        {fieldError && (
          <span className="field-error-message">{fieldError}</span>
        )}
        {zodError && !fieldError && (
          <span className="field-error-message">{zodError.message}</span>
        )}
      </div>
    );
  };

  return (
    <div className="unified-form-container">
      <div className="form-header">
        <h1>Update CoC Content (Type/Variant) - HA003U</h1>
        <p className="form-description">
          Complete form for managing vehicle type approval and variant specifications
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      {/* Search/Lookup Section */}
      {showSearchForm ? (
        <div className="search-section">
          <h2>Search Variant</h2>
          <p>Enter variant identification details to load existing data</p>
          
          <div className="search-fields">
            <input
              type="text"
              placeholder="Model (1 char)"
              maxLength={1}
              id="search-model"
              defaultValue="A"
            />
            <input
              type="text"
              placeholder="Type (max 4 chars)"
              maxLength={4}
              id="search-type"
              defaultValue="LE"
            />
            <input
              type="date"
              id="search-start-date"
              defaultValue="2024-01-01"
            />
            <input
              type="date"
              id="search-end-date"
              defaultValue="2024-12-31"
            />
            <input
              type="text"
              placeholder="Variant (max 6 chars)"
              maxLength={6}
              id="search-variant"
              defaultValue="NHFECO"
            />
            <input
              type="text"
              placeholder="Manufacturer (1 char)"
              maxLength={1}
              id="search-manufacturer"
              defaultValue="L"
            />
            <button
              type="button"
              onClick={() => {
                handleLookup({
                  model: (document.getElementById('search-model') as HTMLInputElement).value,
                  type: (document.getElementById('search-type') as HTMLInputElement).value,
                  startDate: (document.getElementById('search-start-date') as HTMLInputElement).value,
                  endDate: (document.getElementById('search-end-date') as HTMLInputElement).value,
                  variant: (document.getElementById('search-variant') as HTMLInputElement).value,
                  manufacturer: (document.getElementById('search-manufacturer') as HTMLInputElement).value,
                });
              }}
              disabled={isSearching}
              className="btn btn-primary"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="unified-form">
          {/* Type Identification Section */}
          <section className="form-section">
            <h2>Type Identification</h2>
            
            <div className="form-grid">
              {renderFieldWithError('type', 'Type', 'text', 4, true)}
              {renderFieldWithError('variant', 'Variant', 'text', 6, true)}
              {renderFieldWithError('typeDescription', 'Type Description', 'text', 28, true)}
              {renderFieldWithError('engine', 'Engine', 'text', 12, true)}
              {renderFieldWithError('startDate', 'Start Date', 'date', undefined, true)}
              {renderFieldWithError('endDate', 'End Date', 'date', undefined, true)}
              {renderFieldWithError('manufacturer', 'Manufacturer', 'text', 1, true)}
            </div>
          </section>

          {/* Type Approval Section */}
          <section className="form-section">
            <h2>Type Approval</h2>
            
            <div className="form-grid">
              {renderFieldWithError('approvalNo', 'Approval Number', 'text', 25)}
              <div className="date-group">
                <label>Approval Date</label>
                <div className="date-inputs">
                  {renderFieldWithError('approvalDay', 'Day', 'number')}
                  {renderFieldWithError('approvalMonth', 'Month', 'number')}
                  {renderFieldWithError('approvalYear', 'Year', 'number')}
                </div>
              </div>
              {renderFieldWithError('smallSeriesTypApp', 'Small Series Type App', 'text', 1)}
              {renderFieldWithError('newModelActmass', 'New Model Actmass', 'text', 1)}
              {renderFieldWithError('testMethod', 'Test Method', 'text', 25)}
            </div>
          </section>

          {/* Axles Configuration Section */}
          <section className="form-section">
            <h2>Axles Configuration</h2>
            
            <div className="form-grid">
              {renderFieldWithError('axlesWheels', 'Axles/Wheels', 'text', 3)}
              {renderFieldWithError('wheelbase', 'Wheelbase', 'text', 9)}
              {renderFieldWithError('posAxlesWithTwinWheels', 'Position Twin Wheels', 'text', 3)}
              {renderFieldWithError('steeredAxles', 'Steered Axles', 'text', 3)}
              {renderFieldWithError('poweredAxles', 'Powered Axles (H/N)', 'text', 1)}
            </div>
          </section>

          {/* Position & Interconnection Section */}
          <section className="form-section">
            <h2>Position & Interconnection</h2>
            
            <div className="form-grid">
              {renderFieldWithError(
                'position',
                'Position (max 21, no commas)',
                'text',
                21
              )}
              {renderFieldWithError(
                'interconnection',
                'Interconnection (max 40, no commas)',
                'text',
                40
              )}
            </div>
          </section>

          {/* Dimensions Section */}
          <section className="form-section">
            <h2>Vehicle Dimensions</h2>
            
            <div className="form-grid">
              {renderFieldWithError('length', 'Length (mm)', 'text', 9)}
              {renderFieldWithError('lengthWithTowbar', 'Length with Towbar (mm)', 'text', 9)}
              {renderFieldWithError('width', 'Width (mm)', 'text', 9)}
              {renderFieldWithError('height', 'Height (mm)', 'text', 9)}
              {renderFieldWithError('rearOverhang', 'Rear Overhang (mm)', 'text', 9)}
              {renderFieldWithError('track', 'Track (mm)', 'text', 32)}
            </div>
          </section>

          {/* Body Classification Section */}
          <section className="form-section">
            <h2>Body Classification</h2>
            
            <div className="form-grid">
              {renderFieldWithError('typeOfBody', 'Type of Body', 'text', 25)}
              {renderFieldWithError(
                'classOfVehicle',
                'Class of Vehicle (I/II/III/A/B/C)',
                'text',
                3
              )}
              {renderFieldWithError('noConfDoors', 'Doors Configuration', 'text', 50)}
              {renderFieldWithError('tyreValue', 'Tire Value', 'text', 1)}
            </div>
          </section>

          {/* System Fields Section */}
          <section className="form-section">
            <h2>System Fields</h2>
            
            <div className="form-grid">
              {renderFieldWithError('chipData', 'CHIP Data (Y/N)', 'text', 1)}
              {renderFieldWithError('userId', 'User ID', 'text', 8)}
              {renderFieldWithError('pageNo', 'Page Number', 'text', 2)}
            </div>
          </section>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleNewSearch}
              className="btn btn-outline"
              disabled={isLoading}
            >
              New Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
