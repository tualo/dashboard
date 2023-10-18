DELIMITER ;
insert ignore into ds_class (class_name) values ('Dashboard') ;

CREATE TABLE IF NOT EXISTS `dashboard` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `dashboard_type` varchar(255) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `configuration` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`configuration`)),
  PRIMARY KEY (`id`),
  KEY `dashboard_type_fk` (`dashboard_type`),
  CONSTRAINT `dashboard_type_fk` FOREIGN KEY (`dashboard_type`) REFERENCES `dashboard_available_types` (`xtype`) ON DELETE CASCADE ON UPDATE CASCADE
);


create view if not exists view_readttable_dashboard as
select
    d.id,
    d.title,
    d.dashboard_type,
    d.position,
    d.configuration,
    ad.classname
from 
    dashboard d
    join dashboard_available_types ad on ad.xtype = d.dashboard_type
order by
    d.position asc
;