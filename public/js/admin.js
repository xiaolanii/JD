$(function () {

    function initList(){
        //渲染列表数据
        $.ajax({
            type : 'get',
            url:'/goods',
            dataType:'json',
            success:function (data) {
                //渲染数据列表
                var html = template('indexTpl',{list: data});
                $('#dataList').html(html);
                //必须在渲染完成之后才可以操作对应标签
                $("#dataList").find('tr').each(function (index,elememt) {
                    var td = $(elememt).find('td:eq(3)');
                    var id = $(elememt).find('td:eq(0)').text();
                    //绑定编辑图书的单击事件
                    td.find('a:eq(0)').click(function () {
                        editGood(id)
                    });
                    //绑定删除图书的单击事件
                    td.find('a:eq(1)').click(function () {
                        deleteGood(id)
                    });

                    //绑定添加图书信息的单机事件
                    addGood();
                    //要把数据重置
                    var form = $("#addGoodForm");
                    form.get(0).reset();
                    form.find('input[type=hidden]').val('');

                });
            }
        });
    }
    initList();


    function addGood(){
        //添加图书信息
        $("#addGoodId").click(function () {
            var form = $("#addGoodForm");
            //实例化弹窗对象
            var mark = new MarkBox(600,400,'添加商品',form.get(0));

            mark.init();

            form.find('input[type=button]').unbind('click').click(function () {
                console.log(form.serialize());
                $.ajax({
                    type: 'post',
                    url: '/goods/good',
                    data: form.serialize(),
                    dataType: 'json',
                    success:function (data) {
                        if (data.flag===1){
                            //关闭弹窗
                            mark.close();
                            //添加成功，重新渲染数据列表
                            initList();
                        }
                    }
                })
            })

        })
    }

    function editGood(id){
        var form = $("#addGoodForm");
        //先根据id查询信息
        $.ajax({
            type:'get',
            url: '/goods/good' + id,
            data: id,
            dataType:'json',
            success: function (data) {
                //初始化弹窗
                var mark = new MarkBox(600,400,'编辑图书',form.get(0));

                mark.init();
                //填充表单数据
                form.find('input[name=id]').val(data.goodid);
                form.find('input[name=name]').val(data.goodname);
                form.find('input[name=price]').val(data.goodprice);
                //对表单提交按钮重新绑定提交事件
                form.find('input[type=button]').unbind('click').click(function () {
                    //编辑完数据之后重新提交表单
                    $.ajax({
                        type:'put',
                        url:'/goods/good',
                        data:form.serialize(),
                        dataType:'json',
                        success:function (data) {
                            if (data.flag===1){
                                //隐藏弹窗
                                mark.close();
                                //重新渲染数据列表
                                initList();
                            }
                        }
                    })
                })
            }
        })
    }

    function deleteGood(id) {
        $.ajax({
            type:'delete',
            url:'/goods/good/' + id,
            data: id,
            dataType:'json',
            success: function (data) {
                //删除图书信息之后，重新渲染数据列表
                if (data.flag===1){
                    initList();
                }
            }
        })
    }


});