package WVTA.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "hat_typ_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HatTypType {
    @EmbeddedId
    private HatTypTypePK id;

    @Column(name = "typ_description")
    private String typDescription;

    @Column(name = "typ_approval_no")
    private String typApprovalNo;

    @Column(name = "typ_appr_date")
    private LocalDate typApprDate;

    @Column(name = "typ_category")
    private String typCategory;

    @Column(name = "typ_userid")
    private String typUserid;

    @Column(name = "typ_timestamp")
    private LocalDateTime typTimestamp;

    @Column(name = "typ_appr_type_ind")
    private String typApprTypeInd;

    @Column(name = "typ_small_series")
    private String typSmallSeries;

    @Column(name = "typ_chip_data")
    private String typChipData;

    @Column(name = "typ_gen_tyr_list")
    private String typGenTyrList;

    @PreUpdate
    protected void onUpdate() {
        this.typTimestamp = LocalDateTime.now();
    }
}
