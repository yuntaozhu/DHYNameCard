function getGuid(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});}

// 页面跳转问题
$(".tp_4_section_2,.tpl_4_section_3").find("a").unbind("click").bind("click",function(event){
	event.preventDefault();
	var _href = $(this).attr("href");

	history.replaceState($("#mem_name").val()+' · 云名片',"",location.href+ '&'+getGuid());

	window.location = _href
	// if(_href.indexOf("?") > -1){
	// 	window.location = _href+'&'+getGuid();
	// }else{
	// 	window.location = _href+'?'+getGuid();
	// }
	// if(_href == undefined ||  _href == "javascript:void(0);"){
	// 	return
	// }
	// $(".touch_href_fuk iframe").attr("src",_href);
	// setTimeout(function () {
	// 	$(".touch_href_fuk").show();
	// 	$(".touch_href_fuk iframe").show();
	// }, 500);
});

// $(".touch_href_fuk span").unbind("click").bind("click",function(){
// 	$(".touch_href_fuk iframe").attr("src","");
// 	$(".touch_href_fuk iframe").hide();
// 	$(this).parent("div").hide();
// })

/**
 做自己的名片 滚动引导图

 导入CSS---------weui.min.css">
 导入CSS---------jquery-weui.min.css">
 导入JS---------jquery-2.1.4-min.js
 导入JS---------jquery-weui.min.js
 导入JS---------swiper.min.js
 **/
$(document).ready(function(){
	document.getElementById('domyself').addEventListener('touchstart',function(event){
		event.stopPropagation();
		if(event.target!=this) return;
		if($("#domyself_div").length > 0){
			//$("#domyself_swiperdiv").toggle();
		}else{
			var storage = window.sessionStorage;
			var memberid = storage.getItem("memberid");
			//自己的名片
			if(memberid == $("#tomemberid").val()){
				//跳转管理页
				location.href = getBasePath()+"views/manage/main.html";
			}else{
				//保存到通讯录
				writeLoggers('',12,new Date(),'');
				var height = $(window).height();
				var width = $(window).width();
				var padbottom = height-100;
				var padleft = width/2 - 75;
				var padleftimg = width - 60;
			// 	$('body').append('\
			// 	<div class="overlay" id="domyself_swiperdiv" style="display: none;">\
			// 		<div id="example1" class="slider-pro">\
			// 			<div class="sp-slides">\
			// 				<div class="sp-slide">\
			// 					<img class="sp-image" src="../../cardplugin/shitbtn/icon1.jpg" data-src="../../cardplugin/shitbtn/icon1.jpg" data-retina="../../cardplugin/shitbtn/icon1.jpg"/>\
			// 				</div>\
			// 				<div class="sp-slide">\
			// 					<img class="sp-image" src="../../cardplugin/shitbtn/icon2.jpg" data-src="../../cardplugin/shitbtn/icon2.jpg" data-retina="../../cardplugin/shitbtn/icon2.jpg"/>\
			// 				</div>\
			// 				<div class="sp-slide">\
			// 					<img class="sp-image" src="../../cardplugin/shitbtn/icon3.jpg" data-src="../../cardplugin/shitbtn/icon3.jpg" data-retina="../../cardplugin/shitbtn/icon3.jpg"/>\
			// 					<button onclick="hideSwipe()" class="sp-layer" style="color: #666;font-size: 12px;text-align:center;border: none;" data-horizontal="'+padleftimg+'" data-vertical="10" data-show-transition="left" data-hide-transition="up" data-show-delay="200" data-hide-delay="200" data-width="50" data-height="40">\
			// 						关闭\
			// 					</button>\
			// 					<button onclick="gologin()" class="sp-layer" style="color: white;font-size: 20px;text-align:center;background: rgb(205, 173, 124);border-radius:5px;border: none;"\
			// 					data-horizontal="'+padleft+'" data-vertical="'+padbottom+'" data-show-transition="top" data-hide-transition="top" data-show-delay="500" data-hide-delay="200" data-width="150" data-height="40">\
			// 						立即体验\
			// 					</button>\
			// 				</div>\
			// 			</div>\
			// 	    </div>\
			//     </div>\
			// ');
			}
		}

		$('#example1').sliderPro({
			width: width,
			height: height,
			responsive:false,
			imageScaleMode:'exact',
			autoplayDelay:2000,
			startSlide:0,
			forceSize:'fullWindow',
			loop:false,
			autoplay:false,
			slideDistance:1
		});
		$('.slider-pro img').css({'padding':'0','margin':'0'});
		var slider = $('#example1').data('sliderPro');
		slider.gotoSlide(0);
		$("#domyself_swiperdiv").show();
	});
});
function gologin(){location.href=getRedUrl(appid,getBasePath()+'index2.html');}
function hideSwipe(){$("#domyself_swiperdiv").hide();}
function getBasePath(){var curWwwPath = window.document.location.href;var pathName = window.document.location.pathname;var pos = curWwwPath.indexOf(pathName);var localhostPath = curWwwPath.substring(0, pos);var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);var basePath=localhostPath+projectName+"/";return basePath;};

