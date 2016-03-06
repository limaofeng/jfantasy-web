var express = require('express');
var http = require('./../lib/http-client-defult');
var router = express.Router();

router.get('/paytest', function (req, res, next) {
    http.post('/pays', {
        "orderSn": "T00000002",
        "orderType": "test",
        "parameters": {
            "backUrl": "http://192.168.0.2:3000/payret"
        },
        "payType": "web",
        "payconfigId": 2,
        "payer": "limaofeng"
    }, function (error, _res, data) {
        res.render('pay', data);
    });
});

router.post('/payret', function (req, res, next) {
    console.log(req.body);
});

router.get('/paynotify', function (req, res, next) {
    var data = {
        "OrderStatus": "0000",
        "BankInstNo": "700000000000004",
        "BusiType": "0001",
        "TranType": "0001",
        "CompleteTime": "195631",
        "CompleteDate": "20160123",
        "CurryNo": "CNY",
        "AcqSeqId": "0000000007383001",
        "MerId": "739211601120001",
        "MerOrderNo": "P2016012300045",
        "Version": "20140728",
        "TranTime": "195624",
        "Signature": "Jk2ispuAtt4Swn460gB9jB5Cw+36A9KlGvGf0fyWVovNWPt62ZEyUxeHyEuBkNcs0a7hN8dOvS7dvDwA6SMKlIAOITxiZAa/WWdnUbTWo0nbdv6U3B2bIzlMgn9K6PTlG55bV0iJ2dUdhH8b5HZvfGyIP+tUk346J/XE0+Jbcv4=",
        "TranDate": "20160123",
        "OrderAmt": "1",
        "AcqDate": "20160123"
    };
    http.post({
        path: '/pays/P2016012300045/notify',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    }, data, function (error, _res, data) {
        console.log(data);
    });
});

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/tabs', function (req, res, next) {
    res.render('tabs');
});

router.get('/dashboard', function (req, res, next) {
    res.render('dashboard');
})

/**
 * 获取某类的数据字典
 */
router.post('/system/ddts/:type/dds', function (req, res, next) {
    http.get('/system/ddts/' + req.params.type + '/dds', function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 获取具体某个数据字典
 */
router.post('/system/dds/:key', function (req, res, next) {
    http.get('/system/dds/' + req.params.key, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});
/**
 * 检查用户名是否存在
 */
router.get('/check/username/:username', function (req, res, next) {
    http.get('/users/' + req.params.username, function (_res) {
        _res.on('complete', function (data) {
            res.json(data && data.id ? true : false);
        });
    });
});
module.exports = router;
