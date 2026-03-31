package WVTA.service;

import WVTA.dto.VariantRequest;
import WVTA.dto.VariantResponse;
import WVTA.entity.*;
import WVTA.repository.*;
import WVTA.validator.FieldValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class HatVarVariantService {

    private final HatVarVariantRepository variantRepository;
    private final HatVacVariantRepository vacRepository;
    private final HatCocTypeRepository cocRepository;
    private final HatTypTypeRepository typeRepository;

    /**
     * Read variant by composite key (maps READ HATVAR in COBOL)
     * Fetches both HAT_VAR_VARIANT and HAT_VAC_VARIANT data
     */
    public VariantResponse readVariant(String model, String type, java.time.LocalDate startDate,
                                       java.time.LocalDate endDate, String variant, String manf) {
        HatVarVariantPK pk = new HatVarVariantPK(model, type, startDate, endDate, variant, manf);
        Optional<HatVarVariant> optional = variantRepository.findById(pk);

        if (optional.isEmpty()) {
            return null;
        }

        HatVarVariant entity = optional.get();

        // Fetch VAC (Variant Attributes Components) data
        List<HatVacVariant> vacRecords = queryVacRecords(model, type, startDate, endDate, variant, manf);

        return mapToResponse(entity, vacRecords);
    }

    /**
     * Update variant with validation (maps UPDATE HATVAR in COBOL)
     * Handles powered axles, position, interconnection validations
     */
    public VariantResponse updateVariant(String model, String type, java.time.LocalDate startDate,
                                         java.time.LocalDate endDate, String variant, String manf,
                                         VariantRequest request) {
        HatVarVariantPK pk = new HatVarVariantPK(model, type, startDate, endDate, variant, manf);
        Optional<HatVarVariant> optional = variantRepository.findById(pk);

        if (optional.isEmpty()) {
            return null;
        }

        HatVarVariant entity = optional.get();

        // Validate changes
        validateVariantRequest(request);

        // Check for changes requiring updates (from HA200T-UPDATE-POWERED-AXLE section)
        boolean needsUpdate = hasVariantChanged(entity, request);

        if (needsUpdate) {
            // Update fields
            entity.setVarAxlesCocVal(request.getVarAxlesCocVal());
            entity.setVarCocAnnex(request.getVarCocAnnex());
            entity.setVarChipData(request.getVarChipData());
            entity.setVarGenTyrList(request.getVarGenTyrList());
            entity.setVarNewmodActmasInd(request.getVarNewmodActmasInd());
            entity.setVarUserid(request.getUserId());
            entity.setVarTimestamp(LocalDateTime.now());

            HatVarVariant updated = variantRepository.save(entity);
            List<HatVacVariant> vacRecords = queryVacRecords(model, type, startDate, endDate, variant, manf);
            return mapToResponse(updated, vacRecords);
        }

        List<HatVacVariant> vacRecords = queryVacRecords(model, type, startDate, endDate, variant, manf);
        return mapToResponse(entity, vacRecords);
    }

    /**
     * Validate powered axles requirement: if powered axles provided, 
     * position and interconnection are required (from HA200T section)
     */
    public boolean validatePoweredAxlesRequirement(String poweredAxles, String position, String interconnection) {
        if (poweredAxles != null && !poweredAxles.trim().isEmpty()) {
            return (position != null && !position.trim().isEmpty()) &&
                    (interconnection != null && !interconnection.trim().isEmpty());
        }
        return true;
    }

    /**
     * Update VAC (Variant Attributes) fields
     * Maps HA300T-UPDATE-VAC-FIELDS section
     */
    @Transactional
    public void updateVacField(String model, String type, java.time.LocalDate startDate,
                               java.time.LocalDate endDate, String variant, String manf,
                               String fieldNo, String subField, String value, String userId) {
        HatVacVariantPK pk = new HatVacVariantPK(model, type, startDate, endDate, variant, manf, fieldNo, subField);

        Optional<HatVacVariant> optional = vacRepository.findById(pk);

        HatVacVariant entity = optional.orElseGet(() ->
                HatVacVariant.builder()
                        .id(pk)
                        .build()
        );

        entity.setVacValue(value);
        entity.setVacUserid(userId);
        entity.setVacTimestamp(LocalDateTime.now());

        vacRepository.save(entity);
    }

    /**
     * Query VAC records for variant
     */
    public List<HatVacVariant> queryVacRecords(String model, String type, java.time.LocalDate startDate,
                                               java.time.LocalDate endDate, String variant, String manf) {
        return vacRepository.findByIdVacModelAndIdVacTypeAndIdVacStartDateAndIdVacEndDateAndIdVacVariantAndIdVacManf(
                model, type, startDate, endDate, variant, manf
        );
    }

    private void validateVariantRequest(VariantRequest request) {
        // Validate position: no commas, max 21 chars
        if (request.getVarAxlesCocVal() != null && request.getVarAxlesCocVal().contains(",")) {
            // Position is extracted from varAxlesCocVal by comma splitting
            String[] parts = request.getVarAxlesCocVal().split(",");
            if (parts.length > 1 && !FieldValidator.validatePosition(parts[1])) {
                throw new IllegalArgumentException("Position field contains invalid characters or exceeds max length");
            }
        }

        // Validate interconnection: no commas, max 40 chars
        if (request.getVarAxlesCocVal() != null && request.getVarAxlesCocVal().contains(",")) {
            String[] parts = request.getVarAxlesCocVal().split(",");
            if (parts.length > 2 && !FieldValidator.validateInterconnection(parts[2])) {
                throw new IllegalArgumentException("Interconnection field contains invalid characters or exceeds max length");
            }
        }
    }

    private boolean hasVariantChanged(HatVarVariant existing, VariantRequest request) {
        return !Objects.equals(existing.getVarAxlesCocVal(), request.getVarAxlesCocVal()) ||
                !Objects.equals(existing.getVarCocAnnex(), request.getVarCocAnnex()) ||
                !Objects.equals(existing.getVarNewmodActmasInd(), request.getVarNewmodActmasInd());
    }

    private VariantResponse mapToResponse(HatVarVariant entity, List<HatVacVariant> vacRecords) {
        VariantResponse.VariantResponseBuilder builder = VariantResponse.builder()
                .varModel(entity.getId().getVarModel())
                .varType(entity.getId().getVarType())
                .varStartDate(entity.getId().getVarStartDate())
                .varEndDate(entity.getId().getVarEndDate())
                .varVariant(entity.getId().getVarVariant())
                .varManf(entity.getId().getVarManf())
                .varEngine(entity.getVarEngine())
                .varAxlesCocVal(entity.getVarAxlesCocVal())
                .varCocAnnex(entity.getVarCocAnnex())
                .varChipData(entity.getVarChipData())
                .varGenTyrList(entity.getVarGenTyrList())
                .varNewmodActmasInd(entity.getVarNewmodActmasInd())
                .varCocMaxPower(entity.getVarCocMaxPower())
                .varCocFuel(entity.getVarCocFuel())
                .varCocCap(entity.getVarCocCap())
                .varCocNoArrCyl(entity.getVarCocNoArrCyl())
                .varCocDirectInj(entity.getVarCocDirectInj())
                .varCocWrkPrin(entity.getVarCocWrkPrin())
                .varCocEngCode(entity.getVarCocEngCode())
                .varCocEngMan(entity.getVarCocEngMan())
                .varUserid(entity.getVarUserid())
                .varTimestamp(entity.getVarTimestamp());

        // Map VAC fields by field_no and sub_field
        if (vacRecords != null && !vacRecords.isEmpty()) {
            for (HatVacVariant vac : vacRecords) {
                String fieldNo = vac.getId().getVacFieldNo();
                String subField = vac.getId().getVacSubField();
                String value = vac.getVacValue();

                // Map by field_no
                if ("1".equals(fieldNo)) {
                    if ("1".equals(subField)) {
                        builder.axleWheelField1_1(value);
                    } else if ("2".equals(subField)) {
                        builder.axleWheelField1_2(value);
                    }
                } else if ("3".equals(fieldNo)) {
                    builder.lengthField3(value);
                } else if ("4".equals(fieldNo)) {
                    builder.widthField4(value);
                } else if ("5".equals(fieldNo)) {
                    if ("1".equals(subField)) {
                        builder.heightField5_1(value);
                    } else if ("2".equals(subField)) {
                        builder.heightField5_2(value);
                    }
                } else if ("6".equals(fieldNo)) {
                    builder.rearOverhangField6(value);
                } else if ("7".equals(fieldNo)) {
                    builder.trackAxleField7(value);
                } else if ("8".equals(fieldNo)) {
                    builder.typeBodyField8(value);
                } else if ("30".equals(fieldNo)) {
                    builder.classVehicleField30(value);
                } else if ("30.1".equals(fieldNo)) {
                    builder.doorsField30_1(value);
                } else if ("31".equals(fieldNo)) {
                    builder.doorsField31(value);
                } else if ("38".equals(fieldNo)) {
                    builder.tireField38(value);
                }
            }
        }

        return builder.build();
    }
}
