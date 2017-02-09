'use strict';

var config = require('../config/config');
var Sequelize = require('sequelize');
var dbcontext = (function () {
    var instance;
    function constructor() {
        return new Sequelize(config.database.databasename, config.database.username, config.database.password, config.database.option);
    }
    return {
        sequelize: function () {
            if (!instance) {
                instance = constructor();
            }
            return instance;
        }
    }
})();

module.exports = dbcontext;