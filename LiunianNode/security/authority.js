var PATH_DEFAULT = 'index';
var cache = require("../common/memoryCache");

function authority(req, res, next) {
    var pathArr = req.path.substring(1).split('/');
    var controllerName = pathArr.shift() || PATH_DEFAULT;
    var actionName = pathArr.shift() || PATH_DEFAULT;
    if (controllerName != "auth") {
        var userinfo = req.session.account;
        if (userinfo) {
            //var co = require('co');
            //co(function* () {
            //    var result = false;
            //    if (controllerName == "index" && actionName == "index") {
            //        next();
            //        return;
            //    }
            //    var roleId = userinfo.RoleId;
            //    if (roleId) {
            //        var sequelize = require('../common/dbContext').sequelize();
            //        var role = sequelize.import('../model/role.js');
            //        var sysmenu = sequelize.import('../model/sysmenu.js');
            //        var roleauthor = sequelize.import('../model/roleauthor.js');

            //        var list = [];
            //        var menuArry = yield roleauthor.findAll({ 'where': { 'RoleId': roleId }, 'attributes': ["MenuId"], 'raw': true });
            //        var tempMenuIds = [];
            //        for (var i = 0; i < menuArry.length; i++) {
            //            tempMenuIds.push(menuArry[i].MenuId);
            //        }
            //        list = yield sysmenu.findAll({
            //            'where': {
            //                'ID': tempMenuIds,
            //                'State': {
            //                    '$gt': -1,
            //                }
            //            }, 'raw': true
            //        });
            //        var sysmenuList = cache.get("MenuList_" + roleId, list);

            //        if (sysmenuList && sysmenuList.length > 0) {
            //            var tempArray = sysmenuList.filter(function (item) {
            //                if (item.Controller == controllerName && item.Action == actionName) {
            //                    return true;
            //                }
            //                return false;
            //            });
            //            if (tempArray && tempArray.length > 0) {
            //                next();
            //                return;
            //            }
            //        }
            //    }
            //    var returnResult = require('../common/returnResult');
            //    res.json(returnResult.showFail("您没有权限操作该页面"));
            //    return;
            //}).catch(function (e) {
            //    var returnResult = require('../common/returnResult');
            //    res.json(returnResult.showFail("您没有权限操作该页面"));
            //    return;
            //})
            HasAuthen(controllerName, actionName, userinfo.roleId);
            next();
        } else {
            res.send("<script>top.location.href='/auth/index'</script>");
            return;
        }
    } else {
        next();
    }
}

function HasAuthen(controllerName, actionName, roleId) {
        var result = false;
        if (controllerName == "index" && actionName == "index") {
            result = true;
        }
        if (roleId) {
            var sequelize = require('../common/dbContext').sequelize();
            var role = sequelize.import('../model/role.js');
            var sysmenu = sequelize.import('../model/sysmenu.js');
            var roleauthor = sequelize.import('../model/roleauthor.js');

            var sysmenuList = cache.get("MenuList_" + roleId);
            var list = [];
            if (!sysmenuList){
                var menuArry = yield roleauthor.findAll({ 'where': { 'RoleId': roleId }, 'attributes': ["MenuId"], 'raw': true });
                var tempMenuIds = [];
                for (var i = 0; i < menuArry.length; i++) {
                    tempMenuIds.push(menuArry[i].MenuId);
                }
                list = yield sysmenu.findAll({
                    'where': {
                        'ID': tempMenuIds,
                        'State': {
                            '$gt': -1,
                        }
                    }, 'raw': true
                });

            }
            console.info(sysmenuList);
            

            if (sysmenuList && sysmenuList.length > 0) {
                var tempArray = sysmenuList.filter(function (item) {
                    if (item.Controller == controllerName && item.Action == actionName) {
                        return true;
                    }
                    return false;
                });
                if (tempArray && tempArray.length > 0) {
                    next();
                    return;
                }
            }
        }
        var returnResult = require('../common/returnResult');
        res.json(returnResult.showFail("您没有权限操作该页面"));
        return;
}

module.exports = authority;