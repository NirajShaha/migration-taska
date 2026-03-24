package com.automotive.repository;

import com.automotive.entity.HatVarVariant;
import com.automotive.entity.HatVarVariantPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HatVarVariantRepository extends JpaRepository<HatVarVariant, HatVarVariantPK> {
    Optional<HatVarVariant> findById(HatVarVariantPK id);
}
