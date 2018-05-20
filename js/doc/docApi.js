
$(function() {
    var microsoftUrl = 'https://view.officeapps.live.com/op/view.aspx?src=';
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
                            <td class="tbl-download"><a data-toggle="modal" href="{4}">立即下载</a><a target="_blank" href="{5}" style="margin-left: 15px">预览</a></td>\
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
                                 .replace(/\{5\}/g, microsoftUrl + item.url);
                
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
        //var idx = name.indexOf('=');
        var idx = 13;
        _name = name.substr(idx);
        return _name;
    }

    function fetchUrl(url) {
        var _url = "http://www.zkcec.com/scyz/docs/";
        var _idx = url.lastIndexOf('/')
        var idx = 13;
        _url += url.substr(_idx + idx + 1);
        return _url;
    }

    //iframe容器自适应内容
    function ifrmFitContent() {
        var h = $('#exchangeSection').height();
        var spaceNum = 50; //留白间距
        var parentIfrm = $('iframe.content-box', parent.document);
        parentIfrm.height(h + spaceNum);
    }
});