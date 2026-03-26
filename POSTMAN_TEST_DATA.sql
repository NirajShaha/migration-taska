-- Sample Test Data for WVTA CoC Management System
-- Import into automotive_db after running V1__init.sql migrations
-- MySQL syntax compatible with version 8.0+

-- ============================================================================
-- Sample Type Data (HAT_TYP_TYPE)
-- ============================================================================

INSERT INTO hat_typ_type (
  typ_model, typ_type, typ_start_date, typ_end_date, typ_manf,
  typ_description, typ_approval_no, typ_appr_date, typ_category,
  typ_userid, typ_timestamp, typ_appr_type_ind, typ_small_series
) VALUES
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'Sedan Type A', 'EU2024/001', '2024-03-15', 'M1',
 'USER001', NOW(), 'N', 'Y'),

('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'SUV Type B', 'EU2024/002', '2024-03-20', 'M1',
 'USER001', NOW(), 'N', 'N'),

('C', 'VAN1', '2023-06-01', '2025-12-31', 'T',
 'Van Type C', 'EU2023/567', '2023-09-10', 'M3',
 'USER002', NOW(), 'Y', 'N');

-- ============================================================================
-- Sample Variant Data (HAT_VAR_VARIANT)
-- ============================================================================

INSERT INTO hat_var_variant (
  var_model, var_type, var_start_date, var_end_date, var_variant, var_manf,
  var_engine, var_axles_coc_val, var_userid, var_timestamp,
  var_coc_max_power, var_coc_fuel, var_coc_cap, var_coc_no_arr_cyl,
  var_coc_direct_inj, var_coc_wrk_prin, var_coc_eng_code, var_coc_eng_man,
  var_coc_annex, var_chip_data, var_gen_tyr_list, var_newmod_actmas_ind
) VALUES
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '2.0L-DIESEL', '2,LongitudinalALL,Mechanical', 'USER001', NOW(),
 '180', 'Diesel', '2200', '4',
 'N', 'Otto', 'TDI2024', 'Volkswagen',
 'EU2023-670', 'N', 'Y', 'Y'),

('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR002', 'M',
 '1.8L-PETROL', '2,LongitudinalALL,Mechanical', 'USER001', NOW(),
 '150', 'Petrol', '1800', '4',
 'Y', 'Otto', 'TSI2024', 'Volkswagen',
 'EU2023-670', 'N', 'Y', 'N'),

('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '3.0L-DIESEL', '4,LongitudinalALL,Electronic', 'USER002', NOW(),
 '250', 'Diesel', '3500', '6',
 'N', 'Otto', 'TDI3.0', 'Audi',
 'EU2023-700', 'N', 'Y', 'Y'),

('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '2.5L-DIESEL', '2,LongitudinalFront,Mechanical', 'USER002', NOW(),
 '190', 'Diesel', '2700', '4',
 'N', 'Otto', 'TDI2.5', 'Transporter',
 'EU2023-600', 'N', 'Y', 'N');

-- ============================================================================
-- Sample VAC Variant Data (HAT_VAC_VARIANT)
-- Contains field-specific values for vehicle characteristics/CoC
-- ============================================================================

INSERT INTO hat_vac_variant (
  vac_model, vac_type, vac_start_date, vac_end_date, vac_variant, vac_manf,
  vac_field_no, vac_sub_field, vac_value, vac_userid, vac_timestamp
) VALUES
-- Variant A, ABC1, VAR001 - Dimensions and configuration
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '1', '1', '2A1', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '3', '1', '2850', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '4', '1', '1540', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '5', '1', '4800', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '5', '2', '5150', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '6', '1', '1900', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '7', '1', '1650', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '8', '1', '820', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '30', '1', 'Sedan', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '30.1', '1', 'I', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'VAR001', 'M',
 '31', '1', '4', 'USER001', NOW()),

-- Variant B, SUV1, SUV01 - Dimensions and configuration
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '1', '1', '4B2', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '3', '1', '3100', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '5', '1', '5200', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '6', '1', '2050', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '7', '1', '1800', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '30', '1', 'SUV', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'SUV01', 'M',
 '30.1', '1', 'II', 'USER002', NOW()),

