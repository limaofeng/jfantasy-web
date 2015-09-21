var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

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
//用户新增
router.get('/users/add', function (req, res, next) {
    async.parallel({
        roles: function (callback) {
            http.get('/security/roles', function (_res) {
                _res.on('complete', function (data) {
                    callback(null, data.pageItems);
                });
            });
        },
        websites: function (callback) {
            http.get('/system/websites', function (_res) {
                _res.on('complete', function (data) {
                    callback(null, data);
                });
            });
        }
    }, function (err, results) {
        res.render('security/users_add', results);
    });


});
//用户修改
router.get('/users/edit', function (req, res, next) {
    http.get('/security/roles', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/users_edit', {roles: data.pageItems});
        });
    });
    http.get('/security/roles', function (_res) {
        _res.on('complete', function (data) {
        });
    });
});
//角色列表
router.get('/roles', function (req, res, next) {
    http.get('/security/roles', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/roles', {pager: data});
        });
    });
});
//角色查询
router.post('/users/search', function (req, res, next) {
    http.get('/security/users', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});


//用户保存
router.post('/users/save', function (req, res, next) {
    http.post('/security/users', req.body, function (_res) {
        _res.on('complete', function (data) {
            console.log(data)
            res.json(data);
        });
    });
});
//用户删除
router.post('/users/:id/delete', function (req, res, next) {
    http.delete('/security/users/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
            console.log(data);
        });
    });
});


//角色添加跳转页面
router.get('/roles/add', function (req, res, next) {
    res.render('security/roles_add');
});
//角色编辑
router.get('/roles/:code/edit', function (req, res, next) {
    http.get('/security/roles/' + req.params.code, function (_res) {
        _res.on('complete', function (data) {
            res.render('security/roles_edit', {role: data});
            console.log(data);
        });
    });
});
//角色保存
router.post('/roles/save', function (req, res, next) {
    if(!!req.body.code) {
        http.put('/security/roles/'+req.body.code, req.body, function (_res) {
            _res.on('complete', function (data) {
                console.log(data)
                res.json(data);
            });
        });
    }else{
        http.post('/security/roles', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }
});
//角色查询
router.post('/roles/search', function (req, res, next) {
    http.get('/security/roles', req.params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//角色删除
router.post('/roles/delete', function (req, res, next) {
    console.log(req.body.codes)
    http.delete('/security/roles', req.body.codes, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});

//资源相关
router.get('/resources', function (req, res, next) {
    http.get('/security/resources', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/resources', {pager: data});
        });
    });
});

//资源添加跳转页面
router.get('/resources/add', function (req, res, next) {
    res.render('security/resources_add');
});
//保存
router.post('/resources/save', function (req, res, next) {
    http.post('/security/resources', req.body, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//查询
router.post('/resources/search', function (req, res, next) {
    http.get('/security/resources', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//编辑
router.get('/resources/:id/edit', function (req, res, next) {
    http.get('/security/resources/' + req.params.code, function (_res) {
        _res.on('complete', function (data) {
            res.render('security/resources_edit', {resource: data});
        });
    });
});
module.exports = router;