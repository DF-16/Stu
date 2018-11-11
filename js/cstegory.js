window.onload = function () {
    var ct_left = document.querySelector(".ct_cleft");
    var leftHeight = ct_left.offsetHeight;
    var ulBox = ct_left.querySelector("ul:first-of-type");
    var ulBoxHeight = ulBox.offsetHeight;

    var lis = ulBox.querySelectorAll("li");
    //设置静止状态下的最大和最小top值
    var maxTop = 0;
    var minTop = leftHeight - ulBoxHeight;
    //设置滑动动状态下最大最小的top值
    var maxBouncetop = maxTop + 100;
    var minbouncetop = minTop - 100;

    var startY = 0;
    var moveY = 0;
    var distanceY = 0;

    var currentY = 0;

    ulBox.addEventListener("touchstart", function (e) {
        startY = e.targetTouches[0].clientY;
    })

    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;

        if (currentY + distanceY > maxBouncetop || currentY + distanceY < minbouncetop) {
            return;
        }
        ulBox.style.transition = "none";
        ulBox.style.top = (currentY + distanceY) + "px";
    })

    ulBox.addEventListener("touchend", function (e) {
        if (currentY + distanceY < minTop) {
            currentY = minTop;

            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = minTop + "px";
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            ulBox.style.transition = "top 0.5s"
            ulBox.style.top = maxTop + "px";
        } else {
            currentY += distanceY;
        }
    })

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    /*
    itcast.tap(ulBox,function (e) {
        //点击切换样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        var li = e.target.parentNode;
        li.classList.add("active");
        //
        var liHeight = li.offsetHeight;
        var index = li.index;
        ulBox.style.transition = "top .5s";

        if ( -index * liHeight < minTop ) {
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        }else {
            ulBox.style.top = -index * liHeight + "px";
            currentY = -index * liHeight + "px";
        }
    })  */
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }
    ulBox.addEventListener("click", function (e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
        }
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
        li.classList.add("active");
        //
        
        var index = li.index;
        ulBox.style.transition = "top .5s";

        if (-index * liHeight < minTop) {
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        } else {
            ulBox.style.top = -index * liHeight + "px";
            currentY = -index * liHeight + "px";
        }
    })

}