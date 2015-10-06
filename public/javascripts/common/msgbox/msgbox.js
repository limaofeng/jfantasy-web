(function($) {
	var $msgbox = function(options) {
		var defaults = {
			msg : '系统提示',
			icon : 'clear',
			time : '1500'
		};
		var settings = jQuery.extend(defaults, options);
		var tipiconclass = "gtl_ico_" + settings.icon;
		$('#ts_Msgbox').remove();
		var box = "<div class=\"ts_msgbox_layer_wrap\" id=\"ts_Msgbox\" style=\"display:none\"><span class=\"ts_msgbox_layer\" style=\"z-index: 10000;\" id=\"mode_tips_v2\"><span class=\"" + tipiconclass + "\"></span>" + settings.msg + "<span class=\"gtl_end\"></span></span></div>";
		$("body").append(box);
		$('#ts_Msgbox').fadeIn();
		window.setTimeout(function() {
			$('#ts_Msgbox').fadeOut();
			if (settings.callback) {
				settings.callback();
			}
		}, settings.time);
	};
	$.msgbox = function(options) {
		return new $msgbox(options);
	};
	return $.msgbox;
})(jQuery);