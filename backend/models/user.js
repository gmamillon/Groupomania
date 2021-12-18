module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user', {
            name: {
                type: DataTypes.STRING(31),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(63),
                allowNull: false
            },
            ppurl: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "http://localhost:3000/medias/default_picture.jpg"
            },
            bio: {
                type: DataTypes.STRING
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        });
        return User;
};