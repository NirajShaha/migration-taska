package com.automotive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantResponse {
    private String varModel;
    private String varType;
    private LocalDate varStartDate;
    private LocalDate varEndDate;
    private String varVariant;
    private String varManf;
    
    private String varEngine;
    private String varAxlesCocVal;
    private String varCocAnnex;
    private String varChipData;
    private String varGenTyrList;
    private String varNewmodActmasInd;
    private String varUserid;
    private LocalDateTime varTimestamp;
}
