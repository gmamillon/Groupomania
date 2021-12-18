module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define(
        'reply', {
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })
        return Reply;
};