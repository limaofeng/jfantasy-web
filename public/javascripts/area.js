$(function() {
	var _areas = [];
	if (top.window == window && Fantasy.area) {
		window.areas = _areas;
		return;
	}
	window.areas = _areas;
	if(!!window.Fantasy.area){
		return;
	}
	var area = {
		
		lastModified : new Date('28 Apr 2014 10:21:34 GMT').format('yyyyMMddhhmmss'),
	
		get : function(id) {
			return areas.each(function() {
				if (this.id == id.toString())
					return this;
			});
		},
		list : function(path) {
			var list = [];
			path = !!path && path.indexOf(',') == -1 ? this.get(path).path : path;
			areas.each(function() {
                if($.isFunction(path)?path(this):((this.path.replaceAll(',[^,]+$')==path&&this.path!=this.id)||(path==''&&this.path==this.id))){
					list.push(Fantasy.clone(this));
				}
			});
			return list;
		},
		selects : function(rootArea,defaultPath,areaStore,selectTemp,enable){
			if(defaultPath.indexOf(',') == -1){
				var area = this.get(defaultPath);
				defaultPath = area == null ? defaultPath : area.path;
			}
			var paths = defaultPath.split(",");
			var loadArea = function(data){
				if(data==null){
					$(this).removeData('_nextSelect').nextAll('select').remove();
					var isChange = false;
					if($(this).prevAll('select:first').length > 0){
						if(areaStore.val() != $(this).prevAll('select:first').val()){
							var first = $(this).prevAll('select:first');
							areaStore.data('area',first.find('option[value="'+first.val()+'"]').data('json')).val(first.val());
							isChange = true;
						}
					}else{
						if(areaStore.val() != ''){
							areaStore.removeData('area').val('');
							isChange = true;
						}
					}
					if(isChange){
						areaStore.change();
					}
					return;
				}
				if(areaStore.val() != $(this).val()){
					areaStore.val($(this).val()).data('area',data).change();
				}
				var nextSelect = $(this).data('_nextSelect');
		        if(!nextSelect){
					var $select = $(selectTemp);
					// var defVal = paths[$(this).index('#saveForm select')+1];
					$(this).after($select).parent().initialize();
					$select.data('defval',paths[rootArea.parent().find('select').index($select)]);
					var nextSelect = $select.select({value:'id',text:'name'},loadArea);
					$(this).data('_nextSelect',nextSelect);
					nextSelect.enable = enable;
				}
				nextSelect.load(Fantasy.area.list(data.id))
			}
			rootArea.data('defval',paths[0]);
			rootArea.select({value:'id',text:'name'},loadArea).load(this.list(!!rootArea.data('area')?rootArea.data('area'):''));
		},
		reload : function(){
			var number = 5,loadScript = function(){
				number--;
				$.getScript($.includePath + 'static/js/area.js?' + Math.floor(Math.random() * 100),function(script,success,xhr){
					var newLastModified = new Date(xhr.getResponseHeader("Last-Modified")).format('yyyyMMddhhmmss');
					if(number > 0){
						if(Fantasy.area.lastModified == newLastModified){
							setTimeout(loadScript,1000);
						}else{
							Fantasy.area.lastModified = newLastModified;
						}
					}
				});
			};
			loadScript();
		}
	};
	Fantasy.apply(Fantasy, {}, {
		area : area
	});
	Fantasy.apply(Fantasy.util.Format, {}, {
		areaName : function(id) {
			var area = Fantasy.area.get(id);
			return area ? area.name : id;
		},
		areaName : function(key) {
			var area = Fantasy.area.get(id);
			return area ? area.displayName : id;
		}
	});

});