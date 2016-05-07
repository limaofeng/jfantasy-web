var MaskDispatcher = require('../dispatcher/MaskDispatcher');

var MaskActions = {

  switch: function (status,text) {
    MaskDispatcher.dispatch({
      actionType: status,
      text: text
    });
  }

};
/*
setTimeout(function () {
  MaskActions.switch(1,'切换锁定状态');
}, 5000);
*/
module.exports = MaskActions;
