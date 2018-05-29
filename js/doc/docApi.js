
$(function() {

    $.ajax({
        url: 'http://47.106.177.128:16666/file/getNotImageFileList?page=1',
        type: 'get',
        dataType: 'json',
        success: function(result) {
            var html = '<tr class="{3} wow fadeInUp element-item design" data-wow-delay="1s">\
                            <td class="tbl-logo"><img src="img/svg/{0}.svg" alt=""></td>\
                            <td class="tbl-title">\
                                <h4>《{1}》</h4>\
                            </td>\
                            <td class="tbl-uploader">\
                                <p>上传者：管理员</p>\
                            </td>\
                            <td class="tbl-time">\
                                <p>上传时间：{2}</p>\
                            </td>\
                            <td class="tbl-download">\
                                <a data-toggle="modal" href="{4}">立即下载</a>\
                                <a target="_blank" href="{5}">预览</a>\
                                <a class="commcls-modal" keyTitle={1} keyId={6} data-toggle="modal" data-target="#commModal">查看评论</a>\
                            </td>\
                        </tr>';
            
            for (var i = 0; i < result.length; i++) {
                var numType = i % 2 == 0 ? 'even' : 'odd';
                var item = result[i];
                var resultHtml = "";
                resultHtml = html.replace(/\{0\}/g, getType(item.type))
                                 .replace(/\{1\}/g, fetchName(item.name))
                                 .replace(/\{2\}/g, item.time)
                                 .replace(/\{3\}/g, numType)
                                 .replace(/\{4\}/g, item.cnurl)
                                 .replace(/\{5\}/g, fetchUrl(item.type, item.url))
                                 .replace(/\{6\}/g, item.id);
                
                $('#docListBox').append(resultHtml);
            }

            $('html').append('<script type="text/javascript" src="js/jquery.isotope.js"></script>');
            $('html').append('<script type="text/javascript" src="js/wow.js"></script>');

            bindEvent();
            ifrmFitContent();
        }
    });

	function bindEvent() {
		var $container = $('.isotope').isotope({
	        itemSelector: '.element-item',
	        layoutMode: 'fitRows',
	    });

	    $('#filters').on('click', 'a', function() {
	        var filterValue = $(this).attr('data-filter');
	        $('#filters ul li a').removeClass('active');
	        $(this).addClass('active');
	        $container.isotope({ filter: filterValue });
	    });

        var modalId = '0', modalTitle = '';
        $('.commcls-modal').hover(function() {
            modalTitle = $(this).attr('keyTitle');
            modalId = $(this).attr('keyId');
        });

        function loadComment() {
            $.ajax({
                url: 'http://47.106.177.128:16666/file/getCommentList?fileid=' + modalId,
                type: 'get',
                success: function(result) {
                    $('#commentList').html('');
                    $('#modalDocTitle').html(modalTitle);
                    var html = '<div class="item"><div class="base-info">\
                                        <span class="s ip">{0}</span>\
                                        <span class="s nickname">{1}</span>\
                                        <span class="s time">{2}</span>\
                                    </div>\
                                    <div class="comment">{3}</div>\
                                </div>';
                    for (var i = 0; i < result.length; i++) {
                        var item = result[i];
                        var resultHtml = html.replace(/\{0\}/g, item.ip || '')
                                         .replace(/\{1\}/g, item.nickname || '')
                                         .replace(/\{2\}/g, item.time || '')
                                         .replace(/\{3\}/g, item.content || '');
                        
                        $('#commentList').append(resultHtml);
                    }
                }
            });
        }

        $('#commModal').on('show.bs.modal', function () {
            $('#txtNick, #taComment').val(''); //清空文本框
            loadComment();
            goBackTop();
        });

        $('#sumbitComment').on('click', function(){
            var txtNick = $('#txtNick').val();
            var taComment = $('#taComment').val();
            if (!txtNick) {
                $('#resultWarning').html('请填写昵称！').show();
                autoClose();
                return;
            }
            if (!taComment) {
                $('#resultWarning').html('请填写评论！').show();
                autoClose();
                return;
            }
            $.ajax({
                url: 'http://47.106.177.128:16666/file/insertComment',
                type: 'post',
                data: {
                    fileid: modalId,
                    nickname: $('#txtNick').val(),
                    content: $('#taComment').val()
                },
                success: function(data) {
                    $('#resultOk').html('评论成功！').show();
                    autoClose();
                    loadComment(); //刷新评论列表
                },
                error: function() {
                    $('#resultWarning').html('评论不成功，请检查网络或联系管理员！').show();
                    autoClose();
                }
            });
        });
	}

    //带有动画效果地回到页面顶部
    function goBackTop() {
        var tagEle = $('html, body', window.parent.document);
        var tagEle2 = $('body', window.parent.document);
        if ( $(tagEle).scrollTop() ) {
            $(tagEle).animate({scrollTop: 0}, 1000);
            return false;
        }
        if ( $(tagEle2).scrollTop() ) {
            $(tagEle2).animate({scrollTop: 0}, 1000);
            return false;
        }
    }

    function autoClose() {
        setTimeout(function(){
            $('.alert').hide();
        }, 3000);
    }

    function getType(t) {
        var type = "";
        switch (t) {
            case "pdf":
                type = 'pdf';   //pdf
            break;

            case "docx":
            case "doc":
                type = 'docx';  //word
            break;

            case "rar":
                type = 'rar';   //rar
            break;

            case "zip":
                type = 'zip';   //zip
            break;

            default:
                type = 'unknow'; //默认无格式的图标
        }
        return type;
    }

    function fetchName(name) {
        var _name = "";
        var idx = name.lastIndexOf('.');
        _name = name.substring(0, idx);
        return _name;
    }

    function fetchUrl(type, url) {
        if (type != 'docx' && type != 'doc') {
            return "javascript:alert('该文档格式不支持预览，请直接点击下载!')";
        }
        var microsoftUrl = 'https://view.officeapps.live.com/op/view.aspx?src=';
        var _url = "http://www.scyzgc.com/docs/";
        var _idx = url.lastIndexOf('/');
        _url += url.substr(_idx + 1);
        return microsoftUrl + _url;
    }

    //iframe容器自适应内容
    function ifrmFitContent() {
        var h = $('#exchangeSection').height();
        var spaceNum = 50; //留白间距
        var parentIfrm = $('iframe.content-box', parent.document);
        parentIfrm.height(h + spaceNum);
    }
});