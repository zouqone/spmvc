<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
request.setAttribute("basePath",basePath);
%>
   <%
	String username	= (String)session.getAttribute("account"); 
    session.setAttribute("account", "zous");
	int flag = (username==null)?0:1;
	String sessionId = session.getId();
	//System.out.println("upload -- Session Id : "+sessionId);
	Cookie cookie = new Cookie("JSESSIONID", sessionId);
	response.addCookie(cookie);
	%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>文件上传</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="${basePath}js/uploadify3.2.1/uploadify.css" type="text/css" charset="utf-8" />
	<link rel="stylesheet" href="${basePath}css/style.css" type="text/css" charset="utf-8" />
 	<script type="text/javascript" src="${basePath}js/jquery/jquery-1.10.2.js"></script>
 	<script type="text/javascript" src="${basePath}js/uploadify3.2.1/jquery.uploadify.js"></script>
  </head>
  
  <body>
      <div id="uploadPanel">
      	  <h2>文件上传</h2>
      	  <div id="fileView">
      	  <input type="file" name="file" id="fileupload"/>
      	  </div>
      	  <div id="foo"></div>
      	  <div id="info"></div>
      	  <div id="btnCon">
      	  <input type="button" name="start" value="开始上传" onclick="uploadifyUpload()" style="margin-left:auto;margin-right: auto;"/>
      	  </div>
      	  <p style="color:red;font-size:18px;">
      	  注意事项：uploadify需要Flash player 10.0以上版本,否则火狐下上传组件失效
      	  </p>
      </div>
      
      <script type="text/javascript">
      $(document).ready(function() {
    	  var urls = '<%=request.getContextPath()%>/FileAction/uploadFile.do?jsessionid=<%=request.getSession().getId() %>';
    	  $('#fileupload').uploadify({ 
    		width: 100,
    		height:22,
    		swf: '${basePath}js/uploadify3.2.1/uploadify.swf',
    		uploader: urls,   
    		auto: false,
    		fileObjName: 'file',
    		fileTypeExts: '*.jpg;*.gif;*.png;*.bmp;*.doc;*.docx;*.xls;*.xlsx;*.ppt;*.pptx;*.txt;*.rar;*.zip;',
    		fileSizeLimit: 20971520,
    		checkExisting: true,
    		method: 'post',  
    		removeCompleted : false,
    		buttonText:'浏览',
    		queueSizeLimit: 5,
    		displayData: 'percentage',
    		queueID:'foo',
    		cancelImg: '${basePath}js/uploadify3.2.1/uploadify-cancel.png',
    		onUploadProgress: function(file, fileBytesLoaded, fileTotalBytes){
    			var filename = file.name;
    			var loaded = fileBytesLoaded < 1024*1024 ? (fileBytesLoaded / 1024).toFixed(2) + "KB" : (fileBytesLoaded / (1024*1024)).toFixed(2) + "MB";
    			var total = fileTotalBytes < 1024*1024 ? (fileTotalBytes / 1024).toFixed(2) + "KB" : (fileTotalBytes / (1024*1024)).toFixed(2) + "MB";
    			var percent = ((fileBytesLoaded / fileTotalBytes) * 100).toFixed(2) + "%";
    			var information = "文件名：" + filename + "<br/>上传进度：" + percent + "<br/>已上传："+loaded + "/" + total + "<br/>";
    			$("#info").append(information);
    		 },
    		 onUploadSuccess : function(file, data, response){
    			 $("#info").append("文件" + file.name + "上传成功！<br/>");
    		 },
    		 onQueueComplete: function() {
    			 $("#info").append("文件全部上传成功！<br/>");
    			 //window.location = "${basePath}file/listFile.do";
    			 //document.myform.submit();
    		 },
    		 onUploadError : function(file, errorCode, errorMsg){
    			 if(errorCode == -200){
    				 $("#info").append("文件" + file.name + "大小超过最大限制20M！<br/>");
    			 }
    			 $("#info").append("文件" + file.name + "上传失败！<br/>");
    		 }
    		
    	});
      });
      
      function uploadifyUpload(){ 
    	   $('#fileupload').uploadify('upload','*');
      } 
      </script>
      
  </body>
</html>
