/*
 * 企业新闻
 **/

$(function() {
	$.ajax({
		url: 'http://47.106.177.128:16666/news/getNewsList?type=qiye&page=1',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			var html = '<div class="article animated"  data-wow-delay=".9s">\
                            <div class="article-left">\
                                <a href="newsDetail.html?id={3}"><img src="img/business3.jpg"></a>\
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
            					 .replace(/\{3\}/g, item.id);
			 	$('#newsListBox').append(resultHtml);
            }
		}
	});
});