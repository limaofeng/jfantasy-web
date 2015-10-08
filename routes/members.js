var express = require('express');
var http = require('./../lib/http-utils-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');

router.get('/', function (req, res, next) {
    http.get({path:'/members',headers:{'X-Page-Fields':true}},function (error, _res, data) {
        res.render('member/members', {pager: data});
        console.log(data);
    });
});

router.get('/search', function (req, res, next) {
    http.get({path: '/members', headers: {'X-Page-Fields':true}}, function (error, _res, data) {
        res.json(data);
    });
});

//router.use('/search', function (req, res, next) {
//    //var params = {};
//    //var _p = {};
//    //if(req.method=='POST'){
//    //    _p = req.body;
//    //}else{
//    //    _p = req.query;
//    //}
//    //for(var key in _p){
//    //    if(!req.body[key]){
//    //        continue;
//    //    }
//    //    params[key] = _p[key];
//    //}
//    http.get({path:'/members',headers:{'X-Page-Fields':true}},function (error, _res, data) {
//        // http.get('/members', params, function (_res) {
//        _res.on('complete', function (data) {
//            res.json(data);
//        });
//    });
//});

router.get('/add', function (req, res, next) {
    res.render('member/members_add');
});

router.get('/:id/edit', function (req, res, next) {
    http.get('/members/' + req.params.id,function (error, _res, data) {
            res.render('member/members_edit', {member: data});
    });
});

//router.get('/types/:id/edit', function (req, res, next) {
//    http.get('/delivery/types/'+req.params.id, function (error, _res, data) {
//        res.render('delivery/types_edit', {type: data});
//        console.log(data);
//    });
//});

router.get('/:id/delete', function (req, res, next) {
    http.delete('/members/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
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
                http.delete('/members/' + ids, function (_res) {
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
                    http.delete('/members/' + ids[j], function (_res) {
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
router.post('/save', function (req, res, next) {
    req.body = helper.paramJson(req.body);
    if (!!req.body.id) {
        http.put('/members/' + req.body.id, req.body, function (error, _res, data) {
                res.json(data);
        });
    } else {
        http.post('/members', req.body, function (error, _res, data) {
                res.json(data);
        });
    }
});

///**
// * 就诊人列表
// */
//router.get('/:id/patients', function (req, res, next) {
//    http.get('/members/'+req.params.id+'/patients', function (_res) {
//        _res.on('complete', function (data) {
//            res.render('member/patients', {member: data});
//        });
//    });
//});
/**
 * 会员详情
 */
//router.get('/:id', function (req, res, next) {
//    async.parallel({
//        member: function(callback){
//            http.get('/members/' + req.params.id, function (_res) {
//                _res.on('complete', function (data) {
//                    callback(null,data);
//                });
//            });
//        },
//        patients: function(callback){
//            http.get('/members/'+req.params.id+'/patients', function (_res) {
//                _res.on('complete', function (data) {
//                    callback(null,data);
//                });
//            });
//        }
//    },function(err, result){
//        res.render('member/members_view', {member: result.member, patients: result.patients});
//    });
//});

//收货地址
router.get('/receivers', function (req, res, next) {
    http.get({path: '/members/212/receivers', headers: {'X-Page-Fields': true}}, function (error, _res, data) {
        res.render('member/receivers', {pager: data});
    });
});
router.get('/types/search', function (req, res, next) {
    http.get({path: '/delivery/types', headers: {'X-Page-Fields': true,'X-Expend-Fields':'corp'}}, function (error, _res, data) {
        res.json(data);
    });
});
router.get('/receivers/add', function (req, res, next) {
    //http.get('/delivery/corps?limit=0,20', function (error, _res, data) {
        res.render('member/receivers_add');//,{corps:data}
  //  });
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
//收货地址
module.exports = router;