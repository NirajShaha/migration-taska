package com.automotive.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HatVacVariantPK implements Serializable {
    private String vacModel;
    private String vacType;
    private LocalDate vacStartDate;
    private LocalDate vacEndDate;
    private String vacVariant;
    private String vacManf;
    private String vacFieldNo;
    private String vacSubField;
}
