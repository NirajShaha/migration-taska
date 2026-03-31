-- =========================================================================
-- SAMPLE DATABASE DATA FOR WVTA CoC SYSTEM - MySQL Version
-- Real-looking automotive data for testing with multiple manufacturers
-- =========================================================================

-- ============================================================================
-- HAT_TYP_TYPE - Vehicle Type Master Data
-- ============================================================================
INSERT INTO hat_typ_type (typ_model, typ_type, typ_start_date, typ_end_date, typ_manf, 
                          typ_description, typ_approval_no, typ_appr_date, typ_category, 
                          typ_userid, typ_timestamp, typ_appr_type_ind, typ_small_series,
                          typ_chip_data, typ_gen_tyr_list) VALUES
('B', '7A10', '2024-01-01', '2025-12-31', 'B', 
 'BMW 7 Series Sedan                 ', 'EU2024/001234/DE    ', '2024-01-15', 'LC', 
 'ADMIN001', NOW(), 'A', 'N', 'N', 'Y'),
('B', '7A20', '2024-01-01', '2025-12-31', 'B',
 'BMW 7 Series Long Wheelbase        ', 'EU2024/001235/DE    ', '2024-01-16', 'LC',
 'ADMIN001', NOW(), 'A', 'N', 'N', 'Y'),
('B', '7A30', '2024-01-01', '2025-12-31', 'B',
 'BMW 7 Series iPerformance         ', 'EU2024/001236/DE    ', '2024-01-17', 'LC',
 'ADMIN001', NOW(), 'A', 'N', 'N', 'Y'),
('M', 'S350', '2024-01-01', '2025-12-31', 'M',
 'Mercedes-Benz S350d                ', 'EU2024/001500/DE    ', '2024-02-01', 'LC',
 'ADMIN002', NOW(), 'A', 'N', 'Y', 'Y'),
('M', 'S500', '2024-01-01', '2025-12-31', 'M',
 'Mercedes-Benz S500                 ', 'EU2024/001501/DE    ', '2024-02-02', 'LC',
 'ADMIN002', NOW(), 'A', 'N', 'Y', 'Y'),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A',
 'Audi A8L 55 TFSI                   ', 'EU2024/002000/DE    ', '2024-03-01', 'LC',
 'ADMIN003', NOW(), 'A', 'N', 'N', 'Y'),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A',
 'Audi A8L 60 TFSI e                 ', 'EU2024/002001/DE    ', '2024-03-02', 'LC',
 'ADMIN003', NOW(), 'A', 'N', 'N', 'Y'),
('P', '9111', '2024-01-01', '2025-12-31', 'P',
 'Porsche 911 Carrera 4S             ', 'EU2024/003000/DE    ', '2024-04-01', 'M2',
 'ADMIN004', NOW(), 'A', 'Y', 'N', 'Y');

-- ============================================================================
-- HAT_VAR_VARIANT - Vehicle Variant Details with Engine & New Fields
-- ============================================================================
INSERT INTO hat_var_variant (var_model, var_type, var_start_date, var_end_date, 
                             var_variant, var_manf, var_engine, var_axles_coc_val, var_userid, 
                             var_timestamp, var_coc_max_power, var_coc_fuel, var_coc_cap,
                             var_coc_no_arr_cyl, var_coc_direct_inj, var_coc_wrk_prin,
                             var_coc_eng_code, var_coc_eng_man, var_coc_annex, var_chip_data,
                             var_gen_tyr_list, var_newmod_actmas_ind) VALUES
-- BMW 7A10 Variants
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B',
 'N57D30OL1           ', '2A1,2,RWD,1                ', 'USER0001', NOW(),
 '340 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B',
 'N57D30UL            ', '2B1,2,RWD,1                ', 'USER0002', NOW(),
 '350 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),
-- BMW 7A20 Variants
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B',
 'N57D30OL1           ', '2A2,2,RWD,1                ', 'USER0003', NOW(),
 '340 kW              ', 'DIESEL  ', '3498', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'N529RD', 'BMW AG                   ',
 'I               ', 'Y', 'Y', 'N'),
-- BMW 7A30 HYBRID Variants
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B',
 'B58B30UL+eDrive      ', '2C1,2,AWD,1                ', 'USER0004', NOW(),
 '385 kW              ', 'HYBRID  ', '2993', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'B58030', 'BMW AG                   ',
 'VI              ', 'Y', 'Y', 'Y'),
