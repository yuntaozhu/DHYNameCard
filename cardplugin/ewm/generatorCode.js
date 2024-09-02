//通讯录二维码
var $html_ewm =
	'<div class="overlay" id="ewm_part" style="display: none;">'+
	'<div id="output" style="display: none"></div>'+
	'<div class="ewm_part">'+
	'<div class="ewm_part1"><div class="ewm_part1_con">'+
	'<a href="javascript:showewm()" class="icon_close"></a>'+
	'<div class="pic">'+
	'<img id="ewm_personpic"  onerror="javascript:this.src=\'../../cardplugin/ewm/icon.png\';"/>'+
	'</div>'+
	'<div class="item-info">'+
	'<p id="ewm_personname"></p>'+
	'</div>'+
	'</div></div>'+
	'<div class="line1"></div>'+
	'<div class="ewm_part2">'+
	'<h2 id="ewm_part2_info"><b>扫描</b>二维码，加为名片好友</h2>'+
	'<h3>'+
	'<img id="ewm_img">'+
	'</h3>'+
	'<h4>'+
	'<a id="address_list_ewm" href="javascript:void(0)" rel="" class="">导入通讯录</a>'+
	'<a id="face_toface_ewm"rel="" href="javascript:void(0)" class="current">面对面</a>'+
	'<a id="we_chate_ewm" href="javascript:void(0)" rel="" class="">微信</a>'+
	'</h4>'+
	'<h5>点击图标可切换对应的二维码</h5>'+
	'</div>'+
	'<div class="ewm_part3"></div>'+
	'</div>'+
	'</div>'+
	'</div>';
var timeOutEvent=0;
$(function(){
	$('body').append($html_ewm);
	var result = face_toface_buildcode(window.location.href);
	$("#ewm_img").attr("src",result);
	$("#face_toface_ewm").attr("rel",result);
	$('#ewmbtn,.ewm_part1 a.icon_close').click(function(){
		timeOutEvent=0;
		$('#ewm_part').toggle();
	});
	$('.ewm_part2 h4 a').click(function(){
		//var a= $(this).attr('rel');
		$(this).toggleClass('current');$(this).siblings().removeClass('current');
		//$(this).parent().parent().find('h3 img').attr('src',a);
	});
	//二维码 头像
	$('#ewm_personpic').attr("src",$('#mem_logo').val());//todo
	$('#ewm_personname').html($('#mem_name').val());
	//通讯录二维码
	$('#address_list_ewm').on('click',function(){
		$("#erwm_div").empty();
		var result  = address_list_buildcode();
		$("#ewm_img").attr("src",result);
		$("#address_list_ewm").attr("rel",result);
		//$('#ewm_part2_info'),empty();
		$('#ewm_part2_info').html('<b>识别</b>二维码，保存到通讯录');
	})
	//微信二维码
	$('#we_chate_ewm').on('click',function(){
		timeOutEvent=0;
		$("#erwm_div").empty();
		var mem_ewm_logo  = $("#mem_ewm_logo").val() ;
		$("#ewm_img").attr("src",mem_ewm_logo);
		$("#we_chate_ewm").attr("rel",mem_ewm_logo);
		$('#ewm_part2_info').html('<b>扫描</b>二维码，关注当前商会或加为好友');
	})
	//面对面
	$('#face_toface_ewm').on('click',function(){
		timeOutEvent=0;
		$("#erwm_div").empty();
		var result = face_toface_buildcode(window.location.href);
		$("#ewm_img").attr("src",result);
		$("#face_toface_ewm").attr("rel",result);
		$('#ewm_part2_info').html('<b>扫描</b>二维码，加为名片好友');
	})

	//长按二维码
	$("#ewm_h3").on({
		touchstart: function(e){
			timeOutEvent = setTimeout("longPress()",1500);
			e.preventDefault();
		},
		touchmove: function(){
			clearTimeout(timeOutEvent);
			timeOutEvent = 0;
		},
		touchend: function(){
			clearTimeout(timeOutEvent);
			if(timeOutEvent!=0){
				//alert("你这是点击，不是长按");
			}
			return false;
		}
	})
});
//长按二维码 记录日志
function longPress() {
	if($('#ewm_a').find('.current')[0].id=="address_list_ewm"){
		//保存到通讯录
		writeLoggers('',11,new Date(),'');
	}
}
//显示二维码
function showewm() {
	timeOutEvent=0;
	$('#ewmbtn,.ewm_part1 a.icon_close').click(function(event){
		event.stopPropagation();
		$('#ewm_part').toggle();
	});
}
//面对面二维码生成
function face_toface_buildcode(url){
	$("#output").empty().qrcode(url);
	var result  = $("#output").find('canvas').get(0).toDataURL();
	return result;
}

//二维码通讯录生成//todo 所有的值
function address_list_buildcode(){
	var text =  "BEGIN:VCARD";
	var mem_comp = $("#mem_comp").val();
	var mem_name = $("#mem_name").val();
	var mem_mobile = $("#headMemberMobile").val();
	var mem_zw = $("#mem_zw").val();//职务
	var xs = "";
	var mz = "";
	if(mem_name!=null&&mem_name!=undefined){
		if(mem_name.length<4){
			xs = mem_name.substring(0,1);
			mz = mem_name.substring(1,mem_name.length);
		}else{
			xs = mem_name.substring(0,2);
			mz = mem_name.substring(2,mem_name.length);
		}
		text +="\r\nN:"+xs+";"+mz+";;; FN:\r\n"+mz+" "+xs;
	}
	if(mem_zw!=null&&mem_zw!=undefined&&mem_zw!=""){
		text +="\r\nTITLE:"+mem_zw;
	}
	if(mem_comp!=null&&mem_comp!=undefined&&mem_comp!=""){
		text +="\r\nORG:"+mem_comp;
	}
	if(mem_mobile!=null&&mem_mobile!=undefined&&mem_mobile!=""){
		text +="\r\nTEL;CELL,VOICE:"+mem_mobile;
	}
	text += "\r\nEND:VCARD";
	var out = utf16to8(text);
	$("#output").empty().qrcode({
		render:"canvas",
		ecLevel:"H",
		size:300,
		background:"#fff",
		fill:"#002C7D",
		radius:0,
		mode:2,
		fontcolor:"#AE4141",
		label:"xqj",
		text:out,
	})
	var result  = $("#output").find('canvas').get(0).toDataURL();
	return result;
}

//生成中文二维码
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
		}
	}
	return out;
}
