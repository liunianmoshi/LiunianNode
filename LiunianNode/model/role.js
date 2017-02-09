module.exports = function (sequelize, DataTypes) {
    var role = sequelize.define('think_role',
        {
            ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
            UpdateTime: DataTypes.DATE,
            CreateTime: DataTypes.DATE,
            State: DataTypes.INTEGER,
            RoleName: DataTypes.STRING,
            RoleState: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            tableName: 'think_role',
            timestamps: false
        });
    return role;
};