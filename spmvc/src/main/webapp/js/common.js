/*================居中显示对象==================*/

/**
 * 设置对象在X方向居中显示
 * @param msgObj
 */
function setObjMiddleX(msgObj){
	if(msgObj){
		var msgWidth = msgObj.scrollWidth;  
	    var bgLeft=window.pageXOffset || document.documentElement.scrollLeft|| document.body.scrollLeft || 0;     
	    var bgWidth=document.documentElement.clientWidth || document.body.clientWidth || 0;   
	    var msgLeft=0; 
	    if(bgWidth>msgWidth){
	    	msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);
	    }else{
	    	msgLeft=bgLeft+10;
	    }
	    msgObj.style.position = "absolute";  
	    msgObj.style.left  = msgLeft+"px";  
	}
}

/**
 * 设置对象在Y方向居中显示
 * @param msgObj
 */
function setObjMiddleY(msgObj){
	if(msgObj){
		var msgHeight= msgObj.scrollHeight;  
	    var bgTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;  
	    var bgHeight=document.documentElement.clientHeight || document.body.clientHeight || 0;  
	    var msgTop=0;  
	    if(bgHeight>msgHeight){
	    	msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
	    }else{
	    	msgTop=bgTop+10;
	    }
	    msgObj.style.position = "absolute";  
	    msgObj.style.top      = msgTop+"px";  
	}
}

/**
 * 获取浏览器的高度和宽度（包含滚动条的长度）
 * @returns {___anonymous1442_1467}
 */
function getPageSize(){
	var bgHeight=document.documentElement.clientHeight || document.body.clientHeight || 0;
	var bgWidth=document.documentElement.clientWidth || document.body.clientWidth || 0;  
	return {"x":bgWidth,"y":bgHeight};
}

/**
 * 获取浏览器的被滚动条卷去高度和宽度（滚动条的长度）
 * @returns {___anonymous1795_1816}
 */
function  getPageScrollSize(){
	var bgTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var bgLeft=window.pageXOffset || document.documentElement.scrollLeft|| document.body.scrollLeft || 0;
	return {"x":bgLeft,"y":bgTop};
}

/**
 * 取得html元素的距离浏览器绝对位置（不包含滚动条的长度）
 * @param e
 * @returns {___anonymous1333_1348}
 */
function getAbsPoint(e){
	  var x = e.offsetLeft;
	  var y = e.offsetTop;
	  while(e = e.offsetParent){
		x += e.offsetLeft-e.scrollLeft;
	    y += e.offsetTop-e.scrollTop;
	  }
	  return {"x": x, "y": y};
};

/**
 * 去掉字符串前后空格
 * @param str
 * @returns
 */
function trim(str){   
	if(str == null || str =='' || str.length == 0){
		return str;
	}
    str = str.replace(/^(\s|\u00A0)+/,'');   
    for(var i=str.length-1; i>=0; i--){   
        if(/\S/.test(str.charAt(i))){   
            str = str.substring(0, i+1);   
            break;   
        }   
    }   
    return str;   
}

/**
 * 去掉字符串数组中所有字符串的前后空格
 * @param strs
 * @returns
 */
function trims(strs){
	if(strs == null || strs =='' || strs.length == 0){
		return strs;
	}
	var len = strs.length;
	for(var i = 0 ; i < len ; i++){
		var str = strs[i];
		str = trim(str);
		strs[i] = str;
	}
	return strs;
}



/*===================================Ajax=========================================*/
/**
 * 得到ajax对象
 */
function getAjaxHttp(){
	var xmlHttp = null;
	if(window.XMLHttpRequest){
		//非IE浏览器及IE7(7.0及以上版本)，用xmlhttprequest对象创建
		 xmlHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		//IE(6.0及以下版本)浏览器用activexobject对象创建,如果用户浏览器禁用了ActiveX,可能会失败.
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	} else{
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			alert("您的浏览器不支持AJAX！");
		}
	}
	return xmlHttp;
}

