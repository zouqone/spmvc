/**
 * 
 */

function getAuthInfo(show_id,path){
	var url = "AuthInfo.jsp";
	var params = {opt:"",path:path,encode:""};
	ajaxRequest({
		url:url,
		data:params,
		type:"POST",
		success:function(response){
			//var datas = StringToJson(response);
			//alert(response);
			var show_obj = document.getElementById(show_id);
			show_obj.innerHTML = response;
			var res = parseAuth(response);
			var groups = getGroupFromRes(res);
			var authz = getAuthFromRes(res); 
			authz = matchGroup(groups,authz);
			initSelect(groups,'select_group_id');
			loadGroupInfo('svn_group_table_id','user_div_id',groups,authz);
			
		}
	});
}

function matchGroup(mgroups,authz){
	for(var i = 0 ; i < authz.length ; i++){
		var groups = authz[i].groups;
		for(var k = 0 ; k < groups.length ; k++){
			var group = groups[k];
			for(var t = 0 ; t< mgroups.length ; t++){
				var mgroup = mgroups[t];
				if(group.name == mgroup.name){
					group.id = mgroup.id;
					break;
				}
			}
		}
	}
	return authz;
}
function initSelect(groups,select_div_id,key){
	var select_div_obj = document.getElementById(select_div_id);
	if(groups==null ||groups.length==0 ||select_div_obj==null){
		return ;
	}
	var html = '';
	html +='<option value="">请选择</option>\n'; 
	for(var i = 0 ; i < groups.length ; i++){
		var group = groups[i];
		var groupName = group.name;
		var groupId = group.id;
		var defaultKey = '';
		if(groupId == key){
			defaultKey = 'selected="selected"';
		}
		html +='<option value="'+groupId+'" '+defaultKey+'>'+groupName+'</option>\n'; 
	}
	select_div_obj.children[0].innerHTML = html;
}

function setSelectValue(selectObj,value){
	var options = selectObj.children;
	if(options == null || options.length==0){
		return false;
	}
	for(var i = 0 ; i < options.length ; i++){
		var option = options[i];
		var key = option.getAttribute('value');
		if(key == value){
			option.setAttribute("selected","selected");
		}else{
			option.removeAttribute('selected');
		}
	}
	return true;
}
/**
 * 加载用户权限信息
 * @param table_id
 * @param user_id
 * @param res
 * @returns
 */
function loadGroupInfo(table_id,user_id,groups,authz){
	if(table_id == null ){
		return null;
	}
	//var groups = getGroupFromRes(res);
	//var authz = getAuthFromRes(res);
	//authz = matchGroup(groups,authz);
	//加载用户 组信息
	var html = createGroupHTML(groups);
	var table_obj = document.getElementById(table_id);
	html +='<tr></tr>';
	table_obj.innerHTML = html;
	//加载用户信息
	html = createUserHTML(groups);
	var user_obj = document.getElementById(user_id);
	user_obj.innerHTML = html;
	
	//加载目录
	html = createDirHTML(authz);
	table_id = 'svn_dir_table_id';
	var auth_table_obj = document.getElementById(table_id);
	html +='<tr></tr>';
	auth_table_obj.innerHTML = html;
	
	//加载用户组权限信息
	html = createGroupAuthHTML(authz);
	var group_id = 'group_div_id';
	var auth_obj = document.getElementById(group_id);
	auth_obj.innerHTML = html;
}

/**
 * 以行为单位分割字符串
 * @param authz
 * @returns
 */
function parseAuth(authz){
	if(authz == null || authz == ''){
		return null;
	}
	var rows = authz.split("\n");
	var len = rows.length;
	var res = [];
	for(var i = 0 ; i < len ; i++){
		var row = rows[i];
		if(row!='' && row!='\r'){
			res[res.length] = row;
		}
	}
	return res;
}


/*===============================目录权限============================*/
/**
 * 生成目录
 * @param authz
 * @returns
 */
