package com.automotive.entity;

import jakarta.persistence.Column;
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
    @Column(name = "coc_model", length = 1)
    private String cocModel;

    @Column(name = "coc_type", length = 4)
    private String cocType;

    @Column(name = "coc_start_date")
    private LocalDate cocStartDate;

    @Column(name = "coc_end_date")
    private LocalDate cocEndDate;

    @Column(name = "coc_manf", length = 1)
    private String cocManf;

    @Column(name = "coc_field_no", length = 5)
    private String cocFieldNo;

    @Column(name = "coc_sub_field", length = 3)
    private String cocSubField;

    @Column(name = "coc_country", length = 2)
    private String cocCountry;

    // Explicit no-arg constructor for Hibernate compatibility
    public HatCocTypePK() {
        this.cocModel = null;
        this.cocType = null;
        this.cocStartDate = null;
        this.cocEndDate = null;
        this.cocManf = null;
        this.cocFieldNo = null;
        this.cocSubField = null;
        this.cocCountry = null;
    }
}
