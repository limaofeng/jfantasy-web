//module.exports={
//    http:{
//        serverPath:'http://192.168.1.66:8080',
//        authUser:{
//            username:'admin',
//            password:'123456'
//        }
//    }
//};
var config = {
    default: {
        http: {
            serverPath: 'http://api.zbsg.com.cn'
        }
    },
    local: {
        http: {
            serverPath: 'http://api.zbsg.com.cn'
        }
    },
    115: {
        http: {
            serverPath: 'http://admin.snzxw.com.cn/'
        }
    }
};

module.exports = (function () {
    if (!!config[process.env['PROJECT_TYPE']]) return config[process.env['PROJECT_TYPE']];
    return config.default;
})();