const express = require('express');
const komponenUSMController = require('../controllers/komponenUSM');
const router = express.Router();

router.get('/setup-pmb/komponen-usm', komponenUSMController.getKomponenUSM);
router.get('/setup-pmb/komponen-usm/:page', komponenUSMController.getKomponenUSM);
router.post('/setup-pmb/komponen-usm', komponenUSMController.addKomponenUSM);
router.post('/setup-pmb/komponen-usm/edit/:id', komponenUSMController.editKomponenUSM);
router.get('/setup-pmb/komponen-usm/delete/:id', komponenUSMController.deleteKomponenUSM);

module.exports = router;