function createDirHTML(authz){
	if( authz == null || authz.length == 0){
		return null;
	}
	var html = '';
	for(var i = 0 ; i < authz.length ; i++){
		var dir = authz[i];
		var path = dir.path;
		html +='<tr class="svn_group_table_tr" name="'+dir.id+'">'
		+'<td class="svn_group_table_tr_td auth_checkbox">'
		+'<input  type="checkbox" name="groupName" value="'+path+'">'
		+'</td>'
		+'<td class="svn_group_table_tr_td auth_dir_name">'
		+'<input onblur="checkDirNull(this)" onclick="showGroup(this,\'group_div_id\')" class="group_name_input" type="text" name="groupNameText" value="'+path+'">'
		+'</td>'
		+'</tr>';
	}
	return html;
}

function createGroupAuthHTML(authz){
	if( authz == null || authz.length == 0){
		return null;
	}
	var html = '';
	for(var i = 0 ; i < authz.length ; i++){
		var dir = authz[i];
		var groups = dir.groups;
		var dirId = dir.id;
		html += '<form name="'+dirId+'">';
		html +='<table class="user_group_table" id="'+dirId+'"  style="display: none;">';
		if(groups != null && groups.length > 0){
			for(var k = 0 ; k < groups.length ; k++){
				var group = groups[k];
				html +=GetGroupTdHTML(group);
				html +='';
			}
		}
		html +='<tr></tr></table>';
		html +='</form>';
	}
	return html;
}

/**
 * 生成用户行内代码
 * @param user
 * @returns {String}
 */
function GetGroupTdHTML(group){
	var group_id = group.id;//'group'+makeRandom(8);
	var name = group.name;
	var auth = group.auth;
	var r = '';
	var w = '';
	if(auth!=null && auth != ''&&auth.length<=2){
		if(auth.length==1){
			if(auth=='r'){
				r = 'checked';
			}
			if(auth == 'w'){
				w = 'checked';
			}
		}else if(auth.length==2){
			r = 'checked';
			w = 'checked';
		}
	}
	
	var select_group_obj = document.getElementById('select_group_id');
	var selectObj = select_group_obj.children[0];
	setSelectValue(selectObj,group_id);
	var select_html = select_group_obj.innerHTML;
	var html ='<tr class="user_group_table_tr">'
		+'<td class="user_group_table_tr_td auth_checkbox">'
		+'<input  type="checkbox" name="group" value="'+group_id+'">'
		+'</td>'
		+'<td class="user_group_table_tr_td user_group_name">'
		//+'<input onblur="checkUserNull(this)"  class="group_name_input" id="'+group_id+'" type="text" name="user" value="'+name+'">'
		+select_html
		+'</td>'
		+'<td class="user_group_table_tr_td auth_checkbox">'
		+'<input type="checkbox" name="r" '+r+' value=""></td>'
		+'<td class="user_group_table_tr_td user_group_td">r</td>'
		+'<td class="user_group_table_tr_td auth_checkbox">'
		+'<input type="checkbox" name="w" '+w+' value="">'
		+'</td><td class="user_group_table_tr_td user_group_td">w</td>'
		+'</tr>';
	return html;
}

/**
 * 展现当前所选的用户组及用户
 * @param obj
 * @param table_id
 * @param groups
 */
function showGroup(obj,table_id){
	var trObj = obj.parentNode.parentNode;
	var groupName = trObj.getAttribute('name');
	var table_obj = document.getElementById(table_id);
	if(groupName == null || groupName == ''){
		table_obj.innerHTML = '';
		return ;
	}
	showGroupTable(groupName,table_obj);
	manageDir(obj);
}

/**
 * 显示用户表格
 * @param groupName
 * @param user_div_obj
 * @returns {Boolean}
 */
function showGroupTable(groupName,user_div_obj){
	if(user_div_obj==null || groupName == null || groupName ==''){
		return false;
	}
	var forms = user_div_obj.childNodes;
	var index = null;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.name==groupName){
				index = i;
			}
			form.childNodes[0].style.display="none";
		}
		if(index!=null){
			forms[index].childNodes[0].style.display="";
		}
		
	}
}


/**
 * 修改所选的用户组样式
 * @param obj
 */
