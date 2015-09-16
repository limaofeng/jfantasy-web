jQuery.fn.extend({

    upload: function (settings, json) {
        var upload = $(this).data('upload');
        if (!upload) {
            upload = new Fantasy.awt.Upload(Fantasy.copy({
                target: $(this),
                url: '/files',
                theme: 'images'
            }, settings));
            $(this).data('upload', upload);
            if (!!json) {
                upload.setJSON(json.hasOwnProperty('length') ? json : [json]);
            }
        }
        return upload;
    }

});
Fantasy.awt.Upload.addTheme('files', {
    html: '<div>' +
    '<div style="clear: both; height: 10px;"></div>' +
    '<a class="file-add" style="height:15px;">添加您要上传的文件</a><div class="blank"> </div>' +
    '<div class="file-list">' +
    '<div class="ld-bg template">' +
    '    <div>' +
    '        <div>' +
    '              <span class="loading-close"><a href="#" class="remove">X</a></span>' +
    '              <h2 class="loading-sfjg"><em class="loading-title"><a name="fileName" target="_blank" class="view-field download">文件上传中...</a></em> <span class="loading-title-go">- 0%</span></h2>' +
    '        </div>' +
    '        <div class="blank"> </div>' +
    '        <div class="loading-in">' +
    '           <div class="loading-in-go"> </div>' +
    '        </div>' +
    '    </div>' +
    '</div>' +
    '</div>' +
    '<div class="blank"> </div></div>' +
    '<div style="clear: both; height: 1px;"></div>',
    defaultSettings: function (options) {
        return options;
    },
    afterInit: function (upload) {
        upload.on('uploadProgress', function (percentage) {
            if (percentage != 100) {
                this.target.find('.loading-title-go').html(percentage + '%');
                this.target.find('.loading-in-go').css('width', percentage + '%');
            }
        });
        upload.on('uploadComplete', function () {
            this.target.find('.loading-title-go').html('100%');
            this.target.find('.loading-in-go').css('width', '100%');
        });
        upload.fileView.on('add', function (data) {
            if (!!data.hasOwnProperty('absolutePath')) {
                this.target.find('.loading-title-go').html('100%');
                this.target.find('.loading-in-go').css('width', '100%');
                this.target.find('.download').attr('href', upload.options.server + data['absolutePath']);
            }
            this.on('refresh', function (data) {
                if (!!data.hasOwnProperty('absolutePath')) {
                    this.target.find('.download').attr('href', upload.options.server + data['absolutePath']).attr('title', data['fileName']);
                    this.target.initialize();
                }
            });
        });
    }
});

