const express = require('express');
const pmbPersyaratanController = require('../controllers/persyaratan');
const router = express.Router();

router.get('/setup-pmb/persyaratan', pmbPersyaratanController.getPersyaratan);
router.get('/setup-pmb/persyaratan/:page', pmbPersyaratanController.getPersyaratan);
router.post('/setup-pmb/persyaratan', pmbPersyaratanController.addPersyaratan);
router.post('/setup-pmb/persyaratan/edit/:id', pmbPersyaratanController.editPersyaratan);
router.get('/setup-pmb/persyaratan/delete/:id', pmbPersyaratanController.deletePersyaratan);

module.exports = router;