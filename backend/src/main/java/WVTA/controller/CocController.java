package WVTA.contorller;

import WVTA.entity.HatCocType;
import WVTA.service.HatCocTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/coc")
public class CocController {

    @Autowired
    private HatCocTypeService cocService;

    /**
     * Update COC field (maps HA900T-UPDATE-COC-TABLE from COBOL)
     */
    @PostMapping("/update-field")
    public ResponseEntity<HatCocType> updateCocField(
            @RequestParam String model,
            @RequestParam String type,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String manf,
            @RequestParam String fieldNo,
            @RequestParam String subField,
            @RequestParam String country,
            @RequestParam String value,
            @RequestParam String userId) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        HatCocType result = cocService.updateCocField(
            model, type, start, end, manf, fieldNo, subField, country, value, userId
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
