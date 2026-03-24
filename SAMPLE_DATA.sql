-- SAMPLE DATABASE DATA FOR WVTA CoC SYSTEM
-- Real-looking automotive data for testing

-- ============================================================================
-- HAT_TYP_TYPE - Vehicle Type Master Data
-- ============================================================================
INSERT INTO hat_typ_type (typ_model, typ_type, typ_start_date, typ_end_date, typ_manf, 
                          typ_description, typ_approval_no, typ_appr_date, typ_category, 
                          typ_userid, typ_timestamp, typ_appr_type_ind, typ_small_series) VALUES

-- BMW 7 Series Type Variants
('B', '7A10', '2024-01-01', '2025-12-31', 'B', 
 'BMW 7 Series Sedan                 ', 'EU2024/001234/DE    ', '2024-01-15', 'LC', 
 'ADMIN001', NOW(), 'A', 'N'),

('B', '7A20', '2024-01-01', '2025-12-31', 'B',
 'BMW 7 Series Long Wheelbase        ', 'EU2024/001235/DE    ', '2024-01-16', 'LC',
 'ADMIN001', NOW(), 'A', 'N'),

('B', '7A30', '2024-01-01', '2025-12-31', 'B',
 'BMW 7 Series iPerformance         ', 'EU2024/001236/DE    ', '2024-01-17', 'LC',
 'ADMIN001', NOW(), 'A', 'N'),

-- Mercedes S-Class Variants
('M', 'S350', '2024-01-01', '2025-12-31', 'M',
 'Mercedes-Benz S350d                ', 'EU2024/001500/DE    ', '2024-02-01', 'LC',
 'ADMIN002', NOW(), 'A', 'N'),

('M', 'S500', '2024-01-01', '2025-12-31', 'M',
 'Mercedes-Benz S500e                ', 'EU2024/001501/DE    ', '2024-02-02', 'LC',
 'ADMIN002', NOW(), 'A', 'N'),

-- Audi A8 Variants
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A',
 'Audi A8L 55 TFSI                   ', 'EU2024/002000/DE    ', '2024-03-01', 'LC',
 'ADMIN003', NOW(), 'A', 'N'),

('A', 'A8L2', '2024-01-01', '2025-12-31', 'A',
 'Audi A8L 60 TFSI e                 ', 'EU2024/002001/DE    ', '2024-03-02', 'LC',
 'ADMIN003', NOW(), 'A', 'N'),

-- Porsche 911 (Small Series)
('P', '9111', '2024-01-01', '2025-12-31', 'P',
 'Porsche 911 Carrera 4S             ', 'EU2024/003000/DE    ', '2024-04-01', 'M2',
 'ADMIN004', NOW(), 'A', 'Y');


-- ============================================================================
-- HAT_VAR_VARIANT - Vehicle Variant Details
-- ============================================================================
INSERT INTO hat_var_variant (var_model, var_type, var_start_date, var_end_date, 
                             var_variant, var_manf, var_engine, var_axles_coc_val, var_userid, 
                             var_timestamp, var_coc_max_power, var_coc_fuel, var_coc_cap,
                             var_coc_no_arr_cyl, var_coc_direct_inj, var_coc_wrk_prin,
                             var_coc_eng_code, var_coc_eng_man, var_coc_annex, var_chip_data,
                             var_gen_tyr_list, var_newmod_actmas_ind) VALUES

-- BMW 7A10 Sedan Base
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B',
 'N57D30OL1           ', '2,2,RWD,1                ', 'USER0001', NOW(),
 '340 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),

('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B',
 'N57D30UL            ', '2,2,RWD,1                ', 'USER0002', NOW(),
 '350 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),

-- BMW 7A20 Long Wheelbase
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B',
 'N57D30OL1           ', '2,2,RWD,1                ', 'USER0003', NOW(),
 '340 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),

-- BMW 7A30 iPerformance
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B',
 'B58B30UL+eDrive      ', '2,2,AWD,1                ', 'USER0004', NOW(),
 '385 kW              ', 'HYBRID  ', '2993', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'B58030', 'BMW AG                   ',
 'VI              ', 'Y', 'Y', 'Y'),

-- Mercedes S350
('M', 'S350', '2024-01-01', '2025-12-31', 'BASE00', 'M',
 'OM656 V6             ', '2,2,RWD,1                ', 'USER0005', NOW(),
 '286 kW              ', 'DIESEL  ', '2993', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'OM656040', 'Daimler AG               ',
 'I               ', 'Y', 'Y', 'N'),

