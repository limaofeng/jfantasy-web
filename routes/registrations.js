/**
 * 挂号
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var router = express.Router();
var async = require('async');

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    var doctorId = req.query.doctorId;
    var url = doctorId ? '/doctors/'+doctorId+'/registrations' : '/registrations';
    http.get(url, function (_res) {
        _res.on('complete', function (data) {
            var params = {pager: JSON.stringify(data)};
            if(!!doctorId){
                var doctor = {};
                if(data.pageItems.length>0){
                    doctor.name = data.pageItems[0].doctorName;
                }

                doctor.id = doctorId;
                params.doctor = doctor;
            }
            res.render('registrations/index', params);
        });
    });
});
/**
 * 查询
 */
router.post('/search', function (req, res, next) {
    var params = {};
    for(var key in req.body){
        if(!req.body[key]){
            continue;
        }
        params[key] = req.body[key];
    }
    http.get('/registrations', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data);
        });
    });
});


/**
 * 挂号单详情页面
 */
router.get('/:id', function (req, res, next) {
    http.get('/registrations/' + req.params.id, function (_res) {
        _res.on('complete', function (data) {
            res.render('registrations/view', {registration: data});
        });
    });
});
module.exports = router;
