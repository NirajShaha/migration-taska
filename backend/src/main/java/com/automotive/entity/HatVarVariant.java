package com.automotive.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "hat_var_variant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HatVarVariant {
    @EmbeddedId
    private HatVarVariantPK id;

    @Column(name = "var_engine")
    private String varEngine;

    @Column(name = "var_axles_coc_val")
    private String varAxlesCocVal;

    @Column(name = "var_userid")
    private String varUserid;

    @Column(name = "var_timestamp")
    private LocalDateTime varTimestamp;

    @Column(name = "var_coc_max_power")
    private String varCocMaxPower;

    @Column(name = "var_coc_fuel")
    private String varCocFuel;

    @Column(name = "var_coc_cap")
    private String varCocCap;

    @Column(name = "var_coc_no_arr_cyl")
    private String varCocNoArrCyl;

    @Column(name = "var_coc_direct_inj")
    private String varCocDirectInj;

    @Column(name = "var_coc_wrk_prin")
    private String varCocWrkPrin;

    @Column(name = "var_coc_eng_code")
    private String varCocEngCode;

    @Column(name = "var_coc_eng_man")
    private String varCocEngMan;

    @Column(name = "var_coc_annex")
    private String varCocAnnex;

    @Column(name = "var_chip_data")
    private String varChipData;

    @Column(name = "var_gen_tyr_list")
    private String varGenTyrList;

    @Column(name = "var_newmod_actmas_ind")
    private String varNewmodActmasInd;

    @PreUpdate
    protected void onUpdate() {
        this.varTimestamp = LocalDateTime.now();
    }
}
