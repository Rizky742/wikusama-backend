module.exports = (sequelize, DataTypes) => {
    const Foto = sequelize.define('Foto', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          path: {
            type: DataTypes.STRING(255)
          },
          deskripsi: {
            type: DataTypes.TEXT
          },
          alamat: {
            type: DataTypes.STRING(255)
          },
    }, {
        tableName: 'Foto',
        timestamps: false
    })

    return Foto;
}