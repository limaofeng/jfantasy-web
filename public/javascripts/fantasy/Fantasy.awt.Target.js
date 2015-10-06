Fantasy.util.jClass(Fantasy.util.Observable, {

    jClass: 'Fantasy.awt.Target',

    /**
     * a 与 form 标签的 target 属性扩展
     * @param $super
     * @param options
     */
    initialize: function ($super, options) {
        $super(['loadStart', 'load', 'loadComplete', 'destroy', 'refresh']);
        this.options = options;
        Fantasy.awt.Target.getTheme(this.options.theme).newInstance.apply(this);
    },

    load: function (url) {
        var _this = this;
        if (!(url instanceof jQuery)) {
            var ajaxSettings = {
                url: url,
                type: 'get',
                cache: false,
                success: function (data) {
                    //查找返回结果集中的js代码块
                    var jstxts = [];
                    var _importJs = [];
                    if (!$.isPlainObject(data)) {
                        data = data.replace(/[\f\r\v]/g, '').replace(/(\<script((.|\n)*?)\<\/script\>)/gi, function ($0) {
                            var jstxt = $0.replace(/<script[^>]*>|<\/script>|<SCRIPT[^>]*>|<\/SCRIPT>/g, '');
                            if (!!jstxt) {
                                jstxts.push(jstxt);
                                return "";
                            }else{
                                _importJs.push($($0).prop('src'));
                                return "";
                            }
                        });
                    }
                    var _loadHtml = function(){
                        var $ajaxLoadDivTemp = _this._html = _this.parse(data), $page$ = _this;
                        _this.fireEvent('load', _this, [$ajaxLoadDivTemp, ajaxSettings, jstxts]);
                        //执行js
                        jstxts.each(function () {
                            var jstxt = this.toString();
                            var $ = (function (_$) {
                                return Fantasy.copy(function () {
                                    if (arguments.length == 1 && typeof arguments[0] == 'string') {
                                        var _arguments = arguments;
                                        var _$dom = _this.parents().each(function(){
                                            if (_$(_arguments[0], this.get$Html()).length != 0) {
                                                return _$(_arguments[0], this.get$Html());
                                            }
                                        });
                                        if(!_$dom){
                                            console.error("页面不存在此元素：" + Array.prototype.concat.call([],_arguments));
                                            _$dom = _$.apply(this, arguments);
                                        }
                                        return _$dom;
                                    } else {
                                        return _$.apply(this, arguments);
                                    }
                                }, _$);
                            })(jQuery);
                            eval(jstxt);
                        });
                        Fantasy.defaultValue(_this._childPages,[]).clear();
                        _this.register();
                        _this.fireEvent('loadComplete', _this, [$ajaxLoadDivTemp]);
                        var _registerSI = setInterval(function(){
                            _this.register();
                        },100);
                        _this.one('destroy',function(){
                            console.log('=>destroy');
                            clearInterval(_registerSI);
                        });
                    };
                    if(!_importJs.length) {
                        _loadHtml.apply(this);
                    }else{
                        var _queue = [];
                        _queue.push(_loadHtml);
                        _importJs.each(function(){
                            var url = this;
                            _queue.push(function(){
                                $.get(url,function(){
                                    if(!!_queue.length) {
                                        _queue.pop().call();
                                    }
                                });
                            });
                        });
                        _queue.pop().call();
                    }
                }
            };
            _this.fireEvent('loadStart', this, [ajaxSettings]);
            jQuery.ajax(ajaxSettings);
        }else{
            this._html =  url;
            var _registerSI = setInterval(function(){
                _this.register();
            },100);
            _this.one('destroy',function(){
                console.log('>destroy');
                clearInterval(_registerSI);
            });
            this.register();
            this.fireEvent('loadComplete', this, [url]);
        }
        _this.one('destroy',function(){
            if(_this.options.theme != 'window'){
                _this._html = null;
            }
        });
    },

    /**
     * 注册 target 的 ajax 效果
     */
    register: function(){
        var _this = this;
        $.apply($,this.get$Html().is('body')?['a[target],form[target]']:['a[target],form[target]',this.get$Html()]).filter(function(){
            return !$(this).data('_target') && ['_blank','_self','_parent','_top'].indexOf($(this).attr('target')) == -1;
        }).data('_target',true).each(function () {
            $(this).target(_this);
        });
    },

    parent: function (page) {
        if (!!page) {
            this._parent = page;
        } else {
            return this._parent;
        }
    },

    parents: function(){
        var _parents = [this];
        var _parent = this.parent();
        while(!!_parent){
            _parents.push(_parent);
            _parent = _parent.parent();
        }
        return _parents;
    },

    children: function(){
        return Fantasy.defaultValue(this._childPages,[]);
    },

    addChildPage: function (page) {
        page.parent(this);
        if (!this._childPages) {
            this._childPages = [];
        }
        this._childPages.push(page);
            page.one('destroy',function(){
        });
    },

    parse: function (data) {
        return Fantasy.awt.Target.getTheme(this.options.theme).parse.apply(this, [data]);
    },

    refresh: function () {
        this.fireEvent('refresh', this, []);
    },

    getElement: function () {
        return this.element = Fantasy.get$Object(this.options.selector, this.options.target, $('body'));
    },

    get$Html: function(){
        return this._html;
    },

    destroy: function () {
        this.fireEvent('destroy', this, []);
    }

});
Fantasy.apply(Fantasy.awt.Target, {}, (function () {

    var themes = {};

    return {

        addTheme: function (key, theme) {
            themes[key] = Fantasy.copy({
                newInstance: function () {
                }
            }, theme);
        },

        getTheme: function (key) {
            return themes[key]
        }

    }

})());
