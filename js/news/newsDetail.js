
$(function() {
	var id = $.getURLParam("id");
	$.ajax({
		url: 'http://47.106.177.128:16666/news/getNewsById?id='+ id,
		type: 'get',
		dataType: 'json',
		success: function(result) {
			debugger;
		}
	});
});