<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
String contextPath = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+contextPath+"";
request.setAttribute("basePath", basePath);

String baseUrl = basePath;
%>
<%
String loginUser = (String)session.getAttribute("loginUser");
String isAuth = (String)session.getAttribute("isAuth");
int redirect = 1;
if(loginUser!=null&&!loginUser.trim().equals("")&&"1".equals(isAuth)){
	redirect = 0;
}
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>basePage</title>

<link href="<%=baseUrl%>/css/common.css" rel="stylesheet" type="text/css" />
<link href="<%=baseUrl%>/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />

<link href="<%=baseUrl%>/js/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />


<script type="text/javascript" src="<%=baseUrl%>/js/common.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/jquery/jquery-2.0.3.js"></script>

<!-- ligerUI  -->
<script type="text/javascript" src="<%=baseUrl%>/js/ligerUI/js/core/base.js" ></script>
<script type="text/javascript" src="<%=baseUrl%>/js/ligerUI/js/ligerui.min.js" ></script>

<!-- zTree -->
<script type="text/javascript" src="<%=baseUrl%>/js/zTree_v3/jquery.ztree.core-3.5.js"></script>



</head>
<body>



</body>
</html>