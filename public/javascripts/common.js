var request = (function() {

	return {
		getContextPath : function() {
			if(typeof(contextPath) == "undefined") {
				var pathName = document.location.pathname;
				var index = pathName.substr(1).indexOf("/");
				window.contextPath = pathName.substr(0, index + 1);
			}
			return window.contextPath;
		},
	
		getQueryString : function(){
			var url = document.location.href;
			return url.indexOf("#")==-1?url.substr(url.indexOf("?")+1):url.substr(url.indexOf("?")+1,url.indexOf("#"));
		}
	};
})();
var stopDefault = function(e, noBubbles){
	var evt = e || window.event;
	evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
	noBubbles && evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
	return false;
};
jQuery.extend({
	
	includePath : /[a-zA-Z]:$/.test(request.getContextPath())?'../':window.location.protocol+'//' + window.location.host + request.getContextPath() + '/',//WebContent/
	
	/**
	 * js 加载 Css 及 JavaScript
	 */
	include : function(file) {
		var files = typeof file == "string" ? [ file ] : file;
		for ( var i = 0; i < files.length; i++) {
			var name = files[i].replace(/^\s|\s$/g, "");
			var att = name.split('.');
			var ext = att[att.length - 1].toLowerCase();
			var isCSS = ext == "css";
			var tag = isCSS ? "link" : "script";
			var attr = isCSS ? " type='text/css' rel='stylesheet' ":" language='javascript' type='text/javascript' ";
			var link = (isCSS ? "href" : "src") + "='" + $.includePath + name +"'";
			if ($(tag + "[" + link + "]").length == 0)
				document.write("<" + tag + attr + link + " charset=\"utf-8\"" + (tag == "link" ? "/>" : ("></" + tag + ">")));
		}
	}

});

jQuery.include('javascripts/fantasy/Fantasy.js');
jQuery.include('javascripts/fantasy/style/fantasy.css');
jQuery.include('javascripts/fantasy/String.js');
jQuery.include('javascripts/fantasy/Array.js');
jQuery.include('javascripts/fantasy/Date.js');
jQuery.include('javascripts/fantasy/Object.js');
/***********************************************************\
 *			Fantasy.util									*
 *[描    述] JS 框架	公共包									    *
 \***********************************************************/
jQuery.include('javascripts/fantasy/Fantasy.util.jClass.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Object.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Class.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Observable.js');
jQuery.include('javascripts/fantasy/Fantasy.data.Property.js');
jQuery.include('javascripts/fantasy/Fantasy.util.List.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Map.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Proxy.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Invocation.js');
jQuery.include('javascripts/fantasy/Fantasy.util.StringUtil.js');
jQuery.include('javascripts/fantasy/Fantasy.util.ObjectUtil.js');
jQuery.include('javascripts/fantasy/Fantasy.util.MathUtil.js');
jQuery.include('javascripts/fantasy/Fantasy.util.DateUtil.js');
jQuery.include('javascripts/fantasy/Fantasy.util.JSON.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Format.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Template.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Drag.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Resize.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Cache.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.ImgCropper.js');
jQuery.include('javascripts/fantasy/Fantasy.state.Provider.js');
jQuery.include('javascripts/fantasy/Fantasy.state.CookieProvider.js');
jQuery.include('javascripts/fantasy/Fantasy.util.Cookie.js');
jQuery.include('javascripts/fantasy/Fantasy.data.SortTypes.js');
jQuery.include('javascripts/fantasy/Fantasy.data.Field.js');
jQuery.include('javascripts/fantasy/Fantasy.Ajax.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Field.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Element.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Template.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.SweetTemplate.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.View.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Form.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Grid.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Pager.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Box.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.ConfirmBox.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.SelectMenu.js');
//jQuery.include('javascripts/fantasy/Fantasy.awt.AutoComplete.js');
jQuery.include(['javascripts/fantasy/Fantasy.awt.Node.js','javascripts/fantasy/Fantasy.awt.Tree.js']);
jQuery.include('javascripts/fantasy/Fantasy.awt.Upload.js');
jQuery.include('javascripts/fantasy/Fantasy.awt.Target.js');

jQuery.include(['javascripts/jquery/jquery.uniform.js']);
jQuery.include(['javascripts/common/select2/select2.js','javascripts/common/select2/select2_locale_zh-CN.js']);
jQuery.include(['javascripts/jquery/jquery.tagsinput.min.js']);

//jQuery.include(['static/bootstrap/css/bootstrap.min.css','static/bootstrap/js/bootstrap.min.js']);

jQuery.include(['javascripts/bootstrap/js/bootstrap-colorpicker.js','javascripts/bootstrap/js/bootstrap-wysihtml5.js','javascripts/bootstrap/js/bootstrap-datepicker.js']);

jQuery.include(['javascripts/bootstrap/js/holder.js']);

jQuery.include(['javascripts/jquery/jquery.maskedinput.js']);//jquery.mask.js

