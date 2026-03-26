package com.automotive.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Unified DTO for HA003U screen
 * Combines Type Approval and Variant Management data
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnifiedCoCARequest {

    // ===== TYPE IDENTIFICATION (read-only from lookup) =====
    private String typModel;
    private String typType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate typStartDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate typEndDate;
    private String typManf;
    private String typDescription;

    // ===== VARIANT IDENTIFICATION =====
    private String varVariant;
    private String varEngine;
    private String varChipData; // Y/N flag - disables other validations if Y

    // ===== TYPE APPROVAL FIELDS =====
    private String typApprovalNo;
    private Integer typApprDay;
    private Integer typApprMonth;
    private Integer typApprYear;
    private String typSmallSeries;
    private String varNewmodActmasInd; // New model for ACTMASS

    // ===== TEST METHOD =====
    private String testMethod;

    // ===== VARIANT SPECIFICATION FIELDS =====
    private String axlesWheels;
    private String wheelbase;
    private String posAxlesWithTwinWheels;
    private String steeredAxles;
    private String poweredAxles;

    // ===== POSITION & INTERCONNECTION =====
    private String position;
    private String interconnection;

    // ===== DIMENSIONS =====
    private String length;
    private String lengthWithTowbar;
    private String width;
    private String height;
    private String rearOverhang;
    private String track;

    // ===== BODY CLASSIFICATION =====
    private String typeOfBody;
    private String classOfVehicle;
    private String noConfDoors;
    private String tyreValue;

    // ===== SYSTEM FIELDS =====
    private String userId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime varTimestamp;
}
