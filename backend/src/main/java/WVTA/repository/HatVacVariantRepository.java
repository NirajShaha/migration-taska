package WVTA.repository;

import WVTA.entity.HatVacVariant;
import WVTA.entity.HatVacVariantPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HatVacVariantRepository extends JpaRepository<HatVacVariant, HatVacVariantPK> {
    List<HatVacVariant> findByIdVacModelAndIdVacTypeAndIdVacStartDateAndIdVacEndDateAndIdVacVariantAndIdVacManf(
        String model, String type, LocalDate startDate, LocalDate endDate, String variant, String manf);
}
