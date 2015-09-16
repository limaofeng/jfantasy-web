/**
 * 药品
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var router = express.Router();
var async = require('async');

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    http.get('/clinics', function (_res) {
        _res.on('complete', function (data) {
            res.render('clinic/index', {pager: JSON.stringify(data)});
        });
    });
});
/**
 * 新增
 */
router.get('/add', function (req, res, next) {
    res.render('clinic/add');
});
/**
 * 编辑
 */
router.get('/:id/edit', function (req, res, next) {
    http.get('/clinics/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.render('clinic/edit', {clinic: data});
        });
    });
});
/**
 * 删除
 */
router.post('/delete', function (req, res, next) {
    var ids = req.body.ids;
    var _p = {};
    if(typeof ids == 'string'){
        _p[1] = (function(){
            return function(callback) {
                http.delete('/clinics/' + ids, function (_res) {
                    _res.on('complete', function (data) {
                        callback(null, data);
                    });
                });
            }
        })();
    }else{
        for(var i=0; i<ids.length; i++){
            _p[i] = (function(j){
                return function(callback) {
                    http.delete('/clinics/' + ids[j], function (_res) {
                        _res.on('complete', function (data) {
                            callback(null, data);
                        });
                    });
                }
            })(i);
        }
    }

    async.parallel(_p,function(err, result){
        res.json({});
    });
//
//    http.delete('/clinics/' + req.params.id, function (_res) {
//        _res.on('complete', function (data) {
//            res.json(data);
//        });
//    });
});
/**
 * 保存
 */
router.post('/save', function (req, res, next) {
    if (!!req.body.id) {
        http.put('/clinics/' + req.body.id, req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    } else {
        http.post('/clinics', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.status(_res.statusCode);
                res.json(data);
            });
        });
    }
});
/**
 * 查询
 */
router.use('/search', function (req, res, next) {
    var content = {};
    if(req.method=="POST"){
        content = req.body;
    }else{
        content = req.query;
    }
    var params = {};
    for(var key in content){
        if(!content[key]){
            continue;
        }
        params[key] = content[key];
    }
    http.get('/clinics', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

/**
 * 详情
 */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
//    if(isNaN(id)){
//        next();
//    }else{
        http.get('/clinics/' + id, function (_res) {
            _res.on('complete', function (data) {
                res.render('clinic/view', {clinic: data});
            });
        });
//    }
});

module.exports = router;