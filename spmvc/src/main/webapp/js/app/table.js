
/*==================获取信息======================*/
function queryByCondition(url,condition){
	//var condition = '';
	var datas = null;
	ajaxRequest({
		url:url,async:false,type:"POST",
		data:{opt:"queryByCondition",condition:condition},
		success:function(response){
			datas = response;
		}
	});
	datas = StringToJson(datas);
	return datas;
}

/**
 * 刷新表单
 * @param url
 * @param pageSize
 * @param pageNum
 * @returns {___anonymous953_1016}
 */
function freshTable(url,pageSize,pageNum){
	var id="table_form_id";
	if(pageSize == null || pageNum == null){
		var page_span_id = "page_span_id";
		var pageInfo = getPageInfo(page_span_id);
		pageSize = pageInfo.pageSize;
		pageNum = pageInfo.pageNum;
	}
	var table_obj = document.getElementById(id);
	var condition = " limit "+(pageNum-1)*pageSize+","+pageSize+" ";
	var datas = queryByCondition(url,condition);
	var currentPageCounts = 0;
	if(datas!=null){
		clearTable(id);
		loadTable(table_obj,datas);
		currentPageCounts = datas.length;
	}
	return {pageCounts:currentPageCounts,pageNum:pageNum,pageSize:pageSize};
}


/*==================================翻页条==================================*/
/**
 * 从数据查询出记录总数
 * @param url
 * @returns
 */
function getPageCounts(url){
	var data = null;
	ajaxRequest({
		url:url,async:false,type:"POST",
		data:{opt:"getCount",condition:''},
		success:function(response){
			data = parseInt(response);
		}
	});
	return data;
}

/**
 * 获取分页信息
 * @param obj
 * @returns
 */
function getPageInfo(obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	if(obj == null){
		return null;
	}
	var pageSize = parseInt(obj.getAttribute("pageSize"));
	var pageNum = parseInt(obj.getAttribute("pageNum"));
	var counts = getPageCounts(url);
	var pageLastNum = Math.ceil(counts/pageSize); 
	return {counts:counts,pageSize:pageSize,pageNum:pageNum,pageLastNum:pageLastNum};
}

/**
 * 刷新分析条
 * @param url
 * @param id
 */
function freshPageCount(url,id){
	var data = null;
	ajaxRequest({
		url:url,async:false,type:"POST",
		data:{opt:"getCount",condition:''},
		success:function(response){
			data = parseInt(response);
		}
	});
	var span_obj = document.getElementById(id);
	var pageInfo = getPageInfo(span_obj); 
	showPageHTML(id,pageInfo.counts,pageInfo.pageNum,pageInfo.pageSize);
	
	//span_obj.innerHTML = html;
}


/**
 * 生成HTML代码，显示翻页条
 * @param obj
 * @param counts
 * @param pageNum
 * @param pageSize
 */
function showPageHTML(obj,counts,pageNum,pageSize){
	var html = '&nbsp;共条&nbsp;<b>'+counts+'</b>&nbsp;记录 &nbsp;-&nbsp;';
	var pageLastNum = Math.ceil(counts/pageSize);
	pageLastNum = counts<1? 1:pageLastNum;
	var firstPage = pageNum == 1?'':'class="is_click" onclick="showFlipPage(url,this,\'first\')"';
	var prePage = pageNum == 1?'':'class="is_click" onclick="showFlipPage(url,this,\'pre\')"';
	var nextPage = pageNum == pageLastNum?'':'class="is_click" onclick="showFlipPage(url,this,\'next\')"';
	var lastPage = pageNum == pageLastNum?'':'class="is_click"  onclick="showFlipPage(url,this,\'last\')"';
	html += '<a '+firstPage+'>首页</a>&nbsp;';
	html += '<a '+prePage+'>上一页</a>&nbsp;';
	html += '<a '+nextPage+'>下一页</a>&nbsp;';
	html += '<a '+lastPage+'>末页 </a>';
	html += '&nbsp;- &nbsp;第 '+pageNum+'/'+pageLastNum+' 页&nbsp;显示'+((pageNum-1)*pageSize+1)+'至'+(pageNum)*pageSize+'条&nbsp;';
	html += '转到第<input type="text" name="toPageNumber" value="">页&nbsp;';
	html += '<a onclick="showGoPage(url,this)">跳转 </a>';
	html += '';
	var span_obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	span_obj.innerHTML = html;
	span_obj.setAttribute('counts',counts);
}

/**
 * 跳转到指定页面
 * @param url
 * @param obj
 */
function showGoPage(url,obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var span_obj = obj.parentNode;
	var inputObj = span_obj.getElementsByTagName("input");
	var pageNum = inputObj[0].value;
	var pageInfo = getPageInfo(span_obj); 
	if(pageNum >= 1 && pageNum <= pageInfo.pageLastNum){
		var counts = getPageCounts(url);
		freshTable(url,pageInfo.pageSize,pageNum);
		span_obj.setAttribute("pageNum",pageNum);
		showPageHTML(span_obj,counts,pageNum,pageInfo.pageSize);
	}

}

