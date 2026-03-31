package WVTA.service;

import WVTA.dto.UnifiedCoCARequest;
import WVTA.dto.UnifiedCoCAResponse;
import WVTA.entity.HatVarVariant;
import WVTA.entity.HatVarVariantPK;
import WVTA.entity.HatVacVariant;
import WVTA.entity.HatVacVariantPK;
import WVTA.entity.HatTypType;
import WVTA.entity.HatTypTypePK;
import WVTA.entity.HatCocType;
import WVTA.entity.HatCocTypePK;
import WVTA.repository.HatVarVariantRepository;
import WVTA.repository.HatVacVariantRepository;
import WVTA.repository.HatTypTypeRepository;
import WVTA.repository.HatCocTypeRepository;
import WVTA.validator.CoCFieldValidator;
import WVTA.validator.CoCFieldValidator.ValidationResult;
import WVTA.exception.ResourceNotFoundException;
import WVTA.exception.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service for unified HA003U screen operations
 * Handles lookup, retrieval, and updates of Type/Variant CoC data
 */
@Slf4j
@Service
public class UnifiedCoCService {

    @Autowired
    private HatVarVariantRepository hatVarVariantRepository;

    @Autowired
    private HatVacVariantRepository hatVacVariantRepository;

    @Autowired
    private HatTypTypeRepository hatTypTypeRepository;

    @Autowired
    private HatCocTypeRepository hatCocTypeRepository;

    /**
     * Lookup variant data to populate the form
     * Retrieves data from hat_var_variant and related tables
     */
    @Transactional(readOnly = true)
    public UnifiedCoCAResponse lookupVariant(String model, String type, LocalDate startDate,
                                             LocalDate endDate, String variant, String manf) {
        log.info("Looking up variant: {}/{}/{}/{}/{}/{}", model, type, startDate, endDate, variant, manf);

        // Create primary key
        HatVarVariantPK pk = new HatVarVariantPK(model, type, startDate, endDate, variant, manf);

        // Lookup variant
        Optional<HatVarVariant> varOpt = hatVarVariantRepository.findById(pk);
        if (!varOpt.isPresent()) {
            throw new ResourceNotFoundException("Variant not found: " + pk);
        }

        HatVarVariant variant_data = varOpt.get();

        // Lookup type data
        HatTypTypePK typePk = new HatTypTypePK(model, type, startDate, endDate, manf);
        Optional<HatTypType> typeOpt = hatTypTypeRepository.findById(typePk);
        if (!typeOpt.isPresent()) {
            throw new ResourceNotFoundException("Type not found: " + typePk);
        }

        HatTypType type_data = typeOpt.get();

        // Build response
        UnifiedCoCAResponse response = UnifiedCoCAResponse.builder()
                // Type data
                .typModel(model)
                .typType(type)
                .typStartDate(startDate)
                .typEndDate(endDate)
                .typManf(manf)
                .typDescription(type_data.getTypDescription())
                .typApprovalNo(type_data.getTypApprovalNo())
                .typSmallSeries(type_data.getTypSmallSeries())
                .typApprTypeInd(type_data.getTypApprTypeInd())
                .typChipData(type_data.getTypChipData())
                .typGenTyrList(type_data.getTypGenTyrList())
                .typApprDate(type_data.getTypApprDate())

                // Variant data
                .varVariant(variant)
                .varEngine(variant_data.getVarEngine())
                .varChipData(variant_data.getVarChipData())
                .varNewmodActmasInd(variant_data.getVarNewmodActmasInd())
                .varGenTyrList(variant_data.getVarGenTyrList())

                // Engine details (from VAR_COC_* fields)
                .varCocEngCode(variant_data.getVarCocEngCode())
                .varCocEngMan(variant_data.getVarCocEngMan())
                .varCocWrkPrin(variant_data.getVarCocWrkPrin())
                .varCocDirectInj(variant_data.getVarCocDirectInj())
                .varCocNoArrCyl(variant_data.getVarCocNoArrCyl())
                .varCocFuel(variant_data.getVarCocFuel())
                .varCocCap(variant_data.getVarCocCap())
                .varCocMaxPower(variant_data.getVarCocMaxPower())
                .testMethod(variant_data.getVarCocAnnex())

                // Metadata
                .lastUpdated(variant_data.getVarTimestamp())
                .lastUpdatedBy(variant_data.getVarUserid())
                .valid(true)
                .errors(new ArrayList<>())
                .build();

        // Split approval date into day/month/year
        if (type_data.getTypApprDate() != null) {
            response.setTypApprDay(type_data.getTypApprDate().getDayOfMonth());
            response.setTypApprMonth(type_data.getTypApprDate().getMonthValue());
            response.setTypApprYear(type_data.getTypApprDate().getYear());
        }

        // Lookup VAC (dimensional) data
        loadVACFields(response, model, type, startDate, endDate, variant, manf);

        // Lookup CoC (certificate) data
        loadCoCFields(response, model, type, startDate, endDate, manf);

        return response;
    }

