var express = require('express');
var router = express.Router();
var reservationController = require('../controllers/reservationController');

/* GET users listing. */
router.get('/', reservationController.getAll);
router.get('/:id', reservationController.get);
router.get('/acc/notaccepted', reservationController.getNotAccepted);
router.get('/acc/accepted/:id', reservationController.getAccepted);


router.post('/', reservationController.post);
router.put('/:id', reservationController.put);
router.delete('/:id', reservationController.delete);

module.exports = router;
