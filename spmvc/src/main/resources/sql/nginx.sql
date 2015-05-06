DROP TABLE IF EXISTS `nginx_log`;
CREATE TABLE `nginx_log` (
  `id` INTEGER NOT NULL AUTO_INCREMENT COMMENT 'Log ID',
  `rUser` varchar(20) DEFAULT NULL COMMENT 'Remote User',
  `rDate` datetime DEFAULT NULL COMMENT 'Request Date',
  `rHost` varchar(15) DEFAULT NULL COMMENT 'Remote Host',
  `sHost` varchar(15) DEFAULT NULL COMMENT 'Server Host',
  `rMethod` varchar(20) DEFAULT NULL COMMENT 'Request Method',
  `rURL` varchar(3000) DEFAULT NULL COMMENT 'Request URL',
  `sCode` varchar(3) DEFAULT NULL COMMENT 'Status Code',
  `sBytes` INTEGER DEFAULT NULL COMMENT 'Body Bytes Sent',
  `uAgent` varchar(200) DEFAULT NULL COMMENT 'User Agent',
  `hForward` varchar(200) DEFAULT NULL COMMENT 'Http X Forwarded For',
  PRIMARY KEY (`id`)
)