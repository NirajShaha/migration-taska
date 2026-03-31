package WVTA.entity;

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
public class HatVarVariantPK implements Serializable {
    @Column(name = "var_model", length = 1)
    private String varModel;

    @Column(name = "var_type", length = 4)
    private String varType;

    @Column(name = "var_start_date")
    private LocalDate varStartDate;

    @Column(name = "var_end_date")
    private LocalDate varEndDate;

    @Column(name = "var_variant", length = 6)
    private String varVariant;

    @Column(name = "var_manf", length = 1)
    private String varManf;
}
