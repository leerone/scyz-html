
$(function() {
	//带有动画效果地回到页面顶部
	(function() {
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
	})();
});