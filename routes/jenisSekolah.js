const express = require('express');
const sekolahController = require('../controllers/asalSekolah');
const router = express.Router();

router.get('/setup-pmb/jenis-sekolah', sekolahController.getJenisSekolah);
router.get('/setup-pmb/jenis-sekolah/:page', sekolahController.getJenisSekolah);
router.post('/setup-pmb/jenis-sekolah', sekolahController.addJenisSekolah);
router.post('/setup-pmb/jenis-sekolah/edit/:id', sekolahController.editJenisSekolah);
router.get('/setup-pmb/jenis-sekolah/delete/:id', sekolahController.deleteJenisSekolah);

module.exports = router;