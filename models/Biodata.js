module.exports = (sequelize, DataTypes) => {
    const Biodata = sequelize.define('Biodata', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          nama_lengkap: {
            type: DataTypes.STRING(25)
          },
          user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          angkatan: {
            type: DataTypes.CHAR(2),
          },
          jurusan : {
            type: DataTypes.ENUM,
            values: ['Elektronika Informatika', 'Teknik Informatika', 'Teknik Komputer dan Jaringan', 'Rekayasa Perangkat Lunak']
          },
          tahun_lulus: {
            type: DataTypes.STRING(11)
          },
          kota_asal: {
            type: DataTypes.INTEGER(11),
          },
          provinsi_asal: {
            type: DataTypes.INTEGER(11),
          },
          kota_domisili: {
            type: DataTypes.INTEGER(11),
          },
          provinsi_domisili: {
            type: DataTypes.INTEGER(11),
          }
    }, {
        tableName: 'Biodata',
        timestamps: false
    })

    Biodata.associate = models => {
        Biodata.belongsTo(models.User, {
            foreignKey: "user_id"
        })


        Biodata.belongsTo(models.Kota, {
            foreignKey: "kota_asal",
            as : "kotaAsal"
        })
        Biodata.belongsTo(models.Kota, {
            foreignKey: "kota_domisili",
            as : "kotaDomisili"
        })

        Biodata.belongsTo(models.Provinsi, {
            foreignKey: "provinsi_asal",
            as: "provinsiAsal"
        })

        Biodata.belongsTo(models.Provinsi, {
            foreignKey: "provinsi_domisili",
            as: "provinsiDomisili"
        })

    }

    return Biodata;
}