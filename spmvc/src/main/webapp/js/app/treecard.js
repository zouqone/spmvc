



function filter(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
	for (var i=0, l=childNodes.length; i<l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}

function getSelectNode(){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	return treeObj.getSelectedNodes();
}

function freshTreeNode(treeObj,opt){
	if(opt==null){return;}
	var nodes = treeObj.getSelectedNodes();
	var node = nodes[0];
	if(node==null){return ;} //没有选择结点不刷新
	var hasChild = node.hasChild; //是否有子结点
	var flag = 1;  // 1 刷新当前结点、0 刷新父节点
	var code = null; //选择的数据
	if(opt == null || opt == "addSave"){
		if(hasChild == true){
			treeObj.reAsyncChildNodes(node, "refresh");
			code = node.id;
		}else{
			var parentNode = node.getParentNode();
			treeObj.reAsyncChildNodes(parentNode, "refresh");
			code = node.id;
			node = getChildNodeById(parentNode,code);
			if(node == null){
				treeObj.selectNode(parentNode,true);
				code = parentNode.id;
			}else{
				treeObj.selectNode(node,true);
				code = node.id;
				treeObj.reAsyncChildNodes(node, "refresh");
			}
		}
	}else if(opt == "editSave"){
		var parentNode = node.getParentNode();
		treeObj.reAsyncChildNodes(parentNode, "refresh");
		code = node.id;
		node = getChildNodeById(parentNode,code);
		if(node == null){
			treeObj.selectNode(parentNode,true);
			code = parentNode.id;
		}else{
			treeObj.selectNode(node,true);
			code = node.id;
		}
		
	}else if(opt == "delete"){
		var parentNode = node.getParentNode();
		if(parentNode.children.length>=2){
			treeObj.reAsyncChildNodes(parentNode, "refresh");
			treeObj.selectNode(parentNode,true);
			code = parentNode.id;
		}else{
			var parent2Node = parentNode.getParentNode();
			if(parent2Node!=null){
				treeObj.reAsyncChildNodes(parent2Node, "refresh");
				code = parentNode.id;
				//parentNode = getChildNodeById(parent2Node,code);
				parentNode =  treeObj.getNodeByParam("id", code, parent2Node);
				if(parentNode==null){
					treeObj.selectNode(parent2Node,true);
					code = parent2Node.id;
				}else{
					treeObj.selectNode(parentNode,true);
					code = parentNode.id;
				}
				
			}else{
				treeObj.refresh();
			}
		}
	}else if(opt == "fresh"){
		var parentNode = node.getParentNode();
		if(parentNode!=null){
			code = node.id;
			var isOpen = node.open;
			treeObj.reAsyncChildNodes(parentNode, "refresh");
			//node = getChildNodeById(freshCurrentNode,code);
			node =  treeObj.getNodeByParam("id", code, parentNode);
			if(node == null){
				treeObj.selectNode(parentNode,true);
				code = parentNode.id;
			}else{
				if(isOpen){
					treeObj.reAsyncChildNodes(node, "refresh");
				}
				treeObj.selectNode(node,true);
				code = node.id;
			}
		}else{
			treeObj.refresh();
		}
	}
	
	var data = queryDataByCode(code)
	loadCard(data,formID);
}

function getChildNodeById(parentNode,id){
	var vnode  = null;
	if(parentNode.hasChild){
		var nodes = parentNode.children;
		for(var i = 0 ; i <nodes.length ; i++ ){
			var node = nodes[i];
			if(node.id == id){
				vnode = node;
				break;
			}
		}
	}
	return vnode;
}


function ajaxSave(urls,data,async,callback){
	var info = null;
		async = async==null?false:async;
		jQuery.ajax({  
			url: urls, async : async,type: "POST",dataType : 'text',
			data : data,
			success: function(response) {
				info = response;
				if(callback){
					callback(info);
				}
			},
			error: function(e){alert(e);}
		});
		return info;
}

function ajaxDel(urls,param,async){
		var datas = [];
		async = async==null?false:async;
		 jQuery.ajax({  
			url: urls, async : async,type: "POST",
			data : param,
			success: function(response) {
				info = response;
			},
			error: function(e){alert(e);}
		});
		return info;
}
function ajaxData(urls,param,async){
		var datas = [];
		async = async==null?false:async;
		 jQuery.ajax({  
			url: urls, async : async,type: "POST",
			data : param,
			success: function(response) {
				if(response!=null&&response!=''){
					datas = eval("("+response+")");
				}
			},
			error: function(e){alert(e);}
		});
		return datas;
}	
function loadCard(data,formID){
	if(data!=null){
		var formObj = jQuery('#'+formID);
		for(var i in data){
			if(i==null){continue;}
			var name = i;
			var value = data[i];
			var inputObj = jQuery('[name="'+i+'"]',formObj)[0];
			if(inputObj!=null){
				jQuery(inputObj).val(value);
			}
		}
		jQuery('[name="pk"]',formObj).val(data.id);
	}else{
		clearCard();
	}
	
}

function clearCard(){
	var formObj = jQuery('#'+'form1');
	jQuery('input',formObj).val(null);
}

function initButtonStatus(){
	setScanStatus();
}

function setEditStatus(){
	var buttonStatus = [{name:"add",status : 1}
	,{name:"modify",status : 1}
	,{name:"delete",status : 1}
	,{name:"fresh",status : 1}
	,{name:"cancel",status : 0}
	,{name:"save",status : 0}];
	setButtonDisable(buttonStatus);
	var formObj = jQuery('#'+'form1');
	//jQuery('input',formObj).attr("readOnly",false);
	jQuery('input',formObj).attr("disabled",false);
}

function setScanStatus(){
	var buttonStatus = [{name:"add",status : 0}
	,{name:"modify",status : 0}
	,{name:"delete",status : 0}
	,{name:"fresh",status : 0}
	,{name:"cancel",status : 1}
	,{name:"save",status : 1}];
	setButtonDisable(buttonStatus);
	var formObj = jQuery('#'+'form1');
	//jQuery('input',formObj).attr("readOnly",true);
	jQuery('input',formObj).attr("disabled",true);
}

function setButtonDisable(inputs){
	if(inputs!=null){
		for(var i = 0 ; i < inputs.length ; i++){
			var status = inputs[i].status;
			if(status=="0"){
				jQuery('input[name="'+inputs[i].name+'"]').removeClass("buttonDisable");
			}else{
				jQuery('input[name="'+inputs[i].name+'"]').addClass("buttonDisable");
			}
		}
	}
}

function getCardData(formObj){
	if(formObj!=null&&formObj.length>0){
		var json = {};
		for( var i = 0; i<formObj.length; i++){
			var e = formObj[i];
			if(e!=null){
				if(e.name != "pk"){
					json[e.name] = e.value==""?null:e.value;
				}else{
					json["id"] = e.value==""?null:e.value;
				}
			}
		}
		return json;
	}
	return null;
}



