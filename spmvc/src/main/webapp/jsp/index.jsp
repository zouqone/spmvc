<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ERP</title>
<%@ include file="/jsp/basePage.jsp" %>
<script type="text/javascript" src="<%=baseUrl%>/js/app/index.js"></script>
<script type="text/javascript">
var baseUrl = '<%=baseUrl%>';
var redirect = '<%=redirect%>';
if(redirect==1){
	window.location.href = baseUrl + "/jsp/login/login.jsp?rk="+Math.random();
}

jQuery(document).ready(function(){
	jQuery("#index_layout").ligerLayout({ leftWidth: 230,topHeight : 50,bottomHeight:30 });
	var height = $(".l-layout-center").height();
	initAccordion(height);
	initCard(height);
});

function initAccordion(height){
	$("#accordion1").ligerAccordion({
		height: height - 24, speed: null
	});
}

function initCard(height){
	$("#framecenter").ligerTab({
		height: height,
		showSwitchInTab : true,
		showSwitch: true
		
	});
}


function addUser(){
	var url = baseUrl+"/jsp/sys/user/user.jsp?rk="+Math.random();
	jQuery('#frameid').attr('src',url);
}
function addFile(){
	var url = baseUrl+"/jsp/test/filetest.jsp?rk="+Math.random();
	jQuery('#frameid').attr('src',url);
}
</script>
<style type="text/css">
body {
	padding: 5px;
	margin: 0;
	padding-bottom: 15px;
}
.l-table-edit-td{ padding:4px;}
.l-table-edit-td{ padding:4px;}
.l-button-submit,.l-button-reset{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-verify-tip{ left:230px; top:120px;}
</style>
</head>
<body>

<div id="index_layout">
 	<div position="top" style="height:50px;vertical-align: bottom;padding: 5px;">
		<div style="text-align: center;font-size: 16px;font-weight: bolder;">系统管理</div>
		<input type="button" name="add" value="用戶管理" onclick="addUser()">
		<input type="button" name="file" value="附件" onclick="addFile()">
	</div>
	<div position="left" title="主要菜单" id="accordion1">
		<div id="systemmanage" title="系统管理" class="l-scroll">
			<ul>
				<li>用户</li> 
				<li>用户组</li>
				<li>角色</li>
				<li>权限</li>
				<li>人员信息</li>
			</ul>
		</div>
		<div id="functionid" title="功能节点">
			<ul>
				<li>列表一</li>
				<li>列表二</li>
				<li>列表三</li>
				<li>列表四</li>
				<li>列表五</li>
			</ul>
		</div>
		<div id="appid" title="应用管理">
			<ul>
				<li>列表一</li>
				<li>列表二</li>
				<li>列表三</li>
				<li>列表四</li>
				<li>列表五</li>
			</ul>
		</div>
	</div>
	<div position="center" id="framecenter" title="组件分类信息">
			<div tabid="home" title="我的主页"  >
                <iframe frameborder="0" id="frameid" style="height:500px;width: 800px;" src=""></iframe>
            </div> 		
		
	</div>
	<!-- <div position="right" style="width: 50px;display: none;">
		
	</div> -->
	<div position="bottom" style="">
		
	</div>
</div>


</body>
</html>