var cache = {};


/**
 * express-route-tree
 * @param {String} key
 * @param {Object} [time] 单位(分钟)
 * @param {Function} value
 * @return {Object}
 */

exports.get = function (key, time, valueFun) {
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
            valueFun = arg[1];
            time = null;
        }
    }
    //if (typeof valueFun == 'undefined' || typeof valueFun !== 'function') {
    //    throw new Error('请提供正确的设置缓存值的函数');
    //}
    if (typeof time == 'undefined') {
        time = 60;
    }

    var data = cache[key];
    if (data) {
        var aa = Date.now();
        if (isNaN(data.expire) || data.expire >= Date.now()) {
            return data.value;
        }
    }
    var value = valueFun;
    var record = {
        value: value,
        expire: (time * 1000 * 60) + Date.now()
    };
    if (!isNaN(record.expire)) {
        record.timeout = setTimeout(function () {
            _delete(key);
        }, (time*1000*60));
    }
    cache[key] = record;
    return value;
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