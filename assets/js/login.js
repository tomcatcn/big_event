$(function() {
    // 切换登陆注册区域
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()

    });
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()


    });
    // layui 表单预验证自定义
    var layer = layui.layer,
        form = layui.form;
    form.verify({
        pass2: function(value, item) { //value：表单的值、item：表单的DOM对象
            var pwd = $('.reg-box .layui-input[name=password]').val();
            if (pwd != value) {
                return '两次密码输入不一致，请重新输入'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });
    // 监听表单注册事件
    $('#reg').on('submit', function(e) {
            e.preventDefault();
            var data = $(this).serialize()
            $.post('/api/reguser', data, function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登陆')
                $('#link_login').click()

            })
        })
        // 监听表单登陆事件
    $('#login').on('submit', function(e) {

        e.preventDefault();
        var data = $(this).serialize()
        $.post('/api/login', data, function(res) {
            if (res.status != 0) {
                return layer.msg('登陆失败：' + res.message)
            }

            // 存贮token
            localStorage.setItem('token', res.token)
            location.href = '/index.html'

        })

    })
})