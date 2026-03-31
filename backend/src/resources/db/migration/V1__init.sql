-- V1__init.sql - Initial database schema for WVTA CoC system

CREATE TABLE IF NOT EXISTS hat_typ_type (
    typ_model CHAR(1) NOT NULL,
    typ_type CHAR(4) NOT NULL,
    typ_start_date DATE NOT NULL,
    typ_end_date DATE NOT NULL,
    typ_manf CHAR(1) NOT NULL,
    typ_description VARCHAR(28),
    typ_approval_no VARCHAR(25),
    typ_appr_date DATE,
    typ_category CHAR(2),
    typ_userid CHAR(8),
    typ_timestamp TIMESTAMP,
    typ_appr_type_ind CHAR(1),
    typ_small_series CHAR(1),
    PRIMARY KEY (typ_model, typ_type, typ_start_date, typ_end_date, typ_manf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hat_var_variant (
    var_model CHAR(1) NOT NULL,
    var_type CHAR(4) NOT NULL,
    var_start_date DATE NOT NULL,
    var_end_date DATE NOT NULL,
    var_variant CHAR(6) NOT NULL,
    var_manf CHAR(1) NOT NULL,
    var_engine VARCHAR(12),
    var_axles_coc_val VARCHAR(75),
    var_userid CHAR(8),
    var_timestamp TIMESTAMP,
    var_coc_max_power VARCHAR(15),
    var_coc_fuel VARCHAR(15),
    var_coc_cap CHAR(6),
    var_coc_no_arr_cyl VARCHAR(12),
    var_coc_direct_inj CHAR(4),
    var_coc_wrk_prin VARCHAR(50),
    var_coc_eng_code VARCHAR(15),
    var_coc_eng_man VARCHAR(25),
    var_coc_annex VARCHAR(25),
    var_chip_data CHAR(1),
    var_gen_tyr_list CHAR(1),
    var_newmod_actmas_ind CHAR(1),
    PRIMARY KEY (var_model, var_type, var_start_date, var_end_date, var_variant, var_manf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hat_vac_variant (
    vac_model CHAR(1) NOT NULL,
    vac_type CHAR(4) NOT NULL,
    vac_start_date DATE NOT NULL,
    vac_end_date DATE NOT NULL,
    vac_variant CHAR(6) NOT NULL,
    vac_manf CHAR(1) NOT NULL,
    vac_field_no VARCHAR(5) NOT NULL,
    vac_sub_field CHAR(3) NOT NULL,
    vac_value VARCHAR(75),
    vac_userid CHAR(8),
    vac_timestamp TIMESTAMP,
    PRIMARY KEY (vac_model, vac_type, vac_start_date, vac_end_date, vac_variant, vac_manf, vac_field_no, vac_sub_field)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hat_coc_type (
    coc_model CHAR(1) NOT NULL,
    coc_type CHAR(4) NOT NULL,
    coc_start_date DATE NOT NULL,
    coc_end_date DATE NOT NULL,
    coc_manf CHAR(1) NOT NULL,
    coc_field_no VARCHAR(5) NOT NULL,
    coc_sub_field CHAR(3) NOT NULL,
    coc_country CHAR(2) NOT NULL,
    coc_value VARCHAR(75),
    coc_userid CHAR(8),
    coc_timestamp TIMESTAMP,
    PRIMARY KEY (coc_model, coc_type, coc_start_date, coc_end_date, coc_manf, coc_field_no, coc_sub_field, coc_country)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS hat_tl1_telonhld (
    tl1_userid CHAR(8) NOT NULL,
    tl1_type CHAR(1) NOT NULL,
    tl1_level SMALLINT NOT NULL,
    tl1_pgm_id CHAR(4),
    tl1_data LONGTEXT,
    PRIMARY KEY (tl1_userid, tl1_type, tl1_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    before_data LONGTEXT,
    after_data LONGTEXT,
    user_id CHAR(8),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_table_name (table_name),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
