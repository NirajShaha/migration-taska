package com.automotive.controller;

import com.automotive.dto.VariantRequest;
import com.automotive.dto.VariantResponse;
import com.automotive.dto.TypeRequest;
import com.automotive.entity.*;
import com.automotive.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

/**
 * Integration tests for WVTA CoC Controller APIs
 * Tests all endpoints mapped from HA003U COBOL screen
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("WVTA CoC Controller API Tests")
public class ControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private HatVarVariantRepository variantRepository;

    @Autowired
    private HatTypTypeRepository typeRepository;

    @Autowired
    private HatVacVariantRepository vacRepository;

    @Autowired
    private HatCocTypeRepository cocRepository;

    private HatTypType testType;
    private HatVarVariant testVariant;

    @BeforeEach
    public void setUp() {
        // Clean up
        variantRepository.deleteAll();
        typeRepository.deleteAll();
        vacRepository.deleteAll();
        cocRepository.deleteAll();

        // Create test data
        setupTestData();
    }

    private void setupTestData() {
        // Create test type
        HatTypTypePK typePK = new HatTypTypePK("B", "7A10", LocalDate.of(2024, 1, 1), 
                                                LocalDate.of(2025, 12, 31), "B");
        testType = HatTypType.builder()
            .id(typePK)
            .typDescription("BMW 7 Series Sedan")
            .typApprovalNo("EU2024/001234/DE    ")
            .typApprDate(LocalDate.of(2024, 1, 15))
            .typCategory("LC")
            .typUserid("ADMIN001")
            .typTimestamp(LocalDateTime.now())
            .build();
        typeRepository.save(testType);

        // Create test variant
        HatVarVariantPK variantPK = new HatVarVariantPK("B", "7A10", LocalDate.of(2024, 1, 1),
                                                         LocalDate.of(2025, 12, 31), "BASE00", "B");
        testVariant = HatVarVariant.builder()
            .id(variantPK)
            .varEngine("N57D30OL1")
            .varAxlesCocVal("2,2,RWD,1")
            .varUserid("USER0001")
            .varTimestamp(LocalDateTime.now())
            .varCocMaxPower("340 kW")
            .varCocFuel("DIESEL")
            .varCocCap("3498")
            .varCocNoArrCyl("6")
            .varChipData("Y")
            .varGenTyrList("Y")
            .build();
        variantRepository.save(testVariant);
    }

    // ============================================================================
    // VARIANT CONTROLLER TESTS
    // ============================================================================

    @Test
    @DisplayName("GET /variants/lookup - Read variant by composite key")
    public void testLookupVariant() throws Exception {
        mockMvc.perform(get("/api/variants/lookup")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.varModel", equalTo("B")))
                .andExpect(jsonPath("$.varType", equalTo("7A10")))
                .andExpect(jsonPath("$.varVariant", equalTo("BASE00")))
                .andExpect(jsonPath("$.varEngine", equalTo("N57D30OL1")))
                .andExpect(jsonPath("$.varCocMaxPower", equalTo("340 kW")))
                .andExpect(jsonPath("$.varChipData", equalTo("Y")));
    }

    @Test
    @DisplayName("GET /variants/lookup - Not found returns 404")
    public void testLookupVariantNotFound() throws Exception {
        mockMvc.perform(get("/api/variants/lookup")
                .param("model", "X")
                .param("type", "XXXX")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "NOTFOUND")
                .param("manf", "X")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @DisplayName("PUT /variants/{keys} - Update variant with new axles data")
    public void testUpdateVariant() throws Exception {
        VariantRequest updateRequest = new VariantRequest();
        updateRequest.setVarModel("B");
        updateRequest.setVarType("7A10");
        updateRequest.setVarStartDate(LocalDate.of(2024, 1, 1));
        updateRequest.setVarEndDate(LocalDate.of(2025, 12, 31));
        updateRequest.setVarVariant("BASE00");
        updateRequest.setVarManf("B");
        updateRequest.setVarEngine("N57D30UL");
        updateRequest.setVarAxlesCocVal("2,2,RWD,2"); // Updated axles
        updateRequest.setUserId("USER0002");

        mockMvc.perform(put("/api/variants/B/7A10/2024-01-01/2025-12-31/BASE00/B")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.varEngine", equalTo("N57D30UL")))
                .andExpect(jsonPath("$.varAxlesCocVal", equalTo("2,2,RWD,2")))
                .andExpect(jsonPath("$.varUserid", equalTo("USER0002")));
    }

    @Test
    @DisplayName("POST /variants/validate-powered-axles - Valid configuration")
    public void testValidatePoweredAxlesValid() throws Exception {
        mockMvc.perform(post("/api/variants/validate-powered-axles")
                .param("poweredAxles", "2")
                .param("position", "2,2,RWD,1")
                .param("interconnection", "")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("true"));
    }

    @Test
    @DisplayName("POST /variants/validate-powered-axles - Invalid (missing position)")
    public void testValidatePoweredAxlesInvalid() throws Exception {
        mockMvc.perform(post("/api/variants/validate-powered-axles")
                .param("poweredAxles", "2")
                .param("position", "")
                .param("interconnection", "")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("false"));
    }

    @Test
    @DisplayName("POST /variants/validate-powered-axles - No powered axles (always valid)")
    public void testValidatePoweredAxlesNotApplicable() throws Exception {
        mockMvc.perform(post("/api/variants/validate-powered-axles")
                .param("poweredAxles", "")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("true"));
    }


    // ============================================================================
    // TYPE CONTROLLER TESTS
    // ============================================================================

    @Test
    @DisplayName("GET /types/lookup - Read type by composite key")
    public void testLookupType() throws Exception {
        mockMvc.perform(get("/api/types/lookup")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("manf", "B")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.typModel", equalTo("B")))
                .andExpect(jsonPath("$.typType", equalTo("7A10")))
                .andExpect(jsonPath("$.typDescription", containsString("BMW")))
                .andExpect(jsonPath("$.typApprovalNo", containsString("EU2024")));
    }

    @Test
    @DisplayName("PUT /types/{keys}/approval - Update type approval information")
    public void testUpdateTypeApproval() throws Exception {
        TypeRequest approvalRequest = new TypeRequest();
        approvalRequest.setTypModel("B");
        approvalRequest.setTypType("7A10");
        approvalRequest.setTypStartDate(LocalDate.of(2024, 1, 1));
        approvalRequest.setTypEndDate(LocalDate.of(2025, 12, 31));
        approvalRequest.setTypManf("B");
        approvalRequest.setTypApprovalNo("EU2024/001240/DE    "); // Updated approval
        approvalRequest.setTypApprDate(LocalDate.of(2024, 2, 1));
        approvalRequest.setUserId("ADMIN002");

        mockMvc.perform(put("/api/types/B/7A10/2024-01-01/2025-12-31/B/approval")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(approvalRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.typApprovalNo", containsString("EU2024/001240")))
                .andExpect(jsonPath("$.typUserid", equalTo("ADMIN002")));
    }

    @Test
    @DisplayName("PUT /types/{keys}/approval - Type not found")
    public void testUpdateTypeApprovalNotFound() throws Exception {
        TypeRequest approvalRequest = new TypeRequest();
        approvalRequest.setTypModel("X");
        approvalRequest.setTypType("XXXX");
        approvalRequest.setTypStartDate(LocalDate.of(2024, 1, 1));
        approvalRequest.setTypEndDate(LocalDate.of(2025, 12, 31));
        approvalRequest.setTypManf("X");
        approvalRequest.setUserId("ADMIN002");

        mockMvc.perform(put("/api/types/X/XXXX/2024-01-01/2025-12-31/X/approval")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(approvalRequest)))
                .andExpect(status().is4xxClientError());
    }


    // ============================================================================
    // VAC CONTROLLER TESTS
    // ============================================================================

    @Test
    @DisplayName("POST /vac/update-field - Update VAC field value")
    public void testUpdateVacField() throws Exception {
        mockMvc.perform(post("/api/vac/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .param("fieldNo", "1")
                .param("subField", "1")
                .param("value", "2")
                .param("userId", "USER0001")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("POST /vac/update-field - Update multiple VAC field dimensions")
    public void testUpdateMultipleVacFields() throws Exception {
        // Test updated axle/wheel field
        mockMvc.perform(post("/api/vac/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .param("fieldNo", "1")
                .param("subField", "1")
                .param("value", "2")
                .param("userId", "USER0001"))
                .andExpect(status().isOk());

        // Test wheelbase field
        mockMvc.perform(post("/api/vac/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .param("fieldNo", "3")
                .param("subField", "1")
                .param("value", "3110")
                .param("userId", "USER0001"))
                .andExpect(status().isOk());

        // Test length field
        mockMvc.perform(post("/api/vac/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .param("fieldNo", "5")
                .param("subField", "1")
                .param("value", "4950")
                .param("userId", "USER0001"))
                .andExpect(status().isOk());
    }


    // ============================================================================
    // COC CONTROLLER TESTS
    // ============================================================================

    @Test
    @DisplayName("POST /coc/update-field - Update COC field for Germany")
    public void testUpdateCocFieldDE() throws Exception {
        mockMvc.perform(post("/api/coc/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("manf", "B")
                .param("fieldNo", "1")
                .param("subField", "1")
                .param("country", "DE")
                .param("value", "Yes")
                .param("userId", "USER0001")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("POST /coc/update-field - Update COC field for France")
    public void testUpdateCocFieldFR() throws Exception {
        mockMvc.perform(post("/api/coc/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("manf", "B")
                .param("fieldNo", "4")
                .param("subField", "1")
                .param("country", "FR")
                .param("value", "98g/km")
                .param("userId", "USER0001")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("POST /coc/update-field - Update CO2 emissions COC field")
    public void testUpdateCocCO2Field() throws Exception {
        mockMvc.perform(post("/api/coc/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("manf", "B")
                .param("fieldNo", "4")
                .param("subField", "1")
                .param("country", "IT")
                .param("value", "97g/km")
                .param("userId", "USER0001")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }


    // ============================================================================
    // ERROR HANDLING TESTS
    // ============================================================================

    @Test
    @DisplayName("Variant lookup with invalid date format returns 400")
    public void testVariantLookupInvalidDateFormat() throws Exception {
        mockMvc.perform(get("/api/variants/lookup")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "invalid-date")
                .param("endDate", "2025-12-31")
                .param("variant", "BASE00")
                .param("manf", "B")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @DisplayName("Update variant with missing required fields returns 400")
    public void testUpdateVariantMissingFields() throws Exception {
        VariantRequest invalidRequest = new VariantRequest();
        invalidRequest.setVarModel("B");
        // Missing other required fields

        mockMvc.perform(put("/api/variants/B/7A10/2024-01-01/2025-12-31/BASE00/B")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @DisplayName("COC field update with invalid country returns 400")
    public void testUpdateCocFieldInvalidCountry() throws Exception {
        mockMvc.perform(post("/api/coc/update-field")
                .param("model", "B")
                .param("type", "7A10")
                .param("startDate", "2024-01-01")
                .param("endDate", "2025-12-31")
                .param("manf", "B")
                .param("fieldNo", "1")
                .param("subField", "1")
                .param("country", "XX") // Invalid country code
                .param("value", "Yes")
                .param("userId", "USER0001")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
}