/**
 * 发送Ajax请求
 * url--url
 * type(post/get)
 * async (true(异步)|false(同步))
 * params(参数)
 * funName(回调方法名，不需要引号,这里只有成功的时候才调用)
 * (注意：这方法有二个参数，一个就是xmlHttp,一个就是要处理的对象)
 * objs需要到回调方法中处理的对象
 * @param obj
 */
function ajaxRequest(obj){
	//obj = {url:"",type:"",async:true,params:{},funName:"",objs:{}};
	var objType = typeof(obj);
	if(obj==null){
		alert("No Parameters");
	}else if(objType!="object"){
		alert("Please input Parameters");
	}else{
		if(obj.url==null){
			alert("Please configure URLs");
			return null;
		}
		if(obj.ContentType==null){
			obj.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
		}
		if(obj.type==null){
			obj.type="GET";
		}
		if(obj.async==null){
			obj.async=true;
		}
		if(obj.data!=null){
			var data = obj.data;
			var dataType = typeof(data);
			if( dataType =="object"){
				var paramstr = "";
				var k = 0;
				for(i in data){
					k==0?(k=1):(paramstr += "&");
					paramstr += i+"="+data[i];
				}
				obj.data=paramstr;
			}
		}
		if(obj.success==null){
			obj.success="CFun";
		}
		
	}
	
	var xmlHttp = getAjaxHttp();
	xmlHttp.open(obj.type,obj.url,obj.async);
	xmlHttp.setRequestHeader("Content-Type",obj.ContentType);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4){
			//HTTP响应已经完全接收才调用
			if(xmlHttp.status == 200){
				obj.success(xmlHttp.responseText,xmlHttp.statusText);
			}else{
				//http返回状态失败
				alert("服务端返回状态" + xmlHttp.statusText);
			}
		}else{
			//请求状态还没有成功，页面等待
		}
	};
	
	xmlHttp.send(obj.data);
	function CFun(){}
}


/**
 * 产生随机数
 * @param n
 * @returns
 */
function makeRandom(n){
	var pows = Math.pow(10,n);
	var floats = Math.random();
	var number = Math.floor(floats*pows);
	return number;
}

/**
 * String To JSON
 * @param Str
 * @returns
 */
function StringToJson(Str){
	if(Str==null||Str ==''){
		return null;
	}
	var json = null;
	if(Str.substr(0,1)=='{'){
		json = eval('['+Str+']')[0];
	}else{
		json  = eval(Str);
	}
	return json;
}

/**
 * json 转 String
 */
function JsonToString(o) {
    var arr=[];
    var fmt = function(s) { 
            if (typeof s == 'object' && s != null ) return JsonToString(s); 
            return /^(string|number)$/.test(typeof s) ? "\"" + s + "\"" : s; 
    };
    
    if(o instanceof Array){
        for (var i in o){
                arr.push(fmt(o[i]));
        }
        return '[' + arr.join(',') + ']';
            
    }
    else{
        for (var i in o){
                arr.push("\"" + i + "\":" + fmt(o[i]));
        }
        return '{' + arr.join(',') + '}'; 
    }
}; 

/**
 * 
 * URL处理
 * @param url
 * @param paramName
 * @param paramValue
 * @returns
 */
function addUrlParam(url,paramName,paramValue){
    if(url==null||url==''){
        return null;
    }
    if(paramName==null||paramName==''){
        return url;
    }
    if(url.indexOf('?')>0){
        url+='&'+paramName+'='+paramValue;
    }else{
        url+='?'+paramName+'='+paramValue;
    }
    return url;
} 

/**
 * 获取对象的宽度和位置信息
 * @param obj
 * @returns
 */
function getElementPos(obj){
	if(obj==null){
		return null;
	}
	var objPos = {};
	var msgWidth = obj.scrollWidth;
	var msgHeight= obj.scrollHeight;
	var left = obj.offsetLeft;
	var top = obj.offsetTop;
	objPos.width = msgWidth;
	objPos.height = msgHeight;
	objPos.left = left;
	objPos.top = top;
	return objPos;
}

