/*
 * $.hover事件的延时处理
 **/
(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return this.each(function() {
            $(this).hover(function() {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            }, function() {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });    
        });
    }      
})(jQuery);

$(function() {
	var enterTimer;
	$('#mainNav li.item').hover(function() {
		var self = this;
		enterTimer = setTimeout(function() {
			$('#mainNav li.item').removeClass('active');
			$(self).addClass('active');
			$(self).find('ul.sub-nav').slideDown();
		}, 200);
	}, function() {
		var self = this;
		clearTimeout(enterTimer);
		$(self).find('ul.sub-nav').slideUp();
	});

	$('#mainNav li.item ul.sub-nav li a').click(function() {
        var url = $(this).data('src');
        if (!url) return;
		window.location.href = url;
	});
});