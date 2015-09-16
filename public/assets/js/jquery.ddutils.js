window.dddict = {
    getDict : function(code){
        if(window._datadict==undefined){
            $.ajax({
                url: '/system/dd/search',
                async: false,
                cache: false,
                success: function(data){
                    window._datadict = data;
                }
            });
        }
        if(window._datadict!=undefined && !!code){
            for(var i=0; i<window._datadict.length; i++){
                if(window._datadict[i].code==code){
                    return window._datadict[i].name;
                }
            }
        }
    }
};