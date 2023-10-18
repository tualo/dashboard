DELIMITER ;
insert ignore into ds_class (class_name) values ('Dashboard') ;

CREATE TABLE IF NOT EXISTS `dashboard_available_types` (
  `xtype` varchar(100) NOT NULL,
  `classname` varchar(255) NOT NULL,
  `description` text DEFAULT '',
  PRIMARY KEY (`xtype`)
);
