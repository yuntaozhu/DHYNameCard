
var $banners_preview = '<div class="banner-publish" style="display: block;" >'+
								'<img class="pub-back" src="../../cardplugin/banners/images/pub-home.png" onclick="goback()" />'+
								'<p class="p1" onclick="setBbgCardMemberStatic()">发布</p>'+
								'<p class="p2" onclick="createMbElement()">切换模板</p>'+
						'</div>';

/*var $banners_publish_my = '<div class="banner-publish" style="display: block;">'+
							'<img class="pub-back" src="../../cardplugin/banners/images/pub-home.png" onclick="goback()"/>'+
							/!*'<img class="pub-cancel" src="../../cardplugin/banners/images/pub-cancel.png" onclick="revokeBackup()" />'+*!/
							'</div>';*/

var $banners_publish_other = '<div class="banner-publish" style="display: block;">'+
	 						'<img class="pub-back" src="../../cardplugin/banners/images/pub-home.png" onclick="goback()"/>'+
							'<img class="pub-collection" src="../../cardplugin/banners/images/pub-addfriend.png" onclick="addfriend()" />'+
							'<img class="pub-cancel" src="../../image/yyy.png" onclick="collection()"/>'+
							'</div>';


var $banners_publish_my = '<div id="banners_publish_my" class="banner-publish" style="display: block;" >'+
						// '<p class="editp" onclick="goback()">名片编辑</p>'+
						'<div class="left-icon">'+
						// '<p></p>'+
						'<img class="pub-cancel" src="../../image/yyy.png" onclick="collection()"/></div>'+
						'</div>';

var $banners_publish_default = '<div class="banner-publish" style="display: block;"><img class="pub-cancel" src="../../image/yyy.png" onclick="collection()"/></div>'

$(function(){
	var memberid = window.sessionStorage.getItem('memberid');
	if(memberid) {
		//预览
		if ($('#isPreview').val() == "true") {
			$('body').append($banners_preview);
		} else {
			//发布的 自己的
			if(memberid==$('#tomemberid').val()){
				//获取专属设计师
				getPrivateDesigner();
				$('body').append($banners_publish_my);
			}else{
				$('body').append($banners_publish_other);
			}
		}
	}
	else
	{
		$('body').append($banners_publish_default);
	}
});

//获取专属设计师
function  getPrivateDesigner() {
	var params = {};
	params.apptype='1';
	params.systemid='1';
	params.serviceid='1';
	params.appversion='1';
	params.bcmuiid=$('#tomemberid').val();
	var param = {'inmap':params};
	$.ajax({
		type: 'POST',
		url: window.sessionStorage.getItem('serpx') + 'httpServices/users/cardDesiner/getPrivateDesigner.form',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(param),
		dataType: 'json',
		success: function (data) {
			if(data.returncode=="true"){
				if(data.outmap){
					var outmap = data.outmap;
					$('#banners_publish_my').append('<p class="design_name" onclick="todesign_card(\''+outmap.bcmLink+'\')">设计师：'+outmap.bcmTitle+'</p><img class="design_logo" src="'+outmap.bbgRefLogo+'" />');
				}
			}
		}
	});
}
//已发布名片页面
function todesign_card(link_card) {
	if(link_card){
		location.href = getBasePath()+link_card;
	}else{
		layer.msg('未发布云名片.');
	}

}

//返回系统
function goback(){
	// var r=confirm('返回名片编辑？');
	// if(r){
		var backlink = window.sessionStorage.getItem('icar_back_link');
		if(backlink){
			location.href=backlink;
		}else{
			//location.href = getBasePath()+"views/manage/main.html";
			//location.href = getBasePath()+"index2.html";
			location.href = getRedUrl(appid,getBasePath()+'index2.html');
		/*	history.go(-1);
			location.reload();*/
		}
	// }
}

/**
 * 发布
 * @return
 */
