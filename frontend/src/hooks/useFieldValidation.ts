'use client';

import { useState, useCallback } from 'react';

export const useFieldValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePosition = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (value.includes(',')) {
      setErrors(prev => ({ ...prev, position: 'Position field cannot contain commas' }));
      return false;
    }
    if (value.length > 21) {
      setErrors(prev => ({ ...prev, position: 'Position field exceeds maximum length of 21' }));
      return false;
    }
    setErrors(prev => {
      const { position, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateInterconnection = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (value.includes(',')) {
      setErrors(prev => ({ ...prev, interconnection: 'Interconnection field cannot contain commas' }));
      return false;
    }
    if (value.length > 40) {
      setErrors(prev => ({ ...prev, interconnection: 'Interconnection field exceeds maximum length of 40' }));
      return false;
    }
    setErrors(prev => {
      const { interconnection, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateWheelbase = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (value.toUpperCase() === 'H') {
      setErrors(prev => {
        const { wheelbase, ...rest } = prev;
        return rest;
      });
      return true;
    }
    if (!/^\d{4}$/.test(value)) {
      setErrors(prev => ({ ...prev, wheelbase: 'Wheelbase must be H or 4 digits' }));
      return false;
    }
    setErrors(prev => {
      const { wheelbase, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateAxleWheel = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (!/^\d[A-Z0-9]\d$/.test(value)) {
      setErrors(prev => ({ ...prev, axleWheel: 'Axle/Wheel format must be: digit-alphanumeric-digit' }));
      return false;
    }
    setErrors(prev => {
      const { axleWheel, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validatePosWheelOrSteerAxle = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (value.toUpperCase() === 'C') {
      return true;
    }
    if (!/^[A-Z0-9]\d[A-Z0-9]$/.test(value)) {
      setErrors(prev => ({ ...prev, posWheel: 'Position/Steer Axle format must be: C or alphanumeric-digit-alphanumeric' }));
      return false;
    }
    setErrors(prev => {
      const { posWheel, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateSmallSeriesTypApp = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (value.toUpperCase() !== '/Y' && value.toUpperCase() !== '/N') {
      setErrors(prev => ({ ...prev, smallSeries: 'Small Series Type must be /Y or /N' }));
      return false;
    }
    setErrors(prev => {
      const { smallSeries, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateUbDoors = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    if (!/^[0-9SNE][SE0-9][S0-9]*$/.test(value)) {
      setErrors(prev => ({ ...prev, ubDoors: 'Invalid UB Doors format' }));
      return false;
    }
    setErrors(prev => {
      const { ubDoors, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const validateClass = useCallback((value: string): boolean => {
    if (!value || value.trim() === '') return true;
    const normalized = value.trim().toUpperCase();
    if (!['I', 'II', 'III', 'A', 'B'].includes(normalized)) {
      setErrors(prev => ({ ...prev, class: 'Class must be I, II, III, A, or B' }));
      return false;
    }
    setErrors(prev => {
      const { class: classErr, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  return {
    errors,
    setErrors,
    validatePosition,
    validateInterconnection,
    validateWheelbase,
    validateAxleWheel,
    validatePosWheelOrSteerAxle,
    validateSmallSeriesTypApp,
    validateUbDoors,
    validateClass,
  };
};
