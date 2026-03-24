package com.automotive.service;

import com.automotive.dto.VariantRequest;
import com.automotive.dto.VariantResponse;
import com.automotive.entity.*;
import com.automotive.repository.*;
import com.automotive.validator.FieldValidator;
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
     */
    public VariantResponse readVariant(String model, String type, java.time.LocalDate startDate, 
                                       java.time.LocalDate endDate, String variant, String manf) {
        HatVarVariantPK pk = new HatVarVariantPK(model, type, startDate, endDate, variant, manf);
        Optional<HatVarVariant> optional = variantRepository.findById(pk);
        
        if (optional.isEmpty()) {
            return null;
        }

        HatVarVariant entity = optional.get();
        return mapToResponse(entity);
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
            return mapToResponse(updated);
        }

        return mapToResponse(entity);
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

    private VariantResponse mapToResponse(HatVarVariant entity) {
        return VariantResponse.builder()
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
            .varUserid(entity.getVarUserid())
            .varTimestamp(entity.getVarTimestamp())
            .build();
    }
}
