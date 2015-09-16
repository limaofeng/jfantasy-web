/**
 * 医生
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
    http.get('/doctors', function (_res) {
        _res.on('complete', function (data) {
            res.render('doctor/index', {pager: JSON.stringify(data)});
        });
    });
});
/**
 * 新增
 */
router.get('/add', function (req, res, next) {
    res.render('doctor/add');
});
/**
 * 编辑
 */
router.get('/:id/edit', function (req, res, next) {
    async.parallel({
        doctor: function(callback){
            http.get('/doctors/' + req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        }
    },function(err, result){
        res.render('doctor/edit', {doctor: result.doctor, times: result.times});
    })

});
/**
 * 排班
 */
router.get('/:id/plan', function (req, res, next) {
    async.parallel({
        doctor: function(callback){
            http.get('/doctors/' + req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        },
        times: function(callback){
            http.get('/doctors/'+req.params.id+'/times', function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        },
        clinics: function(callback){
            http.get('/doctors/'+req.params.id+'/clinics', function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        }
    },function(err, result){
        res.render('doctor/plan_date', {doctor: result.doctor, times: result.times, clinics: result.clinics});
    })

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
                http.delete('/doctors/' + ids, function (_res) {
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
                    http.delete('/doctors/' + ids[j], function (_res) {
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
 * 保存医生
 */
router.post('/save', function (req, res, next) {
    req.body = helper.paramJson(req.body);
    var clinics = req.body.clinics, doctorId, user = req.body['user'];
    if(typeof clinics == 'string'){
        clinics = [clinics];
    }
    delete req.body["clinics"];
    delete req.body['user'];
    async.series({
        user: function(callback){
            if(user){
                user.userType='doctor';
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
                            err = '保存医生失败，错误码:'+_res.statusCode;
                            user = '';
                        }
                        callback(err,data);
                    });
                });
            }else{
                callback('',{});
            }
        },
        doctor: function(callback){
            if(user && user.id){
                req.body.user = user;
            }
            if (!!req.body.id) {
                http.put('/doctors/' + req.body.id, req.body, function (_res) {
                    _res.on('complete', function (data) {
//                        res.status(_res.statusCode);
//                        res.json(data);
                        var err = '';
                        if(_res.statusCode<300){
                            doctorId = data.id;
                        }else{
                            err = '保存医生失败，错误码:'+_res.statusCode;
                        }
                        callback(err,data);
                    });
                });
            } else {
                http.post('/doctors', req.body, function (_res) {
                    _res.on('complete', function (data) {
//                        res.status(_res.statusCode);
//                        console.log(_res.statusCode);
//                        res.json(data);
                        var err = '';
                        if(_res.statusCode<300){
                            doctorId = data.id;
                        }else{
                            err = '保存医生失败，错误码:'+_res.statusCode;
                        }
                        callback(err,data);
                    });
                });
            }
        },
        clinics: function(callback){
            if(!doctorId){
                callback('医生ID缺失',null);
                return;
            }
            http.post('/doctors/'+doctorId+'/clinics', clinics, function (_res) {
                _res.on('complete', function (data) {
                    var err = '';
                    if(_res.statusCode<300){

                    }else{
                        err = '关联诊所失败，错误码:'+_res.statusCode;
                    }
                    callback(err,data);
                });
            });
        }
    },function(err, result){
        console.log(err);
        res.json(result.doctor);
    });
});
/**
 * 医生排班保存
 */
router.post('/plan/save', function (req, res, next) {
    var times = req.body.ptimes;
    var doctorId = req.body['doctor.id'];
    if(typeof times == 'string'){
        times = JSON.parse(req.body.ptimes)
    }
    var objs = [];
    for(var key in times){
        var obj = {};
        obj.periodTime = key;
        obj.time = req.body.time;
        obj.number = times[key];
        obj.money = req.body.money;
        obj.status = 'prerelease';
        obj.doctor = {};
        obj.doctor.id = req.body['doctor.id'];
        obj.clinic = {};
        obj.clinic.id = req.body['clinic.id'];
        objs.push(obj);
    }
    delete req.body["ptimes"];
    http.post('/doctors/'+doctorId+'/times', objs, function (_res) {
        _res.on('complete', function (data) {
            if(_res.statusCode<300){
                res.status(201);
                res.json(data);
            }else{
                res.status(_res.statusCode);
                res.json({});
            }
        });
    });
});
/**
 * 查询
 */
router.post('/search', function (req, res, next) {
    var params = {};
    for(var key in req.body){
        if(!req.body[key]){
            continue;
        }
        params[key] = req.body[key];
    }
    http.get('/doctors', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 挂号列表
 */
router.get('/:id/registrations', function (req, res, next) {
    var doctorId = req.params.id;
    http.get('/doctors/'+doctorId+'/registrations', function (_res) {
        _res.on('complete', function (data) {
            var params = {pager: JSON.stringify(data)};
            var doctor = {};
            if(data.pageItems.length>0){
                doctor.name = data.pageItems[0].doctorName;
            }
            doctor.id = doctorId;

            params.doctor = doctor;
            res.render('registrations/index', params);
        });
    });
});

/**
 * 医生详情页面
 */
router.get('/:id', function (req, res, next) {
    async.parallel({
        doctor: function(callback){
            http.get('/doctors/' + req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        },
        times: function(callback){
            http.get('/doctors/'+req.params.id+'/times', function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        },
        clinics: function(callback){
            http.get('/doctors/'+req.params.id+'/clinics', function (_res) {
                _res.on('complete', function (data) {
                    callback(null,data);
                });
            });
        }
    },function(err, result){
        res.render('doctor/view', {doctor: result.doctor, times: result.times, clinics: result.clinics});
    });
});
module.exports = router;