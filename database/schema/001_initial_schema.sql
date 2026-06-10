CREATE TABLE residents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED DEFAULT NULL,

    resident_no VARCHAR(30) NOT NULL,
    family_no VARCHAR(30) DEFAULT NULL,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) DEFAULT NULL,
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(20) DEFAULT NULL,

    birth_date DATE NOT NULL,
    birth_place VARCHAR(150) DEFAULT NULL,

    sex ENUM(
        'male',
        'female'
    ) NOT NULL,

    civil_status ENUM(
        'single',
        'married',
        'widowed',
        'separated'
    ) NOT NULL,

    citizenship VARCHAR(100) NOT NULL DEFAULT 'Filipino',

    contact_number VARCHAR(20) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,

    house_no VARCHAR(100) DEFAULT NULL,
    street VARCHAR(150) DEFAULT NULL,
    purok VARCHAR(100) DEFAULT NULL,

    occupation VARCHAR(150) DEFAULT NULL,

    date_started_residency DATE DEFAULT NULL,

    place_of_registration VARCHAR(150) DEFAULT NULL,

    emergency_contact_name VARCHAR(150) DEFAULT NULL,
    emergency_contact_number VARCHAR(20) DEFAULT NULL,

    photo_url VARCHAR(255) DEFAULT NULL,

    is_voter BOOLEAN NOT NULL DEFAULT FALSE,
    is_pwd BOOLEAN NOT NULL DEFAULT FALSE,
    is_senior BOOLEAN NOT NULL DEFAULT FALSE,

    barangay_status ENUM(
        'resident',
        'former_resident'
    ) NOT NULL DEFAULT 'resident',

    status ENUM(
        'active',
        'inactive',
        'deceased',
        'moved_out'
    ) NOT NULL DEFAULT 'active',

    remarks TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT uk_residents_resident_no
        UNIQUE (resident_no),

    CONSTRAINT fk_residents_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    INDEX idx_residents_user_id (user_id),
    INDEX idx_residents_family_no (family_no),
    INDEX idx_residents_last_name (last_name),
    INDEX idx_residents_status (status),
    INDEX idx_residents_contact_number (contact_number),
    INDEX idx_residents_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;