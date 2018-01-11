module.exports = function(sequelize, DataTypes) {
    var Fist5 = sequelize.define("Fist5", {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255]
            }
        },
        count: {
            type: DataTypes.INTEGER
        },
        f0: {
            type: DataTypes.INTEGER
        },
        f1: {
            type: DataTypes.INTEGER
        },
        f2: {
            type: DataTypes.INTEGER
        },
        f3: {
            type: DataTypes.INTEGER
        },
        f4: {
            type: DataTypes.INTEGER
        },
        f5: {
            type: DataTypes.INTEGER
        },
        ftotal: {
            type: DataTypes.INTEGER
        },
        favg: {
            type: DataTypes.DECIMAL(10, 2)
        },
    });
    return Fist5;
};