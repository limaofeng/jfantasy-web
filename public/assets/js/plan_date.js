$(function () {
    //所有排班的数组对象
    var event;
    initEvent([]);
    /**
     * 初始化event对象
     * @param data 数组数据
     * @param bool 是否清空数组
     */
    function initEvent(data, bool) {
        if (!bool)event = [];
        $.each(data, function () {
            var time = this.periodTime.split('-');
            var date = new Date(this.time).format('yyyy-MM-dd');
            event.push({
                title: this.number + '个号源',
                start: date + " " + time[0],
                end: date + " " + time[1],
                money: this.money,
                number: this.number,
                objectId: this.id
            });
        });
    }

    /**
     * 初始化日历空间
     */
    $('#calendar').fullCalendar({
        allDaySlot: false,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'add month,agendaWeek'
        },
        views: {
            month: { // name of view
                titleFormat: 'YYYY年MM月'
                // other view-specific options here
            }
        },
        timeFormat: 'HH(:mm)点',
        //事件不能重叠
        eventOverlap: false,
        //slotEventOverlap重叠时挤压之前的块
        slotLabelInterval: {hours: 1},
        slotDuration: '01:00:00',
        minTime: '08:00:00',
        maxTime: '22:00:00',
        //可选事件
        eventConstraint: {
            start: '8:00', // a start time (10am in this example)
            end: '22:00' // an end time (6pm in this example)
        },
        eventLimit: true,
        dayClick: function (args) {
            showPlan(args[0].format('YYYY-MM-DD'));
        },
        dayRender: function (args) {
//            args[1].text(CalConvert(new Date(args[1].data('date')), true));
        },
        eventClick: function (args) {
            showPlan(args[0].start.format('YYYY-MM-DD'));
        },
        events: event
    });
    /**
     * 显示编辑面板
     * @param time 当前点选的时间
     */
    function showPlan(time) {


    }

    /**
     * 刷新排班记录
     * @param date
     */
    function refreshEvent(date) {
        if (!date) {
            date = $('#calendar').fullCalendar('getDate').format('YYYY-MM-DD');
        }
        $.get('/plan/date/search?time=' + date, function (data) {
            initEvent(data);
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', event);
        });
    }
});