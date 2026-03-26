# Database Schema Documentation

## Overview

The WVTA CoC (Worldwide Vehicle Type Approval - Certificate of Conformity) system manages automotive vehicle types, variants, and their regulatory compliance data across multiple countries.

---

## Database Tables

### 1. HAT_TYP_TYPE - Vehicle Type Master Data

**Purpose**: Stores vehicle type approvals and their metadata

**Primary Key**: `(typ_model, typ_type, typ_start_date, typ_manf)`

#### Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `typ_model` | VARCHAR(10) | Manufacturer code | 'B' (BMW), 'M' (Mercedes), 'A' (Audi), 'P' (Porsche) |
| `typ_type` | VARCHAR(10) | Vehicle type code | '7A10', 'S500', 'A8L1' |
| `typ_start_date` | DATE | Approval start date | 2024-01-01 |
| `typ_end_date` | DATE | Approval end date | 2025-12-31 |
| `typ_manf` | VARCHAR(10) | Manufacturer identifier | Same as typ_model |
| `typ_description` | VARCHAR(100) | Full vehicle description | 'BMW 7 Series Sedan' |
| `typ_approval_no` | VARCHAR(30) | EU approval number | 'EU2024/001234/DE' |
| `typ_appr_date` | DATE | Approval date | 2024-01-15 |
| `typ_category` | VARCHAR(10) | Vehicle category | 'LC' (Light Commercial), 'M2' (Motorcycle) |
| `typ_userid` | VARCHAR(20) | User who created record | 'ADMIN001' |
| `typ_timestamp` | TIMESTAMP | Record creation timestamp | NOW() |
| `typ_appr_type_ind` | VARCHAR(2) | Approval type indicator | 'A' (Approval) |
| `typ_small_series` | VARCHAR(2) | Small series indicator | 'Y' (Yes), 'N' (No) |

#### Sample Data

```sql
('B', '7A10', '2024-01-01', '2025-12-31', 'B', 
 'BMW 7 Series Sedan', 'EU2024/001234/DE', '2024-01-15', 'LC', 
 'ADMIN001', NOW(), 'A', 'N')
```

---

### 2. HAT_VAR_VARIANT - Vehicle Variant Details

**Purpose**: Stores specific variant configurations with engine and technical specifications

**Primary Key**: `(var_model, var_type, var_start_date, var_end_date, var_variant, var_manf)`

#### Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `var_model` | VARCHAR(10) | Manufacturer code | 'B', 'M', 'A' |
| `var_type` | VARCHAR(10) | Vehicle type code | '7A10', 'S500' |
| `var_start_date` | DATE | Variant validity start | 2024-01-01 |
| `var_end_date` | DATE | Variant validity end | 2025-12-31 |
| `var_variant` | VARCHAR(20) | Variant identifier | 'BASE00', 'AUTO', 'HYBRID', 'PHEV' |
| `var_manf` | VARCHAR(10) | Manufacturer identifier | 'B', 'M', 'A' |
| `var_engine` | VARCHAR(30) | Engine code/description | 'N57D30OL1', 'B58B30UL+eDrive' |
| `var_axles_coc_val` | VARCHAR(50) | Axles configuration | '2A1,2,RWD,1' |
| `var_userid` | VARCHAR(20) | User who created record | 'USER0001' |
| `var_timestamp` | TIMESTAMP | Record creation timestamp | NOW() |
| `var_coc_max_power` | VARCHAR(20) | Maximum engine power | '340 kW' |
| `var_coc_fuel` | VARCHAR(20) | Fuel type | 'DIESEL', 'PETROL', 'HYBRID' |
| `var_coc_cap` | VARCHAR(10) | Engine displacement in cc | '3498', '2993' |
| `var_coc_no_arr_cyl` | VARCHAR(2) | Number of cylinders | '6', '8' |
| `var_coc_direct_inj` | VARCHAR(10) | Direct injection indicator | 'YES', 'NO' |
| `var_coc_wrk_prin` | VARCHAR(50) | Working principle | 'Four-stroke Otto cycle' |
| `var_coc_eng_code` | VARCHAR(20) | Engine code for classification | 'N529RD', 'B58030' |
| `var_coc_eng_man` | VARCHAR(30) | Engine manufacturer | 'BMW AG', 'Daimler AG' |
| `var_coc_annex` | VARCHAR(20) | EU annex type | 'I' (Basic), 'VI' (Hybrid/Electric) |
| `var_chip_data` | VARCHAR(2) | Chip data availability | 'Y', 'N' |
| `var_gen_tyr_list` | VARCHAR(2) | Tire list generated | 'Y', 'N' |
| `var_newmod_actmas_ind` | VARCHAR(2) | New model active mass ind. | 'Y', 'N' |

