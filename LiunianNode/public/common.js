(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global.liunian = factory());
} (this, (function () {
    'use strict';

    var liunian = {};

    //if (!Array.prototype.indexOf) {
    //    Array.prototype.indexOf = function (elt /*, from*/) {
    //        var len = this.length >>> 0;
    //        var from = Number(arguments[1]) || 0;
    //        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    //        if (from < 0) {
    //            from += len;
    //        }
    //        for (; from < len; from++) {
    //            if (from in this && this[from] === elt) {
    //                return from;
    //            }
    //        }
    //        return -1;
    //    };
    //}

    //if (!Array.prototype.sort) {
    //    Array.prototype.sort = function (fn) {
    //        var fn = fn || function (a, b) { return a > b; };
    //        for (var i = 0; i < this.length; i++) {
    //            for (var j = i; j < this.length; j++) {
    //                if (fn(this[i], this[j]) > 0) {
    //                    var t = this[i];
    //                    this[i] = this[j];
    //                    this[j] = t;
    //                }
    //            }
    //        }
    //        return this;
    //    };
    //}


    //Array.prototype.first = function (filter, context) {
    //    if (this.length == 0) return null;
    //    if (!context) context = this;
    //    for (var i = 0; i < this.length; i++) {
    //        if (filter.call(context, i, this[i]) === true) {
    //            return this[i];
    //        }
    //    }
    //    return null;
    //};
    //Array.prototype.firstOrDefault = function (filter, defaultValue, context) {
    //    if (this.length == 0) return defaultValue;
    //    if (typeof filter != "function") { return this[0]; }
    //    if (!context) context = this;
    //    for (var i = 0; i < this.length; i++) {
    //        if (filter.call(context, i, this[i]) === true) {
    //            return this[i];
    //        }
    //    }
    //    return defaultValue;
    //};
    //Array.prototype.contains = function (itemOrFilter, context) {

    //    if (this.length == 0) return false;
    //    if (typeof itemOrFilter != "function") {
    //        return this.indexOf(itemOrFilter) > -1;
    //    }
    //    if (!context) context = this;
    //    for (var i = 0; i < this.length; i++) {
    //        if (itemOrFilter.call(context, i, this[i]) === true) {
    //            return true;
    //        }
    //    }
    //    return false;
    //};
    //Array.prototype.removeAt = function (index) {
    //    if (index < 0)
    //        return;
    //    var newArray = this.slice(0, index).concat(this.slice(index + 1, this.length));
    //    this.length = 0; //clear source array
    //    this.push.apply(this, newArray); //add
    //};
    //Array.prototype.remove = function (itemOrCallback, context) {
    //    if (!itemOrCallback || this.length == 0) { return this; }
    //    if (typeof (itemOrCallback) == "function") {
    //        if (!context) context = this;
    //        for (var i = 0; i < this.length; i++) {
    //            if (itemOrCallback.call(context, i, this[i]) === true) {
    //                this.splice(i, 1);
    //                break;
    //            }
    //        }
    //    } else {
    //        for (var i = 0; i < this.length; i++) {
    //            if (this[i] == itemOrCallback) {
    //                this.splice(i, 1);
    //                break;
    //            }
    //        }
    //    }
    //    return this;
    //};
    //Array.prototype.removeAll = function (itemOrCallback, context) {
    //    if (!itemOrCallback || this.length == 0) { return this; }
    //    if (typeof (itemOrCallback) == "function") {
    //        if (!context) context = this;
    //        for (var i = 0, n = this.length; i < n;) {
    //            if (itemOrCallback.call(context, i, this[i]) === true) {
    //                this.splice(i, 1);
    //                n--;
    //            } else {
    //                i++;
    //            }
    //        }
    //    } else {
    //        for (var i = 0, n = this.length; i < n;) {
    //            if (this[i] == itemOrCallback) {
    //                this.splice(i, 1);
    //                n--;
    //            } else {
    //                i++;
    //            }
    //        }
    //    }
    //    return this;
    //};
    //Array.prototype.each = function (iterator, context) {
    //    if (!context) context = this;
    //    if (this.length === +this.length) {
    //        for (var i = 0, l = this.length; i < l; i++) {
    //            if (iterator.call(context, i, this[i], this) === false)
    //                return false;
    //        }
    //    } else {
    //        for (var key in obj) {
    //            if (this.hasOwnProperty(key)) {
    //                if (iterator.call(context, key, this[key], this) === false)
    //                    return false;
    //            }
    //        }
    //    }
    //};
    //Array.prototype.filter = function (filter, context) {
    //    var arr = [], item, r;
    //    if (this.length == 0 || typeof filter != "function") return arr;
    //    if (!context) context = this;
    //    for (var i = 0; i < this.length; i++) {
    //        item = this[i];
    //        r = filter.call(context, i, item);
    //        if (r == true) {
    //            arr.push(item);
    //        }
    //        else if (r == undefined) {
    //            break;
    //        }
    //    }
    //    return arr;
    //};

    //if (!Array.prototype.map) {
    //    Array.prototype.map = function (iterator, context) {
    //        var arr = [], item, r;
    //        if (this.length == 0 || typeof iterator != "function") return arr;
    //        if (!context) context = this;
    //        for (var i = 0; i < this.length; i++) {
    //            r = iterator.call(context, i, item = this[i]);
    //            if (r !== null) {
    //                arr.push(r);
    //            }
    //        }
    //        return arr;
    //    }
    //};
    //Array.prototype.lastOrDefault = function (filter, defaultValue, context) {
    //    if (this.length == 0) return defaultValue;
    //    if (typeof filter != "function") { return this[this.length - 1]; }
    //    if (!context) context = this;
    //    for (var i = this.length - 1; i >= 0; i--) {
    //        if (filter.call(context, i, this[i]) === true) {
    //            return this[i];
    //        }
    //    }
    //    return defaultValue;
    //};
    //Array.prototype.last = function (filter, context) {
    //    if (this.length == 0) return null;
    //    if (typeof filter != "function") { return this[this.length - 1]; }
    //    if (!context) context = this;
    //    for (var i = this.length - 1; i >= 0; i--) {
    //        if (filter.call(context, i, this[i]) === true) {
    //            return this[i];
    //        }
    //    }
    //    return null;
    //};
    ////进行迭代判定的函数
    //Array.prototype.foreach = function (fn) {
    //    fn = fn || Function.K;
    //    var a = [];
    //    var args = Array.prototype.slice.call(arguments, 1);
    //    for (var i = 0; i < this.length; i++) {
    //        var res = fn.apply(this, [this[i], i].concat(args));
    //        if (res != null) a.push(res);
    //    }
    //    return a;
    //};
    ////得到一个数组不重复的元素集合
    //Array.prototype.uniquelize = function () {
    //    var ra = new Array();
    //    for (var i = 0; i < this.length; i++) {
    //        if (!ra.contains(this[i])) {
    //            ra.push(this[i]);
    //        }
    //    }
    //    return ra;
    //};

    ////两个数组的交集
    //Array.intersect = function (a, b) {
    //    return a.uniquelize().foreach(function (o) { return b.contains(o) ? o : null; });
    //};
    ////两个数组的补集
    //Array.complement = function (a, b) {
    //    return Array.minus(Array.union(a, b), Array.intersect(a, b));
    //};
    ////两个数组的差集
    //Array.minus = function (a, b) {
    //    return a.uniquelize().foreach(function (o) { return b.contains(o) ? null : o; });
    //};
    ////两个数组的并集
    //Array.union = function (a, b) {
    //    return a.concat(b).uniquelize();
    //};


    var Utils = {
        format: function (datetime, format) {
            datetime = datetime.replace(/-/g, "/").replace("Z", "").replace("T"," ");
            console.info(datetime);
            datetime = new Date(datetime);
            console.info(datetime);
            var o = {
                "M+": datetime.getMonth() + 1, //month
                "d+": datetime.getDate(), //day
                "h+": datetime.getHours(), //hour
                "m+": datetime.getMinutes(), //minute
                "s+": datetime.getSeconds(), //second
                "q+": Math.floor((datetime.getMonth() + 3) / 3), //quarter
                "S": datetime.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        dateDiff: function diffDays(s1, s2) {
            s1 = s1.replace(/-/g, "/");
            s2 = s2.replace(/-/g, "/");
            s1 = new Date(s1);
            s2 = new Date(s2);
            var days = s2.getTime() - s1.getTime();
            var time = parseInt(days / (1000 * 60 * 60 * 24));
            return time;
        },
        dataReplace: function (content, data) {
            if (data) {
                var regex = /\{([\s\S]+?)}/g;
                content.replace(regex, function (m, code) {
                    var d = data[code];
                    if (typeof d != "undefined") {
                        content = content.replace(m, d);
                    }
                });
            }
            return content;
        }
    };
    liunian.Utils = Utils;

    return liunian;
})));

