
$(function() {
	var baseUrl = 'http://47.106.177.128:16668/uploadimage/';
    $.ajax({
		url: 'http://47.106.177.128:16666/case/getCaseList?type=&page=1',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			var html = '<div style="position: absolute; left: 0px; top: 0px; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1); width: 337px; height: 253px; opacity: 1;" class="portfolio-item one-four {0} isotope-item">\
		                    <div class="portfolio_img">\
		                        <img src="{1}" alt="Portfolio 1" />\
		                    </div>\
		                    <div class="item_overlay">\
		                        <div class="item_info">\
		                            <a href="caseDetail.html?id={2}"><h4 class="project_name">{3}</h4></a>\
		                        </div>\
		                    </div>\
		                </div>';

            for (var i = 0; i < result.length; i++) {
            	var item = result[i];
            	var resultHtml = "", defaultImg = "img/hangye3.jpg";
            	resultHtml = html.replace(/\{0\}/g, getType(item.type))
            					 .replace(/\{1\}/g, baseUrl + item.url)
            					 .replace(/\{2\}/g, item.id)
                                 .replace(/\{3\}/g, item.name);
			 	$('#portfolio_wrapper').append(resultHtml);
            }

            $('html').append('<script type="text/javascript" src="js/wow.js"></script>');
            $('html').append('<script type="text/javascript" src="js/custom.js"></script>');
			
			selectCurCaseType();
		}
	});

	function getType(t) {
		var type = "";
		switch (t) {
	        case "ganzi":
	            type = 'qita'; //甘孜
	        break;

	        case "chuanwai":
	            type = 'yiliao';   //川外
	        break;

	        case "chuannei":
	            type = 'jiaoyu';   //川内
	        break;
	    }
	    return type;
	}

	function selectCurCaseType() {
		debugger;
		var casetype = $.getURLParam("casetype");
        $('.clearfix li a').removeClass('active');

        /*$('#all').removeAttr('id');
        $('.'+casetype+'cls').attr('id','all');*/
        setTimeout(function(){
            $('#'+casetype).trigger('click')
        }, 100)

        $('.item_overlay').click(function() {
            var url = $(this).find('.item_info a').attr('href');
            window.location.href = url;
        });
	}
});