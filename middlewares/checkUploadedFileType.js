const MimeTypes = require("mime-types");

module.exports = {
  checkUploadedFileType(allowedMimeTypes) {
    return (req, _res, next) => {
      const mime = MimeTypes.lookup(req.file.path);

      if (!allowedMimeTypes.includes(mime)) {
        throw new Error("Error: File isn't allowed");
      }

      next();
    }
  }
};