/**
 * 获取页面宽度信息
 * @param obj 页面对象 value : (this , parent)
 * @returns windowPos 窗体信息
 */
function getWindowPos(obj){
	if(obj==null){
		obj = this;
	}
	//窗体信息
	var windowPos = {};
	
	//被滚动条卷曲的宽度
    var bgLeft=obj.window.pageXOffset   
			    || obj.document.documentElement.scrollLeft   
			    || obj.document.body.scrollLeft || 0;
    windowPos.left = bgLeft;
    
    //页面可视宽度
    var bgWidth=obj.document.documentElement.clientWidth   
    			||obj.document.body.clientWidth || 0;
    windowPos.width = bgWidth;
    
    //被滚动条卷曲的高度
    var bgTop=obj.window.pageYOffset   
			    || obj.document.documentElement.scrollTop   
			    || obj.document.body.scrollTop || 0;
    windowPos.top = bgTop;
    //页面可视高度
	var bgHeight=obj.document.documentElement.clientHeight   
				|| obj.document.body.clientHeight || 0;
	windowPos.height = bgHeight;
    return windowPos;
}

/**
 * 获取对象下的所有输入项的key value
 * @param obj
 * @returns {___anonymous7697_7698}
 */
function getInputItems(obj){
	var inputs = obj.getElementsByTagName("input");
	var childselect = obj.getElementsByTagName("select");
	var childtextarea = obj.getElementsByTagName("textarea");
	var json = {};
	if(inputs!=null&&inputs.length>0){
		//如果如输入项为输入框
		for(var i=0;i<inputs.length;i++){
			var input = inputs[i];
			var key = input.name;
			var value = input.value;
			json[key]=value;
		}
	}

	if(childselect!=null&&childselect.length>0){
		//如果输入项为下拉框
		for(var i = 0;i<childselect.length;i++){
			var select = childselect[i];
			var key = select.name;
			var value = select.value;
			json[key]=value;
		}
	}

	if(childtextarea!=null&&childtextarea.length>0){
		//如果输入项为文本域
		for(var i = 0;i<childtextarea.length;i++){
			var textarea = childtextarea[i];
			var key = textarea.name;
			var value = textarea.value;
			json[key]=value;
		}
	}
	return json;
}

/**
 * 获取对象下的所有输入项对象
 * @param obj
 * @returns {___anonymous8679_8680}
 */
function getInputObjs(obj){
	var inputs = obj.getElementsByTagName("input");
	var childselect = obj.getElementsByTagName("select");
	var childtextarea = obj.getElementsByTagName("textarea");
	var json = {};
	if(inputs!=null&&inputs.length>0){
		//如果如输入项为输入框
		for(var i=0;i<inputs.length;i++){
			var input = inputs[i];
			var key = input.name;
			//var value = input.value;
			json[key]=input;
		}
	}

	if(childselect!=null&&childselect.length>0){
		//如果输入项为下拉框
		for(var i = 0;i<childselect.length;i++){
			var select = childselect[i];
			var key = select.name;
			//var value = select.value;
			json[key]=select;
		}
	}

	if(childtextarea!=null&&childtextarea.length>0){
		//如果输入项为文本域
		for(var i = 0;i<childtextarea.length;i++){
			var textarea = childtextarea[i];
			var key = textarea.name;
			//var value = textarea.value;
			json[key]=textarea;
		}
	}
	return json;
}

/**
 * 通过名字获取checkbox
 * @param name
 * @param obj
 * @returns {Array}
 */
function getcheckBoxbyName(name,obj){
	if(obj==null){
		obj = document;
	}
	var inputArrays = obj.getElementsByTagName("input");
	var checkboxs =[];
	if(inputArrays!=null&&inputArrays.length>0){
		for(var i=0;i<inputArrays.length;i++){
			var input = inputArrays[i];
			if(input.type=='checkbox'&&input.name==name){
				checkboxs[checkboxs.length]=input;
			}
		}
	}
	return checkboxs;
}

