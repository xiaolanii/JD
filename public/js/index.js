$(function () {


    //初始化商品
    function initGoods() {
        $.ajax({
            type : 'get',
            url:'/goods',
            dataType:'json',
            success:function (data) {
                //渲染数据列表
                let html = template('recom-bodyTpl',{list: data});
                $('#recom-body').html(html);
                //绑定点击事件
                $('#recom-body').find('li').each(function (index,elememt){
                    let id = index + 1;
                   $(elememt).click(function () {
                       // console.log(index);
                       let username = window.location.search.replace('?username=','');
                       $.ajax({
                           type : 'get',
                           url:'/goods/good'+id,
                           data: id,
                           dataType:'json',
                           success: function (data) {
                               $(window).attr('location','http://localhost:3000/www/good.html?goodid='+data.goodid+'&username='+username);
                           }
                       })
                   })
                });
            }
        });

    }
    initGoods();
    //获取username

    function initName() {

    // <a id="toLogin" href="javascript:;">你好，请登录</a>
    //     <a href="javascript:;" class="f10">免费注册</a>
    //     console.log(window.location.search);
        if (window.location.search.indexOf('?')===-1){
            let html = "<a id=\"toLogin\" href=\http://localhost:3000/www/login.html\">你好，请登录</a>\n" +
                "        <a href=\"http://localhost:3000/www/login.html\" class=\"f10\">免费注册</a>";
            $('#addUsername').html(html);
        }else {
            $.ajax({
                type : 'get',
                url:'/goods/username',
                data: window.location.search.replace('?',''),
                dataType:'json',
                success: function (data) {
                    let html = template('usernameInfo',{list: data});
                    $('#addUsername').html(html);
                }
            })
        }

    }
    initName();


    $("#toShopList").click(function () {
        let username = window.location.search.replace('?username=','');
        $(window).attr('location','http://localhost:3000/www/shoplist.html?username='+username);
    })


});