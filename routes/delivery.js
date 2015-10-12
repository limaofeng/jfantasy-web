var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();

router.get('/corps', function (req, res, next) {
    http.get({path: '/delivery/corps', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('delivery/corps', {pager: data});
    });
});

router.get('/corps/add', function (req, res, next) {
    res.render('delivery/corps_add');
});

router.get('/corps/:id/edit', function (req, res, next) {
    http.get('/delivery/corps/'+req.params.id, function (error, _res, data) {
        res.render('delivery/corps_edit', {corp: data});
    });
});

router.post('/corps/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/delivery/corps/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/delivery/corps/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});

router.get('/corps/search', function (req, res, next) {
    http.get({path: '/delivery/corps', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.json(data);
    });
});
//配送方式
router.get('/types', function (req, res, next) {
    http.get({path: '/delivery/types', headers: {'X-Page-Fields': true,'X-Expend-Fields':'corp'}}, function (error, _res, data) {
        res.render('delivery/types', {pager: data});
    });
});
router.get('/types/search', function (req, res, next) {
    http.get({path: '/delivery/types', headers: {'X-Page-Fields': true,'X-Expend-Fields':'corp'}}, function (error, _res, data) {
        res.json(data);
    });
});
router.get('/types/add', function (req, res, next) {
    http.get('/delivery/corps?limit=0,20', function (error, _res, data) {
        res.render('delivery/types_add',{corps:data});
    });
});
router.get('/types/:id/edit', function (req, res, next) {
    http.get('/delivery/types/'+req.params.id, function (error, _res, data) {
        res.render('delivery/types_edit', {type: data});
        console.log(data);
    });
});
router.post('/types/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/delivery/types/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/delivery/types/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});

router.get('/shippings', function (req, res, next) {
    http.get({path: '/delivery/shippings', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('delivery/shippings', {pager: data});
    });
});

router.get('/shippings/:id/view', function (req, res, next) {
    http.get('/delivery/shippings/'+req.params.id, function (error, _res, data) {
        res.render('delivery/shippings_view', {shipping: data});
    });
});
module.exports = router;