-- Mercedes S500e
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M',
 'M176+E-Machine       ', '2,2,AWD,2                ', 'USER0006', NOW(),
 '405 kW              ', 'HYBRID  ', '3498', '8',
 'YES ', 'Four-stroke Otto cycle          ', 'M176940', 'Daimler AG               ',
 'VI              ', 'Y', 'Y', 'Y'),

-- Audi A8L 55 TFSI
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A',
 'DAYX V8              ', '2,2,AWD,1                ', 'USER0007', NOW(),
 '340 kW              ', 'PETROL  ', '3996', '8',
 'YES ', 'Four-stroke Otto cycle          ', 'DAX', 'Volkswagen AG            ',
 'I               ', 'Y', 'Y', 'N'),

-- Audi A8L 60 TFSI e
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A',
 '3.0L TDI+E-Machine   ', '2,2,AWD,1                ', 'USER0008', NOW(),
 '373 kW              ', 'HYBRID  ', '2995', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'CQE', 'Volkswagen AG            ',
 'VI              ', 'Y', 'Y', 'Y'),

-- Porsche 911 Carrera 4S
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P',
 'MA1 Engine           ', '2,2,AWD,1                ', 'USER0009', NOW(),
 '331 kW              ', 'PETROL  ', '2981', '6',
 'YES ', 'Flat-six boxer           ', '9A1', 'Porsche AG               ',
 'IV              ', 'Y', 'Y', 'N');


-- ============================================================================
-- HAT_VAC_VARIANT - Variant Attributes Components (VAC Fields)
-- ============================================================================
INSERT INTO hat_vac_variant (vac_model, vac_type, vac_start_date, vac_end_date,
                             vac_variant, vac_manf, vac_field_no, vac_sub_field, 
                             vac_value, vac_userid, vac_timestamp) VALUES

-- BMW 7A10 BASE00 VAC Data
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '1', '2', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '2', '22', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '3', '1', '3110', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '4', '1', '3200', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '1', '4950', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '2', '5200', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '6', '1', '1945', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '7', '1', '1470', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '8', '1', '650', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30', '1', 'LV', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30.1', '1', 'M1', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '31', '1', '4', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '38', '1', '225/50R18', 'USER0001', NOW()),

-- BMW 7A30 HYBRID VAC Data
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '1', '1', '2', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '1', '2', '22', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '3', '1', '3200', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '4', '1', '3300', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '5', '1', '5090', 'USER0004', NOW()),

-- Mercedes S500e VAC Data
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '1', '1', '2', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '1', '2', '22', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '3', '1', '3210', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '4', '1', '3300', 'USER0006', NOW()),

-- Audi A8L2 PHEV VAC Data
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '1', '1', '2', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '1', '2', '22', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '3', '1', '3150', 'USER0008', NOW());


-- ============================================================================
-- HAT_COC_TYPE - Certificate of Conformity Data by Country
-- ============================================================================
INSERT INTO hat_coc_type (coc_model, coc_type, coc_start_date, coc_end_date,
                          coc_manf, coc_field_no, coc_sub_field, coc_country,
                          coc_value, coc_userid, coc_timestamp) VALUES

-- BMW 7A10 BASE00 CoC for Germany (DE)
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'DE', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '2', '1', 'DE', 'No', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '3', '1', 'DE', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'DE', '95g/km', 'USER0001', NOW()),

-- BMW 7A10 BASE00 CoC for France (FR)
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'FR', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '2', '1', 'FR', 'No', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '3', '1', 'FR', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'FR', '98g/km', 'USER0001', NOW()),

-- BMW 7A10 BASE00 CoC for Italy (IT)
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'IT', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '2', '1', 'IT', 'No', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '3', '1', 'IT', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'IT', '97g/km', 'USER0001', NOW()),

-- BMW 7A30 HYBRID CoC for Germany (DE)
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '1', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '2', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '3', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '4', '1', 'DE', '75g/km', 'USER0004', NOW()),

-- Mercedes S500e CoC for Germany (DE)
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '1', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '2', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '3', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '4', '1', 'DE', '72g/km', 'USER0006', NOW()),

-- Audi A8L1 CoC for Germany (DE)
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '1', '1', 'DE', 'Yes', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '2', '1', 'DE', 'No', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '3', '1', 'DE', 'Yes', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '4', '1', 'DE', '145g/km', 'USER0007', NOW()),

-- Audi A8L2 PHEV CoC for Germany (DE)
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '1', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '2', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '3', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '4', '1', 'DE', '65g/km', 'USER0008', NOW());
