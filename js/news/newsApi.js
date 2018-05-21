/*
 * 新闻公共api对接
 **/

$(function() {
    var iframeSrc = window.location.href;
    var idx = iframeSrc.lastIndexOf('/');
    iframeSrc = iframeSrc.substr(idx + 1);
    var type = "", defaultImg = "img/hangye3.jpg";
    switch (iframeSrc) {
        case "newsHangye.html":
            type = 'hangye'; //行业
        break;

        case "newsQiye.html":
            type = 'qiye';   //企业
        break;

        case "newsBiao.html":
            type = 'biao';   //中标通知
            defaultImg = 'img/zhongbiao.jpg';
        break;

        case "newsTongzhi.html":
            type = 'notes';  //通知公告
        break;
    }

	$.ajax({
		url: 'http://47.106.177.128:16666/news/getNewsList?type='+ type +'&page=1',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			var html = '<div class="article animated"  data-wow-delay=".9s">\
                            <div class="article-left">\
                                <a href="newsDetail.html?id={3}"><img src="{4}"></a>\
                            </div>\
                            <div class="article-right">\
                                <div class="article-title">\
                                    <p>{0}</p>\
                                    <a class="title" href="newsDetail.html?id={3}">{1}</a>\
                                </div>\
                                <div class="article-text">\
                                    <p>{2}</p>\
                                    <a href="newsDetail.html?id={3}"><img src="img/more.png" alt="" /></a>\
                                    <div class="clearfix"></div>\
                                </div>\
                            </div>\
                            <div class="clearfix"></div>\
                        </div>';

            for (var i = 0; i < result.length; i++) {
            	var item = result[i];
            	var resultHtml = "";
            	resultHtml = html.replace(/\{0\}/g, item.time)
            					 .replace(/\{1\}/g, item.title)
            					 .replace(/\{2\}/g, item.description)
                                 .replace(/\{3\}/g, item.id)
                                 .replace(/\{4\}/g, item.url || defaultImg);
			 	$('#newsListBox').append(resultHtml);
            }

            ifrmFitContent();
		}
	});

    //iframe容器自适应内容
    function ifrmFitContent() {
        var h = $('#newsListBox').height();
        var spaceNum = 120; //留白间距
        var parentIfrm = $('iframe.content-box', parent.document);
        parentIfrm.height(h + spaceNum);
    }
});