module.exports = function (sequelize, DataTypes) {
    var employee = sequelize.define('think_employee',
        {
            ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
            UpdateTime: DataTypes.DATE,
            CreateTime: DataTypes.DATE,
            State: DataTypes.INTEGER,
            LoginName: DataTypes.STRING,
            UserName: DataTypes.STRING,
            Password: DataTypes.STRING,
            LoginTimes: DataTypes.INTEGER,
            LatestLoginTime: DataTypes.DATE,
            CurrLoginTime: DataTypes.DATE,
            LatestLoginIP: DataTypes.STRING,
            CurrLoginIP: DataTypes.STRING,
            RoleId: DataTypes.INTEGER,
            IsUse: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            tableName: 'think_employee',
            timestamps: false
        });
    return employee;
};