-- Mercedes S500 Variants
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M',
 'OM656 V6             ', '2D1,2,RWD,1                ', 'USER0005', NOW(),
 '286 kW              ', 'DIESEL  ', '2993', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'OM656040', 'Daimler AG               ',
 'I               ', 'Y', 'Y', 'N'),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M',
 'M176+E-Machine       ', '2E1,2,AWD,2                ', 'USER0006', NOW(),
 '405 kW              ', 'HYBRID  ', '3498', '8',
 'YES ', 'Four-stroke Otto cycle          ', 'M176940', 'Daimler AG               ',
 'VI              ', 'Y', 'Y', 'Y'),
-- Audi A8L1 Variants
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A',
 'DAYX V8              ', '2F1,2,AWD,1                ', 'USER0007', NOW(),
 '340 kW              ', 'PETROL  ', '3996', '8',
 'YES ', 'Four-stroke Otto cycle          ', 'DAX', 'Volkswagen AG            ',
 'I               ', 'Y', 'Y', 'N'),
-- Audi A8L2 PHEV Variants
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A',
 '3.0L TDI+E-Machine   ', '2G1,2,AWD,1                ', 'USER0008', NOW(),
 '373 kW              ', 'HYBRID  ', '2995', '6',
 'YES ', 'Four-stroke Otto cycle          ', 'CQE', 'Volkswagen AG            ',
 'VI              ', 'Y', 'Y', 'Y'),
-- Porsche 911 Variant
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P',
 'MA1 Engine           ', '2H1,2,AWD,1                ', 'USER0009', NOW(),
 '331 kW              ', 'PETROL  ', '2981', '6',
 'YES ', 'Flat-six boxer           ', '9A1', 'Porsche AG               ',
 'IV              ', 'Y', 'Y', 'N');

-- ============================================================================
-- HAT_VAC_VARIANT - Vehicle Dimensional Data (Comprehensive)
-- ============================================================================
-- BMW 7A10 BASE00 - Premium Sedan
INSERT INTO hat_vac_variant (vac_model, vac_type, vac_start_date, vac_end_date, vac_variant, vac_manf, vac_field_no, vac_sub_field, vac_value, vac_userid, vac_timestamp) VALUES
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '1', '2A1', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '2', '4', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '3', '1', '3110', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '4', '1', '1900', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '1', '4950', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '2', '5100', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '6', '1', '945', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '7', '1', '1620', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '8', '1', '0650', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30', '1', 'LV', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30.1', '1', 'M1', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '31', '1', '4', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '38', '1', '255/40R19', 'USER0001', NOW()),

-- BMW 7A10 SPORT1 - Sport Variant
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '1', '1', '2B1', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '1', '2', '4', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '3', '1', '3100', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '4', '1', '1900', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '5', '1', '4960', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '5', '2', '5110', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '6', '1', '940', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '7', '1', '1625', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '8', '1', '0650', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '30', '1', 'LV', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '30.1', '1', 'M1', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '31', '1', '4', 'USER0002', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'SPORT1', 'B', '38', '1', '255/35R20', 'USER0002', NOW()),

-- BMW 7A20 BASE00 - Long Wheelbase
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '1', '2A2', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '2', '4', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '3', '1', '3210', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '4', '1', '1900', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '1', '5050', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '2', '5200', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '6', '1', '945', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '7', '1', '1620', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '8', '1', '0650', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30', '1', 'LV', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '30.1', '1', 'M1', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '31', '1', '4', 'USER0003', NOW()),
('B', '7A20', '2024-01-01', '2025-12-31', 'BASE00', 'B', '38', '1', '255/40R19', 'USER0003', NOW()),

-- BMW 7A30 HYBRID - Electric Hybrid Version
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '1', '1', '2C1', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '1', '2', '4', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '3', '1', '3120', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '4', '1', '1920', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '5', '1', '5090', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '5', '2', '5200', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '6', '1', '975', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '7', '1', '1640', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '8', '1', '0650', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '30', '1', 'LV', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '30.1', '1', 'M1', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '31', '1', '4', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'HYBRID', 'B', '38', '1', '245/45R18', 'USER0004', NOW()),

