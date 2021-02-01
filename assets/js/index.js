$(function() {
    getUserInfo();

    // 退出
    var layer = layui.layer
    $('#loginOut').on('click', function() {
        //提示框
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空token
            localStorage.removeItem('token')
                //跳转页面
            location.href = '/login.html'

            layer.close(index);
        });

    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status != 0) {
                return console.log(res.message)
            }
            // 渲染用户信息
            renderUserInfo(res.data)
        }
    })
}

function renderUserInfo(user) {
    var username = user.nickname || user.username;
    //渲染名字
    $('#welcome').empty().html(username)
        // 渲染头像
    if (user.uer_pic == null) {
        var first = username[0].toUpperCase()
        $('.text-avatar').show().html(first)
        $('.layui-nav-img').hide()
        $('.text-avatar')
    } else {
        $('.text-avatar').hide()
        $('.layui-nav-img').show()
        $('.layui-nav-img').attr('src', user.user_pic)
    }

}