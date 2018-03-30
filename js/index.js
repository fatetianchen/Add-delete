$.ajax({
	url: 'https://wechat-fans.gamepoch.com/api/users',
	type: "GET",
	dataType: "json",
	success: function(data){
		console.log(data);
		for(var i in data){
			$('.table').append("<tr class='tr-on'><td><img src="+data[i].headimg+" /></td><td>"+data[i].nickname+"</td><td>"+data[i].unionid+"</td><td>"+data[0].scoreRecords[0].score+"</td><td>"+data[0].scoreRecords[0].score+"</td></tr>")
	}
		
	},					
	error : function(err) {
	console.log(err);
	}
});
$('.arr-bth-z').click(function(){ //点击增加 弹出框，填写基本信息。
	$('.tz-mask').addClass('tanc-bk');	
	$('#us-id').val("");
	$('#us-img').val("");
	$('#us-name').val("");
	$('#arr-bth-x').css('display','none');
	$('#arr-bth-z').css('display','block');
	$('.arr-tanc-c').css('display','none');
	$('.tanc').css('display','block');
})
$('.tanc-xx').click(function(){
	$('.tz-mask').removeClass('tanc-bk');
});
$('#arr-bth-z').click(function(){//增加填写完信息后，点击提交发送至后台然后返回
	$.ajax({
		url: 'https://wechat-fans.gamepoch.com/api/users',
		type:'POST',
		dataType: "json",
		data:{
		  "unionid": $('#us-id').val(),
		  "headimg": $('#us-img').val(),
		  "nickname":$('#us-name').val(),
		},//false true
		success: function(data){
		console.log(data)
		$('.table').append("<tr class='tr-on'><td><img src="+data.headimg+" /></td><td>"+data.nickname+"</td><td>"+data.unionid+"</td><td>"+data.scoreRecords+"</td><td>"+data.scoreRecords+"</td></tr>");
		$('.tz-mask').removeClass('tanc-bk');
		},					
		error : function(err) {
		console.log(err);
		}
	});
})

var j =0;
var url_id ;
$(".table").on('click','.tr-on',function(){
	var i = $(this).index();
 	$('.table tr').css('background-color','#fff').eq(i).css('background-color','palegreen');
 	j =i;
});
$('.arr-bth-x').click(function(){ //点击修改弹出框并获取当前信息
	console.log(j);
	$('.tz-mask').addClass('tanc-bk');
	$('.arr-tanc-c').css('display','none');
	$('#arr-bth-z').css('display','none');
	$('.tanc').css('display','block');
	$('#arr-bth-x').css('display','block');
	var img = $('.table tr').eq(j).find("td:eq(0)>img").attr("src");
	var name = $('.table tr').eq(j).find("td:eq(1)").text();
	var id = $('.table tr').eq(j).find("td:eq(2)").text();
	var soc7 = $('.table tr').eq(j).find("td:eq(3)").text();
	var socz = $('.table tr').eq(j).find("td:eq(4)").text();
	$('#us-id').val(id);
	$('#us-img').val(img);
	$('#us-name').val(name);
	console.log(img+":"+name+":"+id+":"+soc7+":"+socz);
	var Rlname = [];
	$.ajax({
		url: 'https://wechat-fans.gamepoch.com/api/users',
		method:'GET',
		dataType: "json",
		data:{},//false true
		success: function(data){
			for(var i in data){
				if(name == data[i].nickname){
				Rlname.push(data[i]);
				console.log(data[i]);				
				}
			}
			var  url = Rlname[0]._id
			url_id = url;		
		},					
		error : function(err){
		console.log(err);
		}
	});	
});
$('#arr-bth-x').click(function(){ //修改指定的一行信息
	$.ajax({
		url: 'https://wechat-fans.gamepoch.com/api/users/'+url_id,
		method:'PATCH',
		dataType: "json",
		data:{
			"unionid": $('#us-id').val(),
			"headimg": $('#us-img').val(),
			"nickname":$('#us-name').val(),
		},//false true
		success: function(data){
			console.log(data);
			$('.tz-mask').removeClass('tanc-bk');
			$('.table tr').eq(j).find("td:eq(0)>img").text(data.headimg);
			$('.table tr').eq(j).find("td:eq(1)").text(data.nickname);
			$('.table tr').eq(j).find("td:eq(2)").text(data.unionid);
			
		},				
		error : function(err){
		console.log(err);
		}
	});
})
$('.arr-bth-s').click(function(){ //删除指定的一行信息
	console.log(j);
	var name = $('.table tr').eq(j).find("td:eq(1)").text();
	var Slname = [];
	$.ajax({
		url: 'https://wechat-fans.gamepoch.com/api/users',
		method:'GET',
		dataType: "json",
		data:{},//false true
		success: function(data){
			for(var i in data){
				if(name == data[i].nickname){
				Slname.push(data[i]);
				console.log(data[i]);				
				}
			}
			var  url = Slname[0]._id
			url_id = url;
			$.ajax({
				url: 'https://wechat-fans.gamepoch.com/api/users/'+url_id,
				method:'DELETE',
				dataType: "json",
				data:{},//false true
				success: function(data){
					$('.table tr').eq(j).remove(); 
				},				
				error : function(err){
					console.log(err);
				}
			});		
		},					
		error : function(err){
		console.log(err);
		}
	});	

})
$('.arr-bth-c').click(function(){ //点击查询弹出框
	$('.tz-mask').addClass('tanc-bk');
	$('.arr-tanc-c').css('display','block');
	$('.tanc').css('display','none');
})

$('#arr-bth-c').click(function(){ //点击查询 提交信息给后台。
	var xname = $('#cx-name').val();
	$.ajax({
		url: 'https://wechat-fans.gamepoch.com/api/users',
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(xname);
			for(var i in data){
				//console.log(data[i]);
				if(xname == data[i].unionid){
					console.log(data[i]);
					$('.tz-mask').removeClass('tanc-bk');

				}else{
					$('.tanc-c-title').text('查无此人,请确认用户信息');
					// alert('查无此人');
				}
		}
			
		},					
		error : function(err) {
		
		}
	});

})