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
	
});

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
	<div position="left">
		<div id="treeNodeContain" class="zTreeDemoBackground left"  style="overflow:auto ;width: 225px; height: 440px;margin:0px;padding-left: 10px;">
			<ul	id="treeRootNode" class="ztree" style="height: 400px;width: 200px;">
				
			</ul>
		</div>
	</div>
	<div position="center" title="组件分类信息">
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