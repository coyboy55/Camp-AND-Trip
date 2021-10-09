var express = require('express');
var router = express.Router();
var usersController = require('../controllers/userController');


const multer = require('multer');
const path = require("path");



    const multerStorage = multer.diskStorage({
        destination: path.join(__dirname, '../public/uploads/users'),
        filename: (req, file, cb) => {
            const { fieldname, originalname } = file;

            const date = Date.now();
            // filename will be: image-1345923023436343-filename.png
            const filename = `${fieldname}-${date}-${originalname}`;
            cb(null, filename);
        }
    })

    const upload = multer({ storage: multerStorage })
    router.patch('/:id',upload.single('fileSrc'), usersController.putPhoto);

/* GET users listing. */
router.get('/', usersController.getAll);
router.get('/:id', usersController.get);
router.post('/', usersController.post);
router.put('/:id', usersController.put);
router.delete('/:id', usersController.delete);
router.post('/:id', usersController.deletePP);


module.exports = router;
