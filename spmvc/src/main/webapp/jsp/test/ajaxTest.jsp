<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ajaxTest</title>
<%@ include file="/jsp/basePage.jsp" %>

<script type="text/javascript">

function ajaxService(urls,data,async,callback){
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

function getService(){
	var message = null;
	
	var soapEnv = " \
        <soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:soap='http://schemas.microsoft.com/sharepoint/soap/'> \
           <soapenv:Body> \
              <soap:sayHello> \
                 <soap:arg0>Links</soap:arg0> \
              </soap:sayHello> \
           </soapenv:Body> \
        </soapenv:Envelope>";
     
    var url = "http://localhost:1212/hello";
    message = ajaxService(url,soapEnv);
    
	jQuery('#message').html(message);
}

</script>
</head>
<body>

<input type="button" name="ajax" value="GetService" onclick="getService()">
<div id="message">

</div> 

</body>
</html>