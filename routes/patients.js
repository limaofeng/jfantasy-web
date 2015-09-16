/**
 * 就诊人
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');

router.get('/', function (req, res, next) {
    http.get('/patients', function (_res) {
        _res.on('complete', function (data) {
            res.render('patient/index', {pager: data});
        });
    });
});
/**
 * 搜索
 */
router.use('/search', function (req, res, next) {
    var params = {};
    var _p = {};
    if(req.method=='POST'){
        _p = req.body;
    }else{
        _p = req.query;
    }
    for(var key in _p){
        if(!req.body[key]){
            continue;
        }
        params[key] = _p[key];
    }
    http.get('/patients', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 编辑
 */
router.get('/:id/edit', function (req, res, next) {
    http.get('/patients/'+req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.render('patient/edit', {patient: data});
        });
    });
});
/**
 * 保存
 */
router.post('/save', function (req, res, next) {
    if (!!req.body.id) {
        http.put('/patients/' + req.body.id, req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    } else {
        http.post('/patients', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.status(_res.statusCode);
                res.json(data);
            });
        });
    }
});
/**
 * 查看病人处方
 */
router.get('/records/:id/prescriptions', function (req, res, next) {
    http.get('/records/'+req.params.id+'/prescriptions', function (_res) {
        _res.on('complete', function (data) {
            res.render('patient/prescriptions', {prescription: data});
        });
    });
});
/**
 * 就诊人详情
 */
router.get('/:id', function (req, res, next) {
    async.parallel({
        medicalRecords: function(callback){
            http.get('/patients/' + req.params.id+'/records',{pageSize:200}, function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        callback(null,data);
                    }else{
                        data = {pageItems:[]};
                        callback('查询病人病历异常',data);
                    }
                });
            });
        },
        patient: function(callback){
            http.get('/patients/'+req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        }
    },function(err, result){
        res.render('patient/view', {records: result.medicalRecords.pageItems, patient: result.patient});
    });
});
module.exports = router;