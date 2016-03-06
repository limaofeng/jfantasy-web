var client = require('../lib/http-client')({
    hostname: 'api.zbsg.com.cn',
    port: 80
});


var p = new Promise(function(resolve, reject) {
    resolve("hello world");
});

console.log(p);
console.log(p.done);

p.then(function(str) {
    console.log(str);
    return "test1";
}).then(function(str) {
    console.log(str);
});