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
public class HatVarVariantPK implements Serializable {
    private String varModel;
    private String varType;
    private LocalDate varStartDate;
    private LocalDate varEndDate;
    private String varVariant;
    private String varManf;
}
