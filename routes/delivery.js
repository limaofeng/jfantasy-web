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

module.exports = router;