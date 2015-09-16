var express = require('express');
var http = require('./../lib/http-utils-defult');
var router = express.Router();
//var http = require('./../lib/http-utils')({
//    hostname: '192.168.0.106',
//    port: 8080,
//    headers: {
//        'Authorization': 'Basic YWRtaW46MTIzNDU2'
//    }
//});
var async = require('async');

router.get('/payconfigs', function (req, res, next) {
    http.get('/system/payconfigs', function (_res) {
        _res.on('complete', function (data) {
            res.render('system/payconfigs', {pager: JSON.stringify(data)});
        });
    });
});

router.get('/payconfigs/add', function (req, res, next) {
    http.get('/system/payproducts', function (_res) {
        _res.on('complete', function (data) {
            res.render('system/payconfigs_add', {payproducts: JSON.stringify(data)});
        });
    });
});

router.get('/payconfigs/edit/:id', function (req, res, next) {
    async.parallel({
            payconfig: function (callback) {
                http.get('/system/payconfigs/' + req.params.id, function (_res) {
                    _res.on('complete', function (data) {
                        callback(null, data);
                    });
                });
            },
            payproducts: function (callback) {
                http.get('/system/payproducts', function (_res) {
                    _res.on('complete', function (data) {
                        callback(null, data);
                    });
                });
            }
        },
        function (err, results) {
            res.render('system/payconfigs_edit', results);
        });
});

router.post('/payconfigs/search', function (req, res, next) {
    http.get('/system/payconfigs', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/payconfigs/save', function (req, res, next) {
    if (!!req.body.id) {
        http.put('/system/payconfigs/' + req.body.id, req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    } else {
        http.post('/system/payconfigs', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }
});
router.get('/payconfigs/:id/test', function (req, res, next) {
    http.get('/system/payconfigs/' + req.params.id + '/test', req.query, function (_res) {
        _res.on('complete', function (data) {
            res.render('system/payconfigs_test', {payform: data});
        });
    });
});


router.get('/payments', function (req, res, next) {
    http.get('/system/payments', function (_res) {
        _res.on('complete', function (data) {
            res.render('system/payments', {pager: JSON.stringify(data)});
        });
    });
});

router.get('/payments/:id', function (req, res, next) {
    http.get('/system/payments/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.render('system/payments_view', {payment: data});
        });
    });
});

module.exports = router;