    /**
     * Load dimensional fields from hat_vac_variant table
     * Uses repository method to avoid loading all records at once
     */
    private void loadVACFields(UnifiedCoCAResponse response, String model, String type,
                               LocalDate startDate, LocalDate endDate, String variant, String manf) {
        // Use repository method for efficient database query
        List<HatVacVariant> vacRecords = hatVacVariantRepository.findByIdVacModelAndIdVacTypeAndIdVacStartDateAndIdVacEndDateAndIdVacVariantAndIdVacManf(
                model, type, startDate, endDate, variant, manf);

        // Map VAC values to response fields based on field_no
        vacRecords.forEach(vac -> {
            String fieldNo = vac.getId().getVacFieldNo();
            String value = vac.getVacValue();

            switch (fieldNo) {
                case "1" -> response.setAxlesWheels(value);
                case "2" -> response.setPosAxlesWithTwinWheels(value);
                case "3" -> response.setWheelbase(value);
                case "4" -> response.setWidth(value);
                case "5" -> response.setHeight(value);
                case "6" -> response.setRearOverhang(value);
                case "7" -> response.setTrack(value);
                case "8" -> response.setTypeOfBody(value);
                case "9" -> response.setSteeredAxles(value);
                case "10" -> response.setPoweredAxles(value);
                case "11" -> response.setPosition(value);
                case "12" -> response.setInterconnection(value);
                case "13" -> response.setLength(value);
                case "14" -> response.setLengthWithTowbar(value);
                case "30" -> response.setClassOfVehicle(value);
                case "30.1" -> response.setNoConfDoors(value);
                case "38" -> response.setTyreValue(value);
            }
        });
    }

    /**
     * Load CoC certificate fields from hat_coc_type table
     * These are stored with field_no and sub_field keys for different screen sections
     * Uses repository method to avoid loading all records at once
     */
    private void loadCoCFields(UnifiedCoCAResponse response, String model, String type,
                               LocalDate startDate, LocalDate endDate, String manf) {
        // Use repository method for efficient database query
        List<HatCocType> cocRecords = hatCocTypeRepository.findByIdCocModelAndIdCocTypeAndIdCocStartDateAndIdCocEndDateAndIdCocManf(
                model, type, startDate, endDate, manf);

        // Map CoC values to response fields based on field_no
        // Field mappings are based on the HAT_COC_TYPE table structure from HA003R screen
        cocRecords.forEach(coc -> {
            String fieldNo = coc.getId().getCocFieldNo();
            String value = coc.getCocValue();

            // Map fields to HA003R (CoC Certificate) screen fields
            switch (fieldNo) {
                case "01" -> response.setCocLocAttachment(value);           // Location and method of attachment of Vin Plate
                case "02" -> response.setCocLocOnChassis(value);           // Location of Vehicle identification number on Chassis
                case "03" -> response.setCocTypeDescription(value);        // Type / Commercial Description
                case "04" -> response.setCocRemarks(value);                // Remarks
                case "05" -> response.setCocAdditionalInfo(value);         // Additional Information
            }
        });
    }

