DELIMITER ;
CREATE TABLE IF NOT EXISTS `dashboard_available_types` (
  `xtype` varchar(255) NOT NULL,
  `classname` varchar(255) NOT NULL,
  `description` text DEFAULT '',
  PRIMARY KEY (`xtype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
