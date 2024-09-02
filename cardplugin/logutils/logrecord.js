var time_start = "";
var time_end = "";
var currentObj = [];
/*history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);
history.pushState('','',location.href);*/
var  redirect_uri_serverurl ;
var  component_appid ;

$(function () {
    loadProperties();
    getReadMemberInfo();
})
function load (){
    //点击日志
    writeLoggers('',4,new Date(),'');
    document.addEventListener('touchstart',touch, false);
    document.addEventListener('touchmove',touch, false);
    document.addEventListener('touchend',touch, false);
    function touch (event){
        /* console.log(event.type);*/
        var event = event || window.event;
        //var oInp = document.getElementById("inp");
        // console.log(event.type);
        switch(event.type){
            case "touchstart":
                if(currentObj&&currentObj.length>0){
                    for(var i=0 ;i<currentObj.length;i++){
                        //if(($("#"+currentObj[i]).isVisable())){
                        time_end = new Date();
                        //查看事时间大于3秒写入日志
                        if(time_end-time_start>3000){
                            //todo  存储日志
                            var refBciuiid = $("#"+currentObj[i]).data('analysisid');
                            var bclTasktype = $("#"+currentObj[i]).data('analysistype');
                            writeLoggers(refBciuiid,bclTasktype,time_start.getTime(),time_end.getTime());
                        }
                      /*  console.log(time_end-time_start);
                        console.log(time_start);
                        console.log(time_end);*/
                        //  }
                    }
                    currentObj = [];
                }
                //event.preventDefault();
                //oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchend":
                //event.preventDefault();
                //oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
                var objtest = $('.pending_analysis');
                if(objtest){
                    for(var i=0;i<objtest.length;i++){
                        if($(objtest[i]).isVisable()){
                            time_start = new Date();
                            /* console.log(i);
                             console.log(objtest[i].id);
                             console.log($(objtest[i]).data('analysistype'));*/
                            var currentObj_i = objtest[i].id;
                            currentObj.push(currentObj_i);
                        }
                    }
                }
                console.log(currentObj);
                break;
            case "touchmove":
                //event.preventDefault();
                //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
        }
    }
}
window.addEventListener('load',load, false);
$('#container').unbind("click");
//写入日志
/*bclTasktype：
 1新增2编辑3删除
 4查看名片5查看图文6点击链接
 7分享名片
 8拨打电话
 9对方给云名片用户留言
 10云名片用户给对方留言
 11添加到通讯录
 12查看做自己的名片
 */
function writeLoggers(refBciuiid,bclTasktype,bclIntime,bclOuttime) {
    var params = getLogBasicParam() ;
    params.refBcmuiid = $("#tomemberid").val();//云名片主键
    if($('#isPerson').val()==0){
        params.bclType =  "0" ;//个人名片
    }else if($('#isPerson').val()==1){
        params.bclType ="1";//企业名片
    }
    var storage = window.sessionStorage;
    var memberid = storage.getItem("memberid");
    var DSBopenid = window.localStorage.getItem("DSBopenid");
    params.refBciuiid = refBciuiid ;//图文/链接主键
    params.bclTasktype = bclTasktype;//操作类型 4查看名片5查看图文6查看链接
    params.bclIntime = bclIntime+"";//进入时间（毫秒数）
    params.bclOuttime = bclOuttime+"";//离开时间（毫秒数）
    params.bclDelaytime =  "" ;//浏览时长（后台计算，返回值也为毫秒数）
    params.bclOpeuiid = memberid  ;//浏览用户云名片主键
    params.bclOpenid = DSBopenid  ;//浏览用户openid
    params.bclLng = ""  ;//浏览坐标x
    params.bclLat = ""  ;//浏览坐标y
    params.bclAddress =  "" ;//浏览地址
    var param = {'inmap':params};
    console.log(param);
    $.ajax({
        type: 'POST',
        url: $("#bbgcardDomain").val()+ '/httpServices/cardlog/logController/saveCardlog.form',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(param),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (data) {
            console.log(data);
            if (data.returncode == "true") {
                if (data.outmap) {
                }

            }
        }
    });
}
//获取基础参数
function getLogBasicParam() {
    var params = {};
    params.apptype =  'dsb';
    params.systemid = '222.246.129.80';
    params.serviceid = '80-FA-5B-42-22-40';
    params.appversion = '2.0';
    return params;
}

