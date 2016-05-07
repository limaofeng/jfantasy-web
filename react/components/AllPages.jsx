var React = require('react');

var Dashboard = require('./Dashboard');

var pages = [];

pages.push({
    key: '/dashboard', 'data': {
        breadcrumbs: [{key: "dashboard", text: "仪表盘"}],
        header: {title: '仪表盘'},
        body: [
            (<Dashboard.FirstRow key="1"/>), (<Dashboard.SecondRow key="2"/>), (<Dashboard.ThirdRow key="3"/>),
            (<Dashboard.FourthRow key="4"/>)
        ]
    }
});

var Pay = require('./Pay');

pages.push({
    key: '/pay1', 'data': {
        breadcrumbs: [{key: "pay1", text: "支付测试"}],
            header: {title: '支付测试'},
        body: <Pay/>
    }
});

module.exports = {
    getPage: function (key) {
        return pages.filter((item)=>item.key == key)[0].data;
    }
};