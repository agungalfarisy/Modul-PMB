const express = require('express');
const infoPesertaController = require('../controllers/infoPeserta');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.get('/info-peserta', infoPesertaController.getInfoPeserta);
// router.get('/denah-usm/:page', pmbUsmUmumController.getUsmUmum);
// router.post('/setup-pmb/persyaratan', pmbPersyaratanController.addPersyaratan);
// router.post('/setup-pmb/persyaratan/edit/:id', pmbPersyaratanController.editPersyaratan);
// router.get('/setup-pmb/persyaratan/delete/:id', pmbPersyaratanController.deletePersyaratan);
// router.get('/edit-comment/:commentId', isAuth, commentController.getEditComment);
// router.post('/edit-comment', isAuth, commentController.postEditComment);
// router.post('/delete-comment', isAuth, commentController.postDeleteComment);

module.exports = router;