//============================================================
//[描    述]  Fantasy.awt.Pager	主要功能：实现翻页标签
//============================================================

/**
 * 名称：Fantasy.awt.Pager
 */
Fantasy.util.jClass(Fantasy.util.Observable, {

    jClass: 'Fantasy.awt.Pager',

    initialize: function ($super, target, options) {
        $super(['change', 'load']);
        this.target = target;
        this.options = Fantasy.merge(options || {}, Fantasy.awt.Pager.settings);
    },

    setPage: function (page) {
        if (!this.options.url)
            this.fireEvent('change', this, [this.items.slice((page.currentPage - 1) * this.options.pageSize, page.currentPage * this.options.pageSize)]);
        else
            this.fireEvent('change', this, [this.pageItems]);
        //绘制翻页标签
        if (page.currentPage == 1 && page.totalPage == 0) {
            page.totalPage = 1;
        }
        this.target.template(Fantasy.awt.Pager.template).applyData(page);
        this.target.find("a[href*='?page=']").click((function(zhis){
            return function (e) {
                var data = Fantasy.parseQuery($(this).attr("href"));
                if (zhis.currentPage != data.page) {
                    var pageData = {};
                    pageData[zhis.options.mappings['currentPage']] = zhis.currentPage = data.page;
                    pageData[zhis.options.mappings['pageSize']] = zhis.options.pageSize;
                    zhis.options.url ? zhis.reload(Fantasy.copy(zhis.options.postData, pageData)) : zhis.setPage(zhis);
                }
                return stopDefault(e);
            }
        })(this));
        return this;
    },

    setJSON: function (json, callback) {
        if (Fantasy.isArray(json)) {
            json = json ? json : [];
            this.items = json;
            this.currentPage = 1;
            this.totalCount = json.length;
            this.totalPage = Fantasy.toInt(this.totalCount / this.options.pageSize) + (this.totalCount % this.options.pageSize != 0 ? 1 : 0);
            this.setPage(this);
        } else if (jQuery.isPlainObject(json)) {
            //如果设置过 jsonRoot
            if (this.options.jsonRoot) {
                this.fireEvent('load', this, [json]);
                if (typeof this.options.jsonRoot === 'string') {
                    json = !!json[this.options.jsonRoot] ? json[this.options.jsonRoot] : json;
                } else {
                    json = this.options.jsonRoot.apply(this, [json]);
                }
            }
            //赋值
            for (var p in this.options.mappings) {
                this[p] = json[p] = json[this.options.mappings[p]];
                delete json[this.options.mappings[p]];
            }
            this.options.pageSize = json.pageSize ? json.pageSize : this.options.pageSize;
            this.pageItems = json.pageItems ? json.pageItems : [];
            this.setPage(json);
        }
        if (callback) {
            callback.call(this);
        }
        return this;
    },

    setJSONUrl: function (url, postData, jsonRoot) {
        this.options = Fantasy.merge({
            url: url,
            postData: postData,
            jsonRoot: jsonRoot
        }, this.options);
        var pageData = {};
        pageData[this.options.mappings['currentPage']] = this.currentPage;
        pageData[this.options.mappings['pageSize']] = this.options.pageSize;
        this.reload(Fantasy.copy(this.options.postData, pageData));
        return this;
    },

    setUrl: function (url) {
        this.options.url = url;
        return this;
    },

    setPostData: function (postData) {
        this.options.postData = postData;
        return this;
    },

    getPostData: function () {
        return this.options.postData;
    },

    reload: function (postData) {
        if (!!postData) {
            this.setPostData(postData);
        }
        (function (zhis) {
            jQuery.getJSON(zhis.options.url, zhis.options.postData, function (data) {
                zhis.setJSON(data);
            });
        })(this);
        return this;
    },

    find: function (name, value) {
        return this.items.each(function () {
            if (this[name] == value)
                return this;
        });
    },

    update: function (name, value, data) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i][name] == value)
                this.items[i] = data;
        }
    },

    add: function (obj) {
        this.items.push(obj);
        return this;
    }
});
Fantasy.apply(Fantasy.awt.Pager, {}, {
    settings: {
        mappings: {
            'currentPage': 'page',
            'pageSize': 'per_page',
            'pageItems': 'items',
            'totalPage': 'total',
            'totalCount': 'count'
        },
        url: null,
        postData: {},
        jsonRoot: function (data) {
            return data;
        },
        pageSize: 1
    }
});