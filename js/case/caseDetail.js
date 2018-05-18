
$(function() {
	var baseUrl = 'http://47.106.177.128:16668/uploadimage/';
	var id = $.getURLParam("id");
	$.ajax({
		url: 'http://47.106.177.128:16666/case/getCaseById?id='+ id,
		type: 'get',
		dataType: 'json',
		success: function(result) {
			$('#breadcrumb, #projName').html(result.name);
			$('#sumyImage').attr('src', baseUrl + result.url);
			$('#mainTitle').html(result.title);
			$('#subTitle').html(result.subtitle);
			$('#summary').html(result.content);

			//$('#designContent').html();
			$('#projAddress').html(result.address);
			$('#projAllArea').html(result.coverage);
			$('#projAllHeight').html(result.height);
			$('#projDate').html(result.finishtime);
			
			var h = $('#detailBox').height();
			var parentIfrm = $('iframe.content-box', parent.document);
			parentIfrm.height(h);
		}
	});
});