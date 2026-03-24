package com.automotive.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "hat_coc_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HatCocType {
    @EmbeddedId
    private HatCocTypePK id;

    @Column(name = "coc_value")
    private String cocValue;

    @Column(name = "coc_userid")
    private String cocUserid;

    @Column(name = "coc_timestamp")
    private LocalDateTime cocTimestamp;

    @PreUpdate
    protected void onUpdate() {
        this.cocTimestamp = LocalDateTime.now();
    }
}