function manageDir(obj){
	if(obj==null){
		return ;
	}
	//修改被选中的按钮的颜色
	var tableObj = obj.parentNode.parentNode.parentNode.parentNode;
	var tbodyObjs = tableObj.childNodes;
	for(var k = 0 ; k<tbodyObjs.length ; k++){
		var tbodyObj = tbodyObjs[k];
		var trObjs = tbodyObj.childNodes;
		if(trObjs!=null&&trObjs.length>0){
			for(var i = 0 ; i < trObjs.length ; i++){
				var trObj = trObjs[i];
				if(trObj.className !=''){
					trObj.className="svn_group_table_tr";
				}
			}
		}
	}
	var current_trObj =  obj.parentNode.parentNode;
	current_trObj.className="svn_group_table_tr select_input";
}

function addDir(table_id,group_div_id){
	var groupId = 'dir'+makeRandom(8);
	var authz = [{path:"",id:groupId}];
	var html = createDirHTML(authz);
	var table_obj = document.getElementById(table_id);
	table_obj.innerHTML = html + table_obj.children[0].innerHTML;
	var inputObj = table_obj.children[0].children[0].children[1].children[0];
	
	html = createGroupAuthHTML(authz);
	var group_div_obj = document.getElementById(group_div_id);
	
	var forms = group_div_obj.childNodes;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			form.childNodes[0].style.display="none";
		}
	}
	
	group_div_obj.innerHTML = html+group_div_obj.innerHTML;
	var user_table_obj = document.getElementById(groupId);
	user_table_obj.style.display="";
	
	if(inputObj != null){
		manageDir(inputObj);
		inputObj.focus();
	}
}

/**
 * 删除目录
 * @param table_id
 * @param name
 */
function delDir(table_id,name){
	var table_obj = document.getElementById(table_id);
	var checkBoxs = getcheckBoxbyNameStatus(name,table_obj,true);
	if(checkBoxs!=null && checkBoxs.length>0){
		//alert("确定删除用户组");
		var result = window.confirm("确定删除目录?");
		if(result){
			for(var i = 0 ; i < checkBoxs.length ; i++){
				var checkBox = checkBoxs[i];
				//var groupName = checkBox.value;
				var trObj = checkBox.parentNode.parentNode;
				var groupName = trObj.getAttribute('name');
				var user_table_obj = document.getElementById(groupName);
				if(user_table_obj!=null){
					//删除用户组
					var form = user_table_obj.parentNode;
					form.parentNode.removeChild(form);
				}
				//删除目录
				var trObj = checkBox.parentNode.parentNode;
				trObj.parentNode.removeChild(trObj);
			}
		}
	}else{
		alert("请选择要删除的目录！");
	}
	
}

/**
 * group非空校验
 * @param obj
 */
function checkDirNull(obj){
	var flag = false;
	if(obj!=null&&obj.value!=null){
		if(obj.value==''){
			flag = true;
		}
	}

	if(flag){
		//alert("输入项不能为空！");
		obj.style.border="1px solid red";
		obj.focus();
	}else{
		obj.style.border="0px solid red";
		var checkBoxObj = obj.parentNode.parentNode.childNodes[0].childNodes[0];
		checkBoxObj.value=obj.value;
		obj.setAttribute("value", obj.value);
	}
}
/**
 * user非空校验
 * @param obj
 */
function checkGroupNull(obj){
	var flag = false;
	if(obj!=null&&obj.value!=null){
		if(obj.value==''){
			flag = true;
		}
	}

	if(flag){
		//alert("输入项不能为空！");
		obj.style.border="1px solid red";
		obj.focus();
	}else{
		obj.style.border="0px solid red";
		//obj.setAttribute("value", obj.value);
	}
}

function addDirGroup(group_div_id){
	var group_div_obj = document.getElementById(group_div_id);
	if(group_div_obj == null){
		return false;
	}
	var forms = group_div_obj.children;
	var FlagNULL = true;

	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.childNodes[0].style.display==""){
				var group = {name:''};
				var tableObj = form.childNodes[0];
				var tbodyObj = tableObj.childNodes[0];
				//var trObjs = tbodyObj.childNodes;
				var inputObj = null;
				var html = GetGroupTdHTML(group);
				tbodyObj.innerHTML = html +tbodyObj.innerHTML;
				inputObj = tbodyObj.childNodes[0].childNodes[1].childNodes[0];
				if(inputObj!=null){
					//inputObj.focus();
				}
				FlagNULL = false;
				break;
			}
		}

	}
	if(FlagNULL){
		alert("请选择目录 ！");
	}
}

