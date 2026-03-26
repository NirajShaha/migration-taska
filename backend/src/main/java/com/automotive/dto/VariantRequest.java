package com.automotive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantRequest {
    // ===== VARIANT IDENTIFICATION =====
    private String varModel;
    private String varType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate varStartDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate varEndDate;
    private String varVariant;
    private String varManf;
    
    // ===== ENGINE & TRANSMISSION =====
    private String varEngine;
    private String varCocMaxPower;
    private String varCocFuel;
    private String varCocCap;
    private String varCocNoArrCyl;
    private String varCocDirectInj;
    private String varCocWrkPrin;
    private String varCocEngCode;
    private String varCocEngMan;
    
    // ===== AXLES & CONFIGURATION =====
    private String varAxlesCocVal;  // Composite format
    
    // ===== VEHICLE DIMENSIONS & CONFIGURATION =====
    private String axleWheelField1_1;
    private String axleWheelField1_2;
    private String lengthField3;
    private String widthField4;
    private String heightField5_1;
    private String heightField5_2;
    private String rearOverhangField6;
    private String trackAxleField7;
    private String typeBodyField8;
    private String classVehicleField30;
    private String doorsField30_1;
    private String doorsField31;
    private String tireField38;
    
    // ===== APPROVAL & FLAGS =====
    private String varCocAnnex;
    private String varChipData;
    private String varGenTyrList;
    private String varNewmodActmasInd;
    
    // ===== SYSTEM =====
    private String userId;
}
