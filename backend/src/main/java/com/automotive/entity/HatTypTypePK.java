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
public class HatTypTypePK implements Serializable {
    @Column(name = "typ_model", length = 1)
    private String typModel;

    @Column(name = "typ_type", length = 4)
    private String typType;

    @Column(name = "typ_start_date")
    private LocalDate typStartDate;

    @Column(name = "typ_end_date")
    private LocalDate typEndDate;

    @Column(name = "typ_manf", length = 1)
    private String typManf;
}
