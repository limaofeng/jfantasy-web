var config=require('./config').http;
module.exports=(function(){
    var _options = require('url').parse(config.serverPath, true);
    var http = require('./http-utils')({
        hostname: _options.hostname,
        port: _options.port,
        headers: {
            'X-Page-Fields':true
            //'Authorization': 'Basic ' + new Buffer(config.authUser.username + ':' + config.authUser.password).toString('base64')
        }
    });
    if (!!http.defaultOptions.contextPath && http.defaultOptions.contextPath != '/') {
        http.request = (function (_request) {
            return function () {
                var options = arguments[0];
                options.path = this.defaultOptions.contextPath + options.path;
                return _request.apply(this, arguments);
            }
        })(http.request)
    }
    return http;
})();