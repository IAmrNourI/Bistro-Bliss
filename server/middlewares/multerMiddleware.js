const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets/uploaded");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  //   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = fileTypes.test(file.mimetype); //mimetype contains the type of the file
  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Error: upload images only");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter: fileFilter,
  // fileFiler:(req, file, cb) =>{
  //   if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
  //     cb(null, true);
  //   }else{
  //     cb(null, false);
  //     return cb(new Error("Only JPG and PNG format allowed!"));
  //   }
  // }
});

module.exports = upload;
