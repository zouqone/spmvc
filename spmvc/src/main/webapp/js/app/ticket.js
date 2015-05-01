/**
 * 
 */

function getTickInfo(input_id,show_id){
	
	var url = "https://kyfw.12306.cn/otn/leftTicket/query";
	var params = {
		"leftTicketDTO.train_date":"2014-02-08"
		,"leftTicketDTO.from_station":"NNZ"
		,"leftTicketDTO.to_station":"BJP"
		,"purpose_codes":"ADULT"
		//,"":""
	};
	url +="?leftTicketDTO.train_date=2014-02-08&leftTicketDTO.from_station=NNZ&leftTicketDTO.to_station=BJP&purpose_codes=ADULT";
/*	ajaxRequest({
		url:url,
		data:{},
		type:"GET",
		success:function(response){
			//var datas = StringToJson(response);
			//alert(response);
			var show_obj = document.getElementById(show_id);
			show_obj.innerHTML = response;
		}
	});*/
	//params = {query:jsonStr};
	jQuery.ajax({
		type: "get",url:url,async:false,data:{},
		dataType:'text',
		complete: function(){
		},
		//请求成功时执行的回调函数
		success: function(respone){
			//appData = eval(respone);
			var show_obj = document.getElementById(show_id);
			show_obj.innerHTML = response;
		},
		error : function(e){
	          alert("异常！"); 
		}
	});
	
}






















