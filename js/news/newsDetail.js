
$(function() {
	var id = $.getURLParam("id");
	$.ajax({
		url: 'http://47.106.177.128:16666/news/getNewsById?id='+ id,
		type: 'get',
		dataType: 'json',
		success: function(result) {
			$('#titleBox').html(result.title);
			$('#timeBox').html(result.time);
			$('#detailBox').html(result.content || result.description);
			
			setTimeout(function() {
				var h = $('#detailBox').height() + 120;
				var parentIfrm = $('iframe.content-box', parent.document);
				parentIfrm.height(h);
			}, 600);
		}
	});
});