#### Sample Data

```sql
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B',
 'N57D30OL1', '2A1,2,RWD,1', 'USER0001', NOW(),
 '340 kW', 'DIESEL', '3498', '6',
 'YES', 'Four-stroke Otto cycle', 'N529RD', 'BMW AG', 'I', 'Y', 'Y', 'N')
```

---

### 3. HAT_VAC_VARIANT - Variant Attributes Components (VAC Fields)

**Purpose**: Stores vehicle attribute measurements and specifications for variants

**Primary Key**: `(vac_model, vac_type, vac_start_date, vac_end_date, vac_variant, vac_manf, vac_field_no, vac_sub_field)`

#### Field Numbers Reference

| Field No | Description | Type | Sub-fields | Examples |
|----------|-------------|------|-----------|----------|
| '1' | Axles/Wheels Configuration | String | 1=Config, 2=Quantity | '2A1', '2C1', '2E1' |
| '3' | Wheelbase | Numeric | 1=Primary | '3110', '3165', '3150' |
| '4' | Vehicle Width | Numeric | 1=Primary | '1900', '1945', '1910' |
| '5' | Vehicle Length | Numeric | 1=Overall, 2=Cargo | '4950', '5090', '5180' |
| '6' | Rear Overhang | Numeric | 1=Primary | '945', '975', '1010' |
| '7' | Track Width | Numeric | 1=Primary | '1620', '1640', '1695' |
| '8' | Type of Body | String | 1=Primary | '0650' (Sedan) |
| '30' | Class of Vehicle | String | 1=Primary | 'LV' (Light Vehicle) |
| '30.1' | Classification Category | String | 1=Primary | 'M1' (Passenger Car) |
| '31' | Number of Doors | Numeric | 1=Primary | '4', '2' |
| '38' | Tire Specification | String | 1=Primary | '255/40R19', '245/45R18' |

#### Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `vac_model` | VARCHAR(10) | Manufacturer code | 'B', 'M', 'A' |
| `vac_type` | VARCHAR(10) | Vehicle type code | '7A10', 'S500' |
| `vac_start_date` | DATE | Attribute validity start | 2024-01-01 |
| `vac_end_date` | DATE | Attribute validity end | 2025-12-31 |
| `vac_variant` | VARCHAR(20) | Variant identifier | 'BASE00', 'HYBRID' |
| `vac_manf` | VARCHAR(10) | Manufacturer identifier | 'B', 'M', 'A' |
| `vac_field_no` | VARCHAR(10) | Field number/category | '1', '3', '5', '30.1' |
| `vac_sub_field` | VARCHAR(5) | Sub-field within category | '1', '2', '3', '4' |
| `vac_value` | VARCHAR(50) | Measured/specified value | '2A1', '3110', '255/40R19' |
| `vac_userid` | VARCHAR(20) | User who created record | 'USER0001' |
| `vac_timestamp` | TIMESTAMP | Record creation timestamp | NOW() |

#### Sample Data

```sql
-- Axles/Wheels Configuration
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '1', '2A1', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '1', '2', '4', 'USER0001', NOW()),

-- Wheelbase (3110 mm)
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '3', '1', '3110', 'USER0001', NOW()),

-- Width (1900 mm)
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '4', '1', '1900', 'USER0001', NOW()),

-- Length Overall (4950 mm) and Cargo Length (5100 mm)
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '1', '4950', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '5', '2', '5100', 'USER0001', NOW()),

-- Tire Specification
('B', '7A10', '2024-01-01', '2025-12-31', 'BASE00', 'B', '38', '1', '255/40R19', 'USER0001', NOW()),
```

---

### 4. HAT_COC_TYPE - Certificate of Conformity Data by Country

**Purpose**: Stores CoC requirements and approvals per country and vehicle variant

**Primary Key**: `(coc_model, coc_type, coc_start_date, coc_end_date, coc_manf, coc_field_no, coc_sub_field, coc_country)`

#### CoC Field Numbers Reference

| Field No | Description | Example Values | Notes |
|----------|-------------|-----------------|-------|
| '1' | Approval for this model | 'Yes', 'No' | Base approval status |
| '2' | Approval with amendments | 'Yes', 'No' | Modified approval indication |
| '3' | Emissions compliant | 'Yes', 'No' | Regulatory compliance |
| '4' | CO2 emissions | '95g/km', '0g/km' (EV) | Varies by drivetrain |

#### Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `coc_model` | VARCHAR(10) | Manufacturer code | 'B', 'M', 'A' |
| `coc_type` | VARCHAR(10) | Vehicle type code | '7A10', 'S500' |
| `coc_start_date` | DATE | CoC validity start | 2024-01-01 |
| `coc_end_date` | DATE | CoC validity end | 2025-12-31 |
| `coc_manf` | VARCHAR(10) | Manufacturer identifier | 'B', 'M', 'A' |
| `coc_field_no` | VARCHAR(10) | CoC field number | '1', '2', '3', '4' |
| `coc_sub_field` | VARCHAR(5) | Sub-field within category | '1' (usually) |
| `coc_country` | VARCHAR(2) | ISO country code | 'DE', 'FR', 'IT', 'ES', 'NL', 'BE' |
| `coc_value` | VARCHAR(100) | CoC requirement/value | 'Yes', 'No', '95g/km' |
| `coc_userid` | VARCHAR(20) | User who created record | 'USER0001' |
| `coc_timestamp` | TIMESTAMP | Record creation timestamp | NOW() |

#### Sample Data

```sql
-- BMW 7 Series Diesel - Germany
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '1', '1', 'DE', 'Yes', 'USER0001', NOW()),
('B', '7A10', '2024-01-01', '2025-12-31', 'B', '4', '1', 'DE', '92g/km', 'USER0001', NOW()),

-- Mercedes S500 Hybrid - France (Zero emissions)
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '1', '1', 'FR', 'Yes', 'USER0006', NOW()),
('M', 'S500', '2024-01-01', '2025-12-31', 'M', '4', '1', 'FR', '0g/km', 'USER0006', NOW()),
```

---

## Supported Manufacturers

| Code | Manufacturer | Example Types |
|------|--------------|----------------|
| B | BMW | 7A10, 7A20, 7A30 |
| M | Mercedes-Benz | S350, S500 |
| A | Audi | A8L1, A8L2 |
| P | Porsche | 9111 |

---

## Typical Vehicle Configurations

### Drivetrain Types (from vac_field_no='1', vac_sub_field='1')
- **2A1/2D1** - RWD (Rear-Wheel Drive), one driving axle
- **2B1** - RWD with dual rear axles
- **2C1/2E1/2G1** - AWD (All-Wheel Drive), two driving axles
- **2H1** - AWD with specific characteristics

### Emission Standards
- **Gasoline engines**: Typically 90-150 g/km
- **Diesel engines**: Typically 65-95 g/km
- **Hybrid/PHEV**: Typically 45-75 g/km
- **Full Electric (BEV)**: 0 g/km

---

## Data Integrity Rules

### Relationships
1. Every `HAT_VAR_VARIANT` record must have a corresponding `HAT_TYP_TYPE`
2. Every `HAT_VAC_VARIANT` record should relate to a `HAT_VAR_VARIANT`
3. Every `HAT_COC_TYPE` record should relate to a `HAT_VAR_VARIANT`

### Date Constraints
- `start_date` must be ≤ `end_date`
- Validity periods typically span 1-2 years (renewal cycles)
- Multiple periods can exist for the same vehicle type (representing model years)

### Geographic Coverage
- EU countries primarily covered (DE, FR, IT, ES, NL, BE, etc.)
- Can be extended for other regions

---

## Query Examples

### Find all variants for a manufacturer
```sql
SELECT * FROM hat_var_variant 
WHERE var_model = 'B' 
AND CURDATE() BETWEEN var_start_date AND var_end_date;
```

### Get vehicle dimensions for a variant
```sql
SELECT vac_field_no, vac_value 
FROM hat_vac_variant 
WHERE vac_variant = 'BASE00' 
AND vac_field_no IN ('3', '4', '5')
ORDER BY vac_field_no;
```

### Check CoC approval status by country
```sql
SELECT coc_country, coc_value 
FROM hat_coc_type 
WHERE coc_model = 'B' 
AND coc_type = '7A10' 
AND coc_field_no = '1';
```

### Compare emissions across countries
```sql
SELECT coc_country, coc_value 
FROM hat_coc_type 
WHERE coc_field_no = '4'  -- CO2 emissions
ORDER BY coc_country;
```

---

## Performance Notes

- Primary keys with 4+ columns are common to capture full variant scope
- Indexes recommended on: model, type, start_date, variant
- Partitioning by year recommended for large datasets
- Historical data retention: Consider archiving records older than 3-5 years

---

## Related Files

- [SAMPLE_DATA.sql](/workspaces/migration-taska-arohi/SAMPLE_DATA.sql) - Sample data for all tables
- [MIGRATION_GUIDE.md](/workspaces/migration-taska-arohi/MIGRATION_GUIDE.md) - Database migration scripts
- [V1__init.sql](/workspaces/migration-taska-arohi/backend/src/main/resources/db/migration/V1__init.sql) - Schema definition