function delDirGroup(group_div_id){
	var group_div_obj = document.getElementById(group_div_id);
	var forms = group_div_obj.childNodes;
	var index = null;
	var tableObj = null;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.childNodes[0].style.display==""){
				index = i;
				break;
			}
		}
	}
	if(index!=null){
		tableObj = forms[index].childNodes[0];
	}
	var name = 'group';
	var checkBoxs = getcheckBoxbyNameStatus(name,tableObj,true);
	if(checkBoxs!=null && checkBoxs.length>0){
		//alert("确定删除用户组");
		var result = window.confirm("确定删除所选用户组?");
		if(result){
			for(var i = 0 ; i < checkBoxs.length ; i++){
				var checkBox = checkBoxs[i];
				var ck_tdObj = checkBox.parentNode;
				var text_tdObj = document.getElementById(checkBox.value).parentNode;
				var trObj = ck_tdObj.parentNode;
				//删除用户
				trObj.removeChild(ck_tdObj);
				trObj.removeChild(text_tdObj);
				trObj.parentNode.removeChild(trObj);
			}
		}
	}else{
		alert("请选择要删除的用户组！");
	}
}

function saveDirGroup(group_form_id,authPath){
	var group_form_obj = document.getElementById(group_form_id);
	var authz = [];
	if(group_form_obj!=null&&group_form_obj.length>0){
		for( var i = 0; i<group_form_obj.length; i++){
			var e = group_form_obj[i];
			if(e!=null&&e.type=='text'&&e.name=='groupNameText'){
				var dir = {};
				var path = e.value;
				var dirId = e.parentNode.parentNode.getAttribute('name');
				var groups = getAuthGroup(dirId);
				if(path==null || path == ''){
					alert('Error 目录不能为空！');
					e.style.border="1px solid red";
					return false;
				}
				dir.path = path;
				dir.id = dirId;
				dir.groups = groups;
				authz[authz.length] = dir;
			}
		}
	}
	var file = authToString(authz);
	var groupFile = saveGroup('group_form_id');
	if(groupFile == false){
		return ;
	}
	file = groupFile + file;
	
	var url = "AuthInfo.jsp";
	var params = {opt:"save",file:file,path:authPath};
	ajaxRequest({
		url:url,
		data:params,
		type:"POST",
		success:function(response){
			//var datas = StringToJson(response);
			alert(response);
		}
	});
}

function authToString(authz){
	var file = '\n\n';
	if(authz!=null&&authz.length>0){
		for( var i = 0; i<authz.length; i++){
			var dir = authz[i];
			var dirStr = '['+dir.path+']\n';
			var groups = dir.groups;
			for( var k = 0; k<groups.length; k++){
				var group = groups[k];
				var groupStr = '@'+group.name+'='+group.auth;
				dirStr +=groupStr+'\n';
			}
			file +=dirStr+'\n\n';
		}
	}
	file +='\n';
	return file;
}
function getAuthGroup(dirId){
	var group_table_obj = document.getElementById(dirId);
	var groups = [];
	if(group_table_obj==null){
		return groups;
	}
	var group_form_obj = group_table_obj.parentNode;
	if(group_form_obj!=null&&group_form_obj.length>0){
		for( var i = 0; i<group_form_obj.length; i++){
			var e = group_form_obj[i];
			if(e!=null&&e.tagName=='SELECT'&&e.name=='select_group_name'){
				if(e.value!=null && e.value !=''){
					var group = {};
					var trObj = e.parentNode.parentNode;
					var value = e.options[e.selectedIndex].text;
					group.name = value;
					group.auth = '';
					var r = getcheckBoxbyNameStatus('r',trObj,true);
					if(r!=null&&r.length==1){
						group.auth +='r'; 
					}
					var w = getcheckBoxbyNameStatus('w',trObj,true);
					if(w!=null&&w.length==1){
						group.auth +='w'; 
					}
					groups[groups.length]=group;
				}
			}
		}
	}
	return groups;
	
}


