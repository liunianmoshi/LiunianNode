var authController = {};

authController.index = function (req, res) {
    res.render('auth/index');
}

authController.login = function (req, res) {
    var loginmodel = req.body;
    if (!loginmodel || !loginmodel.LoginName || !loginmodel.Password) {
        res.render('auth/index', { error: "请输入用户名和密码!" });
        return;
    }

    var co = require('co');
    var sequelize = require('../common/dbContext').sequelize();
    var employee = sequelize.import('../model/employee.js');
    var role = sequelize.import('../model/role.js');

    co(function* () {
        var model = yield employee.findOne({
            'where': {
                'LoginName': loginmodel.LoginName,
                'State': {
                    '$gt': -1,
                }
            },
            'raw': true
        });
        if (!model) {
            res.render('auth/index', { error: "对不起不存在此用户!" });
            return;
        } 
        if (!model.IsUse) {
            res.render('auth/index', { error: "对不起此帐户没启用!" });
            return;
        }
        var crypto = require('crypto');
        var password = crypto.createHash('md5').update(loginmodel.Password).digest('hex');
        if (model.Password != password) {
            res.render('auth/index', { error: "用户名或密码错误!" });
            return;
        }

        var roleModel = yield role.findById(model.RoleId, { 'raw': true });
        if (!roleModel || !roleModel.RoleState || roleModel.State < 0) {
            res.render('auth/index', { error: "所属账户角色未启用!" });
            return;
        }

        var moment = require('moment');
        var tool = require('../common/tool.js');
        model.LoginTimes = model.LoginTimes + 1;
        model.LatestLoginTime = model.CurrLoginTime;
        model.CurrLoginTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        model.LatestLoginIP = model.CurrLoginIP;
        model.CurrLoginIP = tool.getClientIp(req);
        var result = employee.update(model, { 'where': { 'ID': model.ID } });
        if (result) {
            req.session.account = { "LoginName": model.LoginName, "UserName": model.UserName, "RoleId": model.RoleId };
            res.redirect('/');
        } else {
            res.render('auth/index', { error: "登陆失败!" });
        }
    }).catch(function (e) {
        console.log(e);
        res.render('auth/index', { error: "系统错误，登陆失败!" });
    })
}

authController.loginout = function (req, res) {
    req.session.account = null;
    res.redirect('/auth/index');
}
module.exports = authController;