
$(function() {
	//带有动画效果地回到页面顶部
	(function() {
		var hTag = $('body', parent.window.document);
        if ( $(hTag).scrollTop() ) {
            $(hTag).animate({scrollTop: 0}, 1000);
            return false;
        }
	})();
});