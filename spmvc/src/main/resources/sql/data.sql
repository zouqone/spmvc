


INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (1, 'admin', 'adminpw', 0, '1', '', '', 'zouqh@yonyou.com');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (2, 'zouqh', 'zouqone123', 27, '1', '', '', 'zouqh@yonyou.com');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (3, 'zhangjh', 'zhangjhuf', 22, '0', '', '', 'zhangjh@yonyou.com');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (4, 'test', '1', 0, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (5, 'w1', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (6, 'w2', '2', 2, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (7, 'w3', '3', 3, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (8, 'w4', '4', 4, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (9, 'w5', '5', 5, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (10, 'q1', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (11, 'q2', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (12, 'q3', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (13, 'q4', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (14, 'q5', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (15, 'q6', '1', 1, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (16, 'e1', '1', 2, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (17, 'e2', '1', 2, '1', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (18, 'e3', '1', 2, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (19, 'e4', '1', 2, '0', '', '', '');
INSERT INTO user (id, username, password, age, sex, address, info, email) VALUES (20, 'e5', '1', 2, '0', '', '', '');



INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (1, 'root', 'root', '根节点', '0', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (2, 'user', '用户', '用户', 'root', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (3, 'person', '人员信息', '人员信息', 'root', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (4, 'usermanage', '用户管理', '用户管理', 'rootdir', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (5, 'loganalyse', '日志分析', '日志分析', 'rootdir', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (6, 'rootdir', '根目录', '根目录', 'rootdir0', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (7, 'userinfo', '用户', '用户', 'usermanage', '/login/user/userList.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (8, 'nginx', 'nginx', 'nginx', 'loganalyse', '/log/analyse/nginx/index.html', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (9, 'apache', 'apache', 'apache', 'loganalyse', '/log/analyse/apache2/index.html', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (10, 'svn', 'svn管理', 'root', 'rootdir', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (11, 'auth', '权限管理', '权限管理', 'svn', '/app/svn/auth.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (12, 'system', '系统管理', '系统管理', 'rootdir', null, null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (13, 'function', '功能节点', '功能节点', 'system', '/app/function/function.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (14, 'databaseManage', '数据库管理', '数据库管理', 'rootdir', '', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (15, 'tables', '获取数据库表', '获取数据库表', 'databaseManage', '', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (16, 'databaseInfo', '数据库信息', '获取数据库信息', 'databaseManage', '/app/database/database.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (17, 'app', 'app', 'Java小应用', 'rootdir', '', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (18, 'winbox', '弹出框', '弹出框', 'app', '/app/winBox/openWin.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (19, 'fileDown', '文件下载', '文件下载', 'app', '/app/file/fileDown.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (27, 'report', '图表', '图表', 'app', '/app/report/jsReport.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (28, 'report', '报表', '报表', 'app', '/app/report/ireport.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (87, 'fileUpload', '文件上传', '', 'app', '/app/file/fileUpload.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (88, 'imageBrowse', '图片预览', '图片预览', 'app', '/app/file/imagebrowses.jsp', null);
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (89, 'xs', 'xs', 'xs', 'app', '', '1');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (93, 'fusionchart', 'fusion图表', '', 'app', '/app/report/fusionReport.jsp', '2');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (94, 'charts', 'charts', '图表', 'rootdir', '', '1');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (95, 'fusioncharts', 'fusioncharts', 'fusioncharts', 'charts', '/app/charts/fusioncharts.jsp', '0');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (96, 'report', '报表', '', 'rootdir', '', '2');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (97, 'bigdata', '大数据测试', '测试', 'report', '/app/report/report.jsp', '0');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (98, 'bill', '表单', '表单', 'rootdir', '', '3');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (99, 'metadata', '元数据', '元数据', 'bill', '', '0');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (111, 'billtemplate', '单据模板', '', 'bill', '/app/bill/billWeb.jsp', '1');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (112, 'schedule', '任务调度', '', 'rootdir', '/app/schedule/JobDetails.jsp', '4');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (113, 'drag', 'drag', 'drag', 'app', '', '3');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (114, 'simpledrag', 'simpledrag', '', 'drag', '/app/drag/drag.jsp', '0');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (115, 'metadata', '元数据', '元数据', 'system', '', '1');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (116, 'component', '组件', '组件', 'metadata', '/sys/md/component.jsp', '0');
INSERT INTO function (id, ncode, nodename, nodedesc, parentncode, link, sort) VALUES (117, 'comcategory', '组件分类', '', 'metadata', '/sys/md/comcategory/comcategoryTreePage.jsp', '');




