/*===============================用户============================*/

/**
 * 获取用户组
 * @param res
 * @returns
 */
function getGroupFromRes(res){
	if( res == null || res.length == 0){
		return null;
	}
	var len = res.length;
	var groups = [];
	var startIndex = len - 1;
	var endIndex = len - 1;
	//获取用户组在数组中开始和结束的索引位置
	for(var i = 0 ; i < len ; i++){
		var row = res[i];
		var firstChar = row[0];
		if(row == '[groups]'){
			startIndex = i ;
			continue;
		}
		if(firstChar == '[' && row != '[groups]'){
			endIndex = i;
			break;
		}
	}
	if(endIndex <= startIndex){
		return null;
	}
	
	//获取用户组信息，并存入数组groups中
	for(var i = startIndex + 1 ; i < endIndex ; i++ ){
		var row = trim(res[i]);
		if(row!='' && row!='\r'){
			var group = {};
			var group_user = row.split('=');
			var users = trim(group_user[1]);
			var n = 8;
			var groupId = 'group'+makeRandom(n);
			group.id = groupId;
			group.name = group_user[0];
			if(users == null || users.length == 0){
				users=[];
			}else{
				users = users.split(',');
				users = trims(users);
				users.sort();
			}
			group.users=users;
			groups[groups.length] = group;
		}
	}
	return groups;
}

/**
 * 获取用户组目录权限
 * @param res
 * @returns
 */
function getAuthFromRes(res){
	if( res == null || res.length == 0){
		return null;
	}
	var len = res.length;
	var startIndex = len - 1;
	var endIndex = len - 1;
	//获取用户组在数组中开始和结束的索引位置
	for(var i = 0 ; i < len ; i++){
		var row = res[i];
		var firstChar = row[0];
		if(firstChar == '[' && row != '[groups]'){
			startIndex = i;
			break;
		}
	}
	if(endIndex <= startIndex){
		return null;
	}
	
	//获取用户权限信息，并存入数组authz中
	var authz = [];
	var auth = null;
	var flag = false; //是否启用auth数组
	for(var i = startIndex ; i <= endIndex ; i++ ){
		var row = trim(res[i]);
		var firstChar = row[0];
		if(row!='' && row!='\r'){
			if( (firstChar == '[' && row != '[groups]') || (i == endIndex) ){
				if(i == endIndex && auth != null){
					auth[auth.length] = row;
				}
				if(flag==false){
					auth = [];
					flag = true;
				}else{
					var dir = {};
					var groups = [];
					var auth_dir = auth[0];
					var n = 8;
					var dirId = 'dir'+makeRandom(n);
					var path = auth_dir.substring(1,auth_dir.length-1);
					dir.path = path;
					for(var k = 1 ; k < auth.length; k++){
						var auth_group = auth[k];
						var auth_groups = null;
						var group = {};
						auth_group = auth_group.substring(1);
						auth_groups = auth_group.split("=");
						group.name = auth_groups[0];
						group.auth = auth_groups[1];
						groups[groups.length] = group;
					}
					dir.groups = groups; 
					dir.id = dirId;
					authz[authz.length] = dir;
					auth = null;
					flag = false;
					i--;
				}
			}
			if(auth != null){
				auth[auth.length] = row;
			}
		}
	}
	return authz;
}

function createGroupHTML(groups){
	var html = '';
	if(groups != null && groups.length > 0){
		html = '';
		for(var i = 0 ; i < groups.length ; i++){
			var group = groups[i];
			html +='<tr class="svn_group_table_tr" name="'+group.id+'">'
				+'<td class="svn_group_table_tr_td auth_checkbox">'
				+'<input  type="checkbox" name="groupName" value="'+group.name+'">'
				+'</td>'
				+'<td class="svn_group_table_tr_td auth_group_name">'
				+'<input onblur="checkNull(this,\'user_div_id\')" onclick="showUser(this,\'user_div_id\',groups)" class="group_name_input" type="text" name="groupNameText" value="'+group.name+'">'
				+'</td>'
				+'</tr>';
		}
	}
	return html;
}

