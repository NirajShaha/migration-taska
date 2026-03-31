-- Flyway migration for adding refresh tokens table
-- Version: 2
-- Description: Create refresh_tokens table for JWT token management

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id VARCHAR(36) PRIMARY KEY,
    token LONGTEXT NOT NULL UNIQUE,
    user_id VARCHAR(36) NOT NULL,
    expiry_date DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    revoked_at DATETIME,
    created_by VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user_entity(id) ON DELETE CASCADE,
    INDEX idx_token (token(100)),
    INDEX idx_user_id (user_id),
    INDEX idx_expiry_date (expiry_date)
);
