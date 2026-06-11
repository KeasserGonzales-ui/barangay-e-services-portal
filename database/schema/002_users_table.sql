CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(150) NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'resident',
        'staff',
        'secretary',
        'treasurer',
        'captain',
        'superadmin'
    ) NOT NULL DEFAULT 'resident',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    last_login TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT uk_users_email
        UNIQUE (email),

    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active),
    INDEX idx_users_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;