var React = require('react');

var MenuItemIcon = React.createClass({
    render: function () {

        var classNames = function (a1,a2) {
            return Array.prototype.join.apply([a1,a2], [' ']);
        };

        var classes = classNames('menu-icon', this.props.className || '');

        return (
            <a href={this.props.href}>
                <i className={classes}/>
                <span className="menu-text">{this.props.text}</span>
            </a>
        );
    }
});

var MenuItem = React.createClass({
    render: function () {
        return (
            <a href={this.props.href}>
                <span className="menu-text">{this.props.text}</span>
            </a>
        );
    }
});

var ParentMenuIcon = React.createClass({
    render: function () {
        var classNames = function (a1,a2) {
            return Array.prototype.join.apply([a1,a2], [' ']);
        };

        var classeNames = classNames('menu-icon', this.props.className || 'fa fa-desktop');

        return (
            <a href="#" className="menu-dropdown">
                <i className={classeNames} />
                <span className="menu-text">{this.props.text}</span>
                <i className="menu-expand"/>
            </a>
        );
    }
});

var ParentMenu = React.createClass({
    render: function () {
        return (
            <a href="#" className="menu-dropdown">
                <span className="menu-text">{this.props.text}</span>
                <i className="menu-expand"/>
            </a>
        );
    }
});

var menuDatas = [
    {
        "id": 1,
        "path": "1,",
        "name": "仪表盘",
        "value": "/dashboard",
        "type": "url",
        "icon": "glyphicon glyphicon-home"
    },
    {
        "id": 2,
        "path": "2,",
        "name": "支付 & 对账 ",
        "value": "/pay1",
        "type": "url",
        "icon": "fa fa-table"
    },
    {
        "id": 3,
        "path": "3,",
        "name": "支付 & 对账 ",
        "value": "/pay2",
        "type": "menu",
        "icon": "fa fa-table",
        "children":[
            {
                "id": 4,
                "path": "3,4,",
                "name": " 支付配置 ",
                "value": "/pay3",
                "type": "url"
            },
            {
                "id": 5,
                "path": "3,5,",
                "name": " 退款审核 ",
                "value": "/pay4",
                "type": "url"
            }
        ]
    },
    {
        "id": 6,
        "path": "6,",
        "name": " 医生 & 药房 ",
        "value": "/pay6",
        "type": "menu",
        "icon": "fa fa-table",
        "children":[
            {
                "id": 7,
                "path": "3,4,",
                "name": " 医生 ",
                "value": "/pay7",
                "type": "url"
            },
            {
                "id": 8,
                "path": "3,5,",
                "name": " 药房 ",
                "value": "/pay8",
                "type": "url"
            }
        ]
    }
];

var PageContentActions = require('../actions/PageContentActions');
var AllPages = require('../components/AllPages');

PageContentActions.switch(AllPages.getPage(menuDatas[0].value));

