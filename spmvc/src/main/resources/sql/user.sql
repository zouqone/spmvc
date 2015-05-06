DROP TABLE IF EXISTS 'user' ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '用户',
  `password` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '密码',
  `age` int(11) unsigned zerofill DEFAULT NULL COMMENT '年龄',
  `sex` varchar(2) CHARACTER SET latin1 DEFAULT NULL COMMENT '性别',
  `address` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '住址',
  `info` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(50) CHARACTER SET latin1 DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS 'mc_user'
create table 'mc_user' {


}