var config=require('./config').http;
module.exports=(function(){
    var _options = require('url').parse(config.serverPath, true);
    var http = require('./http-client')({
        hostname: _options.hostname,
        port: _options.port
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