function createUserHTML(groups){
	var html = '';
	var user_size = 1;
	if(groups != null && groups.length > 0){
		for(var i = 0 ; i < groups.length ; i++){
			var group = groups[i];
			//var groupName = group.name;
			var groupId = group.id;
			html += '<form name="'+groupId+'">';
			html +='<table class="user_group_table" id="'+group.id+'"  style="display: none;">';
			html +='';
			var users = group.users;
			html +=GetUserHTML(users,user_size);
			html +='<tr></tr></table>';
			html +='</form>';
		}
	}
	return html;
}

/**
 * 生成用户table行html代码
 * @param users
 * @param user_size
 */
function GetUserHTML(users,user_size){
	var html = '';
	if(users != null && users.length > 0){
		html +='<tr class="user_group_table_tr">';
		for(var k = 0 ; k < users.length ; k++){
			var user = users[k];
			html +=GetUserTdHTML(user);
			if((k+1)%user_size==0 && (k+1)<users.length){
				html +='</tr>';
				html +='<tr class="user_group_table_tr">';
			}
		}
		html +='</tr>';
	}
	return html;
}

/**
 * 生成用户行内代码
 * @param user
 * @returns {String}
 */
function GetUserTdHTML(user){
	var user_id = 'user'+makeRandom(8);
	var html ='<td class="user_group_table_tr_td auth_checkbox">'
		+'<input  type="checkbox" name="user" value="'+user_id+'">'
		+'</td>'
		+'<td class="user_group_table_tr_td user_group_name">'
		+'<input onblur="checkUserNull(this)"  class="user_name_input" id="'+user_id+'" type="text" name="user" value="'+user+'">'
		+'</td>'
		+'<td class="user_group_table_tr_td user_group_detail"></td>';
		
	return html;
}
/**
 * 展现当前所选的用户组及用户
 * @param obj
 * @param table_id
 * @param groups
 */
function showUser(obj,table_id){
	var trObj = obj.parentNode.parentNode;
	var groupName = trObj.getAttribute('name');
	var table_obj = document.getElementById(table_id);
	if(groupName == null || groupName == ''){
		table_obj.innerHTML = '';
		return ;
	}
	showUserTable(groupName,table_obj);
	manageUser(obj);
}

/**
 * 显示用户表格
 * @param groupName
 * @param user_div_obj
 * @returns {Boolean}
 */
function showUserTable(groupName,user_div_obj){
	if(user_div_obj==null || groupName == null || groupName ==''){
		return false;
	}
	var forms = user_div_obj.childNodes;
	var index = null;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.name==groupName){
				index = i;
			}
			form.childNodes[0].style.display="none";
		}
		if(index!=null){
			forms[index].childNodes[0].style.display="";
		}
		
	}
}

/**
 * 修改所选的用户组样式
 * @param obj
 */
function manageUser(obj){
	if(obj==null){
		return ;
	}
	//修改被选中的按钮的颜色
	var tableObj = obj.parentNode.parentNode.parentNode.parentNode;
	var tbodyObjs = tableObj.childNodes;
	for(var k = 0 ; k<tbodyObjs.length ; k++){
		var tbodyObj = tbodyObjs[k];
		var trObjs = tbodyObj.childNodes;
		if(trObjs!=null&&trObjs.length>0){
			for(var i = 0 ; i < trObjs.length ; i++){
				var trObj = trObjs[i];
				if(trObj.className !=''){
					trObj.className="svn_group_table_tr";
				}
			}
		}
	}
	var current_trObj =  obj.parentNode.parentNode;
	current_trObj.className="svn_group_table_tr select_input";
}



/**
 * 新增用户组
 * @param table_id
 */
function addGroup(table_id,user_id){
	var groupId = 'group'+makeRandom(8);
	var groups = [{name:"",id:groupId,users:[]}];
	var html = createGroupHTML(groups);
	var table_obj = document.getElementById(table_id);
	table_obj.innerHTML = html + table_obj.children[0].innerHTML;
	var inputObj = table_obj.children[0].children[0].children[1].children[0];
	
	html = createUserHTML(groups);
	var user_obj = document.getElementById(user_id);
	
	var forms = user_obj.childNodes;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			form.childNodes[0].style.display="none";
		}
	}
	user_obj.innerHTML = html+user_obj.innerHTML;
	var user_table_obj = document.getElementById(groupId);
	user_table_obj.style.display="";
	
	if(inputObj != null){
		manageUser(inputObj);
		inputObj.focus();
	}
}

