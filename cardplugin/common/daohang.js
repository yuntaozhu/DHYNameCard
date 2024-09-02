	//导航
function navigation(address,lat,lng){
	if(typeof lat=="string"&&lat!="null"){
		lat = parseFloat(lat);
	}
	if(typeof lng=="string"&&lng!="null"){
		lng = parseFloat(lng);
	}
	if(lat==null||lat=="null"||lng==null||lng=="null"||lat== undefined||lng==undefined){
		$.toast("导航失败,没有地址坐标!","text");
	}else{
		if( is_weixin() ){
			wx.openLocation({
				latitude:lat, // 纬度，浮点数，范围为90 ~ -90
				longitude:lng , // 经度，浮点数，范围为180 ~ -180。
				name: '目标位置', // 位置名
				address: address, // 地址详情说明
				scale: 11, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
			});
		}else{
			window.location.href='../../cardplugin/common/gaode/js_daohang.html?stopLat=' + lng + '&stopLng=' + lat ;
		}
	}
}	

function is_weixin(){ 
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger"){ 
		return true; 
	}
	else{ 
		return false; 
	} 
}
