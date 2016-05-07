var React = require('react');
var Dashboard = require('./Dashboard');
var FirstRow = Dashboard.FirstRow;
var SecondRow = Dashboard.SecondRow;
var ThirdRow  = Dashboard.ThirdRow;
var FourthRow  = Dashboard.FourthRow;

var PageContentStore = require('../stores/PageContentStore');

var SimpleDataTable = require("./SimpleDataTable");

var PageContent = React.createClass({
    getInitialState: function () {
        return PageContentStore.get();
    },
    fullScreenClick: function (e) {
        var element = document.documentElement;
        if (!$('body').hasClass("full-screen")) {
            $('body').addClass("full-screen");
            $('#fullscreen-toggler').addClass("active");
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            $('body').removeClass("full-screen");
            $('#fullscreen-toggler').removeClass("active");
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    },
    sideBarClick: function (e) {
        $("#sidebar").toggleClass("hide");
        $(".sidebar-toggler").toggleClass("active");
        return false;
    },
    componentDidMount: function() {
        PageContentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        PageContentStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        console.log('PageContent _onChange');
        this.setState(PageContentStore.get());
    },
    render: function () {
        console.log(" PageContent render ");
        return (
            <div className="page-content">
                <div className="page-breadcrumbs">
                    <ul className="breadcrumb">
                        <li>
                            <i className="fa fa-home"/>
                            <a href="#">Home</a>
                        </li>
                        {
                            this.state.breadcrumbs.map(function(item,i) {
                                if(i == this.state.breadcrumbs.length-1){
                                    return (<li key={item.key} className="active">{item.text}</li>)
                                }else{
                                    return (<li key={item.key}><a href="">{item.text}</a></li>);
                                }
                            }.bind(this))
                        }
                    </ul>
                </div>
                <div className="page-header position-relative">
                    <div className="header-title">
                        <h1>
                            {this.state.header.title}
                        </h1>
                    </div>
                    <div className="header-buttons">
                        <a className="sidebar-toggler" href="#" onClick={this.sideBarClick}>
                            <i className="fa fa-arrows-h"/>
                        </a>
                        <a className="refresh" id="refresh-toggler" href="">
                            <i className="glyphicon glyphicon-refresh"/>
                        </a>
                        <a className="fullscreen" id="fullscreen-toggler" href="#" onClick={this.fullScreenClick}>
                            <i className="glyphicon glyphicon-fullscreen"/>
                        </a>
                    </div>
                </div>
                <div className="page-body">
                    {this.state.body}
                </div>
            </div>
        );
    }
});

module.exports = PageContent;