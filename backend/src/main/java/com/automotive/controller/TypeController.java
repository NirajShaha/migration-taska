package com.automotive.controller;

import com.automotive.dto.TypeRequest;
import com.automotive.entity.HatTypType;
import com.automotive.exception.ResourceNotFoundException;
import com.automotive.service.HatTypTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/types")
@RequiredArgsConstructor
public class TypeController {

    private final HatTypTypeService typeService;

    /**
     * Read type by composite key (maps READ HATTYP from COBOL)
     */
    @GetMapping("/lookup")
    public ResponseEntity<HatTypType> lookupType(
            @RequestParam String model,
            @RequestParam String type,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String manf) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        HatTypType response = typeService.readType(model, type, start, end, manf);
        
        if (response == null) {
            throw new ResourceNotFoundException("Type not found");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update type approval (maps HA100T-UPDATE-APPROVAL-NO from COBOL)
     */
    @PutMapping("/{model}/{type}/{startDate}/{endDate}/{manf}/approval")
    public ResponseEntity<HatTypType> updateTypeApproval(
            @PathVariable String model,
            @PathVariable String type,
            @PathVariable String startDate,
            @PathVariable String endDate,
            @PathVariable String manf,
            @RequestBody TypeRequest request) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        HatTypType response = typeService.updateTypeApproval(model, type, start, end, manf, request);
        
        if (response == null) {
            throw new ResourceNotFoundException("Type not found");
        }
        
        return ResponseEntity.ok(response);
    }
}
