var express = require('express');
var router = express.Router();
var ratesController = require('../controllers/ratesController');

/* GET users listing. */
router.get('/', ratesController.getAll);
router.get('/:id', ratesController.get);
router.get('/check/:recievedRate/:rateOffered', ratesController.checkIfRated);
router.get('/avgrate/:id', ratesController.getavg);


router.post('/', ratesController.post);
router.put('/:id', ratesController.put);
router.delete('/:id', ratesController.delete);

module.exports = router;