function setBbgCardMemberStatic(tempname){
	var r=confirm('正式发布该名片？');
	if(r){
		var params = {};
		params.apptype='1';
		params.systemid='1';
		params.serviceid='1';
		params.appversion='1';
		params.orgid='1';
		params.memberid=window.sessionStorage.getItem('memberid');
		params.ispreview = 'false';
		if(tempname)
		params.tempname = tempname;
		var param = {'inmap':params};
		$.ajax({
		    type: 'POST',
		    url: window.sessionStorage.getItem('serpx')+'httpServices/httpHtmlEngineer/httpHtmlEngineerController/generatorHtml.form',
		    contentType: 'application/json;charset=utf-8',
		    data: JSON.stringify(param),
		    dataType: 'json',
		    success: function (data){
		    	if(data.returncode=="true"){
		    		if(data.outmap.link){
		    			location.href=getBasePath()+data.outmap.link+'?v='+Math.random()*1000;
		    		}
		    	}else{
		    		alert(data.returnmsg);
		    	}
		    },error: function(e){
				alert('网络不给力，请检查网络设置!');
			}
		});
	}
}

//生成切换模块HTML
function createMbElement(){
	$('.banner-publish').hide();
	if($("#mb_part").length > 0){
		$("#mb_part").toggle(); 
		initswipe();
	}else{
		getSwitchTemplate();
	}
}

