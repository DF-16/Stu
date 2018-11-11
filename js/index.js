window.onload = function () {
    searchEffect();
    timeBack();
    bannerEffect();
}
//搜索块背景颜色渐变
function searchEffect() {
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;

    var search = document.querySelector(".jd_search");

    window.onscroll = function () {
        var bannerScroll = document.documentElement.scrollTop;

        var opacity = 0;
        if (bannerScroll < bannerHeight) {
            opacity = bannerScroll / bannerHeight;
            search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        }

    }
}

//秒杀倒计时
function timeBack() {
    var spans = document.querySelector(".jd_sk_time").getElementsByTagName("span");
    var totaTime = 3700;

    var timeId = setInterval(function () {
        totaTime--;
        //判断设定的时间是否小于0
        if (totaTime < 0) {
            clearInterval(timeId);
        }
        //计算小时、分钟、秒的数值
        var hour = Math.floor(totaTime / 3600);
        var minute = Math.floor(totaTime % 3600 / 60);
        var second = Math.floor(totaTime % 60);
        //将计算出的数值填充到span中
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);

        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);

        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);

    }, 1000);

}

//轮播图效果
function bannerEffect() {
    /**1.修改页面结构 */
    //获取轮播图的结构
    var banner = document.querySelector(".jd_banner");
    //获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    //在首尾插入图片
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    /**2.修改样式*/
    var lis = imgBox.querySelectorAll("li");
    var count = lis.length;

    var bannerWidth = banner.offsetWidth;
    //设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    //设置每一个li（图片）的宽度
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }
    //定义一个图片索引
    var index = 1;

    /** 设置偏移量*/
    imgBox.style.left = -bannerWidth + "px";

    /**当屏幕变化时重新计算宽度 */
    window.onrsize = function () {
        bannerWidth = banner.offsetWidth;
        //设置盒子的宽度
        imgBox.style.width = count * bannerWidth + "px";
        // 设置每个li的宽度
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        //重新设置偏移量
        imgBox.style.left = (-index * bannerWidth) + "px";
    }

    var setIndicator = function () {
        var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
         
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("active");
        }
        indicators[index-1].classList.add("active");
    }

    /**自动轮播 */
    var timeId;
    var startTime = function () {
        timeId = setInterval(function () {
            index++;
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = (-index * bannerWidth) + "px";

            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index * bannerWidth) + "px";

                }
            }, 500);
        }, 2000)
    }
    startTime();

    /**手动效果 */
    var startX, moveX, distanceX;
    var isEnd = true;
    //手指触发
    imgBox.addEventListener("touchstart", function (e) {
        clearInterval(timeId);
        startX = e.targetTouches[0].clientX;
    })
    //手指移动
    imgBox.addEventListener("touchmove", function (e) {
        if (isEnd = true) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;

            imgBox.style.transition = "none";
            imgBox.style.left = (-index * bannerWidth) + distanceX + "px";
        }
    })

    /**手指松开 */
    imgBox.addEventListener("touchend", function (e) {
        isEnd = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (distanceX > 0) {
            imgBox.style.transition = "left o.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        startTime();
    })

    //监听过度效果是否执行完毕
    imgBox.addEventListener("webkitTransitionEnd", function () {
        
        if (index == count - 1) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (index == 0) {
            index = count - 2;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        }

        setIndicator();
        
        setTimeout (function () {
            isEnd = true;
            clearInterval(timeId);
            startTime();
        },100)
    })

}    
