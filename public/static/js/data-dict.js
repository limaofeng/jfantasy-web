if(!window._datadict) {
    window._datadict = {types: [], datas: []};
}
if(!window._datadict.types.length){
    $.ajax({
        type: "GET",
        url: request.getContextPath() + '/static/data/data-dict-type.json',
        async: false,
        cache: false,
        success: function(data){
            window._datadict.types = data;
        }
    });
}
if(!window._datadict.datas.length) {
    $.ajax({
        type: "GET",
        url: request.getContextPath() + '/static/data/data-dict.json',
        async: false,
        cache: false,
        success: function(data){
            window._datadict.datas = data;
        }
    });
}
$(function() {
    var config =  {
        types : function() {
            return window._datadict.types;
        },
        get : function(type, key) {
            return window._datadict.datas.each(function() {
                if (this.type == type && this.code == key.toString())
                    return this;
            });
        },
        list : function(configKey) {
            var list = [];
            window._datadict.datas.each(function() {
                if(configKey.indexOf(':') == -1 ? this.type == configKey : this.parentKey == configKey){
                    list.push(Fantasy.clone(this));
                }
            });
            return list;
        },
        tree : function(configKey) {
            var list = [];
            window._datadict.datas.each(function () {
                if (configKey.indexOf(':') == -1 ? this.type == configKey : this.parentKey == configKey) {
                    list.push(Fantasy.clone(this));
                }
            });
            return list;
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