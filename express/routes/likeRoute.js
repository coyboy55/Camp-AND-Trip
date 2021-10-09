var express = require('express');
var router = express.Router();
var likeRoute = require('../controllers/likeController');

/* GET users listing. */
router.get('/', likeRoute.getAll);
router.get('/:id', likeRoute.get);
router.get('/bypost/:id', likeRoute.getnbLikes);
router.get('/cehck/:id/:id1', likeRoute.checkLiked);
router.get('/postbylike/:id', likeRoute.getPost);



router.post('/', likeRoute.post);
router.put('/:id', likeRoute.put);
router.delete('/:id', likeRoute.delete);
router.delete('/user/:id', likeRoute.deleteLikeBypost);


module.exports = router;
