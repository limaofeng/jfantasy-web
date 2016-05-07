var PageContentDispatcher = require('../dispatcher/PageContentDispatcher');

var PageContentActions = {

    switch: function (data) {
        PageContentDispatcher.dispatch(data);
    }

};
/*
 setTimeout(function () {
 MaskActions.switch(1,'切换锁定状态');
 }, 5000);
 */
module.exports = PageContentActions;
