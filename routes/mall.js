var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();
//品牌列表
router.get('/brands', function (req, res) {
    http.get({path: '/mall/brands', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            req.json(data);
        } else {
            res.render('mall/brands', {pager: data});
        }
    });
});
//修改页面跳转
router.get('/brands/:id/edit', function (req, res) {
    async.parallel({
        //查询分类数据
        categorys: function (callback) {
            http.get('/mall/categorys', function (error, _res, data) {
                callback(null, data);
            });
        },
        //查询品牌数据
        brand: function (callback) {
            http.get('/mall/brands/' + req.params.id, function (error, _res, data) {
                callback(null, data);
            });
        }
    }, function (err, results) {
        res.render('mall/brands_edit', results);
    });
});

//新增页面跳转
router.get('/brands/add', function (req, res) {
    //请求品牌分类数据
    http.get('/mall/categorys', function (error, _res, data) {
        res.render('mall/brands_add', {"categorys": data});
    });
});
//保存
router.post('/brands/save', function (req, res) {
    http.post('/mall/brands', req.body, function (error, _res, data) {
        res.json(data);
    });
});

//品牌查询
router.post('/brands/search', function (req, res) {
    http.get('/mall/brands', function (error, _res, data) {
        res.json(data);
    });
});

//删除
router.post('/brands/delete', function (req, res) {
    var ids = req.body.ids;
    ids = ids instanceof Array ? ids : [ids];
    http.delete('/mall/brands', ids, function (error, _res, data) {
        res.json(data);
    });
});

module.exports = router;