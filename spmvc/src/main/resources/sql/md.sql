drop table if exists comconfig;

drop table if exists md_association;

drop table if exists md_class;

drop table if exists md_column;

drop table if exists md_comcategory;

drop table if exists md_component;

drop table if exists md_ormap;

drop table if exists md_property;

drop table if exists md_table;

drop table if exists operationlog;

drop table if exists sys_group;

drop table if exists sys_group_right;

drop table if exists sys_group_role;

drop table if exists sys_org;

drop table if exists sys_person;

drop table if exists sys_right;

drop table if exists sys_role;

drop table if exists sys_role_right;

drop table if exists sys_user;

drop table if exists sys_user_group;

drop table if exists sys_user_right;

drop table if exists sys_user_role;

/*==============================================================*/
/* Table: comconfig                                             */
/*==============================================================*/
create table comconfig
(
   id                   varchar(50) not null,
   componentid          varchar(50),
   configcode           varchar(50),
   configname           varchar(100),
   packagepath          varchar(200),
   pagepath             varchar(200),
   description          varchar(200),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table comconfig comment '组件配置';

/*==============================================================*/
/* Table: md_association                                        */
/*==============================================================*/
create table md_association
(
   id                   varchar(50) not null,
   classid              varchar(50),
   componentid          varchar(50),
   propertyid           varchar(50),
   code                 varchar(50),
   name                 varchar(100),
   startbeanid          varchar(50),
   startattributeid     varchar(50),
   endbeanid            varchar(50),
   associationtype      varchar(100),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_association comment '实体关联信息';

/*==============================================================*/
/* Table: md_class                                              */
/*==============================================================*/
create table md_class
(
   id                   varchar(50) not null,
   componentid          varchar(50),
   classcode            varchar(50),
   classname            varchar(100),
   fullclassname        varchar(200),
   isprimary            varchar(5),
   keyattributeid       varchar(50),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_class comment '实体类';

/*==============================================================*/
/* Table: md_column                                             */
/*==============================================================*/
create table md_column
(
   id                   varchar(50) not null,
   表id                  char(10),
   tableid              varchar(50),
   columncode           varchar(50),
   columnname           varchar(100),
   columntype           varchar(50),
   defaultvalue         varchar(50),
   columnsquence        int,
   columnlength         int,
   description          varchar(200),
   isnull               varchar(5),
   lsprimarykey         varchar(5),
   precise              int,
   identitied           varchar(50),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_column comment '实体字段';

/*==============================================================*/
/* Table: md_comcategory                                        */
/*==============================================================*/
create table md_comcategory
(
   id                   varchar(50) not null,
   parentcode           varchar(50),
   code                 varchar(50),
   name                 varchar(100),
   detail               varchar(200),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_comcategory comment '组件分类';

/*==============================================================*/
/* Table: md_component                                          */
/*==============================================================*/
create table md_component
(
   id                   varchar(50) not null,
   comcategoryid        varchar(50),
   code                 varchar(50),
   name                 varchar(100),
   detail               varchar(200),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_component comment '组件';

/*==============================================================*/
/* Table: md_ormap                                              */
/*==============================================================*/
create table md_ormap
(
   id                   varchar(50) not null,
   propertyid           varchar(50) not null,
   classid              varchar(50) not null,
   columnid             varchar(50) not null,
   tableid              varchar(50) not null,
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id, propertyid, classid, columnid, tableid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_ormap comment '实体表关系映射';

/*==============================================================*/
/* Table: md_property                                           */
/*==============================================================*/
create table md_property
(
   id                   varchar(50) not null,
   classid              varchar(50),
   attrcode             varchar(50),
   attname              varchar(100),
   datatype             varchar(50),
   defaultvalue         varchar(50),
   isdisplay            varchar(5),
   attrsequence         int,
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_property comment '实体属性';

/*==============================================================*/
/* Table: md_table                                              */
/*==============================================================*/
create table md_table
(
   表id                  char(10) not null,
   编码                   char(10),
   名称                   char(10),
   数据库                  char(10),
   描述                   char(10),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier              varchar(100),
   ts                   varchar(50),
   dr                   varchar(5),
   primary key (表id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table md_table comment '实体表';

/*==============================================================*/
/* Table: operationlog                                          */
/*==============================================================*/
create table operationlog
(
   id                   varchar(50) not null,
   operattype           varchar(50),
   operatcontent        varchar(200),
   operator             varchar(100),
   operatcode           varchar(50),
   operattime           datetime,
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_group                                             */
/*==============================================================*/
create table sys_group
(
   id                   varchar(50) not null,
   name                 varchar(50),
   code                 varchar(100),
   parentcode           varchar(50),
   groupdesc            varchar(200),
   createtime           datetime,
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_group_right                                       */
/*==============================================================*/
create table sys_group_right
(
   id                   varchar(50) not null,
   groupid              varchar(50),
   rightid              varchar(50),
   righttype            varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_group_role                                        */
/*==============================================================*/
create table sys_group_role
(
   id                   varchar(50) not null,
   groupid              varchar(50) not null,
   roleid               varchar(50) not null,
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_org                                               */
/*==============================================================*/
create table sys_org
(
   id                   varchar(50) not null,
   orgcode              varchar(50),
   orgname              varchar(100),
   parentorg            varchar(50),
   orgdesc              varchar(200),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_person                                            */
/*==============================================================*/
create table sys_person
(
   id                   varchar(50) not null,
   orgid                varchar(50),
   code                 varchar(50),
   name                 varchar(100),
   telephoto            varchar(20),
   email                varchar(50),
   birthdate            datetime,
   weight               float(50),
   gradeschool          varchar(50),
   fromprovice          varchar(50),
   address              varchar(200),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_right                                             */
/*==============================================================*/
create table sys_right
(
   id                   varchar(50) not null,
   rightcode            varchar(50),
   rightname            varchar(100),
   parentcode           varchar(50),
   rightdesc            varchar(200),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_role                                              */
/*==============================================================*/
create table sys_role
(
   id                   varchar(50) not null,
   rolecode             varchar(50),
   rolename             varchar(100),
   parentcode           varchar(50),
   roledesc             varchar(200),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_role_right                                        */
/*==============================================================*/
create table sys_role_right
(
   id                   varchar(50) not null,
   roleid               varchar(50),
   rightid              varchar(50),
   righttype            varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_user                                              */
/*==============================================================*/
create table sys_user
(
   id                   varchar(50) not null,
   username             varchar(50),
   password             varchar(200),
   fullname             varchar(200),
   logintime            datetime,
   createtime           datetime,
   prelogintime         datetime,
   logincount           int,
   person               varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_user_group                                        */
/*==============================================================*/
create table sys_user_group
(
   id                   varchar(50) not null,
   userid               varchar(50),
   groupid              varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_user_right                                        */
/*==============================================================*/
create table sys_user_right
(
   id                   varchar(50) not null,
   userid               varchar(50),
   rightid              varchar(50),
   righttype            varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*==============================================================*/
/* Table: sys_user_role                                         */
/*==============================================================*/
create table sys_user_role
(
   id                   varchar(50) not null,
   userid               varchar(50),
   roleid               varchar(50),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table fileinfo
(
   id                   varchar(50) not null,
   filename             varchar(100),
   filetype             varchar(50),
   filegroup            varchar(50),
   filesize             varchar(50),
   filepath             varchar(200),
   description          varchar(500),
   createtime           datetime,
   creator              varchar(100),
   modifytime           datetime,
   modifier             varchar(100),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table fileinfo comment '文件信息';




alter table comconfig add constraint fk_reference_27 foreign key (componentid)
      references md_component (id) on delete restrict on update restrict;

alter table md_association add constraint fk_reference_19 foreign key (componentid)
      references md_component (id) on delete restrict on update restrict;

alter table md_association add constraint fk_reference_21 foreign key (classid)
      references md_class (id) on delete restrict on update restrict;

alter table md_association add constraint fk_reference_22 foreign key (propertyid)
      references md_property (id) on delete restrict on update restrict;

alter table md_class add constraint fk_reference_17 foreign key (componentid)
      references md_component (id) on delete restrict on update restrict;

alter table md_column add constraint fk_reference_20 foreign key (表id)
      references md_table (表id) on delete restrict on update restrict;

alter table md_component add constraint fk_reference_28 foreign key (comcategoryid)
      references md_comcategory (id) on delete restrict on update restrict;

alter table md_ormap add constraint fk_reference_23 foreign key (tableid)
      references md_table (表id) on delete restrict on update restrict;

alter table md_ormap add constraint fk_reference_24 foreign key (columnid)
      references md_column (id) on delete restrict on update restrict;

alter table md_ormap add constraint fk_reference_25 foreign key (classid)
      references md_class (id) on delete restrict on update restrict;

alter table md_ormap add constraint fk_reference_26 foreign key (propertyid)
      references md_property (id) on delete restrict on update restrict;

alter table md_property add constraint fk_reference_18 foreign key (classid)
      references md_class (id) on delete restrict on update restrict;

alter table operationlog add constraint fk_reference_14 foreign key (operatcode)
      references sys_user (id) on delete restrict on update restrict;

alter table sys_group_right add constraint fk_reference_6 foreign key (rightid)
      references sys_right (id) on delete restrict on update restrict;

alter table sys_group_right add constraint fk_reference_7 foreign key (groupid)
      references sys_group (id) on delete restrict on update restrict;

alter table sys_group_role add constraint fk_reference_10 foreign key (groupid)
      references sys_group (id) on delete restrict on update restrict;

alter table sys_group_role add constraint fk_reference_9 foreign key (roleid)
      references sys_role (id) on delete restrict on update restrict;

alter table sys_person add constraint fk_reference_16 foreign key (orgid)
      references sys_org (id) on delete restrict on update restrict;

alter table sys_role_right add constraint fk_reference_1 foreign key (roleid)
      references sys_role (id) on delete restrict on update restrict;

alter table sys_role_right add constraint fk_reference_2 foreign key (rightid)
      references sys_right (id) on delete restrict on update restrict;

alter table sys_user add constraint fk_reference_15 foreign key (person)
      references sys_person (id) on delete restrict on update restrict;

alter table sys_user_group add constraint fk_reference_11 foreign key (groupid)
      references sys_group (id) on delete restrict on update restrict;

alter table sys_user_group add constraint fk_reference_12 foreign key (userid)
      references sys_user (id) on delete restrict on update restrict;

alter table sys_user_right add constraint fk_reference_13 foreign key (userid)
      references sys_user (id) on delete restrict on update restrict;

alter table sys_user_right add constraint fk_reference_3 foreign key (rightid)
      references sys_right (id) on delete restrict on update restrict;

alter table sys_user_role add constraint fk_reference_4 foreign key (roleid)
      references sys_role (id) on delete restrict on update restrict;

alter table sys_user_role add constraint fk_reference_8 foreign key (userid)
      references sys_user (id) on delete restrict on update restrict;
