$.ajaxPrefilter(function(options) {
    // Modify options, control originalOptions, store jqXHR, etc
    options.url = 'http://ajax.frontend.itheima.net' + options.url
});