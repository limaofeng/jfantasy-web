var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('./lib/http-utils-defult');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.partials = {};
var fs = require('fs');
fs.readdir(__dirname + '/views/layout', function (err, fileNames) {
    fileNames.forEach(function (name) {
        hbs.partials[name.replace(/\.hbs$/, '')] = hbs.compile(fs.readFileSync(__dirname + '/views/layout/' + name, 'utf8'));
    });
});
hbs.registerHelper(require('./lib/hbs-helper.js'));
hbs.registerHelper(require('handlebars-layouts')(hbs));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '1234567890QWERTY',
    name: 'sessionid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function (req, res, next) {
    res.locals.session = req.session;
    req.session.user = {nickName: "系统管理员"};
    res.locals.wrapper = req.header('X-Requested-With') == 'XMLHttpRequest' ? 'empty' : 'base';
    if (!req.session.treeMenus) {
        http.get('/system/websites/haolue/menus', function (error,_res,data) {
            var treeMenus = [];
            data.forEach(function (v) {
                if (v.layer == 1) {
                    treeMenus.push(v);
                } else {
                    data.forEach(function (_v) {
                        if (_v.id == v.parentId) {
                            if (!_v.children) {
                                _v.children = [];
                            }
                            _v.children.push(v);
                        }
                    });
                }
            });
            req.session.treeMenus = treeMenus;
            next();
        });
    } else {
        next();
    }
});

app.use('/', require('./routes/index'));// 首页
app.use('/users', require('./routes/users'));// 用户
app.use('/security', require('./routes/security'));// 用户 & 角色
app.use('/mall', require('./routes/mall'));// 品牌 & 商品
app.use('/system', require('./routes/system'));// 网站 & 地区 & 数据字典
app.use('/delivery',require('./routes/delivery'));// 物流
app.use('/sms',require('./routes/sms'));// 短信验证配置
app.use('/members', require('./routes/members'));// 会员
app.use('/areas', require('./routes/areas'));// 地区
app.use('/cms', require('./routes/cms'));// 文章 & 广告位
app.use('/weixin', require('./routes/weixin'));// 微信

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
