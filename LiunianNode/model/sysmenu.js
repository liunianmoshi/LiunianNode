module.exports = function (sequelize, DataTypes) {
    var sysmenu = sequelize.define('think_sysmenu',
        {
            ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
            UpdateTime: DataTypes.DATE,
            CreateTime: DataTypes.DATE,
            State: DataTypes.INTEGER,
            MenuName: DataTypes.STRING,
            Controller: DataTypes.STRING,
            Action: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            ParentId: DataTypes.INTEGER,
            MenuLevel: DataTypes.INTEGER,
            IsView: DataTypes.INTEGER,
            ICON: DataTypes.STRING,
            OrderNum: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            tableName: 'think_sysmenu',
            timestamps: false
        });
    return sysmenu;
};