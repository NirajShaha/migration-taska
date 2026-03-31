package WVTA.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantResponse {
    // ===== VARIANT IDENTIFICATION (HAT_VAR_VARIANT) =====
    private String varModel;
    private String varType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate varStartDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate varEndDate;
    private String varVariant;
    private String varManf;

    // ===== ENGINE & TRANSMISSION (HAT_VAR_VARIANT) =====
    private String varEngine;
    private String varCocMaxPower;
    private String varCocFuel;
    private String varCocCap;
    private String varCocNoArrCyl;
    private String varCocDirectInj;
    private String varCocWrkPrin;
    private String varCocEngCode;
    private String varCocEngMan;

    // ===== AXLES & CONFIGURATION (HAT_VAR_VARIANT) =====
    private String varAxlesCocVal;  // Composite: axle_wheel,position,interconnection,driven

    // ===== VEHICLE FIELDS (HAT_VAC_VARIANT by field_no) =====
    // Field 1: Axles/Wheels Configuration
    private String axleWheelField1_1;    // vac_field_no='1', vac_sub_field='1'
    private String axleWheelField1_2;    // vac_field_no='1', vac_sub_field='2'

    // Field 3: Length
    private String lengthField3;         // vac_field_no='3'

    // Field 4: Width
    private String widthField4;          // vac_field_no='4'

    // Field 5: Height (max)
    private String heightField5_1;       // vac_field_no='5', vac_sub_field='1'

    // Field 5.2: Height (min)
    private String heightField5_2;       // vac_field_no='5', vac_sub_field='2'

    // Field 6: Rear Overhang
    private String rearOverhangField6;   // vac_field_no='6'

    // Field 7: Track - Axle 1/2/3
    private String trackAxleField7;      // vac_field_no='7'

    // Field 8: Type of Body
    private String typeBodyField8;       // vac_field_no='8'

    // Field 30: Class of Vehicle
    private String classVehicleField30;  // vac_field_no='30'

    // Field 30.1: No and Conf. of Doors
    private String doorsField30_1;       // vac_field_no='30.1'

    // Field 31: Doors Configuration
    private String doorsField31;         // vac_field_no='31'

    // Field 38: Tire Specifications
    private String tireField38;          // vac_field_no='38'

    // ===== APPROVAL & FLAGS (HAT_VAR_VARIANT) =====
    private String varCocAnnex;
    private String varChipData;
    private String varGenTyrList;
    private String varNewmodActmasInd;

    // ===== SYSTEM FIELDS =====
    private String varUserid;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime varTimestamp;
}