    /**
     * Validate all fields in the request
     * Checks constraints for dimensions, emissions, and vehicle specifications
     */
    public List<UnifiedCoCAResponse.FieldError> validateFields(UnifiedCoCARequest request) {
        List<UnifiedCoCAResponse.FieldError> errors = new ArrayList<>();

        String chipData = request.getVarChipData() != null ? request.getVarChipData() : "N";
        // Handle null typStartDate - use default if not provided
        String startDateStr = request.getTypStartDate() != null ? request.getTypStartDate().toString() : "2024-01-01";
        String manufacturer = request.getTypManf() != null ? request.getTypManf() : "";

        // Position validation
        ValidationResult posResult = CoCFieldValidator.validatePosition(request.getPosition(), chipData);
        if (!posResult.isValid()) {
            errors.add(createFieldError("position", posResult.getErrorMessage(), request.getPosition()));
        }

        // Interconnection validation
        ValidationResult interResult = CoCFieldValidator.validateInterconnection(request.getInterconnection(), chipData);
        if (!interResult.isValid()) {
            errors.add(createFieldError("interconnection", interResult.getErrorMessage(), request.getInterconnection()));
        }

        // Wheelbase validation
        ValidationResult wbaseResult = CoCFieldValidator.validateWheelbase(request.getWheelbase(), chipData);
        if (!wbaseResult.isValid()) {
            errors.add(createFieldError("wheelbase", wbaseResult.getErrorMessage(), request.getWheelbase()));
        }

        // Axle/Wheel validation
        ValidationResult axleResult = CoCFieldValidator.validateAxleWheel(request.getAxlesWheels(), chipData);
        if (!axleResult.isValid()) {
            errors.add(createFieldError("axlesWheels", axleResult.getErrorMessage(), request.getAxlesWheels()));
        }

        // Track validation (date-based)
        ValidationResult trackResult = CoCFieldValidator.validateTrack(request.getTrack(), chipData, startDateStr);
        if (!trackResult.isValid()) {
            errors.add(createFieldError("track", trackResult.getErrorMessage(), request.getTrack()));
        }

        // Height validation (date-based)
        ValidationResult heightResult = CoCFieldValidator.validateHeight(request.getHeight(), chipData, startDateStr);
        if (!heightResult.isValid()) {
            errors.add(createFieldError("height", heightResult.getErrorMessage(), request.getHeight()));
        }

        // Length validation
        ValidationResult lengthResult = CoCFieldValidator.validateLength(request.getLength(), chipData);
        if (!lengthResult.isValid()) {
            errors.add(createFieldError("length", lengthResult.getErrorMessage(), request.getLength()));
        }

        // Width validation
        ValidationResult widthResult = CoCFieldValidator.validateWidth(request.getWidth(), chipData);
        if (!widthResult.isValid()) {
            errors.add(createFieldError("width", widthResult.getErrorMessage(), request.getWidth()));
        }

        // Length with towbar validation
        ValidationResult lengthWtResult = CoCFieldValidator.validateLengthWithTowbar(request.getLengthWithTowbar(), chipData);
        if (!lengthWtResult.isValid()) {
            errors.add(createFieldError("lengthWithTowbar", lengthWtResult.getErrorMessage(), request.getLengthWithTowbar()));
        }

        // Overhang validation (manufacturer-specific)
        ValidationResult overhangResult = CoCFieldValidator.validateOverhang(request.getRearOverhang(), chipData, manufacturer);
        if (!overhangResult.isValid()) {
            errors.add(createFieldError("rearOverhang", overhangResult.getErrorMessage(), request.getRearOverhang()));
        }

        // Powered Axles validation
        ValidationResult poweredResult = CoCFieldValidator.validatePoweredAxles(request.getPoweredAxles(), chipData);
        if (!poweredResult.isValid()) {
            errors.add(createFieldError("poweredAxles", poweredResult.getErrorMessage(), request.getPoweredAxles()));
        }

        // Position Wheel/Steering validation
        ValidationResult posWheelResult = CoCFieldValidator.validatePosWheelOrSteerAxle(request.getPosAxlesWithTwinWheels(), chipData);
        if (!posWheelResult.isValid()) {
            errors.add(createFieldError("posAxlesWithTwinWheels", posWheelResult.getErrorMessage(), request.getPosAxlesWithTwinWheels()));
        }

        ValidationResult steerResult = CoCFieldValidator.validatePosWheelOrSteerAxle(request.getSteeredAxles(), chipData);
        if (!steerResult.isValid()) {
            errors.add(createFieldError("steeredAxles", steerResult.getErrorMessage(), request.getSteeredAxles()));
        }

        // Class validation
        ValidationResult classResult = CoCFieldValidator.validateClass(request.getClassOfVehicle(), chipData);
        if (!classResult.isValid()) {
            errors.add(createFieldError("classOfVehicle", classResult.getErrorMessage(), request.getClassOfVehicle()));
        }

        // Small Series validation
        ValidationResult ssResult = CoCFieldValidator.validateSmallSeriesTypApp(request.getTypSmallSeries());
        if (!ssResult.isValid()) {
            errors.add(createFieldError("typSmallSeries", ssResult.getErrorMessage(), request.getTypSmallSeries()));
        }

        // Approval date validation
        ValidationResult approvalDateResult = CoCFieldValidator.validateApprovalDate(
                request.getTypApprDay() != null ? request.getTypApprDay().toString() : null,
                request.getTypApprMonth() != null ? request.getTypApprMonth().toString() : null,
                request.getTypApprYear() != null ? request.getTypApprYear().toString() : null
        );
        if (!approvalDateResult.isValid()) {
            errors.add(createFieldError("approvalDate", approvalDateResult.getErrorMessage(), null));
        }

        // Approval number validation
        ValidationResult approvalResult = CoCFieldValidator.validateApprovalNo(request.getTypApprovalNo());
        if (!approvalResult.isValid()) {
            errors.add(createFieldError("typApprovalNo", approvalResult.getErrorMessage(), request.getTypApprovalNo()));
        }

        return errors;
    }

