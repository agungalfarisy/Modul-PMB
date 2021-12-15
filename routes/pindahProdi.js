const express = require('express');
const pindahProdiController = require('../controllers/pindahProdi');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

// router.get('/add-comment', pmbController.getAddComment);
// router.post('/add-comment', isAuth, commentController.postAddComment);
router.get('/pindah-prodi', pindahProdiController.getPindahProdi);
// router.get('/pendaftaran/:page', pendaftaranFormController.getPenjualanForm);
// router.post('/setup-pmb/persyaratan', pmbPersyaratanController.addPersyaratan);
// router.post('/setup-pmb/persyaratan/edit/:id', pmbPersyaratanController.editPersyaratan);
// router.get('/setup-pmb/persyaratan/delete/:id', pmbPersyaratanController.deletePersyaratan);
// router.get('/edit-comment/:commentId', isAuth, commentController.getEditComment);
// router.post('/edit-comment', isAuth, commentController.postEditComment);
// router.post('/delete-comment', isAuth, commentController.postDeleteComment);

module.exports = router;