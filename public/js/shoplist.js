$(function () {
    function initGood() {
        let username = window.location.search.replace('?','');
        $.ajax({
            type : 'get',
            url:'/orders/order',
            data: username,
            dataType:'json',
            success: function (data) {
                let html = template('indexTpl',{list: data});
                $('#dataList').html(html);

                $("#dataList").find('tr').each(function (index,elememt){
                    let orderid = $(elememt).find('td:eq(0)').text();
                    $(elememt).click(function () {
                        $.ajax({
                            type:'delete',
                            url:'/orders/order/' + orderid,
                            dataType:'json',
                            success: function (data) {
                                //删除图书信息之后，重新渲染数据列表
                                initGood();
                            }
                        });
                    })
                })
            }
        })
    }
    initGood();

    $("#toIndex").click(function () {
        let username = window.location.search.replace('?','');
        $(window).attr('location','http://localhost:3000/www/index.html?'+username);
    })
});