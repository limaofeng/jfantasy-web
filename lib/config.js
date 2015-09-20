//module.exports={
//    http:{
//        serverPath:'http://192.168.1.66:8080',
//        authUser:{
//            username:'admin',
//            password:'123456'
//        }
//    }
//};
var config={
    default:{
        http:{
            serverPath:process.env['HTTP_SERVER_PATH'],
            authUser:{
                username:'admin',
                password:'123456'
            }
        }
    },
    local:{
        http:{
            serverPath:'http://127.0.0.1:8080',
            authUser:{
                username:'admin',
                password:'123456'
            }
        }
    },
    115:{
        http:{
            serverPath:'http://admin.snzxw.com.cn/',
            authUser:{
                username:'admin',
                password:'123456'
            }
        }
    },  lmf:{
        http:{
            serverPath:'http://192.168.0.112:8080',
            authUser:{
                username:'admin',
                password:'123456'
            }
        }
    }
}

module.exports=(function(){
    if(!!config[process.env['PROJECT_TYPE']]) return config[process.env['PROJECT_TYPE']];
    return config.default;
})();