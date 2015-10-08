$(function () {
    //---------------------------------------------------------------------------------------------
//	if ($("a#totop").length){ jQuery.scrollToTop("a#totop"); }
    //---------------------------------------------------------------------------------------------对话框全局配置
//	Fantasy.copy(artDialog.defaults,{lock:true});
    //---------------------------------------------------------------------------------------------ajax加载进度
    /*
     Fantasy.Ajax.on('send',function(event, xhr, s){
     if (!(s.data && (Fantasy.isString(s.data)?Fantasy.parseQuery(s.data):s.data)['proFlag'] == 'false')) {
     s.progress = top.jQuery.progress().start();
     }
     });
     Fantasy.Ajax.on('complete',function(event, xhr, s){
     if (!(s.data && (Fantasy.isString(s.data)?Fantasy.parseQuery(s.data):s.data)['proFlag'] == 'false')) {
     if(s.progress){
     s.progress.stop();
     }
     }
     });
     */
    //---------------------------------------------------------------------------------------------翻页标签配置
    Fantasy.apply(Fantasy.awt.Pager, {}, {
        getArray: function (totalPage, currentPage, pageNumber) {
            var arraylist = [];
            // 循环产生页码 产生数量最多为11个 前1个 4 《当前页》4 后一个
            for (var i = 1, size = 1; i <= totalPage && size <= (pageNumber * 2 + 1); i++) {
                if ((currentPage > totalPage - (pageNumber + 1) && i + (pageNumber * 2 + 1) > totalPage)// 当前页在前5位
                    || (i > currentPage - (pageNumber + 1) && i < currentPage)) {
                    arraylist.push(i);
                    size++;
                } else if (i == currentPage) {// 添加当前页
                    arraylist.push(i);
                    size++;
                } else if (i > currentPage && i < currentPage + (pageNumber + 1) && size < (pageNumber * 2 + 1)) {// 当前页在后5位
                    arraylist.push(i);
                    size++;
                } else if (size > (pageNumber + 1) && size <= (pageNumber * 2 + 1)) {
                    arraylist.push(i);
                    size++;
                }
            }
            return arraylist;
        },
        template: $.Sweet('<a href="?page=1" class="first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default <[if(currentPage == 1){]>ui-state-disabled<[}]>" tabindex="0">第一页</a>' +
            '<a href="?page=<[=currentPage==1?currentPage:currentPage-1]>" class="previous fg-button ui-button ui-state-default <[if(currentPage == 1){]>ui-state-disabled<[}]>" tabindex="0">上一页</a>' +
            '<span><[' +
            'var array = Fantasy.awt.Pager.getArray(totalPage, currentPage, 2);' +
            'foreach( array as item){]>' +
            '<a  href="?page=<[=item]>" class="fg-button ui-button <[if(currentPage == item){]>ui-state-disabled<[}]>" tabindex="0"><[=item]></a>' +
            '<[}]></span>' +
            '<a href="?page=<[=currentPage==totalPage?totalPage:currentPage+1]>" class="next fg-button ui-button ui-state-default <[if(currentPage == totalPage){]>ui-state-disabled<[}]>" tabindex="0">下一页</a>' +
            '<a href="?page=<[=totalPage]>"class="last ui-corner-tr ui-corner-br fg-button ui-button ui-state-default <[if(currentPage == totalPage){]>ui-state-disabled<[}]>" tabindex="0">最后一页</a>')
    });
    //---------------------------------------------------------------------------------------------初始化方法配置
    var initializes = [];
    var _initialize = function () {
        var context = this instanceof jQuery ? this : $(this);

        var contexts = !arguments.callee.contexts ? arguments.callee.contexts = [] : arguments.callee.contexts;
        contexts.insert(0, context);
        //TODO contexts = [context]
        initializes.each(function (index) {
            this.apply(context, [context]);
        });
    };
    var get$ = function (expr, z, $context) {//支持jquery表达式
        return (/[)]$/.test(expr) ? eval('(z.' + expr + ')') : $(expr, $context));
    };
    initializes.push(function () {
        $('.number', this).each(function (index, zhis) {
            if ($(zhis).data('_number')){
                return;
            }
            var format = $(zhis).attr('format');
            var setVal = function(val){
                val = val.replace(/[^\d.]/g,'');
                $(zhis).val(!!format?Fantasy.number(val,format):val);
            };
            $(zhis).data('_number', true).keyup(function(){
                setVal(this.value);
            }).bind("afterpaste",function(){
                setVal(this.value);
            });
        });
    });
    //---------------------------------------------------------------------------------------------加载日期控件
    initializes.push(function () {
        $('[date],.datepicker', this).each(function (index, zhis) {
            if ($(zhis).data('_date'))
                return;
            $(zhis).data('_date', true);
            $(zhis).addClass('Wdate');
            //$(zhis).attr('readonly', true);
            var _settings = !!$(zhis).attr('date') ? eval('('+ $(zhis).attr('date').replace(/\$\([^(^)]+\).val\(\)/g, function () {
                return '"#F{' + arguments[0] + '}"';//'new Function("return " + "' +  + ';")';
            })+ ')') : {dateFmt:$(zhis).data('format')};
            var settings = Fantasy.merge(_settings  || {}, {
                maxDate: '2099-10-01',
                minDate: '1900-01-01',
                dateFmt: 'yyyy-MM-dd',
                skin: 'ext'
            });
            if (/ipad/.test(jQuery.userAgent)) {
                var fmt = settings.dateFmt.split(' ')[0];
                var timeWheels = settings.dateFmt.split(' ').length > 1 ? settings.dateFmt.split(' ')[1] : null;
                var _setting = {
                    dateFormat: fmt.replaceAll('MM', 'mm'),
                    theme: 'ios',
                    mode: 'scroller',
                    endYear: new Date().getFullYear() + 100
                };
                _setting.preset = timeWheels ? 'datetime' : 'date';
                _setting.dateOrder = fmt;
                if (timeWheels) {
                    _setting.timeWheels = timeWheels.replaceAll('mm', 'ii');// 'HHii';
                    _setting.timeFormat = timeWheels.replaceAll('mm', 'ii');
                }
                $(zhis).scroller(_setting);
                $(zhis).click(function () {
                    $(zhis).scroller('show');
                });
            } else {
                $(zhis).data('date_settings', settings).click(function () {
                    WdatePicker(settings);
                });
            }
        });
    });
    //---------------------------------------------------------------------------------------------jquery.select.js扩展操作
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('select[href]', this).each(function (index, zhis) {
            if ($(zhis).data('_select'))
                return;
            $(zhis).data('_select', true);
            var url = $(zhis).attr("href");
            var select = $(zhis).select(eval('(' + $(this).attr('mapping') + ')'));
            $.post(url, function (data) {
                select.load(data);
            });
        });
    });
    //---------------------------------------------------------------------------------------------uniform 效果
    initializes.push(function () {
        $('input[type=checkbox],input[type=radio],input[type=file]', this).each(function () {
            if ($(this).data('_uniform')) {
                return;
            }
            if ($(this).closest('.checker > span').length > 0) {
                $(this).unwrap().unwrap();
            }
            $(this).data('_uniform', true).uniform().change();
            if ($(this).is('[type=checkbox]')) {
                $(this).change(function () {
                    if ($(this).is(":checked")) {
                        $(this).closest('.checker > span').addClass('checked');
                    } else {
                        $(this).closest('.checker > span').removeClass('checked');
                    }
                });
            }
        });
    });
    //---------------------------------------------------------------------------------------------select2插件
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('select', this).filter(function(){
            return !$(this).data('_select2');
        }).each(function () {
            $(this).removeClass('select2-offscreen').prev('.select2-container').remove();
            var settings = {};
            if ($(this).width() != 0) {
                settings.width = $(this).width() + 'px';
            }
            $(this).data('_select2', true).select2(settings).on('remove', function () {
                $(this).off('remove').data('select2').destroy();
            });
        });
    });
    //---------------------------------------------------------------------------------------------select2_tags插件
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('input.tags', this).each(function () {
            if ($(this).data('_select2_tags'))
                return;
            var settings = {tags: []};
            if (!!$(this).attr('tags')) {
                settings.tags = $(this).attr('tags').split(',')
            }
            $(this).data('_select2_tags', true).select2(settings);
        });
    });
    //---------------------------------------------------------------------------------------------tagsInput插件
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('input.tagsInput', this).each(function () {
            if ($(this).data('_tagsInput'))
                return;
            $(this).data('_tagsInput', true).tagsInput({
                'width': '100%',
                'height': 'auto',
                'defaultText': $(this).attr('placeholder'),
                'onAddTag': function (text) {
                },
                'onRemoveTag': function (text) {
                }
            });
        });
    });
    // ---------------------------------------------------------------------------------------------colorpicker插件
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('.colorpicker', this).each(function () {
            if ($(this).data('_colorpicker')) {
                return;
            }
            $(this).data('_colorpicker', true).colorpicker();
        });
    });
    //---------------------------------------------------------------------------------------------datepicker插件
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $('.datepicker', this).each(function () {
            if ($(this).data('_datepicker')) {
                return;
            }
            $(this).data('_datepicker', true).datepicker();
        });
    });
    //---------------------------------------------------------------------------------------------mask
    initializes.push(function () {
        if($.browser.msie){
            return;
        }
        $(".mask-mobile", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("999-9999-9999");
        });
        $(".mask-phone", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("(999) 999-9999");//{completed:function(){alert("Callback action after complete");}}
        });
        $(".mask-phoneExt", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("(999) 999-9999? x99999");
        });
        $(".mask-phoneInt", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("+40 999 999 999");
        });
        $(".mask-date", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("99/99/9999");
        });
        $(".mask-ssn", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("999-99-9999");
        });
        $(".mask-productKey", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("a*-999-a999", { placeholder: "*" });
        });
        $(".mask-eyeScript", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("~9.99 ~9.99 999");
        });
        $(".mask-percent", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask("99%");
        });
        $(".mask-custom", this).each(function () {
            if ($(this).data('_mask'))
                return;
            $(this).data('_mask', true).mask($(this).data('mask'));
        });
    });
    //---------------------------------------------------------------------------------------------checkbox全选效果
    initializes.push(function ($context) {
        $('[checkAll]', this).filter(function(){
            return !$(this).data('_checkAll');
        }).data('_checkAll', true).each(function (index, zhis) {//TODO [checkAll!=""]匹配规则有点问题
            //如果为body触发。选择最顶层的div
            if ($($context).is('body')) {
                var $temp = $(zhis).parents('body>div');
                if ($temp.length != 0) {
                    $context = $($temp[0]);
                }
            }
            $(zhis).attr('checked', false);
            var getItems = (function (expr) {
                return function () {
                    return get$(expr, $(zhis), $context);//支持jquery表达式
                };
            })($(zhis).attr('checkAll'));
            getItems().closest('tr').removeClass('row_checked');//选中行的样式
            var tipSetting = Fantasy.decode($(this).attr('checktip'));
            if (!!tipSetting) {
                var setTip = function (title) {//显示选中提示
                    $(tipSetting.tip, $context).html(title);
                };
                $(zhis).on('tip', function (target, items, length) {
                    if (length > 0) {
                        setTip(Fantasy.getTemplate(tipSetting.message).applyTemplate({num: length}));
                    } else {
                        setTip("");
                    }
                });
            }
            $(zhis).change(function () {
                setTimeout(function () {//延时处理,防止initializes绑定的事件在该方法之前触发
                    $(zhis).triggerHandler('tip', [getItems(), getItems().filter(":checked").length]);
                }, 10);
            });
            $(zhis).bind('change', function () {
                if ($(this).data('ignore')) {
                    $(this).removeData('ignore');
                    return;
                }
                if (this.checked) {
                    getItems().filter((function(_trigger){
                        return function(){
                            return this != _trigger;
                        };
                    })($(this).data('_trigger'))).data('_trigger',this).checkedAll().closest('tr').addClass('row_checked');
                } else {
                    getItems().filter((function(_trigger){
                        return function(){
                            return this != _trigger;
                        };
                    })($(this).data('_trigger'))).data('_trigger',this).checkedNo().closest('tr').removeClass('row_checked');
                }
                $(this).removeData('_trigger');
            });
            //定时器定时判断是否全选
            if(!!window.checkId){
                window.checkId = 0;
            }
            var checkId = 'check-' + (window.checkId++), items;
            var interval = setInterval(function () {
                if($(zhis).is(':hidden')){
                    return;
                }
                (items = getItems()).each(function () {
                    if ($(this).data(checkId))
                        return;
                    $(this).data(checkId, true);
                    $(this).change(function () {
                        $(zhis).filter((function(_trigger){
                            return function(){
                                return this != _trigger;
                            };
                        })($(this).data('_trigger'))).data('_trigger',this).data('ignore',!(items.filter(':checked').length == items.length || items.filter(':checked').length == 0)).prop('checked', items.filter(':checked').length == items.length).change();
                        $(this).removeData('_trigger');
                    }).change();
                });
            }, 1000);
            $context.on('remove', function () {
                clearInterval(interval);
            });
        });
    });
    //---------------------------------------------------------------------------------------------编辑器
    initializes.push(function () {
        $('.KindEditor', this).each(function () {
            if ($(this).data('_KindEditor'))
                return;
            $(this).data('_KindEditor', true);
            var editor = KindEditor.create(this, {
                uploadJson: request.getContextPath() + '/file/upload.do',
                //cssPath: [request.getContextPath() + '/css/basic.css', request.getContextPath() + '/css/important.css', request.getContextPath() + '/css/font.css', request.getContextPath() + '/css/layout.css'],
                filePostName: 'attach',
                dirName: 'editor',
                dataFilter: function (data) {
                    data.url = request.getContextPath() + '/' + data.absolutePath;
                    data.error = 0;
                    return data;
                },
//				fileManagerJson : request.getContextPath() + '/file/manager.do',
//				allowFileManager : true,
                filterMode: false,
                themeType: 'simple',
                resizeType: 0,
                /*pasteType : 0 ,,'plainpaste','wordpaste'*/
                items: ['source' , 'preview', '|', 'bold', 'italic', 'underline', 'strikethrough', 'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'plug-align', 'plug-order', 'plug-indent', '|', 'image']
            });
            $(this).data('editor', editor).change(function () {
                editor.html($(this).val());
            });
            if ($(this).closest('form').length > 0) {
                $(this).closest('form').submit(function () {
                    editor.sync();
                });
            }
            if (!!$(this).attr('readonly')) {
                setTimeout(function () {
                    editor.readonly();
                }, 1000);
            }
        });
    });
    initializes.push(function () {
        $('.ckeditor', this).each(function () {
            if ($(this).data('_ckeditor'))
                return;
            $(this).data('_ckeditor', true).ckeditor({
                fullPage: true,
                allowedContent: true
            });
        });
    });
    //---------------------------------------------------------------------------------------------编辑器
    initializes.push(function () {
        $('[toggle]', this).each(function () {
            if ($(this).data('_toggle'))
                return;
            $(this).data('_toggle', true);
            var toggle = $(this).attr('toggle'), t = $(this);
            toggle = /[)]$/.test(toggle) ? eval('(t.' + toggle + ')') : $(toggle);
            toggle.hover(function (e) {
                t.show();
                return stopDefault(e);
            }, function (e) {
                t.css('display', 'none');//TODO t.hide() 方法会出现 message "Component is not available" 异常
                return stopDefault(e);
            });
            t.hide();
        });
    });
    //---------------------------------------------------------------------------------------------图片加载时显示缩略图
    $('img[lowsrc]', this).each(function () {
        if ($(this).data('_lowsrc'))
            return;
        var $img = $(this).data('_lowsrc', true);
        var img = new Image();
        img.src = $img.attr('src');
        var min = $img.attr('lowsrc');
        min = min == '' ? img.src : min;
        var re = /_((\d+)[_](\d+))\./;
        //----start 该代码块需后台支持
        if (img.src.endsWith(min)) {//地址相同
            if (re.test(img.src)) {//地址带尺寸
                var arr = re.exec(min);
                min = img.src.replace(re, '_' + Fantasy.toInt(Fantasy.toInt(arr[2]) / 3) + 'x' + Fantasy.toInt(Fantasy.toInt(arr[3]) / 3) + '.');
            } else {//不带尺寸
                min = img.src.replace(/((\.jpg)|(\.png))/, '_' + Fantasy.toInt(Fantasy.toInt($img.width()) / 3) + 'x' + Fantasy.toInt(Fantasy.toInt($img.height()) / 3) + '$2');
            }
        }
        //----end
        $img.removeAttr('lowsrc').attr('src', min);
        img.onload = function () {
            $img.attr('src', this.src);
        };
    });
    //---------------------------------------------------------------------------------------------输入框提示
    initializes.push(function () {
        if (!$.browser.msie)
            return;
        $('[placeholder]', this).each(function () {
            if ($(this).data('_placeholder'))
                return;
            $(this).data('_placeholder', true).placeholder();
        });
    });
    //---------------------------------------------------------------------------------------------选项卡插件
    initializes.push(function ($context) {
        $('[tabs]', this).each(function () {
            if ($(this).data('tabs'))return;
            (function (zhis) {
                zhis.data('tabs', true);
                var settings = Fantasy.merge(eval('(' + zhis.attr('tabs') + ')') || {}, {
                    selectedClass: 'selected',
                    show: 'show',
                    event: 'click',
                    defaultClass: 'default'
                });
                //获取选项卡对应的元素
                var getTab = function ($tab) {
                    return get$($tab.attr('tab'), $tab, $context);
                };
                //隐藏选项卡并移除选中样式
                var un = function () {
                    zhis.find('[tab]').removeClass(settings.selectedClass);
                    zhis.find('[tab]').each(function () {
                        getTab($(this)).hide().find('input,select');
                        /*.attr('disabled',true);*/
                    });
                };
                //时间触发方法
                var event = function (event) {
                    if ($(this).hasClass(settings.selectedClass) && getTab($(this)).is(':visible'))return;
                    un.apply($context);
                    $(this).addClass(settings.selectedClass);
                    eval('$.fn.' + settings.show).apply(getTab($(this))).find('input,select');
                    /*.attr('disabled',false);*/
                    if ($(this).is('a')) {
                        try {
                            event.preventDefault();
                        } catch (e) {
                        }
                    }
                };
                //绑定事件
                zhis.find('[tab]').bind(settings.event, event);
                un.apply($context);
                //触发默认选中项
                event.apply(zhis.find('.' + settings.selectedClass).length == 0 ? zhis.find('[tab]').first()[0] : zhis.find('.' + settings.selectedClass)[0], [
                    {preventDefault: function () {
                    }}
                ]);
                //单独判断mouseover事件
                if (settings.event == 'mouseover' && settings.defaultClass && settings.container) {
                    settings.container.hover(function () {
                    },function () {
                        zhis.find('.' + settings.defaultClass).mouseover();
                    }).mouseout();
                }
            })($(this));
        });
    });
    //---------------------------------------------------------------------------------------------加载ajax插件,放在最后
    initializes.push(function () {
        var callback = function (type, target) {
            switch (type) {
                case 'html':
                    _initialize.apply(target);
                    break;
            }
        };
        return function () {
            $('a[ajax]', this).each(function (index, zhis) {
                if ($(zhis).data('_ajax'))
                    return;
                $(zhis).data('_ajax', true);
                var setting = Fantasy.merge(eval('(' + $(this).attr('ajax') + ')') || {}, jQuery.fn.ajax.settings);
                setting.callback = callback;
                $(this).ajax(setting);
            });
            $('form[ajax]', this).each(function (index, zhis) {
                if ($(zhis).data('_ajax'))
                    return;
                $(zhis).data('_ajax', true);
                var setting = Fantasy.merge(eval('(' + $(this).attr('ajax') + ')') || {}, jQuery.fn.ajax.settings);
                if (jQuery.isFunction(setting)) {
                    setting = {callback: setting};
                }else{
                    setting.callback = callback;
                }
                $(this).ajax(setting);
            });
        };
    }());
    //--------------------------------------------------------------------------------------------下载中文问题解决
    initializes.push(function () {
        if ($('#hideIframe').length == 0) {
            $('<iframe name="hideIframe" id="hideIframe" style="display:none"></iframe>').appendTo('body');
        }
        var $downloadForm = $('#downloadForm');
        if ($downloadForm.length == 0) {
            $downloadForm = $('<form id="downloadForm" action="" target="hideIframe" method="post"></form>').appendTo('body');
        }
        $('a.download', this).each(function (index, zhis) {
            if ($(zhis).data('_download'))
                return;
            $(zhis).data('_download', true);
            $(zhis).click(function (e) {
                var url = $(this).attr('href');
                var params = Fantasy.parseQuery(url);
                url = url.substr(0, url.indexOf('?') > -1 ? url.indexOf('?') : url.length);
                $downloadForm.attr('action', url).children().remove();
                $.each(params,function(key,value){
                    $('<input type="hidden" name="' + key + '"/>').val(value).appendTo($downloadForm);
                });
                $downloadForm.submit();
                return stopDefault(e);
            });
        });
    });
    //---------------------------------------------------------------------------------------------添加主题
    Holder.add_theme("upload", { background: "#EEEEEE", foreground: "gray", size: 12,font: "Alex Brush",text:"点击上传文件" });
    initializes.push(function () {
        $('.img-rounded,.img-circle,.img-thumbnail,img[data-src^="holder.js"]', this).each(function (index, zhis) {
            if($(zhis).data('_Holder') || !!$(zhis).attr('src'))
                return;
            Holder.run({images:$(zhis).data('_download', true).get(0)});
        });
    });

    _initialize.apply(document.body);
    //---------------------------------------------------------------------------------------------将初始化方法绑定到  jQuery.fn.initialize
    jQuery.fn.extend({

        initialize: function () {
            if ($(this).children().length == 0) {
                _initialize.apply($(this).parent());
            } else {
                _initialize.apply($(this));
            }
            return this;
        },

        //---------------------------------------------------------------------------------------------批量删除方法封装
        /**
         * 名称：batchExecute
         * 描述：批量操作的辅助方法
         * @param checkBox 全选复选框的jquery对象
         * @param pager 绑定的数据来源    [view/pager]
         * @param idName 额外参数        [提交的主键字段]
         * @param title 操作前的提示范本
         * @param callback 操作完成后的回调
         * @return
         */
        batchExecute: function (checkBox, pager, idName, title, callback) {
            var getItems = (function (ele, expr) {
                return function () {
                    return get$(expr, checkBox, ele.length != 0 ? ele : $('body'));
                };
            })(checkBox.closest('.ajax-load-div'), checkBox.attr('checkAll'));
            $(this).click(function () {
                var ids = getItems().filter(':checked').val();
                deleteMethod(ids);
                return false;
            });
            var arr = /\{(\S+)\}/g.exec(title);
            var url = $(this).has('a') ? $(this).attr('href') : $(this).data('href');
            var titleName = !arr ? '' : arr[1];
            var getTitle = function () {
                new Error('不支持的调用,第2个参数必须为Pager或者View');
            };
            var reLoad = function () {
                new Error('不支持的调用,第2个参数必须为Pager或者View');
            };
            var callValue = function(values,p){
                var tempVal = values;
                p.split(".").each(function(){
                    if(tempVal == undefined){
                        tempVal = {};
                    }
                    tempVal = tempVal[this.toString()];
                });
                return  tempVal == undefined ? '' : tempVal ;
            };
            if (pager.toString() == '[object Fantasy.awt.Pager]') {
                getTitle = function (ids) {
                    var names = [];
                    ids.each(function () {
                        var row = pager.view.find(idName, this.toString());
                        names.push(callValue(row.data,titleName));
                    });
                    return title.replace(/\{(\S+)\}/g, Fantasy.ellipsis(names.toString(), 40, '...'));
                };
                reLoad = function () {
                    pager.reload();
                };
            } else if (pager.toString() == '[object Fantasy.awt.View]') {
                getTitle = function (ids) {
                    var names = [];
                    ids.each(function () {
                        var row = pager.find(idName, this.toString());
                        names.push(row.data[titleName]);
                    });
                    return title.replace(/\{(\S+)\}/g, names);
                };
                reLoad = function () {
                    pager.reload();
                };
            }
            var deleteMethod = function (ids) {
                if (ids) {
                    jQuery.dialog.confirm(getTitle(ids), function () {
                        var params = {};
                        params[idName + 's'] = ids;
                        $.post(url, params, function (data) {
                            reLoad();
                            callback.apply(this, [params, data]);
                        });
                    });
                } else {
                    top.$.msgbox({
                        msg: "您没有选中记录!",
                        icon: "warning"
                    });
                }
            };
            return deleteMethod;
        },

        toEdit: function (checkBox, ajaxSettings) {
            var getItems = (function (ele, expr) {
                return function () {
                    return get$(expr, checkBox, ele.length != 0 ? ele : $('body'));
                };
            })(checkBox.closest('.ajax-load-div'), checkBox.attr('checkAll'));
            ajaxSettings = Fantasy.merge(ajaxSettings || {}, {
                type: 'html',
                target: 'body',
                callback: function (type, target) {
                    target.initialize();
                }
            });
            $(this).data('href', $(this).attr('href')).click(function(e){
                var ids = getItems().filter(':checked').val();
                if (!ids || ids.length != 1) {
                    top.$.msgbox({
                        msg: "请选择一条数据!",
                        icon: "warning"
                    });
                    return stopDefault(e);
                }
                $(this).attr("href", $(this).data("href").replace(/{id}/g, ids[0]));
            }).ajax(ajaxSettings);
        },

        list : function($savForm,json){
            var $list = $(this);
            $savForm.disabled().show();
            var listView = $list.view().on('add',function(data,row){
                row.target.click(function(e){
                    if(!$(e.target).is('a')){
                        var data = row.getData();
                        var caler = $savForm.data('caler');
                        if(!!caler){
                            caler.fire();
                            $savForm.removeData('caler');
                        }
                        $savForm.data('_index',row.getIndex()).disabled().resetForm(data);
                        caler = $.Callbacks();
                        $savForm.data('caler',caler);
                        $.each(data,function(key,value){
                            $savForm.find('.' + key).each(function () {
                                if (!$(this).is('input')) {
                                    var $i = $(this).html(value);
                                    caler.add(function(){
                                        $i.html('');
                                    });
                                }
                            });
                        });
                        $('.formNew , .formEdit',$savForm).show();
                        $('.formSave , .formReset',$savForm).hide();
                    }
                });
            }).on('remove',function(){
                if($savForm.data('_index') == this.getIndex()){
                    $savForm.removeData('_index').disabled().resetForm();
                }
            });
            if(!!json){
                listView.setJSON(json);
            }
            $('.formNew',$list).click(function(e){
                $('.formNew',$savForm).click();
                return stopDefault(e);
            });
            $('.formNew',$savForm).click(function(e){
                var data = Fantasy.parseQuery($savForm.disabled(false).serialize());
                for(var p in data){
                    data[p] = '';
                }
                $savForm.removeData('_index').disabled(false).resetForm(data);
                var caler = $savForm.data('caler');
                if(!!caler){
                    caler.fire();
                    $savForm.removeData('caler');
                }
                $('.formNew,.formEdit',$savForm).hide();
                $('.formSave,.formReset',$savForm).show();
                return stopDefault(e);
            });
            $('.formEdit',$savForm).click(function(e){
                $savForm.disabled(false).resetForm(listView.get($savForm.data('_index')).getData());
                $('.formNew,.formEdit').hide();
                $('.formSave,.formReset').show();
                return stopDefault(e);
            });
            $('.formSave',$savForm).hide().click(function(e){
                var _index = $savForm.data('_index');
                if(_index==null){
                    listView.add(Fantasy.parseQuery($savForm.serialize()));
                    listView.get(listView.size()-1).target.click();
                }else{
                    $savForm.removeData('_index');
                    var checked = listView.get(_index).target.find('[type="checkbox"]:eq(0)').is(":checked");
                    listView.add(_index,Fantasy.copy(listView.get(_index).getData(),Fantasy.parseQuery($savForm.serialize())));
                    listView.get(_index).target.click();
                    listView.remove(_index+1);
                }
                return stopDefault(e);
            });
            $('.formReset',$savForm).hide().click(function(e){
                var caler = $savForm.data('caler');
                if(!!caler){
                    caler.fire();
                    $savForm.removeData('caler');
                }
                $savForm.resetForm();
                return stopDefault(e);
            });
            $list.closest('form').submit(function(){
                if(!$savForm.data('disabled')){
                    $('.formSave',$savForm).click();
                }
            });
            return {
                view : listView,
                form : $savForm,
                isEdit : function(){
                    return $savForm.data('_index') >= 0;
                }
            };
        }

    });
    //全局ajax异常拦截
    Fantasy.Ajax.on('error', function (xhr, status, err, errorHeader, s) {
        if (status == 200 && err == 'struts2 action Error') {
            var errorMsg = '';
            if (!!s.form && s.form.length > -1) {
                s.form.find('[id$=Tip]').removeClass('onError').html("");
            }
            if (errorHeader.errorMessages.length != 0) {
                errorMsg = errorHeader.errorMessages[0];
                if (errorMsg.indexOf('ajax validator error!') == -1) {//验证错误信息不提示
                    top.$.msgbox({
                        msg: errorMsg.replace('<br/>', ''),
                        icon: "error"
                    });
                }
            } else {
                $.each(errorHeader.fieldErrors,function(fieldName,value){
                    $('#' + fieldName.replaceAll('[.]', '_') + 'Tip').addClass('onError').html(value[0]);
                });
            }
        }
    });
    //全局ajax登陆跳转
    Fantasy.Ajax.on('203', function () {
        $.dialog.close();
        $.dialog.alert('您还没有登录,或者登陆已经超时<br/>点击确定后将为您转到登录页!', function () {
            top.window.location.href = request.getContextPath() + "/admin/login.do";
        });
    });
    //添加异步操作时的进度条显示
    Fantasy.Ajax.on('send', function (event, xhr, s) {
        var block = $(s.form).parents('[class^=block]');
        if (s.dataType == 'script')return;
        if(s.progress != 'none'){
            add_loader(s.block = block);
        }
    });
    //异步操作完成时移除进度条
    Fantasy.Ajax.on('complete', function (event, xhr, s) {
        if (s.dataType == 'script')return;
        if(s.progress != 'none') {
            remove_loader(s.block);
            $(window).resize();
        }
    });
    //IE下皮肤加载路径错误问题 formValidator
    //fv_scriptSrc = request.getContextPath() + '/static/js/common/formvalidator/formValidator-4.1.1.js';
});
//-autocompleter 全局配置 	现在只有用户使用到。使用在这里配置
/*
 $.Autocompleter.defaults.resultsClass = "fuzzy_search";
 $.Autocompleter.defaults.formatItem = function(row, i, max){
 return row.details.name;
 };
 $.Autocompleter.defaults.formatMatch = function(row, i, max){
 return row.id + " " + row.details.name;
 };
 $.Autocompleter.defaults.formatResult = function(row){
 return row.name;
 };
 $.Autocompleter.defaults.parse = function(data){
 return $.map(data, function (row) {
 return {data:row, value:row.details.name,result:row.details.name,id:row.id};
 });
 };*/