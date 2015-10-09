var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();

//手机验证码配置
router.get('/configs', function (req, res, next) {
    http.get({path: '/sms/configs/:id', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('sms/configs', {pager: data});
    });
});
router.get('/configs/search', function (req, res, next) {
    http.get({path: '/sms/configs', headers: {'X-Page-Fields': true,'X-Expend-Fields':'corp'}}, function (error, _res, data) {
        res.json(data);
    });
});
router.get('/configs/add', function (req, res, next) {
   // http.get('/delivery/corps?limit=0,20', function (error, _res, data) {
        res.render('sms/configs_add');
  //  });
});
router.get('/configs/:id/edit', function (req, res, next) {
    http.get('/sms/configs/'+req.params.id, function (error, _res, data) {
        res.render('sms/configs_edit', {type: data});
        console.log(data);
    });
});
router.post('/configs/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/sms/configs/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/sms/configs/',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});
module.exports = router;