//添加单图片上传主题
Fantasy.awt.Upload.addTheme('image', {
    html: '<ul class="file-list gallery">' +
    '<li class="template img-container" name="default" style="width:<[=Fantasy.add(size.split(\'x\')[0],20)]>px;height:<[=Fantasy.add(size.split(\'x\')[1],20)]>px">' +
    '<div class="ld-bg-position">' +
    '<div class="img-box">' +
    '<span class="icon edit">' +
    '    <i class="glyph-icon icon-edit"></i>' +
    '</span>' +
    '<span class="icon trash remove">' +
    '   <i class="glyph-icon icon-trash"></i>' +
    '</span>' +
    '  <img data-src="holder.js/<[=size]>" class="img-thumbnail">' +
        //'  <p class="title view-field" name="_fileName"></p>' +
    '</div>' +
    '<div class="ld-bg-position-bg"> </div>' +
    '<div class="ld-bg-position-xx"><span class="percentage">0</span>' +
    '<div class="spinner">' +
    '<div class="spinner-container container1">' +
    '   <div class="circle1"></div>' +
    '   <div class="circle2"></div>' +
    '   <div class="circle3"></div>' +
    '   <div class="circle4"></div>' +
    '</div>' +
    '<div class="spinner-container container2">' +
    '   <div class="circle1"></div>' +
    '   <div class="circle2"></div>' +
    '   <div class="circle3"></div>' +
    '   <div class="circle4"></div>' +
    '</div>' +
    '<div class="spinner-container container3">' +
    '    <div class="circle1"></div>' +
    '    <div class="circle2"></div>' +
    '    <div class="circle3"></div>' +
    '    <div class="circle4"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>' +
    '<li class="image_edit" style="display:none;">' +
    '<div class="popup edit-template" name="default">' +
    '<div class="pointer">' +
    '<div class="arrow"></div>' +
    '<div class="arrow_border"></div>' +
    '</div>' +
    '   <i class="close-pop glyph-icon icon-remove"></i>' +
    '<h5>编辑图像</h5>' +
    '   <div class="thumb">' +
    '   <img data-src="holder.js/88x88"/>' +
    '</div>' +
    '<div class="title">' +
    '       <input type="text" placeholder="输入图像标题" name="fileName" class="inline-input view-field">' +
    '       <div class="form-input">' +
    '               <select class="chosen-select" data-placeholder="选择图像分类"><option value=""></option>' +
    '               <option>Category' +
    '           </option><option>Mountains' +
    '           </option><option>Lake and rivers' +
    '       </option></select>' +
    '       </div>' +
    '</div>' +
    '  <div class="description form-input">' +
    '   <h6>说明</h6>' +
    '       <textarea class="textarea-no-resize view-field" name="description"></textarea>' +
    '           <a title="保存" class="btn medium primary-bg radius-all-4 save" href="javascript:void(0);">' +
    '           <span class="glyph-icon icon-separator">' +
    '                   <i class="glyph-icon icon-save"></i>' +
    '           </span>' +
    '               <span class="button-content">' +
    '           保存' +
    '       </span>' +
    '       </a>' +
    '</div>' +
    '</div>' +
    '</li>' +
    '<li class="add-file-li" style="padding:3px;">' +
    '<img data-src="holder.js/<[=size]>/upload" class="img-thumbnail file-add">' +
    '</li>' +
    '</ul>',
    defaultSettings: function (options) {
        return Fantasy.copy({
            size: '140x140'
        }, options);
    },
    afterInit: function (upload) {
        var size = upload.options.size.split('x');
        upload.on('uploadProgress', function (percentage) {
            if (percentage != 100) {
                this.target.find('.percentage').html(percentage);
            }
        });
        var view = upload.fileView;
        //view.target.css({width:Fantasy.add(size[0],10),height:Fantasy.add(size[1],10)});
        var _$edit = $('.image_edit', view.target);
        var _form = _$edit.form({templateClass: 'edit-template'});
        _form.on('change', function (data, template, t) {
            $('.icon-remove', t.target).click(function (e) {
                _$edit.hide();
                return stopDefault(e);
            });
            $('.save', t.target).click(function (e) {
                view.get(data.listIndex).update(t.getData());
                console.log(view.get(data.listIndex).getData());
                $('.icon-remove', t.target).click();
                return stopDefault(e);
            });
            var _$img = $('img', t.target);
            var image = new Image();
            image.onload = function () {
                _$img.attr('src', this.src);
            };
            image.onerror = function () {
                Holder.run({images: _$img.removeAttr('src').get(0)});
            };
            image.src = upload.options.server + data['absolutePath'];
        });
        var $addFileLi = upload.$html.find('.add-file-li');
        upload.clear = function () {
            view.setJSON([]);
            view.target.find('.add-file-li').show();
        };
        view.on('add', function (data) {
            this.target.find('.ld-bg-position-bg').css({width: size[0], height: size[1]});
            var $img = this.target.find('img'), _zhis = this, refresh = function (data) {
                if (data.hasOwnProperty('absolutePath')) {
                    var image = new Image();
                    image.onload = function () {
                        $img.attr('src', this.src);
                        _zhis.target.find('.percentage').html('100');
                        _zhis.target.find('img').removeClass('blur');
                        _zhis.target.find('.ld-bg-position-xx').animate({opacity: 0}, 150, function () {
                            _zhis.target.find('.ld-bg-position-xx').hide().css({opacity: 1});
                            _zhis.target.find('.ld-bg-position-bg').hide();
                        });
                    };
                    image.onerror = function () {
                        Holder.run({images: $img.removeAttr('src').get(0)});
                        _zhis.target.find('.percentage').html('100');
                        _zhis.target.find('img').removeClass('blur');
                        _zhis.target.find('.ld-bg-position-xx').animate({opacity: 0}, 150, function () {
                            _zhis.target.find('.ld-bg-position-xx').hide().css({opacity: 1});
                            _zhis.target.find('.ld-bg-position-bg').hide();
                        });
                    };
                    image.src = upload.options.server + data['absolutePath'];
                    $('.remove', _zhis.target).data('placeholder', '<h4 class="infobox-title">确认删除图片</h4><p><b>' + Fantasy.ellipsis(data.fileName, 23, '...') + '</b>?</p>');
                    _$edit.removeData('box').box($('.edit', _zhis.target), {model: 'simple'}).on('show', function (w, t) {
                        var _position = _zhis.target.position();
                        var _data = _zhis.getData();
                        _data.listIndex = _zhis.getIndex();
                        _form.update(_data);
                        $('.popup', _$edit).css({
                            'top': _position.top - 54,
                            'left': _position.left + Fantasy.toInt(size[0]) / 2 + 30
                        });
                    });
                } else if (data.hasOwnProperty('fileData')) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        $img.attr('src', this.result);
                        $img.addClass('blur');
                        _zhis.target.find('.ld-bg-position-xx').show();
                        _zhis.target.find('.ld-bg-position-bg').show();
                    };
//                            reader.onprogress = function(e){
//                                /** @namespace e.lengthComputable */
//                                if (e.lengthComputable) {
//                                    var loaded = e.loaded, total = e.total;
//                                    if (loaded > total) {
//                                        loaded = loaded - total;
//                                    }
//                                    console.log(Math.round((loaded * 100) / total));
//                                }
//                            };
                    reader.onerror = function () {
                        Holder.run({images: $img.removeAttr('src').get(0)});
                    };
                    reader.readAsDataURL(data['fileData']);
                }
            };
            //if ($addFileLi.is(':visible')) {
            $addFileLi.hide();
            //}
            if (this.getIndex() == 1) {
                view.remove(0);
            }
            this.target.find('a').click(function (e) {
                $addFileLi.find('.file-add-input').click();
                return stopDefault(e);
            });
            this.on('refresh', function (data) {
                refresh.apply(this, [data]);
            });
            refresh.apply(this, [data]);
        }).on('remove', function () {
            $addFileLi.show();
        });
    }

});
//添加图片上传主题
Fantasy.awt.Upload.addTheme('images', {
    html: '<ul class="file-list gallery">' +
    '<li class="template img-container" name="default" style="width:<[=Fantasy.add(size.split(\'x\')[0],20)]>px;height:<[=Fantasy.add(size.split(\'x\')[1],20)]>px">' +
    '<div class="ld-bg-position">' +
    '<div class="img-box">' +
    '<span class="icon edit">' +
    '    <i class="glyph-icon icon-edit"></i>' +
    '</span>' +
    '<span class="icon trash remove">' +
    '   <i class="glyph-icon icon-trash"></i>' +
    '</span>' +
    '  <img data-src="holder.js/<[=size]>" class="img-thumbnail">' +
        //'  <p class="title view-field" name="_fileName"></p>' +
    '</div>' +
    '<div class="ld-bg-position-bg"> </div>' +
    '<div class="ld-bg-position-xx"><span class="percentage">0</span>' +
    '<div class="spinner">' +
    '<div class="spinner-container container1">' +
    '   <div class="circle1"></div>' +
    '   <div class="circle2"></div>' +
    '   <div class="circle3"></div>' +
    '   <div class="circle4"></div>' +
    '</div>' +
    '<div class="spinner-container container2">' +
    '   <div class="circle1"></div>' +
    '   <div class="circle2"></div>' +
    '   <div class="circle3"></div>' +
    '   <div class="circle4"></div>' +
    '</div>' +
    '<div class="spinner-container container3">' +
    '    <div class="circle1"></div>' +
    '    <div class="circle2"></div>' +
    '    <div class="circle3"></div>' +
    '    <div class="circle4"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</li>' +
    '<li class="image_edit" style="display:none;">' +
    '<div class="popup edit-template" name="default">' +
    '<div class="pointer">' +
    '<div class="arrow"></div>' +
    '<div class="arrow_border"></div>' +
    '</div>' +
    '   <i class="close-pop glyph-icon icon-remove"></i>' +
    '<h5>编辑图像</h5>' +
    '   <div class="thumb">' +
    '   <img data-src="holder.js/88x88"/>' +
    '</div>' +
    '<div class="title">' +
    '       <input type="text" placeholder="输入图像标题" name="fileName" class="inline-input view-field">' +
    '       <div class="form-input">' +
    '               <select class="chosen-select" data-placeholder="选择图像分类"><option value=""></option>' +
    '               <option>Category' +
    '           </option><option>Mountains' +
    '           </option><option>Lake and rivers' +
    '       </option></select>' +
    '       </div>' +
    '</div>' +
    '  <div class="description form-input">' +
    '   <h6>说明</h6>' +
    '       <textarea class="textarea-no-resize view-field" name="description"></textarea>' +
    '           <a title="保存" class="btn medium primary-bg radius-all-4 save" href="javascript:void(0);">' +
    '           <span class="glyph-icon icon-separator">' +
    '                   <i class="glyph-icon icon-save"></i>' +
    '           </span>' +
    '               <span class="button-content">' +
    '           保存' +
    '       </span>' +
    '       </a>' +
    '</div>' +
    '</div>' +
    '</li>' +
    '<li class="add-file-li" style="padding:3px;width:<[=Fantasy.add(size.split(\'x\')[0],20)]>px;height:<[=Fantasy.add(size.split(\'x\')[1],20)]>px;float:left;">' +
    '<img data-src="holder.js/<[=size]>/upload" class="img-thumbnail file-add">' +
    '</li>' +
    '<li style="clear:both; height:0px; overflow:hidden;"></li></ul>',
    defaultSettings: function (options) {
        return Fantasy.copy({
            size: '140x140'
        }, options);
    },
    afterInit: function (upload) {
        var size = upload.options.size.split('x');
        upload.on('uploadProgress', function (percentage) {
            if (percentage != 100) {
                this.target.find('.percentage').html(percentage);
            }
        });
        var view = upload.fileView;
        var _$edit = $('.image_edit', view.target);
        var _form = _$edit.form({templateClass: 'edit-template'});
        _form.on('change', function (data, template, t) {
            $('.icon-remove', t.target).click(function (e) {
                _$edit.hide();
                return stopDefault(e);
            });
            $('.save', t.target).click(function (e) {
                view.get(data.listIndex).update(t.getData());
                console.log(view.get(data.listIndex).getData());
                $('.icon-remove', t.target).click();
                return stopDefault(e);
            });
            var _$img = $('img', t.target);
            var image = new Image();
            image.onload = function () {
                _$img.attr('src', this.src);
            };
            image.onerror = function () {
                Holder.run({images: _$img.removeAttr('src').get(0)});
            };
            image.src = upload.options.server + data['absolutePath'];
        });
        var $addFileLi = upload.$html.find('.add-file-li');
        upload.clear = function () {
            view.setJSON([]);
            view.target.find('.add-file-li').show();
        };
        view.on('add', function (data) {
            var _zhis = this;
            $('.ld-bg-position-bg', this.target).css({width: size[0], height: size[1]});
            $('.mg-container', this.target).hover(function () {
                $('.ld-bg-position-bg', _zhis.target).show();
            }, function () {
                $('.ld-bg-position-bg', _zhis.target).hide();
            });
            var refresh = ((function ($img, _zhis) {
                return function (data) {
                    if (data.hasOwnProperty('absolutePath')) {
                        var image = new Image();
                        image.onload = function () {
                            $img.attr('src', this.src);
                            _zhis.target.find('.percentage').html('100');
                            _zhis.target.find('img').removeClass('blur');
                            _zhis.target.find('.ld-bg-position-xx').animate({opacity: 0}, 150, function () {
                                _zhis.target.find('.ld-bg-position-xx').hide().css({opacity: 1});
                                _zhis.target.find('.ld-bg-position-bg').hide();
                            });
                        };
                        image.onerror = function () {
                            Holder.run({images: $img.removeAttr('src').get(0)});
                            _zhis.target.find('.percentage').html('100');
                            _zhis.target.find('img').removeClass('blur');
                            _zhis.target.find('.ld-bg-position-xx').animate({opacity: 0}, 150, function () {
                                _zhis.target.find('.ld-bg-position-xx').hide().css({opacity: 1});
                                _zhis.target.find('.ld-bg-position-bg').hide();
                            });
                        };
                        image.src = upload.options.server + data['absolutePath'];
                        _zhis.setValue('_fileName', Fantasy.ellipsis(data.fileName, 23, '...'));
                        _$edit.removeData('box').box($('.edit', _zhis.target), {model: 'simple'}).on('show', function (w, t) {
                            var _position = _zhis.target.position();
                            var _data = _zhis.getData();
                            _data.listIndex = _zhis.getIndex();
                            _form.update(_data);
                            $('.popup', _$edit).css({
                                'top': _position.top - 54,
                                'left': _position.left + Fantasy.toInt(size[0]) / 2 + 30
                            });
                        });
                        $('.remove', _zhis.target).data('placeholder', '<h4 class="infobox-title">确认删除图片</h4><p><b>' + Fantasy.ellipsis(data.fileName, 23, '...') + '</b>?</p>');
                    } else if (data.hasOwnProperty('fileData')) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            $img.attr('src', this.result);
                            $img.addClass('blur');
                            _zhis.target.find('.ld-bg-position-xx').show();
                            _zhis.target.find('.ld-bg-position-bg').show();
                        };
                        reader.onerror = function () {
                            Holder.run({images: $img.removeAttr('src').get(0)});
                        };
                        reader.readAsDataURL(data['fileData']);
                    }
                };
            })(this.target.find('img'), this));
            /*
             if($addFileLi.is(':visible')){
             $addFileLi.hide();
             }*/
            /*
             if(this.getIndex()==1){
             view.remove(0);
             }*/
            $('a.upload', this.target).click(function (e) {
                upload.setRow(_zhis);
                $addFileLi.find('.file-add-input').click();
                return stopDefault(e);
            });
            this.on('refresh', function (data) {
                refresh.apply(this, [data]);
            });
            refresh.apply(this, [data]);
            view.target.sortable('refresh');
        });
        view.target.sortable({
            items: 'li.img-container', start: function (event, ui) {
                $('.img-box .icon', ui.item).hide();
            }, update: function (event, ui) {
                $('.img-box .icon', ui.item).show();
                view.refresh();
            }
        });
    }

});
//添加图片上传主题
Fantasy.awt.Upload.addTheme('listImages', {
    html: '<a href="javascript:void(0);" class="file-add" style="display:none;"></a>' +
    '<table class="formTable mb3 listTable file-list">' +
    '<thead>' +
    '<tr>' +
    '	<th style="width:30px;"><input id="allChecked" type="checkbox" checkAll=".file_box" style="display:none;"></th>' +
    '	<th>图片</th>' +
    '	<th>名称</th>' +
    '	<th>描述</th>' +
    '	<th>操作</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '	<tr class="template" name="default">' +
    '		<td>' +
    '			<input type="checkbox" class="file_box" value="{id}"/>' +
    '			<input name="<[=listName]>[#index].absolutePath" mapping="absolutePath" class="view-field" type="hidden"/>' +
    '           <input name="<[=listName]>[#index].fileName" mapping="fileName" class="view-field" type="hidden"/>' +
    '           <input name="<[=listName]>[#index].description" mapping="description" class="view-field" type="hidden"/>' +
    '		</td>' +
    '		<td style="padding:3px;" align="center"><a href="#"><img data-src="holder.js/<[=thumbnailSize]>" class="img-thumbnail"></a></td>' +
    '		<td>{fileName}</td>' +
    '		<td>{description}</td>' +
    '		<td>' +
    '			<a class="up" href="#">上移</a> | ' +
    '			<a class="down" href="#">下移</a> | ' +
    '			<a class="remove" href="#">删除</a>' +
    '		</td>' +
    '	</tr>' +
    '	<tr class="empty"><td class="norecord" colspan="5">还没有添加图片,点击<a href="#" class="formNew" style="font-weight:bold;">添加图片</a></td></tr>' +
    '</tbody>' +
    '</table>' +
    '<table id="imageUploadForm" class="formTable mb3">' +
    '<caption>图片详细信息</caption>' +
    '<tbody>' +
    '	<tr>' +
    '		<td class="formItem_content" align="center" rowspan="3" style="padding:3px;">' +
    '       <input name="fileManagerId" type="hidden"/>' +
    '       <input name="absolutePath" type="hidden"/>' +
    '       <div class="ld-bg-position">' +
    '           <div><a href="#"><img data-src="holder.js/<[=size]>" class="img-thumbnail tab-file-add"></a></div>' +
    '           <div class="ld-bg-position-bg"> </div>' +
    '           <div class="ld-bg-position-xx"><span class="percentage">0</span>' +
    '               <div class="spinner">' +
    '                   <div class="spinner-container container1">' +
    '                       <div class="circle1"></div>' +
    '                       <div class="circle2"></div>' +
    '                       <div class="circle3"></div>' +
    '                       <div class="circle4"></div>' +
    '                   </div>' +
    '                   <div class="spinner-container container2">' +
    '                       <div class="circle1"></div>' +
    '                       <div class="circle2"></div>' +
    '                       <div class="circle3"></div>' +
    '                       <div class="circle4"></div>' +
    '                   </div>' +
    '                   <div class="spinner-container container3">' +
    '                       <div class="circle1"></div>' +
    '                       <div class="circle2"></div>' +
    '                       <div class="circle3"></div>' +
    '                       <div class="circle4"></div>' +
    '                   </div>' +
    '               </div>' +
    '           </div>' +
    '       </div>' +
    '       </td>' +
    '		<td class="formItem_title w100">图片名称</td>' +
    '		<td class="formItem_content"><input name="fileName" type="text" class="ui_input_text w250"/></td>' +
    '	</tr>' +
    '	<tr>' +
    '		<td class="formItem_title w100">描述</td>' +
    '		<td class="formItem_content">' +
    '			<textarea name="description" style="width:98%;height:100px;" rows="" cols=""></textarea>' +
    '		</td>' +
    '	</tr>' +
    '	<tr>' +
    '		<td class="formItem_title w100"></td>' +
    '		<td class="formItem_content">' +
    '			<a href="#" class="ui_button formNew">添加新的图片</a>' +
    '			<a href="#" class="ui_button formEdit">编辑图片</a>' +
    '			<a href="#" class="ui_button formSave">保存图片</a>' +
    '			<a href="#" class="ui_button formReset">重置</a>' +
    '		</td>' +
    '	</tr>' +
    '</tbody>' +
    '</table>' +
    '<div style="clear: both; height: 1px;"></div>',
    defaultSettings: function (options) {
        return Fantasy.copy({
            size: '350x200',
            thumbnailSize: '100x50'
        }, options);
    },
    afterInit: function (upload) {
        var $html = upload.$html, $imageUploadForm = upload.$html.find('#imageUploadForm'), $imageFileList = upload.$html.find('.file-list'), view = upload.fileView;
        var list = $imageFileList.list($imageUploadForm);

        var _$img = $html.find('.tab-file-add');
        upload.on('uploadStart', function (data) {
            var reader = new FileReader();
            reader.onload = function () {
                _$img.attr('src', this.result).addClass('blur');
                $html.find('.ld-bg-position-xx').show();
                $html.find('.ld-bg-position-bg').show();
            };
            reader.onerror = function () {
                Holder.run({images: _$img.removeAttr('src').get(0)});
            };
            reader.readAsDataURL(data['fileData']);
        });
        upload.on('uploadProgress', function (percentage) {
            if (percentage != 100) {
                $html.find('.percentage').html('100');
            }
        });
        upload.on('uploadComplete', function (data) {
            $html.find('.percentage').html('100');
            $html.find('img').removeClass('blur');
            $html.find('.ld-bg-position-xx').animate({opacity: 0}, 150, function () {
                $html.find('.ld-bg-position-xx').hide().css({opacity: 1});
                $html.find('.ld-bg-position-bg').hide();
            });
            if (!list.isEdit()) {
                $imageUploadForm.resetForm(data);
            } else {
                $imageUploadForm.resetForm({absolutePath: data.absolutePath});
            }
        });
        view.on('add', function (data) {
            var $img = this.target.find('img');
            if (data.hasOwnProperty('absolutePath') && !!data['absolutePath']) {
                var image = new Image();
                image.onload = function () {
                    $img.attr('src', this.src);
                };
                image.onerror = function () {
                    Holder.run({images: $img.removeAttr('src').get(0)});
                };
                image.src = upload.options.server + data['absolutePath'];
                this.target.click(function () {
                    var image = new Image();
                    image.onload = function () {
                        _$img.attr('src', this.src);
                    };
                    image.onerror = function () {
                        Holder.run({images: _$img.removeAttr('src').get(0)});
                    };
                    image.src = upload.options.server + data['absolutePath'];
                });
            } else if (data.hasOwnProperty('fileData')) {
                view.remove(this.getIndex());
            }
        });
        upload.$html.find('.tab-file-add').click(function (e) {
            if (!$imageUploadForm.data('disabled')) {
                upload.$html.find('.file-add-input').click();
            } else {
                $.msgbox({
                    msg: "请先切换好编辑或者新增模式.",
                    icon: "warning"
                });
            }
            return stopDefault(e);
        });
    },
    callback: {
        onAdd: function (view, row, data) {
        },
        beforeUpload: function (row, fd, xhr) {
        },
        upload: function (data) {
        }
    }

});