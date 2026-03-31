package WVTA.repository;

import WVTA.entity.HatVarVariant;
import WVTA.entity.HatVarVariantPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HatVarVariantRepository extends JpaRepository<HatVarVariant, HatVarVariantPK> {
    Optional<HatVarVariant> findById(HatVarVariantPK id);
}
