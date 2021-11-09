module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define(
        'mediaurl', {
            url: {
                type: DataTypes.STRING
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        });
        return Media;
};