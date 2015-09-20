var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();
//品牌列表
router.get('/brands', function (req, res, next) {
    http.get('/mall/brands', function (_res) {
        _res.on('complete', function (data) {
            res.render('mall/brands', {pager: data});
        });
    });
});
//修改页面跳转
router.get('/brands/:id/edit', function (req, res, next) {
    async.parallel({
        //查询分类数据
        categorys: function (callback) {
            http.get('/mall/categorys', function (_res) {
                _res.on('complete', function (data) {
                    callback(null, data);
                });
            });
        },
        //查询品牌数据
        brand: function (callback) {
            http.get('/mall/brands/'+req.params.id, function (_res) {
                _res.on('complete', function (data) {
                    callback(null, data);
                });
            });
        }
    }, function (err, results) {
        res.render('mall/brands_edit', results);
    });


});







//新增页面跳转
router.get('/brands/add', function (req, res, next) {
    //请求品牌分类数据
    http.get('/mall/categorys', function (_res) {
        _res.on('complete', function (data) {
            res.render('mall/brands_add',{"categorys":data});
        });
    });

});
//保存
router.post('/brands/save', function (req, res, next) {
    http.post('/mall/brands', req.body, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

//品牌查询
router.post('/brands/search', function (req, res, next) {
    http.get('/mall/brands',function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

//删除
router.post('/brands/delete', function (req, res, next) {
    var ids = req.body.ids;
    ids = ids instanceof Array ? ids : [ids];
    http.delete('/mall/brands',ids, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//-------------------------------------------------------------------------------------------------------------------
module.exports = router;