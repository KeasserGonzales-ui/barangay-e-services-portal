-- ============================================
-- 004 - Add Soft Delete Support to Residents
-- ============================================

ALTER TABLE residents
ADD COLUMN is_deleted TINYINT(1) NOT NULL DEFAULT 0
AFTER is_active;