var form = layui.form //获取form模块
var layer = layui.layer
$(function() {
    getUserInfo();

    form.verify({
        nickname: function(value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '字符在1~6个字符之间'
            }
        }


    });
    // 修改用户信息
    $('.layui-form').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/my/userinfo',
                data: form.val('user_info'),
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
        // 重置
    $('#resetUserInfo').on('click', function() {
        getUserInfo();
        layer.msg('重置成功')
    })
})

// 获取用户信息并赋值
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status != 0) {
                return console.log(res.message)
            }
            // 渲染用户信息
            valUserInfo(res.data)
        }
    })
}

function valUserInfo(user) {
    //给表单赋值
    form.val("user_info", user);

}