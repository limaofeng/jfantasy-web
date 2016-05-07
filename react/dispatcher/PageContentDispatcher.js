var Dispatcher = require('flux').Dispatcher;
var PageContentDispatcher = new Dispatcher();
var PageContentStore = require('../stores/PageContentStore');


PageContentDispatcher.register(function (data) {
    PageContentStore.set(data);
    PageContentStore.emitChange();
});

module.exports = PageContentDispatcher;
