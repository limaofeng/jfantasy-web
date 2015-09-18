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

router.get('/roles', function (req, res, next) {
    http.get('/security/roles', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/roles',{pager:data});
        });
    });
});

router.get('/roles/add',function(req, res, next){
    res.render('security/roles_add');
});
router.get('/roles/:code/edit',function(req, res, next){
    http.get('/security/roles/'+req.params.code, function (_res) {
        _res.on('complete', function (data) {
            res.render('security/roles_edit',{role:data});
        });
    });
});

router.post('/roles/save', function (req, res, next) {
    http.post('/security/roles',req.body, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/roles/search', function (req, res, next) {
    http.get('/security/roles',req.params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/roles/delete', function (req, res, next) {
    console.log(req.body.codes)
    http.delete('/security/roles',req.body.codes, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
module.exports = router;