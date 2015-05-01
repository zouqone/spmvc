<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
 String baseUrl = request.getContextPath();
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>spmvc</title>
<script type="text/javascript">
var baseUrl = '<%=baseUrl%>';

function hello(){
	window.location.href = baseUrl+'/Hello.do?message='+'zouqh';
	
}
</script>
</head>
<body>
<h2>Index Page</h2>

<input type="button" value="hello" onclick="hello()">
</body>
</html>