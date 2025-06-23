const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortId', urlController.redirectUrl);
router.get('/urls', urlController.getAllUrls);
router.get('/stats/:shortId', urlController.getUrlStats);

module.exports = router;