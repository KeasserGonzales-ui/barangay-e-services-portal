-- =====================================================
-- Barangay e-Services Portal
-- Initial Database Schema
-- MySQL 8+
-- =====================================================

CREATE DATABASE IF NOT EXISTS barangay_eservices
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE barangay_eservices;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(20) NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'superadmin',
        'admin',
        'official',
        'resident'
    ) NOT NULL DEFAULT 'resident',

    status ENUM(
        'active',
        'inactive',
        'suspended'
    ) NOT NULL DEFAULT 'active',

    email_verified_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
) ENGINE=InnoDB;