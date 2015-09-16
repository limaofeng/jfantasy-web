/**
 * 导诊
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    http.get('/guides', function (_res) {
        _res.on('complete', function (data) {
            res.render('guides/index', {pager: JSON.stringify(data)});
        });
    });
});
/**
 * 新增
 */
router.get('/add', function (req, res, next) {
    res.render('guides/add');
});

/**
 * 保存
 */
router.post('/save', function (req, res, next) {
    req.body = helper.paramJson(req.body);
    var user = req.body['user'];
    async.series({
        user: function (callback) {
            if (user) {
                if(user.id){
                    // 编辑
                    http.put('/users/'+user.id, user, function (_res) {
                        _res.on('complete', function (data) {
                            var err = '';
                            if (_res.statusCode < 300) {
                                user = data;
                            } else {
                                err = '保存账号失败，错误码:' + _res.statusCode;
                                user = '';
                            }
                            callback(err, data);
                        });
                    });
                }else{
                    // 新增
                    user.userType = 'guide';
                    user.enabled = true;
                    user.accountNonExpired = true;
                    user.accountNonLocked = true;
                    user.credentialsNonExpired = true;
                    http.post('/users/', user, function (_res) {
                        _res.on('complete', function (data) {
                            var err = '';
                            if (_res.statusCode < 300) {
                                user = data;
                            } else {
                                err = '保存医生失败，错误码:' + _res.statusCode;
                                user = '';
                            }
                            callback(err, data);
                        });
                    });
                }
            }
        },
        guide: function(){
            if(user.id){
                req.body.userId = user.id;
            }
            if (!!req.body.id) {
                // 编辑
                http.put('/guides/' + req.body.id, req.body, function (_res) {
                    _res.on('complete', function (data) {
                        res.json(data);
                    });
                });
            } else {
                // 新增
                http.post('/guides', req.body, function (_res) {
                    _res.on('complete', function (data) {
                        res.status(_res.statusCode);
                        res.json(data);
                    });
                });
            }
        }
    },function(err, result){
        console.log(err);
        res.json(result.guide);
    });
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
    http.get('/guides', params, function (_res) {
        _res.on('complete', function (data) {
            if(_res.statusCode<300){
                res.json(data);
            }else{
                res.status(_res.statusCode);
                res.json({});
            }
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
                http.delete('/guides/' + ids, function (_res) {
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
                    http.delete('/guides/' + ids[j], function (_res) {
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
});
/**
 * 编辑
 */
router.get('/:id/edit', function (req, res, next) {
    var userId;
    async.series({
        guide: function(callback){
            http.get('/guides', {'EQS_id':req.params.id}, function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        var _r = data.pageItems && data.pageItems.length>0 ? data.pageItems[0] : {};
                        userId = _r.userId;
                        callback(null, _r);
                    }else{
                        callback('查询导诊异常', {});
                    }
                });
            });
        },
        user: function(callback){
            if(userId){
                http.get('/users', {'EQL_id':userId}, function (_res) {
                    _res.on('complete', function (data) {
                        if(_res.statusCode<300){
                            callback(null,data.pageItems && data.pageItems.length>0 ? data.pageItems[0] : {});
                        }else{
                            callback('查询用户异常', {});
                        }
                    });
                });
            }else{
                callback('没有用户id',{});
            }
        }
    },function(err, result){
        res.render('guides/edit', {user: result.user, guide: result.guide});
    });
});
/**
 * 详情
 */
router.get('/:id', function (req, res, next) {
//    http.get('/guides', req.params.id, function (_res) {
//        _res.on('complete', function (data) {
//            res.render('guides/view', {guide: data});
//        });
//    });
});
module.exports = router;