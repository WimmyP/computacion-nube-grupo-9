const express = require('express');
const router = express.Router();
const upload = require('../config/s3');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// @route   POST /api/upload
// @desc    Upload an image to S3
// @access  Private (you might want to add auth middleware)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  // Construct CDN URL using the CDN_BASE_URL and the S3 key
  const cdnBaseUrl = process.env.CDN_BASE_URL;
  if (!cdnBaseUrl) {
    console.warn('CDN_BASE_URL is not set. Returning direct S3 URL.');
    return res.json({ imageUrl: req.file.location });
  }
  
  const imageUrl = `${cdnBaseUrl}/${req.file.key}`;
  res.json({ imageUrl });
});

module.exports = router;
