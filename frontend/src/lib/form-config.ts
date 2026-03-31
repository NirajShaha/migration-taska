import { UnifiedFormData } from "./schemas";

export const DEFAULT_FORM_VALUES: UnifiedFormData = {
  // Search/Display fields
  type: "",
  variant: "",
  typeDescription: "",
  engine: "",
  startDate: "",
  endDate: "",
  manufacturer: "",

  // HA003U: Type Approval
  approvalNo: "",
  approvalDate: "",
  smallSeriesTypApp: undefined,
  newModelActmass: undefined,
  chipData: "N",
  testMethod: "",

  // HA003U: Axles
  axlesWheels: "",
  wheelbase: "",
  posAxlesWithTwinWheels: "",
  steeredAxles: "",
  poweredAxles: "",

  // HA003U: Position & Interconnection
  position: "",
  interconnection: "",

  // HA003U: Dimensions
  length: "",
  lengthWithTowbar: "",
  width: "",
  height: "",
  rearOverhang: "",
  track: "",

  // HA003U: Body
  typeOfBody: "",
  classOfVehicle: "",
  noConfDoors: "",

  // HA003R: CoC Certificate
  vinPlateAttachment: "",
  vinPlateLocation: "",
  commercialDescription: "",
  remarks: "",

  // HA003D: Engine Specifications
  engineCode: "",
  engineManufacturer: "",
  workingPrinciple: "",
  engineCycle: "",
  engineIgnition: "",
  directInjection: "",
  noArrangementCylinders: "",
  fuel: "",
  capacity: "",
  maxNetPower: "",
  maxHourlyOutputElec: "",
  maxNetPowerElec: "",
  max30MinPowerElec: "",

  // System
  userId: "USER001",
  pageNo: "01",
};