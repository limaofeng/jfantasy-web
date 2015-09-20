var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var BufferHelper = require('bufferhelper');

var register = function (defaultOptions) {
    return new httputil(defaultOptions);
};
var httputil = function (defaultOptions) {
    this.defaultOptions = defaultOptions;
}
httputil.prototype.request = function () {
    var options = arguments[0];
    util._extend(options, this.defaultOptions);

    if (!!options.content) {
        if (options.method == 'GET') {
            options.path += (options.path.indexOf('?') != -1 ? '&' : '?') + (typeof options.content != 'string' ? querystring.stringify(options.content) : options.content);
        } else if (options.method == 'DELETE' || options.method == 'PUT' || options.method == 'POST') {
            options.headers = !options.headers ? {} : options.headers;
            options.headers['content-type'] = 'application/json;charset=UTF-8';
            options.content = JSON.stringify(options.content);
            if(options.method == 'DELETE'){//NodeJS delete 不能提交 raw
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
                res.emit('complete', eval('(' + (body.toString() || '{}') + ')'));
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
    var options = typeof arguments[0] == 'string' ? (function (path, content) {
        return typeof content == 'function' ? {path: path} : {path: path, content: content};
    }).apply(this, arguments) : arguments[0];
    options.method = 'GET';
    var req = this.request(options, arguments.length == 2 ? arguments[1] : arguments[2]);
    req.end();
    return req;
};
httputil.prototype.post = function () {
    var options = typeof arguments[0] == 'string' ? (function (path, content) {
        return typeof content == 'function' ? {path: path} : {path: path, content: content};
    }).apply(this, arguments) : arguments[0];
    options.method = 'POST';
    var req = this.request(options, arguments.length == 2 ? arguments[1] : arguments[2]);
    req.end();
    return req;
};
httputil.prototype.delete = function () {
    var options = typeof arguments[0] == 'string' ? (function (path, content) {
        return typeof content == 'function' ? {path: path} : {path: path, content: content};
    }).apply(this, arguments) : arguments[0];
    options.method = 'DELETE';
    var req = this.request(options, arguments.length == 2 ? arguments[1] : arguments[2]);
    req.end();
    return req;
};
httputil.prototype.put = function () {
    var options = typeof arguments[0] == 'string' ? (function (path, content) {
        return typeof content == 'function' ? {path: path} : {path: path, content: content};
    }).apply(this, arguments) : arguments[0];
    options.method = 'PUT';
    var req = this.request(options, arguments.length == 2 ? arguments[1] : arguments[2]);
    req.end();
    return req;
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
module.exports = register;