-- Mercedes S500 GASO - Gasoline Diesel Version
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '1', '1', '2D1', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '1', '2', '4', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '3', '1', '3165', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '4', '1', '1945', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '5', '1', '5180', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '5', '2', '5300', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '6', '1', '1010', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '7', '1', '1695', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '8', '1', '0650', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '30', '1', 'LV', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '30.1', '1', 'M1', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '31', '1', '4', 'USER0005', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'GASO', 'M', '38', '1', '235/50R19', 'USER0005', NOW()),

-- Mercedes S500 EAMG - Electric AMG Version
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '1', '1', '2E1', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '1', '2', '4', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '3', '1', '3165', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '4', '1', '1945', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '5', '1', '5180', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '5', '2', '5300', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '6', '1', '1010', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '7', '1', '1695', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '8', '1', '0650', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '30', '1', 'LV', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '30.1', '1', 'M1', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '31', '1', '4', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'EAMG', 'M', '38', '1', '255/45R18', 'USER0006', NOW()),

-- Audi A8L1 BASE - Standard Sedan
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '1', '1', '2D1', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '1', '2', '4', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '3', '1', '3120', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '4', '1', '1910', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '5', '1', '5020', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '5', '2', '5150', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '6', '1', '955', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '7', '1', '1645', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '8', '1', '0650', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '30', '1', 'LV', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '30.1', '1', 'M1', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '31', '1', '4', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'BASE00', 'A', '38', '1', '245/50R18', 'USER0007', NOW()),

-- Audi A8L2 PHEV - Plug-in Hybrid
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '1', '1', '2G1', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '1', '2', '4', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '3', '1', '3150', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '4', '1', '1930', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '5', '1', '5070', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '5', '2', '5200', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '6', '1', '980', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '7', '1', '1665', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '8', '1', '0650', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '30', '1', 'LV', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '30.1', '1', 'M1', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '31', '1', '4', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'PHEV', 'A', '38', '1', '245/45R19', 'USER0008', NOW()),

-- Porsche 911 SPORT - Sports Car
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '1', '1', '2H1', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '1', '2', '2', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '3', '1', '2450', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '4', '1', '1855', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '5', '1', '4530', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '5', '2', '4680', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '6', '1', '890', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '7', '1', '1520', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '8', '1', '0620', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '30', '1', 'M2', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '30.1', '1', 'M2', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '31', '1', '2', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'SPORT', 'P', '38', '1', '245/35R20', 'USER0009', NOW());

-- ============================================================================
-- HAT_COC_TYPE - Certificate of Conformity Data (Emissions & HA003R Details)
-- ============================================================================
-- Standard CoC Fields (Emissions & Approval)
INSERT INTO hat_coc_type (coc_model, coc_type, coc_start_date, coc_end_date, coc_manf, coc_field_no, coc_sub_field, coc_country, coc_value, coc_userid, coc_timestamp) VALUES
-- BMW 7A10 BASE00 - All Countries Standard Fields
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'DE', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '2', '1', 'DE', 'No', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '3', '1', 'DE', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'DE', '92g/km', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'FR', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '2', '1', 'FR', 'No', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '3', '1', 'FR', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'FR', '95g/km', 'USER0001', NOW()),

-- BMW 7A30 HYBRID - Hybrid Fields
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '1', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '2', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '3', '1', 'DE', 'Yes', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '4', '1', 'DE', '65g/km', 'USER0004', NOW()),

-- Mercedes S500 - Electric Version
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '1', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '2', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '3', '1', 'DE', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '4', '1', 'DE', '0g/km', 'USER0006', NOW()),

-- Audi A8L1 - Standard Fields
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '1', '1', 'DE', 'Yes', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '2', '1', 'DE', 'No', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '3', '1', 'DE', 'Yes', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '4', '1', 'DE', '118g/km', 'USER0007', NOW()),

-- Audi A8L2 PHEV - Hybrid Fields
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '1', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '2', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '3', '1', 'DE', 'Yes', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '4', '1', 'DE', '48g/km', 'USER0008', NOW()),

-- Porsche 911 SPORT - High Performance
('P', '9111', '2024-01-01', '2025-12-31', 'P', '1', '1', 'DE', 'Yes', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '2', '1', 'DE', 'No', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '3', '1', 'DE', 'Yes', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '4', '1', 'DE', '210g/km', 'USER0009', NOW()),

