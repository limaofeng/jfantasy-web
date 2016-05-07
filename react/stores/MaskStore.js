var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MaskStore = assign({}, EventEmitter.prototype, {
    data: {status: 0},

    get: function () {
        return this.data;
    },

    setStatus: function (status) {
        console.log(status);
        this.data.status = status;
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

module.exports = MaskStore;
