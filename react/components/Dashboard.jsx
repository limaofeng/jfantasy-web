var React = require('react');
var FirstDataBox = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox bg-white radius-bordered">
                    <div className="databox-left bg-themesecondary">
                        <div className="databox-piechart">
                            <div data-toggle="easypiechart" className="easyPieChart" data-barcolor="#fff"
                                 data-linecap="butt" data-percent="50" data-animate="500" data-linewidth="3"
                                 data-size="47" data-trackcolor="rgba(255,255,255,0.1)"><span
                                className="white font-90">{this.props.percent}%</span></div>
                        </div>
                    </div>
                    <div className="databox-right">
                        <span className="databox-number themesecondary">{this.props.number}</span>
                        <div className="databox-text darkgray">{this.props.text}</div>
                        <div className="databox-stat themesecondary radius-bordered">
                            <i className="stat-icon icon-lg fa fa-tasks"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var SecondDataBox = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox bg-white radius-bordered">
                    <div className="databox-left bg-themethirdcolor">
                        <div className="databox-piechart">
                            <div data-toggle="easypiechart" className="easyPieChart" data-barcolor="#fff"
                                 data-linecap="butt" data-percent="15" data-animate="500" data-linewidth="3"
                                 data-size="47" data-trackcolor="rgba(255,255,255,0.2)"><span
                                className="white font-90">{this.props.percent}%</span></div>
                        </div>
                    </div>
                    <div className="databox-right">
                        <span className="databox-number themethirdcolor">{this.props.number}</span>
                        <div className="databox-text darkgray">{this.props.text}</div>
                        <div className="databox-stat themethirdcolor radius-bordered">
                            <i className="stat-icon  icon-lg fa fa-envelope-o"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var ThirdDataBox = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox bg-white radius-bordered">
                    <div className="databox-left bg-themeprimary">
                        <div className="databox-piechart">
                            <div id="users-pie" data-toggle="easypiechart" className="easyPieChart" data-barcolor="#fff"
                                 data-linecap="butt" data-percent="76" data-animate="500" data-linewidth="3"
                                 data-size="47" data-trackcolor="rgba(255,255,255,0.1)"><span
                                className="white font-90">{this.props.percent}%</span></div>
                        </div>
                    </div>
                    <div className="databox-right">
                        <span className="databox-number themeprimary">{this.props.number}</span>
                        <div className="databox-text darkgray">{this.props.text}</div>
                        <div className="databox-state bg-themeprimary">
                            <i className="fa fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var FourthDataBox = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox bg-white radius-bordered">
                    <div className="databox-left no-padding">
                        <img src="assets/img/avatars/John-Smith.jpg" style={{width:'65px', height:'65px'}}/>
                    </div>
                    <div className="databox-right padding-top-20">
                        <div className="databox-stat palegreen">
                            <i className="stat-icon icon-xlg fa fa-phone"></i>
                        </div>
                        <div className="databox-text darkgray">{this.props.text1}</div>
                        <div className="databox-text darkgray">{this.props.text2}</div>
                    </div>
                </div>
            </div>
        );
    }
});


var DashboardHeader = React.createClass({
    render: function () {
        return (
            <div className="box-header">
                <div className="deadline">
                    Remaining Days: 109
                </div>
            </div>
        );
    }
});

var DashboardProgress = React.createClass({
    render: function () {
        return (
            <div className="box-progress">
                <div className="progress-handle">day 20</div>
                <div className="progress progress-xs progress-no-radius bg-whitesmoke">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                         aria-valuemax="100" style={{width: '20%'}}>
                    </div>
                </div>
            </div>
        );
    }
});


var SaleCircle = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox databox-xlg databox-vertical databox-inverted databox-shadowed">
                    <div className="databox-top">
                        <div className="databox-piechart">
                            <div data-toggle="easypiechart" className="easyPieChart block-center"
                                 data-barcolor="themeprimary" data-linecap="butt" data-percent="{this.props.percent}"
                                 data-animate="500"
                                 data-linewidth="8" data-size="125" data-trackcolor="#eee">
                                <span className="font-200"><i className="fa fa-gift themeprimary"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="databox-bottom no-padding text-align-center">
                        <span className="databox-number lightcarbon no-margin">{this.props.amount}</span>
                        <span className="databox-text lightcarbon no-margin">{this.props.text}</span>
                    </div>
                </div>
            </div>
        );
    }
});

