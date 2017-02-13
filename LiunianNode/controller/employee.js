var employeeController = {};
var co = require('co');
var sequelize = require('../common/dbContext').sequelize();
var employee = sequelize.import('../model/employee.js');
var role = sequelize.import('../model/role.js');

employeeController.index = function (req,res) {
    var pagelist = require("../common/pagedList");

    var pageNum = req.body.pageNum ? parseInt(req.body.pageNum) : 1;
    var pageSize = req.body.numPerPage ? parseInt(req.body.numPerPage) : 20;

    var userkeyword = req.body.userkeyword ? req.body.userkeyword : "";
    var wherecondition = {
        'State': {
            '$gt': -1,
        }};
    if (userkeyword) {
        wherecondition.$or = [{ 'LoginName': userkeyword }, { "UserName": userkeyword}];
    }

    co(function* () {
        var list = yield employee.findAndCountAll({
            'where': wherecondition,
            'limit': pageSize,
            'offset': pageSize * (pageNum - 1),
            'order': 'ID desc'
        });
        if (list) {
            var page = new pagelist(pageNum, list.count, pageSize);
            res.render('employee/index', { data: list.rows, page: page, userkeyword:userkeyword });
        } else {
            res.render('employee/index', { data: [], page: {}, userkeyword: userkeyword });
        }
    }).catch(function (e) {
        console.log(e);
    });
}

employeeController.edit = function (req, res) {
    co(function* () {
        var roleList = yield role.findAll({
            'where': { 'State': { '$gt': -1 } },
            'attributes': [
                'ID','RoleName'
            ]
        });
        res.render('employee/edit', { roleList: roleList});
    }).catch(function (e) {
        console.log(e);
        res.render('employee/edit');
    });
    
}

employeeController.save = function (req, res) {
    var returnResult = require('../common/returnResult');
    var moment = require('moment');
    var model = req.body;
    if (model) {
        model.UpdateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        model.CreateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        model.IsUse = model.IsUse ? parseInt(model.IsUse) : 0;
        var crypto = require('crypto');
        var password = crypto.createHash('md5').update(model.Password).digest('hex');
        model.Password = password;
        model.LoginTimes = 0;
        co(function* () {
            var query = yield employee.findOne({
                'where': {
                    'LoginName': model.LoginName
                },
                'raw': true
            });
            if (query) {
                if (query.State && query.State == -1) {
                    var result = yield employee.update({ 'State': 0 }, {
                        'where': {
                            'LoginName': model.LoginName
                        },
                        fields: ["State"]
                    });
                    if (result) {
                        res.json(returnResult.closeSuccess("employee_index"));
                    } else {
                        res.json(returnResult.failed());
                    }
                } else {
                    res.json(returnResult.showFail("已经存在此登陆名"));
                }
            } else {
                var result = yield employee.create(model);
                if (result) {
                    res.json(returnResult.closeSuccess("employee_index"));
                } else {
                    res.json(returnResult.failed());
                }
            }
        }).catch(function (e) {
            console.log(e);
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}

employeeController.delete = function (req, res) {
    var returnResult = require('../common/returnResult');

    var id = req.query.id;
    if (id && id > 0) {
        co(function* () {
            var result = yield employee.update({
                'State': -1
            }, {
                    'where': {
                        ID: id
                    },
                    'fields': ['State']
                });
            if (result > 0) {
                res.json(returnResult.deleteSuccess('employee_index'));
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            console.log(e);
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}

employeeController.updateisuse = function (req, res) {
    var returnResult = require('../common/returnResult');

    var id = req.query.id;
    if (id && id > 0) {
        co(function* () {
            var model = yield employee.findById(id, { "raw": true });
            if (model) {
                var result = yield employee.update({
                    'IsUse': !model.IsUse
                }, {
                        'where': {
                            ID: id
                        },
                        'fields': ['IsUse']
                    });
                if (result > 0) {
                    res.json(returnResult.deleteSuccess('employee_index'));
                } else {
                    res.json(returnResult.failed());
                }
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            console.log(e);
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}

module.exports = employeeController;