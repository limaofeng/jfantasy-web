var helper={
    string:function(d){
        return !!d?JSON.stringify(d):'{}';
    },
    isIndexOf:function(value,test,options){
        if(value.indexOf(test)>=0){
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    is: function (value, test, options) {
        if (value === test) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    compare: function(left, operator, right, options) {
        /*jshint eqeqeq: false*/

        if (arguments.length < 3) {
            throw new Error('Handlebars Helper "compare" needs 2 parameters');
        }

        if (options === undefined) {
            options = right;
            right = operator;
            operator = '===';
        }

        var operators = {
            '==':     function(l, r) {return l == r; },
            '===':    function(l, r) {return l === r; },
            '!=':     function(l, r) {return l != r; },
            '!==':    function(l, r) {return l !== r; },
            '<':      function(l, r) {return l < r; },
            '>':      function(l, r) {return l > r; },
            '<=':     function(l, r) {return l <= r; },
            '>=':     function(l, r) {return l >= r; },
            'typeof': function(l, r) {return typeof l == r; }
        };

        if (!operators[operator]) {
            throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
        }

        var result = operators[operator](left, right);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    env:function(d){
        return process.env[d];
    },
    defaultvalue:function(d,el){
        if(!!d) return d;
        return el;
    },
    'for':function(index){
        var str="";
        for(var i=0;i<index;i++){
            str+=arguments[arguments.length-1].fn(i);
        }
        return str;
    },
    dict:function(value,dict){
        if(value == null){
            return '';
        }
        return eval('(' + dict + ')')[isNaN(value.toString()) ? value:parseInt(value)];
    },
    ages:function(date){
        if(date=="")
            return "0";
        return (new Date().getFullYear()- new Date(date).getFullYear())+1;
    },
    addZeroLeft:function(value,resultLength){
        var result = value.toString();
        if(result.length < resultLength) {
            var i = result.length;
            while(i++ < resultLength) {
                result = "0" + result;
                if(result.length == resultLength)
                    break;
            }
        }
        return result;
    },
    replaceAll: function (value,raRegExp, replaceText) {
        if (typeof raRegExp == "undefined" || raRegExp == null)
            return;
        if (!( raRegExp instanceof RegExp))
            raRegExp = new RegExp(raRegExp, "g");
        return value.replace(raRegExp, replaceText);
    },
    findDictByType:function(type,code){
        var getType=function(type,code){
            var json = helper.dataDict[type]
            if(!code) return json;
            for(var i=0;i<json.length;i++){
                if(code == json[i].code) return json[i];
            }
            return {};
        };
        if(!helper.dataDict){
            var fs = require('fs');
            var data=fs.readFileSync(__dirname+"/../public/js/data-dict.json");
            data = JSON.parse(data);
            var dataDict={};
            for(var i=0;i<data.length;i++){
                if(!dataDict[data[i].type]) dataDict[data[i].type]=[];
                dataDict[data[i].type].push(data[i]);
            }
            helper.dataDict=dataDict;
        }
        return getType(type,code).name;
    },
    date:function(date,formatter){
        if(!date) return;
        var chineseWeekNames = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        /**
         * 提取日期的年月日时分秒
         * @param {Object} d
         * @param {Object} isZero
         */
        var splitDate = function(d, isZero){
            var yyyy, MM, dd, hh, HH, mm, ss, ms;
            if (isZero) {
                yyyy = d.getFullYear();
                MM = helper.addZeroLeft(String(d.getMonth() + 1), 2);
                dd = helper.addZeroLeft(String(d.getDate()), 2);
                HH = helper.addZeroLeft(String(d.getHours()), 2);
                hh = parseInt(HH) > 12 ? helper.addZeroLeft(String(parseInt(HH)-12), 2) : HH;
                mm = helper.addZeroLeft(String(d.getMinutes()), 2);
                ss = helper.addZeroLeft(String(d.getSeconds()), 2);
                ms = helper.addZeroLeft(String(d.getMilliseconds()), 3);
            } else {
                yyyy = d.getFullYear();
                MM = d.getMonth() + 1;
                dd = d.getDate();
                HH = d.getHours();
                hh = HH > 12 ? HH-12 : HH;
                mm = d.getMinutes();
                ss = d.getSeconds();
                ms = d.getMilliseconds();
            }
            return {
                'yyyy': yyyy,
                'MM': MM,
                'dd': dd,
                'HH': HH,
                'hh': hh,
                'mm': mm,
                'ss': ss,
                'ms': ms,
                'cw': chineseWeekNames[d.getDay()]
            };
        };
        if (!formatter) {
            formatter = 'yyyy-MM-dd HH:mm:ss';
        }
        date = new Date(date);
        var dateObject = splitDate(date, true);
        var formatters = ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss', 'ms', 'cw'];
        for(var i=0;i<formatters.length;i++){

            formatter =  helper.replaceAll(formatter,formatters[i], dateObject[formatters[i]])
        }
        return formatter.indexOf('yy') > -1 ? helper.replaceAll(formatter,'yy', dateObject['yyyy'].toString().substr(2, 2)) : formatter;
    },
    delHtmlTag:function(str){
        if(!str) return '';
        return str.replace(/<[^>]+>/g,"");
    },
    paramJson: function (params) {
        var _t = /\[(\d+)\]$/
        for (var p in params) {
            var obj = params;
            var setParams = function (v, i, array) {
                var _isarray, name, index;
                if (_isarray = _t.test(v)) {// is Array
                    index = _t.exec(v)[1];
                    name = v.substr(0, v.length - index.length - 2);
                } else {
                    name = v;
                }
                if(array.length == i + 1 && !_isarray){
                    obj[name] = params[p];
                }
                if (_isarray) {
                    obj = !obj[name] ? obj[name] = [] : obj[name];
                    if(array.length != i + 1){
                        obj = !obj[parseInt(index)] ? obj[parseInt(index)] = {} : obj[parseInt(index)];
                    }else{
                        obj[parseInt(index)] = params[p];
                    }
                } else {
                    obj = obj[name] == null ? obj[name] = {} : obj[name];
                }
            };
            if (p.indexOf('.') != -1) {
                p.split('.').forEach(setParams);
                delete params[p];
            }else if(_t.test(p)){
                setParams(p,0,[p]);
                delete params[p];
            }
        }
        return params;
    }
}
module.exports=helper;