package WVTA.service;

import WVTA.dto.TypeRequest;
import WVTA.entity.HatTypType;
import WVTA.entity.HatTypTypePK;
import WVTA.repository.HatTypTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class HatTypTypeService {

    @Autowired
    private HatTypTypeRepository typeRepository;

    /**
     * Read type by composite key (maps READ HATTYP in COBOL)
     */
    public HatTypType readType(String model, String type, java.time.LocalDate startDate,
                               java.time.LocalDate endDate, String manf) {
        HatTypTypePK pk = new HatTypTypePK(model, type, startDate, endDate, manf);
        Optional<HatTypType> optional = typeRepository.findById(pk);
        return optional.orElse(null);
    }

    /**
     * Update type with approval information (maps HA100T-UPDATE-APPROVAL-NO section)
     * Updates: approval No, approval date, small series, userid, timestamp
     */
    public HatTypType updateTypeApproval(String model, String type, java.time.LocalDate startDate,
                                        java.time.LocalDate endDate, String manf,
                                        TypeRequest request) {
        HatTypTypePK pk = new HatTypTypePK(model, type, startDate, endDate, manf);
        Optional<HatTypType> optional = typeRepository.findById(pk);
        
        if (optional.isEmpty()) {
            return null;
        }

        HatTypType entity = optional.get();
        
        // Update approval information
        entity.setTypApprovalNo(request.getTypApprovalNo());
        entity.setTypApprDate(request.getTypApprDate());
        entity.setTypSmallSeries(request.getTypSmallSeries());
        entity.setTypUserid(request.getUserId());
        entity.setTypTimestamp(LocalDateTime.now());
        
        return typeRepository.save(entity);
    }
}
