module.exports = (sequelize,DataTypes) => {
    const Kota = sequelize.define('Kota', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nama: {
            type: DataTypes.STRING
          },
          id_provinsi : {
            type: DataTypes.INTEGER
          }
    }, {
        tableName: 'Kota',
        timestamps: false
    });

    Kota.associate = models => {
        Kota.belongsTo(models.Provinsi, {
            foreignKey: "id"
        });
    }

    return Kota
}