    /**
     * Update variant with validated data
     */
    @Transactional
    public UnifiedCoCAResponse updateVariant(UnifiedCoCARequest request) {
        log.info("Updating variant: {}/{}/{}", request.getTypModel(), request.getTypType(), request.getVarVariant());

        // Validate all fields
        List<UnifiedCoCAResponse.FieldError> errors = validateFields(request);
        if (!errors.isEmpty()) {
            log.warn("Validation errors found: {}", errors.size());
            UnifiedCoCAResponse errorResponse = new UnifiedCoCAResponse();
            errorResponse.setValid(false);
            errorResponse.setErrors(errors);
            return errorResponse;
        }

        // Update variant data
        HatVarVariantPK varPk = new HatVarVariantPK(
                request.getTypModel(),
                request.getTypType(),
                request.getTypStartDate(),
                request.getTypEndDate(),
                request.getVarVariant(),
                request.getTypManf()
        );

        Optional<HatVarVariant> varOpt = hatVarVariantRepository.findById(varPk);
        if (!varOpt.isPresent()) {
            throw new ResourceNotFoundException("Variant not found for update");
        }

        HatVarVariant variant = varOpt.get();
        variant.setVarCocAnnex(request.getTestMethod());
        variant.setVarChipData(request.getVarChipData());
        variant.setVarNewmodActmasInd(request.getVarNewmodActmasInd());

        // Engine details fields
        if (request.getVarCocEngCode() != null) {
            variant.setVarCocEngCode(request.getVarCocEngCode());
        }
        if (request.getVarCocEngMan() != null) {
            variant.setVarCocEngMan(request.getVarCocEngMan());
        }
        if (request.getVarCocWrkPrin() != null) {
            variant.setVarCocWrkPrin(request.getVarCocWrkPrin());
        }
        if (request.getVarCocDirectInj() != null) {
            variant.setVarCocDirectInj(request.getVarCocDirectInj());
        }
        if (request.getVarCocNoArrCyl() != null) {
            variant.setVarCocNoArrCyl(request.getVarCocNoArrCyl());
        }
        if (request.getVarCocFuel() != null) {
            variant.setVarCocFuel(request.getVarCocFuel());
        }
        if (request.getVarCocCap() != null) {
            variant.setVarCocCap(request.getVarCocCap());
        }
        if (request.getVarCocMaxPower() != null) {
            variant.setVarCocMaxPower(request.getVarCocMaxPower());
        }

        variant.setVarUserid(request.getUserId() != null ? request.getUserId() : "SYSTEM");
        variant.setVarTimestamp(LocalDateTime.now());

        hatVarVariantRepository.save(variant);

        // Update or create VAC records for dimensional data
        updateVACFields(request);

        // Update or create CoC records for certificate data
        updateCoCFields(request);

        // Update type approval if provided
        if (request.getTypApprovalNo() != null || request.getTypApprDay() != null) {
            updateTypeApproval(request);
        }

        // Return updated data
        return lookupVariant(
                request.getTypModel(),
                request.getTypType(),
                request.getTypStartDate(),
                request.getTypEndDate(),
                request.getVarVariant(),
                request.getTypManf()
        );
    }

