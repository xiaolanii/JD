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

});