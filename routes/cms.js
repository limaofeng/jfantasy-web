var express = require('express');
var http = require('./../lib/http-client-defult');
var helper = require('./../lib/hbs-helper');
var router = express.Router();
var async = require('async');
var fs = require('fs');

var _viewdir = __dirname.substr(0, __dirname.indexOf('routes') - 1);

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    http.get('/cms/categorys', function (error, _res, data) {
        res.render('cms/index', {categorys: data});
    });
});

/**
 * 按分类查询文章
 */
router.get('/categorys/:code/articles', function (req, res, next) {
    async.parallel({
        category: function (callback) {
            http.get('/cms/categorys/' + req.params.code, function (error, _res, data) {
                callback(error, data);
            });
        },
        pager: function (callback) {
            http.get({
                path: '/cms/categorys/' + req.params.code + '/articles',
                headers: {'X-Page-Fields': true}
            }, {}, function (error, _res, data) {
                callback(error, data);
            });
        }
    }, function (errors, result) {
        var codes, num, articles_path = result.category.path.replace(/[,/]$/, '').replace(/[,/]/g, '_');
        while (!fs.existsSync(_viewdir + '/views/cms/articles_' + articles_path + '.hbs')) {
            if (!codes) {
                codes = articles_path.split('_');
                num = codes.length - 1;
            }
            if (num == 0) {
                break;
            }
            articles_path = articles_path.replace(new RegExp('_' + codes[num--] + '$'), '');
        }
        res.render((function (path) {
            if (!!fs.existsSync(_viewdir + '/views/' + path + '.hbs')) {
                return path;
            } else {
                return 'cms/articles';
            }
            return path;
        }('cms/articles_' + articles_path)), result);
    });
});

router.get('/articles', function (req, res, next) {
    http.get({
        path: '/cms/articles',
        headers: {'X-Page-Fields': true}
    }, req.query, function (error, _res, data) {
        res.json(data);
    });
});

/**
 * 新增分类
 */
router.get('/categorys/add', function (req, res, next) {
    var categoryCode = req.query.categoryCode;
    http.get('/cms/categorys/' + categoryCode, function (_res) {
        _res.on('complete', function (data) {
            res.render('cms/category_add', {category: data});
        });
    });
});
/**
 * 保存分类
 */
router.post('/categorys/save', function (req, res, next) {
    http.post('/cms/categorys', helper.paramJson(req.body), function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 编辑分类
 */
router.get('/categorys/:code/edit', function (req, res, next) {
    http.get('/cms/categorys/' + req.params.category, function (_res) {
        _res.on('complete', function (data) {
            res.render('cms/category_edit', {category: data});
        });
    });
});
/**
 * 删除分类
 */
router.post('/category/delete', function (req, res, next) {
    http.delete('/cms/categorys/' + req.body.ids, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 新增文章
 */
router.get('/articles/add', function (req, res, next) {
    res.render('cms/articles_add', {category: {code:req.query.code}});
});
/**
 * 编辑文章
 */
router.get('/articles/:id/edit', function (req, res, next) {
    http.get('/cms/articles/' + req.params.id, function (error,_res,data) {
        res.render('cms/articles_edit', {article:data});
    });
});
/**
 * 列表
 */
router.get('/banners',function (req, res, next) {
    http.get({
        path: '/cms/banners',
        headers: {'X-Page-Fields': true}
    }, function (error, _res, data) {
        res.render('cms/banners', {pager: data});
    });
});
/**
 * 新增
 */
router.get('/banners/add',function (req, res, next) {
    res.render('cms/banners_add');
});
/**
 * 修改
 */
router.get('/banners/:key/edit',function (req, res, next) {
    http.get('/cms/banners/' + req.params.key, function (error,_res,data) {
        res.render('cms/banners_edit', {banner:data});
    });
});

module.exports = router;