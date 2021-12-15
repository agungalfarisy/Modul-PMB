const express = require('express');
const usmProdiController = require('../controllers/usmProdi');
const router = express.Router();

router.get('/setup-pmb/usm-prodi', usmProdiController.getUSMProdi);
router.get('/setup-pmb/usm-prodi/:page', usmProdiController.getUSMProdi);
router.post('/setup-pmb/usm-prodi', usmProdiController.addUSMProdi);
router.post('/setup-pmb/usm-prodi/edit/:id', usmProdiController.editUSMProdi);
router.get('/setup-pmb/usm-prodi/delete/:id', usmProdiController.deleteUSMProdi);

module.exports = router;