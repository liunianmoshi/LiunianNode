var cache = {};


/**
 * express-route-tree
 * @param {String} key
 * @param {Object} [time] 单位(分钟)
 * @param {Function} value
 * @return {Object}
 */

exports.get = function (key) {
    var data = cache[key];
    if (data) {
        if (isNaN(data.expire) || data.expire >= Date.now()) {
            return data.value;
        }
    }
    return null;
}

exports.set = function (key, time, value) {
    if (typeof key == 'undefined') {
        throw new Error('必须提供缓存的key');
    }
    var arg = arguments;
    if (arg.length == 3) {
        if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
            throw new Error('请提供正确的缓存过期时间');
        }
    } else {
        if (arg.length == 2) {
            value = arg[1];
            time = null;
        }
    }
    if (typeof time == 'undefined') {
        time = 60;
    }
    var record = {
        value: value,
        expire: (time * 1000 * 60) + Date.now()
    };
    if (!isNaN(record.expire)) {
        record.timeout = setTimeout(function () {
            _delete(key);
        }, (time * 1000 * 60));
    }
    cache[key] = record;
}


function _delete(key) {
    delete cache[key];
}

exports.remove = function (key) {
    var data = cache[key];
    var result = true;
    try {
        if (data) {
            clearTimeout(data.timeout);
            _delete(key);
        } 
    } catch(e){
        result = false;
    }
    return result;
}