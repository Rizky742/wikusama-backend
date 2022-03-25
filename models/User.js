module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User', {
        id: {
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
          }
    }, {
        tableName: 'User',
        timestamps: false
    });

    return User;
}
