var employeeController = {};
var co = require('co');
var sequelize = require('../common/dbContext').sequelize();
var employee = sequelize.import('../model/employee.js');

employeeController.index = function (req,res) {
    var pagelist = require("../common/pagedList");

    var pageNum = req.body.pageNum ? parseInt(req.body.pageNum) : 1;
    var pageSize = req.body.numPerPage ? parseInt(req.body.numPerPage) : 20;

    co(function* () {
        var list = yield employee.findAndCountAll({
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
            res.render('employee/index', { data: list.rows, page: page });
        } else {
            res.render('employee/index', { data: [], page: {} });
        }
    }).catch(function (e) {
        console.log(e);
    });
}

module.exports = employeeController;