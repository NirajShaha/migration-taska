package com.automotive.repository;

import com.automotive.entity.HatVacVariant;
import com.automotive.entity.HatVacVariantPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HatVacVariantRepository extends JpaRepository<HatVacVariant, HatVacVariantPK> {
    List<HatVacVariant> findByIdVacModelAndIdVacTypeAndIdVacStartDateAndIdVacEndDateAndIdVacVariantAndIdVacManf(
        String model, String type, LocalDate startDate, LocalDate endDate, String variant, String manf);
}
