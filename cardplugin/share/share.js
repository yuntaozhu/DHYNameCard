/*必须引入一下两个js
   * <script src="../common/common/js/jweixin-1.2.0.js"></script>
	*<script type="text/javascript" src="http://weixin.zhdsbang.com/test.php"></script>
   */
 var $html_shareimg = '<div class="overlay" id="share_part" style="display:none">'+
                           '<div class="share_part">'+
                           '<p><img src="../../cardplugin/share/share_pic.png"></p>'+
                           '</div>'+
                           '</div>';
$(function() {
    $('body').append($html_shareimg);
    var message = {};
    var shareInfo = $('#shareInfo').val();
    var company_desc = '大商帮云名片，企业自媒体运营新高度，通过大商帮云名片企业将员工、代理商、客户、粉丝捆绑一起，企业可一键广播公司新产品、新动态、新技术，员工与代理商、客户、粉丝按需约见，快速成交。';
    var mem_desc =  '大商帮云名片，企业自媒体运营新高度，通过大商帮云名片企业将员工、代理商、客户、粉丝捆绑一起，企业可一键广播公司新产品、新动态、新技术，员工与代理商、客户、粉丝按需约见，快速成交。'
    $('#share_part').click(function(event){
       $('#share_part').toggle();
    });
    if(shareInfo==undefined||shareInfo==''||shareInfo==null){
        if($('#isPerson').val()==0){
            shareInfo =  mem_desc ;
        }else if($('#isPerson').val()==1){
            shareInfo =company_desc;
        }
    }
    message.title = document.title ;
    message.desc = shareInfo ;
    if(location.href.indexOf('serviceurl')==-1){
        if(location.href.indexOf('?')==-1){
            message.link = location.href+"?serviceurl="+ $("#bbgDomain").val();
        }else{
            message.link = location.href+"&serviceurl="+ $("#bbgDomain").val();
        }
    }else{
        if(location.href.indexOf('?')==-1) {
            message.link = location.href.split('?')[0]+"?serviceurl="+ $("#bbgDomain").val();
        }
    }
    message.imgUrl = "../../cardplugin/share/default_icon.png";
    var share_img =  $('#mem_logo').val();
    share_img = share_img.trim();
    $.ajax({
        url: share_img,
        type: 'GET',
        complete: function(response){
            if(response.status == 404){
                message.imgUrl = "../../cardplugin/share/default_icon.png";
            }else{
                message.imgUrl = share_img;
            }
        }
    });
	message.imgUrl = share_img;
    if($('#isPreview').val() == "true"){
        document.title = document.title+"(预览模式,不建议分享)";
    }
    message.sign = "1";
    //分享
    window.shareData = message;
});

//显示二维码
function showsharebtn(){
    $('#share_part').toggle();
    /*$('#sharebtn,#share_part').click(function(event){
        event.stopPropagation();
        $('#share_part').toggle();
    });*/
}