-- ============ HA003R Screen Specific Fields (Certificate Details) ============
-- BMW 7A10 BASE00 - Certificate Details
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '01', '1', 'DE', 'VIN Plate: Dashboard left side, welded to the bodywork', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '02', '1', 'DE', 'Chassis ID: Engine bay right side, stamped on body', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '03', '1', 'DE', 'BMW 7 Series Sedan - Premium Executive Vehicle', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '04', '1', 'DE', 'EU Regulation 2017/1014 compliant. All emissions limits met. M1 classification.', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '05', '1', 'DE', 'Advanced climate control, adaptive suspension, intelligent cruise control. 8-speed auto transmission.', 'USER0001', NOW()),

-- BMW 7A30 HYBRID - Certificate Details
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '01', '1', 'DE', 'VIN Plate: Dashboard center, welded permanent attachment', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '02', '1', 'DE', 'Chassis ID: Engine compartment right interior panel', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '03', '1', 'DE', 'BMW 7 Series Hybrid iPerformance - Luxury Hybrid Sedan', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '04', '1', 'DE', 'Hybrid electric vehicle. EU WLTP cycle compliant. CO2 reduced significantly with electric integration.', 'USER0004', NOW()),
('B', '7A30', '2024-01-01', '2025-12-31', 'B', '05', '1', 'DE', 'Plug-in hybrid with 40+ km electric range. Integrated battery cooling. Optimized for all conditions.', 'USER0004', NOW()),

-- Mercedes S500 EAMG - Certificate Details
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '01', '1', 'DE', 'VIN: Dashboard upper left, laser engraved permanent', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '02', '1', 'DE', 'Identification: Longitudinal beam, stamped identification code', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '03', '1', 'DE', 'Mercedes-AMG S580e - High Performance Luxury Sedan', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '04', '1', 'DE', 'Euro 6 compliant. Plug-in hybrid meets all emissions standards. Premium AMG performance specs.', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '05', '1', 'DE', 'V8 engine with hybrid electric motor. All-wheel drive AMG suspension. 9-speed transmission.', 'USER0006', NOW()),

-- Audi A8L1 BASE - Certificate Details
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '01', '1', 'DE', 'Vehicle ID: Mounted on dashboard, riveted attachment method', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '02', '1', 'DE', 'Serial Number: Right side splash panel permanent marking', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '03', '1', 'DE', 'Audi A8L 55 TFSI - Premium Luxury Sedan with V8 Engine', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '04', '1', 'DE', 'Conforms to EU 2017/1014. All pollutant limits satisfied. M1 passenger vehicle category.', 'USER0007', NOW()),
('A', 'A8L1', '2024-01-01', '2025-12-31', 'A', '05', '1', 'DE', '4.0L TFSI V8 engine. Quattro all-wheel drive. Premium air suspension technology.', 'USER0007', NOW()),

-- Audi A8L2 PHEV - Certificate Details
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '01', '1', 'DE', 'VIN Position: Dashboard driver side, bonded location', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '02', '1', 'DE', 'Frame ID: Left door pillar, raised stamp marking', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '03', '1', 'DE', 'Audi A8L 60 TFSI e - Premium Plug-in Hybrid Luxury Sedan', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '04', '1', 'DE', 'PHEV compliant with EU 2019/631. CO2 reduction regulations met. Electric range certified.', 'USER0008', NOW()),
('A', 'A8L2', '2024-01-01', '2025-12-31', 'A', '05', '1', 'DE', '3.0L TDI V6 diesel with electric motor. 50+ km electric autonomy. Hybrid transmission system.', 'USER0008', NOW()),

-- Porsche 911 SPORT - Certificate Details
('P', '9111', '2024-01-01', '2025-12-31', 'P', '01', '1', 'DE', 'VIN: Left door threshold area, laser etched permanent', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '02', '1', 'DE', 'Serial: Right longitudinal member, stamped code location', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '03', '1', 'DE', 'Porsche 911 Carrera 4S - High Performance Sports Car', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '04', '1', 'DE', 'Euro 6d-ISC-FCM compliant. Performance specifications include track capability. M2 classification.', 'USER0009', NOW()),
('P', '9111', '2024-01-01', '2025-12-31', 'P', '05', '1', 'DE', '3.0L Flat-6 turbo engine. All-wheel drive with sports handling. Electronic dynamic suspension.', 'USER0009', NOW());
