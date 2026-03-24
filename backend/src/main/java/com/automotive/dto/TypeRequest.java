package com.automotive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypeRequest {
    private String typModel;
    private String typType;
    private LocalDate typStartDate;
    private LocalDate typEndDate;
    private String typManf;
    
    private String typApprovalNo;
    private LocalDate typApprDate;
    private String typSmallSeries;
    private String userId;
}
