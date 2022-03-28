const router = require("express").Router();
const multer = require("multer");
const slugify = require("slugify");
const path = require("path");

const {checkUploadedFileType} = require("../middlewares/checkUploadedFileType");
const {User, Foto} = require("../models");

const auth = require('../auth');

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
];

const allowedExtnames = /png|jpg|jpeg|webp/;

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/gallery/",
    filename: (_req, file, cb) => {
      const name = slugify(file.originalname, { lower: true });

      cb(
        null,
        `${new Date().getTime()}-${name}`
      );
    },
  }),
  limits: {
    fields: 6,
    fileSize: 15000000, // 15 MB
  },
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const isExtnameValid = allowedExtnames.test(path.extname(file.originalname).toLowerCase());
  const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

  console.log(path.extname(file.originalname).toLowerCase());
  console.log(isExtnameValid);
  console.log(isMimeTypeValid);

  if (isExtnameValid && isMimeTypeValid) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

router.post("/upload",
  auth,
  upload.single("foto"),
  checkUploadedFileType(allowedMimeTypes),
  (req, res) => {
    if (!req.file) {
      res.status(400).send("Foto doesn't exist");
    }

    Foto.create({
      owner_id: req.user.id,
      path: req.file.path,
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
      alamat: req.body.alamat
    }).then((result) => {
      res.json(result);
    });
  }
);

router.patch("/:id_foto",
  auth,
  upload.none(),
  (req, res) => {
    const idFoto = req.params.id_foto;

    Foto.update(
      {
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
        alamat: req.body.alamat
      },
      {
        where: {
          id: idFoto
        }
      }
    ).then((result) => {
      res.json(result);
    });
  }
);

router.delete("/:id_foto",
  auth,
  (req, res) => {
    const idFoto = req.params.id_foto;

    Foto.destroy({
      where: {
        id: idFoto
      }
    }).then((result) => {
      res.json(result);
    }).catch((err) => {
      console.err(err);
      res.status(500).send("Failed to delete foto");
    });
  }
);

router.get("/",
  (req, res) => {
    const username = req.query.username;

    if (username) {
      User.findOne({
        where: {
          username: username
        }
      }).then((user) => {
        if (!user) {
          res.json([]);
        }

        user.getFotos({
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
        }).then((fotos) => {
          res.json(fotos);
        });
      });

      return;
    }

    Foto.findAll({
      where: {},
      include: [
        {
          model: User,
          attributes: ["username"]
        }
      ]
    }).then((result) => {
      res.json(result);
    });
  }
);

router.get("/:id_foto",
  (req, res) => {
    const idFoto = req.params.id_foto;

    Foto.findAll({
      where: {
        id: idFoto
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }).then((result) => {
      res.json(result);
    });
  }
);

module.exports = router;
