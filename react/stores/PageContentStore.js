var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PageContentStore = assign({}, EventEmitter.prototype, {
    data: {
        breadcrumbs: [{key: "pay", text: "支付配置"}],
        header: {title: '支付配置'},
        body:[]
    },

    get: function () {
        return this.data;
    },

    set: function (data) {
        this.data = data;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

module.exports = PageContentStore;