/**
 * 根据事件类型进行翻页
 * @param url
 * @param obj
 * @param type
 * @returns {___anonymous4955_5025}
 */
function showFlipPage(url,obj,type){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var span_obj = obj.parentNode;
	var pageInfo = getPageInfo(span_obj); 
	var counts = getPageCounts(url);
	var pageSize = pageInfo.pageSize;
	var pageNum = pageInfo.pageNum;
	//判断跳转到哪一页
	switch(type){
	case 'first':
		pageNum = 1;
		break;
	case 'pre':
		pageNum--;
		break;
	case 'next':
		pageNum++;
		break;
	case 'last':
		pageNum = pageInfo.pageLastNum;
		break;
	default:
		
	}
	
	var pageObj = freshTable(url,pageInfo.pageSize,pageNum);
	var pageCounts = pageObj.pageCounts;
	span_obj.setAttribute("pageNum",pageNum);
	showPageHTML(span_obj,counts,pageNum,pageSize);	
	return {counts:counts,pageCounts:pageCounts,pageNum:pageNum,pageSize:pageSize};
}


/*====================加载表格数据========================*/

/**
 * 加载数据
 * @param obj
 * @param datas
 * @param index
 * @returns {Boolean}
 */
function loadTable(obj,datas,index){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	if(obj == null){
		return false;
	}
	index = index == null ?0:index;
	var checkboxAllObj = getcheckBoxbyNameStatus('table_form_checkbox_all',obj)[0];
	var checkboxName = checkboxAllObj == null?'':checkboxAllObj.getAttribute('checkboxName');
	var trHeadObj = checkboxAllObj.parentNode.parentNode;
	var evenClassName = trHeadObj.getAttribute('evenClassName');
	checkboxAllObj.checked = false;
	if(datas!=null&&datas.length>0){
		for(var i=0;i<datas.length;i++){
			var data = datas[i];
			var number = i+1+index;
			var html = createDataTrHTML(data,number,checkboxName,evenClassName);
			var len = obj.children[0].children.length;
			var lastTrObj = obj.children[0].children[len-1];
			insertHTMLToObj(lastTrObj,html,'before');
		}
	}
	return true;
}

/**
 * 生成数据行HTML代码
 * @param data
 * @param number
 * @param checkboxName
 * @param evenClassName
 * @returns
 */
function createDataTrHTML(data,number,checkboxName,evenClassName){
	if(data == null || number == null){
		return null;
	}
	evenClassName = evenClassName==null?'':evenClassName;
	var username = data.username == null?'':data.username;
	var age = data.age==null?'':data.age;
	var email = data.email==null?'':data.email;
	var id = data.id==null?'':data.id;
	var info = data.info==null?'':data.info;
	var password = data.password == null ?'':data.password;
	var sex = data.sex==null?'':data.sex;
	var address = data.address==null?'':data.address;
	var toggleTr = (number)%2==1?'':evenClassName;
	
	//生成HTML代码
	var html = '<tr class="data_table_tr '+toggleTr+'" id="'+id+'" onclick="onClikTrSelectCheckbox(this)">';
	html += '<td style="" class="data_table_td input_checkbox_head" >';
	html += '<input type="checkbox" name="'+checkboxName+'" value="'+username+'" ></td>';
	html += '<td style="text-align: center;" class="data_table_td">'+number+'</td>';
	html += '<td style="" class="data_table_td">'+username+'</td>';
	html += '<td style="" class="data_table_td">'+password+'</td>';
	html += '<td style="" class="data_table_td">'+sex+'</td>';
	html += '<td style="" class="data_table_td">'+age+'</td>';
	html += '<td style="" class="data_table_td">'+address+'</td>';
	html += '<td style="" class="data_table_td">'+email+'</td>';
	html += '<td style="" class="data_table_td">'+info+'</td>';
	html += '</tr>';
	html += '';
	
	return html;
}


/**
 * 清除表单数据
 * @param obj
 * @returns {Boolean}
 */
function clearTable(obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var table_obj = obj;
	if(table_obj == null){
		return false;
	}
	var tr_objs = table_obj.children[0].children;
	if(tr_objs!=null&&tr_objs.length>2){
		var len = tr_objs.length;
		for(var i=1;i < len-1;i++){
			var tr_obj = tr_objs[len-i-1];
			tr_obj.parentNode.removeChild(tr_obj);
		}
	}
	return true;
}

/**
 * 新增记录
 * @param obj
 * @param url
 * @param page
 */