var PageSidebar = React.createClass({
    getInitialState: function () {
        return {
            menus: menuDatas,
            current:menuDatas[0]
        };
    },
    bodyClickHandler: function (e) {
        var b = $("#sidebar").hasClass("menu-compact");
        var menuLink = $(e.target).closest("a");
        if (!menuLink || menuLink.length == 0)
            return false;
        if (!menuLink.hasClass("menu-dropdown")) {
            if (b && menuLink.get(0).parentNode.parentNode == this) {
                var menuText = menuLink.find(".menu-text").get(0);
                if (e.target != menuText && !$.contains(menuText, e.target)) {
                    return false;
                }
            }
            e.preventDefault();
            var href = menuLink.attr('href');
            console.log(menuLink.attr('href'));
            var getMenu = function(menus,href){
                var menu = null;
                menus.forEach(function(item){
                    if(item.value == href){
                        menu = item;
                    }else if(item.children){
                        menu = getMenu(item.children,href) || menu;
                    }
                });
                return menu;
            };
            var newcurrent = getMenu(this.state.menus,href);
            if(this.state.current == newcurrent){
                return false;
            }
            console.log('切换菜单选中:' + this.state.current.name + '=>' + newcurrent.name);
            this.state.current = newcurrent;

            var pmenu = menuLink.closest('.sidebar-menu > .open > .submenu');
            $('.sidebar-menu .active').filter(function(){
                return $(this).get(0) != menuLink.parents('.open.active').get(0);
            }).removeClass('active');
            $('.sidebar-menu .open > .submenu').filter(function(){
                return $(this).get(0) != pmenu.get(0);
            }).slideToggle(200).parent().delay(200,'mx').queue('mx', function(){
                $(this).toggleClass("open");
            }).dequeue('mx');
            menuLink.parent().addClass('active');
            if(pmenu.length){
                var pmp = pmenu.parent();
                if(!pmp.hasClass('active')) {
                    pmp.addClass('active');
                }
            }
            console.log('显示进度');
            NProgress.inc();
            PageContentActions.switch(AllPages.getPage(href));
            console.log('结束进度');
            NProgress.done();
            return;
        }
        var submenu = menuLink.next().get(0);
        if (!$(submenu).is(":visible")) {
            var c = $(submenu.parentNode).closest("ul");
            if (b && c.hasClass("sidebar-menu"))
                return;
            c.find("> .open > .submenu")
                .each(function () {
                    if (this != submenu && !$(this.parentNode).hasClass("active"))
                        $(this).slideUp(200).parent().removeClass("open");
                });
        }
        if (b && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
            return false;
        $(submenu).slideToggle(200).parent().delay(200,'mx').queue('mx', function(){
            $(this).toggleClass("open");
        }).dequeue('mx');
        return false;
    },
    componentDidMount: function () {
        /*
        $.ajax({url: "https://test.zbsg.com.cn/system/websites/haolue/menus", "type": "GET"}).done(function (result) {
            var treeMenus = [];
            result.forEach(function (v) {
                if (v.layer == 1) {
                    treeMenus.push(v);
                } else {
                    result.forEach(function (_v) {
                        if (_v.id == v.parentId) {
                            if (!_v.children) {
                                _v.children = [];
                            }
                            _v.children.push(v);
                        }
                    });
                }
            });
            this.setState({menus: treeMenus});
        }.bind(this));
        */
    },
    render: function () {
        var isActive = function(menu){
            if(menu.id == this.current.id){
                return true;
            }else if(menu.children){
                return menu.children.some(isActive);
            }
            return false;
        }.bind(this.state);
        return (
            <div className="page-sidebar menu-compact" id="sidebar">
                <div className="sidebar-header-wrapper">
                    <input type="text" className="searchinput"/>
                    <i className="searchicon fa fa-search"/>
                    <div className="searchhelper">Search Reports, Charts, Emails or Notifications</div>
                </div>
                <ul className="nav sidebar-menu" onClick={this.bodyClickHandler}>
                    {
                        this.state.menus.map(function (menu) {
                            if(menu.children){
                                return (
                                    <li key={menu.id} className={isActive(menu)?"active open":""}>
                                        <ParentMenuIcon text={menu.name}/>
                                        <ul className="submenu">
                                            {
                                                menu.children.map(function (submenu) {
                                                    return (
                                                        <li key={submenu.id} className={isActive(submenu)?"active":""}>
                                                            <MenuItemIcon href={submenu.value} text={submenu.name}/>
                                                        </li>);
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            }else{
                                return  (
                                    <li key={menu.id} className={isActive(menu)?"active":""}>
                                        <MenuItemIcon className={menu.icon} href={menu.value} text={menu.name}/>
                                    </li>
                                )
                            }
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
});
/*

 <li >
 <MenuItemIcon className="glyphicon glyphicon-home" href="index.html" text="仪表盘"/>
 </li>

 <li>
 <MenuItemIcon className="glyphicon glyphicon-tasks" href="databoxes.html" text="签约医生"/>
 </li>

 <li>
 <MenuItemIcon className="fa fa-th" href="widgets.html" text="会员"/>
 </li>

 <li>
 <ParentMenuIcon className="fa fa-desktop" text=" 药厂 & 药品 "/>

 <ul className="submenu">
 <li>
 <MenuItem href="elements.html" text="Basic Elements"/>
 </li>
 <li>
 <ParentMenu text="Icons"/>

 <ul className="submenu">
 <li>
 <MenuItemIcon href="font-awesome.html" text="Font Awesome"/>
 </li>
 <li>
 <MenuItemIcon href="glyph-icons.html" text="Glyph Icons"/>
 </li>
 <li>
 <MenuItemIcon href="typicon.html" text="Typicons"/>
 </li>
 <li>
 <MenuItemIcon href="weather-icons.html" text="Weather Icons"/>
 </li>
 </ul>
 </li>
 <li>
 <MenuItem href="tabs.html" text="Tabs & Accordions"/>
 </li>
 <li>
 <MenuItem href="alerts.html" text="Alerts & Tooltips"/>
 </li>
 <li>
 <MenuItem href="modals.html" text="Modals & Wells"/>
 </li>
 <li>
 <MenuItem href="buttons.html" text="Buttons"/>
 </li>
 <li>
 <MenuItem href="nestable-list.html" text="Nestable List"/>
 </li>
 <li>
 <MenuItem href="treeview.html" text="Treeview"/>
 </li>
 </ul>
 </li>
 <li>
 <ParentMenuIcon text="Tables"/>

 <ul className="submenu">
 <li>
 <MenuItem href="tables-simple.html" text="Simple & Responsive"/>
 </li>
 <li>
 <MenuItem href="tables-data.html" text="Data Tables"/>
 </li>
 </ul>
 </li>
 <li>
 <ParentMenuIcon text="Forms"/>

 <ul className="submenu">
 <li>
 <MenuItem href="form-layouts.html" text="Form Layouts"/>
 </li>

 <li>
 <MenuItem href="form-inputs.html" text="Form Inputs"/>
 </li>

 <li>
 <MenuItem href="form-pickers.html" text="Data Pickers"/>
 </li>
 <li>
 <MenuItem href="form-wizard.html" text="Wizard"/>
 </li>
 <li>
 <MenuItem href="form-validation.html" text="Validation"/>
 </li>
 <li>
 <MenuItem href="form-editors.html" text="Editors"/>
 </li>
 <li>
 <MenuItem href="form-inputmask.html" text="Input Mask"/>
 </li>
 </ul>
 </li>
 <li>
 <ParentMenuIcon text="Charts"/>

 <ul className="submenu">
 <li>
 <MenuItem href="flot.html" text="Flot Charts"/>
 </li>

 <li>
 <MenuItem href="morris.html" text="Morris Charts"/>
 </li>
 <li>
 <MenuItem href="sparkline.html" text="Sparkline Charts"/>
 </li>
 <li>
 <MenuItem href="easypiecharts.html" text="Easy Pie Charts"/>
 </li>
 <li>
 <MenuItem href="chartjs.html" text="ChartJS"/>
 </li>
 </ul>
 </li>

 <li>
 <MenuItemIcon href="profile.html" text="Profile"/>
 </li>

 <li>
 <ParentMenuIcon text="Mail"/>

 <ul className="submenu">
 <li>
 <MenuItem href="inbox.html" text="Inbox"/>
 </li>

 <li>
 <MenuItem href="message-view.html" text="View Message"/>
 </li>
 <li>
 <MenuItem href="message-compose.html" text="Compose Message"/>
 </li>
 </ul>
 </li>
 <li>
 <MenuItemIcon href="calendar.html" text="Calendar"/>
 </li>

 <li>
 <ParentMenuIcon text="Pages"/>
 <ul className="submenu">
 <li>
 <MenuItem href="timeline.html" text="Timeline"/>
 </li>
 <li>
 <MenuItem href="pricing.html" text="Pricing Tables"/>
 </li>

 <li>
 <MenuItem href="invoice.html" text="Invoice"/>
 </li>

 <li>
 <MenuItem href="login.html" text="Login"/>
 </li>
 <li>
 <MenuItem href="register.html" text="Register"/>
 </li>
 <li>
 <MenuItem href="lock.html" text="Lock Screen"/>
 </li>
 <li>
 <MenuItem href="typography.html" text="Typography"/>
 </li>
 </ul>
 </li>
 <li>
 <ParentMenuIcon text="More Pages"/>

 <ul className="submenu">
 <li>
 <MenuItem href="error-404.html" text="Error 404"/>
 </li>

 <li>
 <MenuItem href="error-500.html" text="Error 500"/>
 </li>
 <li>
 <MenuItem href="blank.html" text="Blank Page"/>
 </li>
 <li>
 <MenuItem href="grid.html" text="Grid"/>
 </li>
 <li>
 <ParentMenu text="Multi Level Menu"/>

 <ul className="submenu">
 <li>
 <MenuItemIcon href="#" text="Level 3"/>
 </li>

 <li>
 <ParentMenuIcon text="Level 4"/>

 <ul className="submenu">
 <li>
 <MenuItemIcon href="#" text="Some Item"/>
 </li>

 <li>
 <MenuItemIcon href="#" text="Another Item"/>
 </li>
 </ul>
 </li>

 </ul>
 </li>

 </ul>
 </li>

 <li>
 <ParentMenuIcon text="Right to Left"/>
 <ul className="submenu">
 <li>
 <a>
 <span className="menu-text">RTL</span>
 <label className="pull-right margin-top-10">
 <input id="rtl-changer" className="checkbox-slider slider-icon colored-primary" type="checkbox"/>
 <span className="text"/>
 </label>
 </a>
 </li>
 <li>
 <MenuItem href="index-rtl-ar.html" text="Arabic Layout"/>
 </li>

 <li>
 <MenuItem href="index-rtl-fa.html" text="Persian Layout"/>
 </li>

 </ul>
 </li>
 <li>
 <MenuItemIcon href="versions.html" text="BeyondAdmin Versions"/>
 </li>

 */
module.exports = PageSidebar;