/**
 * 通过复选框上级，复选框名称，复选框被选中状态,获取obj下所有的复选框
 * @param name
 * @param obj
 * @param status
 * @returns {Array}
 */
function getcheckBoxbyNameStatus(name,obj,status){
	if(obj==null){
		obj = document;
	}
	var inputArrays = obj.getElementsByTagName("input");
	var checkboxs =[];
	if(inputArrays!=null&&inputArrays.length>0){
		if(status == null){
			for(var i=0;i<inputArrays.length;i++){
				var input = inputArrays[i];
				if(input.type=='checkbox'&&input.name==name){
					checkboxs[checkboxs.length]=input;
				}
			}
		}else if(status == true){
			for(var i=0;i<inputArrays.length;i++){
				var input = inputArrays[i];
				if(input.checked&&input.type=='checkbox'&&input.name==name){
					checkboxs[checkboxs.length]=input;
				}
			}
		}else if(status == false){
			for(var i=0;i<inputArrays.length;i++){
				var input = inputArrays[i];
				if(!input.checked&&input.type=='checkbox'&&input.name==name){
					checkboxs[checkboxs.length]=input;
				}
			}
		}
	}
	return checkboxs;
}

/**
 * 获取表单数据
 * @param formObj
 * @returns
 */
function getFormData(formObj){
	if(formObj!=null&&formObj.length>0){
		var json = {};
		for( var i = 0; i<formObj.length; i++){
			var e = formObj[i];
			if(e!=null){
				json[e.name] = e.value;
			}
		}
		return json;
	}
	return null;
}


/**
 * js 实现Map
 *Array.prototype.remove = function(s) { 
 * for (var i = 0; i < this.length; i++) { 
 *  if (s == this[i]) 
 *   this.splice(i, 1); 
 * } 
 *}  
 * Simple Map 
 * 
 * 
 * var m = new Map(); 
 * m.put('key','value'); 
 * ... 
 * var s = ""; 
 * m.each(function(key,value,index){ 
 *   s += index+":"+ key+"="+value+"\n"; 
 * }); 
 * alert(s); 
 * 
 * @author zouqone 
 * @date 2013-05-29 
 */ 
function Map() { 
     /** 存放键的数组(遍历用到) */ 
     this.keys = new Array(); 
     /** 存放数据 */ 
     this.data = new Object(); 
      
     /** 
      * 放入一个键值对 
      * @param {String} key 
      * @param {Object} value 
      */ 
     this.put = function(key, value) { 
          if(this.data[key] == null){ 
             this.keys.push(key); 
          } 
          this.data[key] = value; 
     }; 
      
     /** 
      * 获取某键对应的值 
      * @param {String} key 
      * @return {Object} value 
      */ 
     this.get = function(key) { 
          return this.data[key]; 
     }; 
      
     /** 
      * 删除一个键值对 
      * @param {String} key 
      */ 
     //this.remove = function(key) { 
     // this.keys.remove(key); 
     // this.data[key] = null; 
     //}; 
      
     /** 
      * 遍历Map,执行处理函数 
      * 
      * @param {Function} 回调函数 function(key,value,index){..} 
      */ 
     this.each = function(fn){ 
          if(typeof fn != 'function'){ 
               return; 
          } 
          var len = this.keys.length; 
          for(var i=0;i<len;i++){ 
               var k = this.keys[i]; 
               fn(k,this.data[k],i); 
          } 
     }; 
      
     /** 
      * 获取键值数组(类似Java的entrySet()) 
      * @return 键值对象{key,value}的数组 
      */ 
     this.entrys = function() { 
          var len = this.keys.length; 
          var entrys = new Array(len); 
          for (var i = 0; i < len; i++) { 
               entrys[i] = { 
                    key : this.keys[i], 
                    value : this.data[i] 
               }; 
          } 
          return entrys; 
     }; 
      
     /** 
      * 判断Map是否为空 
      */ 
     this.isEmpty = function() { 
        return this.keys.length == 0; 
     }; 
      
     /** 
      * 获取键值对数量 
      */ 
     this.size = function(){ 
        return this.keys.length; 
     }; 
      
     /** 
      * 重写toString 
      */ 
     this.toString = function(){ 
          var s = "{"; 
          for(var i=0;i<this.keys.length;i++,s+=','){ 
               var k = this.keys[i]; 
               s += k+"="+this.data[k]; 
          } 
          s+="}"; 
          return s; 
     }; 
}


