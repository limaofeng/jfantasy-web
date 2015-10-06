/***********************************************************\
 *			Fantasy											*
 *[描    述] JS 框架											*
 *			 部分内容来自于网络								*
 \***********************************************************/
Fantasy = (function(){
    return {
    
        version: '1.0',
        
        /**
         * 定义命名空间
         * @param {Object} namespace
         */
        namespace: function(namespace){
            var namespaceArray = namespace.split('.');
            for (var i = 0; i < namespaceArray.length; i++) {
                namespace = i == 0 ? namespaceArray[i] : namespace += ("." + namespaceArray[i]);
                if (eval('typeof ' + namespace + ' == \"undefined\"')) {
                    if (i == 0) {
                        eval('var ' + namespace + ' = {};');
                    }
                    else {
                        eval(namespace + ' = {};');
                    }
                }
            }
        },
        
        /**
         * 为 Class 扩展方法与属性
         * @param {Object} jClass
         * @param {Object} prototypes 扩展方式
         * @param {Object} defaults	静态方法
         */
        apply: function(jClass, prototypes, defaults){
            if (jClass && prototypes && typeof prototypes == 'object') {
                //noinspection JSDuplicatedDeclaration
                for (var fName in prototypes) {
                    if(prototypes.hasOwnProperty(fName)){
                        jClass.prototype[fName] = prototypes[fName];
                    }
                }
                if (Object.prototype.toString != prototypes['toString']) {//TODO IE在json对象中的toString不能遍历的问题
                    jClass.prototype['toString'] = prototypes['toString'];
                }
            }
            if (defaults) {
                //noinspection JSDuplicatedDeclaration
                for (var fName in defaults) {
                    if(defaults.hasOwnProperty(fName)){
                         jClass[fName] = defaults[fName];
                    }
                }
                if (Object.prototype.toString != defaults['toString']) {//TODO IE在json对象中的toString不能遍历的问题
                    jClass['toString'] = defaults['toString'];
                }
            }
        },

        isPlainObject: function( obj ) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
                return false;
            }

            // Not own constructor property must be Object
            if ( obj.constructor
                && !hasOwnProperty.call(obj, "constructor")
                && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.

            var key;
            for ( key in obj ) {}

            return key === undefined || hasOwnProperty.call( obj, key );
        },

        merge : function () {
        	if(arguments.length == 0){
        		throw new Error("Fantasy.merge 参数不正确!");
        	}
        	var plainObject = arguments[0];
            for(var i=1;i<arguments.length;i++){
        		if(arguments[i] == null)
        			continue;
        		for(var f in arguments[i]){
                    if(!arguments[i].hasOwnProperty(f)){
                        continue;
                    }
        			if(this.isPlainObject(arguments[i][f])){
        				if(!this.isPlainObject(plainObject[f])){
        					plainObject[f] = {};
        				}
						Fantasy.merge.apply(this,[plainObject[f],arguments[i][f]]);
        			}else{
        				if(plainObject[f] != null)
        					continue;
        				plainObject[f] = arguments[i][f];
        			}
        		}
        	}
        	return plainObject;
		},

		urlFilter : (function(){
			var constant = {};
			constant['contextPath'] = request.getContextPath();
			return function (url){
				if(!Fantasy.isString(url))
					return url;
				url = url.replace(/\%\{([^\}]+)\}/g,function($0,$1) {
			        return constant[$1];
			    });
				return url;
			};
		})(),

        get$Object : function(expr, z, $context){
            return (/[)]$/.test(expr) ? eval('(z.' + expr + ')') : $(expr, $context));
        }

    };

})();
