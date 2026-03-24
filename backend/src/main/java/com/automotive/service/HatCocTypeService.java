package com.automotive.service;

import com.automotive.entity.HatCocType;
import com.automotive.entity.HatCocTypePK;
import com.automotive.repository.HatCocTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class HatCocTypeService {

    private final HatCocTypeRepository cocRepository;

    /**
     * Update COC field (maps HA900T-UPDATE-COC-TABLE section)
     */
    public HatCocType updateCocField(String model, String type, LocalDate startDate,
                                    LocalDate endDate, String manf, String fieldNo,
                                    String subField, String country, String value,
                                    String userId) {
        HatCocTypePK pk = new HatCocTypePK(model, type, startDate, endDate, manf, fieldNo, subField, country);
        
        Optional<HatCocType> optional = cocRepository.findById(pk);
        
        HatCocType entity = optional.orElseGet(() -> 
            HatCocType.builder()
                .id(pk)
                .build()
        );

        entity.setCocValue(value);
        entity.setCocUserid(userId);
        entity.setCocTimestamp(LocalDateTime.now());
        
        return cocRepository.save(entity);
    }
}
