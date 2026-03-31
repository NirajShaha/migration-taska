package WVTA.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate typStartDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate typEndDate;
    private String typManf;
    
    private String typApprovalNo;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate typApprDate;
    private String typSmallSeries;
    private String userId;
}
