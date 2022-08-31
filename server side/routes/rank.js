const express = require('express');

const rankController = require('../controllers/rank');

const router = express.Router();

router.post('/', rankController.getRank);




module.exports = router;