-- Variant C, VAN1, VAN001 - Dimensions and configuration
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '1', '1', '2C1', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '3', '1', '2800', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '5', '1', '5500', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '6', '1', '2000', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '30', '1', 'Van', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'VAN001', 'T',
 '30.1', '1', 'A', 'USER002', NOW());

-- ============================================================================
-- Sample COC Type Data (HAT_COC_TYPE)
-- Country-specific CoC field values
-- ============================================================================

INSERT INTO hat_coc_type (
  coc_model, coc_type, coc_start_date, coc_end_date, coc_manf,
  coc_field_no, coc_sub_field, coc_country, coc_value,
  coc_userid, coc_timestamp
) VALUES
-- Variant A, ABC1, VAR001 - Germany (DE)
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.1', '1', 'DE', '180', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.2', '1', 'DE', 'Diesel', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.3', '1', 'DE', 'TDI2024', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.4', '1', 'DE', 'VW-TDI-2024', 'USER001', NOW()),

-- Variant A, ABC1, VAR001 - France (FR)
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.1', '1', 'FR', '180', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.2', '1', 'FR', 'Diesel', 'USER001', NOW()),
('A', 'ABC1', '2024-01-01', '2025-12-31', 'M',
 'P.3', '1', 'FR', 'TDI2024', 'USER001', NOW()),

-- Variant B, SUV1, SUV01 - Germany (DE)
('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'P.1', '1', 'DE', '250', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'P.2', '1', 'DE', 'Diesel', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'P.3', '1', 'DE', 'TDI3.0', 'USER002', NOW()),

-- Variant B, SUV1, SUV01 - Italy (IT)
('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'P.1', '1', 'IT', '250', 'USER002', NOW()),
('B', 'SUV1', '2024-01-01', '2025-12-31', 'M',
 'P.2', '1', 'IT', 'Diesel', 'USER002', NOW()),

-- Variant C, VAN1, VAN001 - Germany (DE)
('C', 'VAN1', '2023-06-01', '2025-12-31', 'T',
 'P.1', '1', 'DE', '190', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'T',
 'P.2', '1', 'DE', 'Diesel', 'USER002', NOW()),
('C', 'VAN1', '2023-06-01', '2025-12-31', 'T',
 'P.3', '1', 'DE', 'TDI2.5', 'USER002', NOW());

-- ============================================================================
-- Audit Log Sample Entries
-- ============================================================================

INSERT INTO audit_log (
  table_name, operation, before_data, after_data, user_id, timestamp
) VALUES
('hat_typ_type', 'INSERT', NULL, 
 '{"typModel":"A","typType":"ABC1","typApprovalNo":"EU2024/001"}',
 'USER001', NOW()),
 
('hat_var_variant', 'UPDATE', 
 '{"varEngine":"1.8L-PETROL","varCocMaxPower":"140"}',
 '{"varEngine":"1.8L-PETROL","varCocMaxPower":"150"}',
 'USER001', NOW()),
 
('hat_vac_variant', 'INSERT', NULL,
 '{"vacFieldNo":"3","vacSubField":"1","vacValue":"2850"}',
 'USER001', NOW()),
 
('hat_coc_type', 'INSERT', NULL,
 '{"cocFieldNo":"P.1","cocCountry":"DE","cocValue":"180"}',
 'USER001', NOW());

-- ============================================================================
-- Postman Test Data Reference
-- ============================================================================
-- Use these values when testing Postman collection:
--
-- Type Lookup:
--   model=A, type=ABC1, startDate=2024-01-01, endDate=2025-12-31, manf=M
--   model=B, type=SUV1, startDate=2024-01-01, endDate=2025-12-31, manf=M
--
-- Variant Lookup:
--   model=A, type=ABC1, startDate=2024-01-01, endDate=2025-12-31, variant=VAR001, manf=M
--   model=B, type=SUV1, startDate=2024-01-01, endDate=2025-12-31, variant=SUV01, manf=M
--
-- Update Type:
--   Use same composite key as above with approval number and date
--
-- Update Variant:
--   Use same composite key + variant as above
--
-- Update VAC Field:
--   For fieldNo=3 (Wheelbase), subField=1, value=2850
--   For fieldNo=5 (Length), subField=1, value=4800
--
-- Update COC Field:
--   For fieldNo=P.1 (Max Power), country=DE, value=180
--   For fieldNo=P.2 (Fuel Type), country=DE, value=Diesel
--
-- ============================================================================

COMMIT;
