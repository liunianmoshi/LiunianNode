var PATH_DEFAULT = 'index';
var cache = require("../common/memoryCache");

function authority(req, res, next) {
    var pathArr = req.path.substring(1).split('/');
    var controllerName = pathArr.shift() || PATH_DEFAULT;
    var actionName = pathArr.shift() || PATH_DEFAULT;
    if (controllerName != "auth") {
        var userinfo = req.session.account;
        if (userinfo) {
            var ishasAuth = hasAuthen(controllerName, actionName, userinfo.RoleId);
            if (ishasAuth) {
                next();
            } else {
                var returnResult = require('../common/returnResult');
                res.json(returnResult.showFail("您没有权限操作该页面"));
                return;
            }
        } else {
            res.send("<script>top.location.href='/auth/index'</script>");
            return;
        }
    } else {
        next();
    }
}


function hasAuthen(controllerName, actionName, roleId) {
    var co = require('co');
    co(function* () {
        var result = false;
        if (controllerName == "index" && actionName == "index") {
            return true;
        }
        if (roleId) {

            var sequelize = require('../common/dbContext').sequelize();
            var role = sequelize.import('../model/role.js');
            var sysmenu = sequelize.import('../model/sysmenu.js');
            var roleauthor = sequelize.import('../model/roleauthor.js');

            var list = [];
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
            var sysmenuList = cache.get("MenuList_" + roleId,list);

            console.info("AAAAA");
            console.info(sysmenuList);
            if (sysmenuList && sysmenuList.length > 0) {
                var tempArray = sysmenuList.filter(function (item) {
                    if (item.Controller == controllerName && item.Action == actionName) {
                        return true;
                    }
                    return false;
                });
                console.info(tempArray);
                if (tempArray && tempArray.length > 0) {
                    result = true;
                }
            }
        }
        return result;
    }).catch(function (e) {
        console.info(e);
        return false;
    })
}
module.exports = authority;