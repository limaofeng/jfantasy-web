var React = require('react');
var ReactDOM = require('react-dom');

var NavbarBrand = require('./components/NavbarBrand');

var SideBar = React.createClass({
    handleClick: function (e) {
        var b = $("#sidebar").hasClass("menu-compact");
        if (!$('#sidebar').is(':visible'))
            $("#sidebar").toggleClass("hide");
        $("#sidebar").toggleClass("menu-compact");
        $(".sidebar-collapse").toggleClass("active");
        b = $("#sidebar").hasClass("menu-compact");

        if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
            $(".sidebar-menu").slimScroll({destroy: true});
            $(".sidebar-menu").attr('style', '');
        }
        if (b) {
            $(".open > .submenu").removeClass("open");
        } else {
            if ($('.page-sidebar').hasClass('sidebar-fixed')) {
                var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                $('.sidebar-menu').slimscroll({
                    height: 'auto',
                    position: position,
                    size: '3px',
                    color: themeprimary
                });
            }
        }
    },
    render: function () {
        return (
            <div className="sidebar-collapse active" id="sidebar-collapse" onClick={this.handleClick}>
                <i className="collapse-icon fa fa-bars"/>
            </div>
        );
    }
});

var AccountItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href="#">
                    <div className="clearfix">
                        <div className="notification-icon">
                            <i className="fa fa-phone bg-themeprimary white"/>
                        </div>
                        <div className="notification-body">
                            <span className="title">{this.props.title}</span>
                            <span className="description">{this.props.desc}</span>
                        </div>
                        <div className="notification-extra">
                            <i className="fa fa-clock-o themeprimary"/>
                            <span className="description">{this.props.extra}</span>
                        </div>
                    </div>
                </a>
            </li>
        );
    }
});

var MessageItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href="#">
                    <img src="assets/img/avatars/divyia.jpg" className="message-avatar" alt="Divyia Austin"/>
                    <div className="message">
    <span className="message-sender">
    {this.props.sender}
    </span>
    <span className="message-time">
    {this.props.time}
    </span>
    <span className="message-subject">
    {this.props.subject}
    </span>
    <span className="message-body">
    {this.props.body}
    </span>
                    </div>
                </a>
            </li>
        );
    }
});

var TaskItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href="#">
                    <div className="clearfix">
                        <span className="pull-left">{this.props.title}</span>
                        <span className="pull-right">{this.props.percent}</span>
                    </div>
                    <div className="progress progress-xs">
                        <div style={{width:'65%'}} className="progress-bar"></div>
                    </div>
                </a>
            </li>
        );
    }
});

