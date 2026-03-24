package com.automotive.controller;

import com.automotive.dto.VariantRequest;
import com.automotive.dto.VariantResponse;
import com.automotive.exception.ResourceNotFoundException;
import com.automotive.service.HatVarVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/variants")
@RequiredArgsConstructor
public class VariantController {

    private final HatVarVariantService variantService;

    /**
     * Read variant by composite key (maps READ HATVAR from COBOL)
     */
    @GetMapping("/lookup")
    public ResponseEntity<VariantResponse> lookupVariant(
            @RequestParam String model,
            @RequestParam String type,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String variant,
            @RequestParam String manf) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        VariantResponse response = variantService.readVariant(model, type, start, end, variant, manf);
        
        if (response == null) {
            throw new ResourceNotFoundException("Variant not found");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update variant (maps UPDATE HATVAR from COBOL)
     */
    @PutMapping("/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}")
    public ResponseEntity<VariantResponse> updateVariant(
            @PathVariable String model,
            @PathVariable String type,
            @PathVariable String startDate,
            @PathVariable String endDate,
            @PathVariable String variant,
            @PathVariable String manf,
            @RequestBody VariantRequest request) {
        
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        VariantResponse response = variantService.updateVariant(model, type, start, end, variant, manf, request);
        
        if (response == null) {
            throw new ResourceNotFoundException("Variant not found");
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Validate powered axles requirement
     */
    @PostMapping("/validate-powered-axles")
    public ResponseEntity<Boolean> validatePoweredAxles(
            @RequestParam String poweredAxles,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String interconnection) {
        
        boolean valid = variantService.validatePoweredAxlesRequirement(poweredAxles, position, interconnection);
        return ResponseEntity.ok(valid);
    }
}
