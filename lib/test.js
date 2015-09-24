var http = require('../lib/http-utils')({
    hostname: 'localhost',
    port: 8080
});

http.get('/security/roles', function (_res) {
    _res.on('complete', function (data) {
        console.log(data);
    });
});

http.get('/security/roles', function (error, res, body) {
 console.log(body);
});

/*

 var params = {
 "id": "212",
 "username": "vipli",
 "nickName": "vip1",
 "password": "123456",
 "enabled": "true",
 "details.name": "vip",
 "details.birthday": "2015-05-05",
 "details.tel": "",
 "details.score": "",
 "details.description": "",
 "fileName": "",
 "description": "",
 "attach": "",
 "details.mobile": "13508089090",
 "details.email": "",
 "details.avatar": "undefined:undefined"
 };

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
 if (array.length == i + 1 && !_isarray) {
 obj[name] = params[p];
 if(name == 'email'){
 console.log('xx');
 }
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

 console.log('----------------')
 console.log(params);
 console.log(JSON.stringify(params));

 */