function hideSwipe1(){$("#switchtemplate_swiperdiv").hide();$('.banner-publish').show();}
function initswipe(){
	var height = $(window).height();
	var width = $(window).width();
	$('#example2').sliderPro({
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
	var slider = $('#example2').data('sliderPro');
	slider.gotoSlide(0);
	$('#switchtemplate_swiperdiv').show();
}

function getBasePath(){var curWwwPath = window.document.location.href;var pathName = window.document.location.pathname;var pos = curWwwPath.indexOf(pathName);var localhostPath = curWwwPath.substring(0, pos);var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);var basePath=localhostPath+projectName+"/";return basePath;};

//获取云名片可切换模版
function getSwitchTemplate(){
	var params = {};
	params.apptype='1';
	params.systemid='1';
	params.serviceid='1';
	params.appversion='1';
	params.orgid='1';
	params.memberid=window.sessionStorage.getItem('memberid');
	var param = {'inmap':params};
	$.ajax({
	    type: 'POST',
	    url: window.sessionStorage.getItem('serpx')+'httpServices/httpHtmlEngineer/httpHtmlEngineerController/getSwitchTemplate.form',
	    contentType: 'application/json;charset=utf-8',
	    data: JSON.stringify(param),
	    dataType: 'json',
	    success: function (data){
	    	if(data.returncode=="true"){
	    		if(data.outmap.cardTemplate){
	    			var temp = JSON.parse(data.outmap.cardTemplate);
	    			var lih = '';
	    			var height = $(window).height();
	    			var width = $(window).width();
	    			var padbottom = height-65;
	    			var padleft = width/2 - 75;
	    			var padleftimg = width - 60;
	    			for ( var i = 0; i < temp.length; i++) {
	    				lih += '\
	    						<div class="sp-slide">\
									<img class="sp-image" src="'+temp[i].pic+'" data-src="'+temp[i].pic+'" data-retina="'+temp[i].pic+'"/>\
									<button onclick="hideSwipe1()" class="sp-layer" style="color: white;font-size: 16px;text-align:center;border: none;background-color:#2c2c2e;" data-horizontal="'+padleftimg+'" data-vertical="10" data-show-transition="left" data-hide-transition="up" data-show-delay="200" data-hide-delay="200" data-width="50" data-height="40">\
										关闭\
									</button>\
									<button onclick="switchTemplate(\''+temp[i].tempName+'\')" class="sp-layer" style="color: white;font-size: 20px;text-align:center;background: #2e98d4;border-radius:5px;border: none;"\
									data-horizontal="'+padleft+'" data-vertical="'+padbottom+'" data-show-transition="top" data-hide-transition="top" data-show-delay="500" data-hide-delay="200" data-width="150" data-height="40">\
										立即使用\
									</button>\
								</div>\
							';
					}
	    			$('body').append('\
	    				<div class="overlay" id="switchtemplate_swiperdiv" style="display: none;">\
		    				<div id="example2" class="slider-pro">\
		    					<div class="sp-slides">'+lih+'</div>\
		    			    </div>\
		    		    </div>\
    				');
	    		}
	    		initswipe();
	    	}else{
	    		alert(data.returnmsg);
	    	}
	    },error: function(e){
			alert('网络不给力，请检查网络设置!');
		}
	});
}

//名片收藏
function collection(){
	history.replaceState($("#mem_name").val()+' · 云名片',"",location.href+ '&'+getGuid());
	//alert('暂不支持名片收藏');
	location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4cc0ee7a85657baa&redirect_uri=https%3A%2F%2Fbbg.zhdsbang.com/servicesmng/oauth/wx4cc0ee7a85657baa/snsapi_base.form&component_appid=wx4bab4f5de8ce3042&state=https%3A%2F%2Fcard.zhdsbang.com/CARD/mainnew&response_type=code&scope=snsapi_userinfo#wechat_redirect"
}

//加好友
function addfriend(){
	var r=confirm('添加好友？');
	if(r){
		var params = {};
		params.apptype='1';
		params.systemid='1';
		params.serviceid='1';
		params.appversion='1';
		params.orgid='1';
		params.memberid=window.sessionStorage.getItem('memberid');
		params.tobeconfirmid=$('#tomemberid').val();
		var param = {'inmap':params};
		$.ajax({
		    type: 'POST',
		    url: window.sessionStorage.getItem('serpx')+'httpServices/users/cardFirendsController/applyFirend.form',
		    contentType: 'application/json;charset=utf-8',
		    data: JSON.stringify(param),
		    dataType: 'json',
		    success: function (data){
		    	if(data.returncode=="true"){
		    		alert(data.returnmsg);
		    	}else{
		    		alert(data.returnmsg);
		    	}
		    },error: function(e){
				alert('网络不给力，请检查网络设置!');
			}
		});
	}
}
/*切换模板*/
function switchTemplate(tempname){
	$('.banner-publish').show();
	var params = {};
	params.apptype='1';
	params.systemid='1';
	params.serviceid='1';
	params.appversion='1';
	params.orgid='1';
	params.memberid=window.sessionStorage.getItem('memberid');
	params.tempname=tempname;
	var param = {'inmap':params};
	$.ajax({
		type: 'POST',
		url: window.sessionStorage.getItem('serpx')+'httpServices/httpHtmlEngineer/httpHtmlEngineerController/switchTemplate.form',
		contentType: 'application/json;charset=utf-8',
		data: JSON.stringify(param),
		dataType: 'json',
		success: function (data){
			if(data.returncode=="true"){
				setBbgCardMemberStatic(tempname);
			}else{
				alert(data.returnmsg);
			}
		},error: function(e){
			alert('网络不给力，请检查网络设置!');
		}
	});
}

//关闭选择模板
function closeMbpart(){
	$('#mb_part').toggle();
}

/*撤回上一版本*/
function revokeBackup(){
	var res = confirm('撤回到上一个版本？');
	if(res){
		var params = gdj();
		if(window.sessionStorage.getItem('enterprise_set_ccuiid')){
			params.memberid=window.sessionStorage.getItem('enterprise_set_ccuiid');
		}else{
			params.memberid=window.sessionStorage.getItem('memberid');
		}
		var param = {'inmap':params};
		$.ajax({
			type: 'POST',
			url: window.sessionStorage.getItem('serpx')+'httpServices/httpHtmlEngineer/httpHtmlEngineerController/revokeBackup.form',
			contentType: 'application/json;charset=utf-8',
			data: JSON.stringify(param),
			dataType: 'json',
			success: function (data){
				if(data.returncode=="true"){
					alert(data.returnmsg,'ok');
				}else{
					alert(data.returnmsg,'warning');
				}
			},error: function(e){
				alert('网络不给力，请检查网络设置!','warning');
			}
		});
	}
}