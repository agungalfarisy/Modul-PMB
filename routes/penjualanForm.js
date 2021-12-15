const express = require('express');
const penjualanFormController = require('../controllers/penjualanForm');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/penjualan-form', penjualanFormController.getPenjualanForm);
router.get('/penjualan-form/jual-form', penjualanFormController.getJualForm);
router.get('/penjualan-form/edit-kwitansi', penjualanFormController.getEditKwitansi);
router.get('/penjualan-form/daftar-form', penjualanFormController.getDaftarForm);
router.get('/penjualan-form/:page', penjualanFormController.getPenjualanForm);
router.post('/penjualan-form', penjualanFormController.getPenjualanForm);
router.post('/penjualan-form/jual-form', penjualanFormController.getJualForm);
// router.post('/setup-pmb/persyaratan', pmbPersyaratanController.addPersyaratan);
// router.post('/setup-pmb/persyaratan/edit/:id', pmbPersyaratanController.editPersyaratan);
// router.get('/setup-pmb/persyaratan/delete/:id', pmbPersyaratanController.deletePersyaratan);


module.exports = router;