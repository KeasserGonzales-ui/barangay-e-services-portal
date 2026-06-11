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

-- =====================================================
-- SERVICE REQUESTS
-- =====================================================

CREATE TABLE service_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    request_no VARCHAR(30) NOT NULL,
    tracking_no VARCHAR(50) NOT NULL,

    resident_id BIGINT UNSIGNED NOT NULL,
    service_id BIGINT UNSIGNED NOT NULL,

    status ENUM(
        'pending',
        'under_review',
        'approved',
        'rejected',
        'completed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    purpose TEXT NOT NULL,

    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    approved_at TIMESTAMP NULL DEFAULT NULL,
    completed_at TIMESTAMP NULL DEFAULT NULL,

    remarks TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT uk_service_requests_request_no
        UNIQUE (request_no),

    CONSTRAINT uk_service_requests_tracking_no
        UNIQUE (tracking_no),

    CONSTRAINT fk_service_requests_resident
        FOREIGN KEY (resident_id)
        REFERENCES residents(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_service_requests_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE RESTRICT,

    INDEX idx_service_requests_resident (resident_id),
    INDEX idx_service_requests_service (service_id),
    INDEX idx_service_requests_status (status),
    INDEX idx_service_requests_tracking_no (tracking_no),
    INDEX idx_service_requests_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- REQUEST DOCUMENTS
-- =====================================================

CREATE TABLE request_documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_request_id BIGINT UNSIGNED NOT NULL,

    requirement_name VARCHAR(150) NOT NULL,

    original_file_name VARCHAR(255) NOT NULL,
    stored_file_name VARCHAR(255) NOT NULL,

    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT UNSIGNED NOT NULL,

    mime_type VARCHAR(100) NOT NULL,

    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    uploaded_by BIGINT UNSIGNED DEFAULT NULL,

    remarks TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT fk_request_documents_request
        FOREIGN KEY (service_request_id)
        REFERENCES service_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_request_documents_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    INDEX idx_request_documents_request (service_request_id),
    INDEX idx_request_documents_uploaded_by (uploaded_by),
    INDEX idx_request_documents_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- APPROVALS
-- =====================================================

CREATE TABLE approvals (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    service_request_id BIGINT UNSIGNED NOT NULL,

    approved_by BIGINT UNSIGNED NOT NULL,

    action ENUM(
        'pending',
        'approved',
        'rejected',
        'returned'
    ) NOT NULL,

    remarks TEXT DEFAULT NULL,

    approved_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT fk_approvals_request
        FOREIGN KEY (service_request_id)
        REFERENCES service_requests(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_approvals_user
        FOREIGN KEY (approved_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    INDEX idx_approvals_request (service_request_id),
    INDEX idx_approvals_user (approved_by),
    INDEX idx_approvals_action (action),
    INDEX idx_approvals_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    service_request_id BIGINT UNSIGNED DEFAULT NULL,

    title VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    type ENUM(
        'info',
        'success',
        'warning',
        'error'
    ) NOT NULL DEFAULT 'info',

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    read_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL DEFAULT NULL,

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notifications_request
        FOREIGN KEY (service_request_id)
        REFERENCES service_requests(id)
        ON DELETE SET NULL,

    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (is_read),
    INDEX idx_notifications_deleted_at (deleted_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ACTIVITY LOGS
-- =====================================================

CREATE TABLE activity_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED DEFAULT NULL,

    service_request_id BIGINT UNSIGNED DEFAULT NULL,

    action VARCHAR(100) NOT NULL,

    description TEXT DEFAULT NULL,

    ip_address VARCHAR(45) DEFAULT NULL,

    user_agent TEXT DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_activity_logs_request
        FOREIGN KEY (service_request_id)
        REFERENCES service_requests(id)
        ON DELETE SET NULL,

    INDEX idx_activity_logs_user (user_id),
    INDEX idx_activity_logs_request (service_request_id),
    INDEX idx_activity_logs_action (action),
    INDEX idx_activity_logs_created_at (created_at)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SYSTEM SETTINGS
-- =====================================================

CREATE TABLE system_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    setting_key VARCHAR(100) NOT NULL,

    setting_value TEXT DEFAULT NULL,

    description VARCHAR(255) DEFAULT NULL,

    is_public BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_system_settings_key
        UNIQUE (setting_key),

    INDEX idx_system_settings_public (is_public)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4a
COLLATE=utf8mb4_unicode_ci;