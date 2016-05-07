var React = require('react');
var MaskActions = require('../actions/MaskActions');
var MaskStore = require('../stores/MaskStore');

var Login = React.createClass({
    handleClick:function(status){
        $('.masking-container > div').removeClass('animated fadeInDown').addClass('animated fadeOutUp').delay(1000,'mx').queue('mx', () => MaskActions.switch(status)).dequeue('mx');
        if(!status){
            $('.masking-container').delay(1000).hide(0).prevAll('div').removeClass('masking').addClass('unmasking');
        }
    },
    render: function () {
        return (
                <div className="login-container animated fadeInDown">
                    <div className="loginbox bg-white">
                        <div className="loginbox-title"> 登 录</div>
                        <div className="loginbox-social">
                            <div className="social-title ">连接你的社交账户</div>
                            <div className="social-buttons">
                                <a href="" className="button-facebook">
                                    <i className="social-icon fa fa-facebook"/>
                                </a>
                                <a href="" className="button-twitter">
                                    <i className="social-icon fa fa-twitter"/>
                                </a>
                                <a href="" className="button-google">
                                    <i className="social-icon fa fa-google-plus"/>
                                </a>
                            </div>
                        </div>
                        <div className="loginbox-or">
                            <div className="or-line"></div>
                            <div className="or">OR</div>
                        </div>
                        <div className="loginbox-textbox">
                            <input type="text" className="form-control" placeholder="Email"/>
                        </div>
                        <div className="loginbox-textbox">
                            <input type="text" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="loginbox-forgot">
                            <a href="">忘记密码?</a>
                        </div>
                        <div className="loginbox-submit">
                            <input type="button" onclick="unlogin()" className="btn btn-primary btn-block" value="登录"/>
                        </div>
                        <div className="loginbox-signup">
                            <a onClick={this.handleClick.bind(this, 3)}>使用 Email 注册</a>
                        </div>
                    </div>
                    <div className="logobox">
                    </div>
                </div>
        );
    }
});
var Lock = React.createClass({
    handleClick:function(status){
        console.log('status = ' + status);//
        $('.masking-container > div').removeClass('animated fadeInDown').addClass('animated fadeOutUp').delay(1000,'mx').queue('mx',()=> MaskActions.switch(status)).dequeue('mx');
        if(!status){
            $('.masking-container').delay(1000).hide(0).prevAll('div').removeClass('masking').addClass('unmasking');
        }
    },
    render: function () {
        return (
            <div className="lock-container animated fadeInDown">
                <div className="lock-box text-align-center">
                    <div className="lock-username">DIVYIA PHILLIPS</div>
                    <img src="assets/img/avatars/divyia.jpg" alt="divyia avatar"/>
                    <div className="lock-password">
                        <form role="form" className="form-inline" action="index.html">
                            <div className="form-group">
                        <span className="input-icon icon-right">
                            <input className="form-control" placeholder="Password" type="password"/>
                                <i className="glyphicon glyphicon-log-in themeprimary" onClick={this.handleClick.bind(this, 0)}/>
                        </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="signinbox">
                    <span>切换其他用户登录?</span>
                    <a onClick={this.handleClick.bind(this, 2)}>去登录</a>
                </div>
            </div>
        )
    }
});
var Register = React.createClass({
    handleClick:function(status){
        console.log('status = ' + status);
        $('.masking-container > div').removeClass('animated fadeInDown').addClass('animated fadeOutUp').delay(1000,'mx').queue('mx',function () {
            console.log(status);
            MaskActions.switch(status);
        }).dequeue('mx');
        if(!status){
            $('.masking-container').delay(1000).hide(0).prevAll('div').removeClass('mao').addClass('rmao');
        }
    },
    render: function () {
        return (
            <div className="register-container animated fadeInDown">
                <div className="registerbox bg-white">
                    <div className="registerbox-title">注册</div>

                    <div className="registerbox-caption ">请填写您的信息</div>
                    <div className="registerbox-textbox">
                        <input type="text" className="form-control" placeholder="Username" />
                    </div>
                    <div className="registerbox-textbox">
                        <input type="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <div className="registerbox-textbox">
                        <input type="password" className="form-control" placeholder="Confirm Password" />
                    </div>
                    <hr className="wide" />
                    <div className="registerbox-textbox">
                        <input type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="registerbox-textbox">
                        <input type="text" className="form-control" placeholder="Family" />
                    </div>
                    <div className="registerbox-textbox">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-xs-6 padding-right-10">
                                <input type="text" className="form-control" placeholder="Month" />
                            </div>
                            <div className="col-lg-3 col-sm-3 col-xs-3 no-padding padding-right-10">
                                <input type="text" className="form-control" placeholder="Day" />
                            </div>
                            <div className="col-lg-3 col-sm-3 col-xs-3 no-padding-left">
                                <input type="text" className="form-control" placeholder="Year" />
                            </div>
                        </div>
                    </div>
                    <div className="registerbox-textbox no-padding-bottom">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" className="colored-primary" checked="checked"/>
                                    <span className="text darkgray">I agree to the Company <a className="themeprimary">Terms of Service</a> and Privacy Policy</span>
                            </label>
                        </div>
                    </div>
                    <div className="registerbox-submit">
                        <input type="button" onclick="unregister()" className="btn btn-primary pull-right" value="提交"/>
                    </div>
                </div>
                <div className="logobox">
                </div>
            </div>
        )
    }
});


var Mask = React.createClass({
    getInitialState: function () {
        return MaskStore.get();
    },
    componentDidMount: function() {
        MaskStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MaskStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(MaskStore.get());
    },
    componentDidUpdate: function () {
        if(this.state.status) {
            window.requestAnimationFrame(()=> $('.masking-container').prevAll('.main-container,.navbar').removeClass('unmasking').addClass('masking'));
        }else{
            window.requestAnimationFrame(()=> $('.masking-container').prevAll('.main-container,.navbar').removeClass('masking').addClass('unmasking'));
        }
    },
    render: function () {
        var content = null;
        switch(this.state.status){
            case 0:break;
            case 1:
                content=<Lock/>;
                break;
            case 2:
                content=<Login/>;
                break;
            case 3:
                content=<Register/>;
                break;
        }
        console.log(content);
        if(!!content) {
            content = <div className="masking-container">{content}</div>
        }
        return (content)
    }
});


module.exports = Mask;