var http = require('../lib/http-client')({
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


var assert = require("assert");
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
});