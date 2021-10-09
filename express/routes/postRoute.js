var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postController');
const multer = require('multer');
const path = require("path");



    const multerStorage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads'),
        filename: (req, file, cb) => {
            const { fieldname, originalname } = file;

            const date = Date.now();
            // filename will be: image-1345923023436343-filename.png
            const filename = `${fieldname}-${date}-${originalname}`;
            cb(null, filename);

        }
    })

    const upload = multer({ storage: multerStorage })
    router.post('/', upload.single('fileSrc') ,postsController.post);


/* GET users listing. */
router.get('/', postsController.getAll);
router.get('/:id', postsController.get);
router.get('/user/:id', postsController.getByAuthor);
router.get('/location/:location', postsController.getByLocation);

router.put('/:id', postsController.put);
router.put('/updateseats/a/:id/:seat', postsController.putEmptySeat);

router.delete('/:id', postsController.delete);

module.exports = router;
