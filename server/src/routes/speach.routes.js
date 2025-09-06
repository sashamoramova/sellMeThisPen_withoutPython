const express = require('express');
const router = express.Router();
const speachController = require('../controllers/speach.controller');

router.post('/translate', speachController.translateText);

module.exports = router;
