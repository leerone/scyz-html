$(function() {
	$('#mainNav li.item').hover(function() {
		$('#mainNav li.item').removeClass('active');
		$(this).addClass('active');
		$(this).find('ul.sub-nav').slideDown();
	}, function() {
		$(this).find('ul.sub-nav').slideUp();
	});
});