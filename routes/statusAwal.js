const express = require('express');
const statusAwalController = require('../controllers/statusAwal');
const router = express.Router();

router.get('/setup-pmb/status-awal', statusAwalController.getStatusAwal);
router.get('/setup-pmb/status-awal/:page', statusAwalController.getStatusAwal);
router.post('/setup-pmb/status-awal', statusAwalController.addStatusAwal);
router.post('/setup-pmb/status-awal/edit/:id', statusAwalController.editStatusAwal);
router.get('/setup-pmb/status-awal/delete/:id', statusAwalController.deleteStatusAwal);

module.exports = router;