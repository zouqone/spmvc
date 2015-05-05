<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ajaxTest</title>
<%@ include file="/jsp/basePage.jsp" %>

<script type="text/javascript">
var baseUrl = '<%=baseUrl%>';
var uploadUrl = baseUrl+"/FileAction/uploadSingleFile.do";
function upload(){
	form.action = uploadUrl;
	form.submit();
}

</script>
</head>
<body>

<div id="message">
<form action="" name="form" method="post" enctype="multipart/form-data"> 
	<table class="fileTable">
		<tr>
			<td>一般单文件上传</td>
			<td><input class="filecss" type="file" name="file" value=""></td>
		</tr>
		<tr>
		<td><input class="buttoncss" type="button" value="上传" onclick="upload()"></td>
			<td><input class="buttoncss" type="reset"></td>
		</tr>
	</table>
</form>
</div> 

</body>
</html>