/**
 * 把一个节点插入到另一个节点的后面或者前面，默认为后面
 * @param obj
 * @param html
 * @param position { after before null }
 * @returns {Boolean}
 */
function insertHTMLToObj(obj,html,position){
	if(obj == null || html == null){
		return false;
	}
	var parent = obj.parentNode;
	var objs = htmlToObj(html);
	if(position==null||position=='after'){
		for (var i = 0; i < objs.length; i++) { 
			var newElement = objs[objs.length-i-1];
			 if(parent.lastChild==obj){
				 parent.appendChild(newElement);
			 }else{
				 parent.insertBefore(newElement,obj.nextSibling);
			 }
		}
	}else{
		for (var i = 0; i < objs.length; i++) { 
			var newElement = objs[objs.length-i-1];
			parent.insertBefore(newElement,obj);
		}
	}
}

/**
 * 从html代码转化为对象
 * @param a
 * @returns {Array}
 */
function htmlToObj(a) { 
    var r = []; 
    //如果参数不是数组，强行转换 
    if (a.constructor != Array){
        a = [a]; 
    } 
    for (var i = 0; i < a.length; i++) { 
        if (a[i].constructor == String) { 
            //用一个临时变量存放HTML 
            var div = document.createElement("div");
            var html = a[i];
            var head_html = html.substr(1,2);
            var objs = [];
            if(head_html == 'tr'){
            	//注入HTML，转换成DOM结构 
                div.innerHTML = '<table>'+a[i]+'</table>'; 
                objs = div.children[0].children[0].childNodes;
            }else if(head_html == 'td'){
            	//注入HTML，转换成DOM结构 
                div.innerHTML = '<table><tr>'+a[i]+'</tr></table>'; 
                objs = div.children[0].children[0].children[0].childNodes;
            }else{
            	//注入HTML，转换成DOM结构 
                div.innerHTML = a[i]; 
                objs = div.childNodes;
            }
            //提取DOM结构到临时div中 
            for (var j = 0; j < objs.length; j++){
            	r[r.length] = objs[j]; 
            }
        } 
        else if (a[i].length) { 
            // 假定是DOM节点数组 
            for (var j = 0; j < a[i].length; j++) 
                r[r.length] = a[i][j]; 
        } 
        else { 
            //否则假定是DOM节点 
            r[r.length] = a[i]; 
        } 
    } 
    return r; 
}
/**
 * 设置下拉输入框值
 * @param selectObj
 * @param value
 * @returns {Boolean}
 */
function setSelectValue(selectObj,value){
	var options = selectObj.children;
	if(options == null || options.length==0){
		return false;
	}
	for(var i = 0 ; i < options.length ; i++){
		var option = options[i];
		var key = option.getAttribute('value');
		if(key == value){
			option.setAttribute("selected","true");
		}else{
			option.removeAttribute('selected');
		}
	}
	return true;
}

/**
 * 删除数组中的某个元素
 * @param array 数组
 * @param e 元素
 * @returns Array 数组
 */
function ArrayRemove(array,e){
	if(array == null || array.length == 0 || e == null){
		return array;
	}
	var index = -1;
	for (var i = 0; i < array.length; i++) {
		if(array[i] == e){
			index = i;
			break;
		}
	}
	if(index > -1){
		array.splice(index, 1);
	}
	return array;
}

