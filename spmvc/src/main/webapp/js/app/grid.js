
function initGrid(url,condition){
	gridObj =  initLigerUiGridServer(url,condition);
	return gridObj;
}


function initSlickGrid(url,condition){
  var grid = null;
  var columns = [
    {id: "id", name: "组件ID", field: "id"},
    {id: "comcategoryid", name: "组件分类ID", field: "comcategoryid"},
    {id: "code", name: "编码", field: "code"},
    {id: "name", name: "名称", field: "name"},
    {id: "detail", name: "描述", field: "detail"},
	{id: "createtime", name: "创建时间", field: "createtime"},
	{id: "creator", name: "创建人", field: "creator"},
	{id: "modifytime", name: "修改时间", field: "modifytime"},
	{id: "modifer", name: "修改人", field: "modifer"},
	{id: "ts", name: "时间戳", field: "ts"},
    {id: "dr", name: "删除标记", field: "dr"}
	
  ];

  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };
	var param = {condition : condition};
	if(condition == null){
		param = null;
	}
	var data = ajaxData(url,param);
    grid = new Slick.Grid("#myGrid", data, columns, options);
  
}

/**
*前台分页
*/
function initLigerUiGrid(url,condition){
	var columns = [
		   {display: '组件ID', name: 'id', align: 'left', width: 120 }
		 , {display: '组件分类ID', name: 'comcategoryid', align: 'left', width: 120 }
		 , {display: '编码', name: 'code', align: 'left', width: 120 }
		 , {display: '名称', name: 'name', align: 'left', width: 120 }
		 , {display: '描述', name: 'detail', align: 'left', width: 120 }
		 , {display: '创建时间', name: 'createtime', align: 'left', width: 120 }
		 , {display: '创建人', name: 'creator', align: 'left', width: 120 }
		 , {display: '修改时间', name: 'modifytime', align: 'left', width: 120 }
		 , {display: '修改人', name: 'modifer', align: 'left', width: 120 }
		 , {display: '时间戳', name: 'ts', align: 'left', width: 120 }
		 , {display: '删除标记', name: 'dr', align: 'left', width: 120 }
	];
	//debugger;
	var param = {condition : condition};
	if(condition == null){
		param = null;
	}
	var rows = ajaxData(url,param);
	var data = {Rows : rows,Total: 91};
	var setting = {
		columns : columns,data : data,
		pageSize: 10, sortName: 'code',
		width: '100%', height: '98%',
		checkbox: true,rownumbers:true,fixedCellHeight:false
	};
	var gridObj = jQuery('#myGrid').ligerGrid(setting);
	return gridObj;
}

/**
* 后台分页
*/
function initLigerUiGridServer(url,condition){
		
	var columns = [
		   {display: '组件ID', name: 'id', align: 'left', width: 120 }
		 , {display: '组件分类ID', name: 'comcategoryid', align: 'left', width: 120 }
		 , {display: '编码', name: 'code', align: 'left', width: 120 }
		 , {display: '名称', name: 'name', align: 'left', width: 120 }
		 , {display: '描述', name: 'detail', align: 'left', width: 120 }
		 , {display: '创建时间', name: 'createtime', align: 'left', width: 120 }
		 , {display: '创建人', name: 'creator', align: 'left', width: 120 }
		 , {display: '修改时间', name: 'modifytime', align: 'left', width: 120 }
		 , {display: '修改人', name: 'modifer', align: 'left', width: 120 }
		 , {display: '时间戳', name: 'ts', align: 'left', width: 120 }
		 , {display: '删除标记', name: 'dr', align: 'left', width: 120 }
	];
	//debugger;
	var param = {condition : condition};
	if(condition == null){
		param = null;
	}
	//var rows = ajaxData(url,param);
	//var data = {Rows : rows,Total: 91};
	var setting = {
		columns : columns, //data : data,
		url: url,parms: [], 
		dataType: 'server', dataAction:'server',usePager:true, 
		root: 'rows',  record: 'total',                    
		pageSize: 10, sortName: 'code',
		width: '100%', height: '98%',
		checkbox: true,rownumbers:true,fixedCellHeight:false
	};
	var gridObj = jQuery('#myGrid').ligerGrid(setting);
	return gridObj;
}
