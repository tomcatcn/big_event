var form = layui.form //获取form模块
var layer = layui.layer
$(function() {
    form.verify({
        newpass: function(value) { //value：表单的值、item：表单的DOM对象
            var oldpwd = $('.layui-input[name=oldPwd]').val()
            if (value == oldpwd) {
                return '新密码不能与旧密码一致'
            }
        },
        pass2: function(value, item) { //value：表单的值、item：表单的DOM对象
            var pwd = $('.layui-input[name=newPwd]').val();
            if (pwd != value) {
                return '确认密码输入不一致，请重新输入'
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]


    });
    // 提交修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            data: $(this).serialize(),
            method: 'POST',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 渲染用户信息
                layer.msg(res.message)
                $('#resetPwd').click()
            }
        })
    })
})