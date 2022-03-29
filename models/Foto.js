module.exports = (sequelize, DataTypes) => {
  const Foto = sequelize.define('Foto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING(255),
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    alamat: {
      type: DataTypes.STRING(255)
    },
  }, {
    tableName: 'Foto',
    timestamps: false
  });

  Foto.associate = (models) => {
    Foto.belongsTo(models.User, {
      foreignKey: "owner_id"
    });
  };

  return Foto;
};
