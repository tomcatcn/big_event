var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    // cate_id: '', // 文章分类的 Id
    // state: '' // 文章的发布状态
}
var form = layui.form
var layer = layui.layer
$(function() {
    // 获取文章列表
    getArticleList();
    // 初始化分类
    initCate();
    // 筛选功能
    $('#form-search').on('submit', function(e) {
            e.preventDefault();
            q.cate_id = $('[name=cate_id]').val()
            q.state = $('[name=state]').val()
            getArticleList();
        })
        // 删除文章
    $('tbody').on('click', '.btn-delete', function() {
            // 获取删除按钮的个数
            var len = $('.btn-delete').length
                // 获取到文章的 id
            var id = $(this).attr('data-id')
                // 询问用户是否要删除数据
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除文章失败！')
                        }
                        layer.msg('删除文章成功！')
                        if (len === 1) {
                            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                            // 页码值最小必须是 1
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }

                        getArticleList();
                    }
                })

                layer.close(index)
            })
        })
        // 编辑文章
    $('tbody').on('click', '.btn-edit', function() {
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        location.href = '/article/article_pub.html?id=' + id
    })



})

function getArticleList() {
    $.ajax({
        url: '/my/article/list',
        method: 'GET',
        data: q,
        success: function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            // 渲染模板
            var htmlstr = template('tpl-table-tbody', res)
            $('#tbody').html(htmlstr)
            renderPage(res.total)

        }
    })
}

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
// 渲染分页
function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    var laypage = layui.laypage
    laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 6, 10],
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum, // 设置默认被选中的分页
        jump: function(obj, first) {
            // 把最新的页码值，赋值到 q 这个查询参数对象中
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            if (!first) {
                getArticleList();
            }

        }
    })
}