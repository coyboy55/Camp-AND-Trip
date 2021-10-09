var express = require('express');
var router = express.Router();
var followersController = require('../controllers/followersController');

/* GET users listing. */
router.get('/', followersController.getAll);
router.get('/:id', followersController.get);
router.post('/', followersController.post);
router.put('/:id', followersController.put);
router.delete('/:id', followersController.delete);

module.exports = router;
