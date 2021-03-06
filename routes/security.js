var express = require('express');
var http = require('./../lib/http-utils-defult');
var async = require('async');

var router = express.Router();

router.get('/menus', function (req, res) {
    http.get('/security/menus?limit=0,1000', function (error,_res,data) {
        res.render('security/menus', {title: 'Express', temp: 'base', menus: data});
    });
});

router.post('/menus/delete', function (req, res) {
    http.delete('/security/menus/' + req.param('id'), function (error,_res,data) {
        res.json(data);
    });
});

router.post('/menus/save', function (req, res) {
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
router.get('/users', function (req, res) {
    http.get({path: '/security/users', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        }else{
            res.render('security/users', {pager: data});
        }
    });
});

//用户新增
router.get('/users/add', function (req, res) {
    async.parallel({
        roles: function (callback) {
            http.get('/security/roles?limit=0,10', function (error,_res,data) {
                callback(null, data);
            });
        },
        websites: function (callback) {
            http.get('/system/websites', function (error,_res,data) {
                callback(null, data);
            });
        }
    }, function (err, results) {
        res.render('security/users_add', results);
    });


});
//用户修改
router.get('/users/:id/edit', function (req, res) {
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
            http.get({path: '/security/users/' + req.params.id,headers: {'X-Expend-Fields': 'roles,website'}}, function (error,_res,data) {
                callback(null, data);
            });
        }
    }, function (err, results) {
        res.render('security/users_edit', results);
    });
});
//用户保存
router.post('/users/save', function (req, res) {
    if(!!req.body.id){
        http.put('/security/users/'+req.body.id, req.body, function (error,_res,data) {
            res.json(data);
        });
    }else{
        http.post('/security/users', req.body, function (error,_res,data) {
            res.json(data);
        });
    }
});
//用户删除
router.post('/users/:id/delete', function (req, res) {
    http.delete('/security/users/' + req.params.id, function (error,_res,data) {
        res.json(data);
    });
});

//hl-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//角色列表
router.get('/roles', function (req, res) {
    http.get({path: '/security/roles', headers: {'X-Page-Fields': true}}, req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        }else{
            res.render('security/roles', {pager: data});
        }
    });
});
//角色添加跳转页面
router.get('/roles/add', function (req, res) {
    res.render('security/roles_add');
});

//角色编辑
router.get('/roles/:code/edit', function (req, res) {
    http.get('/security/roles/' + req.params.code, function (error,_res,data) {
        res.render('security/roles_edit',{role: data});
    });
});
//角色保存
router.post('/roles/save', function (req, res) {
    if(!!req.body.code) {
        http.put('/security/roles/'+req.body.code, req.body, function (error,_res,data) {
            res.json(data);
        });
    }else{
        http.post('/security/roles', req.body, function (error,_res,data) {
            res.json(data);
        });
    }
});
//角色删除
router.post('/roles/delete', function (req, res) {
    var codes = req.body.codes;
    codes = codes instanceof Array ? codes : [codes];
    http.delete('/security/roles',codes, function (error,_res,data) {
        res.json(data);
    });
});
//hl--------------------------------------------------------------------------------------------/
//资源相关列表
router.get('/resources', function (req, res) {
    http.get({path:'/security/resources', headers: {'X-Page-Fields': true}},req.query, function (error, _res, data) {
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.json(data);
        }else{
            res.render('security/resources', {pager: data});
        }
    });
});

//资源添加跳转页面
router.get('/resources/add', function (req, res) {
    res.render('security/resources_add');
});
//资源保存
router.post('/resources/save', function (req, res) {
    if(!!req.body.id) {
        http.put('/security/resources/'+req.body.id,req.body, function (error, _res, data) {
            res.json(data);
        });
    }else{
        http.post('/security/resources', req.body, function (error, _res, data) {
            res.json(data);
        });
    }
});



//资源编辑
router.get('/resources/:id/edit', function (req, res) {
    http.get('/security/resources/' + req.params.id, function (error, _res, data) {
        res.render('security/resources_edit', {resource: data});
    });
});

//删除
router.post('/resources/delete', function (req, res) {
    var ids = req.body.ids;
    ids = ids instanceof Array ? ids : [ids];
    http.delete('/security/resources',ids, function (error, _res, data) {
        res.json(data);
    });
});
//-------------------------------------------------------------------------------------------------------------------
module.exports = router;