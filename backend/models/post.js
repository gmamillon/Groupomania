module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'post', {
            content: {
                type: DataTypes.TEXT
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            media: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        })
        return Post;
};