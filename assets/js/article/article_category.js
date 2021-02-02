$(function() {
    // 获取文章分类信息
    getArticle();

    var layer = layui.layer
    var form = layui.form
    var addindex = null;
    var editindex = null;
    // 弹出增加框
    $('#add-category').on('click', function() {
            addindex = layer.open({
                title: ['添加文章类别'],
                area: ['500px', '300px'],
                type: 1,
                content: $('#tpl-addForm').html() //这里content是一个普通的String
            });
        })
        //代理监听添加提交事件
    $('body').on('submit', '#add-form', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/my/article/addcates',
                data: $(this).serialize(),
                method: 'POST',
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }

                    layer.msg(res.message)
                        // 重新渲染文章类别
                    getArticle();
                    //关闭弹出层
                    layer.close(addindex)
                }
            })
        })
        //弹出编辑框
    $('tbody').on('click', '#edit-category', function() {


            editindex = layer.open({
                title: ['添加文章类别'],
                area: ['500px', '300px'],
                type: 1,
                content: $('#tpl-editForm').html() //这里content是一个普通的String
            });
            var id = $(this).attr('data-id')
                //填充数据
            $.ajax({
                url: '/my/article/cates/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }

                    // 填充数据到表格
                    getArticle();
                    form.val('edit-form', res.data)

                }
            })
        })
        // 代理监听修改提交事件
    $('body').on('submit', '#edit-form', function(e) {

            e.preventDefault();
            $.ajax({
                url: '/my/article/updatecate',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }

                    // 更新数据到表格
                    getArticle();
                    layer.msg('修改成功')
                        // 关闭弹出层
                    layer.close(editindex)


                }
            })
        })
        // 代理监听删除分类事件
    $('tbody').on('click', '#delete-category', function() {
        var id = $(this).attr('data-id')
            //填充数据
        $.ajax({
            url: '/my/article/deletecate/' + id,
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                // 填充数据到表格
                layer.msg(res.message)
                getArticle();


            }
        })
    })



})

function getArticle() {
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status != 0) {
                return console.log(res.message)
            }
            // 使用模板渲染用户信息
            var htmlstr = template('tpl-table', res)
            $("#categorys").html(htmlstr)

        }
    })
}