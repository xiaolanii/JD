$(function () {

    function initGood() {
        let goodid = window.location.search.replace('?','');
        $.ajax({
            type : 'get',
            url:'/goods/good',
            data: goodid.replace('&username=zzw1',''),
            dataType:'json',
            success: function (data) {
                let html = template('goodInfo',{list: data});
                $('#textBody').html(html);
            }
        })
    }
    initGood();

    $("#addOrder").click(function () {
            // ?goodid=2&username=zzw1
        let dataUrl = window.location.search.split("&");
        let goodid1 = dataUrl[0].split("=");
        let goodid = goodid1[1];
        let username1 = dataUrl[1].split("=");
        let username = username1[1];
        $.ajax({
            type: 'post',
            url: '/orders/addorder',
            data: {goodid,username},
            dataType: 'json',
            success:function (data) {
                console.log('添加订单成功')
            }
        })
    })

    var box = my$('box');
    var smallBox = box.children[0];
    var bigBox = box.children[1];

    var smallImage = smallBox.children[0];
    var mask = smallBox.children[1];
    var bigImage = bigBox.children[0];

    box.onmouseenter = function () {
        // 显示 mask和bigBox
        mask.style.display = 'block';
        bigBox.style.display = 'block'
    }

    box.onmouseleave = function () {
        mask.style.display = 'none';
        bigBox.style.display = 'none';
    }

    // 2 当鼠标在盒子中移动的时候，让mask和鼠标一起移动
    box.onmousemove = function (e) {
        e = e || window.event;
        // 获取鼠标在盒子中的位置，就是mask的坐标
        var maskX = getPage(e).pageX - box.offsetLeft;
        var maskY = getPage(e).pageY - box.offsetTop;

        // 让鼠标出现在mask的中心点
        maskX = maskX - mask.offsetWidth / 2;
        maskY = maskY - mask.offsetHeight / 2;

        // 把mask限制到box中
        maskX = maskX < 0 ? 0 : maskX;
        maskY = maskY < 0 ? 0 : maskY;

        maskX = maskX > box.offsetWidth - mask.offsetWidth ? box.offsetWidth - mask.offsetWidth : maskX;
        maskY = maskY > box.offsetHeight - mask.offsetHeight ? box.offsetHeight - mask.offsetHeight : maskY;


        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3 当mask移动的时候，让大图片移动
        // 求 大图片移动的距离

        // mask移动的距离 / mask最大能够移动的距离  = 大图片移动的距离 / 大图片最大能够移动的距离

        // mask最大能够移动的距离
        var maskMax = box.offsetWidth - mask.offsetWidth;
        // 大图片最大能够移动的距离
        var bigImageMax = bigImage.offsetWidth - bigBox.offsetWidth;

        var bigImageX = maskX * bigImageMax / maskMax;
        var bigImageY = maskY * bigImageMax / maskMax;

        bigImage.style.left = -bigImageX + 'px';
        bigImage.style.top = -bigImageY + 'px';
    }

});