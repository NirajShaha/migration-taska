package WVTA.contorller;

import WVTA.entity.HatVacVariant;
import WVTA.service.HatVacVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/vac")
public class VacController {

    @Autowired
    private HatVacVariantService vacService;

    /**
     * Update VAC field (maps HA300T-UPDATE-VAC-FIELDS from COBOL)
     * Individual field updates are validated per field type
     */
    @PostMapping("/update-field")
    public ResponseEntity<HatVacVariant> updateVacField(
            @RequestParam String model,
            @RequestParam String type,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String variant,
            @RequestParam String manf,
            @RequestParam String fieldNo,
            @RequestParam String subField,
            @RequestParam String value,
            @RequestParam String userId) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        HatVacVariant result = vacService.updateVacField(
            model, type, start, end, variant, manf, fieldNo, subField, value, userId
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
