// Fist-to-Five Sequelize Schema
// =====================

// This is the sequelize function
module.exports = function(sequelize, DataTypes) {

    // This defines the object variable for the database
    var Fist5 = sequelize.define("Fist5", {

        // These define the column fields in mySQL
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
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
        fpct: {
            type: DataTypes.DECIMAL(10, 2)
        },
    });

    // This allows us to call the data from the controller
    return Fist5;
};