    /**
     * Update VAC (dimensional) fields
     */
    @Transactional
    private void updateVACFields(UnifiedCoCARequest request) {
        // Get existing VAC records or create new ones
        String model = request.getTypModel();
        String type = request.getTypType();
        LocalDate startDate = request.getTypStartDate();
        LocalDate endDate = request.getTypEndDate();
        String variant = request.getVarVariant();
        String manf = request.getTypManf();

        updateVACField(model, type, startDate, endDate, variant, manf, "1", "1", request.getAxlesWheels(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "2", "1", request.getPosAxlesWithTwinWheels(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "9", "1", request.getSteeredAxles(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "10", "1", request.getPoweredAxles(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "3", "1", request.getWheelbase(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "4", "1", request.getWidth(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "5", "1", request.getHeight(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "6", "1", request.getRearOverhang(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "7", "1", request.getTrack(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "8", "1", request.getTypeOfBody(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "11", "1", request.getPosition(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "12", "1", request.getInterconnection(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "13", "1", request.getLength(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "14", "1", request.getLengthWithTowbar(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "30", "1", request.getClassOfVehicle(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "30.1", "1", request.getNoConfDoors(), request.getUserId());
        updateVACField(model, type, startDate, endDate, variant, manf, "38", "1", request.getTyreValue(), request.getUserId());
    }

    /**
     * Update or create individual VAC field
     */
    private void updateVACField(String model, String type, LocalDate startDate, LocalDate endDate,
                                String variant, String manf, String fieldNo, String subField,
                                String value, String userId) {
        if (value == null || value.isBlank()) {
            return; // Skip empty values
        }

        // Create composite key for VAC record
        HatVacVariantPK pk = new HatVacVariantPK(model, type, startDate, endDate, variant, manf, fieldNo, subField);

        // Look up existing VAC record
        Optional<HatVacVariant> vacOpt = hatVacVariantRepository.findById(pk);

        HatVacVariant vac;
        if (vacOpt.isPresent()) {
            // Update existing record
            vac = vacOpt.get();
            vac.setVacValue(value);
            log.debug("Updating VAC field {}.{} to {}", fieldNo, subField, value);
        } else {
            // Create new record
            vac = new HatVacVariant();
            vac.setId(pk);
            vac.setVacValue(value);
            log.debug("Creating new VAC field {}.{} with value {}", fieldNo, subField, value);
        }

        // Set system fields
        vac.setVacUserid(userId != null ? userId : "SYSTEM");
        vac.setVacTimestamp(LocalDateTime.now());

        // Persist to database
        hatVacVariantRepository.save(vac);
    }

    /**
     * Update CoC (certificate) fields
     * These are stored in hat_coc_type table with field_no and sub_field keys
     */
    @Transactional
    private void updateCoCFields(UnifiedCoCARequest request) {
        String model = request.getTypModel();
        String type = request.getTypType();
        LocalDate startDate = request.getTypStartDate();
        LocalDate endDate = request.getTypEndDate();
        String manf = request.getTypManf();

        // Update CoC certificate fields with field-specific field_no values
        updateCoCField(model, type, startDate, endDate, manf, "01", "1", request.getCocLocAttachment(), request.getUserId());      // Location and method of attachment
        updateCoCField(model, type, startDate, endDate, manf, "02", "1", request.getCocLocOnChassis(), request.getUserId());       // Location on Chassis
        updateCoCField(model, type, startDate, endDate, manf, "03", "1", request.getCocTypeDescription(), request.getUserId());    // Type/Commercial Description
        updateCoCField(model, type, startDate, endDate, manf, "04", "1", request.getCocRemarks(), request.getUserId());            // Remarks
        updateCoCField(model, type, startDate, endDate, manf, "05", "1", request.getCocAdditionalInfo(), request.getUserId());     // Additional Information
    }

    /**
     * Update or create individual CoC field
     */
    private void updateCoCField(String model, String type, LocalDate startDate, LocalDate endDate,
                                String manf, String fieldNo, String subField,
                                String value, String userId) {
        if (value == null || value.isBlank()) {
            return; // Skip empty values
        }

        // Create composite key for CoC record
        // HatCocTypePK order: model, type, startDate, endDate, manf, fieldNo, subField, country
        HatCocTypePK pk = new HatCocTypePK(model, type, startDate, endDate, manf, fieldNo, subField, "01");

        // Look up existing CoC record
        Optional<HatCocType> cocOpt = hatCocTypeRepository.findById(pk);

        HatCocType coc;
        if (cocOpt.isPresent()) {
            // Update existing record
            coc = cocOpt.get();
            coc.setCocValue(value);
            log.debug("Updating CoC field {}.{} to {}", fieldNo, subField, value);
        } else {
            // Create new record
            coc = new HatCocType();
            coc.setId(pk);
            coc.setCocValue(value);
            log.debug("Creating new CoC field {}.{} with value {}", fieldNo, subField, value);
        }

        // Set system fields
        coc.setCocUserid(userId != null ? userId : "SYSTEM");
        coc.setCocTimestamp(LocalDateTime.now());

        // Persist to database
        hatCocTypeRepository.save(coc);
    }

    /**
     * Update type approval date, number, and related fields
     * Splits day/month/year into LocalDate for storage
     */
    private void updateTypeApproval(UnifiedCoCARequest request) {
        HatTypTypePK typePk = new HatTypTypePK(
                request.getTypModel(),
                request.getTypType(),
                request.getTypStartDate(),
                request.getTypEndDate(),
                request.getTypManf()
        );

        Optional<HatTypType> typeOpt = hatTypTypeRepository.findById(typePk);
        if (typeOpt.isPresent()) {
            HatTypType type = typeOpt.get();
            if (request.getTypApprovalNo() != null) {
                type.setTypApprovalNo(request.getTypApprovalNo());
            }
            if (request.getTypSmallSeries() != null) {
                type.setTypSmallSeries(request.getTypSmallSeries());
            }
            if (request.getTypApprTypeInd() != null) {
                type.setTypApprTypeInd(request.getTypApprTypeInd());
            }
            if (request.getTypChipData() != null) {
                type.setTypChipData(request.getTypChipData());
            }
            if (request.getTypGenTyrList() != null) {
                type.setTypGenTyrList(request.getTypGenTyrList());
            }

            // Build approval date from day, month, year if provided
            if (request.getTypApprDay() != null && request.getTypApprMonth() != null && request.getTypApprYear() != null) {
                try {
                    LocalDate apprDate = LocalDate.of(request.getTypApprYear(), request.getTypApprMonth(), request.getTypApprDay());
                    type.setTypApprDate(apprDate);
                } catch (Exception e) {
                    log.warn("Invalid approval date: {}/{}/{}", request.getTypApprDay(), request.getTypApprMonth(), request.getTypApprYear());
                }
            }

            type.setTypUserid(request.getUserId() != null ? request.getUserId() : "SYSTEM");
            type.setTypTimestamp(LocalDateTime.now());
            hatTypTypeRepository.save(type);
        }
    }

    /**
     * Create field error object
     */
    private UnifiedCoCAResponse.FieldError createFieldError(String fieldName, String message, String rejectedValue) {
        return UnifiedCoCAResponse.FieldError.builder()
                .fieldName(fieldName)
                .errorMessage(message)
                .rejectedValue(rejectedValue)
                .build();
    }
}
