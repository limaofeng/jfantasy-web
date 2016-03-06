var client = require('../lib/http-client')({
    hostname: 'api.zbsg.com.cn',
    port: 80
});
/**
 * 普通调用
 * */
client.get('/security/roles').done(function(data){
    console.log(data);
});

/**
 * 并行调用 (数组方式)
 * */
client.when(client.get('/security/roles'),client.get('/common/areas')).done(function (data) {
    console.log(data[0]);
    console.log(data[1]);
});

/**
 * 并行调用 (json方式)
 * */
client.when({roles: client.get('/security/roles'), areas: client.get('/common/areas')}).done(function (data) {
    console.log(data.roles);
    console.log(data.areas);
});

/**
 * 串行调用
 */
client.get('/security/roles').then(function(data){
    return client.get('/common/areas');
}).done(function(data){
    console.log(data);
});