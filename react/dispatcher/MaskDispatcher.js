var Dispatcher = require('flux').Dispatcher;
var MaskDispatcher = new Dispatcher();
var MaskStore = require('../stores/MaskStore');

MaskDispatcher.register(function (action) {
  MaskStore.setStatus(action.actionType);
  MaskStore.emitChange();
});

module.exports = MaskDispatcher;
