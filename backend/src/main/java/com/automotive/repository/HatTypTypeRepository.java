package com.automotive.repository;

import com.automotive.entity.HatTypType;
import com.automotive.entity.HatTypTypePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface HatTypTypeRepository extends JpaRepository<HatTypType, HatTypTypePK> {
    Optional<HatTypType> findById(HatTypTypePK id);
}
