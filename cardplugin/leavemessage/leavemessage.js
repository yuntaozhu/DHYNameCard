<!--肖其金 留言-->
	var $html_leavemessage = '<div class="weui-mask weui-mask--visible" id="weui-mask" style="display: none;"></div>'+
	'<div class="weui-dialog weui-dialog--visible" id= "leave_message_div" style="display: none;">'+
    '<div class="weui-dialog__bd leave_message">'+
        '<dl>'+
           '<dt>'+
              '<strong class="icon1"></strong>'+
          '<p>'+
                '<input id="user_phone" type="number" pattern="[0-9]*" class="inputstyle1" style="position: inherit;" placeholder="请输入手机号码">'+
            '</p>'+
            '</dt>'+
            '<dt>'+
               '<strong class="icon2"></strong>'+
            '<p>'+
                '<input id="yzm" type="number" pattern="[0-9]*" class="inputstyle1" style="position: inherit;" placeholder="请输入验证码">'+
                '<a id="sendmsg" href="javascript:;" class="icon_yzm">获取验证码</a>'+
            '</p>'+
           ' </dt>'+
        '</dl>'+
    '</div>'+
    '<div class="weui-dialog__ft">'+
        '<a href="javascript:;" onclick="hide_leavemessage()" class="weui-dialog__btn">取消</a>'+
        '<a href="javascript:;" onclick="confirmLogin()" class="weui-dialog__btn">确认</a>'+
    '</div>'+
	'</div>';
	//基础参数
	var apptype = 'dsb';
	var systemid='222.246.129.80';
	var serviceid = '80-FA-5B-42-22-40';
	var appversion = '2.0';
	var serpx ;
	var berpx ;
	var currentpath = getBasePath();
	var appid ='wx4cc0ee7a85657baa';
	var strKey = "memberid";
	var storage = window.sessionStorage;
	$(function(){
		$('body').append($html_leavemessage);
		//基础参数
		serpx = $("#bbgcardDomain").val();
		berpx = $("#bbgDomain").val();
		storage.setItem('apptype','dsb');
		storage.setItem('systemid','222.246.129.80');
		storage.setItem('serviceid','80-FA-5B-42-22-40');
		storage.setItem('appversion','2.0');
		if(!storage.getItem('serpx')){
			storage.setItem('serpx',serpx);
		}
		if(!storage.getItem('berpx')){
			storage.setItem('berpx',berpx);
		}
		checkMoblie();
	});

	function gdj(){
		var p ={};
		p.apptype = apptype;
		p.systemid = systemid;
		p.serviceid = serviceid;
		p.appversion =appversion;
		return p;
	}
	// 判断是否是微信浏览器
	function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		//ua = "mozilla/5.0 (iphone; cpu iphone os 10_3_2 like mac os x) applewebkit/603.2.4 (khtml, like gecko) mobile/14f89 micromessenger/6.5.9 nettype/wifi language/zh_cn";
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}
	//链接跳转 currentId：登录人id,toid：名片id
	function hrefToLeaveMess(currentId,toid){
		//var toUrl = currentpath + 'views/discovery/messagelist.html?refdestid='+toid+'&refsourceid='+currentId+"&realName="+$('#mem_name').val();
		var toUrl = '';
		if(isWeiXin()){
			toUrl = currentpath + 'index2.html?refsourceid='+toid+'&refdestid='+currentId+'&isMessageTemplet=1&state='+appid;
		}else{
			toUrl =  currentpath + 'views/discovery/messagelist.html?refdestid='+toid+'&refsourceid='+currentId+"&realName="+$('#mem_name').val();
		}
        location.href = toUrl;
	}
	/*获取项目根目录*/
	function getBasePath(){var curWwwPath = window.document.location.href;var pathName = window.document.location.pathname;var pos = curWwwPath.indexOf(pathName);var localhostPath = curWwwPath.substring(0, pos);var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);var basePath=localhostPath+projectName+"/";return basePath;};

    //storage.setItem('memberid','958d82ba-5b28-4bff-abd2-9a9e1bed8aae');//当前登录的人员id
    
    //留言
	function leaveMessage(){
		var toUrl = '';
		if(isWeiXin()){
			var membermy = storage.getItem(strKey);
			/*var backurl = getBasePath()+'mainnew?ouri='+refdestid+'@'+refsourceid+'@toMesPtp';
			location.href = getRedUrl(state,backurl);*/
			if(membermy){
				if(membermy==$("#tomemberid").val()){
					layer.msg('不允许给自己留言.');
				}else{
					toUrl = currentpath + 'views/discovery/messagelist.html?refdestid='+$("#tomemberid").val()+'&refsourceid='+membermy;
					//toUrl = currentpath + 'transitpage.html?refsourceid='+membermy+'&refdestid='+$("#tomemberid").val()+'&isMessageTemplet=1&state='+appid;
					location.href = toUrl;
				}

			}else{
				location.href = getBasePath()+"views/manage/main.html";
			}
		}else{
			//弹出输入手机号码验证
			$('#leave_message_div').show();
			$('#weui-mask').show();
			//toUrl =  currentpath + 'views/discovery/messagelist.html?refdestid='+toid+'&refsourceid='+currentId+"&realName="+$('#mem_name').val();
		}

		/*var membermy = storage.getItem(strKey);
		//判断是否登录  1、已登录
		if(membermy!=null&&membermy!=''&&membermy!=undefined){ 
			hrefToLeaveMess(membermy,$("#tomemberid").val());
        }else { 
        	//弹出输入手机号码验证
        	$('#leave_message_div').show();
        	$('#weui-mask').show();
        } */
	}
	
	$('#weui-mask').on('click',function(){
		hide_leavemessage();
	})
	
	//留言弹出验证隐藏
	function hide_leavemessage(){
		$('#leave_message_div').hide();
        $('#weui-mask').hide();
        $('#user_phone').val('');
        $('#yzm').val('');
	}
	
	//验证手机号码是否已经注册
	function checkMoblie(){
		$('#sendmsg').one("click",function(){
			var params = gdj();
		    var tel = $('#user_phone').val();
			params.bmMobile=tel.replace(/\s/g,'');
			params.bmRealname=tel.replace(/\s/g,'');
			var param = {'inmap':params};
			$.ajax({
			    type: 'POST',
			    url: serpx+'httpServices/users/accountController/checkMoblie.form',
			    contentType: 'application/json;charset=utf-8',
			    data: JSON.stringify(param),
			    dataType: 'json',
			    beforeSend: function(){
					//$.showLoading();
				},
			    success: function (data){
			    	if(data.returncode=="true"){
						sendyzm('LOGIN');
			    	}else{
						alert(data.returnmsg);
						checkMoblie();
			    		//$.toptips(data.returnmsg,'warning');
			    	}
			    	//$.hideLoading();
			    },error: function(e){
					//$.toptips('网络不给力，请检查网络设置!','warning');
					//$.hideLoading();
			    	checkMoblie();
				}
			});
		});
	}
	
	
	/**
	 * 发送验证码
	*/
	
	function sendyzm(type){
		var param = {};
		param.mobile=$("#user_phone").val().replace(/\s/g,'');
		param.type=type;
		var params = {"inmap":param};
		$("#yzm").val("");
		$.ajax({
		    type: "POST",
		    cache: false,
		    async: true,
		    url: berpx +'servicesmng/instantMessage/sendVerifyCode.form',
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify(params),
		    dataType: "json",
		    beforeSend: function(){
			},success: function (data){
           		 setcountdown();
	            if(data.returncode=="true"){
	            	//todo 验证码发送成功
	            	alert(data.returnmsg);
	            }else{
	            	alert(data.returnmsg);
	                countdown=0;
	            }
			},error: function(e){
				//$.toptips('网络不给力，请检查网络设置!','warning');
				//$.hideLoading();
			}
		});
	}
	var countdown=120;
	function setcountdown(){
	    var btnobj = document.getElementById("sendmsg");
	    if (countdown == 0){
	    	checkMoblie();
	        btnobj.removeAttribute("disabled");
	        btnobj.style.setProperty('color','#fff');
	        btnobj.innerHTML="获取验证码";
	        countdown = 120;
	        return;
	    } else {
	        btnobj.setAttribute("disabled",true);
	        btnobj.style.setProperty('color','#3c3c3c');
	        btnobj.innerHTML="重新发送(" + countdown + ")";
	        countdown--;
	    }
	    setTimeout(function(){
	        setcountdown();
	    },1000);
	}
	
	//注册
	function register_member(){
		var param = gdj();
		param.bmMobile=$("#user_phone").val().replace(/\s/g,'');
		param.verifyCode=$("#yzm").val();
		param.bmRealname=$("#user_phone").val();
		var params = {"inmap":param};
		$.ajax({
		    type: "POST",
		    cache: false,
		    async: true,
		    url: serpx + "httpServices/users/accountController/register.form",
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify(params),
		    dataType: "json",
		    beforeSend: function(){
				//$.showLoading();
			},success: function (data){
				//$.hideLoading();
				if(data.returncode=="true"){
					//判断是否登录  1、已登录
					hrefToLeaveMess(data.outmap.memberId,$("#tomemberid").val());
					storage.setItem('memberid',data.outmap.memberId);
		    		storage.setItem('sarefid',data.outmap.saRefId);
				}else{
					alert(data.returnmsg);
					//$.toptips(data.returnmsg,'warning');
				}
			},error: function(e){
				/*$.toptips('网络不给力，请检查网络设置!','warning');
				$.hideLoading();*/
			}
		});
	}
		
	//登录
	function loginByMessage(){
		var params = gdj();
        var tel = $('#user_phone').val();
		params.mobile=tel.replace(/\s/g,'');
		params.verifyCode=$('#yzm').val();
		var param = {'inmap':params};
		$.ajax({
		    type: 'POST',
		    url: serpx + 'httpServices/users/accountController/loginByVerificationCode.form',
		    contentType: 'application/json;charset=utf-8',
		    data: JSON.stringify(param),
		    dataType: 'json',
		    beforeSend: function(){
				//$.showLoading();
			},
		    success: function (data){
		    	if(data.returncode=="true"){
		    		hrefToLeaveMess(data.outmap.memberId,$("#tomemberid").val());
		    		storage.setItem('memberid',data.outmap.memberId);
		    		storage.setItem('sarefid',data.outmap.saRefId);
					storage.setItem('openid',"");
					storage.setItem('orgid',"");
		    		//$.toptips(data.returnmsg,'ok');
		    	}else{
		    		alert(data.returnmsg);
		    		//$.toptips(data.returnmsg,'warning');
		    	}
		    	//$.hideLoading();
		    },error: function(e){
				//$.toptips('网络不给力，请检查网络设置!','warning');
				//$.hideLoading();
			}
		});
	}
	
	//确认
	function confirmLogin(){
		if(!$('#user_phone').val()){
	        alert('请输入手机号码！');
	        checkMoblie();
	        return;
	    }
	    if(!$('#yzm').val()){
	         alert('请输入验证码！');
	        return;
	    }
		loginByMessage();
	}


