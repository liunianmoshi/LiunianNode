module.exports = function (sequelize, DataTypes) {
    var roleauthor = sequelize.define('think_roleauthor',
        {
            RoleId: { type: DataTypes.INTEGER, primaryKey: true, unique: false },
            MenuId: { type: DataTypes.INTEGER, primaryKey: true, unique: false }
        },
        {
            freezeTableName: true,
            tableName: 'think_roleauthor',
            timestamps: false
        });
    return roleauthor;
};