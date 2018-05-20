
$(function() {
    $.ajax({
		url: 'http://47.106.177.128:16666/hr/getHrList?type=&page=1',
		type: 'get',
		dataType: 'json',
		success: function(result) {
			var html = '<tr class="{8} wow fadeInUp element-item {9}" data-wow-delay="1s">\
                            <td class="tbl-logo"><img src="img/job-logo1.png" alt=""></td>\
                            <td class="tbl-title">\
                                <h4> {0} <br><span class="job-type">全职</span></h4></td>\
                            <td class="tbl-desc">\
                                <p> {1} </p>\
                            </td>\
                            <td class="tbl-address">\
                                <p><i class="fa fa-location-arrow"></i> {2} </p>\
                            </td>\
                            <td class="tbl-number">\
                                <p><i class="fa fa-male"></i> {3}名</p>\
                            </td>\
                            <td class="tbl-price">\
                                <p>面议</p>\
                            </td>\
                            <td class="tbl-apply"><a data-toggle="modal" data-target="#popView{4}">即刻应聘</a></td>\
                        </tr>\
                        <div class="modal fade" id="popView{4}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
                            <div class="modal-dialog">\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                        <h4 class="modal-title" id="">招聘详情</h4>\
                                    </div>\
                                    <div class="modal-body">\
                                        <div class="modal-hr-title"> {5} </div>\
                                        <span class="modal-hr-sub-title">工作职责</span>\
                                        <div id="jobResponsibility"> {6} </div>\
                                        <span class="modal-hr-sub-title">职责要求</span>\
                                        <div id="jobDemand"> {7} </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
            
            for (var i = 0; i < result.length; i++) {
            	var numType = i % 2 == 0 ? 'even' : 'odd';
            	var item = result[i];
            	var resultHtml = "";
            	resultHtml = html.replace(/\{0\}/g, item.name)
            					 .replace(/\{1\}/g, item.description)
            					 .replace(/\{2\}/g, item.address)
                                 .replace(/\{3\}/g, item.number)
                                 .replace(/\{4\}/g, item.id)
                                 .replace(/\{5\}/g, item.name)
                                 .replace(/\{6\}/g, item.desc1)
                                 .replace(/\{7\}/g, item.desc2)
                                 .replace(/\{8\}/g, numType)
                                 .replace(/\{9\}/g, getType(item.type));
                
			 	$('#hrListBox').append(resultHtml);
            }

            $('html').append('<script type="text/javascript" src="js/jquery.isotope.js"></script>');
            $('html').append('<script type="text/javascript" src="js/wow.js"></script>');

            bindEvent();
            ifrmFitContent();
		}
	});

	function bindEvent() {
		var $container = $('.isotope').isotope({
	        itemSelector: '.element-item',
	        layoutMode: 'fitRows',
	    });

	    $('#filters').on('click', 'a', function() {
	        var filterValue = $(this).attr('data-filter');
	        $('#filters ul li a').removeClass('active');
	        $(this).addClass('active');
	        $container.isotope({ filter: filterValue });
	    });
	}

    //iframe容器自适应内容
    function ifrmFitContent() {
        var h = $('#zhaopin').height();
        var spaceNum = 50; //留白间距
        var parentIfrm = $('iframe.content-box', parent.document);
        parentIfrm.height(h + spaceNum);
    }

    function getType(t) {
        var type = "";
        switch (t) {
            case "sheji":
                type = 'design';   //设计
            break;

            case "sale":
                type = 'sale';     //销售
            break;

            case "manage":
                type = 'manager';  //管理
            break;
        }
        return type;
    }

});