/*获取项目根目录*/
function getBasePath(){var curWwwPath = window.document.location.href;var pathName = window.document.location.pathname;var pos = curWwwPath.indexOf(pathName);var localhostPath = curWwwPath.substring(0, pos);var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);var basePath=localhostPath+projectName+"/";return basePath;};
/*获取request传参*/
function getRequestValues(){var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var i=0;i<hashes.length;i++){hash=hashes[i].split("=");vars.push(hash[0]);vars[hash[0]]=hash[1]}return vars};
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
//获取当前查阅名片人员信息
function getReadMemberInfo(){
    var localStorage = window.localStorage;
    var sessionStorage = window.sessionStorage;
    var memberid = sessionStorage.getItem("memberid");
    var openid = sessionStorage.getItem("openid");
    var appid ='wx4cc0ee7a85657baa';
    //var appid ='wxfb4897a2432bc2b7';
    //如果没有memberid 获取 联大商帮openid 并回调；
    /*if(isWeiXin()){
        if(!memberid && !openid){
            var toUrl = getBasePath() + 'transitpage.html?getLogOpId=1&sicid='+$("#tomemberid").val()+'&state='+appid;
            location.href = toUrl;
        }else{

        }
    }*/
    var DSBstate = getRequestValues()['state'];
    var DSBopenid = "";
    var DSBopenid_normal = getRequestValues()['openid'];
    var DSBopenid_servlet = getRequestValues()['DSBopenid'];//从servelet过来

    if(DSBstate == appid){
        DSBopenid = DSBopenid_normal;
    }else if(DSBopenid_servlet){
        DSBopenid = DSBopenid_servlet;
    }
    var backuri= location.href.split('?')[0];
    if(!DSBopenid){
        history.replaceState(null,null,location.href.split('?')[0]+"?serviceurl="+ $("#bbgDomain").val());
        if(isWeiXin()){
            if(!memberid && !openid&&!(localStorage.getItem("DSBopenid"))){
                //var backurl =getBasePath()+ 'mainnew?sicid='+$("#tomemberid").val();
                location.href = getRedUrl(appid,backuri);
               /* var toUrl = getBasePath() + 'transitpage.html?getDSBOpId=1&backuri='+backuri+'&state='+appid;
                location.href = toUrl;*/
            }else if(localStorage.getItem("DSBopenid")&&localStorage.getItem("DSBopenid")!="undefined"){
                getmemberInfoByDSBopenid(localStorage.getItem("DSBopenid"));
            }else{
                location.href = getRedUrl(appid,backuri);
            }
        }
    }else{
        localStorage.setItem("DSBopenid",DSBopenid);
        // 支持History API
        //window.location.href = location.href.split('?')[0];
        history.replaceState(null,null,location.href.split('?')[0]+"?serviceurl="+ $("#bbgDomain").val());
        getmemberInfoByDSBopenid(DSBopenid);
    }
}

//根据大商帮openid
function getmemberInfoByDSBopenid(DSBopenid) {
    var sessionStorage = window.sessionStorage;
    var params = getLogBasicParam() ;
    params.DSBopenid = window.localStorage.getItem("DSBopenid")=="undefined"?"":window.localStorage.getItem("DSBopenid");
    //params.DSBopenid = DSBopenid;
    var param = {'inmap':params};
    //使用DSBopenid获取当前用户信息
    $.ajax({
        type: 'POST',
        url: $("#bbgcardDomain").val()+ 'httpServices/users/accountController/getBcmInfosByDSBOpenId.form',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(param),
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (data) {
            if (data.returncode == "true") {
                if(data.outmap){
                    var memberId = data.outmap.memberId;
                    var refSaId = data.outmap.refSaId;
                    var accountId = data.outmap.accountId;
                    var orgId = data.outmap.orgId;
                    sessionStorage.setItem("memberid",memberId);
                    sessionStorage.setItem("sarefid",refSaId);
                    sessionStorage.setItem("refAccountId",accountId);
                    sessionStorage.setItem("orgid",orgId);
                    if($('body').find('.banner-publish').length<=0){
                        if ($('#isPreview').val() == "true") {
                            $('body').append($banners_preview);
                        } else {
                            //发布的 自己的
                            if(memberId==$('#tomemberid').val()){
                                $('body').append($banners_publish_my);
                            }else{
                                $('body').append($banners_publish_other);
                            }
                        }
                    }
                }
            }else{
            }
        }
    });
}

//拼接跳转链接 todo
function getRedUrl(state,redirect_uri) {
    /*var redirect_uri_serverurl =$("#bbgDomain").val();
    //var component_appid = 'wx4bab4f5de8ce3042';//第三方平台appid
    var component_appid = ' wx99275247e908a724';//第三方平台appid测试*/
    var _url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+state;
    var red_serverurl = redirect_uri_serverurl+"servicesmng/oauth/"+state+"/snsapi_base.form&response_type=code&scope=snsapi_base&component_appid="+component_appid;
    return  _url +"&redirect_uri="+red_serverurl+"&state="+redirect_uri;
}

//读配置文件
function loadProperties(){
    jQuery.i18n.properties({// 加载properties文件
        name:'config', // properties文件名称
        path:getBasePath()+'config/', // properties文件路径
        mode:'map', // 用 Map 的方式使用资源文件中的值
        async:0,
        callback: function() {// 加载成功后设置显示内容
            var responseText = jQuery.i18n.map;
            component_appid = responseText.component_appid;
            redirect_uri_serverurl = responseText.BBG_SERVER_URL_PREFIX;
        }
    });
}

//链接点击事件
function click_links(refBciuiid,refLinkStr) {
    writeLoggers(refBciuiid,6,new Date(),'');
    location.href = refLinkStr;
}