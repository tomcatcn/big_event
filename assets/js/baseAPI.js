$.ajaxPrefilter(function(options) {
    // Modify options, control originalOptions, store jqXHR, etc
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf(/my/) != -1) {
        options.headers = { 'Authorization': localStorage.getItem('token') || '' }
    }

    options.complete = function(jqXHR, status) {
        console.log(jqXHR)
        if (jqXHR.responseJSON.status == 1) {
            location.href = '/login.html'
        }


    }
});