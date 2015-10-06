jQuery.extend({

    target: function (key, theme) {
        Fantasy.awt.Target.addTheme(key, theme);
    }

});
jQuery.fn.extend({

    target: function (page) {//trigger
        if (!$(this).data('target')) {
            if(!$(this).attr('target') || $(this).attr('target').indexOf(':') == -1){
                return;
            }
            var attrTarget = $(this).attr('target').split(':');
            var _target = new Fantasy.awt.Target({theme: attrTarget[0], target: $(this), selector: attrTarget[1]});
            page.addChildPage(_target);
            $(this).click(function (e) {
                try {
                    _target.load($(this).attr('href'));
                }catch (e){
                    console.error(e);
                }
                stopDefault(e);
            });
            $(this).data('target', _target);
        }
        return $(this).data('target');
    }

});
$.target('window', {

    newInstance: function () {
        this.on('loadComplete', function ($html) {
        });
    },

    parse: function (data) {
        var _element = this.getElement();
        return _element.html(data);
    }

});
$.target('top', {

    newInstance: function () {
        this.on('load', function (html, ajaxSettings) {
            history.pushState(null, document.title, ajaxSettings.url);
            this.one('destroy',function(){
            });
        });
        this.on('loadComplete', function ($html) {
            $html.initialize();
        });
    },

    parse: function (data) {
        var _element = this.getElement();
        this.parent().destroy();
        this.parent().children().each(function(){
            this.destroy();
        });
        return _element.html(data);
    }

});
$.target('html', {

    newInstance: function () {
        this.on('load', function (html) {
            this.one('destroy',function(){
            });
        });
        this.on('loadComplete', function ($html) {
            $html.initialize();
        });
    },

    parse: function (data) {
        var _element = this.getElement();
        this.parent().destroy();
        return _element.html(data);
    }

});
$.target('after', {

    newInstance: function () {
        this.on('load', function (html) {
            this.one('destroy',function(){
            });
        });
        this.on('loadComplete', function ($html) {
            $html.initialize();
            this.backpage = function () {
                this.destroy();
                this.parent().refresh();
                //this.parent().get$Html().show();
                this.getElement().show().next().remove();
                $(window).resize();
            };
            $('.back-page', $html).click(function (zhis) {
                return function (e) {
                    zhis.backpage();
                    return stopDefault(e);
                }
            }(this));
        });
    },

    parse: function (data) {
        var $tmp = $('<div class="ajax-load-div"></div>').html(data);
        this.getElement().hide().after($tmp);
        return $tmp;
    }

});
$(function(){
    if (!window.$page$) {
        window.$page$ = new Fantasy.awt.Target({theme: 'window'});
    }
});