var client = require('../lib/http-client')({
    hostname: 'api.zbsg.com.cn',
    port: 80
});

var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
var x = Date.now();
console.log(x);
Promise.all([p1, p2]).then(function (results) {
    console.log(Date.now() - x);
    console.log(results); // 获得一个Array: ['P1', 'P2']
});