/**
 * 删除用户组
 * @param table_id
 * @param name
 */
function delGroup(table_id,name){
	var table_obj = document.getElementById(table_id);
	var checkBoxs = getcheckBoxbyNameStatus(name,table_obj,true);
	if(checkBoxs!=null && checkBoxs.length>0){
		//alert("确定删除用户组");
		var result = window.confirm("确定删除用户组?");
		if(result){
			for(var i = 0 ; i < checkBoxs.length ; i++){
				var checkBox = checkBoxs[i];
				//var groupName = checkBox.value;
				var trObj = checkBox.parentNode.parentNode;
				var groupName = trObj.getAttribute('name');
				var user_table_obj = document.getElementById(groupName);
				if(user_table_obj!=null){
					//删除用户
					var form = user_table_obj.parentNode;
					form.parentNode.removeChild(form);
				}
				//删除用户组
				var trObj = checkBox.parentNode.parentNode;
				trObj.parentNode.removeChild(trObj);
			}
		}
	}else{
		alert("请选择要删除的用户组！");
	}
	
}

/**
 * 新增用户
 * @param user_div_id
 * @returns {Boolean}
 */
function addUser(user_div_id){
	var user_div_Obj = document.getElementById(user_div_id);
	if(user_div_Obj == null){
		return false;
	}
	var forms = user_div_Obj.children;
	var FlagNULL = true;

	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.childNodes[0].style.display==""){
				var user_size = 1;
				var user = '';
				var users = [user];
				var tableObj = form.childNodes[0];
				var tbodyObj = tableObj.childNodes[0];
				var trObjs = tbodyObj.childNodes;
				var inputObj = null;
				if(trObjs.length <= 1){
					var html = GetUserHTML(users,user_size);
					tbodyObj.innerHTML = html +'</tr><tr>' ;
					inputObj = tbodyObj.childNodes[0].childNodes[1].childNodes[0];
				}else{
					var trLastObj = trObjs[trObjs.length - 2];
					var tdObjs = trLastObj.childNodes;
					var html = GetUserTdHTML(user);
					if(tdObjs.length < user_size*2){
						trLastObj.innerHTML += html;
						var len = trLastObj.childNodes.length;
						inputObj = trLastObj.childNodes[len-1].childNodes[0];
					}else{
						trObjs[trObjs.length - 1].innerHTML = html;
						trObjs[trObjs.length - 1].className = 'user_group_table_tr';
						tbodyObj.innerHTML +='</tr><tr>';
					}
				}
				if(inputObj!=null){
					//inputObj.focus();
				}
				FlagNULL = false;
				break;
			}
		}

	}
	if(FlagNULL){
		alert("请选择用户组！");
	}
}


function delUser(user_div_id){
	var user_div_obj = document.getElementById(user_div_id);
	var forms = user_div_obj.childNodes;
	var index = null;
	var tableObj = null;
	if(forms != null && forms.length > 0){
		for(var i = 0 ; i < forms.length ; i++){
			var form = forms[i];
			if(form.childNodes[0].style.display==""){
				index = i;
				break;
			}
		}
	}
	if(index!=null){
		tableObj = forms[index].childNodes[0];
	}
	var name = 'user';
	var checkBoxs = getcheckBoxbyNameStatus(name,tableObj,true);
	if(checkBoxs!=null && checkBoxs.length>0){
		//alert("确定删除用户组");
		var result = window.confirm("确定删除所选用户?");
		if(result){
			for(var i = 0 ; i < checkBoxs.length ; i++){
				var checkBox = checkBoxs[i];
				var ck_tdObj = checkBox.parentNode;
				var text_tdObj = document.getElementById(checkBox.value).parentNode;
				var trObj = ck_tdObj.parentNode;
				//删除用户
				trObj.removeChild(ck_tdObj);
				trObj.removeChild(text_tdObj);
				trObj.parentNode.removeChild(trObj);
			}
		}
	}else{
		alert("请选择要删除的用户！");
	}
}
/**
 * group非空校验
 * @param obj
 */
