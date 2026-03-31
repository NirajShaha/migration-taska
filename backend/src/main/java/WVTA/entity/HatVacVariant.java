package WVTA.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "hat_vac_variant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HatVacVariant {
    @EmbeddedId
    private HatVacVariantPK id;

    @Column(name = "vac_value")
    private String vacValue;

    @Column(name = "vac_userid")
    private String vacUserid;

    @Column(name = "vac_timestamp")
    private LocalDateTime vacTimestamp;

    @PreUpdate
    protected void onUpdate() {
        this.vacTimestamp = LocalDateTime.now();
    }
}
