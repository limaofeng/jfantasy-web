Fantasy.util.jClass(Fantasy.util.Observable, {

    jClass: 'Fantasy.awt.Upload',

    /**
     * 上传控件
     */
    initialize: function ($super, options) {
        $super(new Array([ 'beforeUpload', 'upload' ]));
        var zhis = this;
        options = this.options = Fantasy.copy({
            url: request.getContextPath() + '/file/upload.do',
            theme: 'images',
            data: {'dir': 'default'}
        }, options);
        var theme = this.theme = Fantasy.awt.Upload.getTheme(options.theme);
        //初始化主题设置
        options = this.options = theme.defaultSettings(options, this);
        //添加风格代码
        var $html = this.$html = theme.appendTo(options.target, options);
        var fileView = this.fileView = $html.find('.file-list').view().on('add', function (data) {
            theme.callback.onAdd.apply(zhis, [fileView, this, data]);
            if (!!data.fileManagerId && !!data.absolutePath) {
                zhis.fireEvent('upload', zhis, [this, data, data.fileManagerId + ':' + data.absolutePath]);
            }
            this.on('refresh', function () {
                var data = this.getData();
                if (!!data.fileManagerId && !!data.absolutePath) {
                    zhis.fireEvent('upload', zhis, [this, data, data.fileManagerId + ':' + data.absolutePath]);
                }
            });
        });
        //将附件从页面删除
        $html.find('.file-remove').click(function () {
            var rmids = [];
            fileView.each(function () {
                if (this.target.find('.index').is(":checked")) {
                    rmids.push(this.getIndex());
                }
            });
            rmids.reverse().each(function () {
                fileView.remove(this);
            });
        });
        //添加图片上传按钮功能
        var $fileAdd = $html.find('.file-add');
        var _interval = setInterval(function () {
            if ($fileAdd.index() == -1) {
                clearInterval(_interval);
                return;
            }
            if ($fileAdd.is(':visible')) {
                $fileAdd.next().css({width: $fileAdd.outerWidth()});
                clearInterval(_interval);
            }
        }, 500);
        var $fileAddInput = $('<input type="file" name="attach" class="file-add-input" multiple="multiple" accept="image/jpeg,image/gif,image/png,application/zip" style="display: block;height:' + $fileAdd.outerHeight() + 'px;left: 0px;opacity: 0;filter:alpha(opacity=0);position: relative;margin-top: -' + ($fileAdd.outerHeight() + 4) + 'px;width: ' + $fileAdd.outerWidth() + 'px;z-index: 26;">').insertAfter($fileAdd);
        //批量上传图片效果
        /*
         $html.find('.plupload_start').click(function(){
         uploadFile(uploadView.get(0),uploadView);
         });*/
        this.addFileInput($fileAddInput);
        theme.afterInit(this);
    },

    addFileInput: function ($fileInput) {
        var zhis = this;
        if (!zhis.callbacks) {
            zhis.callbacks = $.Callbacks();
            if (this.$html.closest('form').length > 0) {
                var $form = this.$html.closest('form').submit(function (e) {
                    if (e.result == false) {
                        return;
                    }
                    zhis.callbacks.fire(arguments);
                });
                $form.data("events")['submit'] = $form.data("events")['submit'].reverse();
            }
        }
        zhis.callbacks.add(function () {
            //表单提交时移除fileinput
            $fileInput.remove();
        });
        //fileinput change 事件
        $fileInput.bind('change', function () {
            if ($(this).hasClass('file-add-input')) {
                zhis.addFile($fileInput);
            } else {
                zhis.updateFile($fileInput, zhis.fileView.get($fileInput.data('index')));
            }
        });
    },

    getHtml: function () {
        return this.$html;
    },

    updateFile: function ($file, row) {
        if (!$.browser.msie) {//Firefox及其他支持ajax上传文件的浏览器
            var files = $file[0].files;
            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];
                //var fileEl = this.fileView.find('fileName', file.name);
                if (row && row.data.size == file.size)
                    continue;
                var fd = new FormData();
                fd.append('attach', file);
                //添加临时文件
                this.ajaxUplaodFile(row, fd);
                /*
                 if($("#preview").length != 0){//TODO 待调整
                 $.preview(file, $("<img />").insertBefore($("#preview")), {
                 ratio : null,
                 maxWidth : 200,
                 maxHeight : 200
                 });
                 }*/
            }
        }
        /*else {//ie浏览器
         var tfs = $file.
         value.split('\\');
         var fileName = tfs[tfs.length - 1];
         var fileEl = this
         .fileView.find('fileName',
         fileName);
         if (!!fileEl)
         return;
         if ($("#preview").
         length != 0) {
         //TODO 待调整
         $.preview(this, $("<img />").insertBefore($(
         "#preview")), {
         ratio: null,
         maxWidth: 200,
         maxHeight: 200
         });
         }
         this.
         ajaxUplaodFile(row, $file
         );
         }*/
    },

    addFile: function ($file) {
        if (!$.browser.msie) {//Firefox及其他支持ajax上传文件的浏览器
            var files = $file[0].files;
            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];
                var row = this.fileView.find('fileName', file.name);
                if (row && row.data.size == file.size)
                    continue;
                var fd = new FormData();
                fd.append('attach', file);
                //添加临时文件
                var row = this.fileView.add({fileName:file.name,size:file.size,type:file.type,send:true});
                this.ajaxUplaodFile(row, fd);
                /*
                 if($("#preview").length != 0){//TODO 待调整
                 $.preview(file, $("<img />").insertBefore($("#preview")), {
                 ratio : null,
                 maxWidth : 200,
                 maxHeight : 200
                 });
                 }*/
            }
        }
        /*else {//ie浏览器
         var file = $file;
         var tfs = file.value.split('\\');
         var fileName = tfs[tfs.length - 1];
         var fileEl = uploadView.find('fileName', fileName);
         if (!!fileEl)
         return;
         var row = uploadView.add({fileName: fileName, size: 'nan', type: file.type});
         if ($("#preview").length != 0) {//TODO 待调整
         $.preview(this, $("<img />").insertBefore($("#preview")), {
         ratio: null,
         maxWidth: 200,
         maxHeight: 200
         });
         }
         this.ajaxUplaodFile(row, $file);
         }*/
    },
    /**
     * 上传文件方法
     */
    ajaxUplaodFile: function (row, $file) {
        var zhis = this;
        if ($.browser.msie) {
            var clone = $file.clone().insertAfter($file);
            var temp = $('<form action="' + settings.url + '" method="post" enctype="multipart/form-data"></form>').appendTo($('body')).append($file.remove()).ajaxForm(function (data) {
                data = Fantasy.decode(data);
                delete data.id;
                delete data.description;
                delete data.folder;
                delete data.createTime;
                delete data.modifyTime;
                delete data.creator;
                delete data.modifier;
                uploadView.setTemplate(row.getIndex(), 'default', data);
                row.target.find('.plupload_file_status').html("100%");
                row.setData(data);
                row.refresh();
                zhis.addFile(clone);
                temp.remove();
            }).submit();
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('post', this.options.url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = Fantasy.decode(xhr.responseText);
                    delete data.id;
                    delete data.description;
                    delete data.folder;
                    delete data.createTime;
                    delete data.modifyTime;
                    delete data.creator;
                    delete data.modifier;
                    //上传成功回调
		    row.update(data);
		    row.refresh();
                    zhis.theme.callback.upload.apply(zhis, [row,data]);
                }
            };
            //添加额外参数
            $.each(this.options.data, function (key, value) {
                $file.append(key, value);
            });
            //上传前回调
            this.theme.callback.beforeUpload.apply(zhis, [row, $file, xhr]);
            xhr.send($file);
        }
    },

    getFiles: function () {
        var files = [];
        this.fileView.each(function () {
            var data = this.getData();
            data.sort = this.getIndex();
            files.push(data.fileManagerId + ":" + data.absolutePath);
        });
        return files.toString();
    },

    setJSON: function (json) {
        if (!!json) {
            this.fileView.setJSON(json);
        }
        return this;
    },

    getData: function () {
		return this.fileView.getData(function(data){
			return !data.send;
		});
    },

    disenable: function () {
        var $finput = this.$html.find('[type=file]').hide();
        if ($finput.hasClass('file-add-input')) {
            var $img = this.$html.find('img');
            Holder.run({images: $img.attr('data-src', $img.data('src').replace(/\/upload$/g, '')).get(0)});
        }
    }

});
Fantasy.apply(Fantasy.awt.Upload, {}, (function () {

    var themes = {};

    return {

        /**
         * 添加主题
         */
        addTheme: function (key, theme) {
            themes[key] = Fantasy.copy({
                defaultSettings: function (options) {
                    return options;
                },
                appendTo: function (target, options) {
                    $($.Sweet(this.html).applyData(options)).appendTo(target).initialize();
                    return target;
                },
                afterInit: function (upload) {
                },
                callback: {
                    onAdd: function (view, row, data) {
                    },
                    beforeUpload: function () {
                    },
                    upload: function () {
                    }
                }
            }, theme);
        },

        getTheme: function (key) {
            return themes[key];
        }

    }

})());