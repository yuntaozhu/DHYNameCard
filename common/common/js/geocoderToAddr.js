function geocoder( key_11 , key_12 ){
	var lnglatXY = new AMap.LngLat(key_11,key_12);
    //document.getElementById('result').innerHTML = "您输入的是：" + key_1;
    //加载地理编码插件
    map.plugin(["AMap.Geocoder"], function() {       
        MGeocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        //返回地理编码结果
        AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack2);
        //逆地理编码
        MGeocoder.getAddress(lnglatXY);
    });
    map.setFitView();
}

function geocoder_CallBack2(data) { //回调函数
    var resultStr = "";
    var roadinfo ="";
    var poiinfo="";
    var address;
	var lnglatAddr = data.regeocode.addressComponent.province + data.regeocode.addressComponent.city + 
		data.regeocode.addressComponent.district + data.regeocode.addressComponent.street + 
		data.regeocode.addressComponent.streetNumber ;
    //返回地址描述
    address = data.regeocode.formattedAddress;
	console.log( '地址:' + lnglatAddr ) ;
	console.log( '地址描述:' + address ) ;
	document.getElementById("lnglatAddr").value= lnglatAddr ;
}

//地理编码返回结果展示
function geocoderAddressToLng( address ) {  
    map.plugin(["AMap.Geocoder"], function() {     //加载地理编码插件
        MGeocoder = new AMap.Geocoder();
        //返回地理编码结果
        AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack);        
        MGeocoder.getLocation( address );  //地理编码
    });
} 
//地理编码返回结果展示  
function geocoder_CallBack(data){
    var resultStr="";
    //地理编码结果数组
    var geocode = new Array();
    geocode = data.geocodes; 
    for (var i = 0; i < geocode.length; i++) {
        //拼接输出html
        //resultStr += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">"+"<b>地址</b>："+geocode[i].formattedAddress+""+ 
		//"<b>    坐标</b>：" + geocode[i].location.getLng() +", "+ geocode[i].location.getLat() +""+ "<b>    匹配级别</b>：" + geocode[i].level +"</span>";  
		document.getElementById("txtCoordinate").value= geocode[i].location.getLng() +","+geocode[i].location.getLat() ;
		dataDraw(  geocode[i].location.getLng() , geocode[i].location.getLat() ) ;
		break ;
    } 
} 