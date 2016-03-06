var express = require('express');
var http = require('./../lib/http-client-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');

router.get('/', function (req, res) {
    http.get({path: '/members', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        }else{
            res.render('member/members', {pager: data});
        }
    });
});

router.get('/add', function (req, res) {
    res.render('member/members_add');
});

router.get('/:id/edit', function (req, res) {
    http.get({path:'/members/' + req.params.id,headers:{'X-Expend-Fields':'details'}},function (error, _res, data) {
        res.render('member/members_edit', {member: data});
    });
});

router.get('/:id/delete', function (req, res) {
    http.delete('/members/' + req.params.id, function (error,_res,data) {
        res.json(data);
    });
});
/**
 * 批量删除
 */
router.post('/delete', function (req, res) {
    var ids = req.body.ids;
    var _p = {};
    if(typeof ids == 'string'){
        _p[1] = (function(){
            return function(callback) {
                http.delete('/members/' + ids, function (error,_res,data) {
                    callback(null, data);
                });
            }
        })();
    }else{
        for(var i=0; i<ids.length; i++){
            _p[i] = (function(j){
                return function(callback) {
                    http.delete('/members/' + ids[j], function (error,_res,data) {
                            callback(null, data);
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

//收货地址
router.get('/receivers', function (req, res) {
    http.get({path: '/members/212/receivers', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        }else{
            res.render('member/receivers', {pager: data});
        }
    });
});
router.get('/receivers/add', function (req, res, next) {
    res.render('member/receivers_add');//,{corps:data}
});
router.get('/types/:id/edit', function (req, res, next) {
    http.get('/delivery/types/'+req.params.id, function (error, _res, data) {
        res.render('delivery/types_edit', {type: data});
        console.log(data);
    });
});
router.post('/:memid/receivers/save', function (req, res, next) {
    if(!!req.body.id){
        http.put('/members/'+req.params.memid+'/receivers/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/members/'+req.params.memid+'/receivers',req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});
//收货地址
module.exports = router;