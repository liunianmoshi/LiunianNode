var sysmenuController = {};

var co = require('co');
var sequelize = require('../common/dbContext').sequelize();
var sysmenu = sequelize.import('../model/sysmenu.js');

sysmenuController.index = function (req, res) {
    co(function* () {
        var list = yield sysmenu.findAll({
            'where': {
                'State': {
                    '$gt': -1,
                }
            },
            'order': 'OrderNum desc',
            'raw': true
        });
        if (list && list.length > 0) {
            res.render('sysmenu/index', { data: JSON.stringify(list) });
        } else {
            res.render('sysmenu/index', { data: '' });
        }
    }).catch(function (e) {
        console.info(e);
        res.render('sysmenu/index', { data: '' });
    });
};

sysmenuController.list = function (req, res) {
    var pagelist = require("../common/pagedList");

    var pageNum = req.body.pageNum ? parseInt(req.body.pageNum) : 1;
    var pageSize = req.body.numPerPage ? parseInt(req.body.numPerPage) : 20;

    var id = req.query.id;
    var data = [];
    var page = {};
    if (id && id > 0) {
        co(function* () {
            var list = yield sysmenu.findAndCountAll({
                'where': {
                    'State': {
                        '$gt': -1,
                    },
                    '$or': [
                        { 'ID': id },
                        { 'ParentId': id }
                    ]
                },
                'limit': pageSize,
                'offset': pageSize * (pageNum - 1),
                'order': 'ID desc',
                'raw': true
            });
            var totalcount = 0;
            if (list && list.rows.length > 0) {
                data = list.rows;
                totalcount = list.count;
                var filterList = data.filter(function (item) {
                    if (item.ID == id) {
                        return true;
                    }
                    return false;
                });
                if (filterList.length > 0) {
                    var model = yield sysmenu.findById(filterList[0].ParentId, { 'raw': true });
                    if (model && model.ID) {
                        totalcount += 1;
                        data.push(model);
                    }
                }
            }
            page = new pagelist(pageNum, totalcount, pageSize);
            res.render('sysmenu/list', { data: JSON.stringify(data), page: page });
        }).catch(function (e) {
            console.info(e);
            page = new pagelist(pageNum, 0, pageSize);
            res.render('sysmenu/list', { data: JSON.stringify(data), page: page });
        });
    }
}

sysmenuController.edit = function (req, res) {
    var id = req.query.id;
    co(function* () {
        var selectList = [];
        selectList = yield sysmenu.findAll({
            'where': {
                'State': {
                    '$gt': -1,
                },
                '$or': [
                    { 'MenuLevel': 1 },
                    { 'MenuLevel': 2 }
                ]
            },
            'order': 'ID desc',
            'raw': true
        });
        selectList.push({ ID: 0, MenuName: "顶级菜单", ParentId: 0, MenuLevel: 0 });
        if (id && id > 0) {
            var model = yield sysmenu.findById(id);
            res.render('sysmenu/edit', { model: model, selectList: selectList });
        } else {
            res.render('sysmenu/edit', { model: {}, selectList: selectList });
        }
    }).catch(function (e) {
        res.render('sysmenu/edit', { model: {}, selectList: {} });
    })
}

sysmenuController.save = function (req, res) {
    var returnResult = require('../common/returnResult');
    var moment = require('moment');

    var model = req.body;
    if (model) {
        model.UpdateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        model.IsView = model.IsView? parseInt(model.IsView):0;
        co(function* () {
            var result = 0;
            if (model.ID > 0) {
                var fields = [];
                for (var item in model) {
                    fields.push(item);
                }
                result = yield sysmenu.update(model, {
                    where: {
                        ID: model.ID
                    },
                    fields: fields
                });
            } else {
                model.CreateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                model.State = 0;
                result = yield sysmenu.create(model);
            }
            if (result) {
                res.json(returnResult.closeSuccess("sysmenu_index"));
            } else {
                res.json(returnResult.failed());
            }
        }).catch(function (e) {
            console.info(e);
            res.json(returnResult.failed());
        });
    } else {
        console.info("请求参数为空");
        res.json(returnResult.failed());
    }
}


sysmenuController.delete = function (req, res) {
    var returnResult = require('../common/returnResult');

    var id = req.query.id;
    if (id && id > 0) {
        co(function* () {
            var result = yield sysmenu.update({
                'State': -1
            }, {
                    where: {
                        ID: id
                    },
                    fields: ['State']
                });
            if (result > 0) {
                res.json(returnResult.deleteSuccess('sysmenu_index'));
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

module.exports = sysmenuController;

