$(function() {
	var _types = [{"name":"\u7CFB\u5217","code":"series","description":"","configs":null,"createTime":"2014-04-10 09:53:44","modifyTime":"2014-04-10 09:53:44","creator":"admin","modifier":"admin"},{"name":"\u4EA7\u54C1\u7C7B\u522B","code":"gdtype","description":"","configs":null,"createTime":"2014-04-25 09:49:53","modifyTime":"2014-04-25 09:50:03","creator":"admin","modifier":"admin"},{"name":"\u539F\u4EA7\u56FD","code":"countries","description":"","configs":null,"createTime":"2014-04-25 09:50:38","modifyTime":"2014-04-25 09:50:38","creator":"admin","modifier":"admin"},{"name":"\u8247\u957F","code":"yachtlength","description":"","configs":null,"createTime":"2014-04-25 13:47:43","modifyTime":"2014-04-25 13:47:43","creator":"admin","modifier":"admin"},{"name":"\u505C\u9760\u6E2F\u6E7E","code":"address","description":"","configs":null,"createTime":"2014-04-27 10:28:35","modifyTime":"2014-04-27 10:28:35","creator":"admin","modifier":"admin"},{"name":"\u4E58\u5750\u4EBA\u6570","code":"number","description":"","configs":null,"createTime":"2014-04-27 10:29:25","modifyTime":"2014-04-27 10:29:25","creator":"admin","modifier":"admin"},{"name":"\u4EF7\u683C","code":"price","description":"","configs":null,"createTime":"2014-04-27 10:43:59","modifyTime":"2014-04-27 10:43:59","creator":"admin","modifier":"admin"}];
	var _configs = [{"name":"SL","type":"series","code":"APL","description":"","parentName":"","sort":null,"configKey":"series:APL","parentKey":null,"createTime":"2014-04-10 09:53:57","modifyTime":"2014-04-11 15:13:32","creator":"admin","modifier":"admin"},{"name":"BPL","type":"series","code":"BPL","description":"","parentName":"","sort":null,"configKey":"series:BPL","parentKey":null,"createTime":"2014-04-10 09:54:12","modifyTime":"2014-04-10 09:54:12","creator":"admin","modifier":"admin"},{"name":"CPL","type":"series","code":"CPL","description":"","parentName":"","sort":null,"configKey":"series:CPL","parentKey":null,"createTime":"2014-04-10 09:54:23","modifyTime":"2014-04-10 09:54:23","creator":"admin","modifier":"admin"},{"name":"DPL","type":"series","code":"DPL","description":"","parentName":"","sort":null,"configKey":"series:DPL","parentKey":null,"createTime":"2014-04-10 09:54:33","modifyTime":"2014-04-10 09:54:33","creator":"admin","modifier":"admin"},{"name":"\u7C7B\u578B1","type":"gdtype","code":"type1","description":"","parentName":"","sort":null,"configKey":"gdtype:type1","parentKey":null,"createTime":"2014-04-25 10:59:02","modifyTime":"2014-04-25 10:59:02","creator":"zhubin","modifier":"zhubin"},{"name":"\u7C7B\u578B2","type":"gdtype","code":"type2","description":"","parentName":"","sort":null,"configKey":"gdtype:type2","parentKey":null,"createTime":"2014-04-25 10:59:37","modifyTime":"2014-04-25 10:59:37","creator":"zhubin","modifier":"zhubin"},{"name":"\u4E2D\u56FD","type":"countries","code":"china","description":"","parentName":"","sort":null,"configKey":"countries:china","parentKey":null,"createTime":"2014-04-25 11:46:06","modifyTime":"2014-04-25 11:46:06","creator":"zhubin","modifier":"zhubin"},{"name":"\u4E0A\u6D77","type":"countries","code":"shanghai","description":"","parentName":"","sort":null,"configKey":"countries:shanghai","parentKey":null,"createTime":"2014-04-25 11:46:30","modifyTime":"2014-04-25 11:46:30","creator":"zhubin","modifier":"zhubin"},{"name":"0-100","type":"yachtlength","code":"1","description":"","parentName":"","sort":null,"configKey":"yachtlength:1","parentKey":null,"createTime":"2014-04-25 13:53:12","modifyTime":"2014-04-25 17:22:32","creator":"zhubin","modifier":"limaofeng"},{"name":"0-10","type":"yachtlength","code":"2","description":"","parentName":"","sort":null,"configKey":"yachtlength:2","parentKey":null,"createTime":"2014-04-25 13:57:53","modifyTime":"2014-04-25 18:06:46","creator":"zhubin","modifier":"zhubin"},{"name":"10-20","type":"yachtlength","code":"config.code","description":"","parentName":"","sort":null,"configKey":"yachtlength:config.code","parentKey":null,"createTime":"2014-04-25 16:56:36","modifyTime":"2014-04-25 18:06:58","creator":"zhubin","modifier":"zhubin"},{"name":"20-30","type":"yachtlength","code":"3","description":"","parentName":"","sort":null,"configKey":"yachtlength:3","parentKey":null,"createTime":"2014-04-25 18:07:10","modifyTime":"2014-04-25 18:07:10","creator":"zhubin","modifier":"zhubin"},{"name":"1000-2000","type":"price","code":"1","description":"","parentName":"","sort":null,"configKey":"price:1","parentKey":null,"createTime":"2014-04-27 11:00:02","modifyTime":"2014-04-27 11:00:02","creator":"zhubin","modifier":"zhubin"},{"name":"2000-3000","type":"price","code":"2","description":"","parentName":"","sort":null,"configKey":"price:2","parentKey":null,"createTime":"2014-04-27 11:00:18","modifyTime":"2014-04-27 11:00:18","creator":"zhubin","modifier":"zhubin"},{"name":"\u4E0A\u6D77","type":"address","code":"1","description":"","parentName":"","sort":null,"configKey":"address:1","parentKey":null,"createTime":"2014-04-27 11:00:44","modifyTime":"2014-04-27 11:01:17","creator":"zhubin","modifier":"zhubin"},{"name":"\u6D66\u4E1C","type":"address","code":"2","description":"","parentName":"","sort":null,"configKey":"address:2","parentKey":null,"createTime":"2014-04-27 11:01:00","modifyTime":"2014-04-27 11:01:00","creator":"zhubin","modifier":"zhubin"},{"name":"\u6D66\u897F","type":"address","code":"3","description":"","parentName":"","sort":null,"configKey":"address:3","parentKey":null,"createTime":"2014-04-27 11:01:28","modifyTime":"2014-04-27 11:01:28","creator":"zhubin","modifier":"zhubin"},{"name":"8","type":"number","code":"1","description":"","parentName":"","sort":null,"configKey":"number:1","parentKey":null,"createTime":"2014-04-27 11:01:58","modifyTime":"2014-04-27 11:01:58","creator":"zhubin","modifier":"zhubin"},{"name":"10","type":"number","code":"2","description":"","parentName":"","sort":null,"configKey":"number:2","parentKey":null,"createTime":"2014-04-27 11:02:08","modifyTime":"2014-04-27 11:02:08","creator":"zhubin","modifier":"zhubin"},{"name":"13","type":"number","code":"3","description":"","parentName":"","sort":null,"configKey":"number:3","parentKey":null,"createTime":"2014-04-27 11:02:15","modifyTime":"2014-04-27 11:02:15","creator":"zhubin","modifier":"zhubin"}];
	if (top.window == window && Fantasy.config) {// 如果为顶级window同时Fantasy.config已经存在，即为更新操作
		window.types = _types, window.configs = _configs;
		return;
	}
	window.types = _types, window.configs = _configs;
	var config = top.window != window && top.window.Fantasy.config ? top.window.Fantasy.config : {// 将子窗口的Fantasy.config对象指向top.window.Fantasy.config
	
				lastModified : new Date('28 Apr 2014 10:21:35 GMT').format('yyyyMMddhhmmss'),
				
				types : function() {
					return types;
				},
				get : function(type, key) {
					return configs.each(function() {
						if (this.type == type && this.code == key.toString())
							return this;
					});
				},
				list : function(configKey) {
					var list = [];
					configs.each(function() {
                        if(configKey.indexOf(':') == -1 ? this.type == configKey : this.parentKey == configKey){
							list.push(Fantasy.clone(this));
						}
					});
					return list;
				},
				tree : function(configKey) {
					var list = [];
					configs.each(function() {
                        if(configKey.indexOf(':') == -1 ? this.type == configKey : this.parentKey == configKey){
                            list.push(Fantasy.clone(this));
                        }
					});
					return list;
				},
				reload : function(){
					var number = 5,loadScript = function(){
						number--;
						$.getScript($.includePath + 'static/js/config.js?' + Math.floor(Math.random() * 100),function(script,success,xhr){
							var newLastModified = new Date(xhr.getResponseHeader("Last-Modified")).format('yyyyMMddhhmmss');
							if(number > 0){
								if(Fantasy.config.lastModified == newLastModified){
									setTimeout(loadScript,1000);
								}else{
									Fantasy.config.lastModified = newLastModified;
								}
							}
						});
					};
					loadScript();
				},
				update : function() {
					if (arguments.length == 0) {
						$.getScript($.includePath + 'static/js/config.js?' + Math.floor(Math.random() * 100));
					} else {
						this.add.apply(this, arguments);
					}
				},
				add : function(config, callback) {
					var lazy = function(){
						$.ajax({ url: request.getContextPath() + '/admin/system/config/save.do', data: config, success: function(data){
							configs.push(data);
							if (callback) {
								callback.apply(this, [ data ]);
							}
							Fantasy.config.update();
						},error:function(){
							var data = configs.each(function() {
								if (this.type == config.type && this.name == config.name && this.parentKey == config.parentKey)
									return this;
							});
							if (data && callback) {
								callback.apply(this, [ data ]);
							}
						},type: 'POST'});
					};
					if(config.code){
						lazy();
					}else{
						$.post(request.getContextPath() + '/common/guid.do',function(data){
							config.code = data.guid;
							lazy();
						})
					}
				},
				addType : function(type, callback) {
					var lazy = function(){
						$.ajax({ url: request.getContextPath() + '/admin/system/config/typesave.do', data: type, success: function(data){
							types.push(data);
							if (callback) {
								callback.apply(this, [ data ]);
							}
							Fantasy.config.update();
						},error:function(){
							var data = types.each(function() {
								if (this.code == type.code)
									return this;
							});
							if (data && callback) {
								callback.apply(this, [ data ]);
							}
						},type: 'POST'});
					};
					if(type.code){
						lazy();
					}else{
						$.post(request.getContextPath() + '/common/guid.do',function(data){
							config.code = data.guid;
							lazy();
						})
					}
				},
				remove : function() {
				}
			};
	Fantasy.apply(Fantasy, {}, {
		config : config
	});
	Fantasy.apply(Fantasy.util.Format, {}, {
		configName : function(value, type) {
			var config = Fantasy.config.get(type, value);
			return config ? config.name : value;
		},
		configTypeName : function(key) {
			var type = Fantasy.config.types().each(function() {
				if (this.code == key) {
					return this;
				}
			});
			return type ? type.name : key;
		}
	});

});