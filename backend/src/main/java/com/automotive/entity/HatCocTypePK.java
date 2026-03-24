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
public class HatCocTypePK implements Serializable {
    private String cocModel;
    private String cocType;
    private LocalDate cocStartDate;
    private LocalDate cocEndDate;
    private String cocManf;
    private String cocFieldNo;
    private String cocSubField;
    private String cocCountry;
}
