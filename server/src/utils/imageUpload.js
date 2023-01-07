const multer = require("multer");
const { ObjectId } = require("mongodb");
const ErrorHandler = require("./errorhandler");
const path = require("path");
const fs = require("fs");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ErrorHandler("Please upload a valid image file", 422));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "../../" + "public/images"));
    },
    filename: (req, file, cb) => {
      if (req.params.id) {
        // console.log(file);

        // const directory = path.resolve(__dirname, "../../" + "public/images/");

        // fs.readdir(directory, (err, files) => {
        //   files.forEach((fileInside) => {
        //     if (fileInside.split(".")[0] == req.params.id)
        //       fs.unlinkSync(
        //         path.resolve(__dirname, "../../" + "public/images", fileInside)
        //       );
        //   });
        // });

        req.body.deviceImage =
          req.params.id + `.${file.mimetype.split("/").pop()}`;

        console.log(req.body.deviceImage);
        cb(null, req.body.deviceImage);
      } else {
        req.body._id = new ObjectId();
        req.body.deviceImage =
          req.body._id.toString() + `.${file.mimetype.split("/").pop()}`;

        cb(null, req.body.deviceImage);
      }
    },
    onerror: (err, next) => {
      console.log(err);
      next();
    },
  }),
});

module.exports = upload;
