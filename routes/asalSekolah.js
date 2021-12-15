const express = require('express');
const sekolahController = require('../controllers/asalSekolah');
const router = express.Router();

router.get('/setup-pmb/asal-sekolah', sekolahController.getAsalSekolah);
router.get('/setup-pmb/asal-sekolah/:page', sekolahController.getAsalSekolah);
router.post('/setup-pmb/asal-sekolah', sekolahController.addAsalSekolah);
router.post('/setup-pmb/asal-sekolah/edit/:id', sekolahController.editAsalSekolah);
router.get('/setup-pmb/asal-sekolah/delete/:id', sekolahController.deleteAsalSekolah);

module.exports = router;