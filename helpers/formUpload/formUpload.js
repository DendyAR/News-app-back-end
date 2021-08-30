const multer = require("multer");
const path = require("path");

let StorageProfile = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/upload/photo_profile");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

let StorageArticles = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/upload/article_cover");
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

let uploadProfile = multer({
  storage: StorageProfile,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 50000000,
  },
});

let uploadArticles = multer({
  storage: StorageArticles,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".mp4"
    ) {
      return cb(new Error("Only Images Or Mp4"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1000000000,
  },
});

const formUpload = {
  uploadProfiles: (req, res, next) => {
    const uploadProfiles = uploadProfile.single("photo_profile");
    uploadProfiles(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file == undefined) {
        next();
      } else {
        next();
      }
    });
  },

  uploadarticles: (req, res, next) => {
    const uploadarticles = uploadArticles.single("article_cover");
    uploadarticles(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (err) {
        res.status(400).send({
          message: err.message,
          statusCode: 400,
        });
      } else if (req.file === undefined || req.file === null) {
        next();
      } else {
        next();
      }
    });
  },
};

module.exports = formUpload;
