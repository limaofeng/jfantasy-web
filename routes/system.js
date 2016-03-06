var express = require('express');
var http = require('./../lib/http-client-defult');
var async = require('async');
var router = express.Router();

router.get('/payconfigs', function (req, res) {
    http.get({path: '/system/payconfigs', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        } else {
            res.render('system/payconfigs', {pager: data});
        }
    });
});

router.get('/payconfigs/add', function (req, res) {
    http.get('/system/payproducts', function (error,_res,data) {
        res.render('system/payconfigs_add', {payproducts: JSON.stringify(data)});
    });
});

router.get('/payconfigs/edit/:id', function (req, res) {
    async.parallel({
            payconfig: function (callback) {
                http.get('/system/payconfigs/' + req.params.id, function (error,_res,data) {
                    callback(null, data);
                });
            },
            payproducts: function (callback) {
                http.get('/system/payproducts', function (error,_res,data) {
                    callback(null, data);
                });
            }
        },
        function (err, results) {
            res.render('system/payconfigs_edit', results);
        });
});

router.post('/payconfigs/save', function (req, res) {
    if (!!req.body.id) {
        http.put('/system/payconfigs/' + req.body.id, req.body, function (error,_res,data) {
            res.json(data);
        });
    } else {
        http.post('/system/payconfigs', req.body, function (error,_res,data) {
            res.json(data);
        });
    }
});
router.get('/payconfigs/:id/test', function (req, res) {
    http.post('/system/payconfigs/' + req.params.id + '/test', req.query, function (error,_res,data) {
        res.render('system/payconfigs_test', {payform: data});
    });
});


router.get('/payments', function (req, res) {
    http.get({path: '/system/payments', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        } else {
            res.render('system/payments', {pager: data});
        }
    });
});

router.get('/payments/:id', function (req, res, next) {
    http.get('/system/payments/' + req.params.id, function (error, _res, data) {
        res.render('system/payments_view', {payment: data});
    });
});
//支付详细页
router.get('/payments/:id/view', function (req, res, next) {
    http.get('/system/payments/' + req.params.id, function (error, _res, data) {
        res.render('system/payments_view', {payment: data});
    });
});

router.get('/dds', function (req, res, next) {
    http.get('/system/ddts?limit=0,100', function (error, _res, data) {
        res.render('system/dds', {types: data});
    });
});
router.get('/dds', function (req, res, next) {
    http.get({path: '/system/dds', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        res.json(data);
    });
});

router.post('/dds',function(req,res,next){
    if(!!req.body.code){
        http.post('/system/ddts/'+req.body.type+'/dds',req.body,function(error,_res,data){
               res.json(data);
        });
    }else{
        http.post('/system/ddts/'+req.body.type+'/dds', req.body, function (error,_res,data) {
            res.json(data);
        });
    }
});

//地区列表
router.get('/areas', function (req, res) {
    http.get({path: '/common/areas', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        } else {
            res.render('system/areas', {pager: data});
        }
    });
});
router.get('/areas/add', function (req, res, next) {
    http.get('/common/areas?limit=0,20', function (error, _res, data) {
        res.render('system/areas_add',{rootArea:data});
    });
});
router.get('/areas/:id/edit', function (req, res, next) {
    http.get('/common/areas/'+req.params.id, function (error, _res, data) {
        res.render('system/areas_edit', {area: data});
    });
});
router.post('/areas/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/system/areas/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/system/areas/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});
//网站配置
router.get('/websites', function (req, res, next) {
    http.get({path: '/system/websites', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('system/websites', {pager: data});
    });
});
router.get('/websites/search', function (req, res, next) {
    http.get({path: '/system/websites', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.json(data);
    });
});
router.get('/websites/add', function (req, res, next) {
    http.get('/system/areas?limit=0,20', function (error, _res, data) {
        res.render('system/websites_add',{rootArea:data});
    });
});
router.get('/websites/:id/edit', function (req, res, next) {
    http.get('/system/websites/'+req.params.id, function (error, _res, data) {
        res.render('system/websites_edit', {area: data});
    });
});
router.post('/websites/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/system/websites/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/system/websites/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});
module.exports = router;