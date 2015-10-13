var http = require('http');
var url = require('url');
var querystring = require('querystring');
var BufferHelper = require('bufferhelper');

var register = function (defaultOptions) {
    return new httputil(defaultOptions);
};
var httputil = function (defaultOptions) {
    this.defaultOptions = defaultOptions;
};

httputil.prototype.request = function () {
    var options = util.merge(arguments[0], this.defaultOptions);

    if (!!options.content) {
        if (options.method == 'GET') {
            options.path += (options.path.indexOf('?') != -1 ? '&' : '?') + (typeof options.content != 'string' ? querystring.stringify(options.content) : options.content);
        } else if (options.method == 'DELETE' || options.method == 'PUT' || options.method == 'POST') {
            options.headers = !options.headers ? {} : options.headers;
            options.headers['content-type'] = 'application/json;charset=UTF-8';
            options.content = JSON.stringify(util.param(options.content));
            if (options.method == 'DELETE') {//NodeJS delete 不能提交 raw
                options.path += '?_method=DELETE';
                options.method = 'POST';
            }
        }
    }

    var req = http.request.apply(http.request, arguments).on('response', function (res) {
        var contentType = res.headers['content-type'];
        var buffer = new BufferHelper();
        res.on('data', function (data) {
            buffer.concat(data);
        });
        res.on('end', function () {
            var body = buffer.toBuffer();
            console.log('DEUBG:' + options.path + 'STATUS: ' + res.statusCode);
            if (!!contentType && contentType.indexOf('json') != -1) {
                res.emit('complete', JSON.parse(body.toString() || '{}'));
            } else {
                res.emit('complete', body.toString());
            }
        })
    }).on('error', function (e) {
        console.error('problem with request: ' + e.message);
    });
    if (!!options.content && !!options.method && options.method.toUpperCase() != 'GET') {
        req.write(options.content);
    }
    return req;
};

httputil.prototype.get = function () {
    return invoke.apply(this, Array.prototype.concat.call(['GET'], Array.prototype.slice.call(arguments)));
};

httputil.prototype.post = function () {
    return invoke.apply(this, Array.prototype.concat.call(['POST'], Array.prototype.slice.call(arguments)));
};

httputil.prototype.delete = function () {
    return invoke.apply(this, Array.prototype.concat.call(['DELETE'], Array.prototype.slice.call(arguments)));
};

httputil.prototype.put = function () {
    return invoke.apply(this, Array.prototype.concat.call(['PUT'], Array.prototype.slice.call(arguments)));
};

var invoke = function () {
    var requestMethod = Array.prototype.shift.apply(arguments);
    var options = (function (options, content) {
        if (typeof options == 'string') {
            options = typeof content == 'function' ? {path: options} : {path: options, content: content};
        } else if (typeof content != 'function') {
            options.content = content;
        }
        return options;
    }).apply(this, arguments);
    options.method = requestMethod;
    if (typeof arguments[arguments.length - 1] == 'function') {
        var callback = arguments[arguments.length - 1];
        var names = argumentNames(callback);
        if (names.length == 3) {
            var req = this.request(options);
            req.on('response', function (res) {
                res.on('complete', function (data) {
                    callback.apply(options, [null, res, data]);
                }).on('error', function (error) {
                    //TODO 异常处理应当优化
                });
            });
            req.end();
            return req;
        }
    }
    var req = this.request(options, typeof arguments[arguments.length - 1] == 'function' ? arguments[arguments.length - 1] : undefined);
    req.end();
    return req;
};

var argumentNames = function (fn) {
    var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
};

var FormData = (function (_FormData) {
    if (_FormData) {
        throw new Error('系统提供了 FormData 对象,请参考对象,重构代码');
    }
    return function (boundary) {
        var params = [];
        this.length = boundary.length + 8;
        this.append = function (key, value) {
            params.push({key: key, value: value});
            this.length += (boundary.length + 4 + 45 + key.length + value.length);
            return this;
        };
        this.toString = function () {
            var content = "\r\n--" + boundary;
            params.forEach(function (param) {
                if (typeof param.value == 'string') {
                    content += ("\r\nContent-Disposition: form-data; name=\"" + param.key + "\"\r\n\r\n" + param.value);
                } else {
                    throw new Error('暂不支持文件参数');
                }
                content += ("\r\n--" + boundary);
            });
            content += ("--\r\n");
            return content;
        };
    };
})(FormData);
http.authorization = function (user) {
    return 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');
}
var util = {
    merge: function () {
        if (arguments.length == 0) {
            throw new Error("Fantasy.merge 参数不正确!");
        }
        var plainObject = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] == null)
                continue;
            for (var f in arguments[i]) {
                if (!arguments[i].hasOwnProperty(f)) {
                    continue;
                }
                if (this.isPlainObject(arguments[i][f])) {
                    if (!this.isPlainObject(plainObject[f])) {
                        plainObject[f] = {};
                    }
                    this.merge.apply(this, [plainObject[f], arguments[i][f]]);
                } else {
                    if (plainObject[f] != null)
                        continue;
                    plainObject[f] = arguments[i][f];
                }
            }
        }
        return plainObject;
    },

    isPlainObject: function (obj) {
        if (!obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval) {
            return false;
        }
        if (obj.constructor
            && !hasOwnProperty.call(obj, "constructor")
            && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || hasOwnProperty.call(obj, key);
    },

    param:function (params) {
        var _t = /\[(\d+)\]$/
        for (var p in params) {
            var obj = params;
            var setParams = function (v, i, array) {
                var _isarray, name, index;
                if (_isarray = _t.test(v)) {// is Array
                    index = _t.exec(v)[1];
                    name = v.substr(0, v.length - index.length - 2);
                } else {
                    name = v;
                }
                if(array.length == i + 1 && !_isarray){
                    obj[name] = params[p];
                }
                if (_isarray) {
                    obj = !obj[name] ? obj[name] = [] : obj[name];
                    if(array.length != i + 1){
                        obj = !obj[parseInt(index)] ? obj[parseInt(index)] = {} : obj[parseInt(index)];
                    }else{
                        obj[parseInt(index)] = params[p];
                    }
                } else {
                    obj = obj[name] == null ? obj[name] = {} : obj[name];
                }
            };
            if (p.indexOf('.') != -1) {
                p.split('.').forEach(setParams);
                delete params[p];
            }else if(_t.test(p)){
                setParams(p,0,[p]);
                delete params[p];
            }
        }
        return params;
    }
};
module.exports = register;