/**
 * 药房维护
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');

/**
 * 列表
 */
router.get('/', function (req, res, next) {
    http.get('/pharmacys', function (_res) {
        _res.on('complete', function (data) {
            res.render('pharmacy/index', {pager: JSON.stringify(data)});
        });
    });
});

/**
 * 新增
 */
router.get('/add', function (req, res, next) {
    res.render('pharmacy/add');
});
/**
 * 保存
 */
router.post('/save', function (req, res, next) {
    for(var key in req.body){
        if(!req.body[key]){
            delete req.body[key];
        }
    }
    req.body = helper.paramJson(req.body);
    var user = req.body['user'];
    delete req.body['user'];

    async.series({
        user: function(callback){
            if(user){
                if(user.id){
                    // 修改用户
                    http.put('/users/'+user.id, user, function (_res) {
                        _res.on('complete', function (data) {
                            var err = '';
                            if(_res.statusCode<300){
                                user = data;
                            }else{
                                err = '保存药房帐号失败，错误码:'+_res.statusCode;
                                user = {};
                            }
                            callback(err,data);
                        });
                    });
                }else{
                    // 新增用户
                    user.userType='pharmacy';
                    user.enabled = true;
                    user.accountNonExpired = true;
                    user.accountNonLocked = true;
                    user.credentialsNonExpired = true;
                    http.post('/users/', user, function (_res) {
                        _res.on('complete', function (data) {
                            var err = '';
                            if(_res.statusCode<300){
                                user = data;
                            }else{
                                err = '保存药房帐号失败，错误码:'+_res.statusCode;
                                user = {};
                            }
                            callback(err,data);
                        });
                    });
                }
            }else{
                callback('',{});
            }
        },
        pharmacy: function(callback){
            if(user && user.id){
                req.body.userId = user.id;
            }
            if (!!req.body.id) {
                http.put('/pharmacys/' + req.body.id, req.body, function (_res) {
                    _res.on('complete', function (data) {
                        if(_res.statusCode<300){
                            callback(null,data);
                        }else{
                            callback('保存药房失败，错误码:'+_res.statusCode,data);
                        }
                    });
                });
            } else {
                http.post('/pharmacys', req.body, function (_res) {
                    _res.on('complete', function (data) {
                        if(_res.statusCode<300){
                            callback(null,data);
                        }else{
                            callback('保存药房失败，错误码:'+_res.statusCode,data);
                        }
                    });
                });
            }
        }
    },function(err, result){
        res.json(result.pharmacy);
    });
});
/**
 * 编辑
 */
router.get('/:id/edit', function (req, res, next) {
    var userId;
    async.series({
        pharmacy: function(callback){
            http.get('/pharmacys/'+req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        userId = data.userId;
                        callback(null, data);
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
        res.render('pharmacy/edit', {user: result.user, pharmacy: result.pharmacy});
    });
});
/**
 * 批量删除
 */
router.post('/delete', function (req, res, next) {
    var ids = req.body.ids;
    var _p = {};
    if(typeof ids == 'string'){
        _p[1] = (function(){
            return function(callback) {
                http.delete('/pharmacys/' + ids, function (_res) {
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
                    http.delete('/pharmacys/' + ids[j], function (_res) {
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
    http.get('/pharmacys', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 药房下的药品
 */
router.get('/:id/medicines', function (req, res, next) {
    var userId;
    async.parallel({
        medicines: function(callback){
            http.get('/pharmacys/'+req.params.id+'/prices', function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        userId = data.userId;
                        callback(null, data);
                    }else{
                        callback('查询导诊异常', {});
                    }
                });
            });
        }
    },function(err, result){
        res.render('pharmacy/medicines', {pharmacyId:req.params.id, pager: JSON.stringify(result.medicines)});
    });
});
/**
 * 药房下的订单
 */
router.get('/:id/orders', function (req, res, next) {
    async.parallel({
        orders: function(callback){
            http.get('/pharmacys/'+req.params.id+'/orders', function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        callback(null, data);
                    }else{
                        callback('查询导诊异常', {});
                    }
                });
            });
        }
    },function(err, result){
        res.render('pharmacy/orders', {pharmacyId:req.params.id, pager: JSON.stringify(result.orders)});
    });
});
/**
 * 药房下的订单详情
 */
router.get('/:id/orders/:sn', function (req, res, next) {
    async.parallel({
        order: function(callback){
            http.get('/pharmacys/'+req.params.id+'/orders/'+req.params.sn, function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        callback(null, data);
                    }else{
                        callback('查询导诊异常', {});
                    }
                });
            });
        }
    },function(err, result){
        res.render('pharmacy/medicines', {pharmacyId:req.params.id, order: result.order});
    });
});
/**
 * 药品搜索
 */
router.use('/:id/medicines/search', function (req, res, next) {
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
    http.get('/pharmacys/'+req.params.id+'/prices', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 订单搜索
 */
router.use('/:id/orders/search', function (req, res, next) {
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
    http.get('/pharmacys/'+req.params.id+'/orders', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

/**
 * 药房详情
 */
router.get('/:id', function (req, res, next) {
    var userId;
    async.series({
        pharmacy: function(callback){
            http.get('/pharmacys/' + req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        userId = data.userId;
                        callback(null,data);
                    }else{
                        callback('保存药房失败，错误码:'+_res.statusCode,data);
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
                callback(null,{});
            }
        }
    },function(err, result){
        res.render('pharmacy/view', {pharmacy: result.pharmacy, user: result.user});
    });
});
module.exports = router;