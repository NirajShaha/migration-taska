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
public class HatVacVariantPK implements Serializable {
    @Column(name = "vac_model", length = 1)
    private String vacModel;

    @Column(name = "vac_type", length = 4)
    private String vacType;

    @Column(name = "vac_start_date")
    private LocalDate vacStartDate;

    @Column(name = "vac_end_date")
    private LocalDate vacEndDate;

    @Column(name = "vac_variant", length = 6)
    private String vacVariant;

    @Column(name = "vac_manf", length = 1)
    private String vacManf;

    @Column(name = "vac_field_no", length = 5)
    private String vacFieldNo;

    @Column(name = "vac_sub_field", length = 3)
    private String vacSubField;
}