function checkNull(obj,user_id){
	var flag = false;
	if(obj!=null&&obj.value!=null){
		if(obj.value==''){
			flag = true;
		}
	}

	if(flag){
		//alert("输入项不能为空！");
		obj.style.border="1px solid red";
		obj.focus();
	}else{
		var group_form_obj = document.getElementById('group_form_id');
		if(group_form_obj!=null&&group_form_obj.length>0){
			for( var i = 0; i<group_form_obj.length; i++){
				var e = group_form_obj[i];
				if(e!=null&&e.type=='text'&&e.name=='groupNameText'){
					if(e.value == obj.value && obj != e){
						alert("用户名已经使用，请修改为其他名称!");
						obj.focus();
						return false;
					}
				}
			}
		}
		
		obj.style.border="0px solid red";
		var checkBoxObj = obj.parentNode.parentNode.childNodes[0].childNodes[0];
		checkBoxObj.value=obj.value;
		obj.setAttribute("value", obj.value);
		var id = obj.parentNode.parentNode.getAttribute('name');
		var select_alls = document.getElementsByTagName("select");
		for(var i = 0 ; i < select_alls.length; i++){
			var select_obj = select_alls[i];
			var name = select_obj.getAttribute('name');
			if(name == "select_group_name"){
				var options = select_obj.children;
				var flag = true;
				for(var k = 0 ; k < options.length; k++){
					var option = options[k];
					var key = option.getAttribute('value');
					if(key == id){
						flag = false;
					}
				}
				if(flag){
					select_obj.innerHTML +='<option value="'+id+'">'+obj.value+'</option>';
				}
			}
		}
	}
}
/**
 * user非空校验
 * @param obj
 */
function checkUserNull(obj){
	var flag = false;
	if(obj!=null&&obj.value!=null){
		if(obj.value==''){
			flag = true;
		}
	}

	if(flag){
		//alert("输入项不能为空！");
		obj.style.border="1px solid red";
		obj.focus();
	}else{
		obj.style.border="0px solid red";
	}
}


/**
 * 获取用户列表
 * @param user_form_name
 * @returns {Array}
 */
function getUserByForm(user_form_name){
	var user_table_obj = document.getElementById(user_form_name);
	var user = [];
	if(user_table_obj==null){
		return user;
	}
	var user_form_obj = user_table_obj.parentNode;
	if(user_form_obj!=null&&user_form_obj.length>0){
		for( var i = 0; i<user_form_obj.length; i++){
			var e = user_form_obj[i];
			if(e!=null&&e.type=='text'&&e.name=='user'){
				if(e.value!=null && e.value !=''){
					user[user.length]=e.value;
				}
			}
		}
	}
	return user;
}

/**
 * 获取用户组列表并保存
 * @param group_form_id
 * @returns 
 */
function saveGroup(group_form_id){
	var group_form_obj = document.getElementById(group_form_id);
	var groups = [];
	if(group_form_obj!=null&&group_form_obj.length>0){
		for( var i = 0; i<group_form_obj.length; i++){
			var e = group_form_obj[i];
			if(e!=null&&e.type=='text'&&e.name=='groupNameText'){
				var group = {};
				var groupName = e.value;
				var groupId = e.parentNode.parentNode.getAttribute('name');
				var users = getUserByForm(groupId);
				if(groupName == null || groupName == ''){
					alert('Error 用户组不能为空！');
					e.style.border="1px solid red";
					return false;
				}
				group.name=groupName;
				group.id = groupId;
				group.users = users;
				groups[groups.length]=group;
			}
		}
	}
	var file = dataToString(groups);
	return file;
}

function dataToString(groups){
	var file = '\n[groups]\n';
	if(groups!=null&&groups.length>0){
		for( var i = 0; i<groups.length; i++){
			var group = groups[i];
			var users = group.users;
			var groupStr = group.name+"="+users.join(',');
			file +=groupStr+'\n';
		}
	}
	file +='\n';
	return file;
}