/**
 * 数组去掉重复制
 * @param array
 * @returns
 */
function ArrayUnique(array){
	if(array!=null && array.length>0){
		var a = [array[0]];
		for(var i = 1 ; i< array.length ; i++){
			e = array[i];
			var flag = true;
			for(var k = 0 ; k < a.length; k++){
				if(a[k]==e){
					flag = false;
					break;
				}
			}
			if(flag == true){
				a[a.length] = e;
			}
		}
		array = a;
	}
	return array;
}

/**
 * 删除json的下一级子元素
 * @param json
 * @param e
 * @returns
 */
function JsonRemove(json,e){
	if(json == null || e == null){
		return json;
	}
	if(json instanceof Array){
		json = ArrayRemove(json,e);
	}else{
		var new_json = {};
        for (var i in json){
        	new_json[i]=json[i];
        }
    }
	return json;
}

function flushSelect(obj){
	if(obj == null){
		return false;
	}
	var options = obj.children;
	if(options!=null && options.length>0){
		for(var i = 0 ; i< options.length; i++){
			var option = options[i];
			var text = option.text;
			var value = option.value;
			var selected = option.getAttribute('selected');
			if(selected == 'selected' || selected == 'true'){
				//option.setAttribute('selected','true');
				//option.selected = true;
				//option.removeAttribute('selected');
				obj.selectedIndex=i;
				//break;
			}
			option.removeAttribute('selected');
		}
	}
}


function flushAllSelect(obj){
	var type = typeof(obj);
	obj = type=='object'?obj:document.getElementById(obj);
	if(obj==null){
		obj = document;
	}
	var selectObjs = obj.getElementsByTagName("select");
	if(selectObjs!=null && selectObjs.length>0){
		for(var i = 0 ; i< selectObjs.length; i++){
			var selectObj = selectObjs[i];
			flushSelect(selectObj);
		}
	}
	return true;
}

/**
 * 获取下一节点
 * @param e
 * @returns
 */
function getNextNode(e){
	if(e == null){
		return null;
	}
	var nextnode=e.nextSibling;
	while(nextnode.nodeType!=1){
		nextnode=nextnode.nextSibling;
	}
	return nextnode;
}


function DateFormat(date , fmt){
	  var o = {
		"M+" : date.getMonth() + 1, //月份   
		"d+" : date.getDate(), //日   
		"h+" : date.getHours(), //小时   
		"H+" : date.getHours(), //小时  
		"m+" : date.getMinutes(), //分   
		"s+" : date.getSeconds(), //秒   
		"q+" : Math.floor((date.getMonth() + 3) / 3), //季度   
		"S" : date.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for ( var k in o){
		if (new RegExp("(" + k + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;   
}

Date.prototype.format = function(style) {
	  var o = {
	    "M+" : this.getMonth() + 1, //month
	    "d+" : this.getDate(),      //day
	    "h+" : this.getHours(),     //hour
	    "m+" : this.getMinutes(),   //minute
	    "s+" : this.getSeconds(),   //second
	    "w+" : "天一二三四五六".charAt(this.getDay()),   //week
	    "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
	    "S"  : this.getMilliseconds() //millisecond
	  };
	  if(/(y+)/.test(style)) {
	    style = style.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  }
	  for(var k in o){
	    if(new RegExp("("+ k +")").test(style)){
	      style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
	    }
	  }
	  return style;
};

function getStrFormIndex(str,s,index){
	if(str == null || s == null){
		return null;
	}
	if(index == null){
		index = 0;
	}
	var array = str.split(s);
	if(index < 0 || index > array.length-1){
		return null;
	}
	return array[index];
	
}
//event.srcElement ? event.srcElement : event.target;

function firstCharUpperCase(str){
	if(str == null){
		return str;
	}
	str = str.replace(/(^|\s+)\w/g,function(s){return s.toUpperCase();});
	return str;
}





