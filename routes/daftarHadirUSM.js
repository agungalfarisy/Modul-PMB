const express = require('express');
const daftarUSMController = require('../controllers/daftarUSM');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();


router.get('/daftar-usm', daftarUSMController.getDaftarUSM);
router.get('/daftar-usm/:page', daftarUSMController.getDaftarUSM);
router.post('/daftar-usm', daftarUSMController.addDaftarUSM);
router.post('/daftar-usm/edit/:id', daftarUSMController.editDaftarUSM);
router.get('/daftar-usm/delete/:id', daftarUSMController.deleteDaftarUSM);

module.exports = router;