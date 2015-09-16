/**
 * 区域
 */
var express = require('express');
var http = require('./../lib/http-utils-defult');
var router = express.Router();
var async = require('async');

/**
 * 查询
 */
router.use('/search', function (req, res, next) {
    var content = {};
    if(req.method=="POST"){
        content = req.body;
    }else{
        content = req.query;
    }
    var params = {};
    for(var key in content){
        if(!content[key]){
            continue;
        }
        params[key] = content[key];
    }
    http.get('/common/areas', params, function (_res) {
        _res.on('complete', function (data) {
            res.json(data.pageItems);
        });
    });
});

module.exports = router;