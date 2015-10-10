var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();

//手机验证码配置
router.get('/accounts', function (req, res, next) {
    http.get({path: '/weixin/accounts/:id', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('weixin/accounts', {pager: data});
    });
});
router.get('/accounts/search', function (req, res, next) {
    http.get({path: '/sms/configs', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.json(data);
    });
});
router.get('/accounts/add', function (req, res, next) {
    // http.get('/delivery/corps?limit=0,20', function (error, _res, data) {
    res.render('weixin/accounts_add');
    //  });
});
router.get('/accounts/:id/edit', function (req, res, next) {
    http.get('/weixin/accounts/'+req.params.id, function (error, _res, data) {
        res.render('weixin/accounts_edit', {account: data});
        console.log(data);
    });
});
router.post('/accounts/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/weixin/accounts/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/weixin/accounts/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});
module.exports = router;