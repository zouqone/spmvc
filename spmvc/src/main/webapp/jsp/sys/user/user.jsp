<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>user</title>
<%@ include file="/jsp/basePage.jsp" %>

<script type="text/javascript">
var baseUrl = '<%=baseUrl%>';
var userAction = baseUrl+'/UserAction';
var formID = 'form1';

jQuery(document).ready(function(){
	//jQuery('[name="comcategoryid"]').val(comcategoryid);
	jQuery("form").ligerForm();
	
});


function save(){
	var formObj = jQuery('#form1')[0];
	var id = null;
	if(id!=null&&opt=='edit'){
		formObj.action = userAction+'/Edit.do';
	}else{
		formObj.action = userAction+'/Add.do';
	}
	formObj.submit();
}
function cancel(){
	window.location.href = baseUrl+"/sys/md/component/component.jsp";
	
}
</script>

<style type="text/css">
       body{ font-size:12px;}
    .l-table-edit {}
    .l-table-edit-td{ padding:4px;}
    .l-button-submit,.l-button-reset{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
    .l-verify-tip{ left:230px; top:120px;}
</style>
    
</head>
<body>
		${message}
	<div>
		
		<form name="userForm" method="post" id="form1">
			<div></div>
			
			<table cellpadding="0" cellspacing="0" class="l-table-edit">
				<tr style="display:none;">
					<td align="right" class="l-table-edit-td">用户id:</td>
					<td align="left" class="l-table-edit-td">
						<input name="userid" type="text" id="txtName1" ltype="text" />
						
					</td>
					<td align="right" class="l-table-edit-td"></td>
					<td align="left" class="l-table-edit-td">
					</td>
					<td align="left"></td>
				</tr>
				<tr>
					<td align="right" class="l-table-edit-td">用户名</td>
					<td align="left" class="l-table-edit-td">
						<input name="username" type="text" id="txtName3" ltype="text" value="zou"/>
					</td>
					<td align="right" class="l-table-edit-td">密码</td>
					<td align="left" class="l-table-edit-td">
						<input name="password" type="text" id="txtName4" ltype="text" value="1" />
					</td>
					<td align="left"></td>
				</tr>
				<tr>
					<td align="right" class="l-table-edit-td">用户全名</td>
					<td align="left" class="l-table-edit-td">
						<input name="fullname" type="text" id="txtName13" ltype="text" />
					</td>
					<td align="right" class="l-table-edit-td">人员信息</td>
					<td align="left" class="l-table-edit-td">
						<input name="person" type="text" id="txtName14" ltype="text" />
					</td>
					<td align="left"></td>
				</tr>
			</table>
			<div>
			<input type="button" value="提交" id="Button1"
				class="l-button l-button-submit" onclick="save()"/> 
			<input type="reset" value="重置"
				class="l-button l-button-reset" />
			<input type="button" value="取消"
				class="l-button l-button-reset" onclick="cancel()" />
		</div>
		</form>

	</div>
	
</body>
</html>