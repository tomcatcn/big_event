var form = layui.form
var layer = layui.layer
$(function() {
    initEditor();
    initCate();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 选择图片
    $('#selectPic').on('click', function() {
        $('#file').click()
    })
    $('#file').on('change', function(e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })
    var art_state = '已发布'

    // 修改文章
    qs = location.href.split('?')[1]
    if (qs) {
        let id = qs.match(/\d+/)[0]
        console.log(id)
            // 获取单个文章数据
        $.ajax({
                url: '/my/article/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status != 0) {
                        return console.log(res.message)
                    }
                    console.log(res)
                        // 填充表单
                    form.val('artcle-form', res.data)
                    let url = baseUrl + res.data.cover_img
                    var newImgURL = url
                    $image
                        .cropper('destroy') // 销毁旧的裁剪区域
                        .attr('src', newImgURL) // 重新设置图片路径
                        .cropper(options) // 重新初始化裁剪区域
                        // 重新渲染表单



                }
            })
            // 监听修改事件
        $('#btnSave2').on('click', function() {
            art_state = '草稿'
        })
        $('#form-pub').on('submit', function(e) {
            // 1. 阻止表单的默认提交行为
            e.preventDefault()
                // 2. 基于 form 表单，快速创建一个 FormData 对象
            var fd = new FormData($(this)[0])
                // 3. 将文章的发布状态，存到 fd 中
            fd.append('state', art_state)

            // 4. 将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5. 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                        // 6. 发起 ajax 数据请求
                    editArticle(fd)
                })
        })


    } else { // 新增文章


        $('#btnSave2').on('click', function() {
            art_state = '草稿'
        })
        $('#form-pub').on('submit', function(e) {
            // 1. 阻止表单的默认提交行为
            e.preventDefault()
                // 2. 基于 form 表单，快速创建一个 FormData 对象
            var fd = new FormData($(this)[0])
                // 3. 将文章的发布状态，存到 fd 中
            fd.append('state', art_state)
            fd.delete('Id')
                // 4. 将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5. 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                        // 6. 发起 ajax 数据请求
                    publishArticle(fd)
                })
        })
    }



})

function initCate() {

    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status != 0) {
                return console.log(res.message)
            }
            // 使用模板渲染用户信息
            var htmlstr = template('tpl-options', res)
            $("select[name=cate_id]").html(htmlstr)
                // 通过form重新渲染表单结构
            form.render()

        }
    })
}

function publishArticle(fd) {

    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/article_list.html'
        }
    })
}

function editArticle(fd) {
    $.ajax({
        method: 'POST',
        url: 'my/article/edit',
        data: fd,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/article_list.html'
        }
    })
}