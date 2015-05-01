
function showConnInfo(obj){
	var display = jQuery('#dbInfo_conn_id').css('display');
	if(display == 'none'){
		jQuery('#dbInfo_conn_id').css('display','');
		jQuery(obj).val('隐藏链接');
	}else{
		jQuery('#dbInfo_conn_id').css('display','none');
		jQuery(obj).val('显示连接');
	}
}

function showMakeCode(obj){
	var display = jQuery('#dbInfo_makeCode_div_id').css('display');
	if(display == 'none'){
		jQuery('#dbInfo_makeCode_div_id').css('display','');
		//jQuery(obj).val('隐藏链接');
	}else{
		jQuery('#dbInfo_makeCode_div_id').css('display','none');
		//jQuery(obj).val('显示连接');
	}
}

function getDbInfoToTree(){
	var dbInfoForm = jQuery("#dbInfo_id");
	var dbInfoJson = getInputItems(dbInfoForm[0]);
	return dbInfoJson;
}


function onCheck(e, treeId, treeNode) {
	//alert(treeNode.id+","+treeNode.name);
	
	var tableObj = jQuery("#node_table_id");
	var parentCodeObj = jQuery("input[name='parentncode']",tableObj);
	var parentNameObj = jQuery("input[name='parentname']",tableObj);
	if(treeNode.checked == true){
		parentCodeObj[0].value = treeNode.id;
		parentNameObj[0].value = treeNode.name;
	}else{
		parentCodeObj[0].value = null;
		parentNameObj[0].value = null;
	}
	
}

function setStatus(key){
	var status = {
			add:"新增",
			update:"修改",
			del:"删除"
	};
	var opt = key == null?"无":status[key];
	opt = "("+opt+")";
	jQuery("#opt_id").html(opt);
	jQuery("#opt_id").attr("status",key);
}

//设置字体  
function setFontCss(treeId, treeNode) {  
  if(treeNode.level==0){  
      return {'font-weight':'bold','color':'red'};  
  }else if(treeNode.level==1){  
      return {'font-weight':'bold','color':'green'};  
  }else if(treeNode.level==2){  
      return {'font-weight':'bold','color':'blue'};  
  }else{  
      return {};  
  }  
}

 
function setNodeValue(treeNode,tableId){
	tableId = tableId == null?"cur_node_table_id":tableId;
	var parentNode = treeNode.getParentNode();
	var tableObj = jQuery("#"+tableId);
	if(parentNode != null){
		jQuery("input[name='parentname']",tableObj).val(parentNode.name);
		jQuery("input[name='parentncode']",tableObj).val(parentNode.id);
	}
	jQuery("input[name='id']",tableObj).val(treeNode.uk);
	jQuery("input[name='ncode']",tableObj).val(treeNode.id);
	jQuery("input[name='nodename']",tableObj).val(treeNode.name);
	jQuery("input[name='nodedesc']",tableObj).val(treeNode.nodedesc);
	jQuery("input[name='link']",tableObj).val(treeNode.file);
}

function clearNodeValue(tableId){
	var tableObj = jQuery("#"+tableId);
	jQuery("input",tableObj).val(null);
}

/**
 * 获取已经选择的树节点
 * @param treeId
 * @returns
 */
function getSelectedNodes(treeId){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getSelectedNodes();
	return nodes;
}



