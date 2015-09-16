/**
 * 药品
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
    var category = req.query.code;
    async.series({
        categorys: function(callback){
            http.get('/cms/categorys', function (_res) {
                _res.on('complete', function (data) {
                    if(_res.statusCode<300){
                        callback(null,data);
                    }else{
                        callback('查询分类异常',{});
                    }
                });
            });
        },
        pager: function(callback){
            //if(category){
                http.get('/cms/articles', function (_res) {
                    _res.on('complete', function (data) {
                        callback(null,data);
                    });
                });
            //}else{
            //    callback('没有可用的分类',{});
            //}
        }
    },function(err, result){
        res.render('cms/article', result);
    });
});
/**
 * 新增分类
 */
router.get('/category/add', function (req, res, next) {
    var categoryCode = req.query.categoryCode;
    http.get('/cms/categorys/'+categoryCode, function (_res) {
        _res.on('complete', function (data) {
            res.render('cms/category_add', {category: data});
        });
    });
});
/**
 * 保存分类
 */
router.post('/category/save', function (req, res, next) {
    http.post('/cms/categorys', helper.paramJson(req.body), function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 按分类查询文章
 */
router.use('/categorys/:categoryCode/articles', function (req, res, next) {
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
    http.get('/cms/categorys/'+req.params.categoryCode+'/articles', params, function (_res) {
        _res.on('complete', function (data) {
            res.render('partials/article_index', {pager: data});
        });
    });
});
/**
 * 编辑分类
 */
router.get('/category/edit', function (req, res, next) {
    http.get('/cms/categorys/'+req.query.category,  function (_res) {
        _res.on('complete', function (data) {
            res.render('cms/category_edit', {category: data});
        });
    });
});
/**
 * 删除分类
 */
router.post('/category/delete', function (req, res, next) {
    http.delete('/cms/categorys/'+req.body.ids, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

module.exports = router;