var NavbarHeaderRight = React.createClass({
    chatClick: function (e) {
        $('.page-chatbar').toggleClass('open');
        $("#chat-link").toggleClass('open');
    },
    createCookie: function (e) {
        alert("hello");
        if (100) {
            var date = new Date();
            date.setTime(date.getTime() + (100 * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = e + expires + "; path=/";
    },
    readCookie: function (e) {
        alert("hello");
        var nameEq = e + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
        }
        return null;
    },

    setCookiesForFixedSettings: function () {
        createCookie("navbar-fixed-top" + "=" + $('#checkbox_fixednavbar').is(':checked'));
        createCookie("sidebar-fixed" + "=" + $('#checkbox_fixedsidebar').is(':checked'));
        createCookie("breadcrumbs-fixed" + "=" + $('#checkbox_fixedbreadcrumbs').is(':checked'));
        createCookie("page-header-fixed" + "=" + $('#checkbox_fixedheader').is(':checked'));

        var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
        if ($('#checkbox_fixedsidebar').is(':checked')) {
            if (!$('.page-sidebar').hasClass('menu-compact')) {
                //Slim Scrolling for Sidebar Menu in fix state
                $('.sidebar-menu').slimscroll({
                    position: position,
                    size: '3px',
                    color: themeprimary,
                    height: $(window).height() - 90,
                });
            }
        } else {
            if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
                $(".sidebar-menu").slimScroll({destroy: true});
                $(".sidebar-menu").attr('style', '');
            }
        }
    },
    initiateSettings: function (e) {

        if (readCookie("navbar-fixed-top") != null) {
            if (readCookie("navbar-fixed-top") == "true") {
                $('#checkbox_fixednavbar').prop('checked', true);
                $('.navbar').addClass('navbar-fixed-top');
            }
        }

        if (readCookie("sidebar-fixed") != null) {
            if (readCookie("sidebar-fixed") == "true") {
                $('#checkbox_fixedsidebar').prop('checked', true);
                $('.page-sidebar').addClass('sidebar-fixed');

                if (!$(".page-sidebar").hasClass("menu-compact")) {
                    var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                    $('.sidebar-menu').slimscroll({
                        height: $(window).height() - 90,
                        position: position,
                        size: '3px',
                        color: themeprimary
                    });
                }
            }
        }
        if (readCookie("breadcrumbs-fixed") != null) {
            if (readCookie("breadcrumbs-fixed") == "true") {
                $('#checkbox_fixedbreadcrumbs').prop('checked', true);
                $('.page-breadcrumbs').addClass('breadcrumbs-fixed');
            }
        }
        if (readCookie("page-header-fixed") != null) {
            if (readCookie("page-header-fixed") == "true") {
                $('#checkbox_fixedheader').prop('checked', true);
                $('.page-header').addClass('page-header-fixed');
            }
        }
        $('#checkbox_fixednavbar').change(function () {
            $('.navbar').toggleClass('navbar-fixed-top');
            if (($('#checkbox_fixedsidebar').is(":checked"))) {
                $('#checkbox_fixedsidebar').prop('checked', false);
                $('.page-sidebar').toggleClass('sidebar-fixed');
            }

            if (($('#checkbox_fixedbreadcrumbs').is(":checked")) && !($(this).is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs').prop('checked', false);
                $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
            }

            if (($('#checkbox_fixedheader').is(":checked")) && !($(this).is(":checked"))) {
                $('#checkbox_fixedheader').prop('checked', false);
                $('.page-header').toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();
        });

        $('#checkbox_fixedsidebar').change(function () {
            $('.page-sidebar').toggleClass('sidebar-fixed');
            if (!($('#checkbox_fixednavbar').is(":checked"))) {
                $('#checkbox_fixednavbar').prop('checked', true);
                $('.navbar').toggleClass('navbar-fixed-top');
            }
            if (($('#checkbox_fixedbreadcrumbs').is(":checked")) && !($(this).is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs').prop('checked', false);
                $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
            }
            if (($('#checkbox_fixedheader').is(":checked")) && !($(this).is(":checked"))) {
                $('#checkbox_fixedheader').prop('checked', false);
                $('.page-header').toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();
        });
        $('#checkbox_fixedbreadcrumbs').change(function () {
            $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
            if (!($('#checkbox_fixedsidebar').is(":checked"))) {
                $('#checkbox_fixedsidebar').prop('checked', true);
                $('.page-sidebar').toggleClass('sidebar-fixed');
            }
            if (!($('#checkbox_fixednavbar').is(":checked"))) {
                $('#checkbox_fixednavbar').prop('checked', true);
                $('.navbar').toggleClass('navbar-fixed-top');
            }
            if (($('#checkbox_fixedheader').is(":checked")) && !($(this).is(":checked"))) {
                $('#checkbox_fixedheader').prop('checked', false);
                $('.page-header').toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();
        });
        $('#checkbox_fixedheader').change(function () {
            $('.page-header').toggleClass('page-header-fixed');
            if (!($('#checkbox_fixedbreadcrumbs').is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs').prop('checked', true);
                $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
            }
            if (!($('#checkbox_fixedsidebar').is(":checked"))) {
                $('#checkbox_fixedsidebar').prop('checked', true);
                $('.page-sidebar').toggleClass('sidebar-fixed');
            }
            if (!($('#checkbox_fixednavbar').is(":checked"))) {
                $('#checkbox_fixednavbar').prop('checked', true);
                $('.navbar').toggleClass('navbar-fixed-top');
            }
            setCookiesForFixedSettings();
        });
        //Handle RTL SUpport for Changer CheckBox
        $("#skin-changer li a").click(function () {
            createCookie("current-skin", $(this).attr('rel'), 10);
            window.location.reload();
        });
    },
    settingsClick: function (e) {
        $('.navbar-account').toggleClass('setting-open');
    },
    componentDidMount: function () {
        this.initiateSettings();
    },
    render: function () {
        return (
            <div className="navbar-header pull-right">
                <div className="navbar-account">
                    <ul className="account-area">
                        <li>
                            <a className=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                                <i className="icon fa fa-warning"/>
                            </a>
                            <ul className="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                                <AccountItem title="Skype meeting with Patty" desc="01:00 pm" extra="office"/>
                                <AccountItem title="Uncharted break" desc="03:30 pm - 05:15 pm" extra=""/>
                                <AccountItem title="Kate birthday party" desc="08:30 pm" extra="at home"/>
                                <AccountItem title="Dinner with friends" desc="10:30 pm" extra=""/>
                                <li className="dropdown-footer ">
    <span>
    Today, March 28
    </span>
    <span className="pull-right">
    10°c
    <i className="wi wi-cloudy"/>
    </span>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <a className="dropdown-toggle" data-toggle="dropdown" title="Mails" href="#">
                                <i className="icon fa fa-envelope"/>
                                <span className="badge">3</span>
                            </a>
                            <ul className="pull-right dropdown-menu dropdown-arrow dropdown-messages">
                                <MessageItem sender="Divyia Austin" time="2 minutes ago"
                                             subject="Here's the recipe for apple pie"
                                             body="to identify the sending application when the senders image is shown for the main icon"/>
                                <MessageItem sender="Bing.com" time="Yesterday"
                                             subject="Bing Newsletter: The January Issue‏"
                                             body="Discover new music just in time for the Grammy® Awards."/>
                                <MessageItem sender="Nicolas" time="Friday, September 22" subject="New 4K Cameras"
                                             body="The 4K revolution has come over the horizon and is reaching the general populous"/>
                            </ul>

                        </li>
                        <li>
                            <a className="dropdown-toggle" data-toggle="dropdown" title="Tasks" href="#">
                                <i className="icon fa fa-tasks"/>
                                <span className="badge">4</span>
                            </a>
                            <ul className="pull-right dropdown-menu dropdown-tasks dropdown-arrow ">
                                <li className="dropdown-header bordered-darkorange">
                                    <i className="fa fa-tasks"/>
                                    4 Tasks In Progress
                                </li>
                                <TaskItem title="Account Creation" percent="65%"/>
                                <TaskItem title="Profile Data" percent="35%"/>
                                <TaskItem title="Updating Resume" percent="75%"/>
                                <TaskItem title="Adding Contacts" percent="10%"/>
                                <li className="dropdown-footer">
                                    <a href="#">
                                        See All Tasks
                                    </a>
                                    <button className="btn btn-xs btn-default shiny darkorange icon-only pull-right"><i
                                        className="fa fa-check"/></button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="wave in" id="chat-link" title="Chat" href="#" onClick={this.chatClick}>
                                <i className="icon glyphicon glyphicon-comment"/>
                            </a>
                        </li>
                        <li>
                            <a className="login-area dropdown-toggle" data-toggle="dropdown">
                                <div className="avatar" title="View your public profile">
                                    <img src="assets/img/avatars/adam-jansen.jpg"/>
                                </div>
                                <section>
                                    <h2><span className="profile"><span>David Stevenson</span></span></h2>
                                </section>
                            </a>

                            <ul className="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                <li className="username"><a>David Stevenson</a></li>
                                <li className="email"><a>David.Stevenson@live.com</a></li>

                                <li>
                                    <div className="avatar-area">
                                        <img src="assets/img/avatars/adam-jansen.jpg" className="avatar"/>
                                        <span className="caption">Change Photo</span>
                                    </div>
                                </li>

                                <li className="edit">
                                    <a href="profile.html" className="pull-left">Profile</a>
                                    <a href="#" className="pull-right">Setting</a>
                                </li>

                                <li className="theme-area">
                                    <ul className="colorpicker" id="skin-changer">
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#5DB2FF'}} rel="assets/css/skins/blue.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#2dc3e8'}} rel="assets/css/skins/azure.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#03B3B2'}} rel="assets/css/skins/teal.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#53a93f'}} rel="assets/css/skins/green.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#FF8F32'}} rel="assets/css/skins/orange.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#cc324b'}} rel="assets/css/skins/pink.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#AC193D'}} rel="assets/css/skins/darkred.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#8C0095'}} rel="assets/css/skins/purple.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#0072C6'}} rel="assets/css/skins/darkblue.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#585858'}} rel="assets/css/skins/gray.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#474544'}} rel="assets/css/skins/black.min.css"/></li>
                                        <li><a className="colorpick-btn" href="#" style={{backgroundColor:'#001940'}} rel="assets/css/skins/deepblue.min.css"/></li>
                                    </ul>
                                </li>

                                <li className="dropdown-footer">
                                    <a href="login.html">
                                        Sign out
                                    </a>
                                </li>
                            </ul>

                        </li>

                    </ul>
                    <div className="setting">
                        <a id="btn-setting" title="Setting" href="#" onClick={this.settingsClick}>
                            <i className="icon glyphicon glyphicon-cog"></i>
                        </a>
                    </div>
                    <div className="setting-container">
                        <label>
                            <input type="checkbox" id="checkbox_fixednavbar"/>
                            <span className="text">Fixed Navbar</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedsidebar"/>
                            <span className="text">Fixed SideBar</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedbreadcrumbs"/>
                            <span className="text">Fixed BreadCrumbs</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedheader"/>
                            <span className="text">Fixed Header</span>
                        </label>
                    </div>

                </div>
            </div>
        );
    }
});

var Navbar = React.createClass({
    render: function () {
        return (
            <div className="navbar">
                <div className="navbar-inner">
                    <div className="navbar-container">
                        <NavbarBrand />
                        <SideBar />
                        <NavbarHeaderRight />
                    </div>
                </div>
            </div>
        );
    }
});

var PageSidebar = require('./components/PageSidebar');

var Contact = React.createClass({
    handleClick: function (e) {
        $('.page-chatbar .chatbar-contacts').hide();
        $('.page-chatbar .chatbar-messages').show();
    },
    render: function () {
        return (
            <li className="contact" onClick={this.handleClick}>
                <div className="contact-avatar">
                    <img src="assets/img/avatars/John-Smith.jpg"/>
                </div>
                <div className="contact-info">
                    <div className="contact-name">{this.props.name}</div>
                    <div className="contact-status">
                        <div className="online"></div>
                        <div className="status">{this.props.status}</div>
                    </div>
                    <div className="last-chat-time">
                        {this.props.last}
                    </div>
                </div>
            </li>
        );
    }
});

var ContactList = React.createClass({
    componentDidMount: function () {
        var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
        var additionalHeight = 0;
        if ($(window).width() < 531)
            additionalHeight = 45;
        $('.chatbar-contacts .contacts-list').slimscroll({
            position: position,
            size: '4px',
            color: themeprimary,
            height: $(window).height() - (86 + additionalHeight)
        });
    },
    render: function () {
        return (
            <ul className="contacts-list">
                <Contact name="Divyia Philips" status="online" last="last week"/>
                <Contact name="Adam Johnson" status="left 4 mins ago" last="today"/>
                <Contact name="John Smith" status="online" last="1:57 am"/>
                <Contact name="Osvaldus Valutis" status="online" last="today"/>
                <Contact name="Javi Jimenez" status="online" last="today"/>
                <Contact name="Stephanie Walter" status="online" last="yesterday"/>
                <Contact name="Sergey Azovskiy" status="offline since oct 24" last="22 oct"/>
                <Contact name="Lee Munroe" status="online" last="today"/>
                <Contact name="Divyia Philips" status="online" last="last week"/>
            </ul>
        );
    }
});

var ContactSearch = React.createClass({
    render: function () {
        return (
            <div className="contacts-search">
                <input type="text" className="searchinput" placeholder="Search Contacts"/>
                <i className="searchicon fa fa-search"/>
                <div className="searchhelper">Search Your Contacts and Chat History</div>
            </div>
        );
    }
});

var ChatContact = React.createClass({
    render: function () {
        return (
            <div className="chatbar-contacts">
                <ContactSearch />
                <ContactList />
            </div>
        );
    }
});

var ChatMessage = React.createClass({
    render: function () {
        return (
            <li className="message">
                <div className="message-info">
                    <div className="bullet"></div>
                    <div className="contact-name">{this.props.sender}</div>
                    <div className="message-time">{this.props.time}</div>
                </div>
                <div className="message-body">
                    {this.props.text}
                </div>
            </li>
        );
    }
});

var ChatReply = React.createClass({
    render: function () {
        return (
            <li className="message reply">
                <div className="message-info">
                    <div className="bullet"></div>
                    <div className="contact-name">{this.props.sender}</div>
                    <div className="message-time">{this.props.time}</div>
                </div>
                <div className="message-body">
                    {this.props.text}
                </div>
            </li>
        );
    }
});

var ChatList = React.createClass({
    componentDidMount: function () {
        var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
        var additionalHeight = 0;
        if ($(window).width() < 531)
            additionalHeight = 45;
        $('.chatbar-messages .messages-list').slimscroll({
            position: position,
            size: '4px',
            color: themeprimary,
            height: $(window).height() - (250 + additionalHeight)
        });
    },
    render: function () {
        return (
            <ul className="messages-list">
                <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
                <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
                <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
                <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
                <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
                <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?"/>
            </ul>
        );
    }
});

var ChatSend = React.createClass({
    render: function () {
        return (
            <div className="send-message">
                <span className="input-icon icon-right">
                    <textarea rows="4" className="form-control" placeholder="Type your message"/>
                    <i className="fa fa-camera themeprimary"/>
                </span>
            </div>
        );
    }
});

var ChatBarContact = React.createClass({
    handleClick: function () {
        $('.page-chatbar .chatbar-contacts').show();
        $('.page-chatbar .chatbar-messages').hide();
    },
    render: function () {
        return (
            <div className="messages-contact">
                <div className="contact-avatar">
                    <img src="assets/img/avatars/divyia.jpg"/>
                </div>
                <div className="contact-info">
                    <div className="contact-name">{this.props.name}</div>
                    <div className="contact-status">
                        <div className="online"></div>
                        <div className="status">{this.props.status}</div>
                    </div>
                    <div className="last-chat-time">
                        {this.props.time}
                    </div>
                    <div className="back" onClick={this.handleClick}>
                        <i className="fa fa-arrow-circle-left"/>
                    </div>
                </div>
            </div>
        );
    }
});

var ChatBarMessage = React.createClass({
    render: function () {
        return (
            <div className="chatbar-messages" style={{display: 'none'}}>
                <ChatBarContact name="Divyia Philips" status="online" time="a moment ago"/>
                <ChatList />
                <ChatSend />
            </div>
        );
    }
});

var ChatBar = React.createClass({
    render: function () {
        return (
            <div id="chatbar" className="page-chatbar">
                <ChatContact />
                <ChatBarMessage />
            </div>
        );
    }
});


var Mask = require('./components/Mask');
var PageContent = require('./components/PageContent');

var WholePage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="loading-container">
                    <div className="loader"></div>
                </div>
                <Navbar />
                <div className="main-container container-fluid">
                    <div className="page-container">
                        <PageSidebar />
                        <ChatBar />
                        <PageContent />
                    </div>
                </div>
                <Mask ref="mask"/>
            </div>
        );
    }
});

ReactDOM.render(
    <WholePage />,
    document.getElementById('content')
);