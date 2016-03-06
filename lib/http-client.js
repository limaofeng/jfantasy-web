var http = require('http');
var url = require('url');
var fs = require('fs');
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
        if (FormData.has(options.content)) {
            var formData = new FormData(new Date().getTime());
            for (var p in options.content) {
                if (options.content.hasOwnProperty(p)) {
                    formData.append(p, options.content[p]);
                }
            }
            options.content = formData;
            options.headers['content-type'] = formData.getContentType();
            options.headers['Content-Length'] = formData.getContentLength();
        } else if (options.method == 'GET') {
            options.path += (options.path.indexOf('?') != -1 ? '&' : '?') + (typeof options.content != 'string' ? querystring.stringify(options.content) : options.content);
        } else if (options.method == 'DELETE' || options.method == 'PUT' || options.method == 'POST') {
            options.headers = !options.headers ? {} : options.headers;
            if (options.headers['content-type'] == 'application/x-www-form-urlencoded') {
                options.content = (typeof options.content != 'string' ? querystring.stringify(options.content) : options.content);
            } else if (util.isPlainObject(options.content) || options.content instanceof Array) {
                options.headers['content-type'] = 'application/json;charset=UTF-8';
                options.content = JSON.stringify(util.param(options.content));
            }
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
        if (formData instanceof FormData) {
            options.content.write(req);
        } else {
            req.write(options.content);
        }
    }
    return req;
};
/**
 * get 主要用于查询
 */
httputil.prototype.get = function () {
    return invoke.apply(this, Array.prototype.concat.call(['GET'], Array.prototype.slice.call(arguments)));
};
/**
 * post 主要用于新增
 */
httputil.prototype.post = function () {
    return invoke.apply(this, Array.prototype.concat.call(['POST'], Array.prototype.slice.call(arguments)));
};
/**
 * delete 主要用于删除
 */
httputil.prototype.delete = function () {
    return invoke.apply(this, Array.prototype.concat.call(['DELETE'], Array.prototype.slice.call(arguments)));
};
/**
 * delete 主要用于更新
 */
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
        var req, names = argumentNames(callback);
        if (names.length == 3) {
            req = this.request(options).on('response', function (res) {
                res.on('complete', function (data) {
                    callback.apply(options, [null, res, data]);
                }).on('error', function (error) {
                    console.log(error);
                    callback.apply(options, [error, res, null]);
                });
            });
        } else {
            req = this.request(options, callback);
        }
        req.end();
        return req;
    }
    return new Deferred(new Promise((function (http) {
        return function (resolve, reject) {
            http.request(options).on('response', function (res) {
                res.on('complete', function (data) {
                    resolve(data);
                }).on('error', function (error) {
                    reject(error);
                });
            }).end();
        }
    }(this))));
};
/**
 * 获取方法的参数名称
 * @param fn
 * @returns {Array}
 */
var argumentNames = function (fn) {
    var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
};
var FormData = (function (_FormData) {
    if (_FormData) {
        throw new Error('系统提供了 FormData 对象,请参考对象,重构代码');
    }

    var _length = function (source) {
        return source.replace(new RegExp("[^\\x00-\\xff]", "g"), "rr").length;
    };

    return function (boundary) {
        boundary += "";
        var params = [];
        this.length = boundary.length + 8;
        this.append = function (key, value) {
            params.push({key: key, value: value});
            if (FormData.has(value)) {
                this.length += (boundary.length + 4 + 45 + 29 + key.length + value.size + value.type.length + _length(value.name));
            } else {
                this.length += (boundary.length + 4 + 45 + key.length + value.length);
            }
            return this;
        };
        this.getContentType = function () {
            return "multipart/form-data;boundary=" + boundary;
        };
        this.getContentLength = function () {
            return this.length;
        };
        this.size = function () {
            var length = 0;
            length += ("\r\n--" + boundary).length;
            params.forEach(function (param) {
                if (typeof param.value == 'string') {
                    length += ("\r\nContent-Disposition: form-data; name=\"" + param.key + "\"\r\n\r\n" + param.value).length;
                } else {
                    length += ("\r\nContent-Disposition: form-data; name=\"" + param.key + "\"; filename=\"" + param.value.name + "\"" + "\r\n").length;
                    length += ("Content-Type: " + param.value.type + "\r\n\r\n").length;
                    length += fs.readFileSync(param.value.path).length;
                }
                length += ("\r\n--" + boundary).length;
            });
            length += ("--\r\n").length;
            return length;
        };
        this.write = function (req) {
            req.write("\r\n--" + boundary);
            params.forEach(function (param) {
                if (typeof param.value == 'string') {
                    req.write("\r\nContent-Disposition: form-data; name=\"" + param.key + "\"\r\n\r\n" + param.value);
                } else {
                    req.write("\r\nContent-Disposition: form-data; name=\"" + param.key + "\"; filename=\"" + param.value.name + "\"" + "\r\n");
                    req.write("Content-Type: " + param.value.type + "\r\n\r\n");
                    req.write(fs.readFileSync(param.value.path));
                }
                req.write("\r\n--" + boundary);
            });
            req.write("--\r\n");
        };
    };
})(FormData);

