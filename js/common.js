var itcast = {
    /**
     * 单击只有一根手指
     * 判断手指开始触摸和手指松开时差异不能大于制定值
     * 保证没有滑动操作，如果有抖动必须保证抖动的距离在制定的范围内
    */
    tap: function (dom, callback) {
        if (!dom || typeof dom != "object") {
            return;
        }

        var startTime, startX, startY;

        dom.addEventListener("touchstart", function (e) {
            //判断是否只有一根手指操作
            if (e.targetTouches.length > 1) {
                return;
            }
            //记录手指开始触摸的时间
            startTime = Date.now();
            //记录当前手指的坐标
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        })

        dom.addEventListener("touchend", function (e) {
            //判断是否只有一根手指进行操作
            if (e.changedTouches.length > 1) {
                return;
            }
            //判断手指离开和触摸之间的时间差
            if (Date.now() - startTime > 150) {
                return;
            }
            //判断手指松开时的坐标和触摸时的坐标的距离差异
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            //这里暂且将距离差异定为
            if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
                console.log("这里是移动端的单击事件");
                callback && callback(e);
            }
        })
    }
}
