const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Media = require('../models/Media');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images and videos only!');
  }
});

router.post('/', auth, upload.single('media'), async (req, res, next) => {
  try {
    const { title } = req.body;
    const type = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    const media = new Media({
      title,
      url: `/uploads/${req.file.filename}`,
      type,
      user: req.user.id
    });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const media = await Media.find({ user: req.user.id });
    res.json(media);
  } catch (error) {
    next(error);
  }
});

module.exports = router;