FormData.has = function (content) {
    if (util.isPlainObject(content)) {
        for (var p in content) {
            if (content.hasOwnProperty(p) && FormData.has(content[p])) {
                return true;
            }
        }
        return false;
    } else if (content.constructor.name == 'File') {
        return true;
    }
};

http.authorization = function (user) {
    return 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');
};
/**
 * 工具类
 * @type {{merge: util.merge, isPlainObject: util.isPlainObject, param: util.param}}
 */
var util = {
    /**
     * 合并json方法
     * @returns {*}
     */
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
    /**
     * 判断是否为基础对象
     * @param obj
     * @returns {*}
     */
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
    /**
     * 将表单参数转为json格式
     * @param params
     * @returns {*}
     */
    param: function (params) {
        var _t = /\[(\d+)\]$/;
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
                if (array.length == i + 1 && !_isarray) {
                    obj[name] = params[p];
                }
                if (_isarray) {
                    obj = !obj[name] ? obj[name] = [] : obj[name];
                    if (array.length != i + 1) {
                        obj = !obj[parseInt(index)] ? obj[parseInt(index)] = {} : obj[parseInt(index)];
                    } else {
                        obj[parseInt(index)] = params[p];
                    }
                } else {
                    obj = obj[name] == null ? obj[name] = {} : obj[name];
                }
            };
            if (p.indexOf('.') != -1) {
                p.split('.').forEach(setParams);
                delete params[p];
            } else if (_t.test(p)) {
                setParams(p, 0, [p]);
                delete params[p];
            }
        }
        return params;
    }
};

httputil.prototype.when = function () {
    var deferreds, resultNames;
    if (arguments.length == 1 || util.isPlainObject(arguments[0])) {
        deferreds = [], resultNames = [];
        for (var p in arguments[0]) {
            resultNames.push(p);
            deferreds.push(arguments[0][p]);
        }
    } else {
        deferreds = Array.prototype.slice.call(arguments);
    }
    var promises = [];
    deferreds.forEach(function (v) {
        promises.push(v.promise);
    });
    return new Deferred(Promise.all(promises),resultNames);
};
var Deferred = function (promise,resultNames) {
    this.promise = promise;
    this.resultNames = resultNames;
};
Deferred.prototype.then = function(callback){
    var names = this.resultNames;
    return new Deferred(this.promise.then(function (data) {
        if(!!names){
            var results = {};
            data.forEach(function(v,i){
                results[names[i]] = v;
            });
            return callback(results).promise;
        }else{
            return callback(data).promise;
        }
    }));
};
Deferred.prototype.done = function (callback) {
    var names = this.resultNames;
    this.promise.then(function (data) {
        if(!!names){
            var results = {};
            data.forEach(function(v,i){
                results[names[i]] = v;
            });
            callback(results);
        }else{
            callback(data);
        }
        return data;
    });
    return this;
};
Deferred.prototype.fail = function (callback) {
    this.promise.catch(function (error) {
        if(!!names){
            var results = {};
            error.forEach(function(v,i){
                results[names[i]] = v;
            });
            callback(results);
        }else{
            callback(error);
        }
        return error;
    });
    return this;
};
module.exports = register;