var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(options) {
    // Modify options, control originalOptions, store jqXHR, etc
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf(/my/) != -1) {
        options.headers = { 'Authorization': localStorage.getItem('token') || '' }
    }

    options.complete = function(jqXHR, status) {
        if (jqXHR.statusText == 'error') {
            alert('链接无效')
        }

        if (jqXHR.responseJSON.status == 1 && jqXHR.responseJSON.message == '身份认证失败！') {
            location.href = '/login.html'
        }


    }
});