/**
 * API Client for WVTA CoC Management System
 * Handles all backend API calls for type and variant management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

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
  // Variant Identification
  varModel: string;
  varType: string;
  varStartDate: string;
  varEndDate: string;
  varVariant: string;
  varManf: string;
  
  // Engine & Transmission
  varEngine?: string;
  varCocMaxPower?: string;
  varCocFuel?: string;
  varCocCap?: string;
  varCocNoArrCyl?: string;
  varCocDirectInj?: string;
  varCocWrkPrin?: string;
  varCocEngCode?: string;
  varCocEngMan?: string;
  
  // Axles Configuration
  varAxlesCocVal?: string;
  
  // Vehicle Dimensions & Configuration (VAC Fields)
  axleWheelField1_1?: string;
  axleWheelField1_2?: string;
  lengthField3?: string;
  widthField4?: string;
  heightField5_1?: string;
  heightField5_2?: string;
  rearOverhangField6?: string;
  trackAxleField7?: string;
  typeBodyField8?: string;
  classVehicleField30?: string;
  doorsField30_1?: string;
  doorsField31?: string;
  tireField38?: string;
  
  // Approval & Flags
  varCocAnnex?: string;
  varChipData?: string;
  varGenTyrList?: string;
  varNewmodActmasInd?: string;
  
  // System
  userId: string;
}

// ===== UNIFIED CoCA FORM INTERFACES =====
// Request/Response structures for unified HA003U form
interface UnifiedCoCARequest {
  // ===== READ-ONLY DISPLAY FIELDS =====
  type?: string;
  variant?: string;
  typeDescription?: string;
  engine?: string;

  // ===== TYPE IDENTIFICATION =====
  startDate?: string;
  endDate?: string;
  manufacturer?: string;
  chipData?: 'Y' | 'N';

  // ===== TYPE APPROVAL FIELDS =====
  approvalNo?: string;
  approvalDay?: number;
  approvalMonth?: number;
  approvalYear?: number;
  smallSeriesTypApp?: 'Y' | 'N' | '/';
  newModelActmass?: 'Y' | 'N';

  // ===== TEST METHOD =====
  testMethod?: string;

  // ===== AXLES CONFIGURATION =====
  axlesWheels?: string;
  wheelbase?: string;
  posAxlesWithTwinWheels?: string;
  steeredAxles?: string;
  poweredAxles?: string;

  // ===== POSITION & INTERCONNECTION =====
  position?: string;
  interconnection?: string;

  // ===== DIMENSIONS =====
  length?: string;
  lengthWithTowbar?: string;
  width?: string;
  height?: string;
  rearOverhang?: string;
  track?: string;

  // ===== BODY CLASSIFICATION =====
  typeOfBody?: string;
  classOfVehicle?: string;
  noConfDoors?: string;
  tyreValue?: string;

  // ===== ENGINE DETAILS (HA003D) =====
  engineCode?: string;
  engineManufacturer?: string;
  workingPrinciple?: string;
  engineCycle?: string;
  engineIgnition?: string;
  directInjection?: string;
  noArrangementCylinders?: string;
  fuel?: string;
  capacity?: string;
  maxNetPower?: string;
  maxHourlyOutputElec?: string;
  maxNetPowerElec?: string;
  max30MinPowerElec?: string;

  // ===== CERTIFICATE OF CONFORMITY (HA003R) =====
  vinPlateAttachment?: string;
  vinPlateLocation?: string;
  commercialDescription?: string;
  remarks?: string;
  additionalInfo?: string;

  // ===== SYSTEM FIELDS =====
  userId?: string;
  pageNo?: string;
}

interface FieldError {
  fieldName: string;
  errorMessage: string;
  rejectedValue?: string;
}

interface UnifiedCoCAResponse {
  // ===== READ-ONLY DISPLAY FIELDS =====
  type?: string;
  variant?: string;
  typeDescription?: string;
  engine?: string;

  // ===== TYPE IDENTIFICATION =====
  startDate?: string;
  endDate?: string;
  manufacturer?: string;
  chipData?: 'Y' | 'N';

  // ===== TYPE APPROVAL FIELDS =====
  approvalNo?: string;
  approvalDay?: number;
  approvalMonth?: number;
  approvalYear?: number;
  smallSeriesTypApp?: 'Y' | 'N' | '/';
  newModelActmass?: 'Y' | 'N';

  // ===== TEST METHOD =====
  testMethod?: string;

  // ===== AXLES CONFIGURATION =====
  axlesWheels?: string;
  wheelbase?: string;
  posAxlesWithTwinWheels?: string;
  steeredAxles?: string;
  poweredAxles?: string;

  // ===== POSITION & INTERCONNECTION =====
  position?: string;
  interconnection?: string;

  // ===== DIMENSIONS =====
  length?: string;
  lengthWithTowbar?: string;
  width?: string;
  height?: string;
  rearOverhang?: string;
  track?: string;

  // ===== BODY CLASSIFICATION =====
  typeOfBody?: string;
  classOfVehicle?: string;
  noConfDoors?: string;
  tyreValue?: string;

  // ===== ENGINE DETAILS (HA003D) =====
  engineCode?: string;
  engineManufacturer?: string;
  workingPrinciple?: string;
  engineCycle?: string;
  engineIgnition?: string;
  directInjection?: string;
  noArrangementCylinders?: string;
  fuel?: string;
  capacity?: string;
  maxNetPower?: string;
  maxHourlyOutputElec?: string;
  maxNetPowerElec?: string;
  max30MinPowerElec?: string;

  // ===== CERTIFICATE OF CONFORMITY (HA003R) =====
  vinPlateAttachment?: string;
  vinPlateLocation?: string;
  commercialDescription?: string;
  remarks?: string;
  additionalInfo?: string;

  // ===== SYSTEM FIELDS =====
  userId?: string;
  pageNo?: string;

  // ===== BACKEND RESPONSE FIELDS (with typ/var/coc prefixes) =====
  // Engine and VAC fields from backend response
  varCocEngCode?: string;
  varCocEngMan?: string;
  varCocWrkPrin?: string;
  varCocDirectInj?: string;
  varCocNoArrCyl?: string;
  varCocFuel?: string;
  varCocCap?: string;
  varCocMaxPower?: string;
  typApprTypeInd?: string;
  typGenTyrList?: string;
  typApprovalNo?: string;
  typApprDay?: number;
  typApprMonth?: number;
  typApprYear?: number;
  typSmallSeries?: string;
  typChipData?: string;
  typDescription?: string;
  typType?: string;
  typModel?: string;
  typStartDate?: string;
  typEndDate?: string;
  typManf?: string;
  varVariant?: string;
  varEngine?: string;
  varChipData?: string;
  varNewmodActmasInd?: string;
  lastUpdatedBy?: string;
  
  // Certificate fields from backend response
  cocLocAttachment?: string;
  cocLocOnChassis?: string;
  cocTypeDescription?: string;
  cocRemarks?: string;
  cocAdditionalInfo?: string;

  // ===== VALIDATION RESULT =====
  valid: boolean;
  errors?: FieldError[];
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
    });

    return handleResponse(response);
  },

  // ===== UNIFIED CoCA FORM (HA003U) ENDPOINTS =====

  /**
   * Lookup variant for unified form (HA003U - READ)
   * GET /api/coc/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}
   */
  lookupUnifiedVariant: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    variant: string,
    manf: string
  ): Promise<UnifiedCoCAResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/coc/variants/${model}/${type}/${startDate}/${endDate}/${variant}/${manf}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return handleResponse(response);
  },

  /**
   * Validate unified form fields without saving (HA003U - VALIDATE)
   * POST /api/coc/validate
   */
  validateUnifiedVariant: async (
    data: UnifiedCoCARequest
  ): Promise<{ valid: boolean; errors?: FieldError[]; message?: string }> => {
    const response = await fetch(`${API_BASE_URL}/coc/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  /**
   * Update unified form data (HA003U - UPDATE)
   * PUT /api/coc/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}
   */
  updateUnifiedVariant: async (
    model: string,
    type: string,
    startDate: string,
    endDate: string,
    variant: string,
    manf: string,
    data: UnifiedCoCARequest
  ): Promise<UnifiedCoCAResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/coc/variants/${model}/${type}/${startDate}/${endDate}/${variant}/${manf}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    return handleResponse(response);
  },

  /**
   * Health check for unified CoCA service
   * GET /api/coc/health
   */
  checkUnifiedServiceHealth: async (): Promise<{
    status: string;
    module: string;
    screen: string;
  }> => {
    const response = await fetch(`${API_BASE_URL}/coc/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },
};

export { apiClient };
export type {
  TypeRequestBody,
  VariantRequestBody,
  UnifiedCoCARequest,
  UnifiedCoCAResponse,
  FieldError,
};
