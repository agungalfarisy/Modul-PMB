const express = require('express');
const perguruanTinggiController = require('../controllers/perguruanTinggi');
const router = express.Router();

router.get('/setup-pmb/perguruan-tinggi', perguruanTinggiController.getPerguruanTinggi);
router.get('/setup-pmb/perguruan-tinggi/:page', perguruanTinggiController.getPerguruanTinggi);
router.post('/setup-pmb/perguruan-tinggi', perguruanTinggiController.addPerguruanTinggi);
router.post('/setup-pmb/perguruan-tinggi/edit/:id', perguruanTinggiController.editPerguruanTinggi);
router.get('/setup-pmb/perguruan-tinggi/delete/:id', perguruanTinggiController.deletePerguruanTinggi);

module.exports = router;