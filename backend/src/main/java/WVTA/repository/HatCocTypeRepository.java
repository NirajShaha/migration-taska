package WVTA.repository;

import WVTA.entity.HatCocType;
import WVTA.entity.HatCocTypePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HatCocTypeRepository extends JpaRepository<HatCocType, HatCocTypePK> {
    List<HatCocType> findByIdCocModelAndIdCocTypeAndIdCocStartDateAndIdCocEndDateAndIdCocManf(
        String model, String type, LocalDate startDate, LocalDate endDate, String manf);
}
