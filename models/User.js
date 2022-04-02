module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM,
            values: ['admin','wikusama'],
            defaultValue: 'wikusama'
          },
          foto_profile: {
            type: DataTypes.STRING,
          }
    }, {
        tableName: 'User',
        timestamps: false
    });

    User.associate = models => {
        User.hasMany(models.Biodata, {
            foreignKey: "user_id"
        });
    }

    return User;
}