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
public class HatTypTypePK implements Serializable {
    private String typModel;
    private String typType;
    private LocalDate typStartDate;
    private LocalDate typEndDate;
    private String typManf;
}
