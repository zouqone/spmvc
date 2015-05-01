/**
 * 
 */
function createWinBox(winBoxObj){
	winBoxObjDefalut = {
			id:"winbox_"+makeRandom(8)
			,width:"300px"
			,height:"auto"
			,title:"WinBox"
			,div:""
			,headclass:""
	};
	winBoxObj = winBoxObj==null?winBoxObjDefalut:winBoxObj;
	var win_box_id = winBoxObj.id==null?("winbox_"+makeRandom(8)):winBoxObj.id;
	var win_box_height = winBoxObj.height == null?"auto":winBoxObj.height;
	var win_box_width = winBoxObj.width == null?"300px":winBoxObj.width;
	var title = winBoxObj.title == null?"WinBox":winBoxObj.title;
	var div = winBoxObj.div == null?"":winBoxObj.div;
	var headclass = winBoxObj.headclass == null?"":winBoxObj.headclass;
	if(div != ""){
		var type = typeof(div);
		div = type=='object'?div:document.getElementById(div);
		div = div.innerHTML;
	}
	var content = div;
	var winBoxHTML = "";
	winBoxHTML += '<div class="win_div" id="'+win_box_id+'" style="width: '+win_box_width+';height:'+win_box_height+';">';
	winBoxHTML += '<div class="win_titlebar win_draggable win_header win_font '+headclass+'"  id="win_box_head_id">';
	winBoxHTML += '<span id="win_id_1" class="win_box_title">'+title+'</span>';
	winBoxHTML += '<button class="win_button" type="button" onclick="closeWin('+win_box_id+')">';
	winBoxHTML += '<span class="win_button_icon"></span>';
	winBoxHTML += '</button></div>';
	winBoxHTML += '<div class="win_box win_content" style="height: auto;max-height: none;min-height: 107px;width: auto;">';
	winBoxHTML += ''+content;
	winBoxHTML += '</div>';
	winBoxHTML += '<div class="win_bottom">';
	winBoxHTML += '<input class="win_input_button" type="button" value="ok" onclick="win_ok('+win_box_id+')">&nbsp;&nbsp;';
	winBoxHTML += '<input class="win_input_button" type="button" value="cancel" onclick="win_cancel('+win_box_id+')">';
	winBoxHTML += '';
	winBoxHTML += '</div>';
	winBoxHTML += '</div>';
	winBoxHTML += '';
	var winBoxDiv = document.createElement("div");
	winBoxDiv.innerHTML = winBoxHTML;
	var winbox = winBoxDiv.children[0];
	document.body.appendChild(winbox);
	winbox.style.display="";
	setObjMiddleX(winbox);
	setObjMiddleY(winbox);
	$(function() {
		$( "#"+win_box_id ).draggable({handle:"div.win_header",containment:"window"});
	});
	return win_box_id;
}

function closeWin(obj){
	var type = typeof(obj);
	obj = type=='object'?obj:document.getElementById(obj);
	var win_box_obj = obj;
	//win_box_obj.style.display="none";
	win_box_obj.parentNode.removeChild(win_box_obj);
}
function win_ok(obj){
	closeWin(obj);
}
function win_cancel(obj){
	closeWin(obj);
}

/*搜索选择弹出框*/
function selectRecord(obj){
	var objName = "checkboxName";
	
	var listObj = getNextNode(obj.parentNode);
	var tableObj =listObj.children[0].children[0].children[0];
	var checkboxAllObj = tableObj.children[0].children[0].children[0].children[0];
	var checkboxName = checkboxAllObj.getAttribute(objName);
	var checkboxs =getcheckBoxbyNameStatus(checkboxName,tableObj,true);
	
	var html = "";
	if(checkboxs!=null&&checkboxs.length>0){
		for(var i=0;i<checkboxs.length;i++){
			var inputs = checkboxs[i];
			var value = inputs.value;
			html += getSelectRecordHTML(value);
		}
	}else{
		alert("请选择记录!");
	}
	var fontDivObj = getNextNode(listObj);
	var selectedDivObj = getNextNode(fontDivObj);
	selectedDivObj.innerHTML += html;
	
}

/**
 * 通过数据生成已选择记录的html代码
 * @param data
 * @returns {String}
 */
function getSelectRecordHTML(data){
	if(data == null || data == ''){
		return '';
	}
	var html = '<div class="selectedRecordDiv">';
	html += '<span class="record_name">'+data+' </span><span>';
	html += '<a onclick="delSelectedRecordDiv(this)">&nbsp;&nbsp;删除</a>';
	html += '</span>';
	html += '<input type="hidden" name="repos_input_hidden" value="'+data+'">';
	html += '</div>';
	html += '';
	return html;
}


/**
 * 删除弹出框中已选择的Repos
 * @param obj
 */
function delSelectedRecordDiv(obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var div_obj = obj.parentNode.parentNode;
	div_obj.parentNode.removeChild(div_obj);
	return true;
}






