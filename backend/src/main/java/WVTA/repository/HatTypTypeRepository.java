package WVTA.repository;

import WVTA.entity.HatTypType;
import WVTA.entity.HatTypTypePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HatTypTypeRepository extends JpaRepository<HatTypType, HatTypTypePK> {
    Optional<HatTypType> findById(HatTypTypePK id);
}
