package WVTA.service;

import WVTA.entity.HatVacVariant;
import WVTA.entity.HatVacVariantPK;
import WVTA.repository.HatVacVariantRepository;
import WVTA.validator.FieldValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class HatVacVariantService {

    @Autowired
    private HatVacVariantRepository vacRepository;

    /**
     * Update VAC field with validation (maps HA300T section)
     */
    public HatVacVariant updateVacField(String model, String type, LocalDate startDate,
                                        LocalDate endDate, String variant, String manf,
                                        String fieldNo, String subField, String value,
                                        String userId) {
        HatVacVariantPK pk = new HatVacVariantPK(model, type, startDate, endDate, variant, manf, fieldNo, subField);
        
        // Validate based on field type
        validateVacValue(fieldNo, value, startDate);

        Optional<HatVacVariant> optional = vacRepository.findById(pk);
        
        HatVacVariant entity = optional.orElseGet(() -> 
            HatVacVariant.builder()
                .id(pk)
                .build()
        );

        entity.setVacValue(value);
        entity.setVacUserid(userId);
        entity.setVacTimestamp(LocalDateTime.now());
        
        return vacRepository.save(entity);
    }

    /**
     * Validate VAC values based on field number
     * Based on HA300T-UPDATE-VAC-FIELDS section field mappings
     */
    private void validateVacValue(String fieldNo, String value, LocalDate startDate) {
        if (value == null || value.isEmpty()) {
            return;
        }

        switch (fieldNo) {
            case "1":
                // Axle/Wheel: NTN format
                if (!FieldValidator.validateAxleWheel(value)) {
                    throw new IllegalArgumentException("Invalid Axle/Wheel format");
                }
                break;
            case "0.1":
                // Position or Steer Axle: C or NCN format
                if (!FieldValidator.validatePosWheelOrSteerAxle(value)) {
                    throw new IllegalArgumentException("Invalid Position/Steer Axle format");
                }
                break;
            case "3":
                // Wheelbase: H or NNNN
                if (!FieldValidator.validateWheelbase(value)) {
                    throw new IllegalArgumentException("Invalid Wheelbase format");
                }
                break;
            case "4":
                // Track: Complex date-based validation
                if (!FieldValidator.validateTrack(value, startDate)) {
                    throw new IllegalArgumentException("Invalid Track format");
                }
                break;
            case "5":
                // Length/Length with towbar
                if (!FieldValidator.validateLength(value) && !FieldValidator.validateLengthWithTowbar(value)) {
                    throw new IllegalArgumentException("Invalid Length format");
                }
                break;
            case "6":
                // Width
                if (!FieldValidator.validateWidth(value)) {
                    throw new IllegalArgumentException("Invalid Width format");
                }
                break;
            case "7":
                // Height: date-based validation
                if (!FieldValidator.validateHeight(value, startDate)) {
                    throw new IllegalArgumentException("Invalid Height format");
                }
                break;
            case "8":
                // Overhang: multiple formats
                if (!FieldValidator.validateOverhang(value, null)) {
                    throw new IllegalArgumentException("Invalid Overhang format");
                }
                break;
            case "30":
                // TOB-UB: Type of Body
                // No specific format validation
                break;
            case "30.1":
                // Class: I, II, III, A, B
                if (!FieldValidator.validateClass(value)) {
                    throw new IllegalArgumentException("Invalid Class value");
                }
                break;
            case "31":
                // COD-UB: No of doors/configuration
                // No specific format validation
                break;
        }
    }
}