var SaleDiagram = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="databox databox-xlg databox-vertical databox-inverted databox-shadowed">
                    <div className="databox-top">
                        <div className="databox-sparkline">
    <span data-sparkline="line" data-height="125px" data-width="100%" data-fillcolor="false"
          data-linecolor="themesecondary"
          data-spotcolor="#fafafa" data-minspotcolor="#fafafa" data-maxspotcolor="#ffce55"
          data-highlightspotcolor="#ffce55" data-highlightlinecolor="#ffce55"
          data-linewidth="1.5" data-spotradius="2">
    {this.props.numbers}
    </span>
                        </div>
                    </div>
                    <div className="databox-bottom no-padding text-align-center">
                        <span className="databox-number lightcarbon no-margin">{this.props.amount}</span>
                        <span className="databox-text lightcarbon no-margin">{this.props.unit}</span>
                    </div>
                </div>
            </div>
        );
    }
});

var DashboardVisit = React.createClass({
    render: function () {
        return (
            <div className="col-lg-4 col-sm-4 col-xs-12">
                <div className="notification">
                    <div className="clearfix">
                        <div className="notification-icon">
                            <i className="fa fa-phone bordered-1 bordered-orange orange"></i>
                        </div>
                        <div className="notification-body">
                            <span className="title">{this.props.text}</span>
                            <span className="description">{this.props.time}</span>
                        </div>
                        <div className="notification-extra">
                            <i className="fa fa-clock-o orange"></i>
                            <span className="description">{this.props.extra}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var OrderItem = React.createClass({
    render: function () {
        return (
            <li className="order-item">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div className="item-booker">{this.props.name}</div>
                        <div className="item-time">
                            <i className="fa fa-calendar"></i>
                            <span>{this.props.time}</span>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div className="item-price">
                            <span className="currency">{this.props.currency}</span>
                            <span className="price">{this.props.amount}</span>
                        </div>
                    </div>
                </div>
                <a className="item-more" href="">
                    <i></i>
                </a>
            </li>
        );
    }
});


var TaskBoardItem = React.createClass({
    render: function () {
        return (
            <li className="task-item">
                <div className="task-check">
                    <label>
                        <input type="checkbox"/>
                        <span className="text"></span>
                    </label>
                </div>
                <div className="task-state">
    <span className="label label-yellow">
    {this.props.status}
    </span>
                </div>
                <div className="task-time">{this.props.time}</div>
                <div className="task-body">{this.props.text}</div>
                <div className="task-creator"><a href="">{this.props.creator}</a></div>
                <div className="task-assignedto">{this.props.assignee}</div>
            </li>
        );
    }
});

var TaskBoard = React.createClass({
    render: function () {
        return (
            <div className="col-lg-4 col-sm-12 col-xs-12">
                <div className="widget">
                    <div className="widget-header bordered-bottom bordered-themeprimary">
                        <i className="widget-icon fa fa-tasks themeprimary"></i>
                        <span className="widget-caption themeprimary">Task Board</span>
                    </div>
                    <div className="widget-body no-padding">
                        <div className="task-container">
                            <div className="task-search">
    <span className="input-icon">
    <input type="text" className="form-control" placeholder="Search Tasks"/>
    <i className="fa fa-search gray"></i>
    </span>
                            </div>
                            <ul className="tasks-list">
                                <TaskBoardItem status="In Progress" time="1 hour ago"
                                               text="Ask to the sysadmins to install Python 3 on the server and run it"
                                               creator="Cameron Hetfield" assignee="assigned to you"/>
                                <TaskBoardItem status="Active" time="2 hours ago"
                                               text="Write documentation for the new API with test and deploy specifications"
                                               creator="Behrang Nitsche" assignee="assigned to you"/>
                                <TaskBoardItem status="Approved" time="yesterday"
                                               text="Code refactoring and rewriting silly codes and test it"
                                               creator="David Fincher" assignee="assigned to Kim"/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var TasksDiagram = React.createClass({
    render: function () {
        return (
            <div className="col=lg-4 col-md-4 col-sm-12 col-xs-12">
                <div
                    className="databox databox-lg databox-inverted radius-bordered databox-shadowed databox-graded databox-vertical">
                    <div className="databox-top bg-palegreen no-padding">
                        <div className="databox-stat white bg-palegreen font-120">
                            <i className="stat-icon fa fa-caret-down icon-xlg"></i>
                        </div>
                        <div className="horizontal-space space-lg"></div>
                        <div className="databox-sparkline no-margin">
    <span data-sparkline="compositebar" data-height="82px" data-width="100%"
          data-barcolor="#b0dc81"
          data-barwidth="10px" data-barspacing="5px"
          data-fillcolor="false" data-linecolor="#fff" data-spotradius="3" data-linewidth="2"
          data-spotcolor="#fafafa" data-minspotcolor="#fafafa" data-maxspotcolor="#fff"
          data-highlightspotcolor="#fff" data-highlightlinecolor="#fff"
          data-composite={this.props.composite}>
    {this.props.numbers}
    </span>
                        </div>
                    </div>
                    <div className="databox-bottom no-padding">
                        <div className="databox-row">
                            <div className="databox-cell cell-6 text-align-left">
                                <span className="databox-text">{this.props.text1}</span>
                                <span className="databox-number">{this.props.number1}</span>
                            </div>
                            <div className="databox-cell cell-6 text-align-right">
                                <span className="databox-text">{this.props.text2}</span>
                                <span className="databox-number font-70">{this.props.number2}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var TicketItem = React.createClass({
    render: function () {
        return (
            <li className="ticket-item">
                <div className="row">
                    <div className="ticket-user col-lg-6 col-sm-12">
                        <img src="assets/img/avatars/adam-jansen.jpg" className="user-avatar"/>
                        <span className="user-name">{this.props.username}</span>
                        <span className="user-at">at</span>
                        <span className="user-company">{this.props.company}</span>
                    </div>
                    <div className="ticket-time  col-lg-4 col-sm-6 col-xs-12">
                        <div className="divider hidden-md hidden-sm hidden-xs"></div>
                        <i className="fa fa-clock-o"></i>
                        <span className="time">{this.props.time}</span>
                    </div>
                    <div className="ticket-type  col-lg-2 col-sm-6 col-xs-12">
                        <span className="divider hidden-xs"></span>
                        <span className="type">{this.props.type}</span>
                    </div>
                    <div className="ticket-state bg-palegreen">
                        <i className="fa fa-check"></i>
                    </div>
                </div>
            </li>
        );
    }
});

var TicketBoard = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="widget">
                        <div className="widget-header bordered-bottom bordered-themesecondary">
                            <i className="widget-icon fa fa-tags themesecondary"></i>
                            <span className="widget-caption themesecondary">Ticket Board</span>
                        </div>
                        <div className="widget-body  no-padding">
                            <div className="tickets-container">
                                <ul className="tickets-list">
                                    <TicketItem username="Adam Johnson" company="Microsoft" time="1 Hours Ago"
                                                type="Issue"/>
                                    <TicketItem username="Divyia Phillips" company="Dribbble" time="3 Hours Ago"
                                                type="Payment"/>
                                    <TicketItem username="Nicolai Larson" company="Google" time="18 Hours Ago"
                                                type="Issue"/>
                                    <TicketItem username="Bill Jackson" company="Mabna" time="2 days Ago"
                                                type="Payment"/>
                                    <TicketItem username="Eric Clapton" company="Musicker" time="2 days Ago"
                                                type="Info"/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var ViewItem = React.createClass({
    render: function () {
        return (
            <div className="databox-cell cell-2 no-padding padding-10 text-align-left">
                <span className="databox-number orange no-margin">{this.props.number}</span>
                <span className="databox-text darkgray no-margin">{this.props.text}</span>
            </div>
        );
    }
});

var WeekDay = React.createClass({
    render: function () {
        return (
            <div className="databox-cell cell-2 text-align-center no-padding padding-top-5">
                <span className="databox-header white">{this.props.text}</span>
            </div>
        );
    }
});

var PageViews = React.createClass({
    render: function () {
        return (
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="databox databox-xxlg databox-vertical databox-inverted">
                    <div className="databox-top bg-whitesmoke no-padding">
                        <div className="databox-row row-2 bg-orange no-padding">
                            <div className="databox-cell cell-1 text-align-center no-padding padding-top-5">
                                <span className="databox-number white"><i
                                    className="fa fa-bar-chart-o no-margin"></i></span>
                            </div>
                            <div className="databox-cell cell-8 no-padding padding-top-5 text-align-left">
                                <span className="databox-number white">PAGE VIEWS</span>
                            </div>
                            <div className="databox-cell cell-3 text-align-right padding-10">
                                <span className="databox-text white">13 DECEMBER</span>
                            </div>
                        </div>
                        <div className="databox-row row-4">
                            <div className="databox-cell cell-6 no-padding padding-10 padding-left-20 text-align-left">
                                <span className="databox-number orange no-margin">534,908</span>
                                <span className="databox-text sky no-margin">OVERAL VIEWS</span>
                            </div>
                            <ViewItem number="4,129" text="THIS WEEK"/>
                            <ViewItem number="329" text="YESTERDAY"/>
                            <ViewItem number="104" text="TODAY"/>
                        </div>
                        <div className="databox-row row-6 no-padding">
                            <div className="databox-sparkline">
    <span data-sparkline="line" data-height="126px" data-width="100%" data-fillcolor="#37c2e2" data-linecolor="#37c2e2"
          data-spotcolor="#fafafa" data-minspotcolor="#fafafa" data-maxspotcolor="#ffce55"
          data-highlightspotcolor="#f5f5f5 " data-highlightlinecolor="#f5f5f5"
          data-linewidth="2" data-spotradius="0">
    5,7,6,5,9,4,3,7,2
    </span>
                            </div>
                        </div>
                    </div>
                    <div className="databox-bottom bg-sky no-padding">
                        <WeekDay text="Mon"/>
                        <WeekDay text="Tues"/>
                        <WeekDay text="Wed"/>
                        <WeekDay text="Thu"/>
                        <WeekDay text="Fri"/>
                        <WeekDay text="Sat"/>
                    </div>
                </div>
            </div>
        );
    }
});

var StatItem = React.createClass({
    render: function () {
        return (
            <div className="databox-row row-2 bordered-bottom bordered-ivory padding-10">
                <span className="badge badge-palegreen badge-empty pull-left margin-5"></span>
                <span className="databox-text darkgray pull-left no-margin hidden-xs">{this.props.text}</span>
                <span className="databox-text darkgray pull-right no-margin uppercase">{this.props.percent}</span>
            </div>
        );
    }
});

var Stats = React.createClass({
    render: function () {
        return (
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div
                    className="databox databox-xxlg databox-vertical databox-shadowed bg-white radius-bordered padding-5">
                    <div className="databox-top">
                        <div className="databox-row row-12">
                            <div className="databox-cell cell-3 text-center">
                                <div className="databox-number number-xxlg sonic-silver">164</div>
                                <div className="databox-text storm-cloud">online</div>
                            </div>
                            <div className="databox-cell cell-9 text-align-center">
                                <div className="databox-row row-6 text-left">
                                    <span className="badge badge-palegreen badge-empty margin-left-5"></span>
                                    <span className="databox-inlinetext uppercase darkgray margin-left-5">NEW</span>
                                    <span className="badge badge-yellow badge-empty margin-left-5"></span>
                                    <span
                                        className="databox-inlinetext uppercase darkgray margin-left-5">RETURNING</span>
                                </div>
                                <div className="databox-row row-6">
                                    <div className="progress bg-yellow progress-no-radius">
                                        <div className="progress-bar progress-bar-palegreen" role="progressbar"
                                             aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
                                             style={{width: '78%'}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="databox-bottom">
                        <div className="databox-row row-12">
                            <div className="databox-cell cell-7 text-center  padding-5">
                                <div id="dashboard-pie-chart-sources" className="chart"></div>
                            </div>
                            <div className="databox-cell cell-5 text-center no-padding-left padding-bottom-30">
                                <div className="databox-row row-2 bordered-bottom bordered-ivory padding-10">
                                    <span className="databox-text sonic-silver pull-left no-margin">Type</span>
                                    <span
                                        className="databox-text sonic-silver pull-right no-margin uppercase">PCT</span>
                                </div>
                                <StatItem text="FEED" percent="46%"/>
                                <StatItem text="PREFERRAL" percent="21%"/>
                                <StatItem text="DIRECT" percent="12%"/>
                                <StatItem text="EMAIL" percent="11%"/>
                                <StatItem text="ORGANIC" percent="10%"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Orders = React.createClass({
    render: function () {
        return (
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <div className="orders-container">
                    <div className="orders-header">
                        <h6>Latest Orders</h6>
                    </div>
                    <ul className="orders-list">
                        <OrderItem name="Ned Stards" time="10 minutes ago" currency="$" amount="400"/>
                        <OrderItem name="Steve Lewis" time="2 hours ago" currency="$" amount="620"/>
                        <OrderItem name="John Ford" time="Today 8th July" currency="$" amount="220"/>
                        <OrderItem name="Kim Basinger" time="Yesterday 7th July" currency="$" amount="400"/>
                        <OrderItem name="Steve Lewis" time="5th July" currency="$" amount="340"/>
                    </ul>
                    <div className="orders-footer">
                        <a className="show-all" href=""><i className="fa fa-angle-down"></i> Show All</a>
                        <div className="help">
                            <a href=""><i className="fa fa-question"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Dashboard = React.createClass({
    render: function () {
        return (
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="dashboard-box">
                            <DashboardHeader />
                            <DashboardProgress />
                            <div className="box-tabbs">
                                <div className="tabbable">
                                    <ul className="nav nav-tabs tabs-flat  nav-justified" id="myTab11">
                                        <li className="active">
                                            <a data-toggle="tab" href="#realtime">
                                                Real-Time
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#visits">
                                                Visits
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" id="contacttab" href="#bandwidth">
                                                Bandwidth
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#sales">
                                                Sales
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content tabs-flat no-padding">
                                        <div id="realtime" className="tab-pane active padding-5 animated fadeInUp">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div id="dashboard-chart-realtime"
                                                         className="chart chart-lg no-margin"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="visits" className="tab-pane  animated fadeInUp">
                                            <div className="row">
                                                <div className="col-lg-12 chart-container">
                                                    <div id="dashboard-chart-visits"
                                                         className="chart chart-lg no-margin"
                                                         style={{width:'100%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="bandwidth" className="tab-pane padding-10 animated fadeInUp">
                                            <div className="databox-sparkline bg-themeprimary">
    <span id="dashboard-bandwidth-chart" data-sparkline="compositeline" data-height="250px" data-width="100%"
          data-linecolor="#fff" data-secondlinecolor="#eee"
          data-fillcolor="rgba(255,255,255,.1)" data-secondfillcolor="rgba(255,255,255,.25)"
          data-spotradius="0"
          data-spotcolor="#fafafa" data-minspotcolor="#fafafa" data-maxspotcolor="#ffce55"
          data-highlightspotcolor="#fff" data-highlightlinecolor="#fff"
          data-linewidth="2" data-secondlinewidth="2"
          data-composite="500, 400, 100, 450, 300, 200, 100, 200">
    300,300,400,300,200,300,300,200
    </span>
                                            </div>
                                        </div>
                                        <div id="sales" className="tab-pane animated fadeInUp no-padding-bottom"
                                             style={{padding:'20px 20px 0 20px'}}>
                                            <div className="row">
                                                <SaleDiagram numbers="1,2,4,3,5,6,8,7,11,14,11,12" amount="224"
                                                             unit="Sale Unit / Hour"/>
                                                <SaleDiagram
                                                    numbers="100,208,450,298,450,776,234,680,1100,1400,1000,1200"
                                                    amount="7063$" unit="Income / Hour"/>
                                                <SaleCircle percent="80" amount="9" text="NEW ORDERS"/>
                                                <SaleCircle percent="40" amount="11" text="NEW TICKETS"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-visits">
                                <div className="row">
                                    <DashboardVisit text="Kate birthday party" time="08:30 pm" extra="at home"/>
                                    <DashboardVisit text="Hanging out with kids" time="03:30 pm - 05:15 pm" extra=""/>
                                    <DashboardVisit text="Meeting with Patty" time="01:00 pm" extra="office"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var FirstRow = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                        <FirstDataBox percent="50" number="28" text="NEW TASKS"/>
                        <SecondDataBox percent="15" number="15" text="NEW MESSAGE"/>
                        <ThirdDataBox percent="76" number="92" text="NEW USERS"/>
                        <FourthDataBox text1="JOHN SMITH" text2="TOP RESELLER"/>
                    </div>
                </div>
            </div>
        );
    }
});


var SecondRow = React.createClass({
    render: function () {
        return (
            <div className="row">
                <Dashboard />
                <Orders />
            </div>
        );
    }
});

var ThirdRow = React.createClass({
    render: function () {
        return (
            <div className="row">
                <TaskBoard />
                <div className="col-lg-8 col-sm-12 col-xs-12">
                    <div className="row">
                        <TasksDiagram composite="7,6,5,7,9,10,8,7,6,6,4,7,8" numbers="8,4,1,2,4,6,2,4,4,8,10,7,10"
                                      text1="Sales Total" number1="$23,657" text2="September" number2="$1,257"/>
                        <TasksDiagram composite="7,6,5,7,9,10,8,6,2,4,1,2,7" numbers="10,7,10,8,4,6,6,4,7,8,4,4,8"
                                      text1="Users Total" number1="76,109" text2="New" number2="7,540"/>
                        <TasksDiagram composite="8,4,1,2,4,6,2,4,4,8,10,7,7" numbers="7,6,5,7,9,10,8,7,6,6,4,7,8"
                                      text1="Visits Total" number1="990,541" text2="September" number2="292,123"/>
                    </div>
                    <TicketBoard />
                </div>
            </div>
        );
    }
});

var FourthRow = React.createClass({
    render: function () {
        return (
            <div className="row">
                <PageViews />
                <Stats />
            </div>
        );
    }
});



module.exports = {
    FirstRow: FirstRow,
    SecondRow: SecondRow,
    ThirdRow: ThirdRow,
    FourthRow: FourthRow
};
