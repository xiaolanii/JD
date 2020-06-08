$(function () {
//切换登陆面板

    var tops = document.getElementsByClassName('top'),
        top_lis = tops[0].getElementsByTagName('li'),
        mids = document.getElementsByClassName('mid'),
        mid_lis = mids[0].getElementsByTagName('li');
    for(var i = 0, l = top_lis.length; i < l; i++) {
        ! function(i) {
            top_lis[i].onclick = function() {
                for(var k = 0; k < l; k++) {
                    top_lis[k].className = '';
                    mid_lis[k].className = '';
                }
                top_lis[i].className = "active";
                mid_lis[i].className = 'active';
            }
        }(i);
    }

    let btnlogin = $("#btn-login");
    btnlogin.click(function () {
        let userName = $("#userName").val();
        let password = $("#password").val();
        console.log(userName+'111');
        $.ajax({
            type: 'get',
            url: '/login/' + userName,
            dataType: 'json',
            success: function (data) {
                if (password===data. userpassword){
                    if (userName==='admin'){
                        $(window).attr('location','http://localhost:3000/www/admin.html');
                    }else {
                        $(window).attr('location','http://localhost:3000/www/index.html?username='+data.username);
                    }

                }
            }
        })


    });

    let btnRegist = $("#btn-regist");
    btnRegist.click(function () {
        let userName = $("#registUserName").val();
        let password = $("#registPassword").val();

        $.ajax({
            type: 'post',
            url: '/login/user',
            data:{username:userName,userpassword:password},
            dataType: 'json',
            success:function (data) {
                if (data.flag===1){
                    console.log('成功')
                }
            }
        })

    })

});