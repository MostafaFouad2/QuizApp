const express = require('express');

const wordController = require('../controllers/word');

const router = express.Router();

router.get('/', wordController.getWords);




module.exports = router;
