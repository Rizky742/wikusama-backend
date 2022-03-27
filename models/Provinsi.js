module.exports = (sequelize, DataTypes) => {
    const Provinsi = sequelize.define('Provinsi', {
        id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama: {
        type: DataTypes.STRING(30)
      }
    }, {
        tableName: 'Provinsi',
        timestamps: false
    })

    Provinsi.associate = models => {
        Provinsi.hasMany(models.Kota, {
            foreignKey: "id_provinsi"
        });
    }

    return Provinsi
}