function filter(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
	for (var i=0, l=childNodes.length; i<l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	var node = DBToTree(childNodes);
	childNodes = node.children;
	return childNodes;
}

function DBNameListToName(json){
	var dbInfoForm = jQuery("#dbInfo_id");
	var dbInfoJson = getInputItems(dbInfoForm[0]);
	if(json == null){
		return [];
	}
	var nodes = [];
	for(var i in json){
		var e = json[i];
		e= jQuery.trim(e);
		node = {};
		node.id = e;
		node.name = e;
		node.icon = baseUrl+"/images/db/db.png";
		//node.open = false;
		node.hasChild = true;
		node.isParent = true;
		nodes.push(node);
	}
	return nodes;
}

function DBToTree(json){
	if(json == null){
		return [];
	}
	var rootNode = {};
	var zNodes = [rootNode];
	var tableVoList = json.tableVoList;
	rootNode.id=json.name;
	rootNode.name=json.name;
	if(tableVoList!=null&&tableVoList.length>0){
		var level2 = [];
		for(var i in tableVoList){
			var tableVo = tableVoList[i];
			var node = {};
			node.id = tableVo.table_name;
			node.name = tableVo.table_name;
			node.comment = tableVo.comment;
			node.tableVo = tableVo;
			var level3 = columnListToNodes(tableVo);
			node.children = level3;
			node.icon = baseUrl+"/images/db/table.png";
			level2.push(node);
		}
		rootNode.children = level2;
	}
	return rootNode;
}

function columnListToNodes(tableVo){
	if(tableVo == null){
		return [];
	}
	var columnVoList = tableVo.columnVoList;
	var nodes = [];
	if(columnVoList!=null&&columnVoList.length>0){
		for(var i in columnVoList){
			var columnVo = columnVoList[i];
			var node = {};
			node.id = columnVo.field;
			node.name = columnVo.field;
			node.icon = baseUrl+"/images/db/column.png";
			nodes.push(node);
		}
	}
	return nodes;
}




//单击事件  
function beforeClickZtree(treeId, treeNode){  
    //alert(treeNode.id+","+treeNode.name); 
    if(treeNode.level==1){
    	
        var tableVo = treeNode.tableVo;
        var table_name = tableVo.table_name;
        var dbName = tableVo.dbName;
        
        var contentViewDiv = jQuery("#contentViewDiv");
        var tableDiv = jQuery("#tableDivId");
        var formTemplate = tableDiv.children("div[name='div_vo']")[0];
        var current_div = jQuery('[name="'+table_name+'"]',contentViewDiv);
        var current_db = contentViewDiv.attr('name');
        if(current_db!=null&&current_db != dbName){
        	var msg = "是从数据库"+current_db+"否切换到数据"+dbName+"?";
        	  //如果不是当前数据库，则清空当前区域所有的表
        	  if(confirm(msg)){
        		  //contentViewDiv.empty();
        		  var contentViewTable = jQuery('#contentViewTable');
        		  var templateTr = jQuery("tr[name='dbTable']",contentViewTable);
        		  while(templateTr.prev().length>0){
        			  templateTr.prev().remove();
        		  }
        	  }else{
        		  return ;
        	  }
        	
        }
        jQuery("#dbNameID").html(dbName);
        contentViewDiv.attr('name',dbName);
        
        if(current_div !=null&&current_div.length>0){
        	return ; //如果表已经存在，则不在创建该表
        }
        
    	var formVo = jQuery(formTemplate).clone();
    	formVo.attr("name",table_name);
    	formVo = loadForm(tableVo,formVo);
    	
    	formVo.appendTo(contentViewDiv);
    	
    	var dbConfigureInput = jQuery("[name=dbConfigure]",formVo);
    	var dbInfo_makeCode = jQuery('#dbInfo_makeCode_div_id');
    	var configureValue = dbConfigureInput.val();
    	if(configureValue == null || configureValue == ''){
    		clearConfigTemplate(dbInfo_makeCode);
    		initMakeCodeConfig(table_name,dbInfo_makeCode);
    		var data = getConfigureInfo(dbInfo_makeCode);
			var configureStr = JsonToString(data);
			dbConfigureInput.val(configureStr);
			clearConfigTemplate(dbInfo_makeCode);
    	}
    	var handleObj = jQuery('[name="head"]',formVo)[0];
    	var handle_id = "handle_"+table_name;
    	handleObj.id= handle_id;
    	$( formVo ).draggable({containment: contentViewDiv,handle :handleObj});
    	initTablePosition(contentViewDiv,formVo);
    	
    }
}

function initTablePosition(contentViewDiv,formVo){
	var contentViewTable = jQuery('#contentViewTable');
	var templateTr = jQuery("tr[name='dbTable']",contentViewTable);
	var widthLen = 4;
	var num = jQuery("div[dbType='table']",contentViewTable).length;
	
	var cols = num%widthLen+1;
	var rows = Math.round(num/widthLen)+1;
	
	if(num%widthLen==0){
		var trObj = templateTr.clone();
		templateTr.before(trObj);
		trObj.attr("name","tr"+rows);
	}
	var currentTrObj = templateTr.prev("tr");
	var tdObj = jQuery("[name='td"+cols+"']",currentTrObj);
	tdObj.attr("isNull","false");
	formVo.appendTo(tdObj);
}

function delTableNode(obj){
	var formDiv = jQuery(obj).parents("[dbType='table']")[0];
	var ctd = jQuery(formDiv).parent();
	jQuery(formDiv).remove();
	
	var contentViewTable = jQuery('#contentViewTable');
	var templateTr = jQuery("tr[name='dbTable']",contentViewTable);
	var lastTr = jQuery(templateTr).prev();
	var noNullTdNo = jQuery("[isNull='false']",lastTr).length;
	if(noNullTdNo >= 1){
		var lastTd = jQuery("[isNull='false']",lastTr)[noNullTdNo-1];
		jQuery(lastTd).children().appendTo(ctd);
		jQuery(lastTd).attr("isNull","true");
		if(noNullTdNo <= 1){
			lastTr.remove();
		}
	}
}

function loadForm(tableVo,formVo){
	//var tablename = tableVo.table_name;
	//jQuery("[name='tablename']",formVo).html(tablename+"("+tableVo.comment+")");
	//var titleTr = jQuery("[name='tablename']",formVo);
	var table_name = jQuery("[name='table_name']",formVo);
	var tcomment = jQuery("[name='tcomment']",formVo);
	table_name.val(tableVo.table_name);
	table_name[0].size = table_name[0].value.length;
	tcomment.val(tableVo.comment);
	//var tableObj = jQuery(formVo).children()[0];
	var columnVoList = tableVo.columnVoList;
	if(columnVoList!=null&&columnVoList.length>0){
		var columnTr = jQuery("[name='column']",formVo);
		for(var i = 0 ; i < columnVoList.length ; i++){
			var columnVo = columnVoList[i];
			var trObj =  columnTr.clone();
			//var tds = jQuery(trObj).children("td");
			//jQuery(tds[0]).html(columnVo.field);
			//jQuery(tds[1]).html(columnVo.type);
			//jQuery(tds[2]).html(columnVo.comment);
			var fieldInput = jQuery('[name="field"]',trObj);
			var typeInput = jQuery('[name="type"]',trObj);
			var commentInput = jQuery('[name="comment"]',trObj);
			fieldInput.val(columnVo.field);
			typeInput.val(columnVo.type);
			commentInput.val(columnVo.comment);
			columnTr.before(trObj);
		}
		columnTr.remove();
	}
	return formVo;
}


function initMakeCodeConfig(tableName,obj){
	var name = tableName.replace(/(^|\s+)\w/g,function(s){return s.toUpperCase();});
	var jspName = tableName.replace(/(^|\s+)\w/g,function(s){return s.toLowerCase();});
	var checkObjs = jQuery('input[type="checkbox"]',obj);
	//checkObjs.attr("checked","checked");
	clearConfigTemplate(obj);
	setCheckBoxsStatus(checkObjs,true);
	
	jQuery('input[type="text"][name="dao"]',obj).val("I"+name+"Dao");
	jQuery('input[type="text"][name="service"]',obj).val("I"+name+"Service");
	jQuery('input[type="text"][name="web"]',obj).val(""+name+"Action");
	jQuery('input[type="text"][name="vo"]',obj).val(""+name+"Vo");
	jQuery('input[type="text"][name="util"]',obj).val(""+name+"Util");
	jQuery('input[type="text"][name="configure"]',obj).val(""+name+"Configure");
	jQuery('input[type="text"][name="jsp"]',obj).val(""+name+"List");
	
	jQuery('input[type="text"][name="packagePath"]',obj).val("cn.log.app."+name.toLocaleLowerCase()+"");
	jQuery('input[type="text"][name="strutsxml"]',obj).val("cn/log/config/struts/struts-"+jspName+".xml");
	jQuery('input[type="text"][name="springxml"]',obj).val("cn/log/config/spring/applicationContext-"+jspName+".xml");
	jQuery('input[type="text"][name="jspPath"]',obj).val("app/jsp/"+jspName+"");
	
	jQuery('input[type="text"][name="images"]',obj).val("images/app/"+jspName+"");
	jQuery('input[type="text"][name="css"]',obj).val("css/app/"+jspName+"");
	jQuery('input[type="text"][name="js"]',obj).val("js/app/"+jspName+"");
	
}

function setMakeCodeConfig(data,obj){
	var checkObjs = jQuery('input[type="checkbox"]',obj);
	clearConfigTemplate(obj);
	jQuery('input[type="text"][name="dao"]',obj).val(data.dao);
	jQuery('input[type="text"][name="service"]',obj).val(data.service);
	jQuery('input[type="text"][name="web"]',obj).val(data.web);
	jQuery('input[type="text"][name="vo"]',obj).val(data.vo);
	jQuery('input[type="text"][name="util"]',obj).val(data.util);
	jQuery('input[type="text"][name="configure"]',obj).val(data.configure);
	jQuery('input[type="text"][name="jsp"]',obj).val(data.jsp);
	
	jQuery('input[type="text"][name="packagePath"]',obj).val(data.packagePath);
	jQuery('input[type="text"][name="strutsxml"]',obj).val(data.strutsxml);
	jQuery('input[type="text"][name="springxml"]',obj).val(data.springxml);
	jQuery('input[type="text"][name="jspPath"]',obj).val(data.jspPath);
	
	jQuery('input[type="text"][name="images"]',obj).val(data.images);
	jQuery('input[type="text"][name="css"]',obj).val(data.css);
	jQuery('input[type="text"][name="js"]',obj).val(data.js);
	
	var checkAllObjs = jQuery('input[type="checkbox"]',obj);
	for(var i = 0; i < checkAllObjs.length ; i++){
		var checkAllObj = checkAllObjs[i];
		var propetyName = jQuery(checkAllObj).attr("name");
		var ckName = propetyName+'_checked';
		var isChecked = data[ckName];
		if(isChecked!=null){
			checkAllObj.checked =isChecked;
		}else{
			checkAllObj.checked =false;
		}
	}
}

function updateEntityName(obj,orgName,entityName){
	var upattrs = 'dao,service,web,vo,util,configure,jsp'.split(',');;
	var lowattrs = 'packagePath,strutsxml,springxml,jspPath,images,css,js'.split(',');;
	
	var upOrgName = orgName.replace(/(^|\s+)\w/g,function(s){return s.toUpperCase();});
	var upEntityName = entityName.replace(/(^|\s+)\w/g,function(s){return s.toUpperCase();});
	replaceAttrs(upattrs,upOrgName,upEntityName,obj);
	
	var lowOrgName = orgName.replace(/(^|\s+)\w/g,function(s){return s.toLowerCase();});
	var lowEntityName = entityName.replace(/(^|\s+)\w/g,function(s){return s.toLowerCase();});
	replaceAttrs(lowattrs,lowOrgName,lowEntityName,obj);
	
	/*
	jQuery('[name="dao"]',obj).val(data.dao);
	jQuery('[name="service"]',obj).val(data.service);
	jQuery('[name="web"]',obj).val(data.web);
	jQuery('[name="vo"]',obj).val(data.vo);
	jQuery('[name="util"]',obj).val(data.util);
	jQuery('[name="configure"]',obj).val(data.configure);
	jQuery('[name="jsp"]',obj).val(data.jsp);
	
	jQuery('[name="packagePath"]',obj).val(data.packagePath);
	jQuery('[name="strutsxml"]',obj).val(data.strutsxml);
	jQuery('[name="springxml"]',obj).val(data.springxml);
	jQuery('[name="jspPath"]',obj).val(data.jspPath);
	
	jQuery('[name="images"]',obj).val(data.images);
	jQuery('[name="css"]',obj).val(data.css);
	jQuery('[name="js"]',obj).val(data.js);*/

}

function replaceAttrs(attrs,oldValue,newValue,obj){
	if(attrs == null){return ; }
	for(var i = 0 ; i < attrs.length ; i++){
		var attr = attrs[i];
		replaceAttr(attr,oldValue,newValue,obj);
	}
}

function replaceAttr(attr,oldValue,newValue,obj){
	var inputObj = jQuery('[name="'+attr+'"]',obj);
	if(inputObj==null){return ; }
	var value = inputObj.val();
	value = value.replace(oldValue,newValue);
	inputObj.val(value);
	
	
}

function clearConfigTemplate(obj){
	if(obj!=null){
		jQuery('input[type="checkbox"][checked]',obj).removeAttr("checked");
		jQuery('input[type="text"]',obj).val(null);
	}
}
function setCheckBoxStatus(checkbox,status){
	jQuery(checkbox)[0].checked = status;
}

/**
 * 设置复选框是否被选中
 * @param checkboxs 
 * @param status true ,false
 */
function setCheckBoxsStatus(checkboxs,status){
	for(var i = 0; i < checkboxs.length ; i++){
		var checkbox = checkboxs[i];
		setCheckBoxStatus(checkbox,status);
	}
}

function getConfigureInfo(obj){
	var checkedObjs = jQuery('input[type="checkbox"]',obj);
	var json = {};
	for(var i = 0; i < checkedObjs.length ; i++){
		var checkedObj = checkedObjs[i];
		var propetyName = jQuery(checkedObj).attr("name");
		var checkAll = jQuery(checkedObj).attr("checkAll");
		var ckName = propetyName+'_checked';
		if(checkedObj.checked == true){
			json[ckName]=true;
		}else{
			json[ckName]=false;
		}
		if(checkAll==null){
			var inputObj = jQuery('input[type="text"][name="'+propetyName+'"]',obj);
			json[propetyName]=inputObj.val();
		}
	}
	
	return json;
}

function filterConfig(config){
	var json = {};
	if(config != null){
		for( var key in config){
			var value = config[key];
			var strs = key.split('_');
			var checked = strs[1];
			var propetyName = strs[0];
			var isCheckAll = jQuery('[checkAll="'+propetyName+'"]')[0];
			if(strs.length>=2&&propetyName!='checkAll'&&isCheckAll==null&&checked=='checked'&&value==true){
				json[propetyName] = config[propetyName];
			}
		}
	}
	return json;
}

/**
 * 获取表格中所有信息
 * @param obj
 * @returns tableVo
 */
function getTableInfo(obj){
	var trObjs = jQuery("[name='column']",obj);
	var table_name = jQuery("[name='table_name']",obj).val();
	var tcomment = jQuery("[name='tcomment']",obj).val();
	var tableVo = {};
	var data = [];
	for(var i = 0 ; i<trObjs.length ; i++){
		var json = {};
		var trObj = trObjs[i];
		json = getInputItems(trObj);
		data.push(json);
	}
	tableVo.table_name = table_name;
	tableVo.comment = tcomment;
	tableVo.columnVoList = data;
	return tableVo;
}

/**
 * 全选反选事件
 * @param obj
 * @param checkAll
 * @param item
 */
function selectAllCheckbox(obj,checkAll,item){
	if(obj == null){
		return null;
	}
	var cks = null;
	var checkStatus = jQuery(obj)[0].checked;
	if(checkAll != null&&item!=null){
		var checkItem = jQuery(obj).attr(checkAll);
		if(checkItem==null||checkItem == ''){
			cks = jQuery('input['+item+'][type="checkbox"]');
			var ckAll = jQuery('input['+checkAll+'][type="checkbox"]');
			setCheckboxStatus(ckAll,checkStatus);
		}else{
			cks = jQuery('input['+item+'="'+checkItem+'"][type="checkbox"]');
		}
		setCheckboxStatus(cks,checkStatus);
	}
}

function setCheckboxStatus(cks,checkStatus){
	if(checkStatus){
		for(var i=0;i<cks.length;i++){
			var ck = cks[i];
			if(ck!=null&&!ck.checked){
				jQuery(ck)[0].checked =true;
			}
		}
	}else{
		for(var i=0;i<cks.length;i++){
			var ck = cks[i];
			if(ck!=null&&ck.checked){
				jQuery(ck)[0].checked =false;
			}
		}
	}
}




