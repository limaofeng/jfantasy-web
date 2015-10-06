var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();

router.get('/menus', function (req, res, next) {
    http.get('/security/menus?limit=0,1000', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/menus', {title: 'Express', temp: 'base', menus: data});
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
    console.log(req.body);
    if (!!req.body.id) {
        http.put('/security/menus/' + req.body.id, req.body, function (error,_res,data) {
                res.json(data);
        });
    } else {
        http.post('/security/menus', req.body, function (error,_res,data) {
                res.json(data);
        });
    }
});


//hl---------------------------------------------------------------------
router.get('/users', function (req, res, next) {
    http.get({
        path: '/security/users',
        headers: {'X-Page-Fields': true}
    }, function (error, _res, data) {
        res.render('security/users', {pager: data});
    });
});

//用户查询
router.get('/users/search', function (req, res, next) {
    http.get({
        path: '/security/users',
        headers: {'X-Page-Fields': true}
    }, req.query,function (error, _res, data) {
        res.json(data);
    });
});
//用户新增
router.get('/users/add', function (req, res, next) {
    async.parallel({
        roles: function (callback) {
            http.get('/security/roles?limit=0,10', function (error,_res,data) {
                    callback(null, data);
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
router.get('/users/:id/edit', function (req, res, next) {
    async.parallel({
        roles: function (callback) {
            http.get('/security/roles', function (error,_res,data) {
                callback(null, data);
            });
        },
        websites: function (callback) {
            http.get('/system/websites', function (error,_res,data) {
                callback(null, data);
            });
        },
        user: function (callback) {
            http.get({
                path: '/security/users/' + req.params.id,
                headers: {'X-Expend-Fields': 'roles,website'}
            }, function (error,_res,data) {
                    callback(null, data);
            });
        }
    }, function (err, results) {
        res.render('security/users_edit', results);
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

//hl-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//角色列表
router.get('/roles', function (req, res, next) {
    http.get('/security/roles', function (_res) {
        _res.on('complete', function (data) {
            res.render('security/roles', {pager: data});
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
            res.render('security/roles_edit',{role: data});
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
    http.get('/security/roles', req.body, function (error,_res,data) {
        res.json(data);
    });
});
//角色删除
router.post('/roles/delete', function (req, res, next) {
    var codes = req.body.codes;
    codes = codes instanceof Array ? codes : [codes];
    http.delete('/security/roles',codes, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//hl--------------------------------------------------------------------------------------------/
//资源相关列表
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
//资源保存
router.post('/resources/save', function (req, res, next) {
    if(!!req.body.id) {
        http.post('/security/resources', req.body.id,req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }else{
        http.post('/security/resources', req.body, function (_res) {
            _res.on('complete', function (data) {
                res.json(data);
            });
        });
    }
});


//资源查询
router.post('/resources/search', function (req, res, next) {
    http.get('/security/resources', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//资源编辑
router.get('/resources/:id/edit', function (req, res, next) {
    http.get('/security/resources/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.render('security/resources_edit', {resource: data});
        });
    });
});
//删除
router.post('/resources/delete', function (req, res, next) {
    var ids = req.body.ids;
    ids = ids instanceof Array ? ids : [ids];
    http.delete('/security/resources',ids, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
//-------------------------------------------------------------------------------------------------------------------
module.exports = router;