/*
Navicat MySQL Data Transfer

Source Server         : localhost-mysql-root
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : log

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2014-05-03 00:24:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `function`
-- ----------------------------
DROP TABLE IF EXISTS `function`;
CREATE TABLE `function` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ncode` varchar(50) DEFAULT NULL COMMENT '节点编码',
  `nodename` varchar(100) DEFAULT NULL COMMENT '节点名称',
  `nodedesc` varchar(500) DEFAULT NULL COMMENT '节点描述',
  `parentncode` varchar(50) DEFAULT NULL COMMENT '上级节点编码',
  `link` varchar(500) DEFAULT NULL COMMENT '链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='功能节点';

-- ----------------------------
-- Records of function
-- ----------------------------
INSERT INTO `function` VALUES ('1', 'root', 'root', '根节点', '0', null);
INSERT INTO `function` VALUES ('2', 'user', '用户', '用户', 'root', null);
INSERT INTO `function` VALUES ('3', 'person', '人员信息', '人员信息', 'root', null);
INSERT INTO `function` VALUES ('4', 'usermanage', '用户管理', '用户管理', 'rootdir', null);
INSERT INTO `function` VALUES ('5', 'loganalyse', '日志分析', '日志分析', 'rootdir', null);
INSERT INTO `function` VALUES ('6', 'rootdir', '根目录', '根目录', 'rootdir0', null);
INSERT INTO `function` VALUES ('7', 'userinfo', '用户', '用户', 'usermanage', '/login/user/userList.jsp');
INSERT INTO `function` VALUES ('8', 'nginx', 'nginx', 'nginx', 'loganalyse', '/log/analyse/nginx/index.html');
INSERT INTO `function` VALUES ('9', 'apache', 'apache', 'apache', 'loganalyse', '/log/analyse/apache2/index.html');
INSERT INTO `function` VALUES ('10', 'svn', 'svn管理', 'root', 'rootdir', null);
INSERT INTO `function` VALUES ('11', 'auth', '权限管理', '权限管理', 'svn', '/app/svn/auth.jsp');

-- ----------------------------
-- Table structure for `nginx_log`
-- ----------------------------
DROP TABLE IF EXISTS `nginx_log`;
CREATE TABLE `nginx_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Log ID',
  `rUser` varchar(20) DEFAULT NULL COMMENT 'Remote User',
  `rDate` date DEFAULT NULL COMMENT 'Request Date',
  `rHost` varchar(15) DEFAULT NULL COMMENT 'Remote Host',
  `sHost` varchar(15) DEFAULT NULL COMMENT 'Server Host',
  `rMethod` varchar(20) DEFAULT NULL COMMENT 'Request Method',
  `rURL` varchar(3000) DEFAULT NULL COMMENT 'Request URL',
  `sCode` varchar(3) DEFAULT NULL COMMENT 'Status Code',
  `sBytes` int(11) DEFAULT NULL COMMENT 'Body Bytes Sent',
  `uAgent` varchar(200) DEFAULT NULL COMMENT 'User Agent',
  `hForward` varchar(200) DEFAULT NULL COMMENT 'Http X Forwarded For',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nginx_log
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'adminpw', '00000000000', '1', '', '', 'zouqh@yonyou.com');
INSERT INTO `user` VALUES ('2', 'zouqh', 'zouqone123', '00000000027', '1', '', '', 'zouqh@yonyou.com');
INSERT INTO `user` VALUES ('3', 'zhangjh', 'zhangjhuf', '00000000022', '0', '', '', 'zhangjh@yonyou.com');
INSERT INTO `user` VALUES ('4', 'test', '1', '00000000000', '0', '', '', '');
INSERT INTO `user` VALUES ('5', 'w1', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('6', 'w2', '2', '00000000002', '1', '', '', '');
INSERT INTO `user` VALUES ('7', 'w3', '3', '00000000003', '0', '', '', '');
INSERT INTO `user` VALUES ('8', 'w4', '4', '00000000004', '0', '', '', '');
INSERT INTO `user` VALUES ('9', 'w5', '5', '00000000005', '0', '', '', '');
INSERT INTO `user` VALUES ('10', 'q1', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('11', 'q2', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('12', 'q3', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('13', 'q4', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('14', 'q5', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('15', 'q6', '1', '00000000001', '1', '', '', '');
INSERT INTO `user` VALUES ('16', 'e1', '1', '00000000002', '1', '', '', '');
INSERT INTO `user` VALUES ('17', 'e2', '1', '00000000002', '1', '', '', '');
INSERT INTO `user` VALUES ('18', 'e3', '1', '00000000002', '0', '', '', '');
INSERT INTO `user` VALUES ('19', 'e4', '1', '00000000002', '0', '', '', '');
INSERT INTO `user` VALUES ('20', 'e5', '1', '00000000002', '0', '', '', '');