//做自己的名片
function domyself_card () {
	if($("#domyself_div").length > 0){
		//$("#domyself_swiperdiv").toggle();
	}else{
		var storage = window.sessionStorage;
		var memberid = storage.getItem("memberid");
		//自己的名片
		/*if(memberid == $("#tomemberid").val()){
			//跳转管理页
			location.href = getBasePath()+"views/manage/main.html";
		}else */if(!memberid){
			var height = $(window).height();
			var width = $(window).width();
			var padbottom = height-100;
			var padleft = width/2 - 75;
			var padleftimg = width - 60;
			// $('body').append('\
			// <div class="overlay" id="domyself_swiperdiv" style="display: none;">\
			// 	<div id="example1" class="slider-pro">\
			// 		<div class="sp-slides">\
			// 			<div class="sp-slide">\
			// 				<img class="sp-image" src="../../cardplugin/shitbtn/icon1.jpg" data-src="../../cardplugin/shitbtn/icon1.jpg" data-retina="../../cardplugin/shitbtn/icon1.jpg"/>\
			// 			</div>\
			// 			<div class="sp-slide">\
			// 				<img class="sp-image" src="../../cardplugin/shitbtn/icon2.jpg" data-src="../../cardplugin/shitbtn/icon2.jpg" data-retina="../../cardplugin/shitbtn/icon2.jpg"/>\
			// 			</div>\
			// 			<div class="sp-slide">\
			// 				<img class="sp-image" src="../../cardplugin/shitbtn/icon3.jpg" data-src="../../cardplugin/shitbtn/icon3.jpg" data-retina="../../cardplugin/shitbtn/icon3.jpg"/>\
			// 				<button onclick="hideSwipe()" class="sp-layer" style="color: #666;font-size: 12px;text-align:center;border: none;" data-horizontal="'+padleftimg+'" data-vertical="10" data-show-transition="left" data-hide-transition="up" data-show-delay="200" data-hide-delay="200" data-width="50" data-height="40">\
			// 					关闭\
			// 				</button>\
			// 				<button onclick="gologin()" class="sp-layer" style="color: white;font-size: 20px;text-align:center;background: rgb(205, 173, 124);border-radius:5px;border: none;"\
			// 				data-horizontal="'+padleft+'" data-vertical="'+padbottom+'" data-show-transition="top" data-hide-transition="top" data-show-delay="500" data-hide-delay="200" data-width="150" data-height="40">\
			// 					立即体验\
			// 				</button>\
			// 			</div>\
			// 		</div>\
			//     </div>\
		 //    </div>\
			// ');
		}else{
			//跳转管理页
			location.href = getBasePath()+"views/clip/clip.html";
		}
	}

	$('#example1').sliderPro({
		width: width,
		height: height,
		responsive:false,
		imageScaleMode:'exact',
		autoplayDelay:2000,
		startSlide:0,
		forceSize:'fullWindow',
		loop:false,
		autoplay:false,
		slideDistance:1
	});
	$('.slider-pro img').css({'padding':'0','margin':'0'});
	var slider = $('#example1').data('sliderPro');
	slider.gotoSlide(0);
	$("#domyself_swiperdiv").show();
}