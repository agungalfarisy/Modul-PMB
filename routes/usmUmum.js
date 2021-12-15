const express = require('express');
const pmbUsmUmumController = require('../controllers/usmUmum');
const router = express.Router();

router.get('/setup-pmb/usm-umum', pmbUsmUmumController.getUsmUmum);
router.get('/setup-pmb/usm-umum/:page', pmbUsmUmumController.getUsmUmum);
router.post('/setup-pmb/usm-umum', pmbUsmUmumController.addUsmUmum);
router.post('/setup-pmb/usm-umum/edit/:id', pmbUsmUmumController.editUsmUmum);
router.get('/setup-pmb/usm-umum/delete/:id', pmbUsmUmumController.deleteUsmUmum);

module.exports = router;