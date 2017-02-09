module.exports = function (sequelize, DataTypes) {
    var roleauthor = sequelize.define('think_roleauthor',
        {
        },
        {
            freezeTableName: true,
            tableName: 'think_roleauthor',
            timestamps: false
        });
    return roleauthor;
};