jQuery.include('javascripts/jquery/jquery.form.js');

jQuery.include(['javascripts/common/My97DatePicker/WdatePicker.js']);
//import artDialog 4.1.6
jQuery.include(['javascripts/common/artDialog/skins/default.css','javascripts/common/artDialog/jquery.artDialog.source.js','javascripts/common/artDialog/plugins/iframeTools.source.js']);
//js 模板插件
jQuery.include('javascripts/jquery/sweet-jquery-plugin-v1.1.js');

//jQuery.include(['javascripts/common/scroll/touchScroll.dev.js']);

jQuery.include(['javascripts/common/zTree/css/zTreeStyle/zTreeStyle.css','javascripts/common/zTree/jquery.ztree.core-3.1.js','javascripts/common/zTree/jquery.ztree.excheck-3.1.js','javascripts/common/zTree/jquery.ztree.exedit-3.1.js']);

//jQuery.include(['javascripts/common/tip/jquery.tipTip.min.js','javascripts/common/tip/tip.css']);

//jQuery.include(['javascripts/common/syntaxhighlighter/styles/syntaxHighlighter.css','javascripts/common/syntaxhighlighter/scripts/shCore.js']);

//jQuery.include(['javascripts/common/highcharts/highcharts.src.js','javascripts/common/highcharts/modules/exporting.src.js']);

//jQuery.include(['javascripts/common/swfupload/default.css','javascripts/common/swfupload/swfupload.js','javascripts/common/swfupload/swfupload.queue.js','javascripts/common/swfupload/fileprogress.js','javascripts/common/swfupload/handlers.js']);

//jQuery.include(['javascripts/dsb/SelectTree.js']);

jQuery.include(['javascripts/common/kindeditor/kindeditor.js']);

jQuery.include(['javascripts/common/ckeditor/ckeditor.js','javascripts/common/ckeditor/adapters/jquery.js']);

jQuery.include(['javascripts/common/msgbox/msgbox.css','javascripts/common/msgbox/msgbox.js']);

//jQuery.include(['javascripts/common/formvalidator/formValidator-4.1.3.js','javascripts/common/formvalidator/formValidatorRegex.js']);
//简化select级联操作
jQuery.include('javascripts/jquery/jquery.select3.js');

jQuery.include('javascripts/jquery/jquery.target.js');

//jQuery.include(['javascripts/common/formvalidator/themes/Default/js/theme.js']);//,'javascripts/common/formvalidator/themes/SolidBox/style/style.css'

//jQuery.include(['javascripts/file/swfobject.js','javascripts/file/flexpaper_flash.js']);
//jQuery.include(['javascripts/jquery/jquery.qtip.min.js','static/css/jquery.qtip.min.css']);

//jQuery.include('javascripts/fantasy/style/pageStyle.css');

//jQuery.include(['javascripts/common/thickbox/thickbox-compressed.js','javascripts/common/thickbox/thickbox.css']);
//jQuery.include(['javascripts/common/applelike/styles.css','javascripts/common/applelike/script.js']);

//jQuery.include(['javascripts/common/modernizr/modernizr.custom.js','javascripts/common/modernizr/waypoints.js']);

//jQuery.include(['javascripts/common/mobiscroll/css/mobiscroll-2.0.1.full.min.css']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.core.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.datetime.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.select.js']);
////jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.zepto.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.ios.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.jqm.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.android.js']);
//jQuery.include(['javascripts/common/mobiscroll/dev/js/mobiscroll.android-ics.js']);
///*'javascripts/common/autocomplete/jquery.autocomplete.css',*/
jQuery.include(['javascripts/common/autocomplete/jquery.autocomplete.js']);

jQuery.include(['javascripts/jquery/jquery.util.js','javascripts/jquery/jquery.selection.box.js','javascripts/initialize.js']);

jQuery.include(['javascripts/common/upload/jquery.upload.js','javascripts/common/upload/css/upload.css']);

jQuery.include(['javascripts/jquery/jquery.dataGrid.js']);

//外部插件
/*
jQuery.include('javascripts/jquery/jquery.ui.custom.js');
jQuery.include('javascripts/jquery/jquery.validate.js');
jQuery.include('javascripts/jquery/jquery.validate.messages_cn.js');
jQuery.include('javascripts/jquery/jquery.wizard.js');
*/

//
jQuery.include('javascripts/common/hashme/hashme.js');
//jQuery.include('javascripts/common/hashme/filedrag.js');
jQuery.include('javascripts/common/hashme/md5.js');

//jQuery.include(['javascripts/common/emailInput/css/emailInput.css','javascripts/common/emailInput/jquery.email.js']);

jQuery.include(['javascripts/common/sly/jquery.sly.js','javascripts/jquery/jquery.easing-1.3.min.js','javascripts/common/sly/css/style.css']);

jQuery.include('javascripts/config.js?'+Math.floor(Math.random() * 100));
jQuery.include('javascripts/area.js?'+Math.floor(Math.random() * 100));