package com.automotive.controller;

import com.automotive.dto.UnifiedCoCARequest;
import com.automotive.dto.UnifiedCoCAResponse;
import com.automotive.service.UnifiedCoCService;
import com.automotive.exception.ResourceNotFoundException;
import com.automotive.exception.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for unified HA003U screen operations
 * Handles lookup and update of Type/Variant CoC data with full validation
 */
@Slf4j
@RestController
@RequestMapping("/api/coc")
@CrossOrigin(origins = "http://localhost:*", allowedHeaders = "*")
public class UnifiedCoCController {

    @Autowired
    private UnifiedCoCService unifiedCoCService;

    /**
     * Lookup variant to populate form
     * GET /api/coc/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}
     */
    @GetMapping("/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}")
    public ResponseEntity<?> lookupVariant(
            @PathVariable String model,
            @PathVariable String type,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @PathVariable String variant,
            @PathVariable String manf) {

        try {
            log.info("Lookup variant: {}/{}/{}/{}/{}/{}", model, type, startDate, endDate, variant, manf);
            UnifiedCoCAResponse response = unifiedCoCService.lookupVariant(model, type, startDate, endDate, variant, manf);
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            log.warn("Variant not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Error looking up variant", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }

    /**
     * Validate form data without saving
     * POST /api/coc/validate
     */
    @PostMapping("/validate")
    public ResponseEntity<?> validateVariant(@RequestBody UnifiedCoCARequest request) {
        try {
            log.info("Validating variant data");
            var errors = unifiedCoCService.validateFields(request);

            Map<String, Object> result = new HashMap<>();
            if (errors.isEmpty()) {
                result.put("valid", true);
                result.put("message", "All fields are valid");
                return ResponseEntity.ok(result);
            } else {
                result.put("valid", false);
                result.put("errors", errors);
                result.put("message", "Validation failed: " + errors.size() + " error(s)");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
            }
        } catch (Exception e) {
            log.error("Error validating variant", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Validation error: " + e.getMessage()));
        }
    }

    /**
     * Update variant with full validation
     * PUT /api/coc/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}
     */
    @PutMapping("/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}")
    public ResponseEntity<?> updateVariant(
            @PathVariable String model,
            @PathVariable String type,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @PathVariable String variant,
            @PathVariable String manf,
            @RequestBody UnifiedCoCARequest request) {

        try {
            log.info("Updating variant: {}/{}/{}/{}/{}/{}", model, type, startDate, endDate, variant, manf);

            // Ensure request has correct identifiers
            request.setTypModel(model);
            request.setTypType(type);
            request.setTypStartDate(startDate);
            request.setTypEndDate(endDate);
            request.setVarVariant(variant);
            request.setTypManf(manf);

            // Perform update with validation
            UnifiedCoCAResponse response = unifiedCoCService.updateVariant(request);

            if (!response.isValid()) {
                log.warn("Validation errors during update: {}", response.getErrors().size());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            log.info("Variant updated successfully");
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            log.warn("Variant not found for update: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating variant", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Update error: " + e.getMessage()));
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "module", "Unified CoC Service",
                "screen", "HA003U"
        ));
    }
}
