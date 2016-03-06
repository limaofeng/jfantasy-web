var express = require('express');
var http = require('./../lib/http-client-defult');
var async = require('async');

var router = express.Router();

//手机验证码配置
router.get('/configs', function (req, res) {
    http.get({
        path: '/sms/configs',
        headers: {'X-Page-Fields': true, 'X-Expend-Fields': 'corp'}
    }, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        } else {
            res.render('sms/configs', {pager: data});
        }
    });
});
router.get('/configs/add', function (req, res) {
    res.render('sms/configs_add');
});
router.get('/configs/:id/edit', function (req, res) {
    http.get('/sms/configs/' + req.params.id, function (error, _res, data) {
        res.render('sms/configs_edit', {type: data});
    });
});
router.post('/configs', function (req, res) {
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