$(function () {
    setTimeout(function () {
        wechatconfig()
    },500);
});
wx.ready(function () {
    if(window.shareData){
        if(!window.shareData.imgUrl){
            window.shareData.imgUrl = "../../cardplugin/share/default_icon.png";
        }
        var share_title = '分享标题';
        var share_desc = '分享描述';
        var share_link =  location.href.split('?')[0]+"?serviceurl="+ $("#bbgDomain").val();
        if(window.shareData.title) share_title = window.shareData.title;
        if(window.shareData.desc) share_desc = window.shareData.desc;
        if(window.shareData.link) share_link = window.shareData.link;
        wx.onMenuShareAppMessage({
            title:share_title, // 分享标题
            desc:share_desc, // 分享描述
            link:share_link, // 分享链接
            imgUrl:window.shareData.imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                if(window.shareData.sign){
                    //写日志
                    writeLoggers('',7,new Date(),'');
                }
            }
        });
        wx.onMenuShareTimeline(window.shareData);
        wx.onMenuShareQQ(window.shareData);
        wx.onMenuShareWeibo(window.shareData);
        wx.onMenuShareQZone(window.shareData);
    }
});

function getRequestValues(){var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var i=0;i<hashes.length;i++){hash=hashes[i].split("=");vars.push(hash[0]);vars[hash[0]]=hash[1]}return vars};
//微信认证
function wechatconfig() {
    var  serviceurl= getRequestValues()["serviceurl"];
    if(serviceurl==null||serviceurl==""||serviceurl==undefined){
        serviceurl =  window.sessionStorage.getItem("berpx");
    }
    if(serviceurl==null||serviceurl==""||serviceurl==undefined){
        if($("#bbgDomain")){
            serviceurl =  $("#bbgDomain").val();
        }
    }
    $.ajax({
        url:serviceurl+'servicesmng/jsauth/jsapi_sign.form',
        type:'post',
        dataType : 'json',
        contentType:"application/json;charset=utf-8",
        data:  JSON.stringify({"inmap":{"url":location.href}}) ,
        success:function(data) {
            if(data.outmap!=null){
                var outmap = data.outmap;
                wx.config({
                    debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId : outmap.authAppid, // 必填，公众号的唯一标识
                    timestamp : outmap.timestamp, // 必填，生成签名的时间戳
                    nonceStr : outmap.nonceStr, // 必填，生成签名的随机串
                    signature : outmap.signature, // 必填，签名，见附录1
                    jsApiList : ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','showOptionMenu', 'hideMenuItems', 'onMenuShareQZone', 'openLocation','getLocation','chooseImage','uploadImage','downloadImage','previewImage','getLocalImgData','startRecord','stopRecord','translateVoice','onRecordEnd','playVoice','pauseVoice','stopVoice','uploadVoice','downloadVoice','scanQRCode',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }else{
                $.toast(data.returnmsg,"text");
            }

        }
    })
}

//订单支付
var appId='',nonceStr='',paySign='',prepayId='',signType='',timeStamp='',payOrderID='';
function paymentProduct(bpouiid,bpodaccount){
    var param = gdj();
    param.bpouiid = bpouiid;//订单ID
    param.bpodaccount = bpodaccount;//支付金额
    param.paytype = '1';
    param.openid = gssv('openid');//'ovayHw_2hpIw38gjxV7vyyM_YjbI';//gsv('openid');
    var params = {'inmap':param};
    $.ajax({
        type:'POST',
        async:true,
        url:gssv('serpx')+'httpServices/pay/order/payOrder.form',
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(params),
        dataType:"json",
        success: function(data){
            if(data.returncode=="true"){
                appId= data.outmap.appId;
                nonceStr= data.outmap.nonceStr;
                paySign= data.outmap.paySign;
                prepayId= data.outmap.prepayId;
                signType= data.outmap.signType;
                timeStamp= data.outmap.timeStamp;
                payOrderID= data.outmap.payOrderID;
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', paymentonBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', paymentonBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', paymentonBridgeReady);
                    }
                }else{
                    paymentonBridgeReady();
                }
            }else{
                $.toast(data.returnmsg,"text");
            }
        },error: function(XMLHttpRequest, textStatus, errorThrown){
            showErrorMsg(XMLHttpRequest,textStatus);
        }
    });
}

//微信支付订单
function paymentonBridgeReady(){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',{
            "appId":appId,     //公众号名称，由商户传入
            "timeStamp":""+timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":nonceStr, //随机串
            "package":"prepay_id="+prepayId,
            "signType":signType,         //微信签名方式：
            "paySign":paySign //微信签名
        },
        function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                location.href='';
            }else{
                location.href='';
            }
        }
    );
}