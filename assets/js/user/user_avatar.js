$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image')
        // 1.2 配置选项 
    const options = {
            // 纵横比 
            aspectRatio: 1,
            // 指定预览区域 
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域 
    $image.cropper(options)

    //选择图片
    $('#selectPic').on('click', function() {

        $('#file').click()
    })
    $('#file').on('change', function(e) {
            var file = e.target.files[0]
            var newImgURL = URL.createObjectURL(file)
            $image.cropper('destroy') // 销毁旧的裁剪区域 
                .attr('src', newImgURL) // 重新设置图片路径 
                .cropper(options)
        })
        // 上传头像
    $('#upLoadAvatar').on('click', function() {
        // 图片文件转化为base64格式
        var dataURL = $image.cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布 w
                idth: 100,
                height: 100
            }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符
        $.ajax({
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            method: 'POST',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 渲染用户信息
                layer.msg(res.message)
                    // 调取父页面方法渲染信息
                window.parent.getUserInfo();
            }
        })
    })

})