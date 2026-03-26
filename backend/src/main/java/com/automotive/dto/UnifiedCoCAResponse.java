package com.automotive.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for unified HA003U screen
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnifiedCoCAResponse {

    // ===== TYPE IDENTIFICATION =====
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
    private String varChipData;

    // ===== TYPE APPROVAL FIELDS =====
    private String typApprovalNo;
    private Integer typApprDay;
    private Integer typApprMonth;
    private Integer typApprYear;
    private String typSmallSeries;
    private String varNewmodActmasInd;

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

    // ===== VALIDATION & METADATA =====
    private boolean valid;
    private List<FieldError> errors;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastUpdated;
    private String lastUpdatedBy;

    /**
     * Field-level error information
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FieldError {
        private String fieldName;
        private String errorMessage;
        private String rejectedValue;
    }
}