function addData(obj,url,page){
	var datas = [{}];
	var index = 0;
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	page = typeof(page)=='object'?page:document.getElementById(page);
	var pageInfo = getPageInfo(page); 
	var pageLastNum = pageInfo.pageLastNum;
	var pageNum = pageInfo.pageNum;
	if(pageNum < pageLastNum){
		var pageObj = showFlipPage(url,page.children[0],'last');
		index = pageObj.pageCounts;
	}else{
		index = obj.children[0].children.length-2;
	}
	loadTable(obj,datas,index);
}

/**
 * 编辑记录
 * @param obj
 * @param url
 */
function editData(obj,url){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var checkboxs =getRecordCheckboxObj(obj);
	var arrays =[];
	if(checkboxs!=null){
		if(checkboxs.length==1){
			for(var i=0;i<checkboxs.length;i++){
				var checkboxInput = checkboxs[i];
				var trObj = checkboxInput.parentNode.parentNode;
				arrays[i]=getInputItems(trObj);
			}
		}else if(checkboxs.length > 1){
			alert("只能选择一条记录！");
		}else{
			alert("请选择一条记录！");
		}
	}

	//var dataStr = JsonToString(arrays);
	//alert(dataStr);
	
}

/**
 * 删除记录
 * @param obj
 * @param url
 */
function delData(obj,url){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var checkboxs =getRecordCheckboxObj(obj);
	var arrays =[];
	if(checkboxs!=null){
		if(checkboxs.length > 0){
			for(var i=0;i<checkboxs.length;i++){
				var checkboxInput = checkboxs[i];
				var trObj = checkboxInput.parentNode.parentNode;
				
				arrays[i]=getInputItems(trObj);
				
			}
		}else{
			alert("请选择一条或多条记录！");
		}
	}
}

function insertData(obj,url){
	
}


/**
 * 获取表格被选中的复选框对象列表
 * @param obj
 * @returns
 */
function getRecordCheckboxObj(obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var tableObj = obj;
	var objName= 'table_form_checkbox_all';
	var checkboxAllObj = getcheckBoxbyNameStatus(objName,tableObj)[0];
	var checkboxName = checkboxAllObj == null?'':checkboxAllObj.getAttribute('checkboxName');
	var checkboxs =getcheckBoxbyNameStatus(checkboxName,tableObj,true);
	return checkboxs;
}

/**
 * 通过元素名称和全选对象实现全选事件
 * @param objName
 * @param obj
 */
function toggleCheckBox(objName,obj){
	var checkboxAllObj = obj.children[0];
	var checkboxName = checkboxAllObj.getAttribute(objName);
	var tableObj =obj.parentNode.parentNode.parentNode;
	var checkboxs =getcheckBoxbyName(checkboxName,tableObj);
	if(checkboxs!=null&&checkboxs.length>0){
		if(checkboxAllObj.checked){
			for(var i=0;i<checkboxs.length;i++){
				var inputs = checkboxs[i];
				if(!inputs.checked){
					inputs.checked=true;
				}
			}
		}else{
			for(var i=0;i<checkboxs.length;i++){
				var inputs = checkboxs[i];
				if(inputs.checked){
					inputs.checked=false;
				}
			}
		}
	}
}

/**
 * 点击行选择或取消复选
 * @param obj
 */
function onClikTrSelectCheckbox(obj){
	var eventOvj = window.event || arguments.callee.caller.arguments[0];
	var currentClickObj = eventOvj.srcElement || eventOvj.target;
	var currentTagName = currentClickObj.tagName;
	if( currentTagName == 'TR' || currentTagName == 'TD'){
		obj = typeof(obj)=='object'?obj:document.getElementById(obj);
		var tableObj = obj.parentNode.parentNode;
		var objName= 'table_form_checkbox_all';
		var checkboxAllObj = getcheckBoxbyNameStatus(objName,tableObj)[0];
		var checkboxName = checkboxAllObj == null?'':checkboxAllObj.getAttribute('checkboxName');
		var checkboxs =getcheckBoxbyNameStatus(checkboxName,obj);
		var checkboxObj = checkboxs[0];
		
		if(checkboxObj!=null){
			if(checkboxObj.checked){
				checkboxObj.checked = false;
			}else{
				checkboxObj.checked = true;
			}
		}
	}
}

function onClikTdSelectCheckbox(obj){
	obj = typeof(obj)=='object'?obj:document.getElementById(obj);
	var tableObj = obj.parentNode.parentNode.parentNode.parentNode;
	var objName= 'table_form_checkbox_all';
	var checkboxAllObj = getcheckBoxbyNameStatus(objName,tableObj)[0];
	var checkboxName = checkboxAllObj == null?'':checkboxAllObj.getAttribute('checkboxName');
	var checkboxs =getcheckBoxbyNameStatus(checkboxName,obj);
	var checkboxObj = checkboxs[0];
	if(checkboxObj!=null){
		if(checkboxObj.checked){
			checkboxObj.checked = false;
		}else{
			checkboxObj.checked = true;
		}
	}
}












