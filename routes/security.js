var express = require('express');
var http = require('./../lib/http-utils-defult');
//var http = require('./../lib/http-utils')({
//    hostname: '192.168.0.106',
//    port: 8080,
//    headers: {
//        'Authorization': 'Basic YWRtaW46MTIzNDU2'
//    }
//});
var router = express.Router();

router.get('/menus', function (req, res, next) {
    http.get('/security/menus', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/menus', {title: 'Express', temp: 'base', menus: JSON.stringify(data)});
        });
    });
});

router.post('/menus/delete', function (req, res, next) {
    http.delete('/security/menus/' + req.param('id'), function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/menus/save', function (req, res, next) {
    if (!!req.body.id) {
        http.put('/security/menus/' + req.body.id, req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    } else {
        http.post('/security/menus', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }
});


module.exports = router;