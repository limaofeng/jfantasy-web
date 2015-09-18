var express = require('express');
var http = require('./../lib/http-utils-defult');
//var http = require('./../lib/http-utils')({
//    hostname: '192.168.0.106',
//    port: 8080,
//    headers: {
//        'Authorization': 'Basic YWRtaW46MTIzNDU2'
//    }
//});
var router = express.Router();

router.get('/menus', function (req, res, next) {
    http.get('/security/menus', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/menus', {title: 'Express', temp: 'base', menus: JSON.stringify(data)});
        });
    });
});

router.post('/menus/delete', function (req, res, next) {
    http.delete('/security/menus/' + req.param('id'), function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/menus/save', function (req, res, next) {
    if (!!req.body.id) {
        http.put('/security/menus/' + req.body.id, req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    } else {
        http.post('/security/menus', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }
});
//用户列表查询
router.get('/users', function (req, res, next) {
    http.get('/security/users', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/users', {pager: data});
        });
    });
});
//用户添加
router.get('/users/add', function (req, res, next) {
    http.get('/security/users', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/users_add');
        });
    });
});


router.post('/users/search', function (req, res, next) {
    http.get('/security/users', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

router.post('/users/save', function (req, res, next) {
     http.post('/security/users', req.body, function (_res) {
            _res.on('complete', function (data) {
                console.log(data)
                res.json(data);
            });
        });
});

/**
 * 编辑
 */
router.get('/users/edit', function (req, res, next) {
    http.get('/security/users/'+req.query.category,  function (_res) {
        _res.on('complete', function (data) {
            res.render('security/users_edit', {category: data});
        });
    });
});
/**
 * 删除
 */
router.post('/users/delete', function (req, res, next) {
    http.delete('/security/users/'+req.body.ids, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

module.exports = router;