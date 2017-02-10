var roleController = {};
var co = require('co');
var sequelize = require('../common/dbContext').sequelize();
var role = sequelize.import('../model/role.js');
var sysmenu = sequelize.import('../model/sysmenu.js');
var roleauthor = sequelize.import('../model/roleauthor.js');

roleController.index = function (req, res) {
    var pagelist = require("../common/pagedList");

    var pageNum = req.body.pageNum ? parseInt(req.body.pageNum) : 1;
    var pageSize = req.body.numPerPage ? parseInt(req.body.numPerPage) : 20;

    co(function* () {
        var list = yield role.findAndCountAll({
            'where': {
                'State': {
                    '$gt': -1,
                }
            },
            'limit': pageSize,
            'offset': pageSize * (pageNum - 1),
            'order': 'ID desc'
        });
        if (list) {
            var page = new pagelist(pageNum, list.count, pageSize);
            res.render('role/index', { data: list.rows, page: page });
        } else {
            res.render('role/index', { data: null, page: null });
        }
    }).catch(function (e) {
        console.log(e);
    });
}

roleController.edit = function (req, res) {
    var id = req.query.id;
    if (id && id > 0) {
        co(function* () {
            var model = yield role.findById(id);
            res.render('role/edit', { model: model });
        }).catch(function (e) {
            console.log(e);
        });
    } else {
        res.render('role/edit', { model: {} });
    }
}

roleController.save = function (req, res) {
    var returnResult = require('../common/returnResult');
    var moment = require('moment');

    var model = req.body;
    if (model) {
        model.UpdateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        co(function* () {
            var result = 0;
            if (model.ID > 0) {
                result = yield role.update(model, {
                    where: {
                        ID: model.ID
                    },
                    fields: ['RoleName', 'RoleState', 'UpdateTime']
                });
            } else {
                model.CreateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                model.State = 0;
                result = yield role.create(model);
            }
            if (result) {
                res.json(returnResult.closeSuccess("role_index"));
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}

roleController.delete = function (req, res) {
    var returnResult = require('../common/returnResult');

    var id = req.query.id;
    if (id && id > 0) {
        co(function* () {
            var result = yield role.update({
                'State': -1
            }, {
                    'where': {
                        ID: id
                    },
                    'fields': ['State']
                });
            if (result > 0) {
                res.json(returnResult.deleteSuccess('role_index'));
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}

roleController.setauthor = function (req, res) {
    var id = req.query.id;
    co(function* () {
        //role.belongsToMany(sysmenu, { 'through': roleauthor });
        //sysmenu.belongsToMany(role, { 'through': roleauthor });
        //var roleList = yield role.findAll({
        //    'include': [
        //        {
        //            'model': sysmenu
        //        }
        //    ],
        //    'where': {
        //        'ID': id
        //    },
        //    'raw': true
        //});
        var roleList = {};
        var havaMenu = [];
        if (id && id > 0) {
            roleList = yield role.findById(id, {
                'raw': true
            });
            havaMenu = yield roleauthor.findAll({
                'where': {
                    'RoleId': id
                },
                'raw': true
            });
        }

        var menuList = yield sysmenu.findAll({
            'where': {
                'State': {
                    '$gt': -1,
                }
            },
            'order': 'ID desc',
            'raw': true
        });
        res.render("role/setauthor", { menuList: JSON.stringify(menuList), roleList: roleList, havaMenu:JSON.stringify(havaMenu) });
    }).catch(function (e) {
        console.info(e);
        res.render("role/setauthor", { menuList: "[]", roleList: {}, havaMenu:'[]' });
    });
}

roleController.saveauthor = function (req, res) {
    var returnResult = require('../common/returnResult');
    var model = req.body;
    if (model) {
        var roleId = model.RoleId;
        var list = [];
        for (var item in model) {
            if (item != "RoleId") {
                var arry = model[item];
                if (!(arry instanceof Array)) {
                    arry = arry.toString().split(',');
                }
                if (arry.length > 0) {
                    for (var i = 0; i < arry.length; i++) {
                        if (arry[i] > 0) {
                            var author = {};
                            author.RoleId = roleId;
                            author.MenuId = arry[i];
                            list.push(author);
                        }
                    }
                }
            }
        }
        co(function* () {
            var result = 0;
            if (list.length > 0) {
                result = yield roleauthor.destroy({ 'where': { 'RoleId': roleId } });
                result = yield roleauthor.bulkCreate(list);
            }
            if (result) {
                res.json(returnResult.closeSuccess("role_index"));
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            console.info(e);
            res.json(returnResult.failed());
        });
    } else {
        res.json(returnResult.failed());
    }
}
module.exports = roleController;
