var express = require('express');
var http = require('./../lib/http-utils-defult');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/tabs', function (req, res, next) {
    res.render('tabs');
});

router.get('/dashboard',function(req, res, next){
    res.render('dashboard');
})

/**
 * 获取某类的数据字典
 */
router.post('/system/ddts/:type/dds', function (req, res, next) {
    http.get('/system/ddts/'+req.params.type+'/dds', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 获取具体某个数据字典
 */
router.post('/system/dds/:key', function (req, res, next) {
    http.get('/system/dds/'+req.params.key, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 检查用户名是否存在
 */
router.get('/check/username/:username', function (req, res, next) {
    http.get('/users/'+req.params.username, function (_res) {
        _res.on('complete', function (data) {
            res.json(data && data.id ? true : false);
        });
    });
});
module.exports = router;
