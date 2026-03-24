/**
 * API Client for WVTA CoC Management System
 * Handles all backend API calls for type and variant management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface TypeRequestBody {
  typModel: string;
  typType: string;
  typStartDate: string;
  typEndDate: string;
  typManf: string;
  typApprovalNo?: string;
  typApprDate?: string;
  typSmallSeries?: string;
  userId: string;
}

interface VariantRequestBody {
  varModel: string;
  varType: string;
  varStartDate: string;
  varEndDate: string;
  varVariant: string;
  varManf: string;
  varEngine?: string;
  varAxlesCocVal?: string;
  varCocAnnex?: string;
  varChipData?: string;
  varGenTyrList?: string;
  varNewmodActmasInd?: string;
  userId: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}`,
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

const apiClient = {
  /**
   * Lookup type by composite key (READ HATTYP)
   */
  lookupType: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    manf: string
  ) => {
    const params = new URLSearchParams({
      model,
      type,
      startDate,
      endDate,
      manf,
    });

    const response = await fetch(`${API_BASE_URL}/types/lookup?${params}`, {
      method: 'GET',
      credentials: 'include',
    });

    return handleResponse(response);
  },

  /**
   * Update type approval (HA100T-UPDATE-APPROVAL-NO)
   */
  updateTypeApproval: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    manf: string,
    data: TypeRequestBody
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/types/${model}/${type}/${startDate}/${endDate}/${manf}/approval`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );

    return handleResponse(response);
  },

  /**
   * Lookup variant by composite key (READ HATVAR)
   */
  lookupVariant: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    variant: string,
    manf: string
  ) => {
    const params = new URLSearchParams({
      model,
      type,
      startDate,
      endDate,
      variant,
      manf,
    });

    const response = await fetch(`${API_BASE_URL}/variants/lookup?${params}`, {
      method: 'GET',
      credentials: 'include',
    });

    return handleResponse(response);
  },

  /**
   * Update variant (UPDATE HATVAR)
   */
  updateVariant: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    variant: string,
    manf: string,
    data: VariantRequestBody
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/variants/${model}/${type}/${startDate}/${endDate}/${variant}/${manf}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );

    return handleResponse(response);
  },

  /**
   * Update VAC field (HA300T-UPDATE-VAC-FIELDS)
   */
  updateVacField: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    variant: string,
    manf: string,
    fieldNo: string,
    subField: string,
    value: string,
    userId: string
  ) => {
    const params = new URLSearchParams({
      model,
      type,
      startDate,
      endDate,
      variant,
      manf,
      fieldNo,
      subField,
      value,
      userId,
    });

    const response = await fetch(`${API_BASE_URL}/vac/update-field?${params}`, {
      method: 'POST',
      credentials: 'include',
    });

    return handleResponse(response);
  },

  /**
   * Update COC field (HA900T-UPDATE-COC-TABLE)
   */
  updateCocField: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    manf: string,
    fieldNo: string,
    subField: string,
    country: string,
    value: string,
    userId: string
  ) => {
    const params = new URLSearchParams({
      model,
      type,
      startDate,
      endDate,
      manf,
      fieldNo,
      subField,
      country,
      value,
      userId,
    });

    const response = await fetch(`${API_BASE_URL}/coc/update-field?${params}`, {
      method: 'POST',
      credentials: 'include',
    });

    return handleResponse(response);
  },

  /**
   * Validate powered axles requirement
   */
  validatePoweredAxles: async (
    poweredAxles: string,
    position?: string,
    interconnection?: string
  ) => {
    const params = new URLSearchParams({ poweredAxles });
    if (position) params.append('position', position);
    if (interconnection) params.append('interconnection', interconnection);

    const response = await fetch(`${API_BASE_URL}/variants/validate-powered-axles?${params}`, {
      method: 'POST',
      credentials: 'include',
    });

    return handleResponse(response);
  },
};

export { apiClient };
export type { TypeRequestBody, VariantRequestBody };
