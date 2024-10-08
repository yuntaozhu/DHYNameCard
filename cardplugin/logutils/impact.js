//检测矩形是否碰撞js--开始
(function($){
    $.extend({
        //矩形的碰撞检测
        /**
         * x1,y1 第一个矩形的左上角
         * x2,y2 第一个矩形的右下角
         * x3,y3 第二个矩形的左上角
         * x4,y4 第二个矩形的右下角
         *
         * return Boolean true=>碰撞
         */
        isCollsion: function(x1, y1, x2, y2, x3, y3, x4, y4){
            if(
                (x1 > x3 && x1 > x4) ||
                (x3 > x1 && x3 > x2) ||
                (y1 > y3 && y1 > y4) ||
                (y3 > y1 && y3 > y2)
            ){
                return false;
            }else{
                return true;
            }
        }
    });
    /**
     * opt中包含了两个参数，元素实际位置的偏移
     *
     * return Boolean 是否在可视范围之内
     */
    $.fn.isVisable = function(opt){
        opt = $.extend({
            offsetTop: 0, //网页中元素比实际位置在垂直方向的偏移
            offsetLeft: 0, //网页中元素比实际位置在水平方向的偏移
            addTop: 0, //元素左上角坐标y轴偏移
            addRight: 0, //元素右下角坐标x轴偏移
            addBottom: 0, //元素右下角坐标y轴偏移
            addLeft: 0, //元素左上角坐标x轴偏移
        }, opt);
        var me = $(this),winInfo={},
            srcInfo = {
                begin_left: (me.offset().left - opt.offsetLeft -opt.addLeft),
                begin_top: (me.offset().top -$(window).scrollTop()- opt.addTop)
            }
        srcInfo.end_left = (srcInfo.begin_left + me.width() + opt.addRight);
        srcInfo.end_top = (srcInfo.begin_top + me.height() +opt.addBottom);
        winInfo.begin_left = 0;
        winInfo.begin_top = 71;
        winInfo.end_left = 375;
        winInfo.end_top = 261;
        //检测是否”碰撞“”
        return $.isCollsion(
            srcInfo.begin_left, srcInfo.begin_top, srcInfo.end_left, srcInfo.end_top,
            winInfo.begin_left, winInfo.begin_top, winInfo.end_left, winInfo.end_top
        );
    }
})($);
//检测矩形是否碰撞js--结束