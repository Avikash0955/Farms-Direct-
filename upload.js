const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { PROFILE_UPLOAD } = require('../constants/appConstants');

fs.mkdirSync(PROFILE_UPLOAD.dir, { recursive: true });

const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILE_UPLOAD.dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});

const uploadProfilePic = multer({
  storage: profilePicStorage,
  limits: {
    fileSize: PROFILE_UPLOAD.maxSize
  },
  fileFilter: (req, file, cb) => {
    if (!PROFILE_UPLOAD.allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Profile picture must be a JPG, PNG, or WEBP image.'));
    }

    return cb(null, true);
  }
});

module.exports = {
  uploadProfilePic
};
