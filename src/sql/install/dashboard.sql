DELIMITER ;
insert ignore into ds_class (class_name) values ('Dashboard') ;

create table if not exists dashboard(
    id varchar(36) not null primary key,
    title varchar(255) not null,
    dashboard_type varchar(255) not null,
    position int not null default 0,
    configuration JSON default null,
    constraint dashboard_type_fk foreign key (dashboard_type) references dashboard_available_types(